"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Rivera",
    username: "alex_rivera",
    email: "alex@university.edu",
    password: "password123",
    confirmPassword: "password123",
    termsAccepted: true,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const [touched, setTouched] = useState({
    firstName: true,
    lastName: true,
    username: true,
    email: true,
    password: true,
    confirmPassword: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeSubject, setActiveSubject] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(2699); // 44:59
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

  // Ticking countdown timer for the mockup
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 10 ? prev - 1 : 2700));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatMockupTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: "",
    };

    if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "Please enter your first name (min 2 chars).";
    }
    if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Please enter your last name (min 2 chars).";
    }
    if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    }
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid university or student email address.";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.termsAccepted) {
      newErrors.terms = "You must agree to the Terms of Service and Privacy Policy.";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err.length > 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const triggerConfetti = () => {
    const colors = ["#0a66ff", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
    const pieces = [];
    for (let i = 0; i < 48; i++) {
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
    setTouched({
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      triggerConfetti();
    }, 1400);
  };

  const subjects = [
    { name: "Organic Chemistry", desc: "Ch.7 · 45 min", grade: "A-", icon: "fas fa-flask" },
    { name: "Calculus III", desc: "Problem Set 5", grade: "B+", icon: "fas fa-calculator" },
    { name: "Data Structures", desc: "Project due Fri", grade: "A", icon: "fas fa-code" },
    { name: "English Literature", desc: "Essay draft", grade: "B", icon: "fas fa-book" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#f0f5fe] text-[#0b1a33] flex items-center justify-center overflow-hidden font-sans">
      {/* Background Animated Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-[#0a66ff] rounded-full blur-[110px] opacity-25 -top-[200px] -right-[150px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-[#7c3aed] rounded-full blur-[110px] opacity-15 -bottom-[150px] -left-[120px] animate-pulse delay-700" />
        <div className="absolute w-[400px] h-[400px] bg-[#06b6d4] rounded-full blur-[100px] opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin [animation-duration:30s]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full min-h-screen lg:h-screen grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] bg-white/60 backdrop-blur-xl saturate-180 overflow-y-auto lg:overflow-hidden">
        {/* ====== LEFT: MOCKUP COLUMN ====== */}
        <div className="bg-gradient-to-br from-[#0b1a33] via-[#0d2242] to-[#142b4a] p-6 sm:p-10 lg:p-12 flex flex-col items-center justify-center relative overflow-hidden text-white min-h-[460px] lg:min-h-full">
          {/* Subtle Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(10,102,255,0.22),transparent_70%)] pointer-events-none" />

          {/* Header */}
          <div className="w-full flex justify-between items-center mb-6 lg:mb-8 relative z-10">
            <Link href="/" className="flex items-center gap-3 font-extrabold text-2xl tracking-tight text-white group">
              <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-[#0a66ff] flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
                <Image
                  src="/logo/mypact_icon.svg"
                  alt="MyPact Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span>
                My<span className="text-[#5b9aff]">Pact</span>
              </span>
            </Link>
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-white/80 bg-white/10 px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2 shadow-xs backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Live Student Dashboard</span>
            </span>
          </div>

          {/* Device Frame with Subtle Floating Animation */}
          <div className="w-full max-w-[560px] bg-[#0d1f2e] rounded-2xl p-3.5 pb-0 shadow-[0_24px_60px_rgba(0,0,0,0.50)] border border-white/10 relative z-10 transition-all duration-300 hover:shadow-[0_32px_80px_rgba(10,102,255,0.25)] hover:-translate-y-1">
            <div className="bg-[#f8faff] text-[#0b1a33] rounded-t-xl overflow-hidden">
              {/* Browser Chrome Bar with .site URL */}
              <div className="bg-[#eef2f7] px-4 py-2.5 flex items-center gap-2.5 border-b border-slate-200/80">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] block" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] block" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] block" />
                </div>
                <div className="flex-1 text-center text-[0.7rem] text-slate-600 bg-white/90 py-1 px-4 rounded-full font-medium shadow-2xs flex items-center justify-center gap-1.5 mx-auto max-w-[260px] border border-slate-200/60">
                  <i className="fas fa-lock text-[#0a66ff] text-[0.65rem]"></i>
                  <span className="font-mono text-[0.68rem] tracking-tight text-slate-700">
                    app.mypact.site/dashboard
                  </span>
                </div>
                <div className="w-8 flex justify-end">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
              </div>

              {/* Mockup Dashboard Content */}
              <div className="p-4 sm:p-5 flex flex-col gap-3.5 text-left">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm sm:text-base font-bold text-[#0b1a33] flex items-center gap-1.5">
                    <span>📊</span> Dashboard Overview
                  </h4>
                  <span className="text-xs text-[#0a66ff] font-semibold flex items-center gap-1">
                    <span>1,420 studying</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </span>
                </div>

                {/* 3 Animated Stat Badges */}
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-xs hover:border-[#0a66ff]/40 transition-all">
                    <div className="text-[0.55rem] uppercase font-bold text-slate-400 tracking-wider">
                      Completion
                    </div>
                    <div className="text-base sm:text-lg font-black text-[#0b1a33]">
                      <span className="text-[#0a66ff]">97%</span>
                    </div>
                    <div className="text-[0.6rem] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                      <i className="fas fa-arrow-up text-[0.55rem]"></i> +12% GPA
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-xs hover:border-[#0a66ff]/40 transition-all">
                    <div className="text-[0.55rem] uppercase font-bold text-slate-400 tracking-wider">
                      Study Streak
                    </div>
                    <div className="text-base sm:text-lg font-black text-[#0b1a33]">
                      <span className="text-[#0a66ff]">12</span> <span className="text-xs font-semibold text-slate-500">days</span>
                    </div>
                    <div className="text-[0.6rem] text-amber-500 font-bold flex items-center gap-1 mt-0.5">
                      <i className="fas fa-fire text-[0.55rem]"></i> On fire!
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-xs hover:border-[#0a66ff]/40 transition-all">
                    <div className="text-[0.55rem] uppercase font-bold text-slate-400 tracking-wider">
                      Hours Logged
                    </div>
                    <div className="text-base sm:text-lg font-black text-[#0b1a33]">
                      <span className="text-[#0a66ff]">84</span><span className="text-xs font-semibold text-slate-500">h</span>
                    </div>
                    <div className="text-[0.6rem] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                      <i className="fas fa-arrow-up text-[0.55rem]"></i> +8h wk
                    </div>
                  </div>
                </div>

                {/* 4 Interactive Subjects Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {subjects.map((sub, idx) => (
                    <div
                      key={sub.name}
                      onClick={() => setActiveSubject(idx)}
                      className={`rounded-xl p-2 sm:p-2.5 border transition-all cursor-pointer flex items-center gap-2 ${
                        activeSubject === idx
                          ? "bg-[#eef5ff] border-[#0a66ff] shadow-xs ring-1 ring-[#0a66ff]/30"
                          : "bg-white border-slate-200/90 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 transition-colors ${
                          activeSubject === idx ? "bg-[#0a66ff] text-white" : "bg-[#e8f0fe] text-[#0a66ff]"
                        }`}
                      >
                        <i className={sub.icon}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-[0.7rem] font-bold text-[#0b1a33] truncate">{sub.name}</h5>
                        <p className="text-[0.55rem] text-slate-400 truncate">{sub.desc}</p>
                      </div>
                      <span className="font-bold text-xs text-[#0a66ff]">{sub.grade}</span>
                    </div>
                  ))}
                </div>

                {/* Animated Active Pact Banner with Live Countdown Clock */}
                <div className="bg-gradient-to-r from-[#0a66ff] via-[#084bc2] to-[#0b1a33] rounded-xl p-3.5 text-white flex items-center justify-between shadow-md relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-[0.55rem] uppercase tracking-wider font-bold text-blue-200 flex items-center gap-1">
                      <i className="fas fa-bolt text-amber-300"></i> Active Pact Session
                    </div>
                    <div className="font-extrabold text-xs sm:text-sm text-white">
                      {subjects[activeSubject].name}
                    </div>
                    <div className="text-[0.6rem] text-blue-200 flex items-center gap-1.5 mt-0.5">
                      <span className="font-mono font-bold text-amber-300">
                        {formatMockupTimer(secondsRemaining)}
                      </span>
                      <span>· Strict Physical Barcode Verification</span>
                    </div>
                  </div>

                  {/* Pulsing Status Pill */}
                  <div className="relative z-10 flex flex-col items-end gap-1">
                    <span className="px-3 py-1 rounded-full bg-white/20 text-[0.6rem] font-extrabold uppercase tracking-wider backdrop-blur-xs flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>Enforcing</span>
                    </span>
                  </div>

                  {/* Subtle Shimmer Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_3s_infinite]" />
                </div>

                {/* Footer Highlights */}
                <div className="flex flex-wrap items-center justify-between text-[0.6rem] text-slate-400 pt-2 border-t border-slate-200/80 gap-2">
                  <span className="flex items-center gap-1">
                    <i className="fas fa-fire text-amber-500"></i> 12-day streak
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fas fa-check-circle text-emerald-500"></i> 87% completion
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fas fa-shield-alt text-[#0a66ff]"></i> Zero override
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fas fa-trophy text-amber-400"></i> Top 5%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====== RIGHT: SIGN UP FORM COLUMN ====== */}
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white/50 backdrop-blur-md relative h-full overflow-y-auto">
          {/* Header */}
          <div className="mb-5 text-left">
            <div className="inline-flex items-center gap-2 font-extrabold text-lg text-[#0b1a33] tracking-tight mb-1">
              <div className="w-6 h-6 rounded-lg bg-[#0a66ff] flex items-center justify-center text-white text-xs">
                <i className="fas fa-bolt"></i>
              </div>
              <span>
                My<span className="text-[#0a66ff]">Pact</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0b1a33] tracking-tight">
              Create your account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Join thousands of Nigerian & global university students who never snooze.
            </p>
          </div>

          {/* If Form is NOT Submitted */}
          {!isSuccess ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
              {/* Row 1: First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <label className="block text-xs font-bold text-[#0b1a33] mb-1">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <i className="fas fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("firstName")}
                      placeholder="Alex"
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none bg-white/80 focus:bg-white ${
                        touched.firstName && errors.firstName
                          ? "border-red-500 ring-2 ring-red-500/10"
                          : touched.firstName && !errors.firstName
                          ? "border-emerald-500 ring-2 ring-emerald-500/10"
                          : "border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15"
                      }`}
                    />
                  </div>
                  {touched.firstName && errors.firstName && (
                    <p className="text-[0.68rem] text-red-500 mt-1 font-medium">{errors.firstName}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-xs font-bold text-[#0b1a33] mb-1">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <i className="fas fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("lastName")}
                      placeholder="Rivera"
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none bg-white/80 focus:bg-white ${
                        touched.lastName && errors.lastName
                          ? "border-red-500 ring-2 ring-red-500/10"
                          : touched.lastName && !errors.lastName
                          ? "border-emerald-500 ring-2 ring-emerald-500/10"
                          : "border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15"
                      }`}
                    />
                  </div>
                  {touched.lastName && errors.lastName && (
                    <p className="text-[0.68rem] text-red-500 mt-1 font-medium">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Username & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <label className="block text-xs font-bold text-[#0b1a33] mb-1">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <i className="fas fa-at absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("username")}
                      placeholder="alex_rivera"
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none bg-white/80 focus:bg-white ${
                        touched.username && errors.username
                          ? "border-red-500 ring-2 ring-red-500/10"
                          : touched.username && !errors.username
                          ? "border-emerald-500 ring-2 ring-emerald-500/10"
                          : "border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15"
                      }`}
                    />
                  </div>
                  {touched.username && errors.username && (
                    <p className="text-[0.68rem] text-red-500 mt-1 font-medium">{errors.username}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-xs font-bold text-[#0b1a33] mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <i className="fas fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("email")}
                      placeholder="alex@university.edu"
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none bg-white/80 focus:bg-white ${
                        touched.email && errors.email
                          ? "border-red-500 ring-2 ring-red-500/10"
                          : touched.email && !errors.email
                          ? "border-emerald-500 ring-2 ring-emerald-500/10"
                          : "border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15"
                      }`}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-[0.68rem] text-red-500 mt-1 font-medium">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <label className="block text-xs font-bold text-[#0b1a33] mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("password")}
                      placeholder="Min 8 characters"
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none bg-white/80 focus:bg-white ${
                        touched.password && errors.password
                          ? "border-red-500 ring-2 ring-red-500/10"
                          : touched.password && !errors.password
                          ? "border-emerald-500 ring-2 ring-emerald-500/10"
                          : "border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15"
                      }`}
                    />
                  </div>
                  {touched.password && errors.password && (
                    <p className="text-[0.68rem] text-red-500 mt-1 font-medium">{errors.password}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-xs font-bold text-[#0b1a33] mb-1">
                    Confirm password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <i className="fas fa-check-circle absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("confirmPassword")}
                      placeholder="Re-enter password"
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none bg-white/80 focus:bg-white ${
                        touched.confirmPassword && errors.confirmPassword
                          ? "border-red-500 ring-2 ring-red-500/10"
                          : touched.confirmPassword && !errors.confirmPassword
                          ? "border-emerald-500 ring-2 ring-emerald-500/10"
                          : "border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15"
                      }`}
                    />
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <p className="text-[0.68rem] text-red-500 mt-1 font-medium">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded mt-0.5 accent-[#0a66ff] cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 leading-snug">
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#0a66ff] font-semibold hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#0a66ff] font-semibold hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-[0.68rem] text-red-500 mt-1 font-medium">{errors.terms}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#0a66ff] to-[#3b82f6] text-white font-bold text-sm shadow-[0_6px_24px_rgba(10,102,255,0.35)] hover:shadow-[0_10px_32px_rgba(10,102,255,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                ) : (
                  <>
                    <i className="fas fa-rocket text-xs"></i>
                    <span>Create account</span>
                  </>
                )}
              </button>

              {/* Log In Link */}
              <p className="text-center text-xs text-slate-500 pt-2">
                Already have an account?{" "}
                <Link href="/" className="font-bold text-[#0a66ff] hover:underline">
                  Log in
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
                Welcome, {formData.firstName || "Scholar"}! 🎉
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mb-6 leading-relaxed">
                Your account is live. We have initialized your academic dashboard and your study accountability engine is ready.
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
      </div>
    </div>
  );
}
