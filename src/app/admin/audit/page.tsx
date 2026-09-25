"use client";

import React, { useState, useEffect } from "react";

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLogs() {
      try {
        let token = "";
        try {
          token = localStorage.getItem("mypact_token") || "";
        } catch (e) {}

        const res = await fetch("/api/admin/audit", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        if (data.logs) setLogs(data.logs);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    loadLogs();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-[#0b1a33] dark:text-white tracking-tight">
          System Audit Logs
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Immutable administrative action log, payment verifications, and security events.
        </p>
      </div>

      <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/90 dark:border-slate-700/80 rounded-2xl shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-[#142642]/60 text-slate-500 border-b border-slate-200/80 dark:border-slate-700/80 font-bold uppercase text-[10px]">
            <tr>
              <th className="p-4">Hash</th>
              <th className="p-4">Action</th>
              <th className="p-4">Details</th>
              <th className="p-4">Status</th>
              <th className="p-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400">
                  Loading audit trail...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400">
                  No audit logs recorded yet.
                </td>
              </tr>
            ) : (
              logs.map((l) => (
                <tr key={l._id}>
                  <td className="p-4 font-mono text-[11px] text-[#0a66ff]">{l.hash}</td>
                  <td className="p-4 font-bold">{l.action}</td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">{l.details || "—"}</td>
                  <td className="p-4 font-mono text-[10px] uppercase font-bold text-emerald-600">
                    {l.status}
                  </td>
                  <td className="p-4 text-slate-400 text-[10px]">
                    {new Date(l.createdAt || l.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
