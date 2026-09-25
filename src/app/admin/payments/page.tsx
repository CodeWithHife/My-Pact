"use client";

import React, { useState, useEffect } from "react";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("pending");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectModalPayment, setRejectModalPayment] = useState<any | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const loadPayments = async () => {
    setLoading(true);
    try {
      let token = "";
      try {
        token = localStorage.getItem("mypact_token") || "";
      } catch (e) {}

      const res = await fetch("/api/payments", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (data.payments) setPayments(data.payments);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      let token = "";
      try {
        token = localStorage.getItem("mypact_token") || "";
      } catch (e) {}

      const res = await fetch(`/api/payments/${id}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setPayments((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: "approved" } : p))
        );
      }
    } catch (e) {
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectModalPayment) return;

    setActionLoading(rejectModalPayment._id);
    try {
      let token = "";
      try {
        token = localStorage.getItem("mypact_token") || "";
      } catch (e) {}

      const res = await fetch(`/api/payments/${rejectModalPayment._id}/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ reason: rejectReason }),
      });
      if (res.ok) {
        setPayments((prev) =>
          prev.map((p) =>
            p._id === rejectModalPayment._id ? { ...p, status: "rejected", rejectionReason: rejectReason } : p
          )
        );
        setRejectModalPayment(null);
        setRejectReason("");
      }
    } catch (e) {
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = payments.filter((p) => (filterStatus ? p.status === filterStatus : true));

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0b1a33] dark:text-white tracking-tight">
            Payment Verifications
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Review manual OPay / Bank transfers and activate student subscriptions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterStatus("pending")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filterStatus === "pending"
                ? "bg-amber-500 text-white shadow-xs"
                : "bg-slate-100 dark:bg-[#142642] text-slate-600 dark:text-slate-300"
            }`}
          >
            Pending ({payments.filter((p) => p.status === "pending").length})
          </button>
          <button
            onClick={() => setFilterStatus("approved")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filterStatus === "approved"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-[#142642] text-slate-600 dark:text-slate-300"
            }`}
          >
            Approved ({payments.filter((p) => p.status === "approved").length})
          </button>
          <button
            onClick={() => setFilterStatus("rejected")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filterStatus === "rejected"
                ? "bg-red-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-[#142642] text-slate-600 dark:text-slate-300"
            }`}
          >
            Rejected ({payments.filter((p) => p.status === "rejected").length})
          </button>
          <button
            onClick={() => setFilterStatus("")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filterStatus === ""
                ? "bg-[#0a66ff] text-white shadow-xs"
                : "bg-slate-100 dark:bg-[#142642] text-slate-600 dark:text-slate-300"
            }`}
          >
            All ({payments.length})
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/90 dark:border-slate-700/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#142642]/60 text-slate-500 dark:text-slate-400 border-b border-slate-200/80 dark:border-slate-700/80 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Reference</th>
                <th className="p-4">Scholar</th>
                <th className="p-4">Plan & Amount</th>
                <th className="p-4">Sender & Narration</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    <i className="fas fa-circle-notch fa-spin mr-2"></i> Loading payment records...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No {filterStatus} payments found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/50 dark:hover:bg-[#142642]/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#0a66ff] dark:text-[#38bdf8]">
                      {p.reference}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-[#0b1a33] dark:text-white">{p.userName}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{p.userEmail}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{p.planName}</p>
                      <p className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                        ₦{p.amount?.toLocaleString()}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium">Sender: {p.senderName || "N/A"}</p>
                      {p.transactionRef && (
                        <p className="text-[10px] text-slate-400 font-mono">Ref: {p.transactionRef}</p>
                      )}
                    </td>
                    <td className="p-4 text-slate-400 text-[11px]">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        p.status === "approved"
                          ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                          : p.status === "rejected"
                          ? "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300"
                          : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                      }`}>
                        <span>{p.status}</span>
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {p.status === "pending" ? (
                        <>
                          <button
                            onClick={() => handleApprove(p._id)}
                            disabled={actionLoading === p._id}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setRejectModalPayment(p)}
                            className="px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-950/60 hover:bg-red-200 text-red-700 dark:text-red-300 font-bold text-xs transition-all"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-mono">Verified</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {rejectModalPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-[#0f1d32] border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-[#0b1a33] dark:text-white mb-1">
              Reject Payment ({rejectModalPayment.reference})
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Provide a reason so the student understands why the transfer was not confirmed.
            </p>

            <form onSubmit={handleRejectSubmit} className="space-y-3">
              <textarea
                required
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Transaction reference not found on bank statement..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs outline-none bg-slate-50 dark:bg-[#142642]"
                rows={3}
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectModalPayment(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
