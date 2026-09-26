"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: "Overview", icon: "fas fa-gauge", href: "/admin" },
  { label: "Students", icon: "fas fa-users", href: "/admin/users" },
  { label: "Payments", icon: "fas fa-receipt", href: "/admin/payments" },
  { label: "Plans", icon: "fas fa-tags", href: "/admin/plans" },
  { label: "Courses", icon: "fas fa-book-open", href: "/admin/courses" },
  { label: "Resources", icon: "fas fa-folder-open", href: "/admin/resources" },
  { label: "Activity", icon: "fas fa-chart-line", href: "/admin/activity" },
  { label: "Announcements", icon: "fas fa-bullhorn", href: "/admin/announcements" },
  { label: "Support", icon: "fas fa-headset", href: "/admin/support" },
  { label: "Audit Logs", icon: "fas fa-shield-halved", href: "/admin/audit" },
  { label: "Settings", icon: "fas fa-sliders", href: "/admin/settings" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    async function verifyAdminAccess() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (data.authenticated && data.user && data.user.role === "admin") {
          setAuthorized(true);
          setCurrentUser(data.user);
        } else {
          // Check local storage for quick offline dev fallback
          const stored = localStorage.getItem("mypact_user");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.role === "admin") {
              setAuthorized(true);
              setCurrentUser(parsed);
              return;
            }
          }
          setAuthorized(false);
          router.replace("/login?error=admin_required");
        }
      } catch (e) {
        // Fallback to stored user check
        const stored = localStorage.getItem("mypact_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.role === "admin") {
            setAuthorized(true);
            setCurrentUser(parsed);
            return;
          }
        }
        setAuthorized(false);
        router.replace("/login?error=admin_required");
      }
    }

    verifyAdminAccess();
  }, [router]);

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-[#070f1e] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#0a66ff]/20 text-[#38bdf8] flex items-center justify-center text-xl mb-4 animate-pulse">
          <i className="fas fa-shield-halved"></i>
        </div>
        <h2 className="text-base font-bold text-slate-200 mb-1">Verifying Admin Clearance</h2>
        <p className="text-xs text-slate-400">Authenticating server-side credentials and security role...</p>
      </div>
    );
  }

  if (authorized === false) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070f1e] text-[#0b1a33] dark:text-slate-100 flex flex-col transition-colors">
      {/* Top Universal Admin Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0b162c]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs cursor-pointer"
            >
              <i className={mobileNavOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </button>

            <Link href="/" className="font-black text-xl tracking-tight text-[#0b1a33] dark:text-white">
              My<span className="text-[#0a66ff]">Pact</span>
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[0.65rem] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#0a66ff]/10 text-[#0a66ff] dark:bg-[#38bdf8]/10 dark:text-[#38bdf8] border border-[#0a66ff]/20">
              <i className="fas fa-shield-alt text-[0.6rem]"></i>
              <span>Admin Center</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              <i className="fas fa-graduation-cap text-[0.65rem]"></i>
              <span>Student App</span>
            </Link>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-[#0a66ff] text-white flex items-center justify-center font-black text-xs">
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-[#0b1a33] dark:text-white leading-tight">
                  {currentUser?.name || "Admin"}
                </div>
                <div className="text-[0.65rem] text-[#0a66ff] dark:text-[#38bdf8] font-semibold">Superadmin</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sub-navigation bar on Desktop */}
      <div className="hidden lg:block bg-white dark:bg-[#0f1d32] border-b border-slate-200 dark:border-slate-800 px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? "bg-[#0a66ff] text-white shadow-sm shadow-[#0a66ff]/30"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#142642] hover:text-[#0a66ff] dark:hover:text-[#38bdf8]"
                }`}
              >
                <i className={`${item.icon} text-[0.7rem]`}></i>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileNavOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0f1d32] border-b border-slate-200 dark:border-slate-800 px-4 py-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                    isActive
                      ? "bg-[#0a66ff] text-white"
                      : "bg-slate-50 dark:bg-[#142642] text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <i className={`${item.icon} text-[0.75rem]`}></i>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
