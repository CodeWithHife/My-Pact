"use client";

import React, { useState } from "react";

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  details: string;
}

const steps: StepItem[] = [
  {
    number: "01",
    title: "Schedule & Commit",
    description: "Set your study sessions, tasks, and deadlines. Choose your enforcement tier during onboarding.",
    icon: "fas fa-calendar-plus",
    badge: "Smart Onboarding",
    details: "AI parses your uploaded syllabus and automatically inserts micro-study blocks into open slots.",
  },
  {
    number: "02",
    title: "Verify & Prove",
    description: "Complete tasks with barcode scans, voice quizzes, or math verification to prove your work.",
    icon: "fas fa-qrcode",
    badge: "Proof-of-Work",
    details: "No more honor system checkmarks. Deactivate alarms only by scanning textbook ISBN or solving equations.",
  },
  {
    number: "03",
    title: "Enforce & Escalate",
    description: "Miss a task? Unstoppable alarms, app lockouts, and alerts to accountability partners kick in.",
    icon: "fas fa-gavel",
    badge: "Escalation Ladder",
    details: "Level 1 audio warnings escalate into Level 2 distraction app lockouts and Level 3 partner SMS dispatches.",
  },
  {
    number: "04",
    title: "Review & Optimize",
    description: "Weekly discipline audits show your streaks, completion rates, and areas for improvement.",
    icon: "fas fa-chart-line",
    badge: "Discipline Analytics",
    details: "Export comprehensive PDF/CSV audit reports for personal GPA growth or advisor review.",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="how" className="py-24 bg-[#f8faff] border-b border-slate-100 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#0a66ff]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0a66ff]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0a66ff]/20 shadow-xs">
            <i className="fas fa-route text-[#0a66ff]"></i>
            <span>Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
            How MyPact keeps you <span className="text-[#0a66ff]">accountable</span>.
          </h2>
          <p className="text-base sm:text-lg text-[#3d4e6b] leading-relaxed">
            From scheduling to verification, every step is designed to ensure you follow through without compromises.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => {
            const isSelected = activeStep === index;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(index)}
                className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? "bg-white border-[#0a66ff] shadow-[0_16px_40px_rgba(10,102,255,0.12)] ring-1 ring-[#0a66ff]/30 -translate-y-1"
                    : "bg-white/80 border-slate-200/90 hover:bg-white hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                <div>
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-13 h-13 rounded-2xl flex items-center justify-center text-xl font-black transition-all ${
                        isSelected
                          ? "bg-[#0a66ff] text-white shadow-md shadow-[#0a66ff]/30 scale-105"
                          : "bg-[#e8f0fe] text-[#0a66ff] group-hover:scale-105"
                      }`}
                    >
                      <i className={step.icon}></i>
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-[#0a66ff]/40 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#0b1a33] tracking-tight mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3d4e6b] leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span
                    className={`font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-[#e8f0fe] text-[#0a66ff]"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {step.badge}
                  </span>
                  <i
                    className={`fas fa-arrow-right text-[10px] transition-transform duration-200 ${
                      isSelected ? "text-[#0a66ff] translate-x-1" : "text-slate-300"
                    }`}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Step Deep Dive Callout Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-7 border border-[#0a66ff]/20 shadow-[0_16px_40px_rgba(10,102,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0a66ff] text-white flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-xs">
              <i className={steps[activeStep].icon}></i>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold text-[#0a66ff] uppercase tracking-wider">
                  Step {steps[activeStep].number} Spotlight
                </span>
                <span className="text-xs text-slate-400">·</span>
                <h4 className="font-extrabold text-sm text-[#0b1a33]">
                  {steps[activeStep].title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#3d4e6b] leading-relaxed">
                {steps[activeStep].details}
              </p>
            </div>
          </div>
          <a
            href="#get-started"
            className="whitespace-nowrap px-6 py-2.5 rounded-full bg-[#0a66ff] hover:bg-[#084bc2] text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Start Step {steps[activeStep].number}</span>
            <i className="fas fa-arrow-right text-[10px]"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
