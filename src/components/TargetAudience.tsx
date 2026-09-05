"use client";

import React, { useState } from "react";

export default function TargetAudience() {
  const [activeTab, setActiveTab] = useState<"students" | "educators">("students");

  return (
    <section id="audience" className="py-24 bg-[#f8faff] border-b border-slate-100 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0a66ff]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0a66ff]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0a66ff]/20 shadow-xs">
            <i className="fas fa-users text-[#0a66ff]"></i>
            <span>For Whom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
            Built for <span className="text-[#0a66ff]">students</span> and{" "}
            <span className="text-[#0a66ff]">educators</span> alike.
          </h2>
          <p className="text-base sm:text-lg text-[#3d4e6b] leading-relaxed">
            MyPact adapts to the needs of every stakeholder in the academic journey.
          </p>
        </div>

        {/* 2-Column Audience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: For Students */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-[0_16px_40px_rgba(10,102,255,0.06)] hover:shadow-[0_24px_60px_rgba(10,102,255,0.12)] hover:border-[#0a66ff]/30 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Header Icon & Tag */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-xs">
                  <i className="fas fa-user-graduate"></i>
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#e8f0fe] text-[#0a66ff]">
                  For Students
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#0b1a33] tracking-tight mb-3">
                Take control of your academic life.
              </h3>
              <p className="text-sm text-[#3d4e6b] leading-relaxed mb-6">
                Enforced discipline and localized AI tutoring designed to help university students eliminate procrastination and protect their GPA.
              </p>

              {/* Feature Checklist */}
              <ul className="space-y-3.5 mb-8">
                <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    <i className="fas fa-check"></i>
                  </div>
                  <span>Never miss a deadline or study session again.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    <i className="fas fa-check"></i>
                  </div>
                  <span>Get instant AI tutoring on your course materials.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    <i className="fas fa-check"></i>
                  </div>
                  <span>Track your progress with detailed analytics & streaks.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    <i className="fas fa-check"></i>
                  </div>
                  <span>Build consistent study habits that stick throughout college.</span>
                </li>
              </ul>
            </div>

            {/* Student Preview Snippet */}
            <div className="p-4 rounded-2xl bg-[#f8faff] border border-[#0a66ff]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0a66ff] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  <i className="fas fa-bolt"></i>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0b1a33]">
                    Average Student Impact
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    +0.7 GPA Boost · 2.4x Study Hours
                  </div>
                </div>
              </div>
              <a
                href="#get-started"
                className="text-xs font-bold text-[#0a66ff] hover:text-[#084bc2] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Start Free</span>
                <i className="fas fa-arrow-right text-[10px]"></i>
              </a>
            </div>
          </div>

          {/* Card 2: For Educators & Advisors */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-[0_16px_40px_rgba(10,102,255,0.06)] hover:shadow-[0_24px_60px_rgba(10,102,255,0.12)] hover:border-[#0a66ff]/30 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Header Icon & Tag */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-xs">
                  <i className="fas fa-chalkboard-user"></i>
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#e8f0fe] text-[#0a66ff]">
                  For Educators
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#0b1a33] tracking-tight mb-3">
                Empower your students with accountability.
              </h3>
              <p className="text-sm text-[#3d4e6b] leading-relaxed mb-6">
                Equip professors, mentors, and academic advisors with proactive engagement visibility to catch student burnout and failure before finals.
              </p>

              {/* Feature Checklist */}
              <ul className="space-y-3.5 mb-8">
                <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    <i className="fas fa-check"></i>
                  </div>
                  <span>Monitor class-wide engagement, study trends, and progress.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    <i className="fas fa-check"></i>
                  </div>
                  <span>Identify at-risk students early with automated audit reports.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    <i className="fas fa-check"></i>
                  </div>
                  <span>Integrate seamlessly with LMS & Canvas for course tracking.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#3d4e6b]">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    <i className="fas fa-check"></i>
                  </div>
                  <span>Encourage student independence, time management, and self-regulation.</span>
                </li>
              </ul>
            </div>

            {/* Educator Preview Snippet */}
            <div className="p-4 rounded-2xl bg-[#f8faff] border border-[#0a66ff]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0b1a33] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  <i className="fas fa-school"></i>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0b1a33]">
                    Campus & Department Tier
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Cohort Analytics & Bulk Onboarding
                  </div>
                </div>
              </div>
              <a
                href="#pricing"
                className="text-xs font-bold text-[#0a66ff] hover:text-[#084bc2] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Learn More</span>
                <i className="fas fa-arrow-right text-[10px]"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
