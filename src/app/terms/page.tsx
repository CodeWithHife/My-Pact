"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function TermsOfServicePage() {
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
          <i className="fas fa-file-contract text-[#0a66ff]"></i>
          <span>Legal Agreement</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#0b1a33] tracking-tight mb-3">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mb-8 pb-6 border-b border-slate-100">
          Effective Date: September 2026 · Last Updated: September 5, 2026
        </p>

        <div className="prose prose-slate max-w-none space-y-8 text-sm sm:text-base text-[#3d4e6b] leading-relaxed">
          <section>
            <h2 className="text-xl font-extrabold text-[#0b1a33] mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, creating an account on, or using MyPact (the "Platform" or "Service"), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#0b1a33] mb-3">
              2. Student Accountability & Enforcement Services
            </h2>
            <p>
              MyPact provides academic accountability tools, including scheduled verification alarms, proof-of-work validation (e.g., barcode scans, math checks, photo proof), app lockout protocols, and AI syllabus extraction.
            </p>
            <p className="mt-2">
              You acknowledge and agree that you voluntarily enable enforcement mechanisms, such as Level 2 app lockouts and Level 3 accountability partner notifications, to support your personal academic discipline.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#0b1a33] mb-3">
              3. User Accounts and Verification
            </h2>
            <p>
              You must provide accurate, complete information when creating an account. You are responsible for safeguarding your login credentials and for all activities that occur under your account. You agree not to attempt to circumvent or tamper with verification routines or software lockouts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#0b1a33] mb-3">
              4. Subscription Plans and Billing
            </h2>
            <p>
              MyPact offers free tiers (Starter) and paid subscription tiers (Weekly Sprint, Semester Pro, Campus). Paid subscriptions are billed in advance according to your selected billing cycle (weekly or monthly) in Nigerian Naira (₦) or applicable local currencies.
            </p>
            <p className="mt-2">
              You may cancel your subscription at any time through your account dashboard. Cancellation will take effect at the end of the current billing cycle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#0b1a33] mb-3">
              5. Intellectual Property & Coursework Content
            </h2>
            <p>
              You retain all ownership rights to any study notes, syllabi, and coursework files you upload to MyPact. By uploading content, you grant MyPact a limited license solely to process and extract your study deadlines and generate tutoring assistance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#0b1a33] mb-3">
              6. Limitation of Liability
            </h2>
            <p>
              MyPact provides tools designed to foster study discipline and academic readiness. However, we do not guarantee specific academic grades or test results. We are not liable for indirect, incidental, or consequential damages arising from service usage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#0b1a33] mb-3">
              7. Contact Us
            </h2>
            <p>
              For legal inquiries or questions regarding these Terms, contact our legal team at{" "}
              <a href="mailto:support@mypact.app" className="text-[#0a66ff] font-semibold underline">
                support@mypact.app
              </a>.
            </p>
          </section>
        </div>
      </main>

      {/* Mini Footer */}
      <footer className="border-t border-slate-100 py-6 text-center text-xs text-slate-500 bg-slate-50">
        <p>&copy; {new Date().getFullYear()} MyPact Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
