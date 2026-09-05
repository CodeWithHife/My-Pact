"use client";

import React, { useState } from "react";

export default function FeaturesDeepDive() {
  // Feature 1 Interactive State
  const [selectedTier, setSelectedTier] = useState<"mild" | "strict" | "zero">("strict");
  const [activeLevel, setActiveLevel] = useState<number>(2);

  // Feature 2 Interactive State
  const [desiredGrade, setDesiredGrade] = useState<number>(93);

  // Feature 4 Interactive State
  const [alertSent, setAlertSent] = useState(false);

  return (
    <section id="features" className="py-24 bg-white border-b border-slate-100 relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0a66ff]/20 shadow-xs">
            <i className="fas fa-cogs text-[#0a66ff]"></i>
            <span>Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
            Built for students who <span className="text-[#0a66ff]">refuse to compromise</span>.
          </h2>
          <p className="text-base sm:text-lg text-[#3d4e6b] leading-relaxed">
            Every feature is engineered to bridge the gap between intention and actual academic performance.
          </p>
        </div>

        {/* Feature 1: Strict Accountability & Enforcement Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-24 pb-20 border-b border-slate-100">
          {/* Left: Text Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xl mb-6 shadow-xs">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
              Strict Accountability & Enforcement Engine
            </h3>
            <p className="text-base text-[#3d4e6b] leading-relaxed mb-6">
              MyPact ensures you stay on track with an unstoppable alarm system and escalating penalties that make skipping impossible.
            </p>

            <ul className="space-y-3.5 w-full">
              <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <i className="fas fa-bell"></i>
                </div>
                <span>
                  <strong className="text-[#0b1a33] font-semibold">Unstoppable Alarm:</strong> Rings continuously and only deactivates upon verified physical tasks (barcode scan, voice quiz, or math problems).
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <i className="fas fa-triangle-exclamation"></i>
                </div>
                <span>
                  <strong className="text-[#0b1a33] font-semibold">Escalating Penalty System:</strong> Level 1 (Warning), Level 2 (Lockout), Level 3 (Partner Alert).
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <i className="fas fa-sliders-h"></i>
                </div>
                <span>
                  <strong className="text-[#0b1a33] font-semibold">Pact Level Customization:</strong> Mild, Strict, or Zero Tolerance tiers selected during onboarding.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <i className="fas fa-mobile-screen"></i>
                </div>
                <span>
                  <strong className="text-[#0b1a33] font-semibold">App Lockouts:</strong> Automatic social media and entertainment app lockout during missed study windows.
                </span>
              </li>
            </ul>
          </div>

          {/* Right: Mockup 1 (Interactive Escalation Dashboard) */}
          <div className="lg:col-span-6">
            <div className="bg-[#f8faff] rounded-3xl p-6 sm:p-7 border border-[#0a66ff]/20 shadow-[0_20px_50px_rgba(10,102,255,0.08)] relative">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="font-extrabold text-sm text-[#0b1a33]">
                    Enforcement Engine Live Status
                  </span>
                </div>
                {/* Pact Tier Selector */}
                <div className="flex bg-slate-200/80 p-1 rounded-xl gap-1 text-[11px] font-bold">
                  {(["mild", "strict", "zero"] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setSelectedTier(tier)}
                      className={`px-2.5 py-1 rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                        selectedTier === tier
                          ? "bg-[#0a66ff] text-white shadow-xs"
                          : "text-slate-600 hover:text-[#0b1a33]"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Penalty Escalation Ladder */}
              <div className="my-5 space-y-3">
                {/* Level 1 */}
                <div
                  onClick={() => setActiveLevel(1)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeLevel === 1
                      ? "bg-white border-amber-300 shadow-sm ring-1 ring-amber-200"
                      : "bg-white/60 border-slate-200 opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">
                        L1
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#0b1a33]">
                          Warning Notification
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Immediate audio chime & 5-minute dismiss timer
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Warning
                    </span>
                  </div>
                </div>

                {/* Level 2 */}
                <div
                  onClick={() => setActiveLevel(2)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeLevel === 2
                      ? "bg-white border-[#0a66ff] shadow-sm ring-1 ring-[#0a66ff]/30"
                      : "bg-white/60 border-slate-200 opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs font-bold">
                        L2
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#0b1a33]">
                          Device App Lockout
                        </h4>
                        <p className="text-[11px] text-[#0a66ff] font-semibold">
                          Instagram, TikTok, YouTube blocked for 90 mins
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#0a66ff]">
                      Active
                    </span>
                  </div>
                </div>

                {/* Level 3 */}
                <div
                  onClick={() => setActiveLevel(3)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeLevel === 3
                      ? "bg-white border-rose-300 shadow-sm ring-1 ring-rose-200"
                      : "bg-white/60 border-slate-200 opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-bold">
                        L3
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#0b1a33]">
                          Accountability Partner Alert
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Automated SMS dispatched to mentor & advisor
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                      Escalated
                    </span>
                  </div>
                </div>
              </div>

              {/* Physical Alarm Verification Preview */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0a66ff] text-white flex items-center justify-center text-xs">
                    <i className="fas fa-barcode"></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0b1a33]">
                      Dismiss Challenge
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Scan: Organic Chemistry Textbook (ISBN: 978-013407)
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-extrabold text-[#0a66ff] bg-[#e8f0fe] px-2.5 py-1 rounded-md">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Academic Intelligence & Management (Reversed) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-24 pb-20 border-b border-slate-100">
          {/* Left: Mockup 2 (AI Syllabus & Grade Goal Calculator) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="bg-[#f8faff] rounded-3xl p-6 sm:p-7 border border-[#0a66ff]/20 shadow-[0_20px_50px_rgba(10,102,255,0.08)]">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0a66ff] text-white flex items-center justify-center text-xs">
                    <i className="fas fa-brain"></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0b1a33]">
                      AI Syllabus Intelligence
                    </h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Coursework AI Active
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <i className="fas fa-file-pdf text-[9px]"></i> CHEM_201.pdf
                </span>
              </div>

              {/* Extracted Schedule Cards */}
              <div className="my-5 space-y-3">
                <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <i className="fas fa-calendar-check text-[#0a66ff]"></i>
                    <div>
                      <div className="font-bold text-xs text-[#0b1a33]">
                        Midterm Exam (30% Weight)
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Oct 24 · 5 daily micro-blocks inserted
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-[#0a66ff] bg-[#e8f0fe] px-2 py-0.5 rounded">
                    Scheduled
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <i className="fas fa-robot text-[#0a66ff]"></i>
                    <div>
                      <div className="font-bold text-xs text-[#0b1a33]">
                        Coursework AI Tutor
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Indexed 14 lecture slide decks & lab manuals
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Ready
                  </span>
                </div>
              </div>

              {/* Grade Goal Calculator Widget */}
              <div className="p-4 rounded-2xl bg-white border border-[#0a66ff]/30 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#0b1a33]">
                    Grade Goal Calculator
                  </span>
                  <span className="text-xs font-extrabold text-[#0a66ff]">
                    Target: {desiredGrade}% (A)
                  </span>
                </div>
                <input
                  type="range"
                  min="75"
                  max="98"
                  value={desiredGrade}
                  onChange={(e) => setDesiredGrade(Number(e.target.value))}
                  className="w-full accent-[#0a66ff] cursor-pointer mb-2"
                />
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                  <span className="text-slate-500">Current Average: 88.4%</span>
                  <span className="font-bold text-emerald-700">
                    Need {(desiredGrade * 1.05 - 8).toFixed(1)}% on Final Exam
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xl mb-6 shadow-xs">
              <i className="fas fa-brain"></i>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
              Academic Intelligence & Management
            </h3>
            <p className="text-base text-[#3d4e6b] leading-relaxed mb-6">
              Leverage AI-powered tools to stay ahead of your coursework, exams, and deadlines without the manual overhead.
            </p>

            <ul className="space-y-3.5 w-full">
              <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <i className="fas fa-file-pdf"></i>
                </div>
                <span>
                  <strong className="text-[#0b1a33] font-semibold">Syllabus Auto-Extractor:</strong> Upload course PDFs to automatically extract exam dates, project deadlines, and weekly readings.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <i className="fas fa-calendar-plus"></i>
                </div>
                <span>
                  <strong className="text-[#0b1a33] font-semibold">Adaptive Study Scheduler:</strong> Dynamically inserts daily micro-study blocks into calendar openings ahead of major exams.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <i className="fas fa-robot"></i>
                </div>
                <span>
                  <strong className="text-[#0b1a33] font-semibold">Coursework AI Assistant:</strong> A localized assistant trained on your lecture slides and notes for instant tutoring.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <i className="fas fa-calculator"></i>
                </div>
                <span>
                  <strong className="text-[#0b1a33] font-semibold">Grade Goal Calculator:</strong> Tracks raw assignment marks against desired final grades to calculate minimum exam targets.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature 3: Productivity & Environment Control */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-24 pb-20 border-b border-slate-100">
          {/* Left: Text Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xl mb-6 shadow-xs">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
              Productivity & Environment Control
            </h3>
            <p className="text-base text-[#3d4e6b] leading-relaxed mb-6">
              Take control of your study environment with focus tools, attendance tracking, and comprehensive discipline audits.
            </p>

            <ul className="space-y-3.5 w-full">
              <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <i className="fas fa-stopwatch"></i>
                </div>
                <span>
                  <strong className="text-[#0b1a33] font-semibold">Focus Session Logger:</strong> Integrated study timer tracking logged hours per course.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <span>
                  <strong className="text-[#0b1a33] font-semibold">Class Timetable & Attendance Tracker:</strong> Maps weekly lectures, room locations, and maintains attendance records.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <i className="fas fa-chart-line"></i>
                </div>
                <span>
                  <strong className="text-[#0b1a33] font-semibold">Discipline Audit Report:</strong> Weekly analytics tracking completed tasks, study streak counts, and override attempts.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <i className="fas fa-database"></i>
                </div>
                <span>
                  <strong className="text-[#0b1a33] font-semibold">Historical Performance Trends:</strong> Visualize your productivity patterns over the semester.
                </span>
              </li>
            </ul>
          </div>

          {/* Right: Mockup 3 (Discipline Audit & Analytics Dashboard) */}
          <div className="lg:col-span-6">
            <div className="bg-[#f8faff] rounded-3xl p-6 sm:p-7 border border-[#0a66ff]/20 shadow-[0_20px_50px_rgba(10,102,255,0.08)]">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h4 className="font-extrabold text-sm text-[#0b1a33]">
                    Weekly Discipline Audit
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Week 8 · Performance Grade: A+
                  </p>
                </div>
                <span className="text-xs font-black text-white bg-[#0a66ff] px-3 py-1 rounded-full shadow-xs">
                  97.4% Follow-Through
                </span>
              </div>

              {/* Weekly Analytics Grid */}
              <div className="grid grid-cols-3 gap-3 my-4">
                <div className="p-3 bg-white rounded-2xl border border-slate-200 text-center">
                  <div className="text-xl font-extrabold text-[#0a66ff]">
                    42.5h
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500">
                    Logged Study
                  </div>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-slate-200 text-center">
                  <div className="text-xl font-extrabold text-emerald-600">
                    14 Days
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500">
                    Zero Override Streak
                  </div>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-slate-200 text-center">
                  <div className="text-xl font-extrabold text-slate-800">
                    100%
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500">
                    Class Attendance
                  </div>
                </div>
              </div>

              {/* Course Hours Breakdown */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-[#0b1a33] mb-1">
                  Coursework Time Distribution
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-slate-700">Organic Chemistry</span>
                    <span className="text-[#0a66ff]">18.5 hrs (44%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0a66ff] h-full rounded-full w-[44%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-slate-700">Calculus III</span>
                    <span className="text-emerald-600">14.0 hrs (33%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-[33%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-slate-700">History 102</span>
                    <span className="text-amber-600">10.0 hrs (23%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full w-[23%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4: Accountability Partners & Alerts (Reversed) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left: Mockup 4 (Partner Network & Live SMS Alerts) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="bg-[#f8faff] rounded-3xl p-6 sm:p-7 border border-[#0a66ff]/20 shadow-[0_20px_50px_rgba(10,102,255,0.08)]">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0a66ff] text-white flex items-center justify-center text-xs">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0b1a33]">
                      Accountability Circle
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      2 Active Guardians Connected
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  Synced
                </span>
              </div>

              {/* Partners Cards */}
              <div className="my-4 space-y-2.5">
                <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs font-bold">
                      MV
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0b1a33]">
                        Prof. Marcus Vance
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Academic Advisor · SMS Alerts Enabled
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">
                      SC
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0b1a33]">
                        Sarah Chen
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Peer Study Partner · Streak Observer
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
              </div>

              {/* Simulated Level 3 SMS Notification Card */}
              <div className="p-4 rounded-2xl bg-[#0b1a33] text-white space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <i className="fas fa-comment-sms text-amber-400"></i>
                    <span>Automated SMS Dispatch</span>
                  </span>
                  <span className="text-[10px]">Just now</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800 text-xs text-slate-200 font-mono leading-relaxed">
                  "🚨 MyPact Alert: Alex has entered Level 3 escalation after missing Organic Chemistry session #7. Lockout applied."
                </div>
                <button
                  type="button"
                  onClick={() => setAlertSent(!alertSent)}
                  className="w-full py-2 rounded-xl bg-[#0a66ff] hover:bg-[#084bc2] text-white text-xs font-bold transition-all shadow-xs cursor-pointer text-center"
                >
                  {alertSent ? "✓ Test Dispatch Sent to Circle" : "Test Partner Dispatch Simulation"}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xl mb-6 shadow-xs">
              <i className="fas fa-handshake"></i>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
              Accountability Partners & Alerts
            </h3>
            <p className="text-base text-[#3d4e6b] leading-relaxed mb-6">
              Never face your challenges alone. MyPact keeps your support network in the loop when you need it most.
            </p>

            <ul className="space-y-3.5 w-full">
              <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <i className="fas fa-user-friends"></i>
                </div>
                <span>
                  <strong className="text-[#0b1a33] font-semibold">Designated Guardians:</strong> Assign accountability partners (friends, family, or mentors) who receive alerts.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <i className="fas fa-comment-sms"></i>
                </div>
                <span>
                  <strong className="text-[#0b1a33] font-semibold">Automatic SMS/Email:</strong> Real-time notifications sent to partners upon Level 3 escalations.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <i className="fas fa-chart-simple"></i>
                </div>
                <span>
                  <strong className="text-[#0b1a33] font-semibold">Shared Dashboards:</strong> Dedicated progress views for partners to monitor your study streaks.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                <div className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <i className="fas fa-comments"></i>
                </div>
                <span>
                  <strong className="text-[#0b1a33] font-semibold">Peer Support:</strong> In-app messaging to coordinate study sessions and mutual encouragement.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
