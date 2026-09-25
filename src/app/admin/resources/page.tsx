"use client";

import React, { useState, useEffect } from "react";

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("note");

  const load = async () => {
    try {
      const res = await fetch("/api/resources");
      const data = await res.json();
      if (data.resources) setResources(data.resources);
    } catch (e) {}
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: "GEN_101", title, url, type }),
    });
    setTitle("");
    setUrl("");
    load();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-[#0b1a33] dark:text-white tracking-tight">Study Resources & Vault</h1>
        <p className="text-xs text-slate-500 mt-0.5">Upload and share past questions, lecture notes, formula sheets, and study links.</p>
      </div>

      <div className="bg-white dark:bg-[#0f1d32] border border-slate-200 dark:border-slate-700 p-5 rounded-2xl">
        <h3 className="text-xs font-bold uppercase text-slate-400 mb-3">Add Resource</h3>
        <form onSubmit={handleAdd} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Calculus III Past Questions & Solutions (2020 - 2025)"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
              >
                <option value="note">Lecture Note</option>
                <option value="past_question">Past Question</option>
                <option value="formula_sheet">Formula Sheet</option>
                <option value="link">Study Link</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-1">URL / Document Link</label>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-none bg-slate-50 dark:bg-[#142642]"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2 rounded-full bg-[#0a66ff] text-white font-bold text-xs shadow-xs">
              Add Resource
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-3">
        {resources.map((r) => (
          <div key={r._id} className="p-4 rounded-2xl bg-white dark:bg-[#0f1d32] border border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-sm">{r.title}</h4>
              <span className="text-[10px] uppercase font-bold text-[#0a66ff]">{r.type}</span>
            </div>
            <a href={r.url} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#142642] text-xs font-bold">
              Open
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
