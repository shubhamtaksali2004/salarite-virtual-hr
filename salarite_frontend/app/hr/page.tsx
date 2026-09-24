"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HRPage() {
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchTasks = async () => {
const res = await fetch("https://salarite-virtual-hr-production.up.railway.app/tasks");
const data = await res.json();
  };

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 3000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (taskId: number, newStatus: string) => {
    await fetch(`https://salarite-virtual-hr-production.up.railway.app/tasks/${taskId}?status=${newStatus}`, {
      method: "PUT",
    });
    fetchTasks();
  };

  const statusStyle = (status: string) => {
    if (status === "Done") return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (status === "In Progress") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-slate-100 text-slate-600 border-slate-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Virtual HR Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Update your assigned task progress</p>
          </div>
          <div className="flex gap-5 items-center">
            <Link
              href="/hr/interview"
              className="text-sm text-purple-600 hover:text-purple-800 font-medium transition flex items-center gap-1"
            >
              🎥 Schedule Interview →
            </Link>
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-800 transition">
              ← Home
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Your Assigned Tasks</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 bg-slate-50">
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Update</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-400">
                    No tasks assigned yet.
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
                  <td className="px-6 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyle(
                        t.status
                      )}`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <select
                      value={t.status}
                      onChange={(e) => updateStatus(t.id, e.target.value)}
className="border border-slate-300 rounded-lg px-2.5 py-1.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Done</option>
                    </select>
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