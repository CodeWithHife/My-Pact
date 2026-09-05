"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [touched, setTouched] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [cooldown, setCooldown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer for resend link
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSent && cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    } else if (cooldown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [isSent, cooldown]);

  const getError = () => {
    if (!identifier.trim()) {
      return "Please enter your email or username.";
    }
    if (identifier.trim().length < 3) {
      return "Must be at least 3 characters.";
    }
    return "";
  };

  const error = getError();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setTouched(true);

    if (error) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      setCooldown(60);
      setCanResend(false);
    }, 1200);
  };

  const handleResend = () => {
    if (!canResend) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCooldown(60);
      setCanResend(false);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f8faff] text-[#0b1a33] flex items-center justify-center font-sans overflow-x-hidden">
      {/* Background Animated Floating Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-[#0a66ff] rounded-full blur-[130px] opacity-15 -top-[200px] -right-[150px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-[#7c3aed] rounded-full blur-[130px] opacity-12 -bottom-[150px] -left-[120px] animate-pulse delay-1000" />
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="relative z-10 w-full min-h-screen lg:h-screen grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] bg-white overflow-y-auto lg:overflow-hidden">
        
        {/* ====== LEFT: ANIMATED RECOVERY & SECURITY MOCKUP (Desktop only) ====== */}
        <div className="hidden lg:flex bg-gradient-to-br from-[#0b1a33] via-[#0e2448] to-[#142b4a] p-8 lg:p-10 flex-col items-center justify-center relative overflow-hidden text-white min-h-full select-none">
          {/* Glowing Radial Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(10,102,255,0.28),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {/* Top Brand Header */}
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

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[0.68rem] font-bold text-white shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Identity Protection Active</span>
            </div>
          </div>

          {/* Center Graphic: Account Protection Card */}
          <div className="w-full max-w-[480px] flex flex-col gap-4 relative z-10 animate-mockup-entry">
            
            {/* Main Recovery Shield Card */}
            <div className="bg-white/8 backdrop-blur-md p-6 rounded-2xl border border-white/15 shadow-xl relative overflow-hidden text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0a66ff] to-[#7c3aed] text-white flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-[#0a66ff]/30">
                <i className="fas fa-key-skeleton animate-pulse"></i>
              </div>

              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Self-Service Security Recovery
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 max-w-sm mx-auto leading-relaxed">
                We protect your academic commitments, study streak data, and account security with encrypted authorization links.
              </p>

              {/* 3 Protection Badges */}
              <div className="grid grid-cols-3 gap-2.5 mt-5 pt-5 border-t border-white/10">
                <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                  <i className="fas fa-shield-halved text-[#5b9aff] text-sm mb-1 block"></i>
                  <span className="text-[0.65rem] font-bold text-slate-200 block">End-to-End</span>
                  <span className="text-[0.55rem] text-slate-400">256-bit Encrypted</span>
                </div>

                <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                  <i className="fas fa-bolt text-amber-400 text-sm mb-1 block"></i>
                  <span className="text-[0.65rem] font-bold text-slate-200 block">Instant Link</span>
                  <span className="text-[0.55rem] text-slate-400">Delivered in &lt; 5s</span>
                </div>

                <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                  <i className="fas fa-user-check text-emerald-400 text-sm mb-1 block"></i>
                  <span className="text-[0.65rem] font-bold text-slate-200 block">Streak Safe</span>
                  <span className="text-[0.55rem] text-slate-400">No progress lost</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Emergency Support Box */}
            <div className="bg-gradient-to-r from-emerald-950/40 via-emerald-900/30 to-[#0b1a33]/60 backdrop-blur-md rounded-xl p-3.5 border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div>
                  <div className="text-[0.72rem] font-bold text-white">Need immediate human help?</div>
                  <div className="text-[0.6rem] text-emerald-300">Live Student Desk · 09027874036</div>
                </div>
              </div>
              <a
                href="https://wa.me/2349027874036?text=Hello%20MyPact%20Support,%20I%20need%20urgent%20help%20recovering%20my%20account"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[0.65rem] font-bold hover:bg-emerald-600 transition-colors shadow-xs"
              >
                Chat Now
              </a>
            </div>

          </div>
        </div>

        {/* ====== RIGHT: FORGOT PASSWORD FORM ====== */}
        <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-6 sm:px-6 lg:py-8 relative overflow-y-auto bg-white">
          
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

            {/* If Link NOT Sent Yet */}
            {!isSent ? (
              <>
                <div className="mb-4 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-[0.65rem] font-extrabold uppercase tracking-wider mb-2">
                    <i className="fas fa-lock-open text-[0.6rem]"></i>
                    <span>Account Recovery</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#0b1a33] tracking-tight">
                    Forgot password?
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    No problem! Enter your email or username and we will send you a secure recovery link.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                  <div className="relative">
                    <label className="block text-[0.72rem] font-bold text-[#0b1a33] mb-1">
                      Email or username <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                      <input
                        type="text"
                        name="identifier"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        onBlur={() => setTouched(true)}
                        placeholder="name@email.com or username"
                        className={`w-full pl-8 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none bg-slate-50/50 focus:bg-white ${(touched || hasSubmitted) && error
                          ? "border-red-500 ring-2 ring-red-500/10"
                          : touched && !error && identifier
                            ? "border-emerald-500 ring-2 ring-emerald-500/10"
                            : "border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15"
                          }`}
                      />
                    </div>
                    {(touched || hasSubmitted) && error && (
                      <p className="text-[0.65rem] text-red-500 mt-1 font-medium leading-tight">{error}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#0a66ff] to-[#3b82f6] text-white font-bold text-sm shadow-[0_6px_24px_rgba(10,102,255,0.35)] hover:shadow-[0_10px_32px_rgba(10,102,255,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                    ) : (
                      <>
                        <i className="fas fa-paper-plane text-xs"></i>
                        <span>Send recovery link</span>
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-center text-xs text-slate-500">
                    Remember your password?{" "}
                    <Link href="/login" className="font-bold text-[#0a66ff] hover:underline">
                      Log in
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              /* ====== SUCCESS CONFIRMATION STATE ====== */
              <div className="flex flex-col items-center justify-center text-center py-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] text-emerald-500 flex items-center justify-center text-2xl shadow-sm mb-3">
                  <i className="fas fa-envelope-circle-check"></i>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-[#0b1a33] tracking-tight mb-1">
                  Recovery link sent!
                </h2>
                <p className="text-xs text-slate-600 max-w-sm mb-4 leading-relaxed">
                  We have sent instructions to <strong className="text-[#0b1a33] font-bold">{identifier}</strong>. Click the link in your email to reset your password.
                </p>

                <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 text-left text-xs text-slate-600">
                  <div className="flex items-center gap-2 font-bold text-[#0b1a33] mb-1">
                    <i className="fas fa-info-circle text-[#0a66ff]"></i> Did not receive the email?
                  </div>
                  <p className="text-[0.72rem] text-slate-500">
                    Check your spam folder or wait for the cooldown timer below before requesting a new link.
                  </p>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <Link
                    href="/reset-password"
                    className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#0a66ff] to-[#084bc2] text-white font-bold text-sm shadow-[0_8px_24px_rgba(10,102,255,0.35)] hover:shadow-[0_12px_36px_rgba(10,102,255,0.45)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Reset Password</span>
                    <i className="fas fa-arrow-right text-xs"></i>
                  </Link>

                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={!canResend || isLoading}
                    className={`w-full py-2.5 px-4 rounded-full text-xs font-bold transition-all border ${canResend
                      ? "border-[#0a66ff] text-[#0a66ff] bg-[#e8f0fe] hover:bg-[#d5e4fc] cursor-pointer"
                      : "border-slate-200 text-slate-400 bg-slate-100 cursor-not-allowed"
                      }`}
                  >
                    {isLoading ? (
                      <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin inline-block" />
                    ) : canResend ? (
                      <span>Resend recovery link</span>
                    ) : (
                      <span>Resend link in {cooldown}s</span>
                    )}
                  </button>
                </div>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0a66ff] mt-4"
                >
                  <i className="fas fa-arrow-left text-[0.6rem]"></i>
                  <span>Back to Log in</span>
                </Link>
              </div>
            )}

            {/* Micro Trust Footer */}
            <div className="w-full text-center pt-5 text-[0.68rem] text-slate-400 flex items-center justify-center gap-3">
              <span className="flex items-center gap-1">
                <i className="fas fa-shield-halved text-[#0a66ff] text-xs"></i> SSL Verified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <i className="fas fa-bolt text-amber-500 text-xs"></i> Instant Delivery
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
