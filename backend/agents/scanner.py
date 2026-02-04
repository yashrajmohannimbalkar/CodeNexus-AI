class ScannerAgent:
    def read_code(self, file_path):
        try:
            with open(file_path, "r") as f:
                return f.read()
        except Exception as e:
            return f"Error reading file: {str(e)}"