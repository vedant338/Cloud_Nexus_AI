"""
CloudNexus LLM service.

Uses local Llama 3.2 through Ollama.

The LLM is strictly grounded in the retrieved
document chunks supplied by the RAG pipeline.
"""

from typing import Any

from click import prompt
from langchain_ollama import ChatOllama
from app.config import OLLAMA_BASE_URL, OLLAMA_MODEL, OLLAMA_NUM_CTX

# =========================================================
# LLM
# =========================================================

llm = ChatOllama(
    model=OLLAMA_MODEL,
    base_url=OLLAMA_BASE_URL,
    temperature=0,
    num_ctx=OLLAMA_NUM_CTX,
)

# =========================================================
# FOLLOW-UP QUERY RESOLVER
# =========================================================

def resolve_followup_query(
    question: str,
    conversation_history: list[dict[str, Any]] | None = None,
) -> str:

    # No history means this is the first question.
    if not conversation_history:
        return question

    history_parts = []

    for item in conversation_history[-6:]:
        role = item.get("role", "user")
        content = item.get("content", "").strip()

        if content:
            history_parts.append(
                f"{role.upper()}: {content}"
            )

    if not history_parts:
        return question

    history = "\n".join(history_parts)

    prompt_text = f"""
You are a search query rewriting assistant.

Your task is to convert a user's follow-up question into a
standalone search query using the previous conversation.

RULES:
1. Preserve the user's actual question and intent.
2. Resolve references such as "it", "that", "this", and "above"
   using the previous conversation.
3. Do not answer the question.
4. Do not add facts or explanations.
5. If the question is already independent, return it unchanged.
6. Return ONLY the rewritten search query.
7. Do not include quotation marks or explanations.

PREVIOUS CONVERSATION:
{history}

CURRENT QUESTION:
{question}

STANDALONE SEARCH QUERY:
"""

    try:
        response = llm.invoke(prompt_text)

        rewritten = str(response.content).strip()

        if not rewritten:
            return question

        # Remove accidental surrounding quotation marks.
        rewritten = rewritten.strip('"').strip("'").strip()

        return rewritten if rewritten else question

    except Exception as e:
        print(f"[QUERY REWRITE] Failed: {e}")
        return question



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
    conversation_history: list[dict[str, Any]] | None = None,
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

                # Prefer expanded context, with safe fallbacks.
        text = (
            chunk.get("retrieved_text")
            or chunk.get("context_text")
            or chunk.get("text")
            or ""
        ).strip()

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
    # CONVERSATION HISTORY
    # -----------------------------------------------------

    history_parts = []

    if conversation_history:

        for item in conversation_history:

            role = item.get(
                "role",
                "user",
            )

            content = item.get(
                "content",
                "",
            ).strip()

            if not content:
                continue

            history_parts.append(
                f"{role.upper()}: {content}"
            )

    conversation = "\n".join(
        history_parts
    )

    if not conversation:
        conversation = "(No previous conversation.)"


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

If the user asks to compare, contrast, differentiate,
or find similarities/differences between two or more
topics, documents, concepts, algorithms, or methods:

- Identify each item being compared.
- Use information from the relevant sources for each item.
- Present the comparison in a clear table when appropriate.
- Include similarities and differences when supported.
- Do not add information that is not present in the sources.
- If one item has information available but another does not,
  clearly state that the information was not found in the
  provided documents.
SOURCE-BASED EXPLANATION:

- Preserve the terminology and procedures used in the sources.
- If a source provides an algorithm or procedure, explain
  its actual steps in the correct order.
- Do not replace detailed procedures with vague summaries.
- Preserve mathematical notation, formulas and relationships.
- Distinguish definitions, steps, conditions and outcomes.
- Do not confuse separate stages of a procedure.
- If pseudocode is available, use it to explain the procedure.
- Do not invent missing steps or technical details.
- Use examples only when supported by the sources.

For normal questions use:
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

================ PREVIOUS CONVERSATION ==========

{conversation}

================ USER QUESTION ==========

{message}

================ INSTRUCTIONS ============

{instruction}

================ STRICT RULES =============

1. Answer ONLY from the supplied sources.

2. Do NOT use your general or pretrained knowledge
   to fill missing information.

3. Do NOT guess or make assumptions.

