"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import WhyMyPact from "@/components/WhyMyPact";
import FeaturesDeepDive from "@/components/FeaturesDeepDive";
import TargetAudience from "@/components/TargetAudience";
import Integrations from "@/components/Integrations";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Community from "@/components/Community";
import Footer from "@/components/Footer";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

export default function Home() {
  const router = useRouter();
  const [isPwaMode, setIsPwaMode] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if app is running in standalone PWA mode (downloaded on phone / desktop)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true ||
      window.location.search.includes("source=pwa") ||
      window.location.search.includes("mode=pwa") ||
      document.referrer.includes("android-app://");

    if (isStandalone) {
      // Check if user already exists
      const existingUser = localStorage.getItem("mypact_user");
      if (existingUser) {
        router.replace("/dashboard");
        return;
      }
      setIsPwaMode(true);
    } else {
      setIsPwaMode(false);
    }
  }, [router]);

  // If in PWA mode, show the streamlined App Welcome & Get Started Screen
  if (isPwaMode === true) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0b1a33] via-[#0f2444] to-[#071326] text-white flex flex-col justify-between p-6 sm:p-10 select-none animate-fadeIn">
        {/* Top Branding Pill */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto pt-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0a66ff] flex items-center justify-center text-white shadow-md shadow-[#0a66ff]/30">
              <Image
                src="/logo/mypact_icon.svg"
                alt="MyPact"
                width={20}
                height={20}
                className="w-4 h-4 object-contain"
              />
            </div>
            <span className="text-sm font-black tracking-tight text-white">MyPact</span>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-[#5b9aff] border border-blue-500/30 text-[0.62rem] font-black uppercase tracking-wider">
            Mobile App
          </span>
        </div>

        {/* Center: Hero Identity & Core Feature Highlights */}
        <div className="w-full max-w-md mx-auto my-auto py-8 text-center space-y-6">
          {/* Glowing App Icon Container */}
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-[#0a66ff]/25 blur-xl animate-pulse"></div>
            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#0a66ff] to-[#7c3aed] flex items-center justify-center shadow-2xl border border-white/20">
              <Image
                src="/logo/mypact_icon.svg"
                alt="MyPact"
                width={56}
                height={56}
                className="w-14 h-14 object-contain drop-shadow-md"
              />
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome to <span className="text-[#5b9aff]">MyPact</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xs mx-auto leading-relaxed">
              Student Academic Accountability & Study Commitment Enforcement
            </p>
          </div>

          {/* Feature Highlights Pills */}
          <div className="space-y-2.5 max-w-xs mx-auto text-left pt-2">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-xl bg-[#0a66ff]/20 text-[#5b9aff] flex items-center justify-center text-xs shrink-0">
                <i className="fas fa-bell"></i>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-extrabold text-white block">Unstoppable Alarms</span>
                <span className="text-[0.65rem] text-slate-400 block truncate">Disarm via math or recall proof</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs shrink-0">
                <i className="fas fa-file-pdf"></i>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-extrabold text-white block">AI Syllabus Timetable</span>
                <span className="text-[0.65rem] text-slate-400 block truncate">Upload outline to synthesize schedule</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs shrink-0">
                <i className="fab fa-whatsapp"></i>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-extrabold text-white block">Partner Escalation</span>
                <span className="text-[0.65rem] text-slate-400 block truncate">WhatsApp alert on snooze</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="w-full max-w-md mx-auto space-y-3 pb-4">
          <Link
            href="/signup"
            className="w-full py-3.5 px-6 rounded-2xl bg-[#0a66ff] hover:bg-[#0052cc] text-white font-black text-sm text-center shadow-lg shadow-[#0a66ff]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Get Started</span>
            <i className="fas fa-arrow-right text-xs"></i>
          </Link>

          <div className="text-center">
            <Link
              href="/login"
              className="text-xs text-slate-400 hover:text-white font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <span>Already have an account?</span>
              <span className="text-[#5b9aff] underline underline-offset-2">Sign In</span>
            </Link>
          </div>

          <div className="pt-2 text-center text-[0.62rem] text-slate-500 flex items-center justify-center gap-1.5">
            <i className="fas fa-shield-halved text-[#0a66ff] text-[0.6rem]"></i>
            <span>Zero-Deviation Academic Integrity Protection</span>
          </div>
        </div>
      </div>
    );
  }

  // Standard Web Landing Page
  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#0b1a33]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <WhyMyPact />
        <FeaturesDeepDive />
        <TargetAudience />
        <Integrations />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Community />
      </main>
      <Footer />
      <PWAInstallPrompt />
    </div>
  );
}
