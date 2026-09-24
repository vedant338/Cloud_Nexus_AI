import tempfile
from pathlib import Path

from fastapi import APIRouter, Depends, File as UploadFileParam, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import File, Folder, new_id
from app.services.s3 import upload_bytes,delete_object,presign_get,download_object
from app.services.rag import index_file
router = APIRouter(prefix="/api/files", tags=["files"])


class FilePatch(BaseModel):
    name: str | None = None
    folder_id: str | None = None


def _serialize(file: File) -> dict:
    return {
        "id": file.id,
        "name": file.name,
        "folder_id": file.folder_id,
        "mime": file.mime,
        "size_bytes": file.size_bytes,
        "created_at": file.created_at.isoformat() + "Z",
        "type": "file",
        "preview_url": f"/api/files/{file.id}/preview",
    }


@router.get("")
def list_files(parent_id: str | None = None, db: Session = Depends(get_db)):
    q = db.query(File)
    if parent_id:
        q = q.filter(File.folder_id == parent_id)
    else:
        q = q.filter(File.folder_id.is_(None))
    return [_serialize(f) for f in q.order_by(File.name).all()]

@router.post("", status_code=201)
async def upload_file(
    upload: UploadFile = UploadFileParam(...),
    folder_id: str | None = Form(default=None),
    db: Session = Depends(get_db),
):
    if folder_id:
        if not db.get(Folder, folder_id):
            raise HTTPException(404, "Folder not found")

    file_id = new_id()
    filename = upload.filename or "untitled"

    data = await upload.read()

    mime = upload.content_type or "application/octet-stream"

    # S3 object key
    s3_key = f"documents/{file_id}/{filename}"

    # Upload to S3
    try:
        upload_bytes(
            key=s3_key,
            data=data,
            content_type=mime,
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"S3 upload failed: {str(e)}",
        )

    # Save database record
    record = File(
        id=file_id,
        name=filename,
        folder_id=folder_id,
        stored_path=s3_key,
        mime=mime,
        size_bytes=len(data),
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    # RAG indexing
    # -----------------------------------------
    # RAG indexing from S3
    # -----------------------------------------

    indexed = False
    index_error = None

    try:
        suffix = Path(filename).suffix
        with tempfile.NamedTemporaryFile(
        suffix=suffix,
        delete=False,) as temp:
            temp_path = temp.name
        download_object(
        s3_key,
        temp_path,
    )
        index_file(
        file_id=file_id,
        local_path=temp_path,
        mime=mime,
        folder_id=folder_id,
    )

        indexed = True

    except Exception as e:
        index_error = str(e)
        print(f"RAG indexing failed: {e}")

    finally:
        if "temp_path" in locals():
            Path(temp_path).unlink(
            missing_ok=True
        )
    # IMPORTANT:
    # Your current RAG expects a local file path.
    # We'll handle this next.
    
    return {
        **_serialize(record),
        "indexed": indexed,
        "storage": "s3",
        "s3_key": s3_key,
        "index_error": index_error
    }
@router.patch("/{file_id}")
def patch_file(file_id: str, body: FilePatch, db: Session = Depends(get_db)):
    file = db.get(File, file_id)
    if not file:
        raise HTTPException(404, "File not found")
    if body.name and body.name.strip():
        file.name = body.name.strip()
    if "folder_id" in body.model_fields_set:
        if body.folder_id and not db.get(Folder, body.folder_id):
            raise HTTPException(404, "Folder not found")
        file.folder_id = body.folder_id
    db.commit()
    db.refresh(file)
    return _serialize(file)


@router.delete("/{file_id}")
def delete_file(file_id: str, db: Session = Depends(get_db)):
    file = db.get(File, file_id)
    if not file:
        raise HTTPException(404, "File not found")
    path = Path(file.stored_path)
    if path.exists():
        path.unlink()
    parent = path.parent
    if parent.exists() and parent.is_dir() and not any(parent.iterdir()):
        parent.rmdir()
    db.delete(file)
    db.commit()
    return {"ok": True}


@router.get("/{file_id}/preview")
def preview_file(file_id: str, db: Session = Depends(get_db)):
    file = db.get(File, file_id)
    if not file:
        raise HTTPException(404, "File not found")
    path = Path(file.stored_path)
    if not path.exists():
        raise HTTPException(404, "Stored file missing")
    return FileResponse(path, media_type=file.mime, filename=file.name)
