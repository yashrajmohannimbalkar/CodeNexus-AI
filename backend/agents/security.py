class SecurityAgent:
    def scan_code(self, code):
        vulnerabilities = []
        # Simple rule-based check
        if "api_key =" in code.lower() or "password =" in code.lower():
            vulnerabilities.append("🚨 Potential Hardcoded Credential Detected!")
        
        if len(vulnerabilities) == 0:
            return "✅ Security Scan Passed: No obvious leaks found."
        return "\n".join(vulnerabilities)