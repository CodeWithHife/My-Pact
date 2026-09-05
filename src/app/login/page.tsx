"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Rotating study session mockups for the live dashboard demonstration
const studySessions = [
  {
    course: "Organic Chemistry · Ch. 7",
    category: "Pre-Med / Sciences",
    duration: 45,
    tag: "Strict Barcode",
    color: "from-blue-600/30 to-indigo-700/30",
    borderColor: "border-blue-500/30",
    icon: "fas fa-flask",
  },
  {
    course: "Data Structures & Algorithms",
    category: "Computer Science",
    duration: 60,
    tag: "Strict Physical",
    color: "from-purple-600/30 to-blue-700/30",
    borderColor: "border-purple-500/30",
    icon: "fas fa-code",
  },
  {
    course: "Macroeconomics & Finance",
    category: "Business & Econ",
    duration: 50,
    tag: "Physical Location",
    color: "from-cyan-600/30 to-blue-700/30",
    borderColor: "border-cyan-500/30",
    icon: "fas fa-chart-pie",
  },
  {
    course: "Human Anatomy & Physiology",
    category: "Medical Sciences",
    duration: 40,
    tag: "Library Verify",
    color: "from-emerald-600/30 to-teal-700/30",
    borderColor: "border-emerald-500/30",
    icon: "fas fa-brain",
  },
];

// Live dynamic activity notifications simulating peer study sessions (pure icons, zero emojis)
const liveActivities = [
  { text: "Tunde A. verified 2.5h study pact with barcode", school: "UNILAG", icon: "fas fa-bolt", time: "just now" },
  { text: "Chioma O. achieved a 15-day study streak", school: "UNN", icon: "fas fa-fire", time: "1m ago" },
  { text: "Emmanuel K. locked in 3h Data Structures", school: "Covenant", icon: "fas fa-lock", time: "2m ago" },
  { text: "Zainab M. verified GPA goal (+0.3)", school: "ABU Zaria", icon: "fas fa-graduation-cap", time: "3m ago" },
  { text: "David O. completed Organic Chemistry session", school: "UI Ibadan", icon: "fas fa-check-circle", time: "4m ago" },
];

