import React, { useState } from "react";
import { Incident } from "../types";
import { AlertTriangle, Search, Filter, CheckCircle2, Clock, MapPin, Users, Send } from "lucide-react";

interface IncidentQueueProps {
  incidents: Incident[];
  onUpdateStatus: (incidentId: string, newStatus: Incident["status"]) => void;
}

export const IncidentQueue: React.FC<IncidentQueueProps> = ({
  incidents,
  onUpdateStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("All");

  const filteredIncidents = incidents.filter((inc) => {
    const matchesSearch = inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === "All" || inc.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header & Controls */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              Emergency Triage & SOS Queue
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              AI-scored rescue requests sorted by urgency, victim count, and water rise velocity.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/25">
              {incidents.filter(i => i.severity === "Critical").length} Critical
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/25">
              {incidents.filter(i => i.severity === "High").length} High Priority
            </span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search SOS incidents, location, sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto overflow-x-auto">
            {["All", "Critical", "High", "Medium"].map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  severityFilter === sev
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Incidents List Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredIncidents.length === 0 ? (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center">
            <p className="text-slate-400 text-sm">No emergency incidents match your filter criteria.</p>
          </div>
        ) : (
          filteredIncidents.map((inc) => (
            <div
              key={inc.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                    inc.severity === "Critical"
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/25"
                      : inc.severity === "High"
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/25"
                      : "bg-blue-500/10 text-blue-400 border border-blue-500/25"
                  }`}>
                    {inc.severity} Severity
                  </span>
                  <span className="text-xs font-mono text-slate-400">ID: {inc.id}</span>
                  <span className="text-xs font-mono text-cyan-400">· {inc.sector}</span>
                </div>

                <h3 className="text-base font-bold text-white">{inc.title}</h3>
                <p className="text-xs text-slate-300">{inc.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {inc.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    {inc.victimCount} People Trapped
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    ETA: {inc.etaMinutes} mins ({inc.assignedUnit})
                  </span>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center gap-3 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
                <div className="text-right mr-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Status</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md inline-block mt-0.5 ${
                    inc.status === "Rescued"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : inc.status === "Dispatched"
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}>
                    {inc.status}
                  </span>
                </div>

                {inc.status === "Pending" && (
                  <button
                    onClick={() => onUpdateStatus(inc.id, "Dispatched")}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Unit</span>
                  </button>
                )}

                {inc.status === "Dispatched" && (
                  <button
                    onClick={() => onUpdateStatus(inc.id, "Rescued")}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Rescued</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
