import axios from "axios";

// 1. Point to your running FastAPI backend
const API_URL = "http://127.0.0.1:8000";

// 2. Create the connection handler
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 3. Define the Types (So TypeScript understands the Python response)
export interface FixResult {
  fixed_code: string;
  security_report: string;
  sandbox_status: string;
  sandbox_output: string;
}

// 4. The Main Function: Send code to the AI Swarm
export const processBug = async (code: string, error: string): Promise<FixResult> => {
  try {
    const response = await api.post("/process-fix", { code, error });
    return response.data;
  } catch (err) {
    console.error("❌ API Error:", err);
    throw new Error("Failed to connect to CodeNexus Swarm.");
  }
};