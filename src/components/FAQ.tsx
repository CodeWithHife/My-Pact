"use client";

import React, { useState, useEffect, useRef } from "react";

interface FAQItem {
  id: number;
  question: string;
  icon: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "How does the app lockout work?",
    icon: "fas fa-lock",
    answer: "When you miss a scheduled study session, MyPact's escalation system triggers a Level 2 lockout. This automatically blocks access to social media, entertainment apps, and other distractions on your phone or computer for a set period, ensuring you stay focused on your academic priorities.",
  },
  {
    id: 2,
    question: "Can I customize the enforcement tiers?",
    icon: "fas fa-sliders-h",
    answer: "Yes. During onboarding, you can select from three enforcement tiers: Mild (gentle reminders), Strict (standard lockouts), or Zero Tolerance (immediate alerts to accountability partners). You can adjust these settings anytime in your account preferences.",
  },
  {
    id: 3,
    question: "Does MyPact integrate with my university calendar?",
    icon: "fas fa-calendar-alt",
    answer: "Absolutely. MyPact syncs with Google Calendar, Apple Calendar, and Microsoft Outlook. The Adaptive Study Scheduler automatically identifies free time slots in your schedule and inserts micro-study blocks to optimize your preparation for upcoming exams and deadlines.",
  },
  {
    id: 4,
    question: "How does the AI Assistant work with my course materials?",
    icon: "fas fa-robot",
    answer: "The Coursework AI Assistant is a localized model trained exclusively on your uploaded lecture slides, class notes, and course textbooks. It provides instant, context-aware tutoring and answers specific questions directly from your syllabus without hallucinating external info.",
  },
  {
    id: 5,
    question: "Is my personal data and course material secure?",
    icon: "fas fa-shield-halved",
    answer: "Yes. MyPact uses end-to-end encryption for all personal data, syllabus PDFs, and study records. We never sell your data to third parties, and you have full control to export or permanently delete your account at any time.",
  },
  {
    id: 6,
    question: "Can I export my discipline audit reports and study logs?",
    icon: "fas fa-file-export",
    answer: "Absolutely. MyPact allows you to export your weekly Discipline Audit Reports, study streak counts, and attendance records as PDF or CSV files. This is great for personal GPA tracking or sharing with academic advisors.",
  },
  {
    id: 7,
    question: "Is MyPact available across Nigerian universities?",
    icon: "fas fa-globe",
    answer: "Yes! MyPact is fully optimized for Nigerian university students across federal, state, and private universities (UNILAG, ABU, FUTA, UI, Covenant, UNN, OAU, BUK, etc.) as well as international universities worldwide.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
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

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 bg-white border-b border-slate-100 relative overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#0a66ff]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0a66ff]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0a66ff]/20 shadow-xs">
            <i className="fas fa-question-circle text-[#0a66ff]"></i>
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
            Frequently Asked <span className="text-[#0a66ff]">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-[#3d4e6b] leading-relaxed">
            Everything you need to know about MyPact's accountability engine, AI syllabus extraction, and app lockouts.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div
          className={`space-y-3.5 transition-all duration-800 delay-150 ease-out mb-14 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#f8faff] border-[#0a66ff]/40 shadow-sm ring-1 ring-[#0a66ff]/20"
                    : "bg-white border-slate-200/90 hover:border-slate-300"
                }`}
              >
                {/* Question Accordion Button */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm flex-shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#0a66ff] text-white shadow-xs"
                          : "bg-[#e8f0fe] text-[#0a66ff]"
                      }`}
                    >
                      <i className={faq.icon}></i>
                    </div>
                    <span className="font-extrabold text-sm sm:text-base text-[#0b1a33] leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  {/* Chevron Icon with Rotation */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#e8f0fe] text-[#0a66ff] rotate-180"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </button>

                {/* Collapsible Answer Drawer */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[300px] opacity-100 pb-6 px-6 sm:px-7" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-xs sm:text-sm text-[#3d4e6b] leading-relaxed pl-12.5 border-t border-slate-200/60 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#f8faff] border border-[#0a66ff]/20 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#0a66ff] text-white flex items-center justify-center text-lg flex-shrink-0 shadow-xs">
              <i className="fas fa-headset"></i>
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#0b1a33]">
                Still have questions?
              </h4>
              <p className="text-xs text-[#7a8aa3]">
                We're here to help you get the most out of your semester.
              </p>
            </div>
          </div>
          <a
            href="mailto:support@mypact.app"
            className="px-6 py-2.5 rounded-full bg-[#0b1a33] hover:bg-[#1a2d4a] text-white font-semibold text-xs shadow-xs transition-all whitespace-nowrap"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
