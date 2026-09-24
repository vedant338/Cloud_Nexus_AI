from langchain_ollama import ChatOllama


llm = ChatOllama(
    model="llama3.2:3b",
    base_url="http://172.21.96.1:11434",
    temperature=0
)


def generate_answer(query, results):

    context = "\n\n".join(
        result["text"]
        for result in results
    )
    prompt = f"""
     You are CloudNexus, an AI document assistant.

     Answer the user's question using ONLY the information
     provided in the context.

     Give a clear and complete answer.
     Explain the answer in 2-4 sentences when appropriate.

     If the answer cannot be found in the context, say:

     "I could not find this information in the uploaded document."

     Do not use outside knowledge.
     Do not make up information.

    Context:
     {context}
    Question:
     {query}
    Answer:
     """

    response = llm.invoke(prompt)
    return response.content