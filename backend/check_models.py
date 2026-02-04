import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ Error: API Key not found in .env")
else:
    genai.configure(api_key=api_key)
    print("🔍 Checking available models for your API Key...")
    try:
        count = 0
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"✅ FOUND: {m.name}")
                count += 1
        if count == 0:
            print("⚠️ No models found. Your API Key might be invalid or has no access.")
    except Exception as e:
        print(f"❌ Error connecting: {e}")