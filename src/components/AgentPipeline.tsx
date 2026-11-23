import React from "react";
import { AgentLog } from "../types";
import { Cpu, Database, Compass, AlertCircle, Truck, FileText, CheckCircle2, Clock } from "lucide-react";

interface AgentPipelineProps {
  agentLogs: AgentLog[];
  isExecuting: boolean;
  onRunCycle: () => void;
}

export const AgentPipeline: React.FC<AgentPipelineProps> = ({
  agentLogs,
  isExecuting,
  onRunCycle,
}) => {
  const agents = [
    {
      name: "Data Collection Agent",
      role: "Ingests river gauges, SOS beacons, weather telemetry",
      icon: Database,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/30",
    },
    {
      name: "Situation Analysis Agent",
      role: "GIS hazard mapping & submergence depth calculation",
      icon: Compass,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/30",
    },
    {
      name: "Priority & Triage Agent",
      role: "Scores urgency of rescue requests & victim vulnerability",
      icon: AlertCircle,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/30",
    },
    {
      name: "Resource Allocation Agent",
      role: "Dispatches boats, helicopters & ambulances with optimal routing",
      icon: Truck,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/30",
    },
    {
      name: "Response Plan Agent",
      role: "Synthesizes Incident Action Plans & public alerts",
      icon: FileText,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/30",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            Autonomous Multi-Agent Collaboration Pipeline
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Five specialized AI agents collaborate autonomously to collect data, analyze risks, triage SOS calls, allocate rescue fleets, and generate action plans.
          </p>
        </div>
        <button
          onClick={onRunCycle}
          disabled={isExecuting}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-600/20 flex items-center gap-2 transition-all disabled:opacity-50 whitespace-nowrap"
        >
          <Cpu className={`w-4 h-4 ${isExecuting ? "animate-spin" : ""}`} />
          <span>{isExecuting ? "Executing Agent Cycle..." : "Trigger Autonomous Cycle"}</span>
        </button>
      </div>

      {/* 5 Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {agents.map((ag, idx) => {
          const Icon = ag.icon;
          const latestLog = agentLogs.find((l) => l.agent === ag.name);

          return (
            <div key={ag.name} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl ${ag.bg} border flex items-center justify-center ${ag.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">AGENT 0{idx + 1}</span>
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{ag.name}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">{ag.role}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80">
                {latestLog ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{latestLog.timestamp}</span>
                      <span className="text-cyan-400 uppercase font-bold">{latestLog.status}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium">{latestLog.action}</p>
                    <p className="text-[11px] text-slate-400">{latestLog.detail}</p>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 italic">Waiting for cycle trigger...</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Collaboration Execution Log Stream */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            Real-Time Agent Telemetry & Action Stream
          </h3>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/60">
            {agentLogs.length} Events Recorded
          </span>
        </div>

        <div className="space-y-3">
          {agentLogs.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="text-sm">No agent events recorded yet. Click "Trigger Autonomous Cycle" above.</p>
            </div>
          ) : (
            agentLogs.map((log, index) => (
              <div key={index} className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{log.agent}</span>
                      <span className="text-[10px] font-mono text-slate-400">· {log.timestamp}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-200 mt-0.5">{log.action}</p>
                    <p className="text-xs text-slate-400 mt-1">{log.detail}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-semibold self-start sm:self-center ${
                  log.status === "critical"
                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    : log.status === "warning"
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                }`}>
                  {log.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
