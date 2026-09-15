"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function TargetAudience() {
  const [activePersona, setActivePersona] = useState<"students" | "educators">("students");

  return (
    <section id="audience" className="py-16 sm:py-24 bg-[#ffffff] dark:bg-[#070f1e] border-b border-slate-100 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#0a66ff]/4 dark:bg-[#0a66ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f0fe] dark:bg-[#0a66ff]/15 text-[#0a66ff] dark:text-[#38bdf8] text-[0.72rem] sm:text-xs font-bold uppercase tracking-wider mb-3.5 sm:mb-4 border border-[#0a66ff]/20">
            <i className="fas fa-users-viewfinder text-[#0a66ff] dark:text-[#38bdf8]"></i>
            <span>Tailored Experience</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] dark:text-white tracking-tight leading-tight mb-3 sm:mb-4">
            Engineered for <span className="text-[#0a66ff] dark:text-[#38bdf8]">students</span> and trusted by <span className="text-[#0a66ff] dark:text-[#38bdf8]">faculty</span>.
          </h2>
          <p className="text-sm sm:text-lg text-[#3d4e6b] dark:text-slate-300 leading-relaxed">
            Choose your perspective to see how MyPact delivers accountability where it matters most.
          </p>

          {/* Interactive Persona Toggle Switch */}
          <div className="flex flex-col sm:inline-flex sm:flex-row items-stretch sm:items-center p-1 sm:p-1.5 rounded-2xl sm:rounded-full bg-slate-100 dark:bg-[#0f1d32] border border-slate-200 dark:border-slate-700 mt-6 sm:mt-8 gap-1">
            <button
              type="button"
              onClick={() => setActivePersona("students")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-full font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                activePersona === "students"
                  ? "bg-[#0a66ff] text-white shadow-md shadow-[#0a66ff]/25"
                  : "text-slate-600 dark:text-slate-300 hover:text-[#0b1a33] dark:hover:text-white"
              }`}
            >
              <i className="fas fa-user-graduate"></i>
              <span>For University Students</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePersona("educators")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-full font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                activePersona === "educators"
                  ? "bg-[#0b1a33] dark:bg-[#1e293b] text-white shadow-md border border-transparent dark:border-slate-600"
                  : "text-slate-600 dark:text-slate-300 hover:text-[#0b1a33] dark:hover:text-white"
              }`}
            >
              <i className="fas fa-chalkboard-user"></i>
              <span>For Educators & Advisors</span>
            </button>
          </div>
        </div>

        {/* Dynamic Persona Display Stage */}
        {activePersona === "students" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center bg-[#f8faff] dark:bg-[#0f1d32]/90 rounded-3xl p-5 sm:p-12 border border-[#0a66ff]/20 dark:border-slate-700 shadow-[0_16px_50px_rgba(10,102,255,0.08)]">
            {/* Left Column: Student Value */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#0a66ff] text-white flex items-center justify-center text-xl mb-6 shadow-md shadow-[#0a66ff]/25">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0b1a33] dark:text-white tracking-tight mb-4">
                Take unbreakable control of your GPA.
              </h3>
              <p className="text-sm sm:text-base text-[#3d4e6b] dark:text-slate-300 leading-relaxed mb-6">
                Never again wake up at noon having snoozed through study sessions or realizing you haven't revised for a 30% midterm until 12 hours before.
              </p>

              <div className="space-y-3 w-full mb-8">
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#132238] rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <i className="fas fa-check-circle text-emerald-600 dark:text-emerald-400"></i>
                  <span className="text-xs sm:text-sm font-semibold text-[#0b1a33] dark:text-slate-200">
                    Physical proof-of-work stops half-asleep alarm dismissals.
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#132238] rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <i className="fas fa-check-circle text-emerald-600 dark:text-emerald-400"></i>
                  <span className="text-xs sm:text-sm font-semibold text-[#0b1a33] dark:text-slate-200">
                    Localized AI tutor answers questions straight from your lecture slides.
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#132238] rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <i className="fas fa-check-circle text-emerald-600 dark:text-emerald-400"></i>
                  <span className="text-xs sm:text-sm font-semibold text-[#0b1a33] dark:text-slate-200">
                    Automated Level 2 app lockouts prevent doomscrolling reels.
                  </span>
                </div>
              </div>

              <Link
                href="/signup"
                className="px-7 py-3.5 rounded-full bg-[#0a66ff] hover:bg-[#084bc2] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#0a66ff]/25 transition-all flex items-center gap-2"
              >
                <span>Start Free Student Account</span>
                <i className="fas fa-arrow-right text-xs"></i>
              </Link>
            </div>

            {/* Right Column: Student Metrics & Impact Card */}
            <div className="lg:col-span-6 bg-white dark:bg-[#132238] rounded-3xl p-7 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
                <span className="text-xs font-black text-[#0a66ff] dark:text-[#38bdf8] uppercase tracking-wider">
                  Verified Student Impact
                </span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
                  Average Across 4 Semesters
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#f8faff] dark:bg-[#0a182d] border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-3xl font-black text-[#0a66ff] dark:text-[#38bdf8]">+0.75</div>
                  <div className="text-xs font-bold text-[#0b1a33] dark:text-white mt-1">Average CGPA Boost</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">From verified study routines</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#f8faff] dark:bg-[#0a182d] border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">2.4x</div>
                  <div className="text-xs font-bold text-[#0b1a33] dark:text-white mt-1">More Weekly Study Hours</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Zero override discipline</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 dark:bg-[#070f1e] border border-slate-800 text-white flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <i className="fas fa-fire text-amber-400"></i>
                  <span>97.4% task completion rate on Strict Mode</span>
                </span>
                <span className="font-mono text-emerald-400 font-bold">100% Free Starter</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#0b1a33] dark:bg-[#0f1d32] text-white rounded-3xl p-8 sm:p-12 border border-slate-700 shadow-2xl">
            {/* Left Column: Educator Value */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#0b1a33] flex items-center justify-center text-xl mb-6 shadow-md">
                <i className="fas fa-school"></i>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
                Proactive cohort visibility before exams.
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Identify at-risk students 6 weeks before midterms. Give advisors and department heads actionable engagement data rather than discovering failure on exam day.
              </p>

              <div className="space-y-3 w-full mb-8">
                <div className="flex items-center gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <i className="fas fa-check-circle text-emerald-400"></i>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    Early dropout & burnout detection with automated discipline audits.
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <i className="fas fa-check-circle text-emerald-400"></i>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    Direct integration with Canvas LMS and university portals.
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <i className="fas fa-check-circle text-emerald-400"></i>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    Departmental cohort analytics and study group coordination.
                  </span>
                </div>
              </div>

              <a
                href="https://wa.me/2349027874036?text=Hello%20MyPact,%20I%20am%20interested%20in%20Department%20and%20Advisor%20plans"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-white text-[#0b1a33] hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Request Department Pilot</span>
                <i className="fas fa-arrow-right text-xs"></i>
              </a>
            </div>

            {/* Right Column: Faculty Dashboard Preview */}
            <div className="lg:col-span-6 bg-slate-800/90 dark:bg-[#070f1e]/90 rounded-3xl p-7 border border-slate-700 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <span className="text-xs font-black text-cyan-400 uppercase tracking-wider">
                  Cohort Analytics Radar
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                  128 Students Synced
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">Class Follow-Through Index</div>
                    <div className="text-slate-400 text-[10px]">Mechanical Engineering 400L</div>
                  </div>
                  <span className="font-mono text-emerald-400 font-black text-sm">94.2%</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">Early At-Risk Flags</div>
                    <div className="text-slate-400 text-[10px]">Students with 3+ missed study blocks</div>
                  </div>
                  <span className="font-mono text-rose-400 font-black text-sm">2 flagged</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <i className="fas fa-info-circle text-[#0a66ff] mr-2"></i>
                Bulk student onboarding available with single-sign-on (.edu domains).
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
