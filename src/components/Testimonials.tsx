"use client";

import React from "react";

interface Testimonial {
  name: string;
  role: string;
  university: string;
  quote: string;
  avatarColor: string;
  initials: string;
  gpa: string;
}

const rowOneTestimonials: Testimonial[] = [
  {
    name: "Chidiebere Okafor",
    role: "400L Mechanical Engineering",
    university: "University of Lagos (UNILAG)",
    quote: "MyPact completely transformed my semester. The math verification challenge stops me from dismissing alarms half-asleep. Moved from a 3.2 to 4.75 GPA.",
    avatarColor: "bg-[#0a66ff]",
    initials: "CO",
    gpa: "4.75 CGPA",
  },
  {
    name: "Amina Bello",
    role: "300L Medicine & Surgery",
    university: "Ahmadu Bello University (ABU)",
    quote: "Studying for Anatomy and Pharmacology used to be pure stress. The AI syllabus extractor scheduled my entire semester into daily micro-blocks.",
    avatarColor: "bg-emerald-600",
    initials: "AB",
    gpa: "Top 5% Cohort",
  },
  {
    name: "Tobi Adeyemi",
    role: "500L Software Engineering",
    university: "FUTA Akure",
    quote: "The Level 2 app lockout is ruthless in the best way. No more mindless scrolling on Instagram and X when I'm scheduled to write code.",
    avatarColor: "bg-indigo-600",
    initials: "TA",
    gpa: "First Class",
  },
  {
    name: "Ngozi Eze",
    role: "Final Year Pharmacy",
    university: "University of Nigeria, Nsukka (UNN)",
    quote: "My study partner gets an instant SMS alert if I miss a session. That social pressure alone keeps me disciplined every single morning.",
    avatarColor: "bg-purple-600",
    initials: "NE",
    gpa: "4.82 CGPA",
  },
];

const rowTwoTestimonials: Testimonial[] = [
  {
    name: "Femi Olumide",
    role: "400L Computer Science",
    university: "University of Ibadan (UI)",
    quote: "The weekly discipline audit report showed me I was losing 3.5 hours every Sunday evening. Fixed my routine and hit First Class honours.",
    avatarColor: "bg-amber-600",
    initials: "FO",
    gpa: "First Class",
  },
  {
    name: "Zainab Usman",
    role: "300L Accounting & Finance",
    university: "Bayero University Kano (BUK)",
    quote: "The coursework AI assistant trained on our exact lecture PDF slides explained taxation concepts better than 2-hour tutorial marathons.",
    avatarColor: "bg-teal-600",
    initials: "ZU",
    gpa: "4.60 CGPA",
  },
  {
    name: "Kelechi Nnamdi",
    role: "400L Electrical Engineering",
    university: "Covenant University",
    quote: "Zero-consequence procrastination is dead with MyPact. It enforces your commitments like a strict personal academic coach.",
    avatarColor: "bg-blue-600",
    initials: "KN",
    gpa: "4.91 CGPA",
  },
  {
    name: "Blessing Ayomide",
    role: "200L Faculty of Law",
    university: "Obafemi Awolowo University (OAU)",
    quote: "Barcode scanning my constitutional law textbook at 5:30 AM forced me out of bed without snoozing. My retention has doubled.",
    avatarColor: "bg-rose-600",
    initials: "BA",
    gpa: "Top of Class",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0a66ff]/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0a66ff]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10 mb-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0a66ff]/20 shadow-xs">
            <i className="fas fa-quote-left text-[#0a66ff]"></i>
            <span>Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
            What ambitious students are <span className="text-[#0a66ff]">saying</span>.
          </h2>
          <p className="text-base sm:text-lg text-[#3d4e6b] leading-relaxed">
            Real stories from students across universities who have transformed their academic discipline and GPA with MyPact.
          </p>
        </div>
      </div>

      {/* Dual Opposite Scrolling Testimonials Carousel */}
      <div className="space-y-6 relative">
        {/* Left & Right Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        {/* Row 1: Scrolling Left */}
        <div className="animate-marquee-left flex items-center gap-6">
          {/* Loop 1 */}
          {rowOneTestimonials.map((item, idx) => (
            <div
              key={`row1-item1-${idx}`}
              className="w-[340px] sm:w-[400px] p-6 rounded-3xl bg-[#f8faff] border border-slate-200/90 shadow-[0_12px_36px_rgba(10,102,255,0.06)] hover:shadow-[0_20px_48px_rgba(10,102,255,0.12)] hover:border-[#0a66ff]/30 transition-all duration-300 flex-shrink-0 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars Rating & GPA Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 text-xs gap-1">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {item.gpa}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-[#3d4e6b] leading-relaxed mb-5 italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Identity */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
                <div
                  className={`w-10 h-10 rounded-full ${item.avatarColor} text-white flex items-center justify-center text-xs font-black shadow-xs flex-shrink-0`}
                >
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0b1a33]">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {item.role} · {item.university}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Duplicate Loop for Seamless Infinite Scroll */}
          {rowOneTestimonials.map((item, idx) => (
            <div
              key={`row1-item2-${idx}`}
              className="w-[340px] sm:w-[400px] p-6 rounded-3xl bg-[#f8faff] border border-slate-200/90 shadow-[0_12px_36px_rgba(10,102,255,0.06)] hover:shadow-[0_20px_48px_rgba(10,102,255,0.12)] hover:border-[#0a66ff]/30 transition-all duration-300 flex-shrink-0 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 text-xs gap-1">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {item.gpa}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#3d4e6b] leading-relaxed mb-5 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
                <div
                  className={`w-10 h-10 rounded-full ${item.avatarColor} text-white flex items-center justify-center text-xs font-black shadow-xs flex-shrink-0`}
                >
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0b1a33]">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {item.role} · {item.university}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Scrolling in OPPOSITE Direction (Moving Right) */}
        <div className="animate-marquee-right flex items-center gap-6">
          {/* Loop 1 */}
          {rowTwoTestimonials.map((item, idx) => (
            <div
              key={`row2-item1-${idx}`}
              className="w-[340px] sm:w-[400px] p-6 rounded-3xl bg-[#f8faff] border border-slate-200/90 shadow-[0_12px_36px_rgba(10,102,255,0.06)] hover:shadow-[0_20px_48px_rgba(10,102,255,0.12)] hover:border-[#0a66ff]/30 transition-all duration-300 flex-shrink-0 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 text-xs gap-1">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {item.gpa}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#3d4e6b] leading-relaxed mb-5 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
                <div
                  className={`w-10 h-10 rounded-full ${item.avatarColor} text-white flex items-center justify-center text-xs font-black shadow-xs flex-shrink-0`}
                >
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0b1a33]">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {item.role} · {item.university}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Duplicate Loop for Seamless Infinite Scroll */}
          {rowTwoTestimonials.map((item, idx) => (
            <div
              key={`row2-item2-${idx}`}
              className="w-[340px] sm:w-[400px] p-6 rounded-3xl bg-[#f8faff] border border-slate-200/90 shadow-[0_12px_36px_rgba(10,102,255,0.06)] hover:shadow-[0_20px_48px_rgba(10,102,255,0.12)] hover:border-[#0a66ff]/30 transition-all duration-300 flex-shrink-0 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 text-xs gap-1">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {item.gpa}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#3d4e6b] leading-relaxed mb-5 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
                <div
                  className={`w-10 h-10 rounded-full ${item.avatarColor} text-white flex items-center justify-center text-xs font-black shadow-xs flex-shrink-0`}
                >
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0b1a33]">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {item.role} · {item.university}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
