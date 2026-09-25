"use client";

import React, { useState, useEffect } from "react";

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTickets() {
      try {
        const res = await fetch("/api/admin/support");
        const data = await res.json();
        if (data.tickets) setTickets(data.tickets);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    loadTickets();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-[#0b1a33] dark:text-white tracking-tight">
          Student Support & Inquiries
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Manage student help requests, billing inquiries, and study assistance.
        </p>
      </div>

      <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/90 dark:border-slate-700/80 rounded-2xl shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-[#142642]/60 text-slate-500 border-b border-slate-200/80 dark:border-slate-700/80 font-bold uppercase text-[10px]">
            <tr>
              <th className="p-4">Scholar</th>
              <th className="p-4">Subject & Message</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400">Loading tickets...</td>
              </tr>
            ) : tickets.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400">No support requests submitted.</td>
              </tr>
            ) : (
              tickets.map((t) => (
                <tr key={t._id}>
                  <td className="p-4">
                    <p className="font-bold">{t.userName}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{t.userEmail}</p>
                  </td>
                  <td className="p-4 max-w-sm">
                    <p className="font-bold">{t.subject}</p>
                    <p className="text-slate-500 text-xs truncate">{t.message}</p>
                  </td>
                  <td className="p-4 uppercase font-bold text-[10px] text-slate-500">{t.category}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase">
                      {t.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 text-[10px]">{new Date(t.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
