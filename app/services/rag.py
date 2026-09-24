"""
CloudNexus RAG service.

Handles:
1. PDF/DOCX/PPTX/TXT loading
2. Text chunking
3. Gemini embeddings
4. ChromaDB storage
5. Semantic + BM25 hybrid retrieval
"""

import os
from pathlib import Path
from typing import Any

import chromadb
from dotenv import load_dotenv
from rank_bm25 import BM25Okapi

from langchain_community.document_loaders import (
    PyPDFLoader,
    Docx2txtLoader,
    UnstructuredPowerPointLoader,
    TextLoader,
)

from langchain_text_splitters import (
    RecursiveCharacterTextSplitter
)

from langchain_google_genai import (
    GoogleGenerativeAIEmbeddings
)


load_dotenv()


# ============================================================
# GEMINI EMBEDDINGS
# ============================================================

embeddings = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001",
    google_api_key=os.getenv("GEMINI_API_KEY")
)


# ============================================================
# CHROMADB
# ============================================================

chroma_client = chromadb.PersistentClient(
    path="./chroma_db"
)

collection = chroma_client.get_or_create_collection(
    name="cloudnexus_documents"
)


# ============================================================
# DOCUMENT LOADER
# ============================================================

def _load_document(local_path: str):

    path = Path(local_path)
    extension = path.suffix.lower()

    if extension == ".pdf":

        loader = PyPDFLoader(
            str(path)
        )

    elif extension == ".docx":

        loader = Docx2txtLoader(
            str(path)
        )

    elif extension == ".pptx":

        loader = UnstructuredPowerPointLoader(
            str(path)
        )

    elif extension == ".txt":

        loader = TextLoader(
            str(path),
            encoding="utf-8"
        )

    else:

        raise ValueError(
            f"Unsupported file type: {extension}"
        )

    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )

    return splitter.split_documents(
        documents
    )


# ============================================================
# INDEX FILE
# ============================================================

def index_file(
    file_id: str,
    local_path: str,
    mime: str,
    folder_id: str | None = None,
) -> None:

    """
    Extract text, chunk, embed and store
    vectors in ChromaDB.
    """

    chunks = _load_document(
        local_path
    )

    if not chunks:

        raise ValueError(
            "No text could be extracted from file."
        )

    ids = []
    texts = []
    metadatas = []
    vectors = []

    filename = Path(
        local_path
    ).name

    for i, chunk in enumerate(
        chunks
    ):

        chunk_id = f"{file_id}_{i}"

        vector = embeddings.embed_query(
            chunk.page_content
        )

        metadata = {
            "file_id": file_id,
            "filename": filename,
            "mime": mime,
            "chunk_index": i,
            "folder_id": folder_id or "",
        }

        # Preserve loader metadata
        for key, value in chunk.metadata.items():

            if value is not None:

                metadata[str(key)] = str(value)

        ids.append(chunk_id)
        texts.append(
            chunk.page_content
        )
        metadatas.append(metadata)
        vectors.append(vector)

    collection.upsert(
        ids=ids,
        documents=texts,
        metadatas=metadatas,
        embeddings=vectors,
    )

    print(
        f"Indexed {filename}: "
        f"{len(chunks)} chunks"
    )


# ============================================================
# DELETE FILE FROM VECTOR STORE
# ============================================================

def delete_file_vectors(
    file_id: str
) -> None:

    results = collection.get(
        where={
            "file_id": file_id
        }
    )

    ids = results.get(
        "ids",
        []
    )

    if ids:

        collection.delete(
            ids=ids
        )


# ============================================================
# SEMANTIC SEARCH
# ============================================================

def _semantic_search(
    query: str,
    file_ids: list[str] | None,
    top_k: int,
):

    query_vector = embeddings.embed_query(
        query
    )

    kwargs = {
        "query_embeddings": [
            query_vector
        ],
        "n_results": top_k,
    }

    if file_ids:

        kwargs["where"] = {
            "file_id": {
                "$in": file_ids
            }
        }

    results = collection.query(
        **kwargs
    )

    output = []

    if not results.get("ids"):
        return output

    for i, doc_id in enumerate(
        results["ids"][0]
    ):

        output.append({
            "id": doc_id,
            "text": results[
                "documents"
            ][0][i],
            "file_name": results[
                "metadatas"
            ][0][i].get(
                "filename",
                "Unknown"
            ),
            "metadata": results[
                "metadatas"
            ][0][i],
            "distance": results[
                "distances"
            ][0][i],
        })

    return output


