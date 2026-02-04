# --- CODENEXUS: GEMINI EDITION ---
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
import google.generativeai as genai
from dotenv import load_dotenv
import requests

# 1. Load Keys
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY") # <--- MUST MATCH .ENV EXACTLY

# 2. Configure Gemini
if not API_KEY:
    print("❌ FATAL: GEMINI_API_KEY not found in .env file!")
else:
    try:
        genai.configure(api_key=API_KEY)
        print("✅ Gemini Client Configured")
    except Exception as e:
        print(f"❌ Error configuring Gemini: {e}")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    code: str
    error_log: str

def get_github_code(url):
    """Fetches raw code if input is a GitHub link."""
    if "github.com" in url and "blob" in url:
        raw_url = url.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/")
        try:
            response = requests.get(raw_url)
            return response.text if response.status_code == 200 else url
        except:
            return url
    return url

@app.post("/process-fix")
async def process_fix(request: CodeRequest):
    print("🔍 Gemini Scanner: Processing request...")
    
    logs = [{"type": "info", "message": "🚀 System: Connected to Google Gemini."}]
    
    # 1. Handle GitHub Links
    actual_code = request.code
    if "github.com" in request.code:
        logs.append({"type": "info", "message": "🌐 Network: Fetching source from GitHub..."})
        actual_code = get_github_code(request.code)
    
    # 2. AI Processing
    fixed_code = "# Error: AI Generation Failed"
    
    if not API_KEY:
        logs.append({"type": "error", "message": "❌ Server Error: Missing GEMINI_API_KEY in .env."})
    else:
        try:
            logs.append({"type": "info", "message": "⚡ AI Core: Analyzing Logic..."})
            
            # Using 1.5-flash as it is the most stable free model
            model = genai.GenerativeModel('gemini-1.5-flash')
            
            prompt = f"""
            You are an expert Python DevOps Agent. 
            Fix this broken code based on the error.
            Return ONLY the fixed code. No markdown blocks.
            
            CODE:
            {actual_code}
            
            ERROR:
            {request.error_log}
            """
            
            response = model.generate_content(prompt)
            fixed_code = response.text
            
            # Cleanup markdown if present
            fixed_code = fixed_code.replace("```python", "").replace("```", "")
            
            logs.append({"type": "success", "message": "✅ Optimization: Logic Patch Applied."})
            logs.append({"type": "success", "message": "SUCCESS: Deployment Ready."})

        except Exception as e:
            # Check for the specific 429 error
            error_msg = str(e)
            if "429" in error_msg:
                 logs.append({"type": "error", "message": "⚠️ QUOTA EXCEEDED: Google has temporarily locked this key."})
                 fixed_code = "# Error: Quota Exceeded. Use a different key or wait."
            else:
                logs.append({"type": "error", "message": f"❌ Google Error: {error_msg}"})
                fixed_code = f"# Error: {error_msg}"

    return {
        "status": "success",
        "logs": logs,
        "fixed_code": fixed_code
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


# # --- UPDATED MAIN.PY FOR GROQ (NEWEST MODEL) ---
# from fastapi import FastAPI
# from pydantic import BaseModel
# from fastapi.middleware.cors import CORSMiddleware
# import os
# import time
# from groq import Groq
# from dotenv import load_dotenv
# import requests

# # 1. Load Keys
# load_dotenv()
# API_KEY = os.getenv("GROQ_API_KEY")

# # 2. Configure Groq Client
# client = None
# if API_KEY:
#     client = Groq(api_key=API_KEY)
# else:
#     print("⚠️ WARNING: GROQ_API_KEY not found in .env")

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class CodeRequest(BaseModel):
#     code: str
#     error_log: str

# def get_github_code(url):
#     """Fetches raw code if input is a GitHub link."""
#     if "github.com" in url and "blob" in url:
#         raw_url = url.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/")
#         try:
#             response = requests.get(raw_url)
#             return response.text if response.status_code == 200 else url
#         except:
#             return url
#     return url

# @app.post("/process-fix")
# async def process_fix(request: CodeRequest):
#     print("🔍 Groq Scanner: Processing request...")
    
#     logs = [{"type": "info", "message": "🚀 System: Connected to Groq LPU (Llama 3.1 Engine)."}]
    
#     # 1. Handle GitHub Links
#     actual_code = request.code
#     if "github.com" in request.code:
#         logs.append({"type": "info", "message": "🌐 Network: Fetching source from GitHub..."})
#         actual_code = get_github_code(request.code)
    
#     # 2. AI Processing
#     fixed_code = ""
#     if not client:
#         logs.append({"type": "error", "message": "❌ Server Error: Missing API Key."})
#         fixed_code = "# Error: API Key missing in backend"
#     else:
#         try:
#             logs.append({"type": "info", "message": "⚡ AI Core: Analyzing Logic..."})
            
#             completion = client.chat.completions.create(
#                 messages=[
#                     {
#                         "role": "system",
#                         "content": "You are an expert Python DevOps Agent. Return ONLY the fixed code. No markdown formatting, just the code."
#                     },
#                     {
#                         "role": "user",
#                         "content": f"Fix this broken code based on the error:\n\nCODE:\n{actual_code}\n\nERROR:\n{request.error_log}"
#                     }
#                 ],
#                 # 🛠️ UPDATED MODEL NAME HERE:
#                 model="llama-3.1-8b-instant", 
#             )

#             fixed_code = completion.choices[0].message.content
            
#             logs.append({"type": "success", "message": "✅ Optimization: Logic Patch Applied."})
#             logs.append({"type": "success", "message": "SUCCESS: Deployment Ready."})

#         except Exception as e:
#             logs.append({"type": "error", "message": f"❌ Groq Error: {str(e)}"})
#             fixed_code = f"# Error during AI processing: {str(e)}"

#     return {
#         "status": "success",
#         "logs": logs,
#         "fixed_code": fixed_code
#     }

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)









