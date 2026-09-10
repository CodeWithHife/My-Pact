"use client";

import React, { useState, useEffect, useRef } from "react";

const problems = [
  {
    id: "snooze",
    number: "01",
    title: "Snooze Addiction",
    headline: "Alarms designed to be dismissed",
    cause: "Traditional alarms allow effortless 1-tap snoozing with zero physical commitment required.",
    effect: "Average 115 minutes lost every morning. The brain conditions itself that scheduled commitments don't matter.",
    statNumber: "115 min",
    statLabel: "Average daily delay",
    dangerLevel: "High Risk",
    icon: "fas fa-bed",
  },
  {
    id: "fake",
    number: "02",
    title: "Honor-System Checkboxes",
    headline: "Checking off without doing work",
    cause: "Standard to-do lists ask for zero verification. A quick tap marks the hardest assignment 'Done'.",
    effect: "Fosters false confidence and habit decay until exam week reveals unprepared coursework.",
    statNumber: "0% Proof",
    statLabel: "Accountability factor",
    dangerLevel: "Critical",
    icon: "fas fa-clipboard-question",
  },
  {
    id: "disappear",
    number: "03",
    title: "Vanishing Deadlines",
    headline: "Missed tasks simply disappear",
    cause: "When you skip a calendar block, other apps simply archive it without penalties or social alerts.",
    effect: "Social media and distractions remain accessible with no lockouts, reinforcing procrastination loops.",
    statNumber: "3.2x",
    statLabel: "Distraction increase",
    dangerLevel: "Compounding",
    icon: "fas fa-ghost",
  },
];

export default function ProblemSection() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const activeProblem = problems[activeTab];

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="py-24 bg-[#08111e] text-white relative overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-14 pb-8 border-b border-slate-800 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-700">
              <i className="fas fa-triangle-exclamation text-rose-400"></i>
              <span>The Broken Cycle</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight leading-[1.15] text-white">
              Why traditional productivity apps{" "}
              <span className="text-[#0a66ff]">
                fail university students
              </span>
              .
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mt-4 md:mt-0 leading-relaxed">
            Standard apps rely 100% on voluntary willpower. When motivation dips, there are zero immediate friction points or consequences.
          </p>
        </div>

        {/* 3-Pillar Interactive Failure Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Problem Selector Deck */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 justify-center">
            {problems.map((item, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`w-full p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#0f1d32] border-[#0a66ff] shadow-lg ring-1 ring-[#0a66ff]/40 -translate-x-1"
                      : "bg-[#0b1626] border-slate-800 hover:bg-[#0f1d32] hover:border-slate-700 text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black transition-colors ${
                        isSelected
                          ? "bg-[#0a66ff] text-white shadow-sm"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {item.number}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {item.headline}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                        isSelected
                          ? "bg-rose-950/60 text-rose-300 border-rose-800/80"
                          : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}
                    >
                      {item.dangerLevel}
                    </span>
                    <i
                      className={`fas fa-chevron-right text-xs transition-transform ${
                        isSelected ? "text-[#0a66ff] translate-x-0.5" : "text-slate-600"
                      }`}
                    ></i>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Breakdown Stage */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-3xl bg-[#0b1626] border border-slate-800 p-7 sm:p-9 shadow-xl relative overflow-hidden flex flex-col justify-between">
              {/* Header inside stage */}
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-[#0a66ff] flex items-center justify-center text-lg">
                      <i className={activeProblem.icon}></i>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Vicious Habit Breakdown
                      </span>
                      <h4 className="text-lg font-bold text-white">
                        {activeProblem.headline}
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-white">
                      {activeProblem.statNumber}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">
                      {activeProblem.statLabel}
                    </div>
                  </div>
                </div>

                {/* Cause vs Result Flow Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  {/* The Root Cause */}
                  <div className="p-4 rounded-2xl bg-[#08111e] border border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      <i className="fas fa-circle-dot text-[10px] text-amber-400"></i>
                      <span>The Structural Flaw</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activeProblem.cause}
                    </p>
                  </div>

                  {/* The Unintended Result */}
                  <div className="p-4 rounded-2xl bg-[#08111e] border border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      <i className="fas fa-arrow-trend-down text-[10px] text-rose-400"></i>
                      <span>The Academic Consequence</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activeProblem.effect}
                    </p>
                  </div>
                </div>
              </div>

              {/* MyPact Breakthrough Solution Bar */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0f1d32] border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0a66ff] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
                    <i className="fas fa-shield-halved"></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      The MyPact Antidote
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Physical verification challenges + escalating lockouts eliminate voluntary dismissals.
                    </div>
                  </div>
                </div>
                <a
                  href="#why-mypact"
                  className="whitespace-nowrap text-xs font-bold text-white bg-[#0a66ff] hover:bg-[#084bc2] px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5"
                >
                  <span>See How It Works</span>
                  <i className="fas fa-arrow-right text-[10px]"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
