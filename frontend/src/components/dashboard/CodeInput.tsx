interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  error: string;
  setError: (error: string) => void;
  isProcessing: boolean;
}

export function CodeInput({ code, setCode, error, setError, isProcessing }: CodeInputProps) {
  return (
    <div className="space-y-4">
      {/* Code Editor Box */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-gray-400 uppercase tracking-wider ml-1">
          Input Source Code
        </label>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isProcessing}
            placeholder="def broken_function(): ..."
            className="relative w-full h-48 bg-[#0a0a0a] border border-gray-800 rounded-lg p-4 font-mono text-sm text-gray-300 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none custom-scrollbar"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Error Log Box */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-danger uppercase tracking-wider ml-1 flex items-center gap-2">
          <span>Target Error Log</span>
        </label>
        <input
          type="text"
          value={error}
          onChange={(e) => setError(e.target.value)}
          disabled={isProcessing}
          placeholder="e.g., TypeError: unsupported operand type(s)..."
          className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-3 font-mono text-sm text-red-400 focus:outline-none focus:border-danger/50 focus:ring-1 focus:ring-danger/50 transition-all"
        />
      </div>
    </div>
  );
}