import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found")

embeddings = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001",
    google_api_key=api_key
)

vector = embeddings.embed_query(
    "What is the Apriori algorithm?"
)

print("Embedding created successfully!")
print("Vector length:", len(vector))
print("First 10 values:", vector[:10])