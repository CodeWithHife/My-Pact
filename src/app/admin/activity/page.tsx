"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminActivityPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivity() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        if (data.recentActivity) {
          setActivities(data.recentActivity);
        }
      } catch (e) {
        console.warn("Failed to load activity:", e);
      } finally {
        setLoading(false);
      }
    }
    loadActivity();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0b1a33] dark:text-white flex items-center gap-2.5">
            <i className="fas fa-chart-line text-[#0a66ff] dark:text-[#38bdf8]"></i>
            Live Student Study Activity
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time feed of study sessions, completed pacts, alarms triggered, and active streaks.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {loading ? (
            <div className="py-12 text-center text-xs font-bold text-slate-400">
              <i className="fas fa-spinner fa-spin text-lg mb-2 block"></i>
              Loading live study feed...
            </div>
          ) : activities.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <i className="fas fa-calendar-check text-2xl text-slate-300 dark:text-slate-600 mb-2 block"></i>
              No study activity recorded in this session.
            </div>
          ) : (
            activities.map((act, idx) => (
              <div key={act._id || idx} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#0a66ff]/10 text-[#0a66ff] dark:text-[#38bdf8] flex items-center justify-center text-sm shrink-0">
                    <i className="fas fa-check-double"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0b1a33] dark:text-white">
                      {act.title || "Study Session Completed"}
                    </h4>
                    <p className="text-[0.68rem] text-slate-400 mt-0.5">
                      Course: <strong className="text-slate-700 dark:text-slate-300">{act.course || "General"}</strong> &bull; Duration: {act.duration || "45 min"} &bull; Time: {act.time || "Scheduled"}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {act.status || "Active"}
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
