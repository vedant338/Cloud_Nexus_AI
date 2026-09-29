"""
CloudNexus RAG Service

Pipeline:

PDF / DOCX / PPTX / TXT / MD
        ↓
Text extraction
        ↓
Chunking
        ↓
Gemini embeddings
        ↓
ChromaDB
        +
BM25 keyword retrieval
        ↓
Reciprocal Rank Fusion (RRF)
        ↓
Top-K relevant chunks
"""

import os
from pathlib import Path
from typing import Any

import chromadb
from dotenv import load_dotenv
from rank_bm25 import BM25Okapi

from langchain_core.documents import Document
from langchain_community.document_loaders import (
    PyPDFLoader,
    Docx2txtLoader,
    TextLoader,
)
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings


# ============================================================
# ENVIRONMENT
# ============================================================

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError(
        "GEMINI_API_KEY is missing from .env"
    )


# ============================================================
# EMBEDDINGS
# ============================================================

embeddings = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001",
    google_api_key=GEMINI_API_KEY,
)


# ============================================================
# CHROMA
# ============================================================

CHROMA_PATH = "./chroma_db"

chroma_client = chromadb.PersistentClient(
    path=CHROMA_PATH
)

collection = chroma_client.get_or_create_collection(
    name="cloudnexus_documents"
)


# ============================================================
# TEXT SPLITTER
# ============================================================

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=[
        "\n\n",
        "\n",
        ". ",
        " ",
        "",
    ],
)


# ============================================================
# PDF
# ============================================================

def _load_pdf(path: Path) -> list[Document]:

    loader = PyPDFLoader(str(path))

    documents = loader.load()

    normalized = []

    for document in documents:

        metadata = dict(document.metadata)

        page = metadata.get("page")

        if page is not None:
            metadata["page"] = int(page) + 1

        normalized.append(
            Document(
                page_content=document.page_content,
                metadata=metadata,
            )
        )

    return normalized


# ============================================================
# DOCX
# ============================================================

def _load_docx(path: Path) -> list[Document]:

    loader = Docx2txtLoader(str(path))

    documents = loader.load()

    normalized = []

    for document in documents:

        normalized.append(
            Document(
                page_content=document.page_content,
                metadata=dict(document.metadata),
            )
        )

    return normalized


# ============================================================
# PPTX
# ============================================================

def _load_pptx(path: Path) -> list[Document]:
    """
    Extract PPTX slide-by-slide.

    This is intentionally implemented using
    python-pptx instead of UnstructuredPowerPointLoader
    so that slide numbers remain reliable.
    """

    try:
        from pptx import Presentation
    except ImportError:

        raise RuntimeError(
            "python-pptx is required for PPTX indexing. "
            "Install it with: pip install python-pptx"
        )

    presentation = Presentation(str(path))

    documents = []

    for slide_number, slide in enumerate(
        presentation.slides,
        start=1,
    ):

        texts = []

        for shape in slide.shapes:

            if not hasattr(shape, "text"):
                continue

            text = shape.text.strip()

            if text:
                texts.append(text)

        slide_text = "\n".join(texts).strip()

        if not slide_text:
            continue

        documents.append(
            Document(
                page_content=slide_text,
                metadata={
                    "slide": slide_number,
                },
            )
        )

    return documents


# ============================================================
# TXT / MD
# ============================================================

def _load_text(path: Path) -> list[Document]:

    loader = TextLoader(
        str(path),
        encoding="utf-8",
    )

    documents = loader.load()

    return [
        Document(
            page_content=document.page_content,
            metadata=dict(document.metadata),
        )
        for document in documents
    ]


# ============================================================
# LOAD DOCUMENT
# ============================================================

def _load_document(
    local_path: str,
) -> list[Document]:

    path = Path(local_path)

    extension = path.suffix.lower()

    if extension == ".pdf":

        documents = _load_pdf(path)

    elif extension == ".docx":

        documents = _load_docx(path)

    elif extension == ".pptx":

        documents = _load_pptx(path)

    elif extension in {
        ".txt",
        ".md",
        ".markdown",
    }:

        documents = _load_text(path)

    else:

        raise ValueError(
            f"Unsupported file type: {extension}"
        )

    if not documents:

        raise ValueError(
            "No text could be extracted from file."
        )

    return documents


# ============================================================
# NORMALIZE + CHUNK
# ============================================================

def _prepare_chunks(
    local_path: str,
) -> list[Document]:

    documents = _load_document(local_path)

    chunks = splitter.split_documents(
        documents
    )

    if not chunks:

        raise ValueError(
            "No text chunks were created."
        )

    return chunks


