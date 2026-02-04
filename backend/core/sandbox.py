# core/sandbox.py
import docker

class CodeSandbox:
    def __init__(self):
        try:
            self.client = docker.from_env()
        except Exception:
            self.client = None
            print("⚠️ Docker not detected. Sandbox will run in 'Simulated Mode'.")

    def run_code(self, code_content: str):
        if not self.client:
            return {"status": "simulated", "output": "Docker not running."}
            
        # ... (rest of your docker logic)
        return {"status": "success", "output": "Executed in container."}