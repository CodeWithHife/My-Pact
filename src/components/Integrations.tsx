"use client";

import React, { useState } from "react";

interface IntegrationItem {
  id: string;
  name: string;
  category: "calendar" | "lms" | "comms";
  categoryLabel: string;
  icon: string;
  iconColor: string;
  description: string;
  status: string;
  badge: string;
}

const integrationsList: IntegrationItem[] = [
  {
    id: "canvas",
    name: "Canvas LMS",
    category: "lms",
    categoryLabel: "University LMS",
    icon: "fas fa-book-bookmark",
    iconColor: "text-amber-600",
    description: "Direct course syllabus, assignments, and grade import. AI automatically indexes deadline weighting and sets daily prep targets.",
    status: "Auto-Pull Active",
    badge: "Most Used by Faculty",
  },
  {
    id: "gcal",
    name: "Google Calendar",
    category: "calendar",
    categoryLabel: "Calendar Sync",
    icon: "fab fa-google",
    iconColor: "text-rose-500",
    description: "Two-way study block sync. Free schedule slots automatically filled with micro-study sessions ahead of exams.",
    status: "2-Way Realtime",
    badge: "Realtime Sync",
  },
  {
    id: "apple",
    name: "Apple Calendar & iOS",
    category: "calendar",
    categoryLabel: "Calendar Sync",
    icon: "fab fa-apple",
    iconColor: "text-slate-800",
    description: "Native iOS & macOS sync. Receive unstoppable device alarms and lockouts configured across iPhone and Mac.",
    status: "Apple Native",
    badge: "iOS Shortcuts",
  },
  {
    id: "outlook",
    name: "Microsoft Outlook & M365",
    category: "calendar",
    categoryLabel: "University M365",
    icon: "fas fa-calendar-days",
    iconColor: "text-blue-600",
    description: "Connect your university email schedule. Automatically adapts around lecture slots, campus labs, and university timetables.",
    status: "Edu 365 Synced",
    badge: "Campus Domain",
  },
  {
    id: "slack",
    name: "Slack & Channels",
    category: "comms",
    categoryLabel: "Team & Peers",
    icon: "fab fa-slack",
    iconColor: "text-purple-600",
    description: "Post study streak milestones to peer channels and ping accountability guardians automatically upon Level 3 alerts.",
    status: "Webhooks Ready",
    badge: "Peer Community",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Alerts",
    category: "comms",
    categoryLabel: "Direct SMS/Comms",
    icon: "fab fa-whatsapp",
    iconColor: "text-emerald-600",
    description: "Direct WhatsApp alert bot dispatches study alerts, streak reminders, and guardian escalation notifications.",
    status: "Active Bot",
    badge: "Instant Reach",
  },
];

export default function Integrations() {
  const [activeFilter, setActiveFilter] = useState<"all" | "calendar" | "lms" | "comms">("all");
  const [selectedIntegration, setSelectedIntegration] = useState<string>("canvas");

  const filteredList = activeFilter === "all"
    ? integrationsList
    : integrationsList.filter((item) => item.category === activeFilter);

  const activeItem = integrationsList.find((i) => i.id === selectedIntegration) || integrationsList[0];

  return (
    <section id="integrations" className="py-16 sm:py-24 bg-[#ffffff] dark:bg-[#070f1e] border-b border-slate-100 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0a66ff]/3 dark:bg-[#0a66ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f0fe] dark:bg-[#0a66ff]/15 text-[#0a66ff] dark:text-[#38bdf8] text-[0.72rem] sm:text-xs font-bold uppercase tracking-wider mb-3.5 sm:mb-4 border border-[#0a66ff]/20">
            <i className="fas fa-plug text-[#0a66ff] dark:text-[#38bdf8]"></i>
            <span>Seamless Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] dark:text-white tracking-tight leading-tight mb-3 sm:mb-4">
            Connects seamlessly with your <span className="text-[#0a66ff] dark:text-[#38bdf8]">daily workflow</span>.
          </h2>
          <p className="text-sm sm:text-lg text-[#3d4e6b] dark:text-slate-300 leading-relaxed">
            No need to change your routine. MyPact sits atop your existing calendar, university LMS, and messaging apps.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {[
              { id: "all", label: "All Integrations" },
              { id: "calendar", label: "Calendars & Schedulers" },
              { id: "lms", label: "University LMS" },
              { id: "comms", label: "Social & Alerts" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-[#0a66ff] text-white shadow-sm"
                    : "bg-slate-100 dark:bg-[#0f1d32] text-slate-600 dark:text-slate-300 hover:text-[#0b1a33] dark:hover:text-white border border-transparent dark:border-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Matrix & Deep Preview Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left: Interactive App Chips */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3.5">
            {filteredList.map((item) => {
              const isSelected = selectedIntegration === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedIntegration(item.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#f8faff] dark:bg-[#0a182d] border-[#0a66ff] dark:border-[#38bdf8] shadow-md shadow-[#0a66ff]/10 ring-1 ring-[#0a66ff]/30 -translate-y-0.5"
                      : "bg-white dark:bg-[#0f1d32] border-slate-200/90 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#142642] border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center justify-center text-xl">
                      <i className={`${item.icon} ${item.iconColor}`}></i>
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#0a66ff] dark:bg-[#38bdf8]"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-[#0b1a33] dark:text-white">{item.name}</h3>
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">{item.categoryLabel}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Active Integration Spotlight Card */}
          <div className="lg:col-span-6 bg-[#f8faff] dark:bg-[#0f1d32] rounded-3xl p-7 sm:p-8 border border-[#0a66ff]/20 dark:border-slate-700 shadow-[0_16px_40px_rgba(10,102,255,0.06)]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#142642] border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center text-2xl flex-shrink-0">
                  <i className={`${activeItem.icon} ${activeItem.iconColor}`}></i>
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-[#0b1a33] dark:text-white">{activeItem.name}</h4>
                  <span className="text-[11px] font-bold text-[#0a66ff] dark:text-[#38bdf8]">{activeItem.badge}</span>
                </div>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {activeItem.status}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#3d4e6b] dark:text-slate-300 leading-relaxed mb-6">
              {activeItem.description}
            </p>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#142642] border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs mb-5">
              <span className="text-slate-600 dark:text-slate-300 font-medium">Automatic background synchronization</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Zero Latency</span>
            </div>

            <a
              href="#get-started"
              className="w-full py-3 rounded-full bg-[#0a66ff] hover:bg-[#084bc2] text-white font-bold text-xs shadow-md shadow-[#0a66ff]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enable {activeItem.name} Integration</span>
              <i className="fas fa-arrow-right text-[10px]"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
