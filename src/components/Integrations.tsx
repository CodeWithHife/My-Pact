"use client";

import React, { useState } from "react";

interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  iconColor: string;
  description: string;
  status: string;
}

const integrationsList: IntegrationItem[] = [
  {
    id: "gcal",
    name: "Google Calendar",
    category: "Calendar Sync",
    icon: "fab fa-google",
    iconColor: "text-rose-500",
    description: "Two-way study block sync. Free calendar slots automatically filled with micro-study sessions ahead of exams.",
    status: "Auto-Sync 2-Way",
  },
  {
    id: "apple",
    name: "Apple Calendar",
    category: "Calendar Sync",
    icon: "fab fa-apple",
    iconColor: "text-slate-800",
    description: "Native iOS & macOS sync. Receive unstoppable device alarms and lockouts configured across iPhone and Mac.",
    status: "iOS & Mac Native",
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    category: "University M365",
    icon: "fas fa-calendar-days",
    iconColor: "text-blue-600",
    description: "Connect your university email schedule. Automatically adapts around your lecture slots and campus labs.",
    status: "Edu 365 Connected",
  },
  {
    id: "slack",
    name: "Slack",
    category: "Team & Peers",
    icon: "fab fa-slack",
    iconColor: "text-purple-600",
    description: "Post study streak milestones to peer channels and ping accountability partners automatically upon Level 3 alerts.",
    status: "Webhooks Active",
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    category: "Advisor Check-In",
    icon: "fab fa-microsoft",
    iconColor: "text-cyan-600",
    description: "Enables advisor progress summaries and group study room scheduling with zero manual overhead.",
    status: "Cohort Synced",
  },
  {
    id: "canvas",
    name: "Canvas LMS",
    category: "Academic LMS",
    icon: "fas fa-book-bookmark",
    iconColor: "text-amber-600",
    description: "Direct course syllabus and assignment grade import. AI automatically indexes upcoming deadlines and weighting.",
    status: "LMS Auto-Pull",
  },
];

export default function Integrations() {
  const [selectedIntegration, setSelectedIntegration] = useState<number>(5); // Default to Canvas LMS

  const activeItem = integrationsList[selectedIntegration];

  return (
    <section id="integrations" className="py-24 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0a66ff]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0a66ff]/20 shadow-xs">
            <i className="fas fa-plug text-[#0a66ff]"></i>
            <span>Integrations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
            Works with your <span className="text-[#0a66ff]">favorite tools</span>.
          </h2>
          <p className="text-base sm:text-lg text-[#3d4e6b] leading-relaxed">
            MyPact seamlessly connects with the apps and university learning systems you already use, so you can stay in flow.
          </p>
        </div>

        {/* 6-Grid Interactive Integrations Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 mb-12">
          {integrationsList.map((item, idx) => {
            const isSelected = selectedIntegration === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIntegration(idx)}
                className={`p-5 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-between cursor-pointer group ${
                  isSelected
                    ? "bg-[#f8faff] border-[#0a66ff] shadow-md shadow-[#0a66ff]/10 ring-1 ring-[#0a66ff]/30 -translate-y-1"
                    : "bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs hover:-translate-y-0.5"
                }`}
              >
                <div
                  className={`w-13 h-13 rounded-2xl flex items-center justify-center text-2xl mb-3 transition-transform group-hover:scale-110 ${
                    isSelected ? "bg-white shadow-xs" : "bg-slate-50"
                  }`}
                >
                  <i className={`${item.icon} ${item.iconColor}`}></i>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0b1a33] leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    {item.category}
                  </p>
                </div>
                <div className="mt-3">
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isSelected
                        ? "bg-[#0a66ff] text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {isSelected ? "Active" : "Connect"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Active Integration Flow Preview Card */}
        <div className="max-w-3xl mx-auto bg-[#f8faff] rounded-3xl p-6 sm:p-8 border border-[#0a66ff]/20 shadow-[0_16px_40px_rgba(10,102,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-3xl flex-shrink-0">
              <i className={`${activeItem.icon} ${activeItem.iconColor}`}></i>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-extrabold text-base text-[#0b1a33]">
                  {activeItem.name} Integration
                </h4>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {activeItem.status}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#3d4e6b] leading-relaxed max-w-lg">
                {activeItem.description}
              </p>
            </div>
          </div>
          <a
            href="#get-started"
            className="whitespace-nowrap px-5 py-2.5 rounded-full bg-[#0a66ff] hover:bg-[#084bc2] text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-1.5"
          >
            <span>Enable Sync</span>
            <i className="fas fa-arrow-right text-[10px]"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
