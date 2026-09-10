"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function PWAInstallPrompt() {
  const router = useRouter();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. Check if currently running inside standalone PWA mode
    const isRunningStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      window.location.search.includes("source=pwa") ||
      window.location.search.includes("mode=pwa") ||
      document.referrer.includes("android-app://");

    if (isRunningStandalone) {
      setIsStandalone(true);
      return;
    }

    // 2. Check if previously marked as installed
    const previouslyInstalled = localStorage.getItem("mypact_pwa_installed") === "true";
    if (previouslyInstalled) {
      setIsInstalled(true);
    }

    // 3. Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 4. Listen for native browser installation event
    const handleAppInstalled = () => {
      localStorage.setItem("mypact_pwa_installed", "true");
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    // 5. Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!previouslyInstalled) {
        setShowBanner(true);
      }
    };

    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 6. Show prompt banner after brief delay on first entry if not dismissed in session
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem("mypact_pwa_dismissed");
      if (!dismissed && !isRunningStandalone) {
        setShowBanner(true);
      }
    }, 1200);

    // 7. Custom trigger listener from any button
    const handleCustomOpen = () => {
      if (previouslyInstalled || isInstalled) {
        router.push("/dashboard");
      } else if (isIosDevice) {
        setShowIOSModal(true);
      } else if (deferredPrompt) {
        deferredPrompt.prompt();
      } else {
        setShowBanner(true);
      }
    };

    window.addEventListener("open-pwa-install", handleCustomOpen);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("open-pwa-install", handleCustomOpen);
      clearTimeout(timer);
    };
  }, [deferredPrompt, isInstalled, router]);

  const handleInstallClick = async () => {
    if (isInstalled) {
      // If already installed, directly open/go to the app
      router.push("/dashboard");
      return;
    }

    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        localStorage.setItem("mypact_pwa_installed", "true");
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowIOSModal(true);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem("mypact_pwa_dismissed", "true");
  };

  // If already running standalone, hide the install banner entirely
  if (isStandalone || (!showBanner && !showIOSModal)) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom PWA Banner */}
      {showBanner && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-white/95 backdrop-blur-xl border border-[#0a66ff]/25 rounded-2xl p-4 sm:p-4.5 shadow-[0_12px_40px_rgba(10,102,255,0.22)] ring-1 ring-[#0a66ff]/10 flex items-center justify-between gap-3.5">
            {/* App Icon with Glow Badge */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-[#0a66ff] flex items-center justify-center shadow-md shadow-[#0a66ff]/30 overflow-hidden">
                <Image
                  src="/logo/mypact_icon.svg"
                  alt="MyPact App Icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            {/* App Title & Benefits / Status */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-extrabold text-sm text-[#0b1a33] truncate">
                  {isInstalled ? "MyPact App Installed" : "Install MyPact App"}
                </h4>
                <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                  isInstalled ? "bg-emerald-50 text-emerald-600" : "bg-[#e8f0fe] text-[#0a66ff]"
                }`}>
                  {isInstalled ? "Ready" : "Fast"}
                </span>
              </div>
              <p className="text-xs text-[#526484] leading-tight mt-0.5 line-clamp-2">
                {isInstalled
                  ? "Launch your installed app for full-screen study focus & physical alarms."
                  : "Offline study timetables & unstoppable physical alarms on your home screen."}
              </p>
            </div>

            {/* Action Buttons: "Go to App" if installed, "Install" if not installed */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {isInstalled ? (
                <Link
                  href="/dashboard"
                  onClick={() => setShowBanner(false)}
                  className="px-3.5 py-2 rounded-xl bg-[#0a66ff] hover:bg-[#084bc2] text-white font-bold text-xs shadow-md shadow-[#0a66ff]/25 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <i className="fas fa-arrow-up-right-from-square text-[11px]"></i>
                  <span>Go to App</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="px-3.5 py-2 rounded-xl bg-[#0a66ff] hover:bg-[#084bc2] text-white font-bold text-xs shadow-md shadow-[#0a66ff]/25 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <i className="fas fa-download text-[11px]"></i>
                  <span>Install</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleDismiss}
                className="w-8 h-8 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Dismiss banner"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS / Manual Add to Home Screen Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-slate-100 relative">
            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0a66ff] flex items-center justify-center shadow-md shadow-[#0a66ff]/25">
                <Image
                  src="/logo/mypact_icon.svg"
                  alt="MyPact Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#0b1a33]">
                  {isInstalled ? "Launch MyPact" : "Install MyPact"}
                </h3>
                <p className="text-xs text-[#7a8aa3]">
                  {isInstalled ? "App is installed on your device" : "Install directly to your device home screen"}
                </p>
              </div>
            </div>

            {isInstalled ? (
              <div className="py-4 space-y-4 text-center">
                <p className="text-xs text-slate-600">
                  You have already added MyPact to your home screen. Open your dashboard directly below.
                </p>
                <Link
                  href="/dashboard"
                  onClick={() => setShowIOSModal(false)}
                  className="w-full py-3 rounded-full bg-[#0a66ff] hover:bg-[#084bc2] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fas fa-arrow-up-right-from-square text-xs"></i>
                  <span>Go to App</span>
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-3 my-5 text-xs text-[#3d4e6b]">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f8faff] border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-[#0a66ff] text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-[#0b1a33]">
                        Tap the Share button
                      </p>
                      <p className="text-slate-500 mt-0.5 flex items-center gap-1.5">
                        Look for the <i className="fas fa-arrow-up-from-bracket text-[#0a66ff]"></i> icon at the bottom of Safari/Chrome.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f8faff] border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-[#0a66ff] text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-[#0b1a33]">
                        Select "Add to Home Screen"
                      </p>
                      <p className="text-slate-500 mt-0.5 flex items-center gap-1.5">
                        Scroll down and tap <i className="far fa-plus-square text-[#0a66ff]"></i> <strong>Add to Home Screen</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f8faff] border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-[#0a66ff] text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-[#0b1a33]">
                        Launch from Home Screen
                      </p>
                      <p className="text-slate-500 mt-0.5">
                        Open MyPact instantly with full offline access & zero browser address bars!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.setItem("mypact_pwa_installed", "true");
                      setIsInstalled(true);
                      setShowIOSModal(false);
                    }}
                    className="flex-1 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer text-center"
                  >
                    I Installed It
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowIOSModal(false)}
                    className="flex-1 py-2.5 rounded-full bg-[#0a66ff] hover:bg-[#084bc2] text-white text-xs font-bold transition-all shadow-md cursor-pointer text-center"
                  >
                    Got It
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
