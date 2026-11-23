import React from "react";
import { Resource } from "../types";
import { Truck, Navigation, ShieldCheck, Wrench, LifeBuoy, Plane } from "lucide-react";

interface ResourceFleetProps {
  resources: Resource[];
}

export const ResourceFleet: React.FC<ResourceFleetProps> = ({ resources }) => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Truck className="w-6 h-6 text-cyan-400" />
            Resource Allocation & Fleet Tracking
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time management of rescue boats, swift-water helicopters, ambulances, and emergency supply depots.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            {resources.filter(r => r.status === "Deployed").length} Units Deployed
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
            {resources.filter(r => r.status === "Available").length} Standby Ready
          </span>
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
          <div key={res.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    {res.type === "Boat" ? <LifeBuoy className="w-5 h-5" /> : res.type === "Helicopter" ? <Plane className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{res.name}</h3>
                    <p className="text-xs text-slate-400">{res.type} Unit</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-semibold ${
                  res.status === "Deployed"
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : res.status === "Available"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}>
                  {res.status}
                </span>
              </div>

              <div className="space-y-3 text-xs pt-2 border-t border-slate-800/80">
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Station / Location</span>
                  <span className="font-medium text-white">{res.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Capacity / Payload</span>
                  <span className="font-mono text-cyan-400">{res.capacity} Persons Max</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Incident</span>
                  <span className="font-mono text-amber-400">{res.assignedIncidentId || "None (Standby)"}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono">ID: {res.id}</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Telemetry Active
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
