"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Call To Action Banner Section */}
      <section id="get-started" className="py-20 bg-gradient-to-r from-[#0a66ff] via-[#084bc2] to-[#0b1a33] text-white relative overflow-hidden">
        {/* Subtle Radial Lights */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0a66ff]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1000px] mx-auto px-5 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-5 backdrop-blur-sm border border-white/15">
            <i className="fas fa-bolt text-amber-300"></i>
            <span>Own Your Semester</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-5 leading-tight">
            Ready to stop snoozing?
          </h2>
          <p className="text-base sm:text-lg text-blue-100 max-w-xl mx-auto mb-9 leading-relaxed">
            Join thousands of students who have transformed their study discipline and GPA with uncompromising accountability.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 items-center justify-center">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-white text-[#0a66ff] hover:bg-[#e8f0fe] font-bold text-base shadow-[0_12px_36px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <i className="fas fa-rocket text-sm"></i>
              <span>Start Your Free Trial</span>
            </Link>
            <a
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-base border border-white/20 backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Pricing</span>
            </a>
          </div>

          <div className="mt-6 text-xs text-blue-200 font-medium">
            No credit card required for Starter tier · Switch or cancel anytime
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-[#0b1a33] text-slate-400 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
            {/* Brand Column */}
            <div className="lg:col-span-2 flex flex-col items-start">
              <Link href="/" className="flex items-center gap-2.5 mb-4 group" aria-label="MyPact Home">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#0a66ff] flex items-center justify-center shadow-sm">
                  <Image
                    src="/logo/mypact_icon.svg"
                    alt="MyPact Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-extrabold text-2xl text-white tracking-[-0.03em]">
                  My<span className="text-[#0a66ff]">Pact</span>
                </span>
              </Link>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
                Uncompromising student management and academic accountability platform. Enforcing study commitments with active verification and zero-tolerance alarms.
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>All Systems Operational</span>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#why-mypact" className="hover:text-white transition-colors">
                    Why MyPact
                  </a>
                </li>
                <li>
                  <a href="#how" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Pricing Plans
                  </a>
                </li>
                <li>
                  <a href="#integrations" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            {/* Community Links */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                Community
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <a href="#testimonials" className="hover:text-white transition-colors">
                    Student Reviews
                  </a>
                </li>
                <li>
                  <a href="#audience" className="hover:text-white transition-colors">
                    For Educators
                  </a>
                </li>
                <li>
                  <a href="#community" className="hover:text-white transition-colors">
                    Campus Circles
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                Support & Legal
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <a
                    href="https://wa.me/2349027874036?text=Hello%20MyPact%20Support,%20I%20need%20assistance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-white transition-colors">
                    Security Architecture
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} MyPact Inc. All rights reserved. Built for student achievement.
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
