import React from "react";
import { ShieldAlert, Plus, Radio, Activity, Cpu } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenInject: () => void;
  isExecuting: boolean;
  onRunCycle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenInject,
  isExecuting,
  onRunCycle,
}) => {
  const navItems = [
    { id: "map", label: "Command Map" },
    { id: "agents", label: "5-Agent Pipeline" },
    { id: "incidents", label: "Triage & SOS" },
    { id: "fleet", label: "Resource Fleet" },
    { id: "iap", label: "Action Plans" },
    { id: "chat", label: "AI Coordinator" },
  ];

  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-50">
      {/* Zone 1: Brand title */}
      <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveTab("map")}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
            FloodGuard <span className="text-cyan-400 font-mono text-xs px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60">AI</span>
          </h1>
          <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Stage 3 Emergency • Autonomous Mode
          </p>
        </div>
      </div>

      {/* Zone 2: Navigation links */}
      <nav className="hidden xl:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === item.id
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Zone 3: Primary actions */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onRunCycle}
          disabled={isExecuting}
          className="px-3.5 py-2 text-xs font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 rounded-xl hover:bg-cyan-900/60 transition-all flex items-center gap-2 disabled:opacity-50 whitespace-nowrap"
        >
          <Cpu className={`w-4 h-4 ${isExecuting ? "animate-spin" : ""}`} />
          <span>{isExecuting ? "Agents Working..." : "Run AI Cycle"}</span>
        </button>

        <button
          onClick={onOpenInject}
          className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 rounded-xl hover:from-red-500 hover:to-rose-500 transition-all shadow-lg shadow-red-600/20 flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Inject Emergency</span>
        </button>
      </div>
    </header>
  );
};
