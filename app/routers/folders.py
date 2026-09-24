from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import File, Folder, new_id

router = APIRouter(prefix="/api/folders", tags=["folders"])


class FolderIn(BaseModel):
    name: str
    parent_id: str | None = None


class FolderOut(BaseModel):
    id: str
    name: str
    parent_id: str | None
    created_at: datetime
    type: str = "folder"

    class Config:
        from_attributes = True


def _serialize(folder: Folder) -> dict:
    return {
        "id": folder.id,
        "name": folder.name,
        "parent_id": folder.parent_id,
        "created_at": folder.created_at.isoformat() + "Z",
        "type": "folder",
    }


@router.get("")
def list_folders(parent_id: str | None = None, db: Session = Depends(get_db)):
    q = db.query(Folder)
    if parent_id:
        q = q.filter(Folder.parent_id == parent_id)
    else:
        q = q.filter(Folder.parent_id.is_(None))
    return [_serialize(f) for f in q.order_by(Folder.name).all()]


@router.get("/tree")
def folder_tree(db: Session = Depends(get_db)):
    folders = db.query(Folder).order_by(Folder.name).all()
    by_parent: dict[str | None, list] = {}
    for f in folders:
        by_parent.setdefault(f.parent_id, []).append(_serialize(f))

    def nest(parent: str | None):
        nodes = []
        for item in by_parent.get(parent, []):
            item["children"] = nest(item["id"])
            nodes.append(item)
        return nodes

    return nest(None)


@router.post("", status_code=201)
def create_folder(body: FolderIn, db: Session = Depends(get_db)):
    name = body.name.strip()
    if not name:
        raise HTTPException(400, "Folder name is required")
    if body.parent_id:
        parent = db.get(Folder, body.parent_id)
        if not parent:
            raise HTTPException(404, "Parent folder not found")
    folder = Folder(id=new_id(), name=name, parent_id=body.parent_id)
    db.add(folder)
    db.commit()
    db.refresh(folder)
    return _serialize(folder)


@router.patch("/{folder_id}")
def rename_folder(folder_id: str, body: FolderIn, db: Session = Depends(get_db)):
    folder = db.get(Folder, folder_id)
    if not folder:
        raise HTTPException(404, "Folder not found")
    if body.name.strip():
        folder.name = body.name.strip()
    if body.parent_id is not None:
        folder.parent_id = body.parent_id or None
    db.commit()
    db.refresh(folder)
    return _serialize(folder)


def _delete_folder_tree(db: Session, folder: Folder) -> None:
    children = db.query(Folder).filter(Folder.parent_id == folder.id).all()
    for child in children:
        _delete_folder_tree(db, child)
    files = db.query(File).filter(File.folder_id == folder.id).all()
    for file in files:
        _remove_stored(file)
        db.delete(file)
    db.delete(folder)


def _remove_stored(file: File) -> None:
    from pathlib import Path
    import shutil

    path = Path(file.stored_path)
    parent = path.parent
    if path.exists():
        path.unlink()
    if parent.exists() and parent.is_dir() and not any(parent.iterdir()):
        shutil.rmtree(parent, ignore_errors=True)


@router.delete("/{folder_id}")
def delete_folder(folder_id: str, db: Session = Depends(get_db)):
    folder = db.get(Folder, folder_id)
    if not folder:
        raise HTTPException(404, "Folder not found")
    _delete_folder_tree(db, folder)
    db.commit()
    return {"ok": True}
