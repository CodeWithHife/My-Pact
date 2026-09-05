"use client";

import React, { useState, useEffect } from "react";

const tickerItems = [
  { icon: "fas fa-arrow-trend-up", text: "97% Task Completion Rate", color: "text-emerald-300" },
  { icon: "fas fa-bolt", text: "2.4x More Study Time Logged", color: "text-amber-300" },
  { icon: "fas fa-star", text: "4.9★ Average Student Rating", color: "text-amber-300" },
  { icon: "fas fa-ban", text: "Zero Consequence Procrastination", color: "text-rose-300" },
  { icon: "fas fa-qrcode", text: "Barcode & Math Task Verification", color: "text-blue-200" },
  { icon: "fas fa-lock", text: "Automated Level 2 App Lockouts", color: "text-amber-200" },
  { icon: "fas fa-brain", text: "AI Syllabus Deadlines Auto-Extractor", color: "text-cyan-200" },
  { icon: "fas fa-shield-alt", text: "Unstoppable Physical Alarm Engine", color: "text-emerald-300" },
];

// Styled Background Education Icons with Positions
const backgroundIcons = [
  { icon: "fas fa-graduation-cap", top: "12%", left: "4%", size: "w-13 h-13", iconSize: "text-xl", animation: "animate-bounce [animation-duration:7s]" },
  { icon: "fas fa-book-open", top: "18%", right: "6%", size: "w-14 h-14", iconSize: "text-2xl", animation: "animate-pulse [animation-duration:5s]" },
  { icon: "fas fa-brain", top: "48%", left: "2%", size: "w-12 h-12", iconSize: "text-lg", animation: "animate-bounce [animation-duration:9s]" },
  { icon: "fas fa-calculator", top: "68%", right: "4%", size: "w-13 h-13", iconSize: "text-xl", animation: "animate-pulse [animation-duration:6s]" },
  { icon: "fas fa-stopwatch", bottom: "16%", left: "12%", size: "w-12 h-12", iconSize: "text-lg", animation: "animate-bounce [animation-duration:8s]" },
  { icon: "fas fa-atom", top: "42%", right: "45%", size: "w-11 h-11", iconSize: "text-base", animation: "animate-pulse [animation-duration:7s]" },
  { icon: "fas fa-pencil-alt", top: "15%", left: "42%", size: "w-11 h-11", iconSize: "text-base", animation: "animate-bounce [animation-duration:10s]" },
  { icon: "fas fa-flask", bottom: "22%", right: "40%", size: "w-12 h-12", iconSize: "text-lg", animation: "animate-pulse [animation-duration:8s]" },
  { icon: "fas fa-laptop-code", top: "78%", left: "3%", size: "w-13 h-13", iconSize: "text-xl", animation: "animate-bounce [animation-duration:6.5s]" },
  { icon: "fas fa-bullseye", top: "32%", right: "2%", size: "w-12 h-12", iconSize: "text-lg", animation: "animate-pulse [animation-duration:5.5s]" },
];

