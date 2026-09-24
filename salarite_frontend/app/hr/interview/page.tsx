"use client";
import { useState } from "react";
import Link from "next/link";

export default function InterviewPage() {
  const [candidateName, setCandidateName] = useState("");
  const [mode, setMode] = useState("Video");
  const [scheduledTime, setScheduledTime] = useState("");
  const [taskId, setTaskId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("https://salarite-virtual-hr-production.up.railway.app/interviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidate_name: candidateName,
        mode,
        scheduled_time: scheduledTime,
        task_id: Number(taskId),
      }),
    });
    setMessage("Interview scheduled successfully!");
    setCandidateName("");
    setScheduledTime("");
    setTaskId("");
    setLoading(false);
    setTimeout(() => setMessage(""), 4000);
  };

  const modeIcon: Record<string, string> = { Voice: "📞", Video: "🎥", Chat: "💬" };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-8 flex items-center justify-center">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Schedule Interview</h1>
            <p className="text-slate-500 text-sm mt-1">Set up a candidate interview</p>
          </div>
          <Link href="/hr" className="text-sm text-slate-500 hover:text-slate-800 transition">
            ← Back
          </Link>
        </div>

        <form
          onSubmit={handleSchedule}
          className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 p-6 space-y-4"
        >
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Candidate Name</label>
            <input
              placeholder="e.g. Priya Sharma"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Interview Mode</label>
            <div className="flex gap-2">
              {["Voice", "Video", "Chat"].map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                    mode === m
                      ? "bg-purple-600 text-white border-purple-600 scale-105 shadow-sm"
                      : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50 hover:scale-105"
                  }`}
                >
                  {modeIcon[m]} {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Date & Time</label>
            <input
              placeholder="e.g. 2026-06-10 3:00 PM"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Related Task ID</label>
            <input
              placeholder="e.g. 1"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-all hover:scale-[1.02] shadow-sm hover:shadow-md"
          >
            {loading ? "Scheduling..." : "Schedule Interview"}
          </button>

          {message && (
            <p className="text-emerald-600 text-sm text-center font-medium pt-2 animate-fade-in">
              ✓ {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}