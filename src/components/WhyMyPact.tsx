"use client";

import React, { useState } from "react";

interface ComparisonFeature {
  name: string;
  myPactDetail: string;
  othersDetail: string;
  icon: string;
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    name: "Unstoppable Alarms",
    myPactDetail: "Physical proof required to dismiss (barcode scan, math, quiz)",
    othersDetail: "Easily snoozed or dismissed with 1 voluntary tap",
    icon: "fas fa-bell",
  },
  {
    name: "Task Verification",
    myPactDetail: "Active proof-of-work (camera scan, voice quiz, textbook match)",
    othersDetail: "Honor system checkbox (unchecked cheating)",
    icon: "fas fa-qrcode",
  },
  {
    name: "Escalating Penalties",
    myPactDetail: "Level 1 warning -> Level 2 app lockout -> Level 3 partner alerts",
    othersDetail: "Zero consequences; missed tasks just disappear",
    icon: "fas fa-gavel",
  },
  {
    name: "AI Syllabus Extractor",
    myPactDetail: "Upload course PDF to auto-schedule exam prep & reading blocks",
    othersDetail: "Manual manual calendar entry for every assignment",
    icon: "fas fa-brain",
  },
  {
    name: "Grade Goal Calculator",
    myPactDetail: "Calculates minimum marks needed across weighted assignments",
    othersDetail: "No academic intelligence or GPA forecasting",
    icon: "fas fa-calculator",
  },
  {
    name: "Discipline Audit",
    myPactDetail: "Weekly deep analytics tracking streaks, hours, & override attempts",
    othersDetail: "Basic checkbox counts with no accountability data",
    icon: "fas fa-chart-line",
  },
];

export default function WhyMyPact() {
  const [selectedFeature, setSelectedFeature] = useState<number>(0);

  return (
    <section id="why-mypact" className="py-24 bg-[#f8faff] border-b border-slate-100 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0a66ff]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0a66ff]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0a66ff]/20 shadow-xs">
            <i className="fas fa-balance-scale text-[#0a66ff]"></i>
            <span>Why MyPact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
            Traditional tools vs. <span className="text-[#0a66ff]">MyPact</span>
          </h2>
          <p className="text-base sm:text-lg text-[#3d4e6b] leading-relaxed">
            See how MyPact's enforcement-driven approach outperforms conventional productivity apps that rely solely on willpower.
          </p>
        </div>

        {/* 2-Column Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Value Proposition & Core Pillars */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0b1a33] tracking-tight mb-4">
              Accountability that actually works.
            </h3>
            <p className="text-base text-[#3d4e6b] leading-relaxed mb-6">
              While other apps rely on your willpower, MyPact builds a system that makes skipping your commitments nearly impossible.
            </p>

            {/* Benefit Checkpoints */}
            <div className="w-full space-y-3.5 mb-8">
              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-sm flex-shrink-0">
                  <i className="fas fa-check"></i>
                </div>
                <span className="text-sm font-semibold text-[#0b1a33]">
                  Verified task completion (barcode, voice, math)
                </span>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-sm flex-shrink-0">
                  <i className="fas fa-check"></i>
                </div>
                <span className="text-sm font-semibold text-[#0b1a33]">
                  Escalating penalties: lockouts & partner alerts
                </span>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-sm flex-shrink-0">
                  <i className="fas fa-check"></i>
                </div>
                <span className="text-sm font-semibold text-[#0b1a33]">
                  Adaptive scheduling with AI syllabus extractor
                </span>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-sm flex-shrink-0">
                  <i className="fas fa-check"></i>
                </div>
                <span className="text-sm font-semibold text-[#0b1a33]">
                  Weekly discipline audits & streak tracking
                </span>
              </div>
            </div>

            {/* Quick Feature Inspector Callout */}
            <div className="w-full p-4 rounded-2xl bg-white border border-[#0a66ff]/20 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0a66ff] mb-1">
                Active Feature Spotlight:
              </div>
              <div className="text-sm font-bold text-[#0b1a33]">
                {comparisonFeatures[selectedFeature].name}
              </div>
              <div className="text-xs text-[#3d4e6b] mt-1">
                <span className="text-emerald-700 font-semibold">MyPact:</span>{" "}
                {comparisonFeatures[selectedFeature].myPactDetail}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Comparison Table Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(10,102,255,0.08)] border border-slate-200/90 overflow-hidden">
              {/* Table Header Bar */}
              <div className="grid grid-cols-12 bg-slate-50/80 border-b border-slate-200 p-4 sm:p-5 items-center font-bold text-sm text-[#0b1a33]">
                <div className="col-span-6 sm:col-span-5 text-slate-500 uppercase text-xs tracking-wider">
                  Feature
                </div>
                <div className="col-span-3 sm:col-span-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a66ff] text-white text-xs font-extrabold shadow-xs">
                    <i className="fas fa-bolt text-[10px]"></i> MyPact
                  </span>
                </div>
                <div className="col-span-3 sm:col-span-3 text-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                  Traditional
                </div>
              </div>

              {/* Comparison Rows */}
              <div className="divide-y divide-slate-100">
                {comparisonFeatures.map((item, idx) => {
                  const isSelected = selectedFeature === idx;
                  return (
                    <div
                      key={item.name}
                      onClick={() => setSelectedFeature(idx)}
                      className={`grid grid-cols-12 p-4 sm:p-4.5 items-center transition-colors cursor-pointer ${
                        isSelected ? "bg-[#f8faff]" : "hover:bg-slate-50/70"
                      }`}
                    >
                      {/* Feature Name */}
                      <div className="col-span-6 sm:col-span-5 flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 ${
                            isSelected ? "bg-[#0a66ff] text-white" : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <i className={item.icon}></i>
                        </div>
                        <span className="font-bold text-sm text-[#0b1a33]">
                          {item.name}
                        </span>
                      </div>

                      {/* MyPact Check */}
                      <div className="col-span-3 sm:col-span-4 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shadow-xs">
                          <i className="fas fa-check"></i>
                        </div>
                      </div>

                      {/* Traditional X */}
                      <div className="col-span-3 sm:col-span-3 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs">
                          <i className="fas fa-xmark"></i>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Table Footer */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-[#7a8aa3] font-medium">
                <span>Click any row to inspect feature details</span>
                <span className="text-[#0a66ff] font-bold">100% Enforced Accountability</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
