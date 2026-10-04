"""
CloudNexus LLM service.

Uses local Llama 3.2 through Ollama.

The LLM is strictly grounded in the retrieved
document chunks supplied by the RAG pipeline.
"""

from typing import Any
from langchain_ollama import ChatOllama


# =========================================================
# LLM
# =========================================================

llm = ChatOllama(
    model="llama3.2:3b",
    base_url="http://172.21.96.1:11434",
    temperature=0,
)


# =========================================================
# BUILD SOURCE LABEL
# =========================================================

def _source_label(
    chunk: dict[str, Any],
    number: int,
) -> str:

    filename = chunk.get(
        "file_name",
        "Unknown file",
    )

    page = chunk.get("page")
    slide = chunk.get("slide")

    if page:
        location = f"page {page}"

    elif slide:
        location = f"slide {slide}"

    else:
        location = "document"

    return (
        f"[{number}] "
        f"{filename} "
        f"({location})"
    )


# =========================================================
# COMPLETE
# =========================================================

def complete(
    message: str,
    mode: str,
    context_chunks: list[dict[str, Any]],
) -> str:

    # -----------------------------------------------------
    # NO RELEVANT CONTEXT
    # -----------------------------------------------------

    if not context_chunks:
        return (
            "I couldn't find enough information about this "
            "in the provided documents."
        )


    # -----------------------------------------------------
    # BUILD GROUNDED CONTEXT
    # -----------------------------------------------------

    context_parts = []

    for i, chunk in enumerate(
        context_chunks,
        start=1,
    ):

        source = _source_label(
            chunk,
            i,
        )

        text = chunk.get(
            "retrieved_text",
            chunk.get(
                "text",
                "",
            ),
        )

        if not text.strip():
            continue

        context_parts.append(
            f"""
SOURCE {i}
{source}

CONTENT:
{text}
"""
        )


    context = "\n\n".join(
        context_parts
    )


    # -----------------------------------------------------
    # RESPONSE MODE
    # -----------------------------------------------------

    if mode == "short_notes":

        instruction = """
Give the answer as concise study notes.

Use:
- short bullet points
- important definitions
- important facts
- formulas when present
- examples only when supported by the documents

Keep the answer easy to revise.
"""

    else:

        instruction = """
Give a clear and complete explanation.

Use:
- short paragraphs
- bullet points where useful
- definitions when appropriate
- examples only when supported by the documents
"""


    # -----------------------------------------------------
    # STRICT GROUNDING PROMPT
    # -----------------------------------------------------

    prompt = f"""
You are Nexus AI, a document-grounded AI assistant.

Your task is to answer the USER QUESTION using ONLY
the information contained in the supplied SOURCES.

================ SOURCES ================

{context}

============== END SOURCES ==============

================ USER QUESTION ==========

{message}

================ INSTRUCTIONS ============

{instruction}

================ STRICT RULES =============

1. Answer ONLY from the supplied sources.

2. Do NOT use your general or pretrained knowledge
   to fill missing information.

3. Do NOT guess or make assumptions.

4. Do NOT invent:
   - facts
   - numbers
   - examples
   - definitions
   - names
   - dates
   - formulas
   - sources
   - page numbers
   - technical details

5. If the sources do not contain enough information
   to answer the question, respond exactly:

"I couldn't find enough information about this in the
provided documents."

6. If only part of the question can be answered from
   the sources, answer only that supported part and
   clearly state that the remaining information was not
   found in the provided documents.

7. When several sources contain relevant information,
   combine them into one coherent answer.

8. Do not mention internal system concepts such as:
   - RAG
   - embeddings
   - vector database
   - retrieval
   - chunks
   - context window

9. Do not create citation numbers yourself.
   The application handles citations separately.

10. Do not answer a question merely because you know
    the answer from general knowledge.

11. Relevance is more important than completeness.
    If the supplied sources are unrelated to the
    question, use the exact insufficient-information
    response instead of attempting an answer.

12. Never treat the user's question as information
    contained in the documents.

================ FINAL ANSWER =================

Answer the user now.
"""

    response = llm.invoke(
        prompt
    )

    return response.content