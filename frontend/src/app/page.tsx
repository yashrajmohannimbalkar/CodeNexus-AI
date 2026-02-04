'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, Shield, Bug, CheckCircle, Cpu, Search, Activity, RotateCcw } from 'lucide-react';

export default function Home() {
  const [code, setCode] = useState(`def broken_function():
    print("Hello World"
    return true`);
  const [errorLog, setErrorLog] = useState('SyntaxError: unexpected EOF while parsing');
  const [logs, setLogs] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  
  // Auto-scroll to bottom of logs
  const logsEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleDeploy = async () => {
    setIsScanning(true);
    setLogs([]); // Clear old logs

    // 1. Initial "Fake" UI Logs (Immediate feedback)
    const initialLogs = [
      { type: 'info', message: '🚀 INITIALIZING CODENEXUS SWARM...', timestamp: Date.now() },
      { type: 'info', message: '🔍 Scanner Agent: Connecting to Neural Core...', timestamp: Date.now() }
    ];
    setLogs(initialLogs);

    try {
      // 2. The Real Backend Call
      const response = await fetch('http://localhost:8000/process-fix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // ⚠️ THIS FIXES THE 422 ERROR:
        // We map 'errorLog' (frontend state) to 'error_log' (backend requirement)
        body: JSON.stringify({
          code: code,
          error_log: errorLog 
        }),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();

      // 3. Process the Result
      if (data.status === 'success') {
        // Add the real logs from the AI
        const backendLogs = data.logs.map((log: any) => ({
          ...log,
          timestamp: Date.now()
        }));
        setLogs(prev => [...prev, ...backendLogs]);
        
        // Update the code box with the FIX
        if (data.fixed_code) {
          setTimeout(() => {
             setCode(data.fixed_code);
          }, 1000); // Slight delay for dramatic effect
        }
      } else {
         setLogs(prev => [...prev, { type: 'error', message: '❌ Fix Failed: AI could not solve it.', timestamp: Date.now() }]);
      }

    } catch (error) {
      console.error(error);
      setLogs(prev => [...prev, { 
        type: 'error', 
        message: `❌ CRITICAL FAILURE: Cannot connect to Swarm Backend. Is it running?`, 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-8 selection:bg-green-900 selection:text-white">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-12 border-b border-green-900 pb-4">
        <div className="flex items-center gap-2">
          <div className="bg-green-900 p-2 rounded-lg">
            <Cpu size={24} className="text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-widest text-white">CODENEXUS <span className="text-green-500">AI</span></h1>
            <p className="text-xs text-green-700">AUTONOMOUS DEVOPS SWARM</p>
          </div>
        </div>
        <div className="flex gap-4 text-xs tracking-widest">
          <div className="flex items-center gap-2 text-green-700"><Cpu size={14}/> CORE: <span className="text-green-400 animate-pulse">ONLINE</span></div>
          <div className="flex items-center gap-2 text-green-700"><Activity size={14}/> NET: <span className="text-green-400">SECURE</span></div>
          <div className="border border-green-900 px-2 py-1 rounded text-green-800">v1.0.0</div>
        </div>
      </header>

      {/* AGENT STATUS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Scanner Agent */}
        <div className={`border p-6 rounded-lg transition-all duration-500 ${isScanning ? 'border-green-400 bg-green-900/10' : 'border-green-900'}`}>
          <div className="flex justify-between mb-4">
            <div className="bg-blue-900/30 p-2 rounded">
              <Search className="text-blue-400" size={24} />
            </div>
            {isScanning && <Activity className="text-green-500 animate-spin" size={16} />}
          </div>
          <h3 className="text-xl text-white font-bold mb-1">Scanner Agent</h3>
          <p className="text-xs text-green-700">ANALYZES CODE STRUCTURE</p>
        </div>

        {/* Fixer Agent */}
        <div className={`border p-6 rounded-lg transition-all duration-500 ${isScanning ? 'border-purple-400 bg-purple-900/10' : 'border-green-900'}`}>
          <div className="flex justify-between mb-4">
            <div className="bg-purple-900/30 p-2 rounded">
              <Bug className="text-purple-400" size={24} />
            </div>
            {isScanning && <Activity className="text-green-500 animate-spin" size={16} />}
          </div>
          <h3 className="text-xl text-white font-bold mb-1">Fixer Agent</h3>
          <p className="text-xs text-green-700">GENERATES PATCH SOLUTION</p>
        </div>

        {/* Security Agent */}
        <div className={`border p-6 rounded-lg transition-all duration-500 ${isScanning ? 'border-orange-400 bg-orange-900/10' : 'border-green-900'}`}>
          <div className="flex justify-between mb-4">
            <div className="bg-orange-900/30 p-2 rounded">
              <Shield className="text-orange-400" size={24} />
            </div>
            {isScanning && <Activity className="text-green-500 animate-spin" size={16} />}
          </div>
          <h3 className="text-xl text-white font-bold mb-1">Security Agent</h3>
          <p className="text-xs text-green-700">VALIDATES SAFETY PROTOCOLS</p>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
        
        {/* LEFT COLUMN: INPUTS */}
        <div className="flex flex-col gap-6">
          <div className="flex-1 border border-green-900 rounded-lg p-1 bg-black relative group">
            <div className="absolute -top-3 left-4 bg-black px-2 text-xs text-green-600">INPUT SOURCE CODE</div>
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-slate-900/50 p-4 rounded text-sm text-green-300 focus:outline-none focus:bg-slate-900/80 transition-all font-mono resize-none"
              spellCheck="false"
            />
          </div>

          <div className="h-24 border border-green-900 rounded-lg p-1 bg-black relative">
            <div className="absolute -top-3 left-4 bg-black px-2 text-xs text-green-600">TARGET ERROR LOG</div>
            <input 
              type="text"
              value={errorLog}
              onChange={(e) => setErrorLog(e.target.value)}
              className="w-full h-full bg-transparent p-4 text-red-400 focus:outline-none font-mono text-sm"
              placeholder="Paste error log here..."
            />
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleDeploy}
              disabled={isScanning}
              className={`flex-1 flex items-center justify-center gap-2 p-4 border rounded font-bold tracking-widest transition-all
              ${isScanning 
                ? 'border-green-900 text-green-900 cursor-not-allowed' 
                : 'border-green-500 text-green-500 hover:bg-green-500 hover:text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]'}`}
            >
              {isScanning ? <Activity className="animate-spin" /> : <Play size={18} fill="currentColor" />}
              {isScanning ? 'SWARM ACTIVE...' : 'DEPLOY SWARM'}
            </button>
            
            <button 
              onClick={() => {setCode(''); setErrorLog(''); setLogs([])}}
              className="p-4 border border-green-900 text-green-700 hover:text-white hover:border-white rounded transition-colors"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: TERMINAL OUTPUT */}
        <div className="border border-green-900 rounded-lg bg-[#0a0a0a] flex flex-col relative overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div className="bg-slate-900/50 p-3 border-b border-green-900 flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs text-blue-400">
              <Terminal size={14} />
              <span>SYSTEM_OUTPUT_LOG</span>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-3">
            {logs.length === 0 && (
              <div className="text-green-900 italic opacity-50">Waiting for input stream...</div>
            )}
            
            {logs.map((log, index) => (
              <div key={index} className={`flex gap-3 ${log.type === 'error' ? 'text-red-500' : 'text-green-400'} animate-in fade-in slide-in-from-left-2 duration-300`}>
                <span className="opacity-50 text-xs mt-1">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                <div className="flex-1">
                  {log.type === 'success' && <CheckCircle size={14} className="inline mr-2 text-green-500" />}
                  {log.type === 'error' && <Shield size={14} className="inline mr-2 text-red-500" />}
                  {log.type === 'info' && <span className="mr-2">⚡</span>}
                  {log.message}
                </div>
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>

      </div>
    </div>
  );
}