"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface CourseItem {
  _id: string;
  code: string;
  name: string;
  units?: number;
  targetGrade?: number;
  userId?: any;
  createdAt?: string;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ code: "", name: "", units: 3 });
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      if (data.courses) {
        setCourses(data.courses);
      }
    } catch (e) {
      console.warn("Failed to load courses:", e);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.code || !newCourse.name) return;
    setSubmitting(true);
    setStatusMsg("");

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: newCourse.code.toUpperCase().trim(),
          name: newCourse.name.trim(),
          units: Number(newCourse.units) || 3,
        }),
      });

      const data = await res.json();
      if (data.course || data.success) {
        setStatusMsg("Course registered successfully!");
        setNewCourse({ code: "", name: "", units: 3 });
        setShowAddModal(false);
        loadCourses();
      } else {
        setStatusMsg(data.error || "Failed to create course.");
      }
    } catch (err: any) {
      setStatusMsg("Network error creating course.");
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = courses.filter((c) =>
    (c.code + " " + c.name).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0b1a33] dark:text-white flex items-center gap-2.5">
            <i className="fas fa-book-open text-[#0a66ff] dark:text-[#38bdf8]"></i>
            Academic Course Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage university courses, registered syllabi, and student curriculum subjects.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0a66ff] hover:bg-[#084bc2] text-white text-xs font-bold shadow-md shadow-[#0a66ff]/20 flex items-center gap-2 cursor-pointer transition-all"
        >
          <i className="fas fa-plus text-[0.65rem]"></i>
          <span>Add New Course</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
        <div className="relative">
          <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
          <input
            type="text"
            placeholder="Search by course code or title (e.g. MTH 101, Computer Science)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#142642] text-xs font-medium text-[#0b1a33] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0a66ff]"
          />
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs font-bold text-slate-400">
          <i className="fas fa-spinner fa-spin text-lg mb-2 block"></i>
          Loading course catalog...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white dark:bg-[#0f1d32] rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400 text-xs">
          <i className="fas fa-book text-2xl text-slate-300 dark:text-slate-600 mb-3 block"></i>
          No courses found matching your query.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course) => (
            <div
              key={course._id || course.code}
              className="bg-white dark:bg-[#0f1d32] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:border-[#0a66ff]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-[#0a66ff]/10 text-[#0a66ff] dark:bg-[#38bdf8]/10 dark:text-[#38bdf8] text-xs font-black font-mono">
                    {course.code}
                  </span>
                  <span className="text-[0.65rem] font-bold text-slate-400">
                    {course.units || 3} Credit Units
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0b1a33] dark:text-white mb-2 line-clamp-2">
                  {course.name}
                </h3>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[0.68rem]">
                  Target Grade: <strong className="text-emerald-500 font-bold">{course.targetGrade || 90}%</strong>
                </span>
                <Link
                  href={`/admin/resources?courseCode=${encodeURIComponent(course.code)}`}
                  className="text-[#0a66ff] dark:text-[#38bdf8] font-bold text-[0.7rem] hover:underline flex items-center gap-1"
                >
                  <span>Resources</span>
                  <i className="fas fa-chevron-right text-[0.55rem]"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0f1d32] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-white flex items-center justify-center text-xs cursor-pointer"
            >
              <i className="fas fa-times"></i>
            </button>

            <h3 className="text-base font-black text-[#0b1a33] dark:text-white mb-1">
              Add New Academic Course
            </h3>
            <p className="text-xs text-slate-400 mb-4">Register a course syllabus into the catalog.</p>

            <form onSubmit={handleCreateCourse} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Course Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CSC 201, MTH 101"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#142642] text-xs font-medium text-[#0b1a33] dark:text-white uppercase focus:outline-none focus:border-[#0a66ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Introduction to Computer Programming"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#142642] text-xs font-medium text-[#0b1a33] dark:text-white focus:outline-none focus:border-[#0a66ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Credit Units
                </label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={newCourse.units}
                  onChange={(e) => setNewCourse({ ...newCourse, units: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#142642] text-xs font-medium text-[#0b1a33] dark:text-white focus:outline-none focus:border-[#0a66ff]"
                />
              </div>

              {statusMsg && (
                <div className="p-2.5 rounded-xl bg-[#0a66ff]/10 text-[#0a66ff] dark:text-[#38bdf8] text-xs font-semibold">
                  {statusMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 rounded-xl bg-[#0a66ff] hover:bg-[#084bc2] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? "Saving Course..." : "Save to Catalog"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
