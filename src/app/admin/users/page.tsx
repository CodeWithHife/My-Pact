"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      let token = "";
      try {
        token = localStorage.getItem("mypact_token") || "";
      } catch (e) {}

      const params = new URLSearchParams();
      if (search) params.append("q", search);
      if (statusFilter) params.append("status", statusFilter);
      if (roleFilter) params.append("role", roleFilter);

      const res = await fetch(`/api/admin/users?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (data.users) setUsers(data.users);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [statusFilter, roleFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadUsers();
  };

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    setActionLoading(userId);
    try {
      let token = "";
      try {
        token = localStorage.getItem("mypact_token") || "";
      } catch (e) {}

      const newStatus = currentStatus === "active" ? "suspended" : "active";
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ userId, status: newStatus }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, status: newStatus } : u))
        );
      }
    } catch (e) {
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0b1a33] dark:text-white tracking-tight">
            User Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            View registered scholars, monitor onboarding progress, subscription states, and account access.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, username, university..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#142642] text-xs outline-none focus:border-[#0a66ff]"
          />
          <i className="fas fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
        </form>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#142642] text-xs outline-none cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#142642] text-xs outline-none cursor-pointer"
          >
            <option value="">All Roles</option>
            <option value="user">Scholars (User)</option>
            <option value="admin">Admins</option>
          </select>

          <button
            onClick={loadUsers}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#142642] hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
          >
            <i className="fas fa-arrows-rotate text-xs"></i>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/90 dark:border-slate-700/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#142642]/60 text-slate-500 dark:text-slate-400 border-b border-slate-200/80 dark:border-slate-700/80 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Scholar</th>
                <th className="p-4">Institution & Level</th>
                <th className="p-4">Plan & Status</th>
                <th className="p-4">Onboarded</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    <i className="fas fa-circle-notch fa-spin mr-2"></i> Loading scholars...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No scholars found matching your search.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/50 dark:hover:bg-[#142642]/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0a66ff] text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {u.name?.charAt(0) || "S"}
                        </div>
                        <div>
                          <p className="font-bold text-[#0b1a33] dark:text-white">{u.name}</p>
                          <p className="text-[11px] text-slate-400 font-mono">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium truncate max-w-[180px]">{u.university || "Not set"}</p>
                      <p className="text-[11px] text-slate-400">{u.level || "Undergraduate"}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        u.subscription?.status === "active"
                          ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                          : u.subscription?.status === "free"
                          ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>{u.subscription?.planName || "Free Trial"}</span>
                      </span>
                    </td>
                    <td className="p-4">
                      {u.isOnboarded ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <i className="fas fa-check text-[10px]"></i> Yes
                        </span>
                      ) : (
                        <span className="text-amber-500 font-medium flex items-center gap-1">
                          <i className="fas fa-clock text-[10px]"></i> Incomplete
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-mono uppercase text-[10px] font-bold">
                      <span className={u.role === "admin" ? "text-purple-600 dark:text-purple-400 font-black" : "text-slate-500"}>
                        {u.role || "user"}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/admin/users/${u._id}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#142642] hover:bg-slate-200 dark:hover:bg-[#1b335a] text-xs font-bold text-slate-700 dark:text-slate-200 transition-all"
                      >
                        Inspect
                      </Link>

                      <button
                        onClick={() => handleToggleStatus(u._id, u.status || "active")}
                        disabled={actionLoading === u._id}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          u.status === "suspended"
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/50 dark:text-red-300"
                        }`}
                      >
                        {actionLoading === u._id ? "..." : u.status === "suspended" ? "Reactivate" : "Suspend"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
