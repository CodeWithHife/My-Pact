"use client";

import React, { useState, useEffect } from "react";

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: "",
    slug: "",
    price: 1500,
    period: "Monthly",
    durationDays: 30,
    description: "",
    features: "",
    popular: false,
    badge: "",
    type: "paid",
  });

  const loadPlans = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/plans");
      const data = await res.json();
      if (data.plans) setPlans(data.plans);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let token = "";
      try {
        token = localStorage.getItem("mypact_token") || "";
      } catch (e) {}

      const featuresArr = newPlan.features.split(/\r?\n/).filter((f) => f.trim().length > 0);
      const res = await fetch("/api/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          ...newPlan,
          slug: newPlan.slug || newPlan.name.toLowerCase().replace(/\s+/g, "-"),
          features: featuresArr,
        }),
      });

      if (res.ok) {
        setCreateModalOpen(false);
        loadPlans();
      }
    } catch (e) {}
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0b1a33] dark:text-white tracking-tight">
            Plan & Limit Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure active subscription tiers, pricing, study limits, and features.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2 rounded-full bg-[#0a66ff] text-white text-xs font-bold shadow-xs hover:bg-[#084bc2] transition-all flex items-center gap-1.5"
        >
          <i className="fas fa-plus text-[10px]"></i>
          <span>Create New Plan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((p) => (
          <div
            key={p._id || p.slug}
            className="bg-white dark:bg-[#0f1d32] border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-extrabold text-sm text-[#0b1a33] dark:text-white">{p.name}</h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#142642] text-slate-600 dark:text-slate-300">
                  {p.type}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">{p.description}</p>
              <div className="text-2xl font-black text-[#0a66ff] dark:text-[#38bdf8] mb-3">
                {p.price === 0 ? "Free" : `₦${p.price.toLocaleString()}`}
                <span className="text-xs font-normal text-slate-400 ml-1">/ {p.period}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3">
                {p.features?.map((f: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <i className="fas fa-check text-[9px] text-emerald-500"></i>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-[#0f1d32] border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-[#0b1a33] dark:text-white mb-3">Create Subscription Plan</h3>
            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Plan Name</label>
                <input
                  type="text"
                  required
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  placeholder="e.g. Master Scholar Plan"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Price (NGN)</label>
                  <input
                    type="number"
                    required
                    value={newPlan.price}
                    onChange={(e) => setNewPlan({ ...newPlan, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    required
                    value={newPlan.durationDays}
                    onChange={(e) => setNewPlan({ ...newPlan, durationDays: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Description</label>
                <input
                  type="text"
                  required
                  value={newPlan.description}
                  onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  placeholder="Brief value summary"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Features (One per line)</label>
                <textarea
                  value={newPlan.features}
                  onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
                  placeholder="Up to 10 course pacts
AI OCR proof verification
Emergency SMS alerts"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0a66ff] hover:bg-[#084bc2] text-white text-xs font-bold shadow-xs"
                >
                  Save Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
