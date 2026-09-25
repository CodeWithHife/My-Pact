"use client";

import React, { useState, useEffect } from "react";

export default function AdminSettingsPage() {
  const [bankDetails, setBankDetails] = useState({
    bankName: "OPay / Paycom",
    accountName: "MyPact Scholar Technologies",
    accountNumber: "8123456789",
    instructions: "Use your unique PACT reference as transfer narration.",
  });

  const [freePlanLimits, setFreePlanLimits] = useState({
    durationDays: 7,
    maxTasks: 10,
    maxCourses: 3,
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        if (data.settings) {
          const pAcc = data.settings.find((s: any) => s.key === "payment_account");
          if (pAcc && pAcc.value) setBankDetails(pAcc.value);

          const fLim = data.settings.find((s: any) => s.key === "free_plan_limits");
          if (fLim && fLim.value) setFreePlanLimits(fLim.value);
        }
      } catch (e) {}
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      let token = "";
      try {
        token = localStorage.getItem("mypact_token") || "";
      } catch (e) {}

      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          key: "payment_account",
          value: bankDetails,
          description: "OPay and bank recipient details for student manual transfers",
        }),
      });

      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          key: "free_plan_limits",
          value: freePlanLimits,
          description: "Free plan expiration and limits",
        }),
      });

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-[#0b1a33] dark:text-white tracking-tight">
          System Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Manage platform parameters, manual payment account recipient details, and Free Trial thresholds.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
          <i className="fas fa-check-double text-xs"></i>
          <span>Settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5 text-xs">
        <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="font-bold uppercase tracking-wider text-[11px] text-[#0a66ff] flex items-center gap-2">
            <i className="fas fa-building-columns"></i>
            <span>Official OPay & Bank Account (For Student Payments)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Bank Name</label>
              <input
                type="text"
                required
                value={bankDetails.bankName}
                onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Account Number</label>
              <input
                type="text"
                required
                value={bankDetails.accountNumber}
                onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642] font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Account Name</label>
            <input
              type="text"
              required
              value={bankDetails.accountName}
              onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Transfer Instructions / Narration Note</label>
            <input
              type="text"
              value={bankDetails.instructions}
              onChange={(e) => setBankDetails({ ...bankDetails, instructions: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="font-bold uppercase tracking-wider text-[11px] text-[#0a66ff] flex items-center gap-2">
            <i className="fas fa-stopwatch"></i>
            <span>Free Plan Limits & Server-Side Enforcement</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Trial Duration (Days)</label>
              <input
                type="number"
                required
                value={freePlanLimits.durationDays}
                onChange={(e) => setFreePlanLimits({ ...freePlanLimits, durationDays: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Max Active Courses</label>
              <input
                type="number"
                required
                value={freePlanLimits.maxCourses}
                onChange={(e) => setFreePlanLimits({ ...freePlanLimits, maxCourses: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Max Daily Study Tasks</label>
              <input
                type="number"
                required
                value={freePlanLimits.maxTasks}
                onChange={(e) => setFreePlanLimits({ ...freePlanLimits, maxTasks: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-full bg-[#0a66ff] hover:bg-[#084bc2] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
          >
            {saving ? (
              <>
                <i className="fas fa-circle-notch fa-spin text-xs"></i>
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <i className="fas fa-floppy-disk text-xs"></i>
                <span>Save All Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
