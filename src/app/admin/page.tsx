"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

interface StatsData {
  totalUsers: number;
  activeUsers: number;
  pendingPayments: number;
  approvedPaymentsCount: number;
  totalRevenue: number;
  totalTasks: number;
  totalCourses: number;
  openSupport: number;
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [recentPayments, setRecentPayments] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
          setRecentPayments(data.recentPayments || []);
          setRecentUsers(data.recentUsers || []);
        } else {
          setError(data.error || "Failed to load dashboard metrics");
        }
      } catch (err: any) {
        setError("Network error loading admin stats");
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070f1e] text-[#0b1a33] dark:text-slate-100 transition-colors">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0b162c]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-extrabold text-xl tracking-tight text-[#0b1a33] dark:text-white">
              My<span className="text-[#0a66ff]">Pact</span>
            </Link>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#0a66ff]/10 text-[#0a66ff] dark:bg-[#38bdf8]/10 dark:text-[#38bdf8]">
              Admin Central
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              <i className="fas fa-arrow-left mr-1.5 text-[0.65rem]"></i>
              Student View
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#0b1a33] dark:text-white flex items-center gap-2.5">
              <i className="fas fa-gauge text-[#0a66ff] dark:text-[#38bdf8]"></i>
              Command Center Overview
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Live metrics across subscriptions, student verification, syllabus, and system operations.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Link
              href="/admin/payments"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0a66ff] hover:bg-[#084bc2] text-white shadow-md shadow-[#0a66ff]/20 flex items-center gap-2 transition-all"
            >
              <i className="fas fa-money-bill-transfer"></i>
              <span>Verify Payments ({stats?.pendingPayments || 0})</span>
            </Link>
            <Link
              href="/admin/settings"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#142642] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <i className="fas fa-sliders"></i>
              <span>System Settings</span>
            </Link>
          </div>
        </div>

        {/* Quick Admin Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {[
            { label: "Users", icon: "fas fa-users", href: "/admin/users", count: stats?.totalUsers },
            { label: "Payments", icon: "fas fa-receipt", href: "/admin/payments", count: stats?.pendingPayments, highlight: Boolean(stats?.pendingPayments) },
            { label: "Plans", icon: "fas fa-tags", href: "/admin/plans" },
            { label: "Courses", icon: "fas fa-book-open", href: "/admin/courses", count: stats?.totalCourses },
            { label: "Resources", icon: "fas fa-folder-open", href: "/admin/resources" },
            { label: "Support", icon: "fas fa-headset", href: "/admin/support", count: stats?.openSupport },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center text-center group ${
                item.highlight
                  ? "bg-amber-500/10 border-amber-500/30 dark:bg-amber-500/10 dark:border-amber-500/30 hover:border-amber-500"
                  : "bg-white dark:bg-[#0f1d32] border-slate-200/80 dark:border-slate-800 hover:border-[#0a66ff] dark:hover:border-[#38bdf8] shadow-sm"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-[#0a66ff]/10 dark:group-hover:bg-[#38bdf8]/10 text-slate-700 dark:text-slate-300 group-hover:text-[#0a66ff] dark:group-hover:text-[#38bdf8] flex items-center justify-center text-sm transition-colors mb-2">
                <i className={item.icon}></i>
              </div>
              <span className="text-xs font-bold text-[#0b1a33] dark:text-slate-200">{item.label}</span>
              {item.count !== undefined && (
                <span className="text-[0.68rem] text-slate-400 font-semibold mt-0.5">{item.count} items</span>
              )}
            </Link>
          ))}
        </div>

        {/* Primary Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-[#0f1d32] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Revenue</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs">
                <i className="fas fa-naira-sign"></i>
              </div>
            </div>
            <div className="text-2xl font-black text-[#0b1a33] dark:text-white">
              ₦{(stats?.totalRevenue || 0).toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">{stats?.approvedPaymentsCount || 0} approved bank transfers</p>
          </div>

          <div className="bg-white dark:bg-[#0f1d32] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Students</span>
              <div className="w-8 h-8 rounded-lg bg-[#0a66ff]/10 text-[#0a66ff] dark:text-[#38bdf8] flex items-center justify-center text-xs">
                <i className="fas fa-user-graduate"></i>
              </div>
            </div>
            <div className="text-2xl font-black text-[#0b1a33] dark:text-white">
              {stats?.totalUsers || 0}
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">{stats?.activeUsers || 0} active accounts</p>
          </div>

          <div className="bg-white dark:bg-[#0f1d32] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pending Transfers</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center text-xs">
                <i className="fas fa-clock"></i>
              </div>
            </div>
            <div className="text-2xl font-black text-[#0b1a33] dark:text-white">
              {stats?.pendingPayments || 0}
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">Require manual verification</p>
          </div>

          <div className="bg-white dark:bg-[#0f1d32] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Study Pacts Created</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center text-xs">
                <i className="fas fa-list-check"></i>
              </div>
            </div>
            <div className="text-2xl font-black text-[#0b1a33] dark:text-white">
              {stats?.totalTasks || 0}
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">Across {stats?.totalCourses || 0} courses registered</p>
          </div>
        </div>

        {/* Dual Column: Pending Payments Queue & Recent Registered Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending / Recent Payments */}
          <div className="bg-white dark:bg-[#0f1d32] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-[#0b1a33] dark:text-white flex items-center gap-2">
                  <i className="fas fa-receipt text-[#0a66ff] dark:text-[#38bdf8]"></i>
                  Recent Payments Queue
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Manual OPay / Bank Transfer Submissions</p>
              </div>
              <Link
                href="/admin/payments"
                className="text-xs font-bold text-[#0a66ff] dark:text-[#38bdf8] hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentPayments.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  <i className="fas fa-check-circle text-emerald-500 text-lg mb-2 block"></i>
                  No pending payments in verification queue.
                </div>
              ) : (
                recentPayments.map((p) => (
                  <div key={p._id} className="py-3.5 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-[#0b1a33] dark:text-slate-200">
                        {p.userName || p.userEmail}
                      </div>
                      <div className="text-[0.68rem] text-slate-400">
                        {p.planName} &bull; ₦{p.amount?.toLocaleString()} &bull; Ref: {p.reference}
                      </div>
                    </div>
                    <div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold uppercase ${
                          p.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : p.status === "rejected"
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Student Registrations */}
          <div className="bg-white dark:bg-[#0f1d32] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-[#0b1a33] dark:text-white flex items-center gap-2">
                  <i className="fas fa-user-plus text-[#0a66ff] dark:text-[#38bdf8]"></i>
                  Recent Students
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Newly onboarded student accounts</p>
              </div>
              <Link
                href="/admin/users"
                className="text-xs font-bold text-[#0a66ff] dark:text-[#38bdf8] hover:underline"
              >
                Manage Users
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentUsers.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No student records found.
                </div>
              ) : (
                recentUsers.map((u) => (
                  <div key={u._id} className="py-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0a66ff]/10 text-[#0a66ff] dark:bg-[#38bdf8]/10 dark:text-[#38bdf8] flex items-center justify-center font-bold text-xs">
                        {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0b1a33] dark:text-slate-200">{u.name}</div>
                        <div className="text-[0.68rem] text-slate-400">{u.university || u.email}</div>
                      </div>
                    </div>
                    <div>
                      <span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {u.subscription?.planName || "Free Plan"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
