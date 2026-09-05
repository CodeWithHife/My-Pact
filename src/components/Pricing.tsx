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
    id: "starter",
    name: "Starter",
    price: "₦0",
    period: "forever",
    description: "Essential physical alarms & basic accountability.",
    icon: "fas fa-shield-halved",
    iconColor: "text-slate-600 bg-slate-100",
    buttonText: "Get Started Free",
    popular: false,
    features: [
      "Basic Task Scheduling",
      "Unstoppable Physical Alarms",
      "Weekly Discipline Audit",
      "AI Assistant (10 prompts/day)",
    ],
  },
  {
    id: "weekly",
    name: "Weekly Sprint",
    badge: "Most Popular",
    popular: true,
    price: "₦700",
    period: "per week",
    description: "Highest student adoption for exam sprints & tests.",
    icon: "fas fa-bolt",
    iconColor: "text-[#0a66ff] bg-[#e8f0fe]",
    buttonText: "Start Weekly Pass",
    features: [
      "Everything in Starter",
      "Syllabus Auto-Extractor",
      "Level 2 & 3 App Lockouts",
      "Coursework AI Assistant",
      "Grade Goal Calculator",
    ],
  },
  {
    id: "pro",
    name: "Semester Pro",
    badge: "Best Value",
    price: "₦1,500",
    period: "per month",
    description: "Full AI & zero-tolerance accountability suite.",
    icon: "fas fa-crown",
    iconColor: "text-purple-600 bg-purple-50",
    buttonText: "Start Pro Plan",
    popular: false,
    features: [
      "Everything in Weekly Sprint",
      "Unlimited AI Syllabus Extractions",
      "Unlimited Coursework Assistant",
      "Accountability Partner Circle",
      "Priority WhatsApp & Email Support",
    ],
  },
];

export default function Pricing() {
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

  return (
    <section 
      id="pricing" 
      ref={sectionRef}
      className="py-20 sm:py-24 bg-[#ffffff] border-b border-slate-100 relative overflow-hidden"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0a66ff]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-3.5 border border-[#0a66ff]/20 shadow-xs">
            <i className="fas fa-tag text-[#0a66ff]"></i>
            <span>Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-3">
            Choose your <span className="text-[#0a66ff]">accountability level</span>.
          </h2>
          <p className="text-sm sm:text-base text-[#3d4e6b] leading-relaxed">
            Budget-friendly student pricing designed for academic achievement in Nigerian universities.
          </p>
        </div>

        {/* 3 Main Compact, Highly-Styled Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch max-w-5xl mx-auto mb-10 transition-all duration-800 delay-150 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
          {mainPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between relative ${
                plan.popular
                  ? "bg-white border-2 border-[#0a66ff] shadow-[0_20px_50px_rgba(10,102,255,0.14)] ring-4 ring-[#0a66ff]/10 -translate-y-1 sm:-translate-y-2"
                  : "bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-300"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs ${
                      plan.popular
                        ? "bg-[#0a66ff] text-white"
                        : "bg-amber-100 text-amber-900 border border-amber-200"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Header: Icon + Plan Name */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-base shadow-xs ${plan.iconColor}`}
                    >
                      <i className={plan.icon}></i>
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-[#0b1a33] tracking-tight">
                        {plan.name}
                      </h3>
                      <p className="text-[11px] text-[#7a8aa3]">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div className="my-5 py-3 border-y border-slate-100 flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-[#0b1a33] tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs font-bold text-[#7a8aa3]">
                    / {plan.period}
                  </span>
                </div>

                {/* Compact Feature Bullet Points */}
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={`feat-${idx}`} className="flex items-center gap-2.5 text-xs text-[#3d4e6b]">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[9px] flex-shrink-0">
                        <i className="fas fa-check"></i>
                      </div>
                      <span className="font-medium text-[#0b1a33]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div>
                <Link
                  href="/signup"
                  className={`w-full py-3 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                    plan.popular
                      ? "bg-[#0a66ff] hover:bg-[#084bc2] text-white shadow-md shadow-[#0a66ff]/25 hover:shadow-lg hover:shadow-[#0a66ff]/35 hover:-translate-y-0.5"
                      : "bg-slate-50 hover:bg-white text-[#0b1a33] hover:text-[#0a66ff] border border-slate-200 hover:border-[#0a66ff]/40 shadow-xs"
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <i className="fas fa-arrow-right text-[10px]"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Campus & Department Horizontal Banner Card */}
        <div className="max-w-5xl mx-auto rounded-3xl p-6 sm:p-7 bg-[#f8faff] border border-[#0a66ff]/20 shadow-[0_12px_36px_rgba(10,102,255,0.06)] flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0b1a33] text-white flex items-center justify-center text-xl flex-shrink-0 shadow-xs">
              <i className="fas fa-school"></i>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold text-[#0a66ff] uppercase tracking-wider">
                  Campus & University Departments
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 text-[#0a66ff]">
                  Custom Plan
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#3d4e6b] leading-relaxed">
                Faculty admin dashboards, bulk student LMS onboarding, and cohort-wide early at-risk detection.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/2349027874036?text=Hello%20MyPact,%20I%20am%20interested%20in%20Campus%20and%20Department%20plans"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-6 py-3 rounded-full bg-[#0b1a33] hover:bg-[#1b2f4f] text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Contact Campus Sales</span>
            <i className="fas fa-arrow-right text-[10px]"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
