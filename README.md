# Cloud Nexus AI

Google Drive–style file manager for study notes, PPTs, and PDFs, with a Nexus AI panel on the right.

S3, RAG, and the LLM are stubbed in `app/services/` so you can plug them in later. Uploads are stored locally in `uploads/`.

## Run

```powershell
cd C:\Users\lenovo\cloud-nexus-ai
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Open http://127.0.0.1:8000

## What works now

- Folders (create, nested tree, rename/delete via right-click)
- File upload (button or drag-and-drop), preview, move/rename/delete
- AI chat UI (Explain / Short notes) scoped to the current folder or selected files

## Plug in later

- `app/services/s3.py` — Amazon S3
- `app/services/rag.py` — extract + retrieve
- `app/services/llm.py` — grounded explanations and short notes
