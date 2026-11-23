import React, { useState } from "react";
import { Incident, Resource, RiverSensor } from "../types";
import { AlertTriangle, Waves, Navigation, MapPin, Building2, Shield, Users, Radio, ArrowUpRight } from "lucide-react";

interface CommandMapProps {
  incidents: Incident[];
  resources: Resource[];
  sensors: RiverSensor[];
  onSelectIncident: (incident: Incident) => void;
}

export const CommandMap: React.FC<CommandMapProps> = ({
  incidents,
  resources,
  sensors,
  onSelectIncident,
}) => {
  const [selectedSector, setSelectedSector] = useState<string>("Sector 1");

  const sectors = [
    { id: "Sector 1", name: "Netravathi Basin (Ullal / Thokkottu)", risk: "Critical", waterLevel: "9.4m", population: "42,000", status: "critical" },
    { id: "Sector 2", name: "Gurupura River Basin (Kuloor / Kavoor)", risk: "High", waterLevel: "7.8m", population: "38,500", status: "warning" },
    { id: "Sector 3", name: "Mangaluru City Center (Hampankatta / State Bank)", risk: "High", waterLevel: "6.2m", population: "65,000", status: "warning" },
    { id: "Sector 4", name: "Coastal Belt & Port (Panambur / Surathkal)", risk: "Moderate", waterLevel: "4.5m", population: "52,000", status: "nominal" },
    { id: "Sector 5", name: "Western Ghats Foothills (Bantwal / Beltangady)", risk: "Critical", waterLevel: "11.2m", population: "29,000", status: "critical" },
  ];

  const currentSectorData = sectors.find((s) => s.id === selectedSector) || sectors[0];
  const sectorIncidents = incidents.filter((i) => i.sector === selectedSector || i.location.includes(currentSectorData.name.split(" ")[0]));
  const sectorResources = resources.filter((r) => r.location.includes(currentSectorData.name.split(" ")[0]) || r.status === "Deployed");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
      {/* Left 2 Cols: Interactive Map & Sectors */}
      <div className="lg:col-span-2 space-y-6">
        {/* Top Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-medium">Netravathi Peak Gauge</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-white">9.4m</span>
              <span className="text-xs text-rose-400 font-medium">Danger mark 8.5m</span>
            </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-medium">Active SOS Beacons</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-amber-400">{incidents.length}</span>
              <span className="text-xs text-slate-400 font-medium">Dakshina Kannada</span>
            </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-medium">Deployed Units</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-cyan-400">
                {resources.filter((r) => r.status === "Deployed").length} / {resources.length}
              </span>
              <span className="text-xs text-emerald-400 font-medium">Coast Guard / SDRF</span>
            </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-medium">Evacuees Sheltered</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-white">8,340</span>
              <span className="text-xs text-emerald-400 font-medium">Mangaluru Camps</span>
            </div>
          </div>
        </div>

        {/* Interactive Mangalore Sectors Map Box */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Navigation className="w-5 h-5 text-cyan-400" />
                Mangaluru (Dakshina Kannada) GIS Sector Map
              </h2>
              <p className="text-xs text-slate-400">Select a Mangaluru river basin, coastal belt, or urban sector to inspect live telemetry.</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">Critical Risk</span>
              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">High Alert</span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Nominal</span>
            </div>
          </div>

          {/* Sector Grid Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {sectors.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setSelectedSector(sec.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedSector === sec.id
                    ? "bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-slate-400">{sec.id}</span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      sec.status === "critical"
                        ? "bg-rose-500 animate-pulse"
                        : sec.status === "warning"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                  ></span>
                </div>
                <h3 className="font-semibold text-white text-sm">{sec.name}</h3>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Level: {sec.waterLevel}</span>
                  <span className="text-cyan-400">Pop: {sec.population}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Simulated Visual Map Graphic */}
          <div className="h-64 rounded-xl bg-slate-950 border border-slate-800/80 relative flex items-center justify-center p-6 overflow-hidden">
            {/* Background grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
            
            {/* Mangalore Rivers (Netravathi & Gurupura joining Arabian Sea) */}
            <div className="absolute inset-x-0 top-1/2 h-20 bg-cyan-500/10 border-y border-cyan-500/30 -skew-y-6 flex items-center justify-around">
              <span className="text-xs font-mono text-cyan-400/80 animate-pulse">MANGALURU COASTAL RADAR: NETRAVATHI & GURUPURA DELTA TO ARABIAN SEA</span>
            </div>

            {/* Simulated interactive beacons on map */}
            <div className="absolute inset-0 p-6 flex flex-wrap items-center justify-around z-10">
              {incidents.slice(0, 4).map((inc, i) => (
                <div
                  key={inc.id}
                  onClick={() => onSelectIncident(inc)}
                  className="cursor-pointer group flex items-center gap-2 bg-slate-900/90 border border-slate-700 hover:border-cyan-500 px-3 py-2 rounded-xl shadow-lg transition-transform hover:scale-105"
                >
                  <div className={`w-3 h-3 rounded-full ${inc.severity === "Critical" ? "bg-rose-500 animate-ping" : "bg-amber-500"}`}></div>
                  <div>
                    <p className="text-xs font-semibold text-white">{inc.title}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{inc.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Col: Selected Sector Details & Sensors */}
      <div className="space-y-6">
        {/* Sector Telemetry Box */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyan-400" />
              {selectedSector} Telemetry
            </h3>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase">
              {currentSectorData.risk} Risk
            </span>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Sector Zone</span>
              <span className="font-medium text-white">{currentSectorData.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Water Depth Level</span>
              <span className="font-mono font-bold text-cyan-400">{currentSectorData.waterLevel}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Affected Population</span>
              <span className="font-mono text-white">{currentSectorData.population}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Active Incidents</span>
              <span className="font-mono text-amber-400">{sectorIncidents.length} SOS Reports</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Assigned Units in Sector</h4>
            {sectorResources.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No rescue units currently deployed in this sector.</p>
            ) : (
              <div className="space-y-2">
                {sectorResources.map((res) => (
                  <div key={res.id} className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <div>
                      <p className="text-xs font-semibold text-white">{res.name}</p>
                      <p className="text-[10px] text-slate-400">{res.type} • {res.location}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {res.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mangalore River & Dam Sensors Status */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <h3 className="font-bold text-white text-base flex items-center gap-2 mb-4">
            <Waves className="w-5 h-5 text-blue-400" />
            Dakshina Kannada IoT River Gauges
          </h3>
          <div className="space-y-3">
            {sensors.map((sensor) => (
              <div key={sensor.id} className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div>
                  <p className="text-xs font-semibold text-white">{sensor.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Danger Mark: {sensor.floodStageMeters}m • Trend: <span className="text-cyan-400 capitalize">{sensor.trend}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-white text-sm">{sensor.waterLevelMeters}m</span>
                  <div className={`text-[10px] font-semibold uppercase ${sensor.status === "critical" ? "text-rose-400" : "text-amber-400"}`}>
                    {sensor.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