4. STRICT FACT AND EXAMPLE GROUNDING:

   - Every factual statement must be directly supported
     by the supplied source content.
   - Never create your own examples, transactions,
     datasets, itemsets, calculations, or numerical values.
   - Never assume missing values or fill gaps using
     general knowledge.
    - Preserve the exact algorithmic procedure described in the
  source. Do not replace a specific procedure with a broader
  or simplified one if the source provides more detail.
    - Do not add explanations of individual steps unless they
  are explicitly supported by the supplied sources.
    - For Apriori candidate generation, describe the join and
  prune procedure when that procedure is present in the source.
    - When the user asks to explain an algorithm and the sources
  contain both general steps and detailed procedures, include
  both in the answer.
    - Do not merely mention that pseudocode or procedures exist.
  Explain the relevant operations using the supplied source.
    - For Apriori, explain candidate generation through joining
  frequent itemsets and pruning candidates whose subsets are
  not frequent, when this information is available.
    - Do not describe an example database as real-world unless
  the source explicitly identifies it as real-world.
    - Avoid repeating the same algorithm steps or procedures.
    - Preserve the exact mathematical notation and relationships
  used in the source, including Lk-1, Ck, and Lk.
    - Do not add general disclaimers or conclusions that are
  not explicitly supported by the sources.
    - Organize the answer in this order:
  1. Definition and principle
  2. Main algorithm steps
  3. Detailed candidate-generation and pruning procedure
  4. Association-rule generation
    - Do not repeat the detailed procedure in a separate
  implementation section unless the user asks for it.

EXAMPLE AND CALCULATION RULES:

- Do not provide examples unless the user explicitly
  asks for an example.
- Never create sample transactions, datasets, itemsets,
  support counts, percentages, or numerical values.
- If the user does not request an example, do not include
  any hypothetical example.
- If the user requests an example, reproduce only an
  example explicitly provided in the supplied sources.
- Preserve the exact transactions, itemsets, support
  counts, thresholds, and results from the source.
- Do not calculate support, confidence, or other values
  unless the required formula and input values are
  explicitly provided in the sources.
- Do not introduce formulas that are absent from
  the supplied sources.
- If requested information is unavailable, clearly
  state that it was not found in the documents.

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

9. CITATION RULES:
   - Each source is identified by its number, such as [1] or [2].
   - Add inline citation markers like [1] at the end of factual
     sentences or paragraphs.
   - Cite only sources that directly support the nearby statement.
   - Use the exact source numbers provided in the context.
   - Never invent, change, or renumber source numbers.
   - Do not cite sources that are irrelevant to the answer.
   - If you cannot answer from the supplied sources, return the
     exact insufficient-information response without citations.

10. Do not answer a question merely because you know
    the answer from general knowledge.

11. Relevance is more important than completeness.
    If the supplied sources are unrelated to the
    question, use the exact insufficient-information
    response instead of attempting an answer.
11A. SOURCE RELEVANCE CHECK:

    - Use only sources that directly support the answer.
    - Ignore unrelated pages, even if they belong to the
      same document.
    - Do not mention or cite information about unrelated
      topics.

12. Never treat the user's question as information
    contained in the documents.

13. Use the previous conversation only to understand
    references such as "it", "this", "that", "the second
    one", "above", or follow-up questions.

14. The previous conversation is NOT a source of factual
    information. Factual answers must still come from the
    supplied document sources.

15. If a follow-up question refers to something from the
    previous conversation but the supplied documents do
    not contain enough information to answer it, use the
    insufficient-information response.

16. For comparison questions, keep information associated
    with the correct source or topic. Do not combine facts
    from different documents incorrectly.

17. When comparing multiple documents, concepts, algorithms,
    or methods, explicitly distinguish which information
    belongs to which item.

18. Do not create comparison criteria from outside knowledge.
    Only compare characteristics supported by the supplied
    sources.

19. If the sources provide information about only one side
    of a requested comparison, do not invent the missing side.
    State that the information for that side was not found.

================ FINAL ANSWER =================

Answer the user now.
"""
    print("\n========== DEBUG: LLM CONTEXT ==========")

    for i, chunk in enumerate(context_chunks, start=1):
        print(f"\nSOURCE {i}")
        print("FILE:", chunk.get("file_name"))
        print("PAGE:", chunk.get("page"))
        print("CONTEXT:")
        print(
        chunk.get("context_text")
        or chunk.get("retrieved_text")
        or chunk.get("text")
        or ""
    )

    print("\n========== END DEBUG ==========\n")
    print("\n========== RUNTIME PROMPT CHECK ==========")
    print("New example rules loaded:", "EXAMPLE AND CALCULATION RULES:" in prompt)
    print("No hypothetical example rule:", "Never create sample transactions" in prompt)
    print("Prompt length:", len(prompt))
    print("========== END PROMPT CHECK ==========\n")

    response = llm.invoke(prompt)
    return response.content