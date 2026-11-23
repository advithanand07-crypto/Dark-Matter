export type Severity = "Critical" | "High" | "Medium";
export type IncidentStatus = "Pending" | "Dispatched" | "Rescued";
export type ResourceType = "Boat" | "Helicopter" | "Ambulance" | "Rescue Team";
export type ResourceStatus = "Available" | "Deployed" | "Maintenance";

export interface Incident {
  id: string;
  title: string;
  location: string;
  sector: string;
  severity: Severity;
  assignedUnit: string;
  status: IncidentStatus;
  victimCount: number;
  etaMinutes: number;
  timestamp: string;
  description: string;
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  status: ResourceStatus;
  location: string;
  assignedIncidentId?: string;
  capacity: number;
}

export interface RiverSensor {
  id: string;
  name: string;
  waterLevelMeters: number;
  floodStageMeters: number;
  trend: "rising" | "stable" | "falling";
  status: "nominal" | "warning" | "critical";
}

export interface AgentLog {
  agent: string;
  timestamp: string;
  action: string;
  status: "nominal" | "warning" | "critical";
  detail: string;
}

export interface IncidentActionPlan {
  summary: string;
  evacuationAdvisory: string;
  prioritySectors: string[];
  broadcastMessage: string;
}
