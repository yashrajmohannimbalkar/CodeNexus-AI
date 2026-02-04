"use client";
import { motion } from "framer-motion";
import { Search, PenTool, ShieldAlert, Loader2, CheckCircle2 } from "lucide-react";

interface AgentStatusProps {
  activeAgent: "idle" | "scanner" | "fixer" | "security" | "complete";
}

export function AgentStatus({ activeAgent }: AgentStatusProps) {
  const agents = [
    {
      id: "scanner",
      name: "Scanner Agent",
      icon: Search,
      desc: "Analyzes code structure",
      color: "text-blue-400",
      border: "border-blue-400/30",
    },
    {
      id: "fixer",
      name: "Fixer Agent",
      icon: PenTool,
      desc: "Generates patch solution",
      color: "text-purple-400",
      border: "border-purple-400/30",
    },
    {
      id: "security",
      name: "Security Agent",
      icon: ShieldAlert,
      desc: "Validates safety protocols",
      color: "text-orange-400",
      border: "border-orange-400/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {agents.map((agent) => {
        const isActive = activeAgent === agent.id;
        const isCompleted = activeAgent === "complete" || 
          (activeAgent !== "idle" && agents.findIndex(a => a.id === activeAgent) > agents.findIndex(a => a.id === agent.id));

        return (
          <motion.div
            key={agent.id}
            animate={{
              scale: isActive ? 1.05 : 1,
              borderColor: isActive ? "rgba(0, 255, 157, 0.6)" : "rgba(51, 51, 51, 1)",
              backgroundColor: isActive ? "rgba(0, 255, 157, 0.05)" : "rgba(10, 10, 10, 0.5)"
            }}
            className={`relative p-5 rounded-xl border-2 transition-all duration-300 ${
              isActive ? "shadow-[0_0_20px_rgba(0,255,157,0.1)]" : "border-gray-800"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg bg-gray-900 ${agent.color}`}>
                <agent.icon className="w-6 h-6" />
              </div>
              {isActive && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
              {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-500" />}
            </div>
            
            <h3 className={`font-mono font-bold text-lg ${isActive ? "text-primary" : "text-gray-300"}`}>
              {agent.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1 font-mono uppercase tracking-wider">
              {isActive ? "PROCESSING..." : agent.desc}
            </p>

            {/* Scanning Line Effect */}
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
                initial={{ top: "-100%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}