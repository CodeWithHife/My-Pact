"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [cooldown, setCooldown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [userEmail, setUserEmail] = useState("scholar@university.edu");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  // Cooldown countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0 && !isVerified) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    } else if (cooldown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [cooldown, isVerified]);

  const handleOtpChange = (index: number, value: string) => {
    if (error) setError("");
    
    // Only allow single numeric digit
    const cleaned = value.replace(/[^0-9]/g, "");
    if (!cleaned && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = cleaned.slice(-1);
    setOtp(newOtp);

    // Auto-advance to next input if digit entered
    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
    if (!pasted) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || "";
    }
    setOtp(newOtp);

    const nextIndex = Math.min(pasted.length, 5);
    inputRefs.current[nextIndex]?.focus();
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

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsVerified(true);
      triggerConfetti();
    }, 1200);
  };

  const handleResend = () => {
    if (!canResend) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCooldown(60);
      setCanResend(false);
      setError("");
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
        
        {/* ====== LEFT: ACADEMIC VERIFICATION HUB MOCKUP (Desktop only) ====== */}
        <div className="hidden lg:flex bg-gradient-to-br from-[#0b1a33] via-[#0e2448] to-[#142b4a] p-8 lg:p-10 flex-col items-center justify-center relative overflow-hidden text-white min-h-full select-none">
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
              <span>Campus Enrollment Check</span>
            </div>
          </div>

          {/* Center Graphic: Verification Pipeline */}
          <div className="w-full max-w-[480px] flex flex-col gap-4 relative z-10 animate-mockup-entry">
            <div className="bg-white/8 backdrop-blur-md p-6 rounded-2xl border border-white/15 shadow-xl relative overflow-hidden">
              
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0a66ff] to-[#7c3aed] text-white flex items-center justify-center text-xl shadow-md">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">Student Accountability Trust</h3>
                  <p className="text-xs text-blue-200">Verified Peer Network & Leaderboards</p>
                </div>
              </div>

              {/* 3 Step Verification Pipeline */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-xs text-emerald-300">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[0.65rem] shrink-0 font-bold">
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <strong className="block text-white font-bold">1. Account Initialized</strong>
                    <span className="text-[0.65rem] text-emerald-300/80">Credentials hashed with Argon2id</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0a66ff]/20 border border-[#0a66ff]/40 text-xs text-blue-200">
                  <div className="w-6 h-6 rounded-full bg-[#0a66ff] text-white flex items-center justify-center text-[0.65rem] shrink-0 font-bold animate-pulse">
                    2
                  </div>
                  <div>
                    <strong className="block text-white font-bold">2. Email Authorization (Current)</strong>
                    <span className="text-[0.65rem] text-blue-200/80">6-digit secure verification token</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 opacity-60">
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[0.65rem] shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <strong className="block text-slate-300 font-bold">3. Study Streak Activated</strong>
                    <span className="text-[0.65rem]">Pact commitments, physical barcode lock & sync</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Security Tag */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 text-[0.7rem] text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <i className="fas fa-fingerprint text-[#5b9aff]"></i>
                <span>Anti-Spam Verification Token</span>
              </span>
              <span className="text-[0.65rem] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                10-min Expiry
              </span>
            </div>
          </div>
        </div>

        {/* ====== RIGHT: EMAIL VERIFICATION FORM ====== */}
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

            {/* If NOT Verified */}
            {!isVerified ? (
              <>
                <div className="mb-4 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-[0.65rem] font-extrabold uppercase tracking-wider mb-2">
                    <i className="fas fa-envelope-badge text-[0.6rem]"></i>
                    <span>Verify Identity</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#0b1a33] tracking-tight">
                    Verify your email
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    We sent a 6-digit confirmation code to{" "}
                    <span className="font-bold text-[#0b1a33]">{userEmail}</span>.
                  </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-4">
                  {/* 6-Digit OTP Box Grid */}
                  <div>
                    <label className="block text-[0.7rem] font-bold text-[#0b1a33] mb-2 text-center">
                      Enter 6-digit confirmation code
                    </label>
                    <div className="grid grid-cols-6 gap-2" onPaste={handlePaste}>
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => {
                            inputRefs.current[idx] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(idx, e)}
                          className={`w-full h-11 sm:h-12 text-center text-lg font-black rounded-xl border transition-all outline-none bg-slate-50/60 focus:bg-white ${error
                            ? "border-red-500 ring-2 ring-red-500/10 text-red-600"
                            : digit
                              ? "border-[#0a66ff] ring-2 ring-[#0a66ff]/15 text-[#0a66ff] bg-blue-50/20"
                              : "border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15 text-[#0b1a33]"
                            }`}
                        />
                      ))}
                    </div>
                    {error && (
                      <p className="text-[0.65rem] text-red-500 text-center mt-1.5 font-medium">{error}</p>
                    )}
                  </div>

                  {/* Submit / Verify Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-6 rounded-full bg-gradient-to-r from-[#0a66ff] to-[#3b82f6] text-white font-bold text-sm shadow-[0_6px_24px_rgba(10,102,255,0.35)] hover:shadow-[0_10px_32px_rgba(10,102,255,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                    ) : (
                      <>
                        <i className="fas fa-badge-check text-xs"></i>
                        <span>Confirm & activate</span>
                      </>
                    )}
                  </button>

                  {/* Resend Code Section */}
                  <div className="pt-1 text-center">
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={!canResend || isLoading}
                      className={`text-xs font-semibold transition-colors ${canResend
                        ? "text-[#0a66ff] hover:underline cursor-pointer"
                        : "text-slate-400 cursor-not-allowed"
                        }`}
                    >
                      {canResend ? (
                        <span>Didn&apos;t get a code? Resend</span>
                      ) : (
                        <span>Resend code in {cooldown}s</span>
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* ====== SUCCESS OVERLAY ====== */
              <div className="flex flex-col items-center justify-center text-center py-6 relative animate-fadeIn">
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

                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] text-emerald-500 flex items-center justify-center text-2xl shadow-sm mb-3">
                  <i className="fas fa-check-double"></i>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-[#0b1a33] tracking-tight mb-1">
                  Email verified!
                </h2>
                <p className="text-xs text-slate-600 max-w-sm mb-6 leading-relaxed">
                  Your academic account is authenticated. Your accountability pacts and study streaks are ready.
                </p>

                <Link
                  href="/login"
                  className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#0a66ff] to-[#084bc2] text-white font-bold text-sm shadow-[0_8px_24px_rgba(10,102,255,0.35)] hover:shadow-[0_12px_36px_rgba(10,102,255,0.45)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <span>Go to Log In</span>
                  <i className="fas fa-arrow-right text-xs"></i>
                </Link>
              </div>
            )}

            {/* Micro Trust Footer */}
            <div className="w-full text-center pt-5 text-[0.68rem] text-slate-400 flex items-center justify-center gap-3">
              <span className="flex items-center gap-1">
                <i className="fas fa-shield-halved text-[#0a66ff] text-xs"></i> Instant Auth
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <i className="fas fa-bolt text-amber-500 text-xs"></i> Zero Delay
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