# ============================================================
# GET DOCUMENTS FOR BM25
# ============================================================

def _get_documents(
    file_ids: list[str] | None
):

    kwargs = {
        "include": [
            "documents",
            "metadatas"
        ]
    }

    if file_ids:

        kwargs["where"] = {
            "file_id": {
                "$in": file_ids
            }
        }

    results = collection.get(
        **kwargs
    )

    documents = []

    for i, doc_id in enumerate(
        results["ids"]
    ):

        documents.append({
            "id": doc_id,
            "text": results[
                "documents"
            ][i],
            "metadata": results[
                "metadatas"
            ][i],
        })

    return documents


# ============================================================
# BM25 SEARCH
# ============================================================

def _keyword_search(
    query: str,
    documents: list[dict],
    top_k: int,
):

    if not documents:

        return []

    tokenized_documents = [
        doc["text"].lower().split()
        for doc in documents
    ]

    bm25 = BM25Okapi(
        tokenized_documents
    )

    query_tokens = (
        query.lower().split()
    )

    scores = bm25.get_scores(
        query_tokens
    )

    ranked_indices = sorted(
        range(len(scores)),
        key=lambda i: scores[i],
        reverse=True
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
# HYBRID RETRIEVAL USING RRF
# ============================================================

def retrieve(
    query: str,
    folder_id: str | None = None,
    file_ids: list[str] | None = None,
    top_k: int = 8,
) -> list[dict[str, Any]]:

    """
    Hybrid retrieval:

        Gemini + Chroma semantic search
                    +
                BM25 keyword search
                    ↓
                  RRF
                    ↓
                Top results
    """

    # --------------------------------------------------------
    # Semantic results
    # --------------------------------------------------------

    semantic_results = _semantic_search(
        query=query,
        file_ids=file_ids,
        top_k=top_k,
    )

    # --------------------------------------------------------
    # Documents for BM25
    # --------------------------------------------------------

    documents = _get_documents(
        file_ids=file_ids
    )

    # If folder filtering is being used
    # without explicit file_ids
    if folder_id and not file_ids:

        documents = [
            doc
            for doc in documents
            if doc["metadata"].get(
                "folder_id",
                ""
            ) == folder_id
        ]

    # --------------------------------------------------------
    # Keyword results
    # --------------------------------------------------------

    keyword_results = _keyword_search(
        query=query,
        documents=documents,
        top_k=top_k,
    )

    # --------------------------------------------------------
    # Reciprocal Rank Fusion
    # --------------------------------------------------------

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
                0
            )
            + 1 / (
                rrf_k
                + rank
                + 1
            )
        )

        result_data[doc_id] = result

    # Keyword ranking
    for rank, result in enumerate(
        keyword_results
    ):

        doc_id = result["id"]

        rrf_scores[doc_id] = (
            rrf_scores.get(
                doc_id,
                0
            )
            + 1 / (
                rrf_k
                + rank
                + 1
            )
        )

        if doc_id not in result_data:

            result_data[doc_id] = {
                "id": doc_id,
                "text": result["text"],
                "file_name": result[
                    "metadata"
                ].get(
                    "filename",
                    "Unknown"
                ),
                "metadata": result[
                    "metadata"
                ],
            }

    # --------------------------------------------------------
    # Sort
    # --------------------------------------------------------

    ranked = sorted(
        rrf_scores.items(),
        key=lambda x: x[1],
        reverse=True
    )

    final_results = []

    for doc_id, score in ranked[:top_k]:

        result = result_data[
            doc_id
        ].copy()

        result[
            "hybrid_score"
        ] = score

        final_results.append(
            result
        )

    return final_results