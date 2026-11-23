import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || "dummy-key-for-build",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const PORT = process.env.PORT || 3000;

// API Routes
app.post("/api/flood/run-agents", async (req, res) => {
  try {
    const { incidents, resources, sensors, currentScenario } = req.body;

    const prompt = `You are FloodGuard AI, an autonomous disaster response coordination system with 5 specialized AI agents:
1. Data Collection Agent: Gathers sensor feeds, SOS beacons, weather radar.
2. Situation Analysis Agent: Evaluates flood depth, submergence zones, infrastructure risk.
3. Priority & Triage Agent: Scores urgency of rescue requests.
4. Resource Allocation Agent: Assigns boats, helicopters, relief units with optimal routing.
5. Response Plan Agent: Synthesizes Incident Action Plans (IAP) and broadcasts.

Current Scenario: ${currentScenario || "Severe flash flood following torrential rainfall (Stage 3 Emergency)"}
Active Incidents: ${JSON.stringify(incidents || [])}
Available Resources: ${JSON.stringify(resources || [])}
River Sensors: ${JSON.stringify(sensors || [])}

Perform an autonomous multi-agent coordination cycle. Output valid JSON adhering strictly to this schema:
{
  "agentLogs": [
    { "agent": "Data Collection Agent", "timestamp": "string", "action": "string", "status": "nominal" | "warning" | "critical", "detail": "string" },
    { "agent": "Situation Analysis Agent", "timestamp": "string", "action": "string", "status": "nominal" | "warning" | "critical", "detail": "string" },
    { "agent": "Priority & Triage Agent", "timestamp": "string", "action": "string", "status": "nominal" | "warning" | "critical", "detail": "string" },
    { "agent": "Resource Allocation Agent", "timestamp": "string", "action": "string", "status": "nominal" | "warning" | "critical", "detail": "string" },
    { "agent": "Response Plan Agent", "timestamp": "string", "action": "string", "status": "nominal" | "warning" | "critical", "detail": "string" }
  ],
  "updatedIncidents": [
    {
      "id": "string",
      "title": "string",
      "location": "string",
      "severity": "Critical" | "High" | "Medium",
      "assignedUnit": "string",
      "status": "Pending" | "Dispatched" | "Rescued",
      "victimCount": number,
      "etaMinutes": number
    }
  ],
  "updatedResources": [
    {
      "id": "string",
      "name": "string",
      "type": "Boat" | "Helicopter" | "Ambulance" | "Rescue Team",
      "status": "Deployed" | "Available" | "Maintenance",
      "location": "string",
      "assignedIncidentId": "string"
    }
  ],
  "incidentActionPlan": {
    "summary": "string",
    "evacuationAdvisory": "string",
    "prioritySectors": ["string"],
    "broadcastMessage": "string"
  }
}`;

    let responseText = "";
    if (!apiKey) {
      // Fallback response if no API key is provided
      responseText = JSON.stringify({
        agentLogs: [
          { agent: "Data Collection Agent", timestamp: new Date().toLocaleTimeString(), action: "Ingested 14 telemetry stations", status: "critical", detail: "River crest reached 14.2m (+2.1m above flood stage)." },
          { agent: "Situation Analysis Agent", timestamp: new Date().toLocaleTimeString(), action: "Submergence mapping completed", status: "critical", detail: "Sectors 3 and 4 experiencing rapid water rise. Power substation at risk." },
          { agent: "Priority & Triage Agent", timestamp: new Date().toLocaleTimeString(), action: "Scored 6 active SOS beacons", status: "warning", detail: "Elevated priority assigned to rooftop SOS at Elm St (15 trapped)." },
          { agent: "Resource Allocation Agent", timestamp: new Date().toLocaleTimeString(), action: "Dispatched Swift-Water Units", status: "nominal", detail: "Assigned Rescue Boat Alpha and Chopper-2 to Sector 3." },
          { agent: "Response Plan Agent", timestamp: new Date().toLocaleTimeString(), action: "Generated IAP-2026-C", status: "nominal", detail: "Broadcasted mandatory evacuation alert for low-lying riverside residential zones." }
        ],
        updatedIncidents: incidents || [],
        updatedResources: resources || [],
        incidentActionPlan: {
          summary: "Autonomous coordination cycle executed successfully under Stage 3 Flood Emergency.",
          evacuationAdvisory: "Mandatory evacuation in effect for Sectors 3 & 4. Move to high ground immediately.",
          prioritySectors: ["Sector 3 Riverside", "Sector 4 Industrial Basin"],
          broadcastMessage: "EMERGENCY ALERT: Floodwaters rising rapidly. Seek elevated shelter or rooftops. Rescue teams en route."
        }
      });
    } else {
      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are FloodGuard AI, an expert disaster response coordination system. You must return strictly valid JSON matching the requested schema.",
        },
      });
      responseText = response.text || "{}";
    }

    const data = JSON.parse(responseText);
    res.json(data);
  } catch (error: any) {
    console.error("Agent execution error:", error);
    res.status(500).json({ error: error.message || "Failed to execute agent cycle" });
  }
});

app.post("/api/flood/chat", async (req, res) => {
  try {
    const { messages, context } = req.body;
    const lastMessage = messages[messages.length - 1]?.content || "Status report?";

    if (!apiKey) {
      res.json({
        reply: "FloodGuard AI Command Coordinator online. All 5 autonomous agents are actively monitoring river gauges and coordinating rescue assets. How can I assist your operation?"
      });
      return;
    }

    const chat = ai.chats.create({
      model: "gemini-4-hydrogen",
      config: {
        systemInstruction: "You are the Lead Command Coordinator of FloodGuard AI, an autonomous disaster response platform. Provide concise, professional, tactical responses for emergency management teams. Current operational context: " + JSON.stringify(context || {})
      },
    });

    const response = await chat.sendMessage({ message: lastMessage });
    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message || "Chat failed" });
  }
});

// Vite middleware setup
const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: "spa",
});
app.use(vite.middlewares);

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`FloodGuard AI running on http://localhost:${PORT}`);
});
