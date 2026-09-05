"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  // Password Strength Evaluation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "Empty", color: "bg-slate-200", textColor: "text-slate-400", width: "0%" };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: "Weak", color: "bg-red-500", textColor: "text-red-500", width: "25%" };
      case 2:
        return { score: 2, label: "Fair", color: "bg-amber-500", textColor: "text-amber-500", width: "50%" };
      case 3:
        return { score: 3, label: "Good", color: "bg-[#0a66ff]", textColor: "text-[#0a66ff]", width: "75%" };
      case 4:
        return { score: 4, label: "Strong & Bulletproof", color: "bg-emerald-500", textColor: "text-emerald-500", width: "100%" };
      default:
        return { score: 1, label: "Weak", color: "bg-red-500", textColor: "text-red-500", width: "25%" };
    }
  };

  const strength = getPasswordStrength(formData.newPassword);

  const getErrors = () => {
    const errs = {
      newPassword: "",
      confirmPassword: "",
    };

    if (!formData.newPassword) {
      errs.newPassword = "Please enter a new password.";
    } else if (formData.newPassword.length < 8) {
      errs.newPassword = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = "Please confirm your new password.";
    } else if (formData.confirmPassword !== formData.newPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }

    return errs;
  };

  const currentErrors = getErrors();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      newPassword: true,
      confirmPassword: true,
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
      {/* Background Animated Floating Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-[#0a66ff] rounded-full blur-[130px] opacity-15 -top-[200px] -right-[150px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-[#7c3aed] rounded-full blur-[130px] opacity-12 -bottom-[150px] -left-[120px] animate-pulse delay-1000" />
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="relative z-10 w-full min-h-screen lg:h-screen grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] bg-white overflow-y-auto lg:overflow-hidden">
        
        {/* ====== LEFT: PASSWORD SECURITY MONITOR MOCKUP (Desktop only) ====== */}
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
              <span>Password Guardian Active</span>
            </div>
          </div>

          {/* Center Graphic: Security Standard Cards */}
          <div className="w-full max-w-[480px] flex flex-col gap-4 relative z-10 animate-mockup-entry">
            <div className="bg-white/8 backdrop-blur-md p-6 rounded-2xl border border-white/15 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0a66ff]/30 text-[#5b9aff] flex items-center justify-center text-xl shadow-md">
                  <i className="fas fa-lock-hashtag"></i>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">Cryptographic Standards</h3>
                  <p className="text-xs text-slate-300">Argon2id + Salt Hash Protection</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="flex items-center gap-2 text-slate-200">
                    <i className="fas fa-check-circle text-emerald-400"></i> Minimum 8 characters
                  </span>
                  <span className="text-[0.65rem] uppercase font-bold text-emerald-300">Required</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="flex items-center gap-2 text-slate-200">
                    <i className="fas fa-check-circle text-emerald-400"></i> Numbers & symbols allowed
                  </span>
                  <span className="text-[0.65rem] uppercase font-bold text-blue-300">Recommended</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="flex items-center gap-2 text-slate-200">
                    <i className="fas fa-check-circle text-emerald-400"></i> Session termination on other devices
                  </span>
                  <span className="text-[0.65rem] uppercase font-bold text-purple-300">Auto-Enforced</span>
                </div>
              </div>
            </div>

            {/* Quick Tip Box */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 text-[0.7rem] text-slate-300 flex items-center gap-2.5">
              <i className="fas fa-lightbulb text-amber-400 text-sm"></i>
              <span>Use a memorable passphrase like <strong className="text-white">"Lagos#Study2026"</strong> for maximum strength.</span>
            </div>
          </div>
        </div>

        {/* ====== RIGHT: RESET PASSWORD FORM ====== */}
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

            {/* If Form NOT Submitted Successfully */}
            {!isSuccess ? (
              <>
                <div className="mb-4 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-[0.65rem] font-extrabold uppercase tracking-wider mb-2">
                    <i className="fas fa-shield-keyhole text-[0.6rem]"></i>
                    <span>Secure Reset</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#0b1a33] tracking-tight">
                    Reset your password
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Choose a strong, unique password to secure your MyPact study account.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-3">
                  {/* New Password (Full Width Block) */}
                  <div className="relative">
                    <label className="block text-[0.7rem] font-bold text-[#0b1a33] mb-0.5">
                      New password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fas fa-lock absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("newPassword")}
                        placeholder="Enter new password"
                        className={`w-full pl-7 pr-8 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none bg-slate-50/50 focus:bg-white ${(touched.newPassword || hasSubmitted) && currentErrors.newPassword
                          ? "border-red-500 ring-2 ring-red-500/10"
                          : touched.newPassword && !currentErrors.newPassword && formData.newPassword
                            ? "border-emerald-500 ring-2 ring-emerald-500/10"
                            : "border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15"
                          }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0a66ff] text-xs focus:outline-none cursor-pointer p-0.5"
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                      >
                        <i className={showNewPassword ? "fas fa-eye-slash text-[0.7rem]" : "fas fa-eye text-[0.7rem]"}></i>
                      </button>
                    </div>
                    {(touched.newPassword || hasSubmitted) && currentErrors.newPassword && (
                      <p className="text-[0.62rem] text-red-500 mt-0.5 font-medium leading-tight">{currentErrors.newPassword}</p>
                    )}

                    {/* Password Strength Meter */}
                    {formData.newPassword && (
                      <div className="mt-2">
                        <div className="flex justify-between items-center text-[0.65rem] font-bold mb-1">
                          <span className="text-slate-500">Strength</span>
                          <span className={strength.textColor}>{strength.label}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${strength.color}`}
                            style={{ width: strength.width }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password (Full Width Block) */}
                  <div className="relative">
                    <label className="block text-[0.7rem] font-bold text-[#0b1a33] mb-0.5">
                      Confirm new password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fas fa-shield-check absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("confirmPassword")}
                        placeholder="Confirm new password"
                        className={`w-full pl-7 pr-8 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none bg-slate-50/50 focus:bg-white ${(touched.confirmPassword || hasSubmitted) && currentErrors.confirmPassword
                          ? "border-red-500 ring-2 ring-red-500/10"
                          : touched.confirmPassword && !currentErrors.confirmPassword && formData.confirmPassword
                            ? "border-emerald-500 ring-2 ring-emerald-500/10"
                            : "border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15"
                          }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0a66ff] text-xs focus:outline-none cursor-pointer p-0.5"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        <i className={showConfirmPassword ? "fas fa-eye-slash text-[0.7rem]" : "fas fa-eye text-[0.7rem]"}></i>
                      </button>
                    </div>
                    {(touched.confirmPassword || hasSubmitted) && currentErrors.confirmPassword && (
                      <p className="text-[0.62rem] text-red-500 mt-0.5 font-medium leading-tight">{currentErrors.confirmPassword}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-6 rounded-full bg-gradient-to-r from-[#0a66ff] to-[#3b82f6] text-white font-bold text-sm shadow-[0_6px_24px_rgba(10,102,255,0.35)] hover:shadow-[0_10px_32px_rgba(10,102,255,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                    ) : (
                      <>
                        <i className="fas fa-check-double text-xs"></i>
                        <span>Update password</span>
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-center text-xs text-slate-500">
                    Remember your credentials?{" "}
                    <Link href="/login" className="font-bold text-[#0a66ff] hover:underline">
                      Back to Log in
                    </Link>
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
                  <i className="fas fa-check"></i>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-[#0b1a33] tracking-tight mb-1">
                  Password updated!
                </h2>
                <p className="text-xs text-slate-600 max-w-sm mb-6 leading-relaxed">
                  Your password has been successfully reset. You can now log into your MyPact dashboard.
                </p>

                <Link
                  href="/login"
                  className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#0a66ff] to-[#084bc2] text-white font-bold text-sm shadow-[0_8px_24px_rgba(10,102,255,0.35)] hover:shadow-[0_12px_36px_rgba(10,102,255,0.45)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <i className="fas fa-sign-in-alt text-xs"></i>
                  <span>Log In to MyPact</span>
                </Link>
              </div>
            )}

            {/* Micro Trust Footer */}
            <div className="w-full text-center pt-5 text-[0.68rem] text-slate-400 flex items-center justify-center gap-3">
              <span className="flex items-center gap-1">
                <i className="fas fa-shield-halved text-[#0a66ff] text-xs"></i> 256-bit Hash
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <i className="fas fa-user-lock text-emerald-500 text-xs"></i> Zero-Knowledge
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
