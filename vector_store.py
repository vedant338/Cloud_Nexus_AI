import os
import chromadb

from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings

load_dotenv()

# Gemini Embeddings
embeddings = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001",
    google_api_key=os.getenv("GEMINI_API_KEY")
)

# ChromaDB
chroma_client = chromadb.Client()

collection = chroma_client.get_or_create_collection(
    name="cloudnexus_documents"
)


def add_documents(documents):
    """
    Add documents to ChromaDB using Gemini embeddings.
    """
    ids = []
    texts = []
    metadatas = []
    vectors = []

    for i,doc in enumerate(documents):
        source = doc.metadata.get(
            "source",
            "unknown"
        )

        page = doc.metadata.get(
            "page",
            0
        )

        doc_id = f"{source}_{page}_{i}"

        vector = embeddings.embed_query(
            doc.page_content
        )

        ids.append(doc_id)
        texts.append(doc.page_content)
        vectors.append(vector)
        metadata = {
            str(k): str(v)
            for k, v in doc.metadata.items()
            if v is not None
        }

        metadata["chunk_id"] = doc_id

        metadatas.append(metadata)

    collection.upsert(
        ids=ids,
        documents=texts,
        metadatas=metadatas,
        embeddings=vectors
    )

    print(
        f"Stored {len(documents)} chunks in ChromaDB"
    )


        

def semantic_search(query, top_k=3):
    """
    Search ChromaDB using semantic similarity.
    """

    query_vector = embeddings.embed_query(query)

    results = collection.query(
        query_embeddings=[query_vector],
        n_results=top_k
    )
    semantic_results = []
    for i in range(len(results["ids"][0])):

        semantic_results.append({
            "id": results["ids"][0][i],
            "text": results["documents"][0][i],
            "metadata": results["metadatas"][0][i],
            "distance": results["distances"][0][i]
        })
    return semantic_results