# ============================================================
# INDEX FILE
# ============================================================

def index_file(
    file_id: str,
    local_path: str,
    mime: str,
    folder_id: str | None = None,
) -> None:

    path = Path(local_path)

    filename = path.name

    print(
        f"\n[RAG] Indexing: {filename}"
    )

    # -----------------------------------------
    # Prepare chunks
    # -----------------------------------------

    chunks = _prepare_chunks(
        local_path
    )

    print(
        f"[RAG] Extracted {len(chunks)} chunks"
    )

    # -----------------------------------------
    # Delete old vectors
    # -----------------------------------------

    delete_file_vectors(
        file_id
    )

    # -----------------------------------------
    # Prepare text
    # -----------------------------------------

    texts = [
        chunk.page_content
        for chunk in chunks
    ]

    # -----------------------------------------
    # Batch embeddings
    # -----------------------------------------

    print(
        "[RAG] Generating embeddings..."
    )

    vectors = embeddings.embed_documents(
        texts
    )

    # -----------------------------------------
    # Prepare Chroma records
    # -----------------------------------------

    ids = []

    metadatas = []

    for index, chunk in enumerate(
        chunks
    ):

        chunk_id = (
            f"{file_id}_{index}"
        )

        metadata = {
            "file_id": file_id,
            "filename": filename,
            "mime": mime,
            "folder_id": folder_id or "",
            "chunk_index": index,
            "source_type": path.suffix.lower().lstrip("."),
        }

        # -------------------------------------
        # Preserve source location
        # -------------------------------------

        original_metadata = (
            chunk.metadata or {}
        )

        if "page" in original_metadata:

            metadata["page"] = str(
                original_metadata["page"]
            )

        if "slide" in original_metadata:

            metadata["slide"] = str(
                original_metadata["slide"]
            )

        # -------------------------------------
        # Preserve other useful metadata
        # -------------------------------------

        for key, value in original_metadata.items():

            if value is None:
                continue

            key = str(key)

            if key in metadata:
                continue

            # Chroma metadata values must be
            # primitive types.
            if isinstance(
                value,
                (str, int, float, bool),
            ):

                metadata[key] = value

            else:

                metadata[key] = str(value)

        ids.append(chunk_id)

        metadatas.append(metadata)

    # -----------------------------------------
    # Store in Chroma
    # -----------------------------------------

    collection.upsert(
        ids=ids,
        documents=texts,
        metadatas=metadatas,
        embeddings=vectors,
    )

    print(
        f"[RAG] Indexed {filename}: "
        f"{len(chunks)} chunks"
    )


# ============================================================
# DELETE FILE VECTORS
# ============================================================

def delete_file_vectors(
    file_id: str,
) -> None:

    results = collection.get(
        where={
            "file_id": file_id
        }
    )

    ids = results.get(
        "ids",
        [],
    )

    if ids:

        collection.delete(
            ids=ids
        )

        print(
            f"[RAG] Deleted {len(ids)} "
            f"vectors for {file_id}"
        )


# ============================================================
# SEMANTIC SEARCH
# ============================================================

def _semantic_search(
    query: str,
    file_ids: list[str] | None,
    folder_id: str | None,
    top_k: int,
) -> list[dict[str, Any]]:

    query_vector = embeddings.embed_query(
        query
    )

    # -----------------------------------------
    # Scope filter
    # -----------------------------------------

    where = None

    if file_ids:

        where = {
            "file_id": {
                "$in": file_ids
            }
        }

    elif folder_id:

        where = {
            "folder_id": folder_id
        }

    # -----------------------------------------
    # Chroma query
    # -----------------------------------------

    kwargs = {
        "query_embeddings": [
            query_vector
        ],
        "n_results": top_k,
    }

    if where:

        kwargs["where"] = where

    results = collection.query(
        **kwargs
    )

    output = []

    result_ids = results.get(
        "ids",
        [],
    )

    if not result_ids:
        return output

    documents = results.get(
        "documents",
        [[]],
    )[0]

    metadatas = results.get(
        "metadatas",
        [[]],
    )[0]

    distances = results.get(
        "distances",
        [[]],
    )[0]

    for index, doc_id in enumerate(
        result_ids[0]
    ):

        metadata = (
            metadatas[index]
            if index < len(metadatas)
            else {}
        )

        output.append(
            {
                "id": doc_id,
                "text": documents[index],
                "file_name": metadata.get(
                    "filename",
                    "Unknown",
                ),
                "metadata": metadata,
                "distance": (
                    distances[index]
                    if index < len(distances)
                    else None
                ),
            }
        )

    return output


