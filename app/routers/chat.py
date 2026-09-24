from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import ChatMessage, File, Folder, new_id
from app.services.rag import retrieve
from app.services.llm import complete


router = APIRouter(prefix="/api/chat", tags=["chat"])


class ChatIn(BaseModel):
    message: str
    mode: str = Field(
        default="explain",
        pattern="^(explain|short_notes)$"
    )
    folder_id: str | None = None
    file_ids: list[str] = Field(default_factory=list)


@router.get("/history")
def history(db: Session = Depends(get_db)):
    rows = (
        db.query(ChatMessage)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )

    return [
        {
            "id": r.id,
            "role": r.role,
            "content": r.content,
            "mode": r.mode,
            "created_at": r.created_at.isoformat() + "Z",
        }
        for r in rows
    ]


@router.post("")
def chat(
    body: ChatIn,
    db: Session = Depends(get_db)
):
    # -------------------------------------------------
    # 1. Save user's message
    # -------------------------------------------------

    user_msg = ChatMessage(
        id=new_id(),
        role="user",
        content=body.message,
        mode=body.mode,
        folder_id=body.folder_id,
    )

    db.add(user_msg)

    # -------------------------------------------------
    # 2. Determine which files are in scope
    # -------------------------------------------------

    names: list[str] = []

    if body.file_ids:

        files = (
            db.query(File)
            .filter(File.id.in_(body.file_ids))
            .all()
        )

        names = [f.name for f in files]

    elif body.folder_id:

        folder = db.get(Folder, body.folder_id)

        folder_name = (
            folder.name
            if folder
            else "this folder"
        )

        files = (
            db.query(File)
            .filter(File.folder_id == body.folder_id)
            .all()
        )

        names = [f.name for f in files]

        if not names:
            names = [f"(empty) {folder_name}"]

    else:

        files = (
            db.query(File)
            .filter(File.folder_id.is_(None))
            .all()
        )

        names = [
            f.name
            for f in files
        ] or ["My Drive (no files yet)"]

    # -------------------------------------------------
    # 3. Get IDs of files in current scope
    # -------------------------------------------------

    file_ids = [f.id for f in files]

    # -------------------------------------------------
    # 4. Retrieve relevant document chunks
    # -------------------------------------------------

    context_chunks = retrieve(
        query=body.message,
        folder_id=body.folder_id,
        file_ids=file_ids,
        top_k=8,
    )

    # -------------------------------------------------
    # 5. Generate answer using Llama
    # -------------------------------------------------

    answer = complete(
        message=body.message,
        mode=body.mode,
        context_chunks=context_chunks,
    )

    # -------------------------------------------------
    # 6. Save assistant response
    # -------------------------------------------------

    assistant = ChatMessage(
        id=new_id(),
        role="assistant",
        content=answer,
        mode=body.mode,
        folder_id=body.folder_id,
    )

    db.add(assistant)
    db.commit()

    # -------------------------------------------------
    # 7. Prepare citations
    # -------------------------------------------------

    citations = []

    for i, chunk in enumerate(context_chunks[:3]):

        citations.append(
            {
                "rank": i + 1,
                "file_name": chunk.get(
                    "file_name",
                    "Unknown"
                ),
                "score": chunk.get(
                    "hybrid_score"
                ),
                "distance": chunk.get(
                    "distance"
                ),
                "text": chunk.get(
                    "text",
                    ""
                ),
            }
        )

    # -------------------------------------------------
    # 8. Return response to frontend
    # -------------------------------------------------

    return {
        "answer": answer,
        "citations": citations,
        "scope_files": names,
        "mode": body.mode,
    }