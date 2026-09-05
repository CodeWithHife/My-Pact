"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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

  // Ticking countdown timer for active pact in mockup
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

  return (
    <div className="relative min-h-screen w-full bg-[#f8faff] text-[#0b1a33] flex items-center justify-center font-sans overflow-x-hidden">
      {/* Background Animated Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[550px] h-[550px] bg-[#0a66ff] rounded-full blur-[120px] opacity-15 -top-[180px] -right-[120px] animate-pulse" />
        <div className="absolute w-[450px] h-[450px] bg-[#7c3aed] rounded-full blur-[120px] opacity-10 -bottom-[120px] -left-[100px] animate-pulse delay-700" />
      </div>

      {/* Main Responsive Layout:
          - On Mobile (< lg): Centered modern card with quick header and footer trust marks. Mockup is hidden.
          - On Desktop (>= lg): Split screen with live dashboard mockup on the left and form on the right.
      */}
      <div className="relative z-10 w-full min-h-screen lg:h-screen grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] bg-white lg:bg-white overflow-y-auto lg:overflow-hidden">
        
        {/* ====== LEFT: DASHBOARD MOCKUP COLUMN (Desktop only: hidden on mobile) ====== */}
        <div className="hidden lg:flex bg-gradient-to-br from-[#0b1a33] via-[#0d2242] to-[#142b4a] p-8 lg:p-12 flex-col items-center justify-center relative overflow-hidden text-white min-h-full select-none">
          {/* Subtle Dynamic Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(10,102,255,0.25),transparent_70%)] pointer-events-none" />

          {/* Top Floating Header */}
          <div className="absolute top-8 left-8 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 font-extrabold text-2xl tracking-tight text-white group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#0a66ff] flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
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
          </div>

          <div className="absolute top-8 right-8">
            <span className="text-[0.68rem] font-bold uppercase tracking-wider text-white/90 bg-white/10 px-4 py-1.5 rounded-full border border-white/15 flex items-center gap-2 shadow-xs backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Live Dashboard</span>
            </span>
          </div>

          {/* Dashboard Mockup Container */}
          <div className="w-full max-w-[540px] flex flex-col gap-3.5 relative z-10 animate-mockup-entry">
            
            {/* Welcome Row with Avatar */}
            <div className="flex justify-between items-center bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xs">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>👋</span> Welcome back, Scholar
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">Here is your semester progress & study streak</p>
              </div>
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0a66ff] to-[#7c3aed] flex items-center justify-center font-bold text-sm text-white shadow-md border border-white/20">
                MP
              </div>
            </div>

            {/* 4 Stats Badges Grid */}
            <div className="grid grid-cols-4 gap-2.5">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center hover:bg-white/10 transition-all">
                <div className="text-base sm:text-lg font-black text-white">
                  <span className="text-[#5b9aff]">98</span>%
                </div>
                <div className="text-[0.55rem] uppercase font-bold text-slate-300 tracking-wider">
                  Completion
                </div>
                <div className="text-[0.6rem] text-emerald-400 font-bold flex items-center justify-center gap-0.5 mt-0.5">
                  <i className="fas fa-arrow-up text-[0.5rem]"></i> +12%
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center hover:bg-white/10 transition-all">
                <div className="text-base sm:text-lg font-black text-white">
                  <span className="text-[#5b9aff]">14</span>d
                </div>
                <div className="text-[0.55rem] uppercase font-bold text-slate-300 tracking-wider">
                  Streak
                </div>
                <div className="text-[0.6rem] text-amber-300 font-bold flex items-center justify-center gap-0.5 mt-0.5">
                  <i className="fas fa-fire text-[0.5rem]"></i> On fire!
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center hover:bg-white/10 transition-all">
                <div className="text-base sm:text-lg font-black text-white">
                  <span className="text-[#5b9aff]">92</span>h
                </div>
                <div className="text-[0.55rem] uppercase font-bold text-slate-300 tracking-wider">
                  Logged
                </div>
                <div className="text-[0.6rem] text-emerald-400 font-bold flex items-center justify-center gap-0.5 mt-0.5">
                  <i className="fas fa-arrow-up text-[0.5rem]"></i> +10h
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center hover:bg-white/10 transition-all">
                <div className="text-base sm:text-lg font-black text-white">
                  <span className="text-[#5b9aff]">4.9</span>★
                </div>
                <div className="text-[0.55rem] uppercase font-bold text-slate-300 tracking-wider">
                  Rating
                </div>
                <div className="text-[0.6rem] text-amber-300 font-bold flex items-center justify-center gap-0.5 mt-0.5">
                  <i className="fas fa-trophy text-[0.5rem]"></i> Top 3%
                </div>
              </div>
            </div>

            {/* Progress Ring Gauge + Info Cards */}
            <div className="grid grid-cols-[1fr_2fr] gap-2.5">
              {/* Ring Card */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10 flex flex-col items-center justify-center">
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
                      className="text-[#5b9aff]"
                      strokeWidth="5"
                      strokeDasharray={175.9}
                      strokeDashoffset={175.9 * (1 - 0.9)}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-white">90%</span>
                </div>
                <span className="text-[0.55rem] uppercase tracking-wider text-slate-300 font-bold mt-1.5">
                  Weekly Goal
                </span>
              </div>

              {/* 2 Info Cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col justify-center">
                  <span className="text-[0.55rem] uppercase font-bold text-slate-400 tracking-wider">
                    Current GPA
                  </span>
                  <div className="text-base sm:text-lg font-black text-white mt-0.5">
                    <span className="text-[#5b9aff]">4.82</span>/5.0
                  </div>
                  <span className="text-[0.58rem] text-emerald-400 font-semibold mt-0.5">
                    +0.3 this semester
                  </span>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col justify-center">
                  <span className="text-[0.55rem] uppercase font-bold text-slate-400 tracking-wider">
                    Assignments
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

            {/* Active Pact Banner */}
            <div className="bg-gradient-to-r from-[#0a66ff]/30 via-[#084bc2]/30 to-[#0b1a33]/60 backdrop-blur-md rounded-xl p-3.5 border border-[#0a66ff]/30 flex items-center justify-between shadow-md">
              <div>
                <div className="text-[0.55rem] uppercase tracking-wider font-bold text-blue-300 flex items-center gap-1">
                  <i className="fas fa-bolt text-amber-300"></i> Active Pact Session
                </div>
                <div className="font-extrabold text-xs sm:text-sm text-white">
                  Organic Chemistry · Ch.7
                </div>
                <div className="text-[0.62rem] text-blue-200 flex items-center gap-1.5 mt-0.5">
                  <span className="font-mono font-bold text-amber-300">
                    {formatMockupTimer(secondsRemaining)}
                  </span>
                  <span>· Strict Physical Barcode Verification</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[0.6rem] font-extrabold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Active</span>
              </span>
            </div>

          </div>
        </div>

        {/* ====== RIGHT: MODERN, PROFESSIONAL LOGIN FORM ====== */}
        <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-6 sm:px-6 lg:p-10 relative overflow-y-auto bg-white">
          
          {/* Mobile Top Navigation Bar */}
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
              className="text-xs font-bold text-[#0a66ff] bg-[#e8f0fe] px-3 py-1.5 rounded-full hover:bg-[#d5e4fc] transition-colors"
            >
              Back to Home
            </Link>
          </div>

          <div className="w-full max-w-[340px] sm:max-w-[380px] my-auto flex flex-col justify-center">
            {/* Desktop Brand Header */}
            <div className="hidden lg:block mb-5 text-left">
              <Link href="/" className="inline-flex items-center gap-2.5 font-extrabold text-xl text-[#0b1a33] tracking-tight mb-2.5 group">
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
                    <a
                      href="https://wa.me/2349027874036?text=Hello%20MyPact%20Support,%20I%20need%20help%20resetting%20my%20password"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.68rem] text-[#0a66ff] font-semibold hover:underline"
                    >
                      Forgot password?
                    </a>
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
                  Welcome back! 🎉
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
