import re
from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import (ChatMessage,Conversation, new_id, File, Folder)
from app.services.rag import retrieve
from app.services.llm import complete, resolve_followup_query


router = APIRouter(
    prefix="/api/chat",
    tags=["chat"],
)

# =========================================================
# REQUEST MODEL
# =========================================================

class ChatIn(BaseModel):

    message: str

    mode: str = Field(
        default="explain",
        pattern="^(explain|short_notes)$"
    )

    folder_id: str | None = None

    file_ids: list[str] = Field(
        default_factory=list
        )
    conversation_id: str | None = None

def get_descendant_folder_ids(
    db: Session,
    root_folder_id: str,
) -> list[str]:

    folders = db.query(
        Folder.id,
        Folder.parent_id,
    ).all()

    children_by_parent = {}

    for folder_id, parent_id in folders:
        children_by_parent.setdefault(
            parent_id, []
        ).append(folder_id)

    result = []
    stack = [root_folder_id]
    visited = set()

    while stack:
        current_id = stack.pop()

        if current_id in visited:
            continue

        visited.add(current_id)
        result.append(current_id)

        stack.extend(
            children_by_parent.get(
                current_id, []
            )
        )

    return result


# =========================================================
# CONVERSATIONS
# =========================================================

@router.get("/conversations")
def get_conversations(
    db: Session = Depends(get_db),
):

    conversations = (
        db.query(Conversation)
        .order_by(
            Conversation.updated_at.desc()
        )
        .all()
    )

    return [
        {
            "id": conversation.id,
            "title": conversation.title,
            "created_at":
                conversation.created_at.isoformat() + "Z",
            "updated_at":
                conversation.updated_at.isoformat() + "Z",
        }
        for conversation in conversations
    ]


@router.post("/conversations")
def create_conversation(
    db: Session = Depends(get_db),
):

    conversation = Conversation(
        id=new_id(),
        title="New Chat",
    )

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return {
        "id": conversation.id,
        "title": conversation.title,
        "created_at":
            conversation.created_at.isoformat() + "Z",
        "updated_at":
            conversation.updated_at.isoformat() + "Z",
    }


@router.delete("/conversations/{conversation_id}")
def delete_conversation(
    conversation_id: str,
    db: Session = Depends(get_db),
):

    conversation = db.get(
        Conversation,
        conversation_id,
    )

    if not conversation:
        return {
            "ok": False,
            "message": "Conversation not found",
        }

    db.delete(conversation)
    db.commit()

    return {
        "ok": True,
        "conversation_id": conversation_id,
    }

# =========================================================
# CHAT HISTORY
# =========================================================

@router.get("/history")
def history(
    db: Session = Depends(get_db)
):

    rows = (
        db.query(ChatMessage)
        .order_by(
            ChatMessage.created_at.asc()
        )
        .all()
    )

    return [
        {
            "id": r.id,
            "conversation_id": r.conversation_id,
            "role": r.role,
            "content": r.content,
            "citations": r.citations or [],
            "mode": r.mode,
            "created_at":
                r.created_at.isoformat() + "Z",
        }
        for r in rows
    ]


# =========================================================
# CHAT
# =========================================================

@router.post("")
def chat(
    body: ChatIn,
    db: Session = Depends(get_db),
):

