from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.db import init_db
from app.routers import chat, files, folders


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