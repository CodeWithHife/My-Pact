"use client";

import React, { useState, useEffect } from "react";

export default function AdminActivityPage() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        if (data.tasks) setTasks(data.tasks);
      } catch (e) {}
    }
    load();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-[#0b1a33] dark:text-white tracking-tight">Study Activity & Streaks</h1>
        <p className="text-xs text-slate-500 mt-0.5">High-level overview of daily commitments, study sessions, and verification proofs.</p>
      </div>

      <div className="bg-white dark:bg-[#0f1d32] border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-[#142642]/60 text-slate-500 border-b border-slate-200 dark:border-slate-700 font-bold uppercase text-[10px]">
            <tr>
              <th className="p-4">Task Title</th>
              <th className="p-4">Course</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Verification</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {tasks.map((t) => (
              <tr key={t._id}>
                <td className="p-4 font-bold">{t.title}</td>
                <td className="p-4">{t.course}</td>
                <td className="p-4">{t.duration}</td>
                <td className="p-4 uppercase font-mono text-[10px]">{t.verificationMethod}</td>
                <td className="p-4 font-bold uppercase text-[10px] text-emerald-600">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