export default function Hero() {
  // Mount state for smooth page-load animations & SVG line drawing
  const [isMounted, setIsMounted] = useState(false);

  // Live Interactive Timer State for the Dashboard Mockup
  const [secondsLeft, setSecondsLeft] = useState(2745); // 45:45
  const [activeTask, setActiveTask] = useState<number>(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 2700));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSimulateVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      setTimeout(() => setVerifiedSuccess(false), 3000);
    }, 1200);
  };

  return (
    <section id="hero" className="relative pt-32 sm:pt-40 pb-0 overflow-hidden bg-white border-b border-slate-100">
      {/* Background Styled Education & Study Icons with Geometric Tile Patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Subtle Geometric Background Dot Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

        {/* Floating Styled Education Icon Badges/Cards */}
        {backgroundIcons.map((item, idx) => (
          <div
            key={`bg-icon-${idx}`}
            style={{
              top: item.top,
              bottom: item.bottom,
              left: item.left,
              right: item.right,
            }}
            className={`absolute flex items-center justify-center rounded-2xl bg-white/95 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] text-slate-300 opacity-60 ${item.size} ${item.animation} transition-transform`}
          >
            <i className={`${item.icon} ${item.iconSize}`}></i>
          </div>
        ))}
      </div>

      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Hero Content & Professional CTA */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-6 border border-[#0a66ff]/20 shadow-sm shadow-[#0a66ff]/10">
              <i className="fas fa-shield-alt text-[#0a66ff]"></i>
              <span>Uncompromising Accountability</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.9rem] font-black tracking-[-0.035em] text-[#0b1a33] leading-[1.06] mb-6">
              Stop Snoozing. <br />
              <span className="bg-gradient-to-r from-[#0a66ff] via-[#1d63ff] to-[#3b82f6] bg-clip-text text-transparent">
                Start Achieving.
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-lg sm:text-[1.12rem] text-[#3d4e6b] max-w-xl leading-relaxed mb-9 font-normal">
              MyPact is the only student platform that enforces your commitments
              with scheduled verification, active proof-of-work, and escalating
              consequences for missed tasks. No more zero-consequence procrastination.
            </p>

            {/* Highly Styled Professional Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-center justify-center lg:justify-start w-full sm:w-auto">
              {/* Primary High-Impact CTA Button */}
              <a
                href="#get-started"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-base text-white bg-gradient-to-r from-[#0a66ff] to-[#084bc2] hover:from-[#084bc2] hover:to-[#063896] shadow-[0_8px_28px_rgba(10,102,255,0.38)] hover:shadow-[0_12px_36px_rgba(10,102,255,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
              >
                <i className="fas fa-rocket text-sm transition-transform duration-200 group-hover:scale-110"></i>
                <span>Get Started Free</span>
                <i className="fas fa-arrow-right text-xs opacity-75 transition-transform duration-200 group-hover:translate-x-1"></i>
              </a>

              {/* Secondary Sleek Glass Button */}
              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-semibold text-base text-[#0b1a33] bg-slate-50/90 hover:bg-white hover:text-[#0a66ff] border border-slate-200 hover:border-[#0a66ff]/40 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <i className="fas fa-info-circle text-sm text-[#0a66ff]"></i>
                <span>Explore Features</span>
              </a>
            </div>

            {/* Highlights Below CTA */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-7 mt-8 text-xs font-semibold text-[#7a8aa3]">
              <div className="flex items-center gap-2">
                <i className="fas fa-check-circle text-[#0a66ff]"></i>
                <span>Barcode & Math Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-check-circle text-[#0a66ff]"></i>
                <span>Escalating App Lockout</span>
              </div>
            </div>
          </div>

          {/* Right Column: Ultra-Modern Live Student Dashboard Mockup */}
          <div className="lg:col-span-6 flex justify-center relative">
            {/* Top Floating Glass Badge */}
            <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl py-2 px-4 shadow-[0_8px_30px_rgba(10,102,255,0.12)] border border-[#0a66ff]/15 flex items-center gap-2.5 text-xs font-bold text-[#0b1a33] z-20 animate-badge-float">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Verified · Textbook scan</span>
            </div>

            {/* Bottom Floating Glass Badge */}
            <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md rounded-2xl py-2 px-4 shadow-[0_8px_30px_rgba(10,102,255,0.12)] border border-amber-200 flex items-center gap-2.5 text-xs font-bold text-[#0b1a33] z-20 animate-badge-float [animation-delay:1.5s]">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>3 override attempts blocked</span>
            </div>

            {/* Main Live Dashboard Card with Entrance Float Animation */}
            <div className="w-full max-w-[480px] bg-white rounded-3xl p-6 sm:p-7 shadow-[0_24px_70px_rgba(10,102,255,0.12)] border border-[#0a66ff]/15 relative z-10 transition-all duration-300 hover:shadow-[0_32px_85px_rgba(10,102,255,0.18)] animate-mockup-entry">
              {/* App Mockup Top Window Controls & User Profile Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#e6edf5]">
                {/* Left: Window Dots & Brand Icon */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
                  </div>
                  <div className="h-4 w-[1px] bg-slate-200"></div>
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#7a8aa3]">
                      Today's Pact
                    </h3>
                    <div className="text-sm font-extrabold text-[#0b1a33] leading-none mt-0.5">
                      Strict Enforcement
                    </div>
                  </div>
                </div>

                {/* Right: Live Session Countdown Clock */}
                <div className="flex items-center gap-2 bg-[#e8f0fe] px-3.5 py-1.5 rounded-full border border-[#0a66ff]/20 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#0a66ff] animate-pulse"></span>
                  <span className="font-mono text-xs font-black text-[#0a66ff]">
                    {formatTimer(secondsLeft)}
                  </span>
                </div>
              </div>

              {/* Live Academic Momentum & Focus Graph with Animated SVG Drawing Line */}
              <div className="bg-[#f8faff] rounded-2xl p-3.5 border border-[#e6edf5] my-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0b1a33]">
                    <i className="fas fa-chart-line text-[#0a66ff]"></i>
                    <span>Discipline Momentum</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 flex items-center gap-1">
                    <i className="fas fa-arrow-trend-up text-[9px]"></i> +28% Peak Focus
                  </span>
                </div>

                {/* Animated SVG Path Canvas */}
                <div className="relative w-full h-11 overflow-hidden">
                  <svg
                    viewBox="0 0 380 44"
                    className="w-full h-full overflow-visible"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="momentumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0a66ff" />
                        <stop offset="50%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                      <linearGradient id="momentumArea" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0a66ff" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#0a66ff" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Subtle Grid Guidelines */}
                    <line x1="0" y1="12" x2="380" y2="12" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
                    <line x1="0" y1="32" x2="380" y2="32" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />

                    {/* Under-Glow Fill Area */}
                    <path
                      d="M 0,36 C 45,34 75,20 120,24 C 165,28 200,12 250,16 C 300,20 335,6 380,4 L 380,44 L 0,44 Z"
                      fill="url(#momentumArea)"
                    />

                    {/* Main Animated Drawing Line */}
                    <path
                      d="M 0,36 C 45,34 75,20 120,24 C 165,28 200,12 250,16 C 300,20 335,6 380,4"
                      stroke="url(#momentumGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="animate-draw-line"
                    />

                    {/* Live Target Endpoint Ping */}
                    <circle cx="380" cy="4" r="5" fill="#10b981" className="animate-ping opacity-75" />
                    <circle cx="380" cy="4" r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>

              {/* Task Cards List */}
              <div className="space-y-3 my-3.5">
                {/* Task 1: Organic Chemistry (Active) */}
                <div
                  onClick={() => setActiveTask(1)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeTask === 1
                      ? "bg-[#f8faff] border-[#0a66ff]/40 shadow-xs ring-1 ring-[#0a66ff]/20"
                      : "bg-white border-[#e6edf5] hover:border-[#0a66ff]/20"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#e8f0fe] flex items-center justify-center text-[#0a66ff] text-base flex-shrink-0 shadow-xs">
                        <i className="fas fa-book-open"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#0b1a33]">
                          Organic Chemistry
                        </h4>
                        <p className="text-xs text-[#7a8aa3]">
                          Chapter 7 · 45 min study
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                      <i className="fas fa-play text-[8px] text-emerald-600"></i> Active
                    </span>
                  </div>

                  {/* Dynamic Animated Progress Bar */}
                  <div className="mt-3 w-full bg-[#e6edf5] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`bg-[#0a66ff] h-full rounded-full transition-all duration-1000 ease-out ${
                        isMounted ? "w-[68%]" : "w-0"
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Task 2: Calc III Problem Set (Lockout) */}
                <div
                  onClick={() => setActiveTask(2)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeTask === 2
                      ? "bg-[#f8faff] border-amber-300 shadow-xs ring-1 ring-amber-200"
                      : "bg-white border-[#e6edf5] hover:border-amber-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 text-base flex-shrink-0 shadow-xs">
                        <i className="fas fa-pencil-alt"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#0b1a33]">
                          Calc III Problem Set
                        </h4>
                        <p className="text-xs text-[#7a8aa3]">
                          Due tomorrow 11:59 PM
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                      <i className="fas fa-lock text-[8px]"></i> Lockout
                    </span>
                  </div>
                </div>

                {/* Task 3: Final Exam Prep (Alert) */}
                <div
                  onClick={() => setActiveTask(3)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeTask === 3
                      ? "bg-[#f8faff] border-rose-300 shadow-xs ring-1 ring-rose-200"
                      : "bg-white border-[#e6edf5] hover:border-rose-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 text-base flex-shrink-0 shadow-xs">
                        <i className="fas fa-bullseye"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#0b1a33]">
                          Final Exam Prep
                        </h4>
                        <p className="text-xs text-[#7a8aa3]">
                          Micro-study block · 30 min
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-900 uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                      <i className="fas fa-bell text-[8px] animate-pulse"></i> Alert
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Proof Verification Action Simulation */}
              <div className="bg-[#f8faff] rounded-2xl p-3.5 border border-[#e6edf5] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#3d4e6b]">
                  <i className="fas fa-qrcode text-[#0a66ff]"></i>
                  <span>Physical task proof</span>
                </div>
                <button
                  type="button"
                  onClick={handleSimulateVerification}
                  disabled={isVerifying}
                  className="px-4 py-1.5 rounded-lg bg-[#0a66ff] hover:bg-[#084bc2] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  {isVerifying ? (
                    <>
                      <i className="fas fa-spinner fa-spin text-[10px]"></i>
                      <span>Scanning...</span>
                    </>
                  ) : verifiedSuccess ? (
                    <>
                      <i className="fas fa-check text-[10px] text-emerald-300"></i>
                      <span>Verified!</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-camera text-[10px]"></i>
                      <span>Verify Proof</span>
                    </>
                  )}
                </button>
              </div>

              {/* Dashboard Footer Status Bar */}
              <div className="mt-4 pt-3.5 border-t border-[#e6edf5] flex items-center justify-between text-[11px] font-semibold text-[#7a8aa3]">
                <span className="flex items-center gap-1.5 text-[#0a66ff]">
                  <i className="fas fa-clock"></i> Unstoppable alarm armed
                </span>
                <span className="flex items-center gap-1.5 text-rose-600">
                  <i className="fas fa-shield-virus"></i> Level 2 lockout active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thin Animated Infinite Ticker Ribbon */}
      <div className="w-full bg-[#0a66ff] border-y border-[#084bc2] text-white py-3 overflow-hidden shadow-inner relative">
        {/* Gradient Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a66ff] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a66ff] to-transparent z-10 pointer-events-none" />

        {/* Continuous Animated Ticker Track */}
        <div className="animate-ticker flex items-center gap-8 text-sm font-semibold tracking-wide select-none">
          {tickerItems.map((item, idx) => (
            <div key={`item-1-${idx}`} className="flex items-center gap-2.5 whitespace-nowrap px-2">
              <span className={`text-xs ${item.color}`}>
                <i className={item.icon}></i>
              </span>
              <span>{item.text}</span>
              <span className="text-white/30 text-xs ml-4">✦</span>
            </div>
          ))}
          {tickerItems.map((item, idx) => (
            <div key={`item-2-${idx}`} className="flex items-center gap-2.5 whitespace-nowrap px-2">
              <span className={`text-xs ${item.color}`}>
                <i className={item.icon}></i>
              </span>
              <span>{item.text}</span>
              <span className="text-white/30 text-xs ml-4">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