# --- CODENEXUS: OPENAI EDITION ---
# from fastapi import FastAPI
# from pydantic import BaseModel
# from fastapi.middleware.cors import CORSMiddleware
# import os
# import requests
# from openai import OpenAI
# from dotenv import load_dotenv

# # 1. Load Keys
# load_dotenv()
# API_KEY = os.getenv("OPENAI_API_KEY")

# # 2. Configure OpenAI Client
# client = None
# if API_KEY:
#     try:
#         client = OpenAI(api_key=API_KEY)         # ✅ CORRECT NAME
#         print("✅ OpenAI Client Configured")
#     except Exception as e:
#         print(f"❌ Error initializing OpenAI: {e}")
# else:
#     print("⚠️ WARNING: OPENAI_API_KEY not found in .env")

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class CodeRequest(BaseModel):
#     code: str
#     error_log: str

# def get_github_code(url):
#     """Fetches raw code if input is a GitHub link."""
#     if "github.com" in url and "blob" in url:
#         raw_url = url.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/")
#         try:
#             response = requests.get(raw_url)
#             return response.text if response.status_code == 200 else url
#         except:
#             return url
#     return url

# @app.post("/process-fix")
# async def process_fix(request: CodeRequest):
#     print("🔍 OpenAI Scanner: Processing request...")
    
#     logs = [{"type": "info", "message": "🚀 System: Connected to OpenAI (GPT-4o)."}]
    
#     # 1. Handle GitHub Links
#     actual_code = request.code
#     if "github.com" in request.code:
#         logs.append({"type": "info", "message": "🌐 Network: Fetching source from GitHub..."})
#         actual_code = get_github_code(request.code)
    
#     # 2. AI Processing
#     fixed_code = ""
#     if not client:
#         logs.append({"type": "error", "message": "❌ Server Error: Missing OPENAI_API_KEY in .env file."})
#         fixed_code = "# Error: Check your backend .env file"
#     else:
#         try:
#             logs.append({"type": "info", "message": "⚡ AI Core: Analyzing Logic..."})
            
#             completion = client.chat.completions.create(
#                 model="gpt-3.5-turbo",  # You can change to "gpt-3.5-turbo" to save credits
#                 messages=[
#                     {
#                         "role": "system",
#                         "content": "You are an expert Python DevOps Agent. Return ONLY the fixed code. No markdown formatting (no ```python blocks), just the raw code."
#                     },
#                     {
#                         "role": "user",
#                         "content": f"Fix this broken code based on the error:\n\nCODE:\n{actual_code}\n\nERROR:\n{request.error_log}"
#                     }
#                 ]
#             )

#             fixed_code = completion.choices[0].message.content
            
#             # Cleanup: Remove markdown backticks if GPT adds them
#             fixed_code = fixed_code.replace("```python", "").replace("```", "")
            
#             logs.append({"type": "success", "message": "✅ Optimization: Logic Patch Applied."})
#             logs.append({"type": "success", "message": "SUCCESS: Deployment Ready."})

#         except Exception as e:
#             logs.append({"type": "error", "message": f"❌ OpenAI Error: {str(e)}"})
#             fixed_code = f"# Error during AI processing: {str(e)}"

#     return {
#         "status": "success",
#         "logs": logs,
#         "fixed_code": fixed_code
#     }

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)