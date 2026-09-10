"use client";

import React, { useState } from "react";

const featurePillars = [
  {
    id: "enforcement",
    number: "01",
    tabTitle: "Enforcement Engine",
    icon: "fas fa-shield-halved",
    title: "Unstoppable Alarms & Proof-of-Work Verification",
    subtitle: "Eliminate morning snoozes and superficial checkmarks with mandatory physical tasks.",
    bullets: [
      {
        title: "Barcode ISBN Matching",
        desc: "Point camera at your course textbook or library desk tag to silence continuous alarms.",
        icon: "fas fa-barcode",
      },
      {
        title: "Math & Voice Recall",
        desc: "Solve customizable calculus or terminology recall challenges to ensure full mental alertness.",
        icon: "fas fa-square-root-variable",
      },
      {
        title: "Zero Tolerance Pact Modes",
        desc: "Choose between Mild (soft reminders), Strict (lockouts), and Zero Tolerance (partner alerts).",
        icon: "fas fa-sliders",
      },
    ],
  },
  {
    id: "academic-ai",
    number: "02",
    tabTitle: "AI Syllabus & Tutor",
    icon: "fas fa-brain",
    title: "Academic Intelligence & Automatic Exam Scheduling",
    subtitle: "Transform course syllabus PDFs and lecture decks into structured study schedules and instant AI tutoring.",
    bullets: [
      {
        title: "Syllabus Auto-Extractor",
        desc: "Upload university course PDFs to auto-extract test dates, assignment deadlines, and grade weightings.",
        icon: "fas fa-file-pdf",
      },
      {
        title: "Adaptive Study Blocks",
        desc: "Auto-inserts daily 30-to-60 minute micro-study sessions into open calendar slots ahead of finals.",
        icon: "fas fa-calendar-plus",
      },
      {
        title: "Coursework AI Assistant",
        desc: "A localized AI trained exclusively on your class lecture slides for hallucination-free tutoring.",
        icon: "fas fa-robot",
      },
    ],
  },
  {
    id: "focus-lock",
    number: "03",
    tabTitle: "App Lockouts & Focus",
    icon: "fas fa-lock",
    title: "Environment Control & Level 2 App Lockouts",
    subtitle: "Automatic social media and gaming app blockers that trigger immediately when a study session starts.",
    bullets: [
      {
        title: "Level 2 Distraction Lockout",
        desc: "Blocks Instagram, TikTok, YouTube, and games until proof of session completion is scanned.",
        icon: "fas fa-mobile-screen",
      },
      {
        title: "Integrated Study Logger",
        desc: "Tracks focused study hours per subject with built-in Pomodoro cycles and break quotas.",
        icon: "fas fa-stopwatch",
      },
      {
        title: "Class Attendance Tracker",
        desc: "Tracks lecture attendance across campus and alerts if your attendance falls below exam thresholds.",
        icon: "fas fa-user-check",
      },
    ],
  },
  {
    id: "accountability-circle",
    number: "04",
    tabTitle: "Accountability Circle",
    icon: "fas fa-handshake",
    title: "Guardian Network & Live SMS Alerts",
    subtitle: "Bring peers, academic advisors, and parents into the loop for inescapable positive accountability.",
    bullets: [
      {
        title: "Designated Guardians",
        desc: "Assign study buddies or mentors who receive automated status updates on your study pacts.",
        icon: "fas fa-user-group",
      },
      {
        title: "Level 3 Emergency SMS",
        desc: "Dispatches automated SMS or WhatsApp notifications when you miss sessions on Zero Tolerance mode.",
        icon: "fas fa-comment-sms",
      },
      {
        title: "Shared Streak Leaderboard",
        desc: "Compete with university classmates and study groups on verified study hours and consistency.",
        icon: "fas fa-trophy",
      },
    ],
  },
];

