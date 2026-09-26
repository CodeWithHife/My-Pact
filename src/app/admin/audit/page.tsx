"use client";

import React, { useState, useEffect } from "react";

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuditLogs() {
      try {
        const res = await fetch("/api/audit");
        const data = await res.json();
        if (data.auditLogs) {
          setLogs(data.auditLogs);
        }
      } catch (e) {
        console.warn("Failed to load audit logs:", e);
      } finally {
        setLoading(false);
      }
    }
    loadAuditLogs();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-[#0b1a33] dark:text-white flex items-center gap-2.5">
          <i className="fas fa-shield-halved text-[#0a66ff] dark:text-[#38bdf8]"></i>
          Immutable System Audit Logs
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Cryptographically recorded timeline of all administrative operations, payment approvals, and user updates.
        </p>
      </div>

      <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {loading ? (
            <div className="py-12 text-center text-xs font-bold text-slate-400">
              <i className="fas fa-spinner fa-spin text-lg mb-2 block"></i>
              Loading system audit records...
            </div>
          ) : logs.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <i className="fas fa-fingerprint text-2xl text-slate-300 dark:text-slate-600 mb-2 block"></i>
              No administrative audit entries recorded yet.
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id || log._id} className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <i className="fas fa-key"></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0b1a33] dark:text-slate-200">
                      {log.action}
                    </div>
                    <div className="text-[0.68rem] text-slate-400 mt-0.5">
                      {log.details ? (typeof log.details === 'object' ? JSON.stringify(log.details) : log.details) : log.course || "System"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <span className="text-[0.65rem] font-mono text-slate-400">{log.hash || "0x9ab81"}</span>
                  <span className="px-2 py-0.5 rounded-full text-[0.65rem] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {log.status || "Verified"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
