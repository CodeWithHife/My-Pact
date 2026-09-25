"use client";

import React, { useState, useEffect } from "react";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        if (data.courses) setCourses(data.courses);
      } catch (e) {} finally { setLoading(false); }
    }
    load();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-[#0b1a33] dark:text-white tracking-tight">Course & Topic Catalog</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage academic curricula, enrolled student course units, and study syllabus.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {courses.map((c) => (
          <div key={c._id} className="bg-white dark:bg-[#0f1d32] border border-slate-200 dark:border-slate-700 p-4 rounded-2xl space-y-2">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-[#0a66ff] font-bold text-[10px] uppercase">{c.code}</span>
            <h3 className="font-bold text-sm">{c.name}</h3>
            <p className="text-xs text-slate-400">Target Grade: {c.targetGrade}% · Units: {c.units || 3}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
