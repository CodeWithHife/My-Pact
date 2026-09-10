"use client";

import React, { useState } from "react";

interface FAQItem {
  id: number;
  category: "enforcement" | "ai" | "privacy";
  question: string;
  icon: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    category: "enforcement",
    question: "How does the Level 2 app lockout work?",
    icon: "fas fa-lock",
    answer: "When a scheduled study session begins or an alarm goes unverified, MyPact initiates a Level 2 lockout. Distraction apps (social media, video streaming, mobile games) are blocked until you verify completion with your textbook ISBN scan or quiz.",
  },
  {
    id: 2,
    category: "enforcement",
    question: "Can I customize the enforcement tiers?",
    icon: "fas fa-sliders",
    answer: "Yes. During onboarding and anytime in Settings, you can switch between Mild (audio cues), Strict (app lockouts), and Zero Tolerance (automated SMS alerts to your study partner or mentor).",
  },
  {
    id: 3,
    category: "ai",
    question: "How does the AI Syllabus Extractor read my PDFs?",
    icon: "fas fa-file-pdf",
    answer: "Our localized AI parses course outlines, lecture schedules, and syllabus PDFs. It extracts exam weighting, assignment dates, and automatically populates calendar slots with structured study sessions.",
  },
  {
    id: 4,
    category: "ai",
    question: "Is the Coursework AI Assistant trained on my lecture slides?",
    icon: "fas fa-robot",
    answer: "Yes. The AI assistant indexes your uploaded class slides and textbooks, meaning it gives exact, accurate answers strictly grounded in your lecturer's course curriculum without external hallucinations.",
  },
  {
    id: 5,
    category: "privacy",
    question: "Is my personal data and course material secure?",
    icon: "fas fa-shield-halved",
    answer: "Yes. We use end-to-end encryption for all personal study data, syllabus uploads, and guardian numbers. We never sell your data or use your private coursework for public model training.",
  },
  {
    id: 6,
    category: "privacy",
    question: "Can I export my discipline audit reports and study logs?",
    icon: "fas fa-file-export",
    answer: "Yes. You can export complete weekly and monthly Discipline Audit reports as PDF or CSV files for personal GPA tracking or sharing with academic advisors.",
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<"all" | "enforcement" | "ai" | "privacy">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = activeCategory === "all"
    ? faqs
    : faqs.filter((faq) => faq.category === activeCategory);

  const toggleFAQ = (id: number) => {
    setOpenIndex((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#0a66ff]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0a66ff]/20">
            <i className="fas fa-circle-question text-[#0a66ff]"></i>
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
            Frequently Asked <span className="text-[#0a66ff]">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-[#3d4e6b] leading-relaxed">
            Quick clarity on enforcement tiers, AI syllabus parsing, and account setup.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
            {[
              { id: "all", label: "All Questions" },
              { id: "enforcement", label: "Alarms & Lockouts" },
              { id: "ai", label: "AI & Syllabus" },
              { id: "privacy", label: "Security & Export" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#0a66ff] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:text-[#0b1a33]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Responsive FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-14">
          {filteredFaqs.map((faq) => {
            const isOpen = openIndex === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#f8faff] border-[#0a66ff]/40 shadow-sm ring-1 ring-[#0a66ff]/20"
                    : "bg-white border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-3.5 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs flex-shrink-0 transition-colors ${
                      isOpen ? "bg-[#0a66ff] text-white" : "bg-[#e8f0fe] text-[#0a66ff]"
                    }`}>
                      <i className={faq.icon}></i>
                    </div>
                    <span className="font-bold text-sm text-[#0b1a33]">
                      {faq.question}
                    </span>
                  </div>
                  <i className={`fas fa-chevron-down text-xs text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? "rotate-180 text-[#0a66ff]" : ""
                  }`}></i>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#3d4e6b] leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Bar */}
        <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-[#f8faff] border border-[#0a66ff]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#0a66ff] text-white flex items-center justify-center text-base flex-shrink-0 shadow-xs">
              <i className="fas fa-headset"></i>
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#0b1a33]">Need personalized assistance?</h4>
              <p className="text-xs text-slate-500">Our student support team is active on WhatsApp and email.</p>
            </div>
          </div>
          <a
            href="https://wa.me/2349027874036?text=Hello%20MyPact%20Support,%20I%20have%20a%20question"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full bg-[#0b1a33] hover:bg-[#1a2d4a] text-white font-semibold text-xs shadow-xs transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer"
          >
            <i className="fab fa-whatsapp text-emerald-400"></i>
            <span>Chat On WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