export default function LoginPage() {
  const [formData, setFormData] = useState({
    loginIdentifier: "",
    password: "",
    rememberMe: true,
  });

  const [touched, setTouched] = useState({
    loginIdentifier: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Live countdown timer for active pact in mockup
  const [secondsRemaining, setSecondsRemaining] = useState(2699); // 44:59
  const [activeSessionIndex, setActiveSessionIndex] = useState(0);
  const [activeActivityIndex, setActiveActivityIndex] = useState(0);
  const [activeStudentsCount, setActiveStudentsCount] = useState(1428);

  const [confettiPieces, setConfettiPieces] = useState<
    Array<{
      id: number;
      size: number;
      color: string;
      left: string;
      top: string;
      duration: string;
      delay: string;
      isCircle: boolean;
    }>
  >([]);

  // Ticking countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 10 ? prev - 1 : 2700));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cycle active mock study session every 4.5s
  useEffect(() => {
    const sessionInterval = setInterval(() => {
      setActiveSessionIndex((prev) => (prev + 1) % studySessions.length);
    }, 4500);
    return () => clearInterval(sessionInterval);
  }, []);

  // Cycle live activity stream every 3.5s
  useEffect(() => {
    const activityInterval = setInterval(() => {
      setActiveActivityIndex((prev) => (prev + 1) % liveActivities.length);
    }, 3500);
    return () => clearInterval(activityInterval);
  }, []);

  // Subtle natural fluctuation for live students online counter
  useEffect(() => {
    const countInterval = setInterval(() => {
      setActiveStudentsCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(1410, Math.min(1470, prev + delta));
      });
    }, 2800);
    return () => clearInterval(countInterval);
  }, []);

  const formatMockupTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Real-time error evaluation
  const getErrors = () => {
    const errs = {
      loginIdentifier: "",
      password: "",
    };

    if (!formData.loginIdentifier.trim()) {
      errs.loginIdentifier = "Please enter your email or username.";
    } else if (formData.loginIdentifier.trim().length < 3) {
      errs.loginIdentifier = "Must be at least 3 characters.";
    }

    if (!formData.password) {
      errs.password = "Please enter your password.";
    }

    return errs;
  };

  const currentErrors = getErrors();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const triggerConfetti = () => {
    const colors = ["#0a66ff", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
    const pieces = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        size: 4 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 30 + 10}%`,
        duration: `${1.5 + Math.random() * 1.5}s`,
        delay: `${Math.random() * 0.8}s`,
        isCircle: Math.random() > 0.5,
      });
    }
    setConfettiPieces(pieces);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setTouched({
      loginIdentifier: true,
      password: true,
    });

    const hasErrors = Object.values(currentErrors).some((msg) => msg.length > 0);
    if (hasErrors) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      triggerConfetti();
    }, 1200);
  };

  const currentSession = studySessions[activeSessionIndex];
  const currentActivity = liveActivities[activeActivityIndex];

  return (
    <div className="relative min-h-screen w-full bg-[#f8faff] text-[#0b1a33] flex items-center justify-center font-sans overflow-x-hidden">
      {/* Background Animated Floating Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-[#0a66ff] rounded-full blur-[130px] opacity-15 -top-[200px] -right-[150px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-[#7c3aed] rounded-full blur-[130px] opacity-12 -bottom-[150px] -left-[120px] animate-pulse delay-1000" />
        <div className="absolute w-[400px] h-[400px] bg-[#06b6d4] rounded-full blur-[100px] opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500" />
      </div>

      {/* Main Responsive Layout */}
      <div className="relative z-10 w-full min-h-screen lg:h-screen grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] bg-white lg:bg-white overflow-y-auto lg:overflow-hidden">

        {/* ====== LEFT: ULTRA-ANIMATED DASHBOARD MOCKUP COLUMN (Desktop only: hidden on mobile) ====== */}
        <div className="hidden lg:flex bg-gradient-to-br from-[#0b1a33] via-[#0e2448] to-[#142b4a] p-8 lg:p-10 flex-col items-center justify-center relative overflow-hidden text-white min-h-full select-none">

          {/* Subtle Dynamic Radial Glow & Shimmering Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(10,102,255,0.28),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {/* Top Header: Brand & Live Radar Indicator */}
          <div className="absolute top-7 left-8 right-8 flex items-center justify-between z-20">
            <Link href="/" className="flex items-center gap-3 font-extrabold text-2xl tracking-tight text-white group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#0a66ff] flex items-center justify-center shadow-lg shadow-[#0a66ff]/40 transition-transform group-hover:scale-105">
                <Image
                  src="/logo/mypact_icon.svg"
                  alt="MyPact Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <span>
                My<span className="text-[#5b9aff]">Pact</span>
              </span>
            </Link>

            {/* Live Students Active Indicator Pill */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[0.68rem] font-bold text-white shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="tracking-wide">
                <strong className="text-emerald-300 font-extrabold">{activeStudentsCount.toLocaleString()}</strong> studying live
              </span>
            </div>
          </div>

          {/* Dashboard Mockup Main Container */}
          <div className="w-full max-w-[530px] flex flex-col gap-3.5 relative z-10 animate-mockup-entry mt-8">

            {/* 1. Welcome Card with Animated Focus Waveform & Avatar */}
            <div className="flex justify-between items-center bg-white/8 backdrop-blur-md p-4 rounded-2xl border border-white/15 shadow-lg relative overflow-hidden group">
              {/* Subtle top shimmer highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#0a66ff]/30 text-[#5b9aff] flex items-center justify-center text-xs">
                    <i className="fas fa-user-graduate"></i>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    Welcome back, Scholar
                  </h3>
                </div>
                <p className="text-xs text-blue-200/80 mt-0.5 flex items-center gap-1.5">
                  <span>Semester streak active</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <i className="fas fa-shield-halved text-[0.6rem]"></i> Verified
                  </span>
                </p>
              </div>

              {/* Focus Equalizer Bars + Avatar */}
              <div className="flex items-center gap-3">
                {/* 5 Animated Focus Equalizer Bars */}
                <div className="flex items-end gap-1 h-5 bg-white/5 px-2 py-1 rounded-lg border border-white/10" title="Active Focus Frequency">
                  <span className="w-1 bg-[#5b9aff] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-3" />
                  <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_1.2s_ease-in-out_infinite_0.2s] h-4.5" />
                  <span className="w-1 bg-purple-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-2.5" />
                  <span className="w-1 bg-amber-400 rounded-full animate-[pulse_1.1s_ease-in-out_infinite_0.1s] h-4" />
                  <span className="w-1 bg-[#5b9aff] rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.3s] h-3.5" />
                </div>

                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0a66ff] via-[#4f46e5] to-[#7c3aed] flex items-center justify-center font-black text-sm text-white shadow-md border-2 border-white/20 animate-pulse">
                    AR
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0b1a33]" />
                </div>
              </div>
            </div>

            {/* 2. Four Interactive Stat Cards Grid */}
            <div className="grid grid-cols-4 gap-2.5">
              {/* Card 1: Completion */}
              <div className="bg-white/8 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center hover:bg-white/15 hover:-translate-y-0.5 transition-all duration-300 shadow-sm group">
                <div className="text-base sm:text-lg font-black text-white group-hover:scale-105 transition-transform">
                  <span className="text-[#5b9aff]">98</span>%
                </div>
                <div className="text-[0.55rem] uppercase font-bold text-slate-300 tracking-wider">
                  Completion
                </div>
                <div className="text-[0.6rem] text-emerald-400 font-bold flex items-center justify-center gap-0.5 mt-0.5">
                  <i className="fas fa-arrow-up text-[0.5rem] animate-bounce"></i> +12%
                </div>
              </div>

              {/* Card 2: Streak (Flaming) */}
              <div className="bg-gradient-to-b from-amber-500/15 to-white/5 backdrop-blur-md rounded-xl p-3 border border-amber-400/25 text-center hover:bg-amber-500/20 hover:-translate-y-0.5 transition-all duration-300 shadow-sm relative overflow-hidden group">
                <div className="text-base sm:text-lg font-black text-amber-300 group-hover:scale-105 transition-transform flex items-center justify-center gap-1">
                  <span>14</span>d
                </div>
                <div className="text-[0.55rem] uppercase font-bold text-amber-200/90 tracking-wider">
                  Streak
                </div>
                <div className="text-[0.6rem] text-amber-400 font-bold flex items-center justify-center gap-1 mt-0.5">
                  <i className="fas fa-fire text-amber-400 animate-pulse text-[0.55rem]"></i> Unbroken!
                </div>
              </div>

              {/* Card 3: Logged */}
              <div className="bg-white/8 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center hover:bg-white/15 hover:-translate-y-0.5 transition-all duration-300 shadow-sm group">
                <div className="text-base sm:text-lg font-black text-white group-hover:scale-105 transition-transform">
                  <span className="text-[#5b9aff]">92</span>h
                </div>
                <div className="text-[0.55rem] uppercase font-bold text-slate-300 tracking-wider">
                  Logged
                </div>
                <div className="text-[0.6rem] text-emerald-400 font-bold flex items-center justify-center gap-0.5 mt-0.5">
                  <i className="fas fa-arrow-up text-[0.5rem] animate-bounce"></i> +10h
                </div>
              </div>

              {/* Card 4: Rating */}
              <div className="bg-white/8 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center hover:bg-white/15 hover:-translate-y-0.5 transition-all duration-300 shadow-sm group">
                <div className="text-base sm:text-lg font-black text-white group-hover:scale-105 transition-transform flex items-center justify-center gap-0.5">
                  <span className="text-[#5b9aff]">4.9</span>
                  <i className="fas fa-star text-amber-300 text-[0.65rem]"></i>
                </div>
                <div className="text-[0.55rem] uppercase font-bold text-slate-300 tracking-wider">
                  Rating
                </div>
                <div className="text-[0.6rem] text-amber-300 font-bold flex items-center justify-center gap-0.5 mt-0.5">
                  <i className="fas fa-trophy text-[0.5rem]"></i> Top 3%
                </div>
              </div>
            </div>

            {/* 3. Progress Ring Gauge + Info Cards */}
            <div className="grid grid-cols-[1fr_2fr] gap-2.5">
              {/* Circular Goal Gauge with Animated Gradient Stroke */}
              <div className="bg-white/8 backdrop-blur-md rounded-xl p-3.5 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 70 70">
                    <circle
                      cx="35"
                      cy="35"
                      r="28"
                      className="text-white/10"
                      strokeWidth="5"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="35"
                      cy="35"
                      r="28"
                      className="text-[#5b9aff] transition-all duration-1000"
                      strokeWidth="5"
                      strokeDasharray={175.9}
                      strokeDashoffset={175.9 * (1 - 0.9)}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-white group-hover:scale-110 transition-transform">90%</span>
                </div>
                <span className="text-[0.55rem] uppercase tracking-wider text-slate-300 font-bold mt-1.5 flex items-center gap-1">
                  <i className="fas fa-bullseye text-[#5b9aff] text-[0.55rem]"></i> Weekly Goal
                </span>
              </div>

              {/* 2 Dynamic Info Cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/8 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col justify-center hover:bg-white/12 transition-colors">
                  <span className="text-[0.55rem] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                    <i className="fas fa-chart-line text-[#5b9aff]"></i> GPA Track
                  </span>
                  <div className="text-base sm:text-lg font-black text-white mt-0.5">
                    <span className="text-[#5b9aff]">4.82</span>/5.0
                  </div>
                  <span className="text-[0.58rem] text-emerald-400 font-semibold mt-0.5 flex items-center gap-0.5">
                    <i className="fas fa-caret-up text-[0.6rem]"></i> +0.3 this semester
                  </span>
                </div>

                <div className="bg-white/8 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col justify-center hover:bg-white/12 transition-colors">
                  <span className="text-[0.55rem] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                    <i className="fas fa-list-check text-purple-400"></i> Tasks
                  </span>
                  <div className="text-base sm:text-lg font-black text-white mt-0.5">
                    <span className="text-[#5b9aff]">4</span> due
                  </div>
                  <span className="text-[0.58rem] text-slate-300 font-semibold mt-0.5">
                    2 verified today
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Active Pact Banner with Live Countdown Timer & Auto-Cycling Subject */}
            <div className={`bg-gradient-to-r ${currentSession.color} backdrop-blur-md rounded-xl p-3.5 border ${currentSession.borderColor} flex items-center justify-between shadow-md relative overflow-hidden transition-all duration-500`}>
              {/* Animated Background Pulse Bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite]" />

              <div className="relative z-10">
                <div className="text-[0.55rem] uppercase tracking-wider font-bold text-blue-300 flex items-center gap-1.5">
                  <i className={`${currentSession.icon} text-amber-300`}></i>
                  <span>Active Pact Session</span>
                  <span className="text-white/40">•</span>
                  <span className="text-slate-300">{currentSession.category}</span>
                </div>
                <div className="font-black text-xs sm:text-sm text-white mt-0.5 flex items-center gap-2">
                  <span>{currentSession.course}</span>
                </div>
                <div className="text-[0.62rem] text-blue-200 flex items-center gap-1.5 mt-0.5">
                  <span className="font-mono font-black text-amber-300 bg-black/30 px-1.5 py-0.5 rounded border border-amber-300/30">
                    <i className="far fa-clock text-[0.55rem] mr-1"></i>
                    {formatMockupTimer(secondsRemaining)}
                  </span>
                  <span>· {currentSession.tag}</span>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-end gap-1">
                <span className="px-3 py-1 rounded-full bg-emerald-500/25 text-emerald-300 text-[0.6rem] font-extrabold uppercase tracking-wider border border-emerald-400/40 flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Enforcing</span>
                </span>
                <span className="text-[0.55rem] text-slate-300 font-mono">No override</span>
              </div>
            </div>

            {/* 5. Live Peer Activity Stream Ticker */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl px-3.5 py-2 border border-white/10 flex items-center justify-between text-[0.62rem] text-slate-300 shadow-inner">
              <div className="flex items-center gap-2 truncate">
                <div className="w-5 h-5 rounded-full bg-[#0a66ff]/30 text-[#5b9aff] flex items-center justify-center text-[0.55rem] shrink-0">
                  <i className={currentActivity.icon}></i>
                </div>
                <span className="truncate text-white font-medium">
                  {currentActivity.text}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-white/10 text-[0.55rem] font-bold text-slate-300 shrink-0">
                  {currentActivity.school}
                </span>
              </div>
              <span className="text-[0.55rem] text-slate-400 shrink-0 font-mono ml-2">
                {currentActivity.time}
              </span>
            </div>

          </div>
        </div>

        {/* ====== RIGHT: MODERN, PROFESSIONAL LOGIN FORM ====== */}
        <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-6 sm:px-6 lg:p-10 relative overflow-y-auto bg-white">

          {/* Mobile Top Navigation Bar with Back to Home */}
          <div className="w-full max-w-[340px] sm:max-w-[380px] flex items-center justify-between lg:hidden mb-4">
            <Link href="/" className="inline-flex items-center gap-2 font-extrabold text-lg text-[#0b1a33] group">
              <div className="w-7 h-7 rounded-lg bg-[#0a66ff] flex items-center justify-center text-white text-xs shadow-xs">
                <Image
                  src="/logo/mypact_icon.svg"
                  alt="MyPact"
                  width={20}
                  height={20}
                  className="w-full h-full object-contain"
                />
              </div>
              <span>
                My<span className="text-[#0a66ff]">Pact</span>
              </span>
            </Link>
            <Link
              href="/"
              className="group/back inline-flex items-center gap-1.5 text-xs font-bold text-[#0b1a33] bg-slate-50 hover:bg-[#0a66ff] hover:text-white px-3 py-1.5 rounded-full border border-slate-200/80 hover:border-[#0a66ff] shadow-xs hover:shadow-[0_4px_16px_rgba(10,102,255,0.25)] transition-all duration-300 hover:-translate-x-0.5 active:scale-95"
            >
              <span className="w-4.5 h-4.5 rounded-full bg-[#e8f0fe] group-hover/back:bg-white/20 text-[#0a66ff] group-hover/back:text-white flex items-center justify-center transition-colors">
                <i className="fas fa-arrow-left text-[0.55rem] transition-transform group-hover/back:-translate-x-0.5"></i>
              </span>
              <span className="tracking-tight text-[0.72rem]">Back to Home</span>
            </Link>
          </div>

          <div className="w-full max-w-[340px] sm:max-w-[380px] my-auto flex flex-col justify-center">

            {/* Desktop Brand & Back to Home Header */}
            <div className="hidden lg:flex items-center justify-between mb-4">
              <Link href="/" className="inline-flex items-center gap-2.5 font-extrabold text-xl text-[#0b1a33] tracking-tight group">
                <div className="w-7 h-7 rounded-lg bg-[#0a66ff] flex items-center justify-center text-white text-xs shadow-xs">
                  <Image
                    src="/logo/mypact_icon.svg"
                    alt="MyPact"
                    width={20}
                    height={20}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span>
                  My<span className="text-[#0a66ff]">Pact</span>
                </span>
              </Link>
              <Link
                href="/"
                className="group/back inline-flex items-center gap-2 text-xs font-bold text-[#0b1a33] bg-slate-50 hover:bg-[#0a66ff] hover:text-white px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-[#0a66ff] shadow-xs hover:shadow-[0_4px_16px_rgba(10,102,255,0.25)] transition-all duration-300 hover:-translate-x-0.5 active:scale-95"
              >
                <span className="w-5 h-5 rounded-full bg-[#e8f0fe] group-hover/back:bg-white/20 text-[#0a66ff] group-hover/back:text-white flex items-center justify-center transition-colors">
                  <i className="fas fa-arrow-left text-[0.6rem] transition-transform group-hover/back:-translate-x-0.5"></i>
                </span>
                <span className="tracking-tight text-[0.75rem]">Back to Home</span>
              </Link>
            </div>

            {/* Desktop Title Header */}
            <div className="hidden lg:block mb-5 text-left">
              <h1 className="text-2xl font-black text-[#0b1a33] tracking-tight">
                Welcome back
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Log in to continue your academic accountability journey.
              </p>
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-[0.65rem] font-extrabold uppercase tracking-wider mb-2">
                <i className="fas fa-lock text-[0.6rem]"></i>
                <span>Student Portal</span>
              </div>
              <h1 className="text-2xl font-black text-[#0b1a33] tracking-tight">
                Welcome back
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Log in to continue your accountability journey.
              </p>
            </div>

            {/* If Form is NOT Submitted */}
            {!isSuccess ? (
              <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                {/* Email or Username */}
                <div className="relative">
                  <label className="block text-[0.72rem] font-bold text-[#0b1a33] mb-1">
                    Email or username <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                    <input
                      type="text"
                      name="loginIdentifier"
                      value={formData.loginIdentifier}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("loginIdentifier")}
                      placeholder="name@email.com or username"
                      className={`w-full pl-8 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none bg-slate-50/50 focus:bg-white ${(touched.loginIdentifier || hasSubmitted) && currentErrors.loginIdentifier
                        ? "border-red-500 ring-2 ring-red-500/10"
                        : touched.loginIdentifier && !currentErrors.loginIdentifier && formData.loginIdentifier
                          ? "border-emerald-500 ring-2 ring-emerald-500/10"
                          : "border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15"
                        }`}
                    />
                  </div>
                  {(touched.loginIdentifier || hasSubmitted) && currentErrors.loginIdentifier && (
                    <p className="text-[0.65rem] text-red-500 mt-1 font-medium leading-tight">{currentErrors.loginIdentifier}</p>
                  )}
                </div>

                {/* Password (with Eye Show/Hide toggle) */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[0.72rem] font-bold text-[#0b1a33]">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-[0.68rem] text-[#0a66ff] font-semibold hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("password")}
                      placeholder="Password"
                      className={`w-full pl-8 pr-8 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none bg-slate-50/50 focus:bg-white ${(touched.password || hasSubmitted) && currentErrors.password
                        ? "border-red-500 ring-2 ring-red-500/10"
                        : touched.password && !currentErrors.password && formData.password
                          ? "border-emerald-500 ring-2 ring-emerald-500/10"
                          : "border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15"
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0a66ff] text-xs focus:outline-none cursor-pointer p-0.5"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <i className={showPassword ? "fas fa-eye-slash text-[0.7rem]" : "fas fa-eye text-[0.7rem]"}></i>
                    </button>
                  </div>
                  {(touched.password || hasSubmitted) && currentErrors.password && (
                    <p className="text-[0.65rem] text-red-500 mt-1 font-medium leading-tight">{currentErrors.password}</p>
                  )}
                </div>

                {/* Remember Me Option */}
                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="w-3.5 h-3.5 rounded accent-[#0a66ff] cursor-pointer"
                    />
                    <span className="text-[0.72rem] text-slate-600">Remember me</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#0a66ff] to-[#3b82f6] text-white font-bold text-sm shadow-[0_6px_24px_rgba(10,102,255,0.35)] hover:shadow-[0_10px_32px_rgba(10,102,255,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt text-xs"></i>
                      <span>Log in</span>
                    </>
                  )}
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-xs text-slate-500 pt-2">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="font-bold text-[#0a66ff] hover:underline">
                    Sign up free
                  </Link>
                </p>
              </form>
            ) : (
              /* ====== SUCCESS OVERLAY ====== */
              <div className="flex flex-col items-center justify-center text-center py-8 relative animate-fadeIn">
                {/* Confetti Container */}
                <div className="absolute inset-0 pointer-events-none overflow-visible">
                  {confettiPieces.map((piece) => (
                    <div
                      key={piece.id}
                      className="absolute animate-confettiFall pointer-events-none"
                      style={{
                        width: `${piece.size}px`,
                        height: `${piece.size}px`,
                        backgroundColor: piece.color,
                        left: piece.left,
                        top: piece.top,
                        borderRadius: piece.isCircle ? "50%" : "2px",
                        animationDuration: piece.duration,
                        animationDelay: piece.delay,
                      }}
                    />
                  ))}
                </div>

                {/* Success Badge */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] text-emerald-500 flex items-center justify-center text-3xl shadow-sm mb-4">
                  <i className="fas fa-check"></i>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#0b1a33] tracking-tight mb-2">
                  Welcome back!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mb-6 leading-relaxed">
                  You are logged in. Your academic streak and active pacts are synced and ready.
                </p>

                <Link
                  href="/"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0a66ff] to-[#084bc2] text-white font-bold text-sm shadow-[0_8px_24px_rgba(10,102,255,0.35)] hover:shadow-[0_12px_36px_rgba(10,102,255,0.45)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <span>Go to Dashboard</span>
                  <i className="fas fa-arrow-right text-xs"></i>
                </Link>
              </div>
            )}
          </div>

          {/* Micro Trust Footer */}
          <div className="w-full max-w-[340px] sm:max-w-[380px] text-center pt-5 pb-2 text-[0.68rem] text-slate-400 flex items-center justify-center gap-3">
            <span className="flex items-center gap-1">
              <i className="fas fa-shield-halved text-[#0a66ff] text-xs"></i> 256-bit Encrypted
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <i className="fas fa-bolt text-amber-500 text-xs"></i> Instant Sync
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
