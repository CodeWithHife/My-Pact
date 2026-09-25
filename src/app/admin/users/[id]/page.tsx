"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AdminUserDetailPage() {
  const params = useParams();
  const userId = params?.id as string;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        let token = "";
        try {
          token = localStorage.getItem("mypact_token") || "";
        } catch (e) {}

        const res = await fetch(`/api/admin/users?q=${userId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        if (data.users && data.users.length > 0) {
          const found = data.users.find((u: any) => u._id === userId) || data.users[0];
          setUser(found);
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }

    if (userId) loadUser();
  }, [userId]);

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-400">Loading user profile...</div>;
  }

  if (!user) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-xs text-slate-500">Scholar not found.</p>
        <Link href="/admin/users" className="px-4 py-2 rounded-full bg-[#0a66ff] text-white text-xs font-bold">
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/users"
          className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#142642] flex items-center justify-center text-xs text-slate-600 dark:text-slate-300"
        >
          <i className="fas fa-arrow-left"></i>
        </Link>
        <div>
          <h1 className="text-xl font-black text-[#0b1a33] dark:text-white">{user.name}</h1>
          <p className="text-xs text-slate-400 font-mono">ID: {user._id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs space-y-3 text-xs">
          <h3 className="font-bold uppercase tracking-wider text-[10px] text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
            Account Details
          </h3>
          <div>
            <span className="text-slate-400 block text-[10px]">Email:</span>
            <span className="font-medium font-mono">{user.email}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Username:</span>
            <span className="font-medium">@{user.username}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Phone:</span>
            <span>{user.phone || "Not provided"}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Role:</span>
            <span className="font-bold uppercase text-[#0a66ff]">{user.role}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Account Status:</span>
            <span className={`font-bold ${user.status === "suspended" ? "text-red-500" : "text-emerald-500"}`}>
              {user.status || "active"}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs space-y-3 text-xs">
          <h3 className="font-bold uppercase tracking-wider text-[10px] text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
            Academic Standing
          </h3>
          <div>
            <span className="text-slate-400 block text-[10px]">University / Institution:</span>
            <span className="font-medium">{user.university || "Not set"}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Faculty / Department:</span>
            <span className="font-medium">{user.faculty || "Not set"}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Academic Level:</span>
            <span className="font-medium">{user.level || "Undergraduate"}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Target CGPA Goal:</span>
            <span className="font-bold text-[#0a66ff] dark:text-[#38bdf8]">{user.targetGpa || "First Class"}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Enforcement Tier:</span>
            <span className="font-medium">{user.tier || "STRICT ENFORCEMENT"}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs space-y-3 text-xs">
          <h3 className="font-bold uppercase tracking-wider text-[10px] text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
            Subscription Status
          </h3>
          <div>
            <span className="text-slate-400 block text-[10px]">Current Plan:</span>
            <span className="font-bold text-[#0a66ff]">{user.subscription?.planName || "Free Trial"}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Plan Status:</span>
            <span className="font-medium uppercase text-emerald-600">{user.subscription?.status || "free"}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Max Courses Allowed:</span>
            <span>{user.subscription?.maxCourses || 3} courses</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Max Daily Tasks:</span>
            <span>{user.subscription?.maxStudyTasks || 10} tasks</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Joined Date:</span>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
