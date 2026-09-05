"use client";

import React, { useState, useEffect, useRef } from "react";

const problemSlides = [
  {
    id: 1,
    tag: "Problem 01",
    title: "Snooze Culture",
    subtitle: "Alarms are too easy to dismiss, leading to endless delays.",
    icon: "fas fa-stopwatch",
    badge: "Endless Delay",
    badgeColor: "bg-amber-100 text-amber-800",
    taskName: "Organic Chemistry · Chapter 7",
    scheduledTime: "Scheduled: 8:00 AM",
    failureState: "Snoozed 5 times (120 mins wasted)",
    impact: "Brain trains itself that alarms don't matter.",
    actionIcon: "fas fa-bell-slash",
    statBadge: "+2 hrs lost",
  },
  {
    id: 2,
    tag: "Problem 02",
    title: "No Verification",
    subtitle: "Marking 'complete' without actual work or proof.",
    icon: "fas fa-clipboard-check",
    badge: "Zero Proof",
    badgeColor: "bg-rose-100 text-rose-800",
    taskName: "Calc III · Problem Set #4",
    scheduledTime: "Due: Tonight 11:59 PM",
    failureState: "Checked off with 0 pages completed",
    impact: "Creates a false sense of security until exam day.",
    actionIcon: "fas fa-xmark",
    statBadge: "0% actual work",
  },
  {
    id: 3,
    tag: "Problem 03",
    title: "Zero Consequences",
    subtitle: "Missed tasks vanish without a trace, reinforcing bad habits.",
    icon: "fas fa-calendar-xmark",
    badge: "Zero Penalty",
    badgeColor: "bg-slate-200 text-slate-800",
    taskName: "Final Exam Prep · Micro-Block",
    scheduledTime: "Yesterday 4:00 PM",
    failureState: "Missed session vanished into archive",
    impact: "No lockouts, no alerts, zero habit improvement.",
    actionIcon: "fas fa-ban",
    statBadge: "Vanished task",
  },
];

export default function ProblemSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Scroll detection via IntersectionObserver
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

  // Auto slide cycle every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % problemSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = problemSlides[activeSlide];

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="py-24 bg-white border-b border-slate-100 overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Problem Copy & Interactive Problem Selectors */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Tag Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-5 border border-[#0a66ff]/20 shadow-xs transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <i className="fas fa-exclamation-circle text-[#0a66ff]"></i>
              <span>The Problem</span>
            </div>

            {/* Main Section Heading */}
            <h2
              className={`text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] tracking-tight leading-[1.15] mb-5 transition-all duration-700 delay-100 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Conventional tools make it{" "}
              <span className="text-[#0a66ff]">too easy to fail</span>.
            </h2>

            {/* Lead Description */}
            <p
              className={`text-base sm:text-lg text-[#3d4e6b] leading-relaxed mb-8 transition-all duration-700 delay-150 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              To-do lists and calendar apps rely entirely on voluntary self-discipline.
              When motivation dips, you snooze, ignore, and push back—with{" "}
              <strong className="text-[#0b1a33] font-semibold">
                zero immediate consequences
              </strong>
              .
            </p>

            {/* The 3 Interactive Problem Cards */}
            <div className="w-full space-y-3.5">
              {problemSlides.map((slide, index) => {
                const isActive = activeSlide === index;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                    className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all duration-500 ease-out cursor-pointer ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5"
                    } ${
                      isActive
                        ? "bg-[#f8faff] border-[#0a66ff] shadow-md shadow-[#0a66ff]/8 ring-1 ring-[#0a66ff]/30 translate-x-1"
                        : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-base transition-colors duration-300 ${
                            isActive
                              ? "bg-[#0a66ff] text-white shadow-sm shadow-[#0a66ff]/30"
                              : "bg-[#e8f0fe] text-[#0a66ff]"
                          }`}
                        >
                          <i className={slide.icon}></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-sm sm:text-base text-[#0b1a33]">
                            {slide.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#3d4e6b]">
                            {slide.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center">
                        <span
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isActive ? "bg-[#0a66ff] scale-125" : "bg-slate-300"
                          }`}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Animated Sliding Failure Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              className={`w-full max-w-[480px] bg-white rounded-3xl p-6 sm:p-7 shadow-[0_24px_70px_rgba(10,102,255,0.12)] border border-[#0a66ff]/15 relative overflow-hidden transition-all duration-800 delay-200 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-[0.97]"
              }`}
            >
              {/* Mockup Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                  </div>
                  <div className="h-4 w-[1px] bg-slate-200"></div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Traditional App Simulator
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-[11px] font-bold uppercase tracking-wider border border-rose-200/50">
                  <i className="fas fa-triangle-exclamation text-[10px] mr-1"></i> Failing In Real Time
                </span>
              </div>

              {/* Animated Sliding Content Container with smooth transition */}
              <div className="my-6 min-h-[220px] flex flex-col justify-between transition-all duration-500 ease-in-out">
                {/* Active Slide Card with Snappy Transition */}
                <div
                  key={currentSlide.id}
                  className="p-5 rounded-2xl bg-[#f8faff] border border-slate-200/90 shadow-xs relative transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-xs font-bold text-[#0a66ff] uppercase tracking-wider">
                      {currentSlide.tag}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${currentSlide.badgeColor}`}
                    >
                      {currentSlide.badge}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-base text-[#0b1a33] mb-1">
                    {currentSlide.taskName}
                  </h4>
                  <p className="text-xs text-[#7a8aa3] mb-3">
                    {currentSlide.scheduledTime}
                  </p>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-600">
                      <i className={currentSlide.actionIcon}></i>
                      <span>{currentSlide.failureState}</span>
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                      {currentSlide.statBadge}
                    </span>
                  </div>

                  <p className="text-xs text-[#3d4e6b] mt-3 italic">
                    "{currentSlide.impact}"
                  </p>
                </div>
              </div>

              {/* Slider Controls & Progress Dots */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {problemSlides.map((_, index) => (
                    <button
                      key={`dot-${index}`}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeSlide === index
                          ? "w-8 bg-[#0a66ff]"
                          : "w-2 bg-slate-200 hover:bg-slate-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide((prev) => (prev === 0 ? problemSlides.length - 1 : prev - 1))
                    }
                    className="w-8 h-8 rounded-full border border-slate-200 text-slate-600 hover:text-[#0a66ff] hover:border-[#0a66ff]/40 flex items-center justify-center text-xs transition-colors cursor-pointer"
                    aria-label="Previous problem"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSlide((prev) => (prev + 1) % problemSlides.length)}
                    className="w-8 h-8 rounded-full border border-slate-200 text-slate-600 hover:text-[#0a66ff] hover:border-[#0a66ff]/40 flex items-center justify-center text-xs transition-colors cursor-pointer"
                    aria-label="Next problem"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
