import { Bot, Cpu, Wifi } from "lucide-react";

export function Header() {
  return (
    <header className="w-full h-16 border-b border-gray-800 bg-black/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg border border-primary/30 shadow-[0_0_15px_rgba(0,255,157,0.2)]">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tighter text-white">
            CODENEXUS <span className="text-primary">AI</span>
          </h1>
          <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
            Autonomous DevOps Swarm
          </p>
        </div>
      </div>

      {/* System Status Indicators */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <Cpu className="w-4 h-4" />
          <span>CORE: <span className="text-primary">ONLINE</span></span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <Wifi className="w-4 h-4" />
          <span>NET: <span className="text-primary">SECURE</span></span>
        </div>
        <div className="px-3 py-1 border border-primary/30 rounded-full bg-primary/5 text-primary text-xs font-bold animate-pulse">
          v1.0.0
        </div>
      </div>
    </header>
  );
}