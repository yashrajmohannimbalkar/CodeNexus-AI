"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldCheck, Bug, Cpu } from "lucide-react";

interface Log {
  id: number;
  message: string;
  type: "info" | "success" | "error";
  timestamp: string;
}

interface LiveTerminalProps {
  logs: Log[];
}

export function LiveTerminal({ logs }: LiveTerminalProps) {
  return (
    <div className="w-full h-[500px] bg-black border border-gray-800 rounded-lg overflow-hidden flex flex-col shadow-2xl relative">
      {/* Header Bar */}
      <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-2 text-gray-400">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono uppercase tracking-widest">System_Output_Log</span>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 animate-pulse"></div>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-3 custom-scrollbar">
        <AnimatePresence>
          {logs.length === 0 && (
            <div className="text-gray-600 italic">Waiting for input stream...</div>
          )}
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-start gap-3 border-l-2 pl-3 py-1 ${
                log.type === "error" ? "border-danger text-danger bg-danger/5" :
                log.type === "success" ? "border-primary text-primary bg-primary/5" :
                "border-gray-700 text-gray-300"
              }`}
            >
              <span className="text-xs text-gray-500 mt-1">[{log.timestamp}]</span>
              <span>{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Scanline Effect Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20"></div>
    </div>
  );
}