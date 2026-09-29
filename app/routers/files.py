import tempfile
from pathlib import Path

from fastapi import (
    APIRouter,
    Depends,
    File as UploadFileParam,
    Form,
    HTTPException,
    UploadFile,
)
from fastapi.responses import RedirectResponse, Response
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import File, Folder, new_id
from app.services.s3 import (
    upload_bytes,
    delete_object,
    presign_get,
    download_object,
)
from app.services.rag import (index_file , delete_file_vectors)


router = APIRouter(
    prefix="/api/files",
    tags=["files"],
)


# ============================================================
# REQUEST MODELS
# ============================================================

class ShortNoteIn(BaseModel):
    content: str
    folder_id: str | None = None
    source_file_id: str | None = None


class FilePatch(BaseModel):
    name: str | None = None
    folder_id: str | None = None


# ============================================================
# FILE CONTENT
# Used by PDF / Markdown / TXT viewers
# ============================================================

@router.get("/{file_id}/content")
def file_content(
    file_id: str,
    db: Session = Depends(get_db),
):
    print("\n==============================")
    print("CONTENT REQUEST")
    print("FILE ID:", file_id)
    print("==============================")

    # -----------------------------------------
    # Find file in database
    # -----------------------------------------

    file = db.get(File, file_id)

    if not file:

        print(
            "ERROR: FILE NOT FOUND IN DATABASE"
        )

        raise HTTPException(
            status_code=404,
            detail=f"File not found: {file_id}",
        )

    print("FILE FOUND")
    print("Name:", file.name)
    print("Stored path:", file.stored_path)
    print("Mime:", file.mime)


    # -----------------------------------------
    # Check S3 path
    # -----------------------------------------

    if not file.stored_path:

        print(
            "ERROR: STORED PATH IS EMPTY"
        )

        raise HTTPException(
            status_code=404,
            detail="File storage path not found",
        )


    temp_path = None

    try:

        # -------------------------------------
        # Create temporary local file
        # -------------------------------------

        suffix = Path(file.name).suffix

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=suffix,
        ) as tmp:

            temp_path = tmp.name


        print(
            "Downloading from S3:",
            file.stored_path,
        )


        # -------------------------------------
        # Download from S3
        # -------------------------------------

        download_object(
            file.stored_path,
            temp_path,
        )


        print(
            "S3 download successful"
        )


        # -------------------------------------
        # Read bytes
        # -------------------------------------

        data = Path(
            temp_path
        ).read_bytes()


        print(
            "Downloaded bytes:",
            len(data),
        )


        # -------------------------------------
        # Return file
        # -------------------------------------

        return Response(
            content=data,
            media_type=file.mime or "application/octet-stream",
            headers={
                "Content-Disposition":
                    f'inline; filename="{file.name}"'
            },
        )


    except Exception as e:

        print(
            "ERROR DOWNLOADING FILE:",
            repr(e),
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Could not read file from S3: "
                f"{str(e)}"
            ),
        )


    finally:

        # -------------------------------------
        # Remove temporary file
        # -------------------------------------

        if temp_path:

            Path(temp_path).unlink(
                missing_ok=True
            )


# ============================================================
# SERIALIZE FILE
# ============================================================

def _serialize(file: File) -> dict:

    return {
        "id": file.id,
        "name": file.name,
        "folder_id": file.folder_id,
        "mime": file.mime,
        "size_bytes": file.size_bytes,
        "created_at":
            file.created_at.isoformat() + "Z",
        "type": "file",

        "preview_url":
            f"/api/files/{file.id}/preview",
    }


# ============================================================
# LIST FILES
# ============================================================

@router.get("")
def list_files(
    parent_id: str | None = None,
    db: Session = Depends(get_db),
):

    q = db.query(File)

    if parent_id:

        q = q.filter(
            File.folder_id == parent_id
        )

    else:

        q = q.filter(
            File.folder_id.is_(None)
        )


    return [
        _serialize(f)
        for f in q.order_by(
            File.name
        ).all()
    ]


# ============================================================
# UPLOAD FILE
# ============================================================

@router.post("", status_code=201)
async def upload_file(
    upload: UploadFile = UploadFileParam(...),
    folder_id: str | None = Form(default=None),
    db: Session = Depends(get_db),
):

    # -----------------------------------------
    # Validate folder
    # -----------------------------------------

    if folder_id:

        if not db.get(
            Folder,
            folder_id,
        ):

            raise HTTPException(
                status_code=404,
                detail="Folder not found",
            )


    # -----------------------------------------
    # File information
    # -----------------------------------------

    file_id = new_id()

    filename = (
        upload.filename
        or "untitled"
    )

    data = await upload.read()

    mime = (
        upload.content_type
        or "application/octet-stream"
    )


    # -----------------------------------------
    # S3 key
    # -----------------------------------------

    s3_key = (
        f"documents/{file_id}/{filename}"
    )


    # -----------------------------------------
    # Upload to S3
    # -----------------------------------------

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


    # -----------------------------------------
    # Save database record
    # -----------------------------------------

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


    # -----------------------------------------
    # RAG indexing
    # -----------------------------------------

    indexed = False
    index_error = None
    temp_path = None

    try:

        suffix = Path(filename).suffix

        with tempfile.NamedTemporaryFile(
            suffix=suffix,
            delete=False,
        ) as temp:

            temp_path = temp.name

            temp.write(data)


        index_file(
            file_id=file_id,
            local_path=temp_path,
            mime=mime,
            folder_id=folder_id,
        )


        indexed = True


    except Exception as e:

        index_error = str(e)

        print(
            f"RAG indexing failed: {e}"
        )


    finally:

        if temp_path:

            Path(temp_path).unlink(
                missing_ok=True
            )


    # -----------------------------------------
    # Return
    # -----------------------------------------

    return {
        **_serialize(record),

        "indexed": indexed,

        "storage": "s3",

        "s3_key": s3_key,

        "index_error": index_error,
    }


