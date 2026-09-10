"use client";

import React, { useState } from "react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    phase: "Setup & Syllabus",
    title: "Upload & Auto-Schedule",
    description: "Drop your course syllabus PDF or connect Google/Apple Calendar. MyPact parses exam dates, weighting, and auto-inserts micro-study blocks.",
    icon: "fas fa-file-arrow-up",
    badge: "AI Onboarding",
    actionTip: "AI parses 40-page course PDFs in under 10 seconds.",
    preview: {
      type: "schedule",
      title: "Syllabus Parsed: BIO_301",
      subtitle: "14 study blocks created",
      stat: "100% Scheduled",
    },
  },
  {
    number: "02",
    phase: "Enforce & Ring",
    title: "Unstoppable Alarm Rings",
    description: "When a study block arrives, your device triggers an unstoppable alarm that cannot be snoozed with a simple swipe.",
    icon: "fas fa-bell",
    badge: "Physical Alarm",
    actionTip: "Continuous alarm sound with zero voluntary snooze button.",
    preview: {
      type: "alarm",
      title: "Alarm Triggered · 08:00 AM",
      subtitle: "Organic Chemistry Revision",
      stat: "Proof Required",
    },
  },
  {
    number: "03",
    phase: "Proof of Work",
    title: "Verify With Physical Action",
    description: "Scan your course textbook ISBN barcode, solve calculus problems, or speak key concepts to prove you are actively studying.",
    icon: "fas fa-qrcode",
    badge: "Verification",
    actionTip: "Guarantees you are out of bed and at your desk.",
    preview: {
      type: "verify",
      title: "Scan ISBN: 978-013407",
      subtitle: "Textbook matched successfully",
      stat: "Verified ✓",
    },
  },
  {
    number: "04",
    phase: "Discipline Growth",
    title: "Audit & Guardrails",
    description: "Miss a task? Level 2 app lockouts and guardian SMS alerts kick in. Complete tasks to build your weekly Discipline Audit report.",
    icon: "fas fa-chart-line",
    badge: "Audit & Streaks",
    actionTip: "Weekly exportable PDF discipline reports.",
    preview: {
      type: "audit",
      title: "Discipline Report: Grade A+",
      subtitle: "97.4% commitment streak",
      stat: "14-Day Streak",
    },
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const currentStep = steps[activeStep];

  return (
    <section id="how" className="py-24 bg-[#f8faff] border-b border-slate-100 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0a66ff]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0a66ff]/20">
            <i className="fas fa-route text-[#0a66ff]"></i>
            <span>The 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
            How MyPact turns intentions into <span className="text-[#0a66ff]">daily execution</span>.
          </h2>
          <p className="text-base sm:text-lg text-[#3d4e6b] leading-relaxed">
            A frictionless 4-step loop designed to make procrastinating more uncomfortable than getting to work.
          </p>
        </div>

        {/* Interactive Step Runway Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 max-w-5xl mx-auto">
          {steps.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-4 sm:p-5 rounded-2xl text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#0a66ff] text-white border-[#0a66ff] shadow-lg shadow-[#0a66ff]/25 scale-102"
                    : "bg-white text-slate-700 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-black font-mono px-2 py-0.5 rounded-md ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-[#0a66ff]"
                  }`}>
                    Step {step.number}
                  </span>
                  <i className={`${step.icon} text-sm ${isSelected ? "text-white" : "text-[#0a66ff]"}`}></i>
                </div>
                <div className="font-extrabold text-sm sm:text-base leading-snug">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Runway Active Spotlight Stage */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-7 sm:p-10 border border-slate-200/90 shadow-[0_20px_50px_rgba(10,102,255,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Step Details */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0a66ff] bg-[#e8f0fe] px-3 py-1 rounded-full mb-3">
                <span>Phase: {currentStep.phase}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0b1a33] tracking-tight mb-3">
                {currentStep.title}
              </h3>
              <p className="text-sm sm:text-base text-[#3d4e6b] leading-relaxed mb-6">
                {currentStep.description}
              </p>

              <div className="p-3.5 rounded-2xl bg-[#f8faff] border border-slate-200/80 flex items-center gap-3 w-full mb-6">
                <i className="fas fa-lightbulb text-amber-500 text-sm flex-shrink-0"></i>
                <span className="text-xs text-[#3d4e6b] font-medium">
                  {currentStep.actionTip}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href="/signup"
                  className="px-6 py-3 rounded-full bg-[#0a66ff] hover:bg-[#084bc2] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#0a66ff]/25 transition-all flex items-center gap-2"
                >
                  <span>Experience Step {currentStep.number}</span>
                  <i className="fas fa-arrow-right text-xs"></i>
                </Link>
              </div>
            </div>

            {/* Right: Interactive Step Simulated Preview */}
            <div className="lg:col-span-5 bg-[#f8faff] rounded-3xl p-6 border border-[#0a66ff]/20 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <span className="text-xs font-black text-[#0a66ff] uppercase tracking-wider">
                  Live Stage Simulator
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {currentStep.preview.stat}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0a66ff] text-white flex items-center justify-center text-xs">
                    <i className={currentStep.icon}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0b1a33]">
                      {currentStep.preview.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {currentStep.preview.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/80">
                <span>Autonomous Execution</span>
                <span className="text-[#0a66ff] font-bold">100% Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
