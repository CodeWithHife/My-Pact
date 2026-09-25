"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

interface PlanItem {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  badge?: string;
  popular?: boolean;
  price: number;
  period: string;
  durationDays: number;
  description: string;
  icon: string;
  iconColor: string;
  buttonText: string;
  features: string[];
  type: "free" | "paid" | "custom";
}

export default function PricingPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<PlanItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Bank Transfer Form State
  const [senderName, setSenderName] = useState("");
  const [senderBank, setSenderBank] = useState("OPay");
  const [transactionRef, setTransactionRef] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedField, setCopiedField] = useState("");

  // Default Bank Details from System Settings / Atlas
  const [bankInfo, setBankInfo] = useState({
    bankName: "OPay",
    accountNumber: "8101831889",
    accountName: "Lolade Bilebo",
    instructions: "Transfer the exact amount using your bank app (OPay, Kuda, PalmPay, GTBank, Zenith, Access). Enter your Sender Name below so we can verify and unlock your subscription immediately.",
  });

  const [uniqueRef, setUniqueRef] = useState("");

  useEffect(() => {
    // Generate unique transfer reference
    setUniqueRef("PACT-" + Math.floor(100000 + Math.random() * 900000));

    async function loadData() {
      try {
        const [plansRes, settingsRes] = await Promise.all([
          fetch("/api/plans"),
          fetch("/api/admin/settings?key=payment_account"),
        ]);

        const plansData = await plansRes.json();
        if (plansData.success && plansData.plans?.length > 0) {
          setPlans(plansData.plans);
        } else {
          // Fallback Default Plans
          setPlans([
            {
              _id: "free",
              name: "Free Trial",
              slug: "free-trial",
              price: 0,
              period: "7 days free",
              durationDays: 7,
              description: "Complete study discipline engine with basic accountability.",
              icon: "fas fa-seedling",
              iconColor: "text-slate-500 bg-slate-100 dark:bg-slate-800",
              buttonText: "Start Free 7-Day Trial",
              features: [
                "Up to 3 Registered Courses",
                "10 Daily Study Tasks",
                "Physical Alarms & Sound Alerts",
                "Math Problem Verification",
                "Daily Streak Tracking",
              ],
              type: "free",
            },
            {
              _id: "scholar-pro",
              name: "Scholar Pro",
              slug: "scholar-pro",
              price: 1500,
              period: "per month",
              durationDays: 30,
              popular: true,
              badge: "Most Popular",
              description: "Ideal for full semester discipline and consistent GPA enhancement.",
              icon: "fas fa-bolt",
              iconColor: "text-[#0a66ff] bg-[#e8f0fe] dark:bg-[#0a66ff]/20",
              buttonText: "Get Scholar Pro",
              features: [
                "Unlimited Courses & Study Pacts",
                "Level 2 & Level 3 Strict App Lockout",
                "Live Accountability Partner SMS/WhatsApp Dispatches",
                "Coursework AI Assistant & Flashcards",
                "Syllabus Topic Auto-Organizer",
                "CGPA Target Grade Calculator",
              ],
              type: "paid",
            },
            {
              _id: "exam-crush",
              name: "Exam Crush Pass",
              slug: "exam-crush",
              price: 3500,
              period: "full semester (90 days)",
              durationDays: 90,
              badge: "Best Value",
              description: "Full semester access to peak exam revision and past question drills.",
              icon: "fas fa-graduation-cap",
              iconColor: "text-purple-600 bg-purple-100 dark:bg-purple-950/40",
              buttonText: "Start Exam Pass",
              features: [
                "Everything in Scholar Pro",
                "90-Day Full Semester Coverage",
                "Downloadable Past Questions & Formulas",
                "Zero Tolerance Lockout Mode",
                "Weekly Academic Performance Audit",
                "Priority Support via WhatsApp",
              ],
              type: "paid",
            },
            {
              _id: "academic-weapon",
              name: "Academic Weapon",
              slug: "academic-weapon",
              price: 6000,
              period: "full session (1 year)",
              durationDays: 365,
              description: "Complete yearly package for First Class & Distinction aspirants.",
              icon: "fas fa-crown",
              iconColor: "text-amber-500 bg-amber-100 dark:bg-amber-950/40",
              buttonText: "Unlock Academic Weapon",
              features: [
                "Everything in Exam Crush",
                "365-Day Complete Session Access",
                "Multi-Partner Accountability Matrix",
                "Early Access to AI Exam Predictions",
                "VIP Academic Support",
              ],
              type: "paid",
            },
          ]);
        }

        const settingsData = await settingsRes.json();
        if (settingsData.success && settingsData.setting) {
          setBankInfo(settingsData.setting);
        }
      } catch (err) {
        console.warn("Error loading pricing data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2500);
  };

  const handleSelectPlan = async (plan: PlanItem) => {
    setSelectedPlan(plan);
    setErrorMessage("");

    if (plan.type === "free" || plan.price === 0) {
      // Free Plan Activation
      setIsSubmitting(true);
      try {
        let token = "";
        let userEmail = "";
        try {
          token = localStorage.getItem("mypact_token") || "";
          const storedUser = localStorage.getItem("mypact_user");
          if (storedUser) {
            const parsed = JSON.parse(storedUser);
            userEmail = parsed.email || "";
          }
        } catch (e) {}

        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch("/api/subscription/free", {
          method: "POST",
          headers,
          body: JSON.stringify({ email: userEmail }),
        });

        const data = await res.json();
        if (data.success) {
          // Update stored user
          try {
            const storedUser = localStorage.getItem("mypact_user");
            if (storedUser) {
              const parsed = JSON.parse(storedUser);
              parsed.subscription = data.subscription;
              localStorage.setItem("mypact_user", JSON.stringify(parsed));
            }
          } catch (e) {}
          router.push("/dashboard");
        } else {
          setErrorMessage(data.error || "Could not activate Free Plan. Please log in or try again.");
        }
      } catch (err: any) {
        // Fallback directly to dashboard
        router.push("/dashboard");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Paid Plan: Open Direct Bank Transfer Modal
      setIsModalOpen(true);
    }
  };

  const handleBankTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim()) {
      setErrorMessage("Please enter the name on your bank account so we can verify your payment.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      let token = "";
      let userEmail = "";
      let userId = "";
      try {
        token = localStorage.getItem("mypact_token") || "";
        const storedUser = localStorage.getItem("mypact_user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          userEmail = parsed.email || "";
          userId = parsed.id || parsed._id || "";
        }
      } catch (e) {}

      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch("/api/payments", {
        method: "POST",
        headers,
        body: JSON.stringify({
          planId: selectedPlan?._id || selectedPlan?.slug,
          planName: selectedPlan?.name,
          amount: selectedPlan?.price,
          senderName: senderName.trim(),
          senderBank: senderBank.trim(),
          transactionRef: transactionRef.trim(),
          reference: uniqueRef,
          userEmail,
          userId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        router.push(`/payment/pending?ref=${uniqueRef}&plan=${encodeURIComponent(selectedPlan?.name || "")}&amount=${selectedPlan?.price}`);
      } else {
        setErrorMessage(data.error || "Failed to submit verification request. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage("Network error submitting transfer. Please check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070f1e] text-[#0b1a33] dark:text-slate-100 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0b162c]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-[#0b1a33] dark:text-white">
            My<span className="text-[#0a66ff]">Pact</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="text-xs font-semibold px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              <span>Back to App</span>
              <i className="fas fa-arrow-right ml-1.5 text-[0.65rem]"></i>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a66ff]/10 text-[#0a66ff] dark:text-[#38bdf8] text-xs font-bold uppercase tracking-wider mb-4">
            <i className="fas fa-shield-alt text-xs"></i>
            <span>Zero-Tolerance Academic Subscriptions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0b1a33] dark:text-white mb-4">
            Invest in Your Academic Excellence
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Choose your accountability tier. Activate your 7-day free trial or unlock unlimited courses with instant manual OPay / Bank Transfer verification.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan) => {
            const isPopular = plan.popular || plan.badge === "Most Popular";
            return (
              <div
                key={plan._id || plan.slug}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? "bg-white dark:bg-[#0f1d32] border-2 border-[#0a66ff] shadow-[0_12px_36px_rgba(10,102,255,0.15)] scale-[1.02]"
                    : "bg-white dark:bg-[#0f1d32] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {/* Popular / Badge Tag */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#0a66ff] to-[#084bc2] text-white text-[0.68rem] font-black uppercase tracking-wider shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg ${plan.iconColor || "text-[#0a66ff] bg-[#e8f0fe]"}`}>
                      <i className={plan.icon || "fas fa-shield-alt"}></i>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {plan.durationDays} Days
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#0b1a33] dark:text-white mb-1.5">{plan.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Price Tag */}
                  <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-[#0b1a33] dark:text-white tracking-tight">
                        {plan.price === 0 ? "Free" : `₦${plan.price.toLocaleString()}`}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">/{plan.period}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-[0.72rem] font-extrabold uppercase text-slate-400 tracking-wider">
                      Included Features
                    </div>
                    {plan.features?.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <i className="fas fa-check text-[#0a66ff] dark:text-[#38bdf8] text-[0.7rem] mt-0.5 shrink-0"></i>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Action CTA */}
                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isSubmitting}
                  className={`w-full py-3 px-5 rounded-2xl font-bold text-xs tracking-tight transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isPopular
                      ? "bg-[#0a66ff] hover:bg-[#084bc2] text-white shadow-md shadow-[#0a66ff]/25 hover:shadow-lg hover:shadow-[#0a66ff]/35"
                      : plan.type === "free"
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                      : "bg-[#0a66ff]/10 hover:bg-[#0a66ff] text-[#0a66ff] hover:text-white dark:bg-[#38bdf8]/10 dark:text-[#38bdf8] dark:hover:bg-[#38bdf8] dark:hover:text-[#070f1e]"
                  }`}
                >
                  <span>{plan.buttonText || (plan.price === 0 ? "Start Free Trial" : "Choose Plan")}</span>
                  <i className="fas fa-arrow-right text-[0.65rem]"></i>
                </button>
              </div>
            );
          })}
        </div>

        {/* Security & Direct Transfer Notice */}
        <div className="bg-white dark:bg-[#0f1d32] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl shrink-0">
              <i className="fas fa-building-columns"></i>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#0b1a33] dark:text-white mb-1">
                Direct Manual Bank & OPay Transfer
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Zero third-party card processing fees. Transfer directly to our verified OPay merchant account. Once submitted, our team approves your subscription reference within minutes.
              </p>
            </div>
            <div className="shrink-0 w-full sm:w-auto">
              <a
                href="https://wa.me/2349027874036?text=Hello%20MyPact,%20I%20have%20questions%20about%20subscription%20plans"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#142642] transition-colors"
              >
                <i className="fab fa-whatsapp text-emerald-500 text-sm"></i>
                <span>Support Desk</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* ====== MANUAL BANK TRANSFER MODAL ====== */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#0f1d32] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <i className="fas fa-times text-xs"></i>
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#0a66ff]/10 text-[#0a66ff] dark:text-[#38bdf8] flex items-center justify-center text-sm">
                <i className="fas fa-money-bill-transfer"></i>
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0b1a33] dark:text-white">
                  Bank Transfer &bull; {selectedPlan.name}
                </h3>
                <p className="text-xs text-slate-400">Total Payable: ₦{selectedPlan.price.toLocaleString()}</p>
              </div>
            </div>

            {/* Bank Transfer Details Box */}
            <div className="bg-slate-50 dark:bg-[#070f1e] border border-slate-200 dark:border-slate-800 rounded-2xl p-4.5 mb-5 space-y-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Bank Name:</span>
                <span className="font-bold text-[#0b1a33] dark:text-white">{bankInfo.bankName || "OPay"}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Account Number:</span>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm tracking-wider text-[#0a66ff] dark:text-[#38bdf8]">
                    {bankInfo.accountNumber || "8101831889"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(bankInfo.accountNumber || "8101831889", "acc")}
                    className="px-2 py-0.5 rounded text-[0.65rem] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors"
                  >
                    {copiedField === "acc" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Account Name:</span>
                <span className="font-bold text-[#0b1a33] dark:text-white">{bankInfo.accountName || "Lolade Bilebo"}</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 font-medium">Payment Reference:</span>
                <div className="flex items-center gap-2">
                  <span className="font-black text-xs text-amber-500 font-mono tracking-wider">{uniqueRef}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(uniqueRef, "ref")}
                    className="px-2 py-0.5 rounded text-[0.65rem] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors"
                  >
                    {copiedField === "ref" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            {/* Form to submit verification */}
            <form onSubmit={handleBankTransferSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Sender Account Name (As displayed on your Bank/OPay) *
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Lolade Bilebo"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#142642] text-xs font-medium text-[#0b1a33] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0a66ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Bank / App
                  </label>
                  <input
                    type="text"
                    value={senderBank}
                    onChange={(e) => setSenderBank(e.target.value)}
                    placeholder="e.g. OPay, Kuda, GTBank"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#142642] text-xs font-medium text-[#0b1a33] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0a66ff]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Transaction ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="e.g. Session ID"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#142642] text-xs font-medium text-[#0b1a33] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0a66ff]"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
                  <i className="fas fa-circle-exclamation shrink-0"></i>
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0a66ff] to-[#084bc2] text-white font-bold text-xs tracking-tight shadow-md shadow-[#0a66ff]/30 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin text-xs"></i>
                    <span>Submitting Verification...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle text-xs"></i>
                    <span>I Have Transferred ₦{selectedPlan.price.toLocaleString()}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