# ============================================================
# CREATE SHORT NOTE
# ============================================================

@router.post(
    "/short-note",
    status_code=201,
)
async def create_short_note(
    body: ShortNoteIn,
    db: Session = Depends(get_db),
):

    if not body.content.strip():

        raise HTTPException(
            status_code=400,
            detail="Short note content is empty",
        )


    # -----------------------------------------
    # Validate folder
    # -----------------------------------------

    if body.folder_id:

        if not db.get(
            Folder,
            body.folder_id,
        ):

            raise HTTPException(
                status_code=404,
                detail="Folder not found",
            )


    # -----------------------------------------
    # Find source file
    # -----------------------------------------

    source_file = None

    if body.source_file_id:

        source_file = db.get(
            File,
            body.source_file_id,
        )


    # -----------------------------------------
    # Generate filename
    # -----------------------------------------

    if source_file:

        base_name = Path(
            source_file.name
        ).stem

        filename = (
            f"{base_name} - Short Notes.md"
        )

    else:

        filename = "Short Notes.md"


    # -----------------------------------------
    # Create ID
    # -----------------------------------------

    file_id = new_id()


    # -----------------------------------------
    # Markdown content
    # -----------------------------------------

    markdown = (
        f"# {Path(filename).stem}\n\n"
        f"{body.content.strip()}\n"
    )

    data = markdown.encode(
        "utf-8"
    )

    mime = "text/markdown"


    # -----------------------------------------
    # S3
    # -----------------------------------------

    s3_key = (
        f"documents/{file_id}/{filename}"
    )

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


    # -----------------------------------------
    # Database
    # -----------------------------------------

    record = File(
        id=file_id,
        name=filename,
        folder_id=body.folder_id,
        stored_path=s3_key,
        mime=mime,
        size_bytes=len(data),
    )

    db.add(record)

    db.commit()

    db.refresh(record)


    # -----------------------------------------
    # RAG indexing
    # -----------------------------------------

    indexed = False
    index_error = None
    temp_path = None

    try:

        with tempfile.NamedTemporaryFile(
            suffix=".md",
            delete=False,
        ) as temp:

            temp_path = temp.name

            temp.write(data)


        index_file(
            file_id=file_id,
            local_path=temp_path,
            mime=mime,
            folder_id=body.folder_id,
        )


        indexed = True


    except Exception as e:

        index_error = str(e)

        print(
            "Short note indexing failed:",
            e,
        )


    finally:

        if temp_path:

            Path(temp_path).unlink(
                missing_ok=True
            )


    # -----------------------------------------
    # Return
    # -----------------------------------------

    return {

        **_serialize(record),

        "indexed": indexed,

        "storage": "s3",

        "s3_key": s3_key,

        "source_file_id":
            body.source_file_id,

        "index_error":
            index_error,
    }


# ============================================================
# PATCH FILE
# ============================================================

@router.patch("/{file_id}")
def patch_file(
    file_id: str,
    body: FilePatch,
    db: Session = Depends(get_db),
):

    file = db.get(
        File,
        file_id,
    )

    if not file:

        raise HTTPException(
            status_code=404,
            detail="File not found",
        )


    # -----------------------------------------
    # Rename
    # -----------------------------------------

    if body.name and body.name.strip():

        file.name = (
            body.name.strip()
        )


    # -----------------------------------------
    # Move folder
    # -----------------------------------------

    if (
        "folder_id"
        in body.model_fields_set
    ):

        if body.folder_id:

            if not db.get(
                Folder,
                body.folder_id,
            ):

                raise HTTPException(
                    status_code=404,
                    detail="Folder not found",
                )


        file.folder_id = body.folder_id


    db.commit()

    db.refresh(file)

    return _serialize(file)


# ============================================================
# PREVIEW
# ============================================================

@router.get("/{file_id}/preview")
def preview_file(
    file_id: str,
    db: Session = Depends(get_db),
):

    file = db.get(
        File,
        file_id,
    )

    if not file:

        raise HTTPException(
            status_code=404,
            detail="File not found",
        )


    if not file.stored_path:

        raise HTTPException(
            status_code=404,
            detail="File storage path not found",
        )


    try:

        url = presign_get(
            file.stored_path,
            expires_seconds=600,
        )


        return RedirectResponse(
            url=url,
            status_code=307,
        )


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=(
                "Could not generate "
                f"preview URL: {str(e)}"
            ),
        )

# ============================================================
# DELETE FILE
# ============================================================

@router.delete("/{file_id}")
def delete_file(
    file_id: str,
    db: Session = Depends(get_db),
):

    file = db.get(
        File,
        file_id,
    )

    if not file:
        raise HTTPException(
            status_code=404,
            detail="File not found",
        )

    # -----------------------------------------
    # Delete RAG vectors
    # -----------------------------------------

    try:
        delete_file_vectors(file_id)

    except Exception as e:
        print(
            "RAG vector deletion failed:",
            e,
        )

    # -----------------------------------------
    # Delete from S3
    # -----------------------------------------

    if file.stored_path:

        try:
            delete_object(
                file.stored_path
            )

        except Exception as e:

            print(
                "S3 delete failed:",
                e,
            )

    # -----------------------------------------
    # Delete database record
    # -----------------------------------------

    db.delete(file)

    db.commit()

    return {
        "ok": True,
        "file_id": file_id,
        "message": "File deleted successfully",
    }