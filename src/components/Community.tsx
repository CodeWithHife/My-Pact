"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Community() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Direct notification link to obadimuife@gmail.com
      const mailtoUrl = `mailto:obadimuife@gmail.com?subject=MyPact%20Newsletter%20Subscription&body=New%20subscriber%20email:%20${encodeURIComponent(
        email.trim()
      )}`;
      window.open(mailtoUrl, "_blank");
      
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section id="community" className="py-24 bg-[#08111e] text-white relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Community CTA */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider mb-5 border border-slate-700">
              <i className="fas fa-users-rays text-[#0a66ff]"></i>
              <span>The Movement</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold tracking-tight leading-[1.12] mb-5 text-white">
              Join thousands of students who{" "}
              <span className="text-[#0a66ff]">
                refuse to settle for average
              </span>
              .
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              Procrastination isn't a lack of ambition—it's a lack of enforcement. Join peer study circles across Nigerian universities today.
            </p>

            {/* Impact Metric Cards */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8 pb-8 border-b border-slate-800">
              <div className="p-4 rounded-2xl bg-[#0b1626] border border-slate-800">
                <div className="text-2xl sm:text-3xl font-black text-white">2.3M+</div>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">Study Hours Enforced</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#0b1626] border border-slate-800">
                <div className="text-2xl sm:text-3xl font-black text-white">97.4%</div>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">Completion Rate</div>
              </div>
            </div>

            {/* Newsletter & Action */}
            <div className="w-full max-w-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Get weekly GPA blueprints & exam study frameworks:
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3.5 rounded-full bg-[#0b1626] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0a66ff] focus:ring-1 focus:ring-[#0a66ff] transition-all"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-[#0a66ff] hover:bg-[#084bc2] text-white font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Subscribe</span>
                  <i className="fas fa-paper-plane text-xs"></i>
                </button>
              </form>
              {subscribed && (
                <div className="mt-2.5 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <i className="fas fa-check-circle"></i>
                  <span>Welcome! Check your inbox for the GPA Blueprint.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Study Feed Stage */}
          <div className="lg:col-span-5">
            <div className="bg-[#0b1626] rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="font-extrabold text-xs text-white uppercase tracking-wider">
                    Campus Live Pulse
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Real-time
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-[#08111e] border border-slate-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0a66ff] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    CO
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">Chidiebere O. · UNILAG</span>
                      <span className="text-[10px] text-slate-500">2m ago</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Verified 90m Organic Chemistry sprint via textbook scan.
                    </p>
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded mt-1.5">
                      <i className="fas fa-fire text-[#0a66ff] text-[9px]"></i> 14-Day Streak
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#08111e] border border-slate-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    AB
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">Amina B. · ABU</span>
                      <span className="text-[10px] text-slate-500">7m ago</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Syllabus parsed. 12 Pathology micro-blocks scheduled.
                    </p>
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded mt-1.5">
                      <i className="fas fa-brain text-[#0a66ff] text-[9px]"></i> AI Schedule Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <i className="fas fa-bolt text-[#0a66ff]"></i> 1,420 studying right now
                </span>
                <Link
                  href="/signup"
                  className="text-xs text-[#0a66ff] hover:text-white font-bold flex items-center gap-1 transition-colors"
                >
                  <span>Start Your Pact</span>
                  <i className="fas fa-arrow-right text-[10px]"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
