"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavLinkItem {
  label: string;
  href: string;
}

const navLinks: NavLinkItem[] = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Community", href: "#community" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_4px_24px_rgba(10,102,255,0.08)] border-b border-[#0a66ff]/10 py-3.5"
          : "bg-white/70 backdrop-blur-sm border-b border-[#e6edf5]/60 py-4.5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-all duration-200"
            aria-label="MyPact Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] overflow-hidden bg-[#0a66ff] flex items-center justify-center shadow-md shadow-[#0a66ff]/25 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo/mypact_icon.svg"
                alt="MyPact Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-2xl sm:text-[1.65rem] text-[#0b1a33] tracking-[-0.03em] leading-none">
                My<span className="text-[#0a66ff]">Pact</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link font-medium text-[0.95rem] text-[#3d4e6b] hover:text-[#0a66ff] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Initial Action Buttons with FontAwesome Icons */}
          <div className="flex items-center gap-3">
            {/* Log In Button (Outline with icon) */}
            <a
              href="#login"
              className="btn-mypact-outline hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-tight cursor-pointer"
            >
              <i className="fas fa-sign-in-alt text-xs"></i>
              <span>Log In</span>
            </a>

            {/* Get Started Button (Primary with icon) */}
            <a
              href="#get-started"
              className="btn-mypact-primary inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold tracking-tight cursor-pointer"
            >
              <i className="fas fa-user-plus text-xs"></i>
              <span>Get Started</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-slate-100/80 hover:bg-[#e8f0fe] text-[#0b1a33] transition-colors duration-200 focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`h-0.5 bg-[#0b1a33] rounded-full transition-all duration-300 origin-left ${
                    mobileMenuOpen ? "rotate-45 translate-x-0.5 -translate-y-0.5" : ""
                  }`}
                />
                <span
                  className={`h-0.5 bg-[#0b1a33] rounded-full transition-all duration-200 ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`h-0.5 bg-[#0b1a33] rounded-full transition-all duration-300 origin-left ${
                    mobileMenuOpen ? "-rotate-45 translate-x-0.5 translate-y-0.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "max-h-[460px] opacity-100 border-b border-[#e6edf5] bg-white/95 backdrop-blur-xl shadow-lg mt-3"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col gap-3">
          <div className="flex flex-col divide-y divide-slate-100">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="flex items-center justify-between py-3 text-[1rem] font-medium text-[#3d4e6b] hover:text-[#0a66ff] transition-colors"
              >
                <span>{link.label}</span>
                <i className="fas fa-chevron-right text-xs text-slate-300"></i>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <a
              href="#login"
              onClick={closeMobileMenu}
              className="btn-mypact-outline flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-sm font-semibold"
            >
              <i className="fas fa-sign-in-alt text-xs"></i>
              <span>Log In</span>
            </a>
            <a
              href="#get-started"
              onClick={closeMobileMenu}
              className="btn-mypact-primary flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-sm font-semibold"
            >
              <i className="fas fa-user-plus text-xs"></i>
              <span>Get Started</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
