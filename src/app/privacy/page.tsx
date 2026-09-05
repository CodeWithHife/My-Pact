"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PrivacyPolicyPage() {
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200/60">
          <i className="fas fa-shield-alt text-emerald-600"></i>
          <span>Data Protection</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#0b1a33] tracking-tight mb-3">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mb-8 pb-6 border-b border-slate-100">
          Effective Date: September 2026 · Last Updated: September 5, 2026
        </p>

        <div className="prose prose-slate max-w-none space-y-8 text-sm sm:text-base text-[#3d4e6b] leading-relaxed">
          <section>
            <h2 className="text-xl font-extrabold text-[#0b1a33] mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you use MyPact, we collect information you provide directly to us:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-sm">
              <li><strong>Account Info:</strong> Name, university email, academic institution, and grade goal targets.</li>
              <li><strong>Study Content:</strong> Uploaded course syllabus PDFs, lecture slides, and task schedules.</li>
              <li><strong>Verification Proofs:</strong> Scanned textbook barcodes, math test submissions, and task completion timestamps.</li>
              <li><strong>Accountability Contacts:</strong> Designee partner emails/phone numbers for Level 3 alert escalations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#0b1a33] mb-3">
              2. How We Use Your Information
            </h2>
            <p>
              We use your data strictly to power your accountability experience:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-sm">
              <li>Extracting exam dates and homework deadlines from uploaded syllabus files using our localized AI.</li>
              <li>Generating weekly Discipline Audit Reports and calculating study streaks.</li>
              <li>Dispatching scheduled verification reminders, unstoppable alarms, and partner escalation notifications.</li>
              <li>Syncing with calendar integrations (Google Calendar, Apple Calendar, Outlook) when enabled.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#0b1a33] mb-3">
              3. Data Privacy and Zero Sale of Student Information
            </h2>
            <p className="font-semibold text-[#0b1a33]">
              We never sell, rent, or monetize your personal data or study files to third-party advertisers or data brokers.
            </p>
            <p className="mt-2">
              Your uploaded course slides and syllabus documents are processed securely and are never shared with unauthorized external entities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#0b1a33] mb-3">
              4. Data Retention and Deletion
            </h2>
            <p>
              You retain full control over your data. You may export your discipline audits or request complete, permanent deletion of your account and associated files at any time via your account settings or by emailing our data privacy officer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#0b1a33] mb-3">
              5. Contact Us
            </h2>
            <p>
              If you have any privacy questions or requests, please reach out to us at{" "}
              <a href="mailto:privacy@mypact.app" className="text-[#0a66ff] font-semibold underline">
                privacy@mypact.app
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
