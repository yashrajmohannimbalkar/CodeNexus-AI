import os
from dotenv import load_dotenv

# Load .env file from the backend directory
load_dotenv()

class Config:
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    PORT = int(os.getenv("PORT", 8000))

    @staticmethod
    def validate():
        if not Config.GROQ_API_KEY:
            raise ValueError("❌ CRITICAL: GROQ_API_KEY not found in .env file!")
        print("✅ Environment Variables Loaded.")