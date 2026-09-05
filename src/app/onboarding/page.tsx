"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Nigerian & Global Universities list
const universities = [
  "University of Lagos (UNILAG)",
  "University of Ibadan (UI)",
  "Obafemi Awolowo University (OAU)",
  "University of Nigeria, Nsukka (UNN)",
  "Ahmadu Bello University (ABU Zaria)",
  "Covenant University",
  "Federal University of Technology, Akure (FUTA)",
  "University of Benin (UNIBEN)",
  "Babcock University",
  "Lagos State University (LASU)",
  "University of Ilorin (UNILORIN)",
  "Federal University of Technology, Minna (FUTMINNA)",
  "Other Institution / Global Campus",
];

const academicLevels = [
  "100 Level (Freshman)",
  "200 Level (Sophomore)",
  "300 Level (Penultimate)",
  "400 Level (Final Year)",
  "500 Level (Engineering / Med / Law)",
  "Postgraduate / Master's / PhD",
  "Professional Exam (ICAN, USMLE, Bar)",
];

const availableSubjects = [
  { id: "chemistry", name: "Chemistry & Biochem", icon: "fas fa-flask" },
  { id: "calculus", name: "Calculus & Mathematics", icon: "fas fa-calculator" },
  { id: "cs", name: "Computer Science & Coding", icon: "fas fa-code" },
  { id: "physics", name: "Physics & Mechanics", icon: "fas fa-atom" },
  { id: "biology", name: "Biology & Medicine", icon: "fas fa-dna" },
  { id: "law", name: "Law & Jurisprudence", icon: "fas fa-scale-balanced" },
  { id: "engineering", name: "Engineering & Design", icon: "fas fa-gears" },
  { id: "economics", name: "Economics & Finance", icon: "fas fa-chart-line" },
  { id: "psychology", name: "Psychology & Behavioral", icon: "fas fa-brain" },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Step 1: Academic Profile
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    university: "",
    level: "",
    targetGpa: "4.50 - 5.00 (First Class / Distinction)",
  });

  const [step1Touched, setStep1Touched] = useState({
    firstName: false,
    lastName: false,
    university: false,
    level: false,
  });

  // Step 2: Subjects
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [subjectError, setSubjectError] = useState("");

  // Step 3: Enforcement Tier & Rules
  const [selectedTier, setSelectedTier] = useState<"mild" | "strict" | "zero">("strict");
  const [partnerInfo, setPartnerInfo] = useState({
    name: "",
    phone: "",
  });

  // Step 4: First Pact Setup
  const [pactData, setPactData] = useState({
    name: "",
    subject: "",
    duration: 45,
    frequency: "weekdays",
  });

  const [step4Touched, setStep4Touched] = useState({
    name: false,
    subject: false,
    duration: false,
  });

  // Feature Toggles for Step 4
  const [features, setFeatures] = useState({
    alarms: true,
    notifyPartner: true,
    appLockout: true,
    emailSummary: true,
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<
    Array<{
      id: number;
      size: number;
      color: string;
      left: string;
      top: string;
      duration: string;
      delay: string;
      isCircle: boolean;
    }>
  >([]);

  // Validation Helpers
  const getStep1Errors = () => {
    const errs = {
      firstName: "",
      lastName: "",
      university: "",
      level: "",
    };

    if (!formData.firstName.trim()) {
      errs.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      errs.lastName = "Last name is required.";
    }
    if (!formData.university) {
      errs.university = "Please select your institution.";
    }
    if (!formData.level) {
      errs.level = "Please select your academic level.";
    }

    return errs;
  };

  const getStep4Errors = () => {
    const errs = {
      name: "",
      subject: "",
      duration: "",
    };

    if (!pactData.name.trim()) {
      errs.name = "Please provide a name for your first study pact.";
    }
    if (!pactData.subject.trim()) {
      errs.subject = "Please specify a subject or course.";
    }
    if (!pactData.duration || pactData.duration < 15 || pactData.duration > 240) {
      errs.duration = "Duration must be between 15 and 240 minutes.";
    }

    return errs;
  };

  const step1Errors = getStep1Errors();
  const step4Errors = getStep4Errors();

  const handleStep1Change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSubject = (subjectId: string) => {
    if (subjectError) setSubjectError("");
    setSelectedSubjects((prev) =>
      prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId]
    );
  };

  const triggerConfetti = () => {
    const colors = ["#0a66ff", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
    const pieces = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        size: 4 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 30 + 10}%`,
        duration: `${1.5 + Math.random() * 1.5}s`,
        delay: `${Math.random() * 0.8}s`,
        isCircle: Math.random() > 0.5,
      });
    }
    setConfettiPieces(pieces);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setStep1Touched({
        firstName: true,
        lastName: true,
        university: true,
        level: true,
      });
      const hasErrors = Object.values(step1Errors).some((msg) => msg.length > 0);
      if (hasErrors) return;
    }

    if (currentStep === 2) {
      if (selectedSubjects.length === 0) {
        setSubjectError("Please select at least one study subject.");
        return;
      }
    }

    if (currentStep === 4) {
      setStep4Touched({
        name: true,
        subject: true,
        duration: true,
      });
      const hasErrors = Object.values(step4Errors).some((msg) => msg.length > 0);
      if (hasErrors) return;

      setIsSuccess(true);
      triggerConfetti();
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="relative min-h-screen w-full bg-[#f0f5fe] text-[#0b1a33] flex items-center justify-center font-sans p-4 sm:p-6 lg:p-10 overflow-x-hidden">
      {/* Background Animated Floating Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-[#0a66ff] rounded-full blur-[130px] opacity-15 -top-[200px] -right-[150px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-[#7c3aed] rounded-full blur-[130px] opacity-12 -bottom-[150px] -left-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-[780px] mx-auto">
        
        {/* Main Onboarding Card Container */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/80 shadow-[0_24px_64px_rgba(10,102,255,0.12)] overflow-hidden">
          
          {/* ====== HEADER ====== */}
          <div className="px-5 py-4 sm:px-8 sm:py-5 border-b border-[#0a66ff]/10 flex items-center justify-between flex-wrap gap-3">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 font-extrabold text-xl text-[#0b1a33] tracking-tight group">
              <div className="w-8 h-8 rounded-lg bg-[#0a66ff] flex items-center justify-center text-white text-sm shadow-sm shadow-[#0a66ff]/30 transition-transform group-hover:scale-105">
                <Image
                  src="/logo/mypact_icon.svg"
                  alt="MyPact"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <span>
                My<span className="text-[#0a66ff]">Pact</span>
              </span>
            </Link>

            {/* Right Header Navigation: Step Counter + Styled Back to Home */}
            <div className="flex items-center gap-3">
              {!isSuccess && (
                <div className="px-3 py-1 rounded-full bg-[#e8f0fe] border border-[#0a66ff]/15 text-[0.72rem] font-extrabold text-[#0a66ff] flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0a66ff] animate-pulse" />
                  <span>Step {currentStep} of {totalSteps}</span>
                </div>
              )}

              <Link
                href="/"
                className="group/back inline-flex items-center gap-1.5 text-xs font-bold text-[#0b1a33] bg-slate-50 hover:bg-[#0a66ff] hover:text-white px-3 py-1.5 rounded-full border border-slate-200/80 hover:border-[#0a66ff] shadow-2xs hover:shadow-[0_4px_16px_rgba(10,102,255,0.25)] transition-all duration-300 hover:-translate-x-0.5 active:scale-95"
              >
                <span className="w-4 h-4 rounded-full bg-[#e8f0fe] group-hover/back:bg-white/20 text-[#0a66ff] group-hover/back:text-white flex items-center justify-center transition-colors">
                  <i className="fas fa-arrow-left text-[0.5rem] transition-transform group-hover/back:-translate-x-0.5"></i>
                </span>
                <span className="tracking-tight text-[0.72rem] hidden sm:inline">Back to Home</span>
              </Link>
            </div>
          </div>

          {/* Progress Bar Track */}
          {!isSuccess && (
            <div className="px-5 sm:px-8 pt-3">
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0a66ff] to-[#3b82f6] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* ====== BODY ====== */}
          <div className="p-5 sm:p-8 min-h-[440px] flex flex-col justify-between">
            
            {!isSuccess ? (
              <div>
                {/* STEP 1: ACADEMIC PROFILE */}
                {currentStep === 1 && (
                  <div className="animate-fadeIn space-y-4">
                    <div className="mb-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-[0.65rem] font-extrabold uppercase tracking-wider mb-1.5">
                        <i className="fas fa-user-graduate text-[0.6rem]"></i>
                        <span>Step 1: Academic Profile</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#0b1a33] tracking-tight">
                        Tell us about your studies
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        We configure your accountability schedule and coursework AI based on your campus & level.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* First Name */}
                      <div className="relative">
                        <label className="block text-[0.72rem] font-bold text-[#0b1a33] mb-1">
                          First name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleStep1Change}
                            onBlur={() => setStep1Touched((prev) => ({ ...prev, firstName: true }))}
                            placeholder="David"
                            className={`w-full pl-8 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none bg-slate-50/50 focus:bg-white ${(step1Touched.firstName) && step1Errors.firstName
                              ? "border-red-500 ring-2 ring-red-500/10"
                              : step1Touched.firstName && !step1Errors.firstName && formData.firstName
                                ? "border-emerald-500 ring-2 ring-emerald-500/10"
                                : "border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15"
                              }`}
                          />
                        </div>
                        {step1Touched.firstName && step1Errors.firstName && (
                          <p className="text-[0.65rem] text-red-500 mt-1 font-medium leading-tight">{step1Errors.firstName}</p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="relative">
                        <label className="block text-[0.72rem] font-bold text-[#0b1a33] mb-1">
                          Last name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleStep1Change}
                            onBlur={() => setStep1Touched((prev) => ({ ...prev, lastName: true }))}
                            placeholder="Okonkwo"
                            className={`w-full pl-8 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none bg-slate-50/50 focus:bg-white ${(step1Touched.lastName) && step1Errors.lastName
                              ? "border-red-500 ring-2 ring-red-500/10"
                              : step1Touched.lastName && !step1Errors.lastName && formData.lastName
                                ? "border-emerald-500 ring-2 ring-emerald-500/10"
                                : "border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15"
                              }`}
                          />
                        </div>
                        {step1Touched.lastName && step1Errors.lastName && (
                          <p className="text-[0.65rem] text-red-500 mt-1 font-medium leading-tight">{step1Errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* University / Institution Dropdown */}
                    <div className="relative">
                      <label className="block text-[0.72rem] font-bold text-[#0b1a33] mb-1">
                        Institution / University <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <i className="fas fa-building-columns absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                        <select
                          name="university"
                          value={formData.university}
                          onChange={handleStep1Change}
                          onBlur={() => setStep1Touched((prev) => ({ ...prev, university: true }))}
                          className={`w-full pl-8 pr-8 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none bg-slate-50/50 focus:bg-white appearance-none cursor-pointer ${(step1Touched.university) && step1Errors.university
                            ? "border-red-500 ring-2 ring-red-500/10"
                            : step1Touched.university && !step1Errors.university && formData.university
                              ? "border-emerald-500 ring-2 ring-emerald-500/10"
                              : "border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15"
                            }`}
                        >
                          <option value="">Select your institution...</option>
                          {universities.map((uni) => (
                            <option key={uni} value={uni}>
                              {uni}
                            </option>
                          ))}
                        </select>
                        <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                      </div>
                      {step1Touched.university && step1Errors.university && (
                        <p className="text-[0.65rem] text-red-500 mt-1 font-medium leading-tight">{step1Errors.university}</p>
                      )}
                    </div>

                    {/* Academic Level & Target GPA Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Academic Level Dropdown */}
                      <div className="relative">
                        <label className="block text-[0.72rem] font-bold text-[#0b1a33] mb-1">
                          Current Level <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <i className="fas fa-layer-group absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                          <select
                            name="level"
                            value={formData.level}
                            onChange={handleStep1Change}
                            onBlur={() => setStep1Touched((prev) => ({ ...prev, level: true }))}
                            className={`w-full pl-8 pr-8 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none bg-slate-50/50 focus:bg-white appearance-none cursor-pointer ${(step1Touched.level) && step1Errors.level
                              ? "border-red-500 ring-2 ring-red-500/10"
                              : step1Touched.level && !step1Errors.level && formData.level
                                ? "border-emerald-500 ring-2 ring-emerald-500/10"
                                : "border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15"
                              }`}
                          >
                            <option value="">Select current year / level...</option>
                            {academicLevels.map((lvl) => (
                              <option key={lvl} value={lvl}>
                                {lvl}
                              </option>
                            ))}
                          </select>
                          <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                        </div>
                        {step1Touched.level && step1Errors.level && (
                          <p className="text-[0.65rem] text-red-500 mt-1 font-medium leading-tight">{step1Errors.level}</p>
                        )}
                      </div>

                      {/* Target GPA Dropdown */}
                      <div className="relative">
                        <label className="block text-[0.72rem] font-bold text-[#0b1a33] mb-1">
                          Target Semester GPA Goal
                        </label>
                        <div className="relative">
                          <i className="fas fa-trophy absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 text-xs pointer-events-none"></i>
                          <select
                            name="targetGpa"
                            value={formData.targetGpa}
                            onChange={handleStep1Change}
                            className="w-full pl-8 pr-8 py-2.5 rounded-xl border border-slate-200 focus:border-[#0a66ff] focus:ring-3 focus:ring-[#0a66ff]/15 text-xs sm:text-sm font-medium transition-all outline-none bg-slate-50/50 focus:bg-white appearance-none cursor-pointer"
                          >
                            <option value="4.50 - 5.00 (First Class / Distinction)">4.50 - 5.00 (First Class / Top 5%)</option>
                            <option value="3.50 - 4.49 (Second Class Upper)">3.50 - 4.49 (Second Class Upper)</option>
                            <option value="3.00 - 3.49 (Solid Pass)">3.00 - 3.49 (Solid Pass)</option>
                            <option value="Pass & Complete All Units">Pass & Complete All Units</option>
                          </select>
                          <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: SUBJECT SELECTION */}
                {currentStep === 2 && (
                  <div className="animate-fadeIn space-y-4">
                    <div className="mb-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-[0.65rem] font-extrabold uppercase tracking-wider mb-1.5">
                        <i className="fas fa-book-bookmark text-[0.6rem]"></i>
                        <span>Step 2: Study Subjects</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#0b1a33] tracking-tight">
                        Select your key courses
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Choose the subjects you need accountability for. You can add custom courses anytime.
                      </p>
                    </div>

                    {/* Subject Multi-Select Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {availableSubjects.map((sub) => {
                        const isSelected = selectedSubjects.includes(sub.id);
                        return (
                          <div
                            key={sub.id}
                            onClick={() => toggleSubject(sub.id)}
                            className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2.5 select-none ${
                              isSelected
                                ? "bg-[#e8f0fe] border-[#0a66ff] shadow-xs text-[#0a66ff] ring-2 ring-[#0a66ff]/20 font-bold"
                                : "bg-slate-50/60 border-slate-200 hover:border-slate-300 text-slate-700 font-medium"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                                  isSelected ? "bg-[#0a66ff] text-white" : "bg-white text-[#0a66ff] border border-slate-200"
                                }`}
                              >
                                <i className={sub.icon}></i>
                              </div>
                              <span className="text-xs truncate">{sub.name}</span>
                            </div>

                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.6rem] shrink-0 ${
                                isSelected ? "bg-[#0a66ff] text-white" : "border border-slate-300 text-transparent"
                              }`}
                            >
                              <i className="fas fa-check"></i>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {subjectError && (
                      <p className="text-xs text-red-500 font-medium flex items-center gap-1.5 mt-2">
                        <i className="fas fa-circle-exclamation"></i>
                        <span>{subjectError}</span>
                      </p>
                    )}

                    {/* Coursework AI Helper Banner */}
                    <div className="bg-gradient-to-r from-[#0a66ff]/10 via-[#7c3aed]/10 to-transparent p-3.5 rounded-xl border border-[#0a66ff]/15 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#0a66ff] text-white flex items-center justify-center text-sm shrink-0 shadow-xs">
                        <i className="fas fa-microchip"></i>
                      </div>
                      <div className="text-xs text-slate-600">
                        <strong className="text-[#0b1a33] block font-bold">Coursework AI Integration</strong>
                        <span>We will calibrate personalized flashcards and pact reminders for your selected courses.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: ENFORCEMENT TIER & RULES */}
                {currentStep === 3 && (
                  <div className="animate-fadeIn space-y-4">
                    <div className="mb-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-[0.65rem] font-extrabold uppercase tracking-wider mb-1.5">
                        <i className="fas fa-shield-halved text-[0.6rem]"></i>
                        <span>Step 3: Accountability Tier</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#0b1a33] tracking-tight">
                        Choose your enforcement mode
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        How strict should MyPact be when your scheduled study session begins?
                      </p>
                    </div>

                    {/* 3 Tier Radio Selector Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Mild Tier */}
                      <div
                        onClick={() => setSelectedTier("mild")}
                        className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                          selectedTier === "mild"
                            ? "bg-[#e8f0fe] border-[#0a66ff] shadow-sm ring-2 ring-[#0a66ff]/20"
                            : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center text-sm font-bold">
                              <i className="fas fa-leaf"></i>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.6rem] ${
                                selectedTier === "mild" ? "bg-[#0a66ff] text-white" : "border border-slate-300"
                              }`}
                            >
                              {selectedTier === "mild" && <i className="fas fa-check"></i>}
                            </div>
                          </div>
                          <h3 className="text-sm font-black text-[#0b1a33]">Mild</h3>
                          <p className="text-[0.72rem] text-slate-500 mt-0.5">Gentle reminders & nudges</p>
                        </div>
                        <span className="text-[0.65rem] font-bold text-slate-400 mt-3 pt-2 border-t border-slate-200/60 block">
                          Flexible check-in
                        </span>
                      </div>

                      {/* Strict Tier (Most Popular) */}
                      <div
                        onClick={() => setSelectedTier("strict")}
                        className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                          selectedTier === "strict"
                            ? "bg-[#e8f0fe] border-[#0a66ff] shadow-sm ring-2 ring-[#0a66ff]/20"
                            : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="absolute -top-2.5 right-4 bg-gradient-to-r from-[#0a66ff] to-[#3b82f6] text-white text-[0.55rem] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-xs">
                          Most Popular
                        </span>
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div className="w-9 h-9 rounded-xl bg-[#0a66ff]/15 text-[#0a66ff] flex items-center justify-center text-sm font-bold">
                              <i className="fas fa-shield-halved"></i>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.6rem] ${
                                selectedTier === "strict" ? "bg-[#0a66ff] text-white" : "border border-slate-300"
                              }`}
                            >
                              {selectedTier === "strict" && <i className="fas fa-check"></i>}
                            </div>
                          </div>
                          <h3 className="text-sm font-black text-[#0b1a33]">Strict</h3>
                          <p className="text-[0.72rem] text-slate-500 mt-0.5">Lockouts & escalating alarms</p>
                        </div>
                        <span className="text-[0.65rem] font-bold text-[#0a66ff] mt-3 pt-2 border-t border-slate-200/60 block">
                          Barcode & Library Verification
                        </span>
                      </div>

                      {/* Zero Tolerance */}
                      <div
                        onClick={() => setSelectedTier("zero")}
                        className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                          selectedTier === "zero"
                            ? "bg-[#e8f0fe] border-[#0a66ff] shadow-sm ring-2 ring-[#0a66ff]/20"
                            : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-600 flex items-center justify-center text-sm font-bold">
                              <i className="fas fa-bolt-lightning"></i>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.6rem] ${
                                selectedTier === "zero" ? "bg-[#0a66ff] text-white" : "border border-slate-300"
                              }`}
                            >
                              {selectedTier === "zero" && <i className="fas fa-check"></i>}
                            </div>
                          </div>
                          <h3 className="text-sm font-black text-[#0b1a33]">Zero Tolerance</h3>
                          <p className="text-[0.72rem] text-slate-500 mt-0.5">Partner alerts + strict penalties</p>
                        </div>
                        <span className="text-[0.65rem] font-bold text-purple-600 mt-3 pt-2 border-t border-slate-200/60 block">
                          Total Distraction Defense
                        </span>
                      </div>
                    </div>

                    {/* Optional Accountability Partner Section */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="fas fa-user-group text-[#0a66ff] text-xs"></i>
                        <h4 className="text-xs font-extrabold text-[#0b1a33]">Accountability Partner (Optional)</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          value={partnerInfo.name}
                          onChange={(e) => setPartnerInfo((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Partner's Name (e.g. Samuel)"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none bg-white focus:border-[#0a66ff]"
                        />
                        <input
                          type="text"
                          value={partnerInfo.phone}
                          onChange={(e) => setPartnerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder="WhatsApp / Phone (e.g. 080...)"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none bg-white focus:border-[#0a66ff]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: FIRST PACT SETUP */}
                {currentStep === 4 && (
                  <div className="animate-fadeIn space-y-3.5">
                    <div className="mb-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-[0.65rem] font-extrabold uppercase tracking-wider mb-1.5">
                        <i className="fas fa-handshake text-[0.6rem]"></i>
                        <span>Step 4: First Study Pact</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#0b1a33] tracking-tight">
                        Lock in your first commitment
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Create your initial daily pact session to establish your first accountability streak.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Pact Name */}
                      <div className="relative">
                        <label className="block text-[0.72rem] font-bold text-[#0b1a33] mb-1">
                          Pact name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={pactData.name}
                          onChange={(e) => setPactData((prev) => ({ ...prev, name: e.target.value }))}
                          onBlur={() => setStep4Touched((prev) => ({ ...prev, name: true }))}
                          placeholder="e.g. Daily Deep Work Session"
                          className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none bg-slate-50/50 focus:bg-white ${(step4Touched.name) && step4Errors.name
                            ? "border-red-500 ring-2 ring-red-500/10"
                            : "border-slate-200 focus:border-[#0a66ff]"
                            }`}
                        />
                        {step4Touched.name && step4Errors.name && (
                          <p className="text-[0.65rem] text-red-500 mt-1 font-medium">{step4Errors.name}</p>
                        )}
                      </div>

                      {/* Subject */}
                      <div className="relative">
                        <label className="block text-[0.72rem] font-bold text-[#0b1a33] mb-1">
                          Subject / Course <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={pactData.subject}
                          onChange={(e) => setPactData((prev) => ({ ...prev, subject: e.target.value }))}
                          onBlur={() => setStep4Touched((prev) => ({ ...prev, subject: true }))}
                          placeholder="e.g. Organic Chemistry (CHM 201)"
                          className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all outline-none bg-slate-50/50 focus:bg-white ${(step4Touched.subject) && step4Errors.subject
                            ? "border-red-500 ring-2 ring-red-500/10"
                            : "border-slate-200 focus:border-[#0a66ff]"
                            }`}
                        />
                        {step4Touched.subject && step4Errors.subject && (
                          <p className="text-[0.65rem] text-red-500 mt-1 font-medium">{step4Errors.subject}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Duration in Minutes */}
                      <div className="relative">
                        <label className="block text-[0.72rem] font-bold text-[#0b1a33] mb-1">
                          Duration (Minutes) <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="15"
                            max="240"
                            value={pactData.duration}
                            onChange={(e) => setPactData((prev) => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                            className="w-24 px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-[#0a66ff] outline-none bg-slate-50/50 focus:bg-white focus:border-[#0a66ff]"
                          />
                          {/* Quick Duration Chips */}
                          <div className="flex gap-1">
                            {[30, 45, 60, 90].map((mins) => (
                              <button
                                key={mins}
                                type="button"
                                onClick={() => setPactData((prev) => ({ ...prev, duration: mins }))}
                                className={`px-2 py-1.5 rounded-lg text-[0.68rem] font-bold transition-colors ${
                                  pactData.duration === mins
                                    ? "bg-[#0a66ff] text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                              >
                                {mins}m
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Frequency Dropdown */}
                      <div className="relative">
                        <label className="block text-[0.72rem] font-bold text-[#0b1a33] mb-1">
                          Frequency
                        </label>
                        <select
                          value={pactData.frequency}
                          onChange={(e) => setPactData((prev) => ({ ...prev, frequency: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium outline-none bg-slate-50/50 focus:bg-white focus:border-[#0a66ff]"
                        >
                          <option value="weekdays">Weekdays (Mon - Fri)</option>
                          <option value="daily">Daily (7 days / week)</option>
                          <option value="weekends">Weekends Only</option>
                          <option value="3x">3 Times per Week</option>
                        </select>
                      </div>
                    </div>

                    {/* Live Pact Preview Card */}
                    <div className="bg-gradient-to-r from-[#0a66ff] to-[#084bc2] text-white p-3.5 rounded-xl shadow-md flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/20 text-white flex items-center justify-center text-base">
                          <i className="fas fa-book-open"></i>
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-white">
                            {pactData.name || "Daily Study Session"} · {pactData.subject || "Selected Course"}
                          </h4>
                          <p className="text-[0.68rem] text-blue-100 mt-0.5">
                            {pactData.duration} min · {pactData.frequency === "weekdays" ? "Weekdays" : pactData.frequency} · {selectedTier === "strict" ? "Strict" : selectedTier === "zero" ? "Zero Tolerance" : "Mild"} enforcement
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-[0.6rem] font-black uppercase tracking-wider border border-emerald-400/30 shrink-0">
                        <i className="fas fa-check mr-1"></i> Ready
                      </span>
                    </div>

                    {/* Feature Toggles Checkbox Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 pt-1">
                      <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[0.72rem] text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={features.alarms}
                          onChange={(e) => setFeatures((prev) => ({ ...prev, alarms: e.target.checked }))}
                          className="accent-[#0a66ff] w-3.5 h-3.5"
                        />
                        <i className="fas fa-bell text-[#0a66ff] text-xs"></i> Unstoppable alarms
                      </label>

                      <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[0.72rem] text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={features.notifyPartner}
                          onChange={(e) => setFeatures((prev) => ({ ...prev, notifyPartner: e.target.checked }))}
                          className="accent-[#0a66ff] w-3.5 h-3.5"
                        />
                        <i className="fas fa-user-group text-[#0a66ff] text-xs"></i> Partner alerts
                      </label>

                      <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[0.72rem] text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={features.appLockout}
                          onChange={(e) => setFeatures((prev) => ({ ...prev, appLockout: e.target.checked }))}
                          className="accent-[#0a66ff] w-3.5 h-3.5"
                        />
                        <i className="fas fa-mobile-screen-button text-[#0a66ff] text-xs"></i> App lockout
                      </label>

                      <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[0.72rem] text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={features.emailSummary}
                          onChange={(e) => setFeatures((prev) => ({ ...prev, emailSummary: e.target.checked }))}
                          className="accent-[#0a66ff] w-3.5 h-3.5"
                        />
                        <i className="fas fa-envelope text-[#0a66ff] text-xs"></i> Email session summary
                      </label>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ====== SUCCESS CELEBRATION STATE ====== */
              <div className="flex flex-col items-center justify-center text-center py-6 animate-fadeIn relative">
                {/* Confetti Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-visible">
                  {confettiPieces.map((piece) => (
                    <div
                      key={piece.id}
                      className="absolute animate-confettiFall pointer-events-none"
                      style={{
                        width: `${piece.size}px`,
                        height: `${piece.size}px`,
                        backgroundColor: piece.color,
                        left: piece.left,
                        top: piece.top,
                        borderRadius: piece.isCircle ? "50%" : "2px",
                        animationDuration: piece.duration,
                        animationDelay: piece.delay,
                      }}
                    />
                  ))}
                </div>

                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] text-emerald-500 flex items-center justify-center text-3xl shadow-sm mb-3">
                  <i className="fas fa-check-double"></i>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#0b1a33] tracking-tight mb-1">
                  You are all set, {formData.firstName || "Scholar"}!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                  Your MyPact student account and accountability engine have been configured. Your study streak begins today.
                </p>

                {/* Summary Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg mb-8">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-center">
                    <div className="text-lg font-black text-[#0a66ff]">1</div>
                    <div className="text-[0.62rem] uppercase font-bold text-slate-400 tracking-wider">Pact Initialized</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-center">
                    <div className="text-lg font-black text-[#0a66ff] capitalize">{selectedTier}</div>
                    <div className="text-[0.62rem] uppercase font-bold text-slate-400 tracking-wider">Enforcement</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-center">
                    <div className="text-lg font-black text-[#0a66ff]">{pactData.duration}m</div>
                    <div className="text-[0.62rem] uppercase font-bold text-slate-400 tracking-wider">Daily Goal</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-center">
                    <div className="text-lg font-black text-[#0a66ff]">{selectedSubjects.length || 3}</div>
                    <div className="text-[0.62rem] uppercase font-bold text-slate-400 tracking-wider">Courses</div>
                  </div>
                </div>

                <Link
                  href="/"
                  className="w-full max-w-xs py-3 px-6 rounded-full bg-gradient-to-r from-[#0a66ff] to-[#084bc2] text-white font-bold text-sm shadow-[0_8px_24px_rgba(10,102,255,0.35)] hover:shadow-[0_12px_36px_rgba(10,102,255,0.45)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <span>Go to My Dashboard</span>
                  <i className="fas fa-arrow-right text-xs"></i>
                </Link>
              </div>
            )}

            {/* ====== FOOTER CONTROLS ====== */}
            {!isSuccess && (
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3 mt-4">
                {/* Back Button */}
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:text-[#0a66ff] hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <i className="fas fa-arrow-left text-[0.6rem]"></i>
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {/* Right Actions: Skip & Next/Complete Button */}
                <div className="flex items-center gap-2.5">
                  {currentStep < totalSteps && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => prev + 1)}
                      className="px-4 py-2 rounded-full text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      Skip
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0a66ff] to-[#3b82f6] text-white font-bold text-xs sm:text-sm shadow-[0_6px_20px_rgba(10,102,255,0.35)] hover:shadow-[0_10px_28px_rgba(10,102,255,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {currentStep === totalSteps ? (
                      <>
                        <i className="fas fa-check-circle text-xs"></i>
                        <span>Complete Setup</span>
                      </>
                    ) : (
                      <>
                        <span>Continue</span>
                        <i className="fas fa-arrow-right text-xs"></i>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Micro Trust Footer */}
        <p className="text-center mt-4 text-[0.7rem] text-slate-400 flex items-center justify-center gap-1.5">
          <i className="fas fa-shield-halved text-[#0a66ff] text-xs"></i>
          <span>Encrypted academic profile · Protected under MyPact Student Trust</span>
        </p>

      </div>
    </div>
  );
}
