"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl border transition-all duration-300 cursor-pointer ${
        isDark
          ? "bg-[#0f1d32] hover:bg-[#152744] text-amber-300 border-amber-400/30 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
          : "bg-slate-100 hover:bg-[#e8f0fe] text-slate-700 hover:text-[#0a66ff] border-slate-200"
      } ${className}`}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <span className="relative flex items-center justify-center w-5 h-5">
        <i
          className={`fas ${
            isDark ? "fa-sun text-amber-400 rotate-0 scale-100" : "fa-moon text-slate-600 -rotate-12 scale-100"
          } transition-all duration-300 text-xs sm:text-sm`}
        />
      </span>
      {showLabel && (
        <span className="text-xs font-bold tracking-tight select-none">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}
