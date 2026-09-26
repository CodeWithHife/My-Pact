"use client";

import React, { useState, useEffect } from "react";

interface TicketItem {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: string;
  createdAt: string;
}

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, [filter]);

  async function loadTickets() {
    try {
      const res = await fetch(`/api/admin/support${filter !== "all" ? `?status=${filter}` : ""}`);
      const data = await res.json();
      if (data.tickets) {
        setTickets(data.tickets);
      }
    } catch (e) {
      console.warn("Failed to load tickets:", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0b1a33] dark:text-white flex items-center gap-2.5">
            <i className="fas fa-headset text-[#0a66ff] dark:text-[#38bdf8]"></i>
            Student Support & Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Resolve student payment issues, account adjustments, and technical feedback.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {["all", "open", "resolved"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === st
                  ? "bg-[#0a66ff] text-white"
                  : "bg-white dark:bg-[#0f1d32] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {loading ? (
            <div className="py-12 text-center text-xs font-bold text-slate-400">
              <i className="fas fa-spinner fa-spin text-lg mb-2 block"></i>
              Loading support queue...
            </div>
          ) : tickets.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <i className="fas fa-circle-check text-emerald-500 text-2xl mb-2 block"></i>
              All student support tickets have been resolved!
            </div>
          ) : (
            tickets.map((t) => (
              <div key={t._id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0b1a33] dark:text-white">{t.subject}</span>
                    <span className="px-2 py-0.5 rounded-full text-[0.62rem] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {t.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {t.message}
                  </p>
                  <div className="text-[0.65rem] text-slate-400 mt-1.5">
                    From: <strong>{t.name}</strong> ({t.email})
                  </div>
                </div>

                <div className="shrink-0">
                  <span
                    className={`px-3 py-1 rounded-full text-[0.65rem] font-black uppercase ${
                      t.status === "open"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                        : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {t.status}
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
