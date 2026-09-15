"use client";

import React, { useState, useEffect, useRef } from "react";

export default function WhyMyPact() {
  const [activeTab, setActiveTab] = useState<"scan" | "math" | "quiz">("scan");
  const [simulatedEscalation, setSimulatedEscalation] = useState<number>(2);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-mypact"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#ffffff] dark:bg-[#070f1e] border-b border-slate-100 dark:border-slate-800/80 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background Subtle Mesh Accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#0a66ff]/4 dark:bg-[#0a66ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-indigo-500/3 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`max-w-3xl mb-10 sm:mb-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f0fe] dark:bg-blue-950/50 text-[#0a66ff] dark:text-[#38bdf8] text-[0.72rem] sm:text-xs font-bold uppercase tracking-wider mb-3.5 sm:mb-4 border border-[#0a66ff]/20 dark:border-blue-800/50">
            <i className="fas fa-cubes text-[#0a66ff] dark:text-[#38bdf8]"></i>
            <span>The Enforcement Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] dark:text-white tracking-tight leading-[1.15] mb-3 sm:mb-4">
            Designed from the ground up for{" "}
            <span className="text-[#0a66ff] dark:text-[#38bdf8]">unstoppable follow-through</span>.
          </h2>
          <p className="text-sm sm:text-lg text-[#3d4e6b] dark:text-slate-300 leading-relaxed">
            Unlike passive calendars that simply record your plans, MyPact provides active guardrails, proof-of-work engines, and academic intelligence.
          </p>
        </div>

        {/* Asymmetric 4-Cell Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Bento Cell 1: Proof-of-Work Verification Studio (Col-span 7) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#f8faff] to-white dark:from-[#0f1d32] dark:to-[#0b1626] rounded-3xl p-5 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_40px_rgba(10,102,255,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(10,102,255,0.1)] transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e8f0fe] dark:bg-blue-950/60 text-[#0a66ff] dark:text-blue-300 flex items-center justify-center text-xl font-bold shadow-xs">
                  <i className="fas fa-qrcode"></i>
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-[#0a66ff] text-white uppercase tracking-wider">
                  Proof of Work
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#0b1a33] dark:text-white tracking-tight mb-2">
                Unstoppable Physical Verification
              </h3>
              <p className="text-sm text-[#3d4e6b] dark:text-slate-300 leading-relaxed mb-6">
                Alarms will not turn off with a sleepy tap. Require real physical actions to prove you are actively studying at your desk.
              </p>

              {/* Verification Interactive Mode Switcher */}
              <div className="grid grid-cols-3 gap-2 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-2xl mb-6 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab("scan")}
                  className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === "scan"
                      ? "bg-white dark:bg-[#070f1e] text-[#0a66ff] dark:text-[#38bdf8] shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-[#0b1a33] dark:hover:text-white"
                  }`}
                >
                  <i className="fas fa-barcode text-xs"></i>
                  <span>Barcode</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("math")}
                  className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === "math"
                      ? "bg-white dark:bg-[#070f1e] text-[#0a66ff] dark:text-[#38bdf8] shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-[#0b1a33] dark:hover:text-white"
                  }`}
                >
                  <i className="fas fa-calculator text-xs"></i>
                  <span>Math</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("quiz")}
                  className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === "quiz"
                      ? "bg-white dark:bg-[#070f1e] text-[#0a66ff] dark:text-[#38bdf8] shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-[#0b1a33] dark:hover:text-white"
                  }`}
                >
                  <i className="fas fa-brain text-xs"></i>
                  <span>Voice Quiz</span>
                </button>
              </div>

              {/* Dynamic Verification Interactive Stage */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#070f1e] border border-[#0a66ff]/20 dark:border-slate-800 shadow-xs mb-4">
                {activeTab === "scan" && (
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#0a66ff] dark:text-[#38bdf8] flex items-center justify-center text-lg flex-shrink-0">
                        <i className="fas fa-book"></i>
                      </div>
                      <div>
                        <div className="font-bold text-[#0b1a33] dark:text-white">Scan Course Textbook</div>
                        <div className="text-slate-500 dark:text-slate-400 text-[11px]">Organic Chemistry (ISBN: 978-013407)</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] flex items-center gap-1 border border-emerald-500/20">
                      <i className="fas fa-check"></i> Barcode Matched
                    </span>
                  </div>
                )}
                {activeTab === "math" && (
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg flex-shrink-0">
                        <i className="fas fa-square-root-variable"></i>
                      </div>
                      <div>
                        <div className="font-bold text-[#0b1a33] dark:text-white">Calculus Challenge</div>
                        <div className="text-slate-500 dark:text-slate-400 text-[11px]">Solve: ∫ (3x² + 2x) dx from 0 to 3</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-bold text-[11px] font-mono border border-amber-500/20">
                      Ans: 36
                    </span>
                  </div>
                )}
                {activeTab === "quiz" && (
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg flex-shrink-0">
                        <i className="fas fa-microphone"></i>
                      </div>
                      <div>
                        <div className="font-bold text-[#0b1a33] dark:text-white">Lecture Concept Recall</div>
                        <div className="text-slate-500 dark:text-slate-400 text-[11px]">&quot;Explain Le Chatelier&apos;s Principle in 15 seconds&quot;</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-md bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-bold text-[11px] border border-purple-500/20">
                      Audio Verified
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <i className="fas fa-circle-check text-emerald-600 dark:text-emerald-400"></i> Zero cheat loophole
              </span>
              <span className="font-semibold text-[#0a66ff] dark:text-[#38bdf8]">Active verification</span>
            </div>
          </div>

          {/* Bento Cell 2: Escalating Penalties Ladder (Col-span 5) */}
          <div className="lg:col-span-5 bg-[#f8faff] dark:bg-[#0f1d32] rounded-3xl p-7 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_40px_rgba(10,102,255,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(10,102,255,0.1)] transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xl font-bold shadow-xs">
                  <i className="fas fa-gavel"></i>
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 uppercase tracking-wider">
                  Escalation
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#0b1a33] dark:text-white tracking-tight mb-2">
                Escalating Consequence Ladder
              </h3>
              <p className="text-sm text-[#3d4e6b] dark:text-slate-300 leading-relaxed mb-6">
                When you ignore commitments, penalties dynamically scale from soft reminders to total app lockouts and guardian dispatches.
              </p>

              {/* Interactive Escalation Tiers */}
              <div className="space-y-2.5">
                {[
                  { level: 1, name: "Warning Alarm", desc: "Audio pulse + 5m dismiss countdown", color: "amber" },
                  { level: 2, name: "Device Lockout", desc: "Blocks Instagram, TikTok, YouTube", color: "blue" },
                  { level: 3, name: "Guardian Alert", desc: "Automated SMS to study mentor/parent", color: "rose" },
                ].map((tier) => (
                  <div
                    key={tier.level}
                    onClick={() => setSimulatedEscalation(tier.level)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      simulatedEscalation === tier.level
                        ? "bg-white dark:bg-[#070f1e] border-[#0a66ff] dark:border-[#38bdf8] shadow-sm ring-1 ring-[#0a66ff]/20"
                        : "bg-white/60 dark:bg-[#070f1e]/60 border-slate-200/80 dark:border-slate-800 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-xs ${
                        tier.level === 1 ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300" : tier.level === 2 ? "bg-blue-100 dark:bg-blue-950/60 text-[#0a66ff] dark:text-blue-300" : "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300"
                      }`}>
                        L{tier.level}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#0b1a33] dark:text-white">{tier.name}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{tier.desc}</p>
                      </div>
                    </div>
                    {simulatedEscalation === tier.level && (
                      <span className="text-[10px] font-black uppercase text-[#0a66ff] dark:text-[#38bdf8]">
                        Triggered
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-6">
              <span>Automatic Enforcement</span>
              <span className="font-bold text-rose-600 dark:text-rose-400">3-Tier Guardrail</span>
            </div>
          </div>

          {/* Bento Cell 3: AI Syllabus Extractor (Col-span 6) */}
          <div className="lg:col-span-6 bg-[#f8faff] dark:bg-[#0f1d32] rounded-3xl p-7 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_40px_rgba(10,102,255,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(10,102,255,0.1)] transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xl font-bold shadow-xs">
                  <i className="fas fa-file-pdf"></i>
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 uppercase tracking-wider">
                  AI Intelligence
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#0b1a33] dark:text-white tracking-tight mb-2">
                AI Syllabus & Deadline Extractor
              </h3>
              <p className="text-sm text-[#3d4e6b] dark:text-slate-300 leading-relaxed mb-6">
                Drop your course outlines or lecture PDFs. Our localized AI extracts exam weighting, dates, and schedules prep blocks automatically.
              </p>

              {/* PDF Preview Widget */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#070f1e] border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-[#0b1a33] dark:text-white">
                    <i className="fas fa-file-lines text-rose-500"></i>
                    <span>BIO_301_Syllabus.pdf</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
                    100% Parsed
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full">
                    ✦ Midterm 1: Nov 12 (25%)
                  </span>
                  <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full">
                    ✦ Lab Report: Due Fridays
                  </span>
                  <span className="text-[10px] font-semibold bg-[#e8f0fe] dark:bg-blue-950/60 text-[#0a66ff] dark:text-blue-300 px-2.5 py-1 rounded-full font-bold">
                    ✦ 14 Micro-blocks Created
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-6">
              <span>Zero manual calendar data entry</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">Smart AI Engine</span>
            </div>
          </div>

          {/* Bento Cell 4: Weekly Discipline Audit & Streak Radar (Col-span 6) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#f8faff] to-white dark:from-[#0f1d32] dark:to-[#0b1626] rounded-3xl p-7 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_40px_rgba(10,102,255,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(10,102,255,0.1)] transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xl font-bold shadow-xs">
                  <i className="fas fa-chart-line"></i>
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 uppercase tracking-wider">
                  Audit Radar
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#0b1a33] dark:text-white tracking-tight mb-2">
                Discipline Audits & Grade Forecasting
              </h3>
              <p className="text-sm text-[#3d4e6b] dark:text-slate-300 leading-relaxed mb-6">
                Receive weekly analytics grading your follow-through rate, snooze attempts, and calculated GPA trajectory.
              </p>

              {/* Visual Stats Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#070f1e] border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-xl font-black text-[#0a66ff] dark:text-[#38bdf8]">98.2%</div>
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mt-0.5">Commitment</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#070f1e] border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">18 Days</div>
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mt-0.5">Streak</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#070f1e] border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-xl font-black text-purple-600 dark:text-purple-400">4.82</div>
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mt-0.5">Target CGPA</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-6">
              <span>Exportable PDF & Advisor reports</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Discipline Grade: A+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
