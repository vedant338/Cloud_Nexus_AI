from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import (ChatMessage,Conversation, new_id, File, Folder, new_id)
from app.services.rag import retrieve
from app.services.llm import complete


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
            "role": r.role,
            "content": r.content,
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
    # Determine scope
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
    # Folder selection
    # -----------------------------------------------------

    elif body.folder_id:

        folder = db.get(
            Folder,
            body.folder_id,
        )

        folder_name = (
            folder.name
            if folder
            else "this folder"
        )

        files = (
            db.query(File)
            .filter(
                File.folder_id ==
                body.folder_id
            )
            .all()
        )

        names = [
            f.name
            for f in files
        ]

        if not names:

            names = [
                f"(empty) {folder_name}"
            ]


    # -----------------------------------------------------
    # My Drive / root
    # -----------------------------------------------------

    else:

        files = (
            db.query(File)
            .filter(
                File.folder_id.is_(None)
            )
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
            ChatMessage.conversation_id ==
            conversation.id
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

    context_chunks = retrieve(
        query=body.message,

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

    db.commit()

    # =====================================================
    # BUILD DEDUPLICATED CITATIONS
    # =====================================================

    citations = []

    seen_sources = set()

    for chunk in context_chunks:

        file_id = chunk.get(
            "file_id"
        )

        page = chunk.get(
            "page"
        )

        slide = chunk.get(
            "slide"
        )

        # -------------------------------------------------
        # Create a unique source key
        # -------------------------------------------------

        if page is not None:

            source_key = (
                file_id,
                "page",
                page,
            )

        elif slide is not None:

            source_key = (
                file_id,
                "slide",
                slide,
            )

        else:

            source_key = (
                file_id,
                "document",
            )


        # -------------------------------------------------
        # Skip duplicate source
        # -------------------------------------------------

        if source_key in seen_sources:
            continue

        seen_sources.add(
            source_key
        )


        # -------------------------------------------------
        # Add citation
        # -------------------------------------------------

        citation = {
            "rank":
                len(citations) + 1,

            "file_id":
                file_id,

            "file_name":
                chunk.get(
                    "file_name",
                    "Unknown",
                ),

            "score":
                chunk.get(
                    "hybrid_score"
                ),

            "distance":
                chunk.get(
                    "distance"
                ),

            "page":
                page,

            "slide":
                slide,

            "source_type":
                chunk.get(
                    "source_type"
                ),

            "text":
                chunk.get(
                    "retrieved_text",
                    chunk.get(
                        "text",
                        "",
                    ),
                ),
        }

        citations.append(
            citation
        )


        # -------------------------------------------------
        # Maximum 5 citations
        # -------------------------------------------------

        if len(citations) >= 5:
            break

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