# ============================================================
# GET DOCUMENTS FOR BM25
# ============================================================

def _get_documents(
    file_ids: list[str] | None,
    folder_id: str | None,
) -> list[dict[str, Any]]:

    where = None

    if file_ids:

        where = {
            "file_id": {
                "$in": file_ids
            }
        }

    elif folder_id:

        where = {
            "folder_id": folder_id
        }

    kwargs = {
        "include": [
            "documents",
            "metadatas",
        ]
    }

    if where:

        kwargs["where"] = where

    results = collection.get(
        **kwargs
    )

    documents = []

    ids = results.get(
        "ids",
        [],
    )

    texts = results.get(
        "documents",
        [],
    )

    metadatas = results.get(
        "metadatas",
        [],
    )

    for index, doc_id in enumerate(
        ids
    ):

        documents.append(
            {
                "id": doc_id,
                "text": texts[index],
                "metadata": metadatas[index],
            }
        )

    return documents


# ============================================================
# BM25 SEARCH
# ============================================================

def _keyword_search(
    query: str,
    documents: list[dict[str, Any]],
    top_k: int,
) -> list[dict[str, Any]]:

    if not documents:
        return []

    tokenized_documents = [
        doc["text"]
        .lower()
        .split()
        for doc in documents
    ]

    bm25 = BM25Okapi(
        tokenized_documents
    )

    query_tokens = (
        query
        .lower()
        .split()
    )

    scores = bm25.get_scores(
        query_tokens
    )

    ranked_indices = sorted(
        range(len(scores)),
        key=lambda index: scores[index],
        reverse=True,
    )

    results = []

    for index in ranked_indices[:top_k]:

        result = documents[
            index
        ].copy()

        result["bm25_score"] = float(
            scores[index]
        )

        results.append(
            result
        )

    return results


# ============================================================
# HYBRID RETRIEVAL
# ============================================================

def retrieve(
    query: str,
    folder_id: str | None = None,
    file_ids: list[str] | None = None,
    top_k: int = 8,
) -> list[dict[str, Any]]:
    """
    Hybrid retrieval:

    Semantic search
          +
    BM25 keyword search
          ↓
    Reciprocal Rank Fusion
          ↓
    Top-K results
    """

    # -----------------------------------------
    # Semantic search
    # -----------------------------------------

    semantic_results = _semantic_search(
        query=query,
        file_ids=file_ids,
        folder_id=folder_id,
        top_k=top_k,
    )

    # -----------------------------------------
    # BM25 corpus
    # -----------------------------------------

    documents = _get_documents(
        file_ids=file_ids,
        folder_id=folder_id,
    )

    keyword_results = _keyword_search(
        query=query,
        documents=documents,
        top_k=top_k,
    )

    # -----------------------------------------
    # Reciprocal Rank Fusion
    # -----------------------------------------

    rrf_scores = {}

    result_data = {}

    rrf_k = 60

    # Semantic ranking
    for rank, result in enumerate(
        semantic_results
    ):

        doc_id = result["id"]

        rrf_scores[doc_id] = (
            rrf_scores.get(
                doc_id,
                0,
            )
            + 1
            / (
                rrf_k
                + rank
                + 1
            )
        )

        result_data[
            doc_id
        ] = result

    # Keyword ranking
    for rank, result in enumerate(
        keyword_results
    ):

        doc_id = result["id"]

        rrf_scores[doc_id] = (
            rrf_scores.get(
                doc_id,
                0,
            )
            + 1
            / (
                rrf_k
                + rank
                + 1
            )
        )

        if doc_id not in result_data:

            metadata = result.get(
                "metadata",
                {},
            )

            result_data[
                doc_id
            ] = {
                "id": doc_id,
                "text": result[
                    "text"
                ],
                "file_name": metadata.get(
                    "filename",
                    "Unknown",
                ),
                "metadata": metadata,
            }

    # -----------------------------------------
    # Sort by RRF score
    # -----------------------------------------

    ranked = sorted(
        rrf_scores.items(),
        key=lambda item: item[1],
        reverse=True,
    )

    # -----------------------------------------
    # Final results
    # -----------------------------------------

    final_results = []

    for doc_id, score in ranked[
        :top_k
    ]:

        result = (
            result_data[
                doc_id
            ].copy()
        )

        result[
            "hybrid_score"
        ] = float(score)

        metadata = result.get(
            "metadata",
            {},
        )

        # Convenient citation fields
        if "page" in metadata:

            result["page"] = metadata[
                "page"
            ]

        if "slide" in metadata:

            result["slide"] = metadata[
                "slide"
            ]

        final_results.append(
            result
        )

    return final_results