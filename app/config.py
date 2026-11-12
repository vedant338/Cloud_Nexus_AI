from pathlib import Path
from dotenv import load_dotenv

import os

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_DIR = BASE_DIR / "uploads"
DATABASE_URL = f"sqlite:///{BASE_DIR / 'nexus.db'}"
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://172.21.96.1:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2:3b")
OLLAMA_NUM_CTX = int(os.getenv("OLLAMA_NUM_CTX", "8192"))

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
