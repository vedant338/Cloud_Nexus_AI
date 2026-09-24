"""
CloudNexus LLM service.

Uses local Llama 3.2 through Ollama.
"""

from typing import Any

from langchain_ollama import ChatOllama


llm = ChatOllama(
    model="llama3.2:3b",
    base_url="http://172.21.96.1:11434",
    temperature=0,
)


def complete(
    message: str,
    mode: str,
    context_chunks: list[dict[str, Any]],
) -> str:

    if not context_chunks:

        return (
            "I could not find relevant information "
            "in the uploaded documents."
        )

    # Build context
    context_parts = []

    for i, chunk in enumerate(
        context_chunks
    ):

        context_parts.append(
            f"""
SOURCE {i + 1}
File: {chunk.get("file_name", "Unknown")}

{chunk["text"]}
"""
        )

    context = "\n\n".join(
        context_parts
    )

    # Mode
    if mode == "short_notes":

        instruction = """
Give the answer as concise bullet-point
notes. Include only the important points.
"""

    else:

        instruction = """
Give a clear and complete explanation.
Use paragraphs or bullet points where
appropriate.
"""

    prompt = f"""
You are CloudNexus, an evidence-based
document assistant.

Answer the user's question using ONLY
the supplied document context.

{instruction}

STRICT RULES:

1. Do not invent information.
2. Do not use outside knowledge.
3. Every factual claim must be supported
   by the supplied context.
4. If the answer is not present in the
   context, say:
   "I could not find this information
   in the uploaded documents."

DOCUMENT CONTEXT:

{context}

USER QUESTION:

{message}

ANSWER:
"""

    response = llm.invoke(
        prompt
    )

    return response.content