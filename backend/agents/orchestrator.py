from agents.fixer import FixerAgent
from agents.security import SecurityAgent
from core.sandbox import CodeSandbox

class Orchestrator:
    def __init__(self):
        self.fixer = FixerAgent()
        self.security = SecurityAgent()
        self.sandbox = CodeSandbox()

    def run_full_cycle(self, code, error):
        print("🛠️ Starting Fix Cycle...")
        
        # 1. Get the fix
        new_code = self.fixer.suggest_fix(code, error)
        
        # 2. Run Security Scan
        security_report = self.security.scan_code(new_code)
        
        # 3. Test in Sandbox
        test_result = self.sandbox.run_code(new_code)
        
        return {
            "fixed_code": new_code,
            "security_report": security_report,
            "sandbox_status": test_result["status"],
            "sandbox_output": test_result["output"]
        }