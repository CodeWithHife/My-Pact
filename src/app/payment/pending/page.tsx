"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

function PaymentPendingContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "PACT-XXXXXX";
  const plan = searchParams.get("plan") || "Scholar Pro";
  const amount = searchParams.get("amount") || "1,500";

  const [paymentStatus, setPaymentStatus] = useState<string>("pending");
  const [checking, setChecking] = useState(false);
  const [checkMessage, setCheckMessage] = useState("");

  const checkStatus = async () => {
    setChecking(true);
    setCheckMessage("");
    try {
      const res = await fetch(`/api/payments/status?ref=${encodeURIComponent(ref)}`);
      const data = await res.json();
      if (data.success && data.payment) {
        setPaymentStatus(data.payment.status);
        if (data.payment.status === "approved") {
          setCheckMessage("Your payment has been verified! Your plan is active.");
        } else if (data.payment.status === "rejected") {
          setCheckMessage("Payment verification was rejected. Reason: " + (data.payment.rejectionReason || "Could not match transfer."));
        } else {
          setCheckMessage("Payment is still awaiting admin review. Please allow a few minutes.");
        }
      } else {
        setCheckMessage("Unable to locate payment status with reference " + ref);
      }
    } catch (e) {
      setCheckMessage("Network error checking status.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070f1e] text-[#0b1a33] dark:text-slate-100 flex flex-col justify-between transition-colors">
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0b162c]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-[#0b1a33] dark:text-white">
            My<span className="text-[#0a66ff]">Pact</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 py-12 text-center w-full">
        <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          {/* Animated Status Icon */}
          <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-2xl mx-auto mb-6">
            {paymentStatus === "approved" ? (
              <i className="fas fa-check text-emerald-500 text-3xl"></i>
            ) : paymentStatus === "rejected" ? (
              <i className="fas fa-xmark text-rose-500 text-3xl"></i>
            ) : (
              <i className="fas fa-clock text-amber-500 text-3xl animate-pulse"></i>
            )}
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-[0.68rem] font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3">
            {paymentStatus === "approved" ? "Payment Approved" : paymentStatus === "rejected" ? "Verification Declined" : "Verification in Progress"}
          </span>

          <h1 className="text-2xl font-black text-[#0b1a33] dark:text-white mb-2">
            {paymentStatus === "approved" ? "Plan Unlocked Successfully!" : "Manual Transfer Awaiting Approval"}
          </h1>

          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed max-w-md mx-auto">
            Our admin team is matching your bank transfer with our OPay account statement. As soon as verified, your {plan} features will unlock automatically.
          </p>

          {/* Reference Card */}
          <div className="bg-slate-50 dark:bg-[#070f1e] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6 text-left space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Payment Reference:</span>
              <span className="font-mono font-bold text-[#0a66ff] dark:text-[#38bdf8]">{ref}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Selected Tier:</span>
              <span className="font-bold text-[#0b1a33] dark:text-white">{plan}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Amount:</span>
              <span className="font-bold text-[#0b1a33] dark:text-white">₦{amount}</span>
            </div>
          </div>

          {checkMessage && (
            <div className="p-3 mb-5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
              {checkMessage}
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {paymentStatus === "approved" ? (
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2"
              >
                <span>Enter Dashboard</span>
                <i className="fas fa-arrow-right text-[0.65rem]"></i>
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={checkStatus}
                  disabled={checking}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#0a66ff] hover:bg-[#084bc2] text-white text-xs font-bold shadow-md shadow-[#0a66ff]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {checking ? (
                    <>
                      <i className="fas fa-spinner fa-spin text-xs"></i>
                      <span>Checking Status...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-rotate text-xs"></i>
                      <span>Check Verification Status</span>
                    </>
                  )}
                </button>

                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span>Continue to Dashboard</span>
                </Link>
              </>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
            <span>Need immediate expedited verification? </span>
            <a
              href={`https://wa.me/2349027874036?text=Hello%20MyPact,%20I%20have%20transferred%20₦${amount}%20for%20${encodeURIComponent(plan)}%20with%20Ref:${ref}`}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              <i className="fab fa-whatsapp"></i>
              <span>Send Receipt on WhatsApp</span>
            </a>
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} MyPact Academic Accountability Engine. All rights reserved.
      </footer>
    </div>
  );
}

export default function PaymentPendingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs font-bold text-slate-400">Loading payment status...</div>}>
      <PaymentPendingContent />
    </Suspense>
  );
}
