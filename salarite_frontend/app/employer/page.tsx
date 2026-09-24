"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EmployerPage() {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    const res = await fetch("https://salarite-virtual-hr-production.up.railway.app/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("https://salarite-virtual-hr-production.up.railway.app/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, assigned_to: assignedTo, status: "Pending" }),
    });
    setTitle("");
    setAssignedTo("");
    await fetchTasks();
    setLoading(false);
  };

  const statusStyle = (status: string) => {
    if (status === "Done") return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (status === "In Progress") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-slate-100 text-slate-600 border-slate-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Employer Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Assign tasks and track progress live</p>
          </div>
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-slate-800 transition flex items-center gap-1"
          >
            ← Home
          </Link>
        </div>

        <form
          onSubmit={handleAssign}
          className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 p-6 mb-8 flex flex-wrap gap-3 items-end"
        >
          <div className="flex-1 min-w-[220px]">
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Task Title</label>
            <input
              placeholder="e.g. Screen resumes for Backend role"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Assign To</label>
            <input
              placeholder="e.g. Virtual HR 1"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-all hover:scale-105 shadow-sm hover:shadow-md"
          >
            {loading ? "Assigning..." : "Assign Task"}
          </button>
        </form>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Live Task Status</h2>
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
              Live · refreshing every 3s
            </span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 bg-slate-50">
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Assigned To</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-400">
                    No tasks yet — assign one above to get started.
                  </td>
                </tr>
              )}
              {tasks.map((t) => (
                <tr
                  key={t.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-3 text-slate-400">#{t.id}</td>
                  <td className="px-6 py-3 text-slate-800 font-medium">{t.title}</td>
                  <td className="px-6 py-3 text-slate-600">{t.assigned_to}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyle(
                        t.status
                      )}`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}