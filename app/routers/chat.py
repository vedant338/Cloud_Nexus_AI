from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import ChatMessage, File, Folder, new_id
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
    # Save user message
    # -----------------------------------------------------

    user_msg = ChatMessage(
        id=new_id(),
        role="user",
        content=body.message,
        mode=body.mode,
        folder_id=body.folder_id,
    )

    db.add(user_msg)


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
    )


    # =====================================================
    # SAVE ASSISTANT MESSAGE
    # =====================================================

    assistant = ChatMessage(
        id=new_id(),
        role="assistant",
        content=answer,
        mode=body.mode,
        folder_id=body.folder_id,
    )

    db.add(assistant)

    db.commit()


    # =====================================================
    # BUILD CITATIONS
    # =====================================================

    citations = []


    for i, chunk in enumerate(
        context_chunks[:5],
        start=1,
    ):

        citation = {
            "rank": i,

            "file_id":
                chunk.get(
                    "file_id"
                ),

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
                chunk.get(
                    "page"
                ),

            "slide":
                chunk.get(
                    "slide"
                ),

            "source_type":
                chunk.get(
                    "source_type"
                ),

            "text":
                chunk.get(
                    "text",
                    "",
                ),
        }

        citations.append(
            citation
        )


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