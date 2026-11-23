import React, { useState } from "react";
import { Send, Bot, User, Sparkles, MessageSquare } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface CommandChatProps {
  contextData: any;
}

export const CommandChat: React.FC<CommandChatProps> = ({ contextData }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "FloodGuard AI Command Coordinator online. I am synchronized with all 5 autonomous agents. Ask me for tactical recommendations, resource reallocations, or emergency broadcast adjustments.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const userMsg = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user" as const, content: userMsg }];
    setMessages(newMessages);
    setIsSending(true);

    try {
      const response = await fetch("/api/flood/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, context: contextData }),
      });
      const data = await response.json();
      if (data.reply) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: "AI coordination node acknowledged." }]);
      }
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: "assistant", content: "Error connecting to AI Command Coordinator." }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bot className="w-6 h-6 text-cyan-400" />
            AI Command Coordinator Chat
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Direct tactical consultation with the centralized AI disaster response coordinator.
          </p>
        </div>
        <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono rounded-lg">
          Model: Gemini 4 Hydrogen
        </span>
      </div>

      {/* Chat Box */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col h-[550px]">
        {/* Messages list */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  m.role === "user"
                    ? "bg-cyan-600 text-white shadow-md"
                    : "bg-slate-800 border border-slate-700 text-cyan-400"
                }`}
              >
                {m.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div
                className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-cyan-600 text-white rounded-tr-none"
                    : "bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {isSending && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-xs text-slate-400 font-mono animate-pulse">
                Coordinator analyzing tactical telemetry...
              </div>
            </div>
          )}
        </div>

        {/* Input form */}
        <form onSubmit={handleSend} className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-3">
          <input
            type="text"
            placeholder="Ask tactical coordinator (e.g., 'What is the evacuation status of Sector 3?')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={isSending || !input.trim()}
            className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 whitespace-nowrap"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
