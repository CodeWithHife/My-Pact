"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Community() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section
      id="community"
      ref={sectionRef}
      className="py-24 bg-[#f8faff] border-b border-slate-100 relative overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0a66ff]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0a66ff]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Community Copy, Stats & Newsletter */}
          <div
            className={`lg:col-span-7 flex flex-col items-start transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-5 border border-[#0a66ff]/20 shadow-xs">
              <i className="fas fa-users text-[#0a66ff]"></i>
              <span>Community</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
              Join a community of <span className="text-[#0a66ff]">dedicated learners</span>.
            </h2>

            {/* Lead Description */}
            <p className="text-base sm:text-lg text-[#3d4e6b] leading-relaxed mb-8">
              Connect with thousands of university students who are using MyPact to transform their academic lives. Share tips, celebrate streak milestones, and stay motivated together.
            </p>

            {/* Community Stats Counters (2-card layout without 15k) */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-md mb-8 pb-8 border-b border-slate-200/80">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2 mb-1">
                  <i className="fas fa-clock text-emerald-600 text-sm"></i>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-600">2.3M</span>
                </div>
                <div className="text-xs text-slate-500 font-semibold">
                  Hours Logged
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2 mb-1">
                  <i className="fas fa-star text-amber-500 text-sm"></i>
                  <span className="text-2xl sm:text-3xl font-black text-amber-600">98%</span>
                </div>
                <div className="text-xs text-slate-500 font-semibold">
                  Satisfaction Rate
                </div>
              </div>
            </div>

            {/* Newsletter Subscription Form */}
            <div className="w-full max-w-lg">
              <p className="text-xs sm:text-sm font-bold text-[#0b1a33] mb-3">
                Subscribe to our newsletter for weekly productivity blueprints & GPA tips:
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your university email"
                  className="flex-1 px-5 py-3.5 rounded-full bg-white border border-slate-200 text-sm text-[#0b1a33] placeholder-slate-400 focus:outline-none focus:border-[#0a66ff] focus:ring-2 focus:ring-[#0a66ff]/20 shadow-xs transition-all"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-[#0a66ff] hover:bg-[#084bc2] text-white font-semibold text-sm shadow-md shadow-[#0a66ff]/25 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <i className="fas fa-paper-plane text-xs"></i>
                </button>
              </form>
              {subscribed && (
                <div className="mt-2.5 text-xs font-bold text-emerald-700 flex items-center gap-1.5 animate-fadeIn">
                  <i className="fas fa-check-circle"></i>
                  <span>You're in! Welcome to the MyPact learning community.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Study Feed / Community Activity Mockup */}
          <div
            className={`lg:col-span-5 flex justify-center transition-all duration-800 delay-150 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.98]"
            }`}
          >
            <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 border border-[#0a66ff]/20 shadow-[0_20px_50px_rgba(10,102,255,0.08)]">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-extrabold text-sm text-[#0b1a33]">
                    Live Student Activity Feed
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Campus Real-Time
                </span>
              </div>

              {/* Feed Items (with FontAwesome icons instead of emojis) */}
              <div className="space-y-3">
                {/* Activity 1 */}
                <div className="p-3.5 rounded-2xl bg-[#f8faff] border border-slate-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0a66ff] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    CO
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0b1a33]">Chidiebere O.</span>
                      <span className="text-[10px] text-slate-400">2m ago</span>
                    </div>
                    <p className="text-[11px] text-[#3d4e6b] mt-0.5 flex items-center gap-1.5 flex-wrap">
                      <span>Completed 90m Organic Chemistry sprint & verified via textbook scan</span>
                      <i className="fas fa-qrcode text-[#0a66ff] text-xs"></i>
                    </p>
                    <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-[#0a66ff] bg-[#e8f0fe] px-2 py-0.5 rounded mt-1.5">
                      <i className="fas fa-fire text-amber-500 text-[9px]"></i>
                      <span>14-Day Streak Unlocked</span>
                    </span>
                  </div>
                </div>

                {/* Activity 2 */}
                <div className="p-3.5 rounded-2xl bg-[#f8faff] border border-slate-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    AB
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0b1a33]">Amina B.</span>
                      <span className="text-[10px] text-slate-400">8m ago</span>
                    </div>
                    <p className="text-[11px] text-[#3d4e6b] mt-0.5 flex items-center gap-1.5 flex-wrap">
                      <span>Uploaded Pathology syllabus & auto-scheduled 12 exam review blocks</span>
                      <i className="fas fa-book-open text-emerald-600 text-xs"></i>
                    </p>
                    <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded mt-1.5">
                      <i className="fas fa-brain text-emerald-600 text-[9px]"></i>
                      <span>AI Schedule Active</span>
                    </span>
                  </div>
                </div>

                {/* Activity 3 */}
                <div className="p-3.5 rounded-2xl bg-[#f8faff] border border-slate-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    TA
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0b1a33]">Tobi A.</span>
                      <span className="text-[10px] text-slate-400">14m ago</span>
                    </div>
                    <p className="text-[11px] text-[#3d4e6b] mt-0.5 flex items-center gap-1.5 flex-wrap">
                      <span>Zero overrides logged this week. Discipline grade updated to A+</span>
                      <i className="fas fa-bullseye text-purple-600 text-xs"></i>
                    </p>
                    <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-purple-800 bg-purple-100 px-2 py-0.5 rounded mt-1.5">
                      <i className="fas fa-award text-purple-600 text-[9px]"></i>
                      <span>Discipline Audit A+</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Feed Footer */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <i className="fas fa-users"></i> 1,420 studying right now
                </span>
                <a href="#pricing" className="text-xs text-[#0a66ff] hover:text-[#084bc2] font-bold flex items-center gap-1 cursor-pointer">
                  <span>Join Circle</span>
                  <i className="fas fa-arrow-right text-[10px]"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
