/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { CommandMap } from "./components/CommandMap";
import { AgentPipeline } from "./components/AgentPipeline";
import { IncidentQueue } from "./components/IncidentQueue";
import { ResourceFleet } from "./components/ResourceFleet";
import { ActionPlans } from "./components/ActionPlans";
import { CommandChat } from "./components/CommandChat";
import { InjectModal } from "./components/InjectModal";
import { Incident, Resource, RiverSensor, AgentLog, IncidentActionPlan } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState("map");
  const [isInjectOpen, setIsInjectOpen] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  // Initial Mangalore District State Data
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: "SOS-MGL-01",
      title: "Trapped Fishermen Families near River Mouth",
      location: "Ullal Beach Road, Netravathi Basin",
      sector: "Sector 1",
      severity: "Critical",
      assignedUnit: "Coast Guard Rescue Boat",
      status: "Dispatched",
      victimCount: 18,
      etaMinutes: 7,
      timestamp: "00:12:45",
      description: "Netravathi river mouth backwater surge trapping 18 residents in low-lying coastal shacks.",
    },
    {
      id: "SOS-MGL-02",
      title: "Stormwater Flooding at Hampankatta Circle",
      location: "Hampankatta Junction, Mangaluru",
      sector: "Sector 3",
      severity: "High",
      assignedUnit: "MCC Emergency Squad",
      status: "Pending",
      victimCount: 6,
      etaMinutes: 12,
      timestamp: "00:15:20",
      description: "Heavy urban runoff flooding commercial basements and stalling vehicles near Central Market.",
    },
    {
      id: "SOS-MGL-03",
      title: "Landslide Risk Near Hillside Settlement",
      location: "Bantwal Foothills, Dakshina Kannada",
      sector: "Sector 5",
      severity: "Critical",
      assignedUnit: "NDRF Karnataka Team 2",
      status: "Dispatched",
      victimCount: 25,
      etaMinutes: 9,
      timestamp: "00:18:05",
      description: "Mudslide threat looming over 5 houses following incessant heavy downpours in Western Ghats foothills.",
    },
    {
      id: "SOS-MGL-04",
      title: "Gurupura River Embankment Overflow",
      location: "Kuloor Bridge Perimeter, Mangaluru",
      sector: "Sector 2",
      severity: "High",
      assignedUnit: "SDRF Zodiac Unit",
      status: "Rescued",
      victimCount: 10,
      etaMinutes: 0,
      timestamp: "00:04:10",
      description: "Gurupura river water touching bridge girders. Residents safely evacuated to Surathkal college camp.",
    },
  ]);

  const [resources, setResources] = useState<Resource[]>([
    { id: "MGL-BOAT-01", name: "Coast Guard Fast Interceptor & Rescue Boat", type: "Boat", status: "Deployed", location: "Netravathi Basin Ullal", assignedIncidentId: "SOS-MGL-01", capacity: 12 },
    { id: "MGL-BOAT-02", name: "SDRF Swift-Water Zodiac Mangalore", type: "Boat", status: "Available", location: "Panambur Port Staging", capacity: 8 },
    { id: "MGL-HELO-01", name: "Indian Coast Guard Chetak Chopper", type: "Helicopter", status: "Deployed", location: "Panambur Air Station", assignedIncidentId: "SOS-MGL-03", capacity: 6 },
    { id: "MGL-AMB-01", name: "District Wenlock Hospital Ambulance Unit", type: "Ambulance", status: "Available", location: "Hampankatta Hub", capacity: 4 },
    { id: "MGL-NDRF-01", name: "NDRF Dakshina Kannada Delta Squad", type: "Rescue Team", status: "Available", location: "Urwa Store Base", capacity: 20 },
  ]);

  const [sensors, setSensors] = useState<RiverSensor[]>([
    { id: "MGL-SEN-01", name: "Netravathi Railway Bridge Gauge (Bantwal)", waterLevelMeters: 9.4, floodStageMeters: 8.5, trend: "rising", status: "critical" },
    { id: "MGL-SEN-02", name: "Gurupura River Gauge (Kuloor)", waterLevelMeters: 7.8, floodStageMeters: 7.0, trend: "rising", status: "warning" },
    { id: "MGL-SEN-03", name: "Thumbe Dam Reservoir Level", waterLevelMeters: 6.8, floodStageMeters: 7.0, trend: "stable", status: "warning" },
    { id: "MGL-SEN-04", name: "Panambur Coastal Surge Gauge", waterLevelMeters: 4.5, floodStageMeters: 5.5, trend: "stable", status: "nominal" },
  ]);

  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([
    {
      agent: "Data Collection Agent",
      timestamp: "00:01:00",
      action: "Ingested Dakshina Kannada IMD radar & river gauges",
      status: "critical",
      detail: "Netravathi gauge at Bantwal crossed critical danger mark (9.4m). Red alert in Mangaluru taluk.",
    },
    {
      agent: "Situation Analysis Agent",
      timestamp: "00:02:15",
      action: "Mangaluru Basin Submergence Mapping",
      status: "critical",
      detail: "Identified high flood risk in Ullal river mouth and Bantwal foothill landslide zones.",
    },
    {
      agent: "Priority & Triage Agent",
      timestamp: "00:03:30",
      action: "Scored Dakshina Kannada SOS requests",
      status: "critical",
      detail: "SOS-MGL-01 (Ullal fishermen) and SOS-MGL-03 (Bantwal landslides) assigned urgent priority.",
    },
    {
      agent: "Resource Allocation Agent",
      timestamp: "00:04:45",
      action: "Dispatched Coast Guard & SDRF assets",
      status: "nominal",
      detail: "Assigned Coast Guard Rescue Boat to Ullal and Chetak Chopper for Bantwal landslide airlift.",
    },
    {
      agent: "Response Plan Agent",
      timestamp: "00:06:00",
      action: "Generated Mangaluru District IAP-2026",
      status: "nominal",
      detail: "Issued flood and landslide warning announcements in Tulu, Kannada, and English across coastal belt.",
    },
  ]);

  const [iap, setIap] = useState<IncidentActionPlan>({
    summary: "Dakshina Kannada District Administration & Disaster Management activated Stage 3 flood response for Mangaluru, Bantwal, and Ullal taluks.",
    evacuationAdvisory: "Mandatory evacuation ordered for all low-lying areas along Netravathi and Gurupura riverbanks, and landslide-prone hill slopes in Bantwal. Move immediately to municipal relief centers.",
    prioritySectors: ["Sector 1 Netravathi Basin Ullal", "Sector 5 Western Ghats Bantwal"],
    broadcastMessage: "MANGALURU DISTRICT ALERT (ತುರ್ತು ಎಚ್ಚರಿಕೆ / ತುಳು ಎಚ್ಚರಿಕೆ): Netravathi river level crossed danger mark. Move to high ground or designated government relief camps immediately.",
  });

  const handleRunCycle = async () => {
    setIsExecuting(true);
    try {
      const response = await fetch("/api/flood/run-agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incidents, resources, sensors, currentScenario: "Mangaluru (Dakshina Kannada) Netravathi & Gurupura Flood & Landslide Emergency" }),
      });
      const data = await response.json();
      if (data.agentLogs) setAgentLogs(data.agentLogs);
      if (data.updatedIncidents) setIncidents(data.updatedIncidents);
      if (data.updatedResources) setResources(data.updatedResources);
      if (data.incidentActionPlan) setIap(data.incidentActionPlan);
    } catch (err) {
      console.error("Agent cycle failed:", err);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleUpdateStatus = (incidentId: string, newStatus: Incident["status"]) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === incidentId ? { ...inc, status: newStatus } : inc))
    );
  };

  const handleInjectIncident = (newIncident: Incident) => {
    setIncidents((prev) => [newIncident, ...prev]);
    setAgentLogs((prev) => [
      {
        agent: "Priority & Triage Agent",
        timestamp: new Date().toLocaleTimeString(),
        action: `Ingested new Mangaluru emergency: ${newIncident.title}`,
        status: newIncident.severity === "Critical" ? "critical" : "warning",
        detail: `New SOS beacon from ${newIncident.location} (${newIncident.victimCount} victims). District triage completed.`,
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenInject={() => setIsInjectOpen(true)}
        isExecuting={isExecuting}
        onRunCycle={handleRunCycle}
      />

      <main className="flex-1 pb-16">
        {activeTab === "map" && (
          <CommandMap
            incidents={incidents}
            resources={resources}
            sensors={sensors}
            onSelectIncident={(inc) => setActiveTab("incidents")}
          />
        )}
        {activeTab === "agents" && (
          <AgentPipeline
            agentLogs={agentLogs}
            isExecuting={isExecuting}
            onRunCycle={handleRunCycle}
          />
        )}
        {activeTab === "incidents" && (
          <IncidentQueue
            incidents={incidents}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
        {activeTab === "fleet" && <ResourceFleet resources={resources} />}
        {activeTab === "iap" && <ActionPlans iap={iap} />}
        {activeTab === "chat" && (
          <CommandChat contextData={{ incidents, resources, sensors, iap, district: "Mangaluru (Dakshina Kannada)" }} />
        )}
      </main>

      <InjectModal
        isOpen={isInjectOpen}
        onClose={() => setIsInjectOpen(false)}
        onInject={handleInjectIncident}
      />
    </div>
  );
}
