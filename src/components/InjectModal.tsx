import React, { useState } from "react";
import { Incident } from "../types";
import { X, AlertTriangle, Send } from "lucide-react";

interface InjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInject: (newIncident: Incident) => void;
}

export const InjectModal: React.FC<InjectModalProps> = ({
  isOpen,
  onClose,
  onInject,
}) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [sector, setSector] = useState("Sector 3");
  const [severity, setSeverity] = useState<Incident["severity"]>("Critical");
  const [victimCount, setVictimCount] = useState("10");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location) return;

    const incident: Incident = {
      id: `SOS-${Math.floor(100 + Math.random() * 900)}`,
      title,
      location,
      sector,
      severity,
      assignedUnit: "Standby Assignment",
      status: "Pending",
      victimCount: parseInt(victimCount) || 5,
      etaMinutes: Math.floor(8 + Math.random() * 15),
      timestamp: new Date().toLocaleTimeString(),
      description: description || "Citizen emergency report received via automated SOS beacon.",
    };

    onInject(incident);
    onClose();
    setTitle("");
    setLocation("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Inject Emergency Incident</h3>
              <p className="text-xs text-slate-400">Simulate a new flood SOS beacon or hazard report</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Incident Title</label>
            <input
              type="text"
              required
              placeholder="e.g., Trapped rooftop residents near bridge"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Sector</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Sector 1">Sector 1: North Residential</option>
                <option value="Sector 2">Sector 2: Downtown Commercial</option>
                <option value="Sector 3">Sector 3: Riverside Basin</option>
                <option value="Sector 4">Sector 4: Industrial Harbor</option>
                <option value="Sector 5">Sector 5: Hillside Escarpment</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Severity Urgency</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Location Landmark</label>
              <input
                type="text"
                required
                placeholder="e.g., 400 Elm St & 5th Ave"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Estimated Victims</label>
              <input
                type="number"
                min="1"
                value={victimCount}
                onChange={(e) => setVictimCount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Detailed Description</label>
            <textarea
              rows={3}
              placeholder="Enter details about water rise speed, medical urgencies, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold rounded-xl shadow-lg shadow-red-600/20 transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast & Triage</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