export default function FeaturesDeepDive() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [desiredGrade, setDesiredGrade] = useState<number>(92);
  const [alertSent, setAlertSent] = useState(false);

  const currentPillar = featurePillars[activeTab];

  return (
    <section id="features" className="py-24 bg-[#f8faff] border-b border-slate-100 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#0a66ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0a66ff]/20">
            <i className="fas fa-microchip text-[#0a66ff]"></i>
            <span>Interactive Command Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
            Master the complete <span className="text-[#0a66ff]">MyPact toolkit</span>.
          </h2>
          <p className="text-base sm:text-lg text-[#3d4e6b] leading-relaxed">
            Explore every core pillar engineered to transform academic intentions into verifiable results.
          </p>
        </div>

        {/* Feature Pillar Horizontal Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-10 max-w-4xl mx-auto">
          {featurePillars.map((pillar, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                  isSelected
                    ? "bg-[#0a66ff] text-white shadow-lg shadow-[#0a66ff]/25 scale-102"
                    : "bg-white text-slate-600 hover:text-[#0b1a33] border border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <i className={`${pillar.icon} ${isSelected ? "text-white" : "text-[#0a66ff]"}`}></i>
                <span>{pillar.tabTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Master Feature Interactive Stage */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200/90 shadow-[0_20px_60px_rgba(10,102,255,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Stage: Deep Feature Overview & Bullet List */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0a66ff] bg-[#e8f0fe] px-3.5 py-1 rounded-full mb-4">
                <span>Pillar {currentPillar.number}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0b1a33] tracking-tight leading-snug mb-3">
                {currentPillar.title}
              </h3>
              <p className="text-sm sm:text-base text-[#3d4e6b] leading-relaxed mb-8">
                {currentPillar.subtitle}
              </p>

              {/* 3 Bullet Points */}
              <div className="space-y-4 w-full">
                {currentPillar.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#f8faff] border border-slate-200/70">
                    <div className="w-9 h-9 rounded-xl bg-[#0a66ff] text-white flex items-center justify-center text-xs flex-shrink-0 shadow-xs mt-0.5">
                      <i className={bullet.icon}></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#0b1a33]">
                        {bullet.title}
                      </h4>
                      <p className="text-xs text-[#3d4e6b] mt-0.5 leading-relaxed">
                        {bullet.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Stage: Contextual Interactive Mockup Widget */}
            <div className="lg:col-span-6">
              {activeTab === 0 && (
                /* Interactive Widget for Enforcement Engine */
                <div className="bg-[#f8faff] rounded-3xl p-6 sm:p-7 border border-[#0a66ff]/20 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                      <span className="font-extrabold text-xs text-[#0b1a33] uppercase tracking-wider">
                        Alarm Verification Live
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#0a66ff] bg-blue-50 px-2.5 py-0.5 rounded-full">
                      Zero Snooze Mode
                    </span>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div className="p-4 rounded-2xl bg-white border border-[#0a66ff]/30 shadow-xs flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0a66ff] text-white flex items-center justify-center text-sm">
                          <i className="fas fa-barcode"></i>
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[#0b1a33]">Textbook ISBN Scan</div>
                          <div className="text-[11px] text-slate-500">Scan BIO-301 Physical Cover</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                        Required
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-sm">
                          <i className="fas fa-calculator"></i>
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[#0b1a33]">Mental Alertness Equation</div>
                          <div className="text-[11px] text-slate-500">Solve 3 equations in 45 seconds</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900 text-white flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <i className="fas fa-shield-virus text-rose-400"></i>
                      <span>App Lockout armed on timeout</span>
                    </span>
                    <span className="font-mono text-amber-400 font-bold">04:59</span>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                /* Interactive Widget for AI Syllabus & Grade Goal */
                <div className="bg-[#f8faff] rounded-3xl p-6 sm:p-7 border border-[#0a66ff]/20 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-robot text-[#0a66ff]"></i>
                      <span className="font-extrabold text-xs text-[#0b1a33] uppercase tracking-wider">
                        AI Grade Calculator & Syllabus
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      CHEM_201.pdf
                    </span>
                  </div>

                  {/* Grade Goal Slider */}
                  <div className="p-4 rounded-2xl bg-white border border-[#0a66ff]/30 shadow-xs mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#0b1a33]">Target Final Grade</span>
                      <span className="text-xs font-extrabold text-[#0a66ff]">{desiredGrade}% (A)</span>
                    </div>
                    <input
                      type="range"
                      min="70"
                      max="98"
                      value={desiredGrade}
                      onChange={(e) => setDesiredGrade(Number(e.target.value))}
                      className="w-full accent-[#0a66ff] cursor-pointer mb-2"
                    />
                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100">
                      <span className="text-slate-500">Current Average: 84.0%</span>
                      <span className="font-bold text-emerald-700">
                        Need {(desiredGrade * 1.08 - 6.5).toFixed(1)}% on Final Exam
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-calendar-check text-[#0a66ff]"></i>
                      <span className="text-[#0b1a33] font-semibold">12 Exam Micro-blocks Scheduled</span>
                    </div>
                    <span className="text-[10px] font-extrabold bg-[#e8f0fe] text-[#0a66ff] px-2 py-0.5 rounded">
                      Auto-Synced
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                /* Interactive Widget for App Lockout */
                <div className="bg-[#f8faff] rounded-3xl p-6 sm:p-7 border border-[#0a66ff]/20 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-lock text-rose-500"></i>
                      <span className="font-extrabold text-xs text-[#0b1a33] uppercase tracking-wider">
                        Distraction Shield Active
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
                      Lockout Active
                    </span>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <i className="fab fa-instagram text-rose-500 text-lg"></i>
                        <span className="text-xs font-bold text-[#0b1a33]">Instagram & Reels</span>
                      </div>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">Blocked (90 min)</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <i className="fab fa-tiktok text-slate-900 text-lg"></i>
                        <span className="text-xs font-bold text-[#0b1a33]">TikTok & Shorts</span>
                      </div>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">Blocked (90 min)</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900 text-white flex items-center justify-between text-xs">
                    <span>Unlock criteria: Complete 45m Organic Chemistry</span>
                    <i className="fas fa-key text-amber-400"></i>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                /* Interactive Widget for Accountability Circle */
                <div className="bg-[#f8faff] rounded-3xl p-6 sm:p-7 border border-[#0a66ff]/20 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-user-shield text-[#0a66ff]"></i>
                      <span className="font-extrabold text-xs text-[#0b1a33] uppercase tracking-wider">
                        Guardian Dispatch Live
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      2 Partners Connected
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <i className="fas fa-comment-sms"></i> Level 3 SMS Dispatch
                      </span>
                      <span className="text-[10px]">Just now</span>
                    </div>
                    <p className="text-xs text-slate-200 font-mono bg-slate-800 p-2.5 rounded-xl leading-relaxed">
                      "🚨 Alert: Alex has entered Level 3 escalation after missing Organic Chemistry session. Lockout applied."
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAlertSent(!alertSent)}
                    className="w-full py-2.5 rounded-xl bg-[#0a66ff] hover:bg-[#084bc2] text-white text-xs font-bold transition-all shadow-xs cursor-pointer text-center"
                  >
                    {alertSent ? "✓ Test Dispatch Sent to Circle" : "Test Partner Dispatch Simulation"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
