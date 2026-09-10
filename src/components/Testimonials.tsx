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
    quote: "The math verification challenge stops me from dismissing alarms half-asleep. Moved from a 3.2 to 4.75 GPA.",
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
    <section id="testimonials" className="py-24 bg-[#f8faff] border-b border-slate-100 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0a66ff]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10 mb-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0a66ff]/20">
            <i className="fas fa-quote-left text-[#0a66ff]"></i>
            <span>Verified Student Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
            Proven results across <span className="text-[#0a66ff]">Nigerian universities</span>.
          </h2>
          <p className="text-base sm:text-lg text-[#3d4e6b] leading-relaxed">
            Real students who traded endless snooze delays for First Class discipline.
          </p>
        </div>

        {/* Featured Student Milestone Anchor Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-7 sm:p-9 border border-[#0a66ff]/25 shadow-[0_20px_50px_rgba(10,102,255,0.08)] mb-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-amber-400 text-xs gap-1">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <span className="text-[11px] font-black uppercase text-[#0a66ff] bg-[#e8f0fe] px-2.5 py-0.5 rounded-full">
                  Featured Milestone Story
                </span>
              </div>
              <blockquote className="text-base sm:text-lg font-bold text-[#0b1a33] leading-relaxed mb-4 italic">
                "MyPact fundamentally changed how I approach engineering. The ISBN barcode scan forces me to stand up, turn on the lights, and sit at my study desk. I went from a 3.2 CGPA to 4.75."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#0a66ff] text-white flex items-center justify-center font-black text-sm shadow-xs">
                  CO
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0b1a33]">Chidiebere Okafor</h4>
                  <p className="text-xs text-slate-500 font-medium">400L Mechanical Engineering · UNILAG</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-[#f8faff] rounded-2xl p-5 border border-slate-200 text-center">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Semester Turnaround
              </div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight">
                3.2 → 4.75
              </div>
              <div className="text-xs font-bold text-[#0b1a33] mt-1">First Class CGPA</div>
              <div className="text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-200">
                142 study sessions verified with 0 overrides
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Opposite Scrolling Marquee */}
      <div className="space-y-5 relative">
        {/* Left & Right Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#f8faff] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#f8faff] to-transparent z-20 pointer-events-none" />

        {/* Row 1: Scrolling Left */}
        <div className="animate-marquee-left flex items-center gap-5">
          {rowOneTestimonials.concat(rowOneTestimonials).map((item, idx) => (
            <div
              key={`row1-${idx}`}
              className="w-[320px] sm:w-[380px] p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#0a66ff]/30 transition-all flex-shrink-0 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400 text-xs gap-0.5">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {item.gpa}
                  </span>
                </div>
                <p className="text-xs text-[#3d4e6b] leading-relaxed mb-4 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className={`w-8 h-8 rounded-full ${item.avatarColor} text-white flex items-center justify-center text-xs font-black shadow-xs flex-shrink-0`}>
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0b1a33]">{item.name}</h4>
                  <p className="text-[10px] text-slate-500">{item.role} · {item.university}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="animate-marquee-right flex items-center gap-5">
          {rowTwoTestimonials.concat(rowTwoTestimonials).map((item, idx) => (
            <div
              key={`row2-${idx}`}
              className="w-[320px] sm:w-[380px] p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#0a66ff]/30 transition-all flex-shrink-0 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400 text-xs gap-0.5">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {item.gpa}
                  </span>
                </div>
                <p className="text-xs text-[#3d4e6b] leading-relaxed mb-4 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className={`w-8 h-8 rounded-full ${item.avatarColor} text-white flex items-center justify-center text-xs font-black shadow-xs flex-shrink-0`}>
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0b1a33]">{item.name}</h4>
                  <p className="text-[10px] text-slate-500">{item.role} · {item.university}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
