"use client";

import React, { useState } from "react";
import Image from "next/image";

interface InsightPost {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  readTime: string;
  date: string;
  image: string;
  icon: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
}

const insightPosts: InsightPost[] = [
  {
    id: "post-1",
    category: "Study Skills",
    categoryColor: "bg-[#e8f0fe] text-[#0a66ff]",
    title: "5 Proven Strategies to Beat Procrastination",
    description: "Learn how to structure your physical study environment and leverage active verification to stay focused when motivation dips.",
    readTime: "4 min read",
    date: "Sep 2026",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=380&fit=crop&crop=center",
    icon: "fas fa-stopwatch",
    author: {
      name: "Dr. Olayinka Cole",
      role: "Cognitive Science Lead",
      initials: "OC",
    },
  },
  {
    id: "post-2",
    category: "Technology & AI",
    categoryColor: "bg-cyan-50 text-cyan-700",
    title: "How AI is Transforming Student Success",
    description: "From personalized syllabus extraction to localized lecture tutoring, discover how AI models turn unorganized slide decks into A-grade study plans.",
    readTime: "6 min read",
    date: "Sep 2026",
    image: "https://images.unsplash.com/photo-1531548731165-e6af68b6ae4f?w=600&h=380&fit=crop&crop=center",
    icon: "fas fa-brain",
    author: {
      name: "Ifeoluwa Daniels",
      role: "EdTech Research Fellow",
      initials: "ID",
    },
  },
  {
    id: "post-3",
    category: "Community & Growth",
    categoryColor: "bg-purple-50 text-purple-700",
    title: "Building a Support Network for Academic Success",
    description: "Why assigning accountability partners and peer guardians creates the psychological leverage needed to achieve a First Class degree.",
    readTime: "5 min read",
    date: "Sep 2026",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=380&fit=crop&crop=center",
    icon: "fas fa-user-group",
    author: {
      name: "Emeka Nwosu",
      role: "Student Success Mentor",
      initials: "EN",
    },
  },
];

export default function Insights() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="insights" className="py-24 bg-[#f8faff] border-b border-slate-100 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#0a66ff]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#0a66ff]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0a66ff]/20 shadow-xs">
            <i className="fas fa-newspaper text-[#0a66ff]"></i>
            <span>Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0b1a33] tracking-tight leading-tight mb-4">
            Latest from the <span className="text-[#0a66ff]">blog</span>.
          </h2>
          <p className="text-base sm:text-lg text-[#3d4e6b] leading-relaxed">
            Tips, stories, and research to help university students master their academic life and own their outcomes.
          </p>
        </div>

        {/* 3-Column Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insightPosts.map((post) => (
            <article
              key={post.id}
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-[0_14px_36px_rgba(10,102,255,0.06)] hover:shadow-[0_22px_50px_rgba(10,102,255,0.12)] hover:border-[#0a66ff]/30 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Pill Over Image */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm backdrop-blur-md ${post.categoryColor}`}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                    <i className="fas fa-clock text-[10px] text-[#0a66ff]"></i>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0b1a33] tracking-tight leading-snug mb-3 group-hover:text-[#0a66ff] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3d4e6b] leading-relaxed mb-6">
                    {post.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Author & Read More Link */}
              <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs font-bold shadow-xs">
                    {post.author.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0b1a33] leading-none">
                      {post.author.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {post.author.role}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-[#0a66ff] group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                  <span>Read</span>
                  <i className="fas fa-arrow-right text-[10px]"></i>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
