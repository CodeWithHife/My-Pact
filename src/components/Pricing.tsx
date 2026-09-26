"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  price: string;
  period: string;
  description: string;
  icon: string;
  iconColor: string;
  buttonText: string;
  features: string[];
}

const mainPlans: PricingPlan[] = [
  {
    id: "free-trial",
    name: "Free Trial",
    price: "₦0",
    period: "7 days free",
    description: "Complete study discipline engine with basic accountability.",
    icon: "fas fa-seedling",
    iconColor: "text-slate-600 bg-slate-100 dark:bg-slate-800",
    buttonText: "Start Free 7-Day Trial",
    popular: false,
    features: [
      "Up to 3 Registered Courses",
      "10 Daily Study Tasks",
      "Physical Alarms & Sound Alerts",
      "Math Problem Verification",
      "Daily Streak Tracking",
    ],
  },
  {
    id: "scholar-pro",
    name: "Scholar Pro",
    badge: "Most Popular",
    popular: true,
    price: "₦1,500",
    period: "per month",
    description: "Full semester AI accountability and zero-tolerance discipline.",
    icon: "fas fa-bolt",
    iconColor: "text-[#0a66ff] bg-[#e8f0fe] dark:bg-[#0a66ff]/20",
    buttonText: "Get Scholar Pro",
    features: [
      "Unlimited Courses & Study Pacts",
      "Level 2 & Level 3 App Lockouts",
      "Accountability Partner Dispatches",
      "Coursework AI Assistant",
      "Syllabus Topic Auto-Organizer",
      "CGPA Target Grade Calculator",
    ],
  },
  {
    id: "exam-crush",
    name: "Exam Crush Pass",
    badge: "Best Value",
    price: "₦3,500",
    period: "full semester (90d)",
    description: "Peak revision pass with past questions and formula drills.",
    icon: "fas fa-graduation-cap",
    iconColor: "text-purple-600 bg-purple-100 dark:bg-purple-950/40",
    buttonText: "Start Exam Pass",
    popular: false,
    features: [
      "Everything in Scholar Pro",
      "90-Day Full Semester Access",
      "Downloadable Past Questions",
      "Zero-Tolerance Strict Lockout",
      "Weekly Discipline Audits",
      "Priority WhatsApp Support",
    ],
  },
  {
    id: "academic-weapon",
    name: "Academic Weapon",
    badge: "Distinction Tier",
    price: "₦6,000",
    period: "full session (1 yr)",
    description: "Complete 1-year package for First Class and Distinction scholars.",
    icon: "fas fa-crown",
    iconColor: "text-amber-500 bg-amber-100 dark:bg-amber-950/40",
    buttonText: "Unlock Academic Weapon",
    popular: false,
    features: [
      "Everything in Exam Crush",
      "365-Day Complete Session Coverage",
      "Multi-Partner Accountability Matrix",
      "Early Access to AI Predictions",
      "VIP Academic Consultation",
    ],
  },
];

export default function Pricing() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-white dark:bg-[#070f1e] relative overflow-hidden transition-colors"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0a66ff]/4 dark:bg-[#0a66ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-10 sm:mb-14 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f0fe] dark:bg-[#0a66ff]/15 text-[#0a66ff] dark:text-[#38bdf8] text-[0.72rem] sm:text-xs font-bold uppercase tracking-wider mb-3.5 border border-[#0a66ff]/20 shadow-xs">
            <i className="fas fa-tag text-[#0a66ff] dark:text-[#38bdf8]"></i>
            <span>Transparent Student Pricing</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0b1a33] dark:text-white tracking-tight leading-tight mb-3">
            Choose your <span className="text-[#0a66ff] dark:text-[#38bdf8]">accountability level</span>.
          </h2>
          <p className="text-xs sm:text-base text-[#3d4e6b] dark:text-slate-300 leading-relaxed px-2">
            Affordable student pricing with direct manual OPay / Bank transfers. No recurring hidden card charges.
          </p>
        </div>

        {/* 4 Responsive Cards Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch mx-auto mb-12 transition-all duration-800 delay-150 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {mainPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between relative ${
                plan.popular
                  ? "bg-white dark:bg-[#0f1d32] border-2 border-[#0a66ff] shadow-[0_20px_50px_rgba(10,102,255,0.14)] ring-4 ring-[#0a66ff]/10 lg:-translate-y-2"
                  : "bg-white dark:bg-[#0f1d32] border border-slate-200/90 dark:border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs ${
                      plan.popular
                        ? "bg-[#0a66ff] text-white"
                        : "bg-amber-100 text-amber-900 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm shadow-xs shrink-0 ${plan.iconColor}`}>
                    <i className={plan.icon}></i>
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#0b1a33] dark:text-white tracking-tight">
                      {plan.name}
                    </h3>
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs text-[#7a8aa3] dark:text-slate-400 min-h-[32px] leading-relaxed mb-4">
                  {plan.description}
                </p>

                <div className="my-3 py-2.5 border-y border-slate-100 dark:border-slate-800 flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-[#0b1a33] dark:text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-[11px] font-bold text-[#7a8aa3] dark:text-slate-400">
                    / {plan.period}
                  </span>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={`feat-${idx}`} className="flex items-start gap-2 text-xs text-[#3d4e6b] dark:text-slate-300">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-[8px] flex-shrink-0 mt-0.5">
                        <i className="fas fa-check"></i>
                      </div>
                      <span className="font-medium text-[#0b1a33] dark:text-slate-200 leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href={`/pricing?plan=${plan.id}`}
                  className={`w-full py-2.5 sm:py-3 rounded-full font-semibold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                    plan.popular
                      ? "bg-[#0a66ff] hover:bg-[#084bc2] text-white shadow-md shadow-[#0a66ff]/25 hover:shadow-lg hover:shadow-[#0a66ff]/35 hover:-translate-y-0.5"
                      : "bg-slate-50 dark:bg-[#142642] hover:bg-white dark:hover:bg-[#1b335a] text-[#0b1a33] dark:text-white hover:text-[#0a66ff] border border-slate-200 dark:border-slate-700 hover:border-[#0a66ff]/40 shadow-xs"
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <i className="fas fa-arrow-right text-[9px]"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Campus & Department Horizontal Card */}
        <div className="rounded-3xl p-5 sm:p-7 bg-[#f8faff] dark:bg-[#0f1d32] border border-[#0a66ff]/20 dark:border-slate-800 shadow-[0_12px_36px_rgba(10,102,255,0.06)] flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0b1a33] dark:bg-[#0a66ff] text-white flex items-center justify-center text-xl flex-shrink-0 shadow-xs">
              <i className="fas fa-school"></i>
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-xs font-bold text-[#0a66ff] dark:text-[#38bdf8] uppercase tracking-wider">
                  Campus & Department Cohorts
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-[#0a66ff] dark:text-[#38bdf8]">
                  Custom
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#3d4e6b] dark:text-slate-300 leading-relaxed">
                Faculty dashboards, bulk student verification, and department-wide syllabus auto-sync.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/2349027874036?text=Hello%20MyPact,%20I%20am%20interested%20in%20Campus%20and%20Department%20plans"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-[#0b1a33] dark:bg-[#0a66ff] hover:bg-[#1b2f4f] dark:hover:bg-[#084bc2] text-white font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Contact Campus Sales</span>
            <i className="fas fa-arrow-right text-[10px]"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
