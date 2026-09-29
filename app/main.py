from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request,HTTPException, Depends
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.db import init_db, get_db
from app.routers import chat, files, folders
from app.models import File
from app.services.s3 import download_object

from sqlalchemy.orm import Session
from markupsafe import Markup
from docx import Document

import tempfile
import markdown
# --------------------------------------------------
# Paths
# --------------------------------------------------

BASE_DIR = Path(__file__).parent

TEMPLATES_DIR = BASE_DIR / "templates"
STATIC_DIR = BASE_DIR / "static"

# --------------------------------------------------
# Application startup
# --------------------------------------------------

@asynccontextmanager
async def lifespan(_app: FastAPI):

    init_db()

    yield


# --------------------------------------------------
# FastAPI application
# --------------------------------------------------

app = FastAPI(
    title="Cloud Nexus AI",
    lifespan=lifespan
)


# --------------------------------------------------
# Static files
# --------------------------------------------------

app.mount(
    "/static",
    StaticFiles(
        directory=str(STATIC_DIR)
    ),
    name="static"
)


# --------------------------------------------------
# Templates
# --------------------------------------------------

templates = Jinja2Templates(
    directory=str(TEMPLATES_DIR)
)


# --------------------------------------------------
# API Routers
# --------------------------------------------------

app.include_router(
    folders.router
)

app.include_router(
    files.router
)

app.include_router(
    chat.router
)


# --------------------------------------------------
# Frontend
# --------------------------------------------------

@app.get(
    "/",
    response_class=HTMLResponse
)
def drive(request: Request):
      return templates.TemplateResponse(request=request, name="drive.html", context={"request": request})

@app.get("/pdf-viewer", response_class=HTMLResponse)
def pdf_viewer(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="pdf_viewer.html",
        context={"request": request},
    )

@app.get("/markdown-viewer", response_class=HTMLResponse)
def markdown_viewer(
    request: Request,
    file_id: str,
    db: Session = Depends(get_db),
):
    file = db.get(File, file_id)

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

    temp_path = None

    try:

        # -----------------------------------------
        # Download Markdown from S3
        # -----------------------------------------

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".md",
        ) as tmp:

            temp_path = tmp.name

        download_object(
            file.stored_path,
            temp_path,
        )

        # -----------------------------------------
        # Read Markdown
        # -----------------------------------------

        markdown_text = Path(
            temp_path
        ).read_text(
            encoding="utf-8"
        )
        markdown_html = markdown.markdown(markdown_text,extensions=['fenced_code', 'tables','extra','toc'],)
        print(
            f"Markdown loaded: {file.name}"
        )

        print(
            f"Characters: {len(markdown_text)}"
        )

        # -----------------------------------------
        # Render viewer
        # -----------------------------------------

        return templates.TemplateResponse(
            request=request,
            name="markdown_viewer.html",
            context={
                "request": request,
                "file_id": file.id,
                "file_name": file.name,
                "markdown_text": markdown_text,
                "markdown_html": Markup(markdown_html),
            },
        )

    except Exception as e:

        print(
            "Markdown viewer error:",
            repr(e)
        )

        raise HTTPException(
            status_code=500,
            detail=f"Could not load Markdown: {str(e)}",
        )

    finally:

        if temp_path:

            Path(temp_path).unlink(
                missing_ok=True
            )

@app.get("/txt-viewer", response_class=HTMLResponse)
def txt_viewer(
    request: Request,
    file_id: str,
    db: Session = Depends(get_db),
):
    file = db.get(File, file_id)

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

    temp_path = None

    try:

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".txt",
        ) as tmp:

            temp_path = tmp.name

        download_object(
            file.stored_path,
            temp_path,
        )

        text_content = Path(
            temp_path
        ).read_text(
            encoding="utf-8",
            errors="replace",
        )

        return templates.TemplateResponse(
            request=request,
            name="txt_viewer.html",
            context={
                "request": request,
                "file_id": file.id,
                "file_name": file.name,
                "text_content": text_content,
            },
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Could not load TXT file: {str(e)}",
        )

    finally:

        if temp_path:
            Path(temp_path).unlink(
                missing_ok=True
            )

@app.get("/docx-viewer", response_class=HTMLResponse)
def docx_viewer(
    request: Request,
    file_id: str,
    db: Session = Depends(get_db),
):
    file = db.get(File, file_id)

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

    temp_path = None

    try:
        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".docx",
        ) as tmp:
            temp_path = tmp.name

        download_object(
            file.stored_path,
            temp_path,
        )
        document = Document(temp_path)

        paragraphs = []

        for paragraph in document.paragraphs:
            text = paragraph.text.strip()

            if text:
                paragraphs.append({
                    "text": text,
                    "style": paragraph.style.name
                    if paragraph.style
                    else "",
                })

        return templates.TemplateResponse(
            request=request,
            name="docx_viewer.html",
            context={
                "request": request,
                "file_id": file.id,
                "file_name": file.name,
                "paragraphs": paragraphs,
            },
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Could not load DOCX file: {str(e)}",
        )

    finally:
        if temp_path:
            Path(temp_path).unlink(
                missing_ok=True
            )
@app.get("/pptx-viewer", response_class=HTMLResponse)
def pptx_viewer(
    request: Request,
    file_id: str,
    db: Session = Depends(get_db),
):
    file = db.get(File, file_id)

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

    return templates.TemplateResponse(
        request=request,
        name="pptx_viewer.html",
        context={
            "request": request,
            "file_id": file.id,
            "file_name": file.name,
        },
    )