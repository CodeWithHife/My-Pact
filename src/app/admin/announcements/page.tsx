"use client";

import React, { useState, useEffect } from "react";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [priority, setPriority] = useState("medium");
  const [creating, setCreating] = useState(false);

  const loadAnnouncements = async () => {
    try {
      const res = await fetch("/api/admin/announcements");
      const data = await res.json();
      if (data.announcements) setAnnouncements(data.announcements);
    } catch (e) {}
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      let token = "";
      try {
        token = localStorage.getItem("mypact_token") || "";
      } catch (e) {}

      await fetch("/api/admin/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ title, content, category, priority }),
      });

      setTitle("");
      setContent("");
      loadAnnouncements();
    } catch (e) {
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-[#0b1a33] dark:text-white tracking-tight">
          Platform Announcements
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Broadcast important updates, maintenance alerts, and academic notices to all scholars.
        </p>
      </div>

      <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">New Broadcast</h3>
        <form onSubmit={handleCreate} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. End of Semester Streak Immunity Notice"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
              >
                <option value="general">General</option>
                <option value="academic">Academic</option>
                <option value="feature">New Feature</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="urgent">Urgent / Alert</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Content</label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write broadcast details..."
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
              rows={3}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={creating}
              className="px-5 py-2 rounded-full bg-[#0a66ff] hover:bg-[#084bc2] text-white font-bold text-xs shadow-xs transition-all"
            >
              {creating ? "Publishing..." : "Publish Announcement"}
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-3">
        {announcements.map((a) => (
          <div
            key={a._id}
            className="p-4 rounded-2xl bg-white dark:bg-[#0f1d32] border border-slate-200/90 dark:border-slate-700/80 shadow-xs space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-[#0b1a33] dark:text-white">{a.title}</h4>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-[#0a66ff]">
                {a.category}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">{a.content}</p>
            <p className="text-[10px] text-slate-400 font-mono">
              Published: {new Date(a.publishedAt || a.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