# -----------------------------------------------------
# Get or create conversation
# -----------------------------------------------------

    conversation = None

    if body.conversation_id:

        conversation = db.get(
            Conversation,
            body.conversation_id,
        )

    if not conversation:

        conversation = Conversation(
            id=new_id(),
            title=body.message[:60],
        )

        db.add(conversation)
        db.flush()


    # -----------------------------------------------------
    # Save user message
    # -----------------------------------------------------

    if (
    conversation.title == "New Chat"
    and body.message.strip()
    ):
        conversation.title = (
        body.message.strip()[:60]
    )

    user_msg = ChatMessage(
        id=new_id(),
        conversation_id=conversation.id,
        role="user",
        content=body.message,
        mode=body.mode,
        folder_id=body.folder_id,
    )

    db.add(user_msg)

    conversation.updated_at = __import__(
        "datetime"
    ).datetime.utcnow()

    # -----------------------------------------------------
    # Determine retrieval scope
    # -----------------------------------------------------

    names: list[str] = []
    files: list[File] = []

    # -----------------------------------------------------
    # Explicit file selection
    # -----------------------------------------------------

    if body.file_ids:

        files = (
            db.query(File)
            .filter(
                File.id.in_(body.file_ids)
            )
            .all()
        )

        names = [
            f.name
            for f in files
        ]

    # -----------------------------------------------------
    # Folder selection: include all descendants
    # -----------------------------------------------------

    elif body.folder_id:

        folder = db.get(
            Folder,
            body.folder_id,
        )

        if folder:

            folder_ids = get_descendant_folder_ids(
                db,
                body.folder_id,
            )

            files = (
                db.query(File)
                .filter(
                    File.folder_id.in_(folder_ids)
                )
                .all()
            )

            names = [
                f.name
                for f in files
            ]

            if not names:
                names = [
                    f"(empty) {folder.name}"
                ]

        else:
            names = ["(folder not found)"]

    # -----------------------------------------------------
    # My Drive: include all files
    # -----------------------------------------------------

    else:

        files = (
            db.query(File)
            .all()
        )

        names = [
            f.name
            for f in files
        ]

        if not names:
            names = [
                "My Drive (no files yet)"
            ]

    # -----------------------------------------------------
    # Authoritative retrieval scope
    # -----------------------------------------------------

    file_ids = [
        f.id
        for f in files
    ]

    # =====================================================
    # RECENT CONVERSATION HISTORY
    # =====================================================

    recent_messages = (
        db.query(ChatMessage)
        .filter(
            ChatMessage.conversation_id ==  conversation.id,
            ChatMessage.id != user_msg.id,
        )
        .order_by(
            ChatMessage.created_at.desc()
        )
        .limit(6)
        .all()
    )

    recent_messages.reverse()

    conversation_history = []

    for message in recent_messages:

        conversation_history.append(
            {
                "role": message.role,
                "content": message.content,
            }
        )


    # =====================================================
    # HYBRID RAG RETRIEVAL
    # =====================================================

    # Resolve follow-up references before document retrieval.
    retrieval_query = resolve_followup_query(
    question=body.message,
    conversation_history=conversation_history,
    )

    print("[QUERY REWRITE]")
    print("Original:", body.message)
    print("Resolved:", retrieval_query)


    context_chunks = retrieve(
        query=retrieval_query,
        folder_id=body.folder_id,
        file_ids=file_ids,
        top_k=8,
    )


    print(
        "\n===================================="
    )

    print(
        "CLOUDNEXUS RAG RETRIEVAL"
    )

    print(
        "===================================="
    )

    print(
        "Question:",
        body.message
    )

    print(
        "Retrieved chunks:",
        len(context_chunks)
    )


    for i, chunk in enumerate(
        context_chunks,
        start=1,
    ):

        print(
            f"\n[{i}] "
            f"{chunk.get('file_name', 'Unknown')}"
        )

        if chunk.get("page"):

            print(
                "Page:",
                chunk.get("page")
            )

        if chunk.get("slide"):

            print(
                "Slide:",
                chunk.get("slide")
            )

        print(
            "Score:",
            chunk.get("hybrid_score")
        )
        print("ORIGINAL RETRIEVED TEXT:")
        print(chunk.get("retrieved_text", "")[:500])

    print(
        "\n====================================\n"
    )


    # =====================================================
    # LLM
    # =====================================================

    answer = complete(
        message=body.message,
        mode=body.mode,
        context_chunks=context_chunks,
        conversation_history=conversation_history,
    )


    # =====================================================
    # SAVE ASSISTANT MESSAGE
    # =====================================================

    assistant = ChatMessage(
        id=new_id(),
        conversation_id=conversation.id,
        role="assistant",
        content=answer,
        mode=body.mode,
        folder_id=body.folder_id,
    )

    db.add(assistant)

    # =====================================================
    # BUILD CITATIONS REFERENCED BY THE ANSWER
    # =====================================================

    normalized_answer = " ".join(answer.split()).strip().lower()

    refusal = (
        "i couldn't find enough information about this "
        "in the provided documents."
    )

    cited_ranks = {
        int(number)
        for number in re.findall(r"\[(\d+)\]", answer)
    }

    citations = []

    if normalized_answer != refusal:
        for rank, chunk in enumerate(context_chunks, start=1):

            # Match the source-text selection used in llm.py.
            source_text = (
                chunk.get("retrieved_text")
                or chunk.get("context_text")
                or chunk.get("text")
                or ""
            ).strip()

            if not source_text or rank not in cited_ranks:
                continue

            citation = {
                "rank": rank,
                "file_id": chunk.get("file_id"),
                "file_name": chunk.get("file_name", "Unknown"),
                "score": chunk.get("hybrid_score"),
                "distance": chunk.get("distance"),
                "page": chunk.get("page"),
                "slide": chunk.get("slide"),
                "source_type": chunk.get("source_type"),
                "text": source_text,
            }

            citations.append(citation)

    assistant.citations = citations
    db.commit()

    # =====================================================
    # RESPONSE
    # =====================================================

    return {

        "answer":
            answer,

        "citations":
            citations,

        "scope_files":
            names,

        "mode":
            body.mode,

        "retrieved_chunks":
            len(context_chunks),
    }
