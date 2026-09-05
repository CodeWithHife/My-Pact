"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function SecurityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#0b1a33]">
      {/* Mini Nav Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e6edf5] py-4">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#0a66ff] flex items-center justify-center shadow-xs">
              <Image
                src="/logo/mypact_icon.svg"
                alt="MyPact Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-extrabold text-2xl text-[#0b1a33] tracking-tight">
              My<span className="text-[#0a66ff]">Pact</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs sm:text-sm font-semibold text-[#0a66ff] hover:text-[#084bc2] flex items-center gap-1.5"
          >
            <i className="fas fa-arrow-left text-xs"></i>
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[860px] mx-auto px-5 sm:px-6 py-12 sm:py-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0a66ff]/20">
          <i className="fas fa-lock text-[#0a66ff]"></i>
          <span>Security Architecture</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#0b1a33] tracking-tight mb-3">
          Security & Compliance
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mb-8 pb-6 border-b border-slate-100">
          How MyPact protects student data, syllabus uploads, and verification routines.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div className="p-5 rounded-2xl bg-[#f8faff] border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-base mb-3 shadow-xs">
              <i className="fas fa-shield-halved"></i>
            </div>
            <h3 className="font-bold text-base text-[#0b1a33] mb-1.5">
              End-to-End Encryption
            </h3>
            <p className="text-xs text-[#3d4e6b] leading-relaxed">
              All data transmitted between your device and MyPact servers is encrypted using industry-standard TLS 1.3 in transit and AES-256 at rest.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#f8faff] border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-base mb-3 shadow-xs">
              <i className="fas fa-fingerprint"></i>
            </div>
            <h3 className="font-bold text-base text-[#0b1a33] mb-1.5">
              Zero Tamper Architecture
            </h3>
            <p className="text-xs text-[#3d4e6b] leading-relaxed">
              Our hardware-level verification checks prevent clock spoofing, emulator bypasses, and fake checkmark exploitation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#f8faff] border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-base mb-3 shadow-xs">
              <i className="fas fa-robot"></i>
            </div>
            <h3 className="font-bold text-base text-[#0b1a33] mb-1.5">
              Private AI Sandbox
            </h3>
            <p className="text-xs text-[#3d4e6b] leading-relaxed">
              Uploaded syllabus PDFs and lecture notes are processed in isolated sandbox environments and are never used to train public models.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#f8faff] border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-base mb-3 shadow-xs">
              <i className="fas fa-server"></i>
            </div>
            <h3 className="font-bold text-base text-[#0b1a33] mb-1.5">
              99.9% Uptime & Redundancy
            </h3>
            <p className="text-xs text-[#3d4e6b] leading-relaxed">
              Distributed edge servers ensure your scheduled alarms and lockout enforcement execute reliably even with spotty internet connectivity.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0b1a33] text-white">
          <h3 className="text-lg font-bold mb-2">Have a security question or vulnerability disclosure?</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            We take student data security seriously and welcome responsible disclosure reports from security researchers.
          </p>
          <a
            href="mailto:security@mypact.app"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0a66ff] hover:bg-[#084bc2] text-white text-xs font-bold transition-all shadow-md"
          >
            <i className="fas fa-envelope text-xs"></i>
            <span>Contact Security Team</span>
          </a>
        </div>
      </main>

      {/* Mini Footer */}
      <footer className="border-t border-slate-100 py-6 text-center text-xs text-slate-500 bg-slate-50">
        <p>&copy; {new Date().getFullYear()} MyPact Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
