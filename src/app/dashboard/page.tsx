"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// Types
interface TaskItem {
  id: string;
  title: string;
  course: string;
  category: "study" | "exam" | "homework" | "lab" | "project";
  time: string;
  date: string;
  status: "active" | "pending" | "overdue" | "completed";
  duration: string;
  verificationMethod: "math" | "barcode" | "quiz" | "gps";
  isUrgent?: boolean;
}

interface CourseItem {
  id: string;
  code: string;
  name: string;
  professor: string;
  currentGrade: number;
  targetGrade: number;
  syllabusDates: { title: string; date: string; type: string }[];
  color: string;
}

interface AuditLog {
  id: string;
  hash: string;
  timestamp: string;
  action: string;
  course: string;
  status: "verified" | "flagged" | "penalty" | "system";
  details: string;
}

interface Partner {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  status: "connected" | "pending";
  lastDispatch: string;
  isEmergency: boolean;
}

export default function DashboardPage() {
  // Navigation & Active View State
  const [activeTab, setActiveTab] = useState<
    "overview" | "tasks" | "courses" | "focus" | "audit" | "network" | "settings"
  >("overview");

  // User Profile loaded from onboarding/signup or fallback
  const [userProfile, setUserProfile] = useState({
    name: "Alex",
    university: "Federal University of Agriculture, Abeokuta (FUNAAB)",
    faculty: "Computer Science, AI & Information Tech",
    level: "300 Level",
    tier: "strict",
    streak: 12,
    disciplineScore: 85,
    gpaTarget: "4.85 / 5.00",
  });

  // Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);

  // Global Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState<"all" | "courses" | "tasks" | "notes" | "audit">("all");

  // Task Manager States (Pages 15-16)
  const [taskViewMode, setTaskViewMode] = useState<"list" | "calendar" | "kanban">("list");
  const [taskPriorityFilter, setTaskPriorityFilter] = useState<string>("all");

  // Initial Tasks Data
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: "tsk-1",
      title: "Organic Chemistry Study Session",
      course: "CHM 201",
      category: "study",
      time: "08:00 AM",
      date: "Today",
      status: "active",
      duration: "45 min",
      verificationMethod: "math",
      isUrgent: true,
    },
    {
      id: "tsk-2",
      title: "Calculus III Problem Set",
      course: "MAT 301",
      category: "homework",
      time: "10:30 AM",
      date: "Today",
      status: "pending",
      duration: "5 problems",
      verificationMethod: "math",
    },
    {
      id: "tsk-3",
      title: "Data Structures Algorithm Meeting",
      course: "CSC 202",
      category: "project",
      time: "01:00 PM",
      date: "Today",
      status: "pending",
      duration: "2 hours",
      verificationMethod: "quiz",
    },
    {
      id: "tsk-4",
      title: "English Literature Essay Draft",
      course: "ENG 101",
      category: "homework",
      time: "03:30 PM",
      date: "Today",
      status: "overdue",
      duration: "1,500 words",
      verificationMethod: "barcode",
      isUrgent: true,
    },
    {
      id: "tsk-5",
      title: "Physics Lab Report Analysis",
      course: "PHY 102",
      category: "lab",
      time: "05:00 PM",
      date: "Today",
      status: "pending",
      duration: "30 min",
      verificationMethod: "gps",
    },
    {
      id: "tsk-6",
      title: "Organic Chemistry Final Examination",
      course: "CHM 201",
      category: "exam",
      time: "09:00 AM",
      date: "In 3 days",
      status: "pending",
      duration: "3 hours",
      verificationMethod: "barcode",
      isUrgent: true,
    },
  ]);

  // New Task Form State
  const [newTask, setNewTask] = useState({
    title: "",
    course: "CHM 201",
    category: "study" as TaskItem["category"],
    time: "09:00 AM",
    date: "Today",
    duration: "45 min",
    verificationMethod: "math" as TaskItem["verificationMethod"],
    isUrgent: false,
    strictLockout: true,
    notifyPartner: true,
  });

  // Course Vault Data (Pages 18-19)
  const [courses, setCourses] = useState<CourseItem[]>([
    {
      id: "crs-1",
      code: "CHM 201",
      name: "Organic Chemistry II",
      professor: "Dr. K. Adeola",
      currentGrade: 88,
      targetGrade: 95,
      color: "#0a66ff",
      syllabusDates: [
        { title: "Midterm Assessment", date: "Sep 12, 2026", type: "Exam" },
        { title: "Lab Synthesis Report", date: "Sep 19, 2026", type: "Lab" },
        { title: "Final Examination (Ch 1-12)", date: "Sep 28, 2026", type: "Final" },
      ],
    },
    {
      id: "crs-2",
      code: "MAT 301",
      name: "Advanced Multivariable Calculus",
      professor: "Prof. E. Okafor",
      currentGrade: 92,
      targetGrade: 96,
      color: "#22c55e",
      syllabusDates: [
        { title: "Stokes Theorem Quiz", date: "Sep 10, 2026", type: "Quiz" },
        { title: "Vector Calculus Problem Set", date: "Sep 15, 2026", type: "Homework" },
        { title: "Semester Exam", date: "Oct 04, 2026", type: "Final" },
      ],
    },
    {
      id: "crs-3",
      code: "CSC 202",
      name: "Data Structures & Algorithms",
      professor: "Dr. T. Bello",
      currentGrade: 85,
      targetGrade: 90,
      color: "#8b5cf6",
      syllabusDates: [
        { title: "Binary Trees Sprint", date: "Sep 08, 2026", type: "Project" },
        { title: "Graph Theory Exam", date: "Sep 22, 2026", type: "Exam" },
      ],
    },
    {
      id: "crs-4",
      code: "PHY 102",
      name: "General Physics & Optics",
      professor: "Prof. S. Ibrahim",
      currentGrade: 79,
      targetGrade: 85,
      color: "#f59e0b",
      syllabusDates: [
        { title: "Optics Diffraction Lab", date: "Sep 14, 2026", type: "Lab" },
        { title: "Electromagnetism Final", date: "Oct 01, 2026", type: "Final" },
      ],
    },
  ]);

  // Selected Course for Detail View
  const [selectedCourse, setSelectedCourse] = useState<CourseItem>(courses[0]);
  const [gradeCalc, setGradeCalc] = useState({ currentStanding: 88, finalWeight: 45, goalGrade: 90 });

  // AI Assistant Chat State
  const [aiMessages, setAiMessages] = useState<{ sender: "user" | "ai"; text: string; time: string }[]>([
    {
      sender: "ai",
      text: "Hello Alex! I am your MyPact Coursework AI. I have indexed your syllabus, lecture notes, and formula sheets for CHM 201, MAT 301, and CSC 202. What would you like to drill today?",
      time: "Just now",
    },
  ]);
  const [aiInput, setAiInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Focus Room State (Page 20)
  const [focusTimeLeft, setFocusTimeLeft] = useState(25 * 60);
  const [isFocusRunning, setIsFocusRunning] = useState(false);
  const [focusMode, setFocusMode] = useState<"pomodoro" | "shortBreak" | "longBreak">("pomodoro");
  const [focusSessionsCompleted, setFocusSessionsCompleted] = useState(3);
  const [activeSound, setActiveSound] = useState<"silence" | "rain" | "cafe" | "white" | "binaural">("silence");
  const [isDistractionShieldActive, setIsDistractionShieldActive] = useState(true);

  // High Stakes Countdown State (Ticking clock)
  const [countdownSeconds, setCountdownSeconds] = useState(3 * 86400 + 14 * 3600 + 27 * 60 + 42);

  // Active Alarm & Verification Challenge State (Page 17)
  const [alarmChallengeTab, setAlarmChallengeTab] = useState<"math" | "barcode" | "quiz">("math");
  const [alarmMathInput, setAlarmMathInput] = useState("");
  const [alarmMathResult, setAlarmMathResult] = useState<"idle" | "correct" | "wrong">("idle");
  const [barcodeScanned, setBarcodeScanned] = useState(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [alarmTimeRemaining, setAlarmTimeRemaining] = useState(120);

  // Audit Logs (Page 21)
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: "aud-1",
      hash: "0x8f2d9c4b",
      timestamp: "Today, 08:45 AM",
      action: "Calculus III Proof Verification Completed",
      course: "MAT 301",
      status: "verified",
      details: "Math Challenge solved in 34s · Accuracy 100% · +10 Discipline XP",
    },
    {
      id: "aud-2",
      hash: "0x3a91e4f0",
      timestamp: "Today, 07:15 AM",
      action: "Morning Study Pact Alarm Dismissed with Proof",
      course: "CHM 201",
      status: "verified",
      details: "Textbook Barcode scanned · ISBN 978-0134074580 verified",
    },
    {
      id: "aud-3",
      hash: "0x7b58c1a9",
      timestamp: "Yesterday, 10:30 PM",
      action: "Focus Room 50m Session Complete",
      course: "CSC 202",
      status: "verified",
      details: "0 tab switches · Distraction Shield held active",
    },
    {
      id: "aud-4",
      hash: "0x1d40fe83",
      timestamp: "2 days ago, 04:00 PM",
      action: "Strict Mode Lockout Warning Triggered",
      course: "ENG 101",
      status: "penalty",
      details: "Deadline missed by 12 mins · WhatsApp alert dispatched to partner Sarah K.",
    },
  ]);

  // Accountability Partners (Page 22)
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: "prt-1",
      name: "Sarah K. (Study Partner)",
      relationship: "Peer Accountability Buddy",
      phone: "+234 902 787 4036",
      status: "connected",
      lastDispatch: "Yesterday, 04:00 PM",
      isEmergency: true,
    },
    {
      id: "prt-2",
      name: "Prof. Adebayo",
      relationship: "Academic Mentor",
      phone: "+234 803 123 4567",
      status: "connected",
      lastDispatch: "3 days ago",
      isEmergency: false,
    },
  ]);
  const [dispatchAlertToast, setDispatchAlertToast] = useState<string | null>(null);

  // Settings state (Pages 23-24)
  const [settingsState, setSettingsState] = useState({
    strictMode: true,
    hardcoreLockout: false,
    partnerWhatsappAlerts: true,
    desktopPush: true,
    emergencyPin: "8492",
  });

  // Audio Context Ref for Ambient Sounds & Synthesizer
  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundNodeRef = useRef<any>(null);

  // Load User Info from localStorage on mount
  useEffect(() => {
    try {
      const savedOnboarding = localStorage.getItem("mypact_onboarding_data");
      const savedUser = localStorage.getItem("mypact_user");
      if (savedOnboarding) {
        const parsed = JSON.parse(savedOnboarding);
        setUserProfile((prev) => ({
          ...prev,
          university: parsed.university || prev.university,
          faculty: parsed.faculty || prev.faculty,
          level: parsed.level || prev.level,
          tier: parsed.tier || prev.tier,
          gpaTarget: parsed.targetGpa || prev.gpaTarget,
        }));
      }
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser.firstName) {
          setUserProfile((prev) => ({
            ...prev,
            name: `${parsedUser.firstName} ${parsedUser.lastName || ""}`.trim(),
          }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Live Countdown Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Focus Pomodoro Timer Effect
  useEffect(() => {
    let interval: any;
    if (isFocusRunning && focusTimeLeft > 0) {
      interval = setInterval(() => {
        setFocusTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (focusTimeLeft === 0 && isFocusRunning) {
      setIsFocusRunning(false);
      setFocusSessionsCompleted((prev) => prev + 1);
      // Log focus audit
      const newAudit: AuditLog = {
        id: `aud-${Date.now()}`,
        hash: `0x${Math.random().toString(16).substr(2, 8)}`,
        timestamp: "Just now",
        action: "Focus Session 25m Completed",
        course: "Focus Vault",
        status: "verified",
        details: "Distraction Shield active · +15 Discipline XP",
      };
      setAuditLogs((prev) => [newAudit, ...prev]);
    }
    return () => clearInterval(interval);
  }, [isFocusRunning, focusTimeLeft]);

  // Alarm Countdown Timer Effect
  useEffect(() => {
    let alarmTimer: any;
    if (isAlarmActive && alarmTimeRemaining > 0) {
      alarmTimer = setInterval(() => {
        setAlarmTimeRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(alarmTimer);
  }, [isAlarmActive, alarmTimeRemaining]);

  // Global Keyboard Shortcuts (⌘K, ⌘N, ⌘F, ⌘P, ⌘A, ⌘L)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault();
        setIsCreateTaskOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        setActiveTab("focus");
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault();
        setActiveTab("network");
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "a") {
        e.preventDefault();
        setActiveTab("audit");
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "l") {
        e.preventDefault();
        setIsAlarmActive(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsCreateTaskOpen(false);
        setIsAlarmActive(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Web Audio Synth for Ambient Soundscapes
  const toggleSoundscape = (soundType: "silence" | "rain" | "cafe" | "white" | "binaural") => {
    if (activeSound === soundType || soundType === "silence") {
      if (soundNodeRef.current) {
        try {
          soundNodeRef.current.stop();
        } catch (e) {}
      }
      setActiveSound("silence");
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Stop previous
      if (soundNodeRef.current) {
        try {
          soundNodeRef.current.stop();
        } catch (e) {}
      }

      // Create synthetic noise buffer
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      if (soundType === "white") {
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.05;
        }
      } else if (soundType === "rain") {
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          output[i] = (b0 + b1 + b2) * 0.03;
        }
      } else {
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.sin((i / ctx.sampleRate) * 2 * Math.PI * 220) * 0.04;
        }
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      whiteNoise.loop = true;
      whiteNoise.connect(ctx.destination);
      whiteNoise.start();
      soundNodeRef.current = whiteNoise;

      setActiveSound(soundType);
    } catch (err) {
      console.warn("Audio synthesis:", err);
      setActiveSound(soundType);
    }
  };

  // Convert Countdown seconds into days, hours, minutes, seconds
  const cdDays = Math.floor(countdownSeconds / 86400);
  const cdHours = Math.floor((countdownSeconds % 86400) / 3600);
  const cdMins = Math.floor((countdownSeconds % 3600) / 60);
  const cdSecs = countdownSeconds % 60;

  // Format Focus Timer mm:ss
  const focusMinutes = Math.floor(focusTimeLeft / 60);
  const focusSecondsDisplay = focusTimeLeft % 60;

  // Task Creation Handler
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task: TaskItem = {
      id: `tsk-${Date.now()}`,
      title: newTask.title,
      course: newTask.course,
      category: newTask.category,
      time: newTask.time,
      date: newTask.date,
      status: "pending",
      duration: newTask.duration,
      verificationMethod: newTask.verificationMethod,
      isUrgent: newTask.isUrgent,
    };

    setTasks((prev) => [task, ...prev]);

    // Add to audit trail
    const audit: AuditLog = {
      id: `aud-${Date.now()}`,
      hash: `0x${Math.random().toString(16).substr(2, 8)}`,
      timestamp: "Just now",
      action: `Pact Created: ${task.title}`,
      course: task.course,
      status: "system",
      details: `Verification Method: ${task.verificationMethod.toUpperCase()} · Strict Lockout: Active`,
    };
    setAuditLogs((prev) => [audit, ...prev]);

    setIsCreateTaskOpen(false);
    setNewTask({
      title: "",
      course: "CHM 201",
      category: "study",
      time: "09:00 AM",
      date: "Today",
      duration: "45 min",
      verificationMethod: "math",
      isUrgent: false,
      strictLockout: true,
      notifyPartner: true,
    });
  };

  // Task Toggle Status
  const handleToggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === "completed" ? "pending" : "completed";
          if (nextStatus === "completed") {
            const audit: AuditLog = {
              id: `aud-${Date.now()}`,
              hash: `0x${Math.random().toString(16).substr(2, 8)}`,
              timestamp: "Just now",
              action: `Pact Verified & Completed: ${t.title}`,
              course: t.course,
              status: "verified",
              details: `Method: ${t.verificationMethod.toUpperCase()} · Verified with Zero Deviations`,
            };
            setAuditLogs((prev) => [audit, ...prev]);
          }
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  // AI Assistant Chat Handler
  const handleSendAiMessage = () => {
    if (!aiInput.trim()) return;
    const userMsg = { sender: "user" as const, text: aiInput, time: "Just now" };
    setAiMessages((prev) => [...prev, userMsg]);
    setAiInput("");
    setIsAiTyping(true);

    setTimeout(() => {
      let aiResponseText = `Regarding your inquiry on "${userMsg.text}": For ${selectedCourse.code}, key exam focal points include synthesis pathways and multi-step mechanisms. I've flagged 3 past question problems in your Course Vault.`;
      if (userMsg.text.toLowerCase().includes("math") || userMsg.text.toLowerCase().includes("calculus")) {
        aiResponseText = `In MAT 301 (Multivariable Calculus), remember to verify divergence theorem constraints: $\\iint_S \\mathbf{F} \\cdot d\\mathbf{S} = \\iiint_V (\\nabla \\cdot \\mathbf{F}) dV$. Would you like 3 drill problems?`;
      }
      setAiMessages((prev) => [
        ...prev,
        { sender: "ai", text: aiResponseText, time: "Just now" },
      ]);
      setIsAiTyping(false);
    }, 900);
  };

  // Math Challenge Evaluation
  const handleSolveMath = () => {
    // Problem: Derivative of 4x^3 - 6x^2 + 7x at x = 2
    // f'(x) = 12x^2 - 12x + 7 -> f'(2) = 12(4) - 12(2) + 7 = 48 - 24 + 7 = 31
    if (alarmMathInput.trim() === "31") {
      setAlarmMathResult("correct");
      setTimeout(() => {
        setIsAlarmActive(false);
        setAlarmMathResult("idle");
        setAlarmMathInput("");
        // Record audit
        const newAudit: AuditLog = {
          id: `aud-${Date.now()}`,
          hash: `0x${Math.random().toString(16).substr(2, 8)}`,
          timestamp: "Just now",
          action: "Active Alarm Solved (Math Solver)",
          course: "CHM 201",
          status: "verified",
          details: "Equation resolved correctly in under 60s · Discipline restored",
        };
        setAuditLogs((prev) => [newAudit, ...prev]);
      }, 1200);
    } else {
      setAlarmMathResult("wrong");
    }
  };

  // Barcode Scanner Verification
  const handleScanBarcode = () => {
    setBarcodeScanned(true);
    setTimeout(() => {
      setIsAlarmActive(false);
      setBarcodeScanned(false);
      const newAudit: AuditLog = {
        id: `aud-${Date.now()}`,
        hash: `0x${Math.random().toString(16).substr(2, 8)}`,
        timestamp: "Just now",
        action: "Active Alarm Solved (Textbook Barcode)",
        course: "CHM 201",
        status: "verified",
        details: "Physical textbook scan verified with cryptographic device timestamp",
      };
      setAuditLogs((prev) => [newAudit, ...prev]);
    }, 1400);
  };

  // Partner Emergency Test Dispatch
  const handleTestPartnerDispatch = (partnerName: string) => {
    setDispatchAlertToast(`WhatsApp Emergency Dispatch broadcasted to ${partnerName}!`);
    setTimeout(() => setDispatchAlertToast(null), 4000);
  };

  // Filtered Search Results
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = taskPriorityFilter === "all" ||
      (taskPriorityFilter === "urgent" && t.isUrgent) ||
      (taskPriorityFilter === t.category);
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-[#f0f5fe] text-[#0b1a33] font-sans antialiased selection:bg-[#0a66ff] selection:text-white">
      
      {/* ====== GLOBAL TOP NOTIFICATION TOAST ====== */}
      {dispatchAlertToast && (
        <div className="fixed top-5 right-5 z-50 animate-bounce bg-[#0b1a33] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">
            <i className="fas fa-paper-plane"></i>
          </div>
          <span className="text-xs font-bold">{dispatchAlertToast}</span>
        </div>
      )}

      {/* ====== MAIN DASHBOARD WRAPPER ====== */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ====== HEADER & GREETING BAR ====== */}
        <header className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/80 shadow-[0_4px_24px_rgba(10,102,255,0.06)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Left: Branding & Student Academic Status */}
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <Link href="/" className="w-12 h-12 rounded-2xl bg-[#0a66ff] flex items-center justify-center text-white shadow-md shadow-[#0a66ff]/30 shrink-0 hover:scale-105 transition-transform">
              <Image
                src="/logo/mypact_icon.svg"
                alt="MyPact"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
            </Link>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-[#0b1a33] tracking-tight">
                  Good morning, {userProfile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[0.65rem] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Enforced</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5 flex-wrap">
                <i className="fas fa-graduation-cap text-[#0a66ff]"></i>
                <span>{userProfile.university}</span>
                <span>·</span>
                <span className="text-[#0a66ff] font-bold">{userProfile.streak}-day streak</span>
                <span>·</span>
                <span>{tasks.filter((t) => t.status !== "completed").length} tasks due today</span>
              </p>
            </div>
          </div>

          {/* Right: Quick Action Triggers */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Global Search Button (⌘K) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-[#e8f0fe] text-slate-600 hover:text-[#0a66ff] text-xs font-bold transition-all border border-slate-200/80 flex items-center gap-2 cursor-pointer shadow-2xs"
              title="Search anything (⌘K)"
            >
              <i className="fas fa-search text-xs"></i>
              <span className="hidden sm:inline">Search</span>
              <kbd className="text-[0.65rem] bg-white px-1.5 py-0.5 rounded border border-slate-300 text-slate-400 font-mono">⌘K</kbd>
            </button>

            {/* New Task Button (⌘N) */}
            <button
              onClick={() => setIsCreateTaskOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0a66ff] to-[#3b82f6] text-white text-xs font-bold shadow-[0_4px_16px_rgba(10,102,255,0.25)] hover:shadow-[0_6px_20px_rgba(10,102,255,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fas fa-plus text-xs"></i>
              <span>New Task</span>
            </button>

            {/* Simulate Active Alarm Trigger (Page 17) */}
            <button
              onClick={() => setIsAlarmActive(true)}
              className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Test Emergency Task Verification Alarm"
            >
              <i className="fas fa-bell-slash text-xs animate-pulse"></i>
              <span className="hidden md:inline">Test Alarm</span>
            </button>

            {/* Alerts Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setIsAlertsOpen(!isAlertsOpen)}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer relative"
              >
                <i className="fas fa-bell text-xs"></i>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
              </button>

              {/* Alerts Dropdown Menu */}
              {isAlertsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-40 animate-fadeIn">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                    <span className="text-xs font-extrabold uppercase text-[#0b1a33] tracking-wider">Accountability Alerts</span>
                    <span className="text-[0.65rem] text-[#0a66ff] font-bold">2 New</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-red-50/70 border border-red-100 text-left">
                      <div className="flex items-center gap-2 text-xs font-bold text-red-600">
                        <i className="fas fa-triangle-exclamation"></i>
                        <span>High-Stakes Countdown: 3 Days</span>
                      </div>
                      <p className="text-[0.7rem] text-slate-600 mt-0.5">Organic Chemistry Final Exam is in 3 days. Focus schedule locked.</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-left">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#0a66ff]">
                        <i className="fas fa-shield-check"></i>
                        <span>Partner Sync Active</span>
                      </div>
                      <p className="text-[0.7rem] text-slate-600 mt-0.5">Sarah K. verified your study proof for Calculus III.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Pill */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0b1a33] text-xs font-bold transition-all border border-slate-200/80"
              title="Back to Home"
            >
              <i className="fas fa-house text-[0.65rem] text-[#0a66ff]"></i>
              <span className="hidden sm:inline text-[0.7rem]">Home</span>
            </Link>
          </div>
        </header>

        {/* ====== NAVIGATION TAB SWITCHER (PAGES 13 - 24) ====== */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-1.5 border border-slate-200/70 shadow-2xs overflow-x-auto flex items-center gap-1 scrollbar-none">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === "overview"
              ? "bg-[#0a66ff] text-white shadow-sm shadow-[#0a66ff]/30"
              : "text-slate-600 hover:text-[#0a66ff] hover:bg-slate-100"
              }`}
          >
            <i className="fas fa-chart-pie text-xs"></i>
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === "tasks"
              ? "bg-[#0a66ff] text-white shadow-sm shadow-[#0a66ff]/30"
              : "text-slate-600 hover:text-[#0a66ff] hover:bg-slate-100"
              }`}
          >
            <i className="fas fa-calendar-check text-xs"></i>
            <span>Tasks & Schedule Hub</span>
            <span className={`text-[0.65rem] px-1.5 py-0.2 rounded-full ${activeTab === "tasks" ? "bg-white/20 text-white" : "bg-blue-100 text-[#0a66ff]"}`}>
              {tasks.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === "courses"
              ? "bg-[#0a66ff] text-white shadow-sm shadow-[#0a66ff]/30"
              : "text-slate-600 hover:text-[#0a66ff] hover:bg-slate-100"
              }`}
          >
            <i className="fas fa-book-bookmark text-xs"></i>
            <span>Course Vault & AI</span>
          </button>

          <button
            onClick={() => setActiveTab("focus")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === "focus"
              ? "bg-[#0a66ff] text-white shadow-sm shadow-[#0a66ff]/30"
              : "text-slate-600 hover:text-[#0a66ff] hover:bg-slate-100"
              }`}
          >
            <i className="fas fa-stopwatch text-xs"></i>
            <span>Focus Room</span>
          </button>

          <button
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === "audit"
              ? "bg-[#0a66ff] text-white shadow-sm shadow-[#0a66ff]/30"
              : "text-slate-600 hover:text-[#0a66ff] hover:bg-slate-100"
              }`}
          >
            <i className="fas fa-fingerprint text-xs"></i>
            <span>Discipline & Audit</span>
          </button>

          <button
            onClick={() => setActiveTab("network")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === "network"
              ? "bg-[#0a66ff] text-white shadow-sm shadow-[#0a66ff]/30"
              : "text-slate-600 hover:text-[#0a66ff] hover:bg-slate-100"
              }`}
          >
            <i className="fas fa-users text-xs"></i>
            <span>Accountability Network</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === "settings"
              ? "bg-[#0a66ff] text-white shadow-sm shadow-[#0a66ff]/30"
              : "text-slate-600 hover:text-[#0a66ff] hover:bg-slate-100"
              }`}
          >
            <i className="fas fa-shield-halved text-xs"></i>
            <span>Settings & Lockout</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: PAGE 13 — STUDENT DASHBOARD MAIN GRID                             */}
        {/* ========================================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Stat 1: Completion Rate */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(10,102,255,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.72rem] uppercase font-bold tracking-wider text-slate-400">Completion Rate</span>
                  <div className="w-8 h-8 rounded-full bg-[#0a66ff] text-white flex items-center justify-center text-xs shadow-sm shadow-[#0a66ff]/20">
                    <i className="fas fa-circle-check"></i>
                  </div>
                </div>
                <div className="text-3xl font-black text-[#0b1a33]">
                  <span className="text-[#0a66ff]">97</span>%
                </div>
                <div className="text-[0.72rem] font-bold text-emerald-600 mt-1 flex items-center gap-1">
                  <i className="fas fa-arrow-trend-up"></i>
                  <span>+12% this week</span>
                </div>
              </div>

              {/* Stat 2: Tasks Completed */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(10,102,255,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.72rem] uppercase font-bold tracking-wider text-slate-400">Tasks Completed</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-sm shadow-emerald-500/20">
                    <i className="fas fa-list-check"></i>
                  </div>
                </div>
                <div className="text-3xl font-black text-[#0b1a33]">47</div>
                <div className="text-[0.72rem] font-bold text-emerald-600 mt-1 flex items-center gap-1">
                  <i className="fas fa-arrow-trend-up"></i>
                  <span>+8 this week</span>
                </div>
              </div>

              {/* Stat 3: Study Hours */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(10,102,255,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.72rem] uppercase font-bold tracking-wider text-slate-400">Study Hours</span>
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs shadow-sm shadow-amber-500/20">
                    <i className="fas fa-clock"></i>
                  </div>
                </div>
                <div className="text-3xl font-black text-[#0b1a33]">84h</div>
                <div className="text-[0.72rem] font-bold text-emerald-600 mt-1 flex items-center gap-1">
                  <i className="fas fa-arrow-trend-up"></i>
                  <span>+6h this week</span>
                </div>
              </div>

              {/* Stat 4: Overdue Tasks */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(10,102,255,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.72rem] uppercase font-bold tracking-wider text-slate-400">Overdue Tasks</span>
                  <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-xs shadow-sm shadow-red-500/20">
                    <i className="fas fa-triangle-exclamation"></i>
                  </div>
                </div>
                <div className="text-3xl font-black text-red-500">2</div>
                <div className="text-[0.72rem] font-bold text-red-500 mt-1 flex items-center gap-1">
                  <i className="fas fa-arrow-trend-down"></i>
                  <span>Needs attention</span>
                </div>
              </div>

            </div>

            {/* Middle Grid: Discipline Gauge (Span 2), Streak Card, Countdown Card */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

              {/* ====== DISCIPLINE SCORE GAUGE (Span 2) ====== */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(10,102,255,0.05)] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-sm font-bold">
                      <i className="fas fa-shield-halved"></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#0b1a33]">Discipline Score Engine</h3>
                      <p className="text-[0.7rem] text-slate-400">Algorithmic accountability calibration (Last 30 days)</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[0.65rem] font-bold">
                    Grade A Status
                  </span>
                </div>

                {/* Gauge Ring Row */}
                <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
                  {/* SVG Gauge */}
                  <div className="relative w-32 h-32 shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                      {/* Background Ring */}
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#e2eaf5"
                        strokeWidth="10"
                      />
                      {/* Foreground Animated Ring (85% = 267.03 of 314.16 circumference) */}
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#0a66ff"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray="314.16"
                        strokeDashoffset="47.12"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl font-black text-[#0b1a33] leading-none">85</span>
                      <span className="text-[0.6rem] font-extrabold uppercase tracking-wider text-slate-400 mt-0.5">/ 100</span>
                    </div>
                  </div>

                  {/* Gauge Metric Breakdown */}
                  <div className="grid grid-cols-2 gap-4 flex-1 w-full">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="text-[0.65rem] uppercase font-bold text-slate-400">Perfect Days</div>
                      <div className="text-base font-black text-[#0b1a33] mt-0.5">
                        <span className="text-[#0a66ff]">18</span> / 30
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="text-[0.65rem] uppercase font-bold text-slate-400">Current Streak</div>
                      <div className="text-base font-black text-[#0b1a33] mt-0.5">
                        <span className="text-[#0a66ff]">12</span> Days
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="text-[0.65rem] uppercase font-bold text-slate-400">Missed Tasks</div>
                      <div className="text-base font-black text-red-500 mt-0.5">4</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="text-[0.65rem] uppercase font-bold text-slate-400">Lockouts Triggered</div>
                      <div className="text-base font-black text-amber-500 mt-0.5">2</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[0.72rem] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <i className="fas fa-chart-line text-[#0a66ff]"></i>
                    <span>Projected Semester GPA: <strong className="text-[#0a66ff]">{userProfile.gpaTarget}</strong></span>
                  </span>
                  <button onClick={() => setActiveTab("audit")} className="text-[#0a66ff] font-bold hover:underline cursor-pointer">
                    View Audit Breakdown →
                  </button>
                </div>
              </div>

              {/* ====== ACTIVE STREAK CARD ====== */}
              <div className="bg-gradient-to-br from-[#0b1a33] to-[#142b4a] rounded-3xl p-6 text-white border border-white/10 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[0.7rem] uppercase font-extrabold tracking-wider text-amber-400 flex items-center gap-1.5">
                      <i className="fas fa-fire text-amber-400"></i>
                      <span>Active Streak</span>
                    </span>
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm">
                      <i className="fas fa-fire"></i>
                    </div>
                  </div>
                  <div className="text-3xl font-black text-white">
                    <span className="text-amber-400">12</span> Days
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Best streak: 24 days · 2 days to next unlock!</p>
                </div>

                {/* Day Circles M T W T F S S */}
                <div className="flex items-center justify-between gap-1.5 mt-6 pt-4 border-t border-white/10">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => {
                    const isActive = idx < 5;
                    const isToday = idx === 5;
                    return (
                      <div
                        key={idx}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-transform ${isToday
                          ? "bg-amber-400 text-[#0b1a33] shadow-md shadow-amber-400/40 scale-110"
                          : isActive
                            ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                            : "bg-white/5 text-white/30"
                          }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ====== HIGH-STAKES COUNTDOWN ====== */}
              <div className="bg-gradient-to-br from-[#0b1a33] to-[#142b4a] rounded-3xl p-6 text-white border border-white/10 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[0.7rem] uppercase font-extrabold tracking-wider text-slate-300 flex items-center gap-1.5">
                      <i className="fas fa-stopwatch text-[#0a66ff]"></i>
                      <span>High-Stakes Countdown</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[0.62rem] font-black uppercase tracking-wider">
                      Urgent
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-white leading-snug">
                    Organic Chemistry Final Exam
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">Chapters 1-12 · 45% of Final Grade</p>
                </div>

                {/* Live Ticking Countdown Timer */}
                <div className="flex items-center justify-between gap-2 mt-4 p-3.5 rounded-2xl bg-black/30 border border-white/10 font-mono">
                  <div className="text-center flex-1">
                    <div className="text-xl sm:text-2xl font-black text-white tabular-nums">
                      {String(cdDays).padStart(2, "0")}
                    </div>
                    <div className="text-[0.55rem] uppercase text-slate-400 font-sans tracking-wider">Days</div>
                  </div>
                  <span className="text-slate-500 font-bold">:</span>
                  <div className="text-center flex-1">
                    <div className="text-xl sm:text-2xl font-black text-white tabular-nums">
                      {String(cdHours).padStart(2, "0")}
                    </div>
                    <div className="text-[0.55rem] uppercase text-slate-400 font-sans tracking-wider">Hours</div>
                  </div>
                  <span className="text-slate-500 font-bold">:</span>
                  <div className="text-center flex-1">
                    <div className="text-xl sm:text-2xl font-black text-white tabular-nums">
                      {String(cdMins).padStart(2, "0")}
                    </div>
                    <div className="text-[0.55rem] uppercase text-slate-400 font-sans tracking-wider">Mins</div>
                  </div>
                  <span className="text-slate-500 font-bold">:</span>
                  <div className="text-center flex-1">
                    <div className="text-xl sm:text-2xl font-black text-amber-400 tabular-nums">
                      {String(cdSecs).padStart(2, "0")}
                    </div>
                    <div className="text-[0.55rem] uppercase text-slate-400 font-sans tracking-wider">Secs</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: Today's Timeline (Span 3) & Quick Action Shortcuts (Span 1) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

              {/* ====== TODAY'S TIMELINE ====== */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(10,102,255,0.05)]">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-sm font-bold">
                      <i className="fas fa-list-ul"></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#0b1a33]">Today&apos;s Enforcement Timeline</h3>
                      <p className="text-[0.7rem] text-slate-400">Verified schedule and active pacts</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("tasks")}
                    className="text-xs text-[#0a66ff] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Hub</span>
                    <i className="fas fa-arrow-right text-[0.65rem]"></i>
                  </button>
                </div>

                {/* Timeline Items */}
                <div className="space-y-3">
                  {tasks.slice(0, 5).map((task) => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${task.status === "completed"
                        ? "bg-slate-50/60 border-slate-200/60 opacity-60"
                        : task.status === "active"
                          ? "bg-[#e8f0fe]/40 border-[#0a66ff]/30 shadow-2xs"
                          : task.status === "overdue"
                            ? "bg-red-50/40 border-red-200"
                            : "bg-white border-slate-200 hover:border-[#0a66ff]/40"
                        }`}
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="text-xs font-bold text-slate-400 min-w-[65px] pt-0.5 sm:pt-0">
                          {task.time}
                        </div>

                        {/* Status Icon Indicator */}
                        <div className={`w-3 h-3 rounded-full mt-1 sm:mt-0 shrink-0 ${task.status === "completed"
                          ? "bg-emerald-500"
                          : task.status === "active"
                            ? "bg-[#0a66ff] ring-4 ring-[#0a66ff]/20 animate-pulse"
                            : task.status === "overdue"
                              ? "bg-red-500"
                              : "bg-amber-400"
                          }`} />

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs sm:text-sm font-bold ${task.status === "completed" ? "line-through text-slate-400" : "text-[#0b1a33]"}`}>
                              {task.title}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[0.65rem] font-bold">
                              {task.course}
                            </span>
                            {task.isUrgent && (
                              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[0.65rem] font-extrabold uppercase">
                                Urgent
                              </span>
                            )}
                          </div>
                          <div className="text-[0.7rem] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>{task.duration}</span>
                            <span>·</span>
                            <span className="capitalize flex items-center gap-1">
                              <i className="fas fa-lock text-[0.6rem] text-slate-400"></i>
                              {task.verificationMethod} verification required
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => handleToggleTaskStatus(task.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${task.status === "completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 hover:bg-[#0a66ff] hover:text-white text-slate-700"
                            }`}
                        >
                          <i className={`fas ${task.status === "completed" ? "fa-check-double" : "fa-check"} text-xs`}></i>
                          <span>{task.status === "completed" ? "Verified" : "Verify Proof"}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ====== QUICK ACTIONS ====== */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(10,102,255,0.05)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-sm font-bold">
                      <i className="fas fa-bolt"></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#0b1a33]">Quick Actions</h3>
                      <p className="text-[0.7rem] text-slate-400">Rapid enforcement commands</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setIsCreateTaskOpen(true)}
                      className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-[#e8f0fe] hover:text-[#0a66ff] text-slate-700 text-xs font-bold transition-all flex items-center justify-between border border-slate-200/70 cursor-pointer group"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-[#0a66ff] text-white flex items-center justify-center text-xs">
                          <i className="fas fa-plus"></i>
                        </span>
                        <span>Create New Task</span>
                      </span>
                      <kbd className="text-[0.62rem] text-slate-400 font-mono">⌘N</kbd>
                    </button>

                    <button
                      onClick={() => setActiveTab("focus")}
                      className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-[#e8f0fe] hover:text-[#0a66ff] text-slate-700 text-xs font-bold transition-all flex items-center justify-between border border-slate-200/70 cursor-pointer group"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xs">
                          <i className="fas fa-play"></i>
                        </span>
                        <span>Start Focus Session</span>
                      </span>
                      <kbd className="text-[0.62rem] text-slate-400 font-mono">⌘F</kbd>
                    </button>

                    <button
                      onClick={() => setActiveTab("network")}
                      className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-[#e8f0fe] hover:text-[#0a66ff] text-slate-700 text-xs font-bold transition-all flex items-center justify-between border border-slate-200/70 cursor-pointer group"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xs">
                          <i className="fas fa-users"></i>
                        </span>
                        <span>Notify Partner</span>
                      </span>
                      <kbd className="text-[0.62rem] text-slate-400 font-mono">⌘P</kbd>
                    </button>

                    <button
                      onClick={() => setActiveTab("audit")}
                      className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-[#e8f0fe] hover:text-[#0a66ff] text-slate-700 text-xs font-bold transition-all flex items-center justify-between border border-slate-200/70 cursor-pointer group"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-purple-500 text-white flex items-center justify-center text-xs">
                          <i className="fas fa-fingerprint"></i>
                        </span>
                        <span>View Audit Trail</span>
                      </span>
                      <kbd className="text-[0.62rem] text-slate-400 font-mono">⌘A</kbd>
                    </button>

                    <button
                      onClick={() => setIsAlarmActive(true)}
                      className="w-full p-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-all flex items-center justify-between border border-red-200 cursor-pointer group"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-red-500 text-white flex items-center justify-center text-xs">
                          <i className="fas fa-triangle-exclamation"></i>
                        </span>
                        <span>Trigger Lockout Test</span>
                      </span>
                      <kbd className="text-[0.62rem] text-red-400 font-mono">⌘L</kbd>
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                  <span className="text-[0.65rem] text-slate-400 flex items-center justify-center gap-1">
                    <i className="fas fa-shield-halved text-[#0a66ff]"></i>
                    <span>Hardware Anti-Bypass Kernel Active</span>
                  </span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: PAGES 15-16 — TASK & SCHEDULE HUB (List / Calendar / Kanban)      */}
        {/* ========================================================================= */}
        {activeTab === "tasks" && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* View Controls & Filter Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Left: View Mode Toggles */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setTaskViewMode("list")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${taskViewMode === "list" ? "bg-white text-[#0a66ff] shadow-xs" : "text-slate-600"}`}
                >
                  <i className="fas fa-list text-xs"></i>
                  <span>List View</span>
                </button>
                <button
                  onClick={() => setTaskViewMode("calendar")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${taskViewMode === "calendar" ? "bg-white text-[#0a66ff] shadow-xs" : "text-slate-600"}`}
                >
                  <i className="fas fa-calendar-days text-xs"></i>
                  <span>Calendar</span>
                </button>
                <button
                  onClick={() => setTaskViewMode("kanban")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${taskViewMode === "kanban" ? "bg-white text-[#0a66ff] shadow-xs" : "text-slate-600"}`}
                >
                  <i className="fas fa-table-columns text-xs"></i>
                  <span>Kanban Board</span>
                </button>
              </div>

              {/* Right: Category Filters & Add Button */}
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={taskPriorityFilter}
                  onChange={(e) => setTaskPriorityFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="urgent">Urgent Only</option>
                  <option value="exam">Exams</option>
                  <option value="study">Study Pacts</option>
                  <option value="homework">Homework</option>
                  <option value="lab">Lab Reports</option>
                </select>

                <button
                  onClick={() => setIsCreateTaskOpen(true)}
                  className="px-4 py-1.5 rounded-xl bg-[#0a66ff] text-white text-xs font-bold shadow-sm shadow-[#0a66ff]/30 hover:bg-[#084bc2] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <i className="fas fa-plus text-xs"></i>
                  <span>Create Pact</span>
                </button>
              </div>
            </div>

            {/* Sub-view: LIST VIEW */}
            {taskViewMode === "list" && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-extrabold text-[#0b1a33]">Scheduled Pacts & Challenges</h3>
                  <span className="text-xs text-slate-400">{filteredTasks.length} Active Tasks</span>
                </div>

                <div className="space-y-3">
                  {filteredTasks.map((t) => (
                    <div
                      key={t.id}
                      className="p-4 rounded-2xl border border-slate-200/80 hover:border-[#0a66ff] bg-slate-50/40 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <button
                          onClick={() => handleToggleTaskStatus(t.id)}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-colors cursor-pointer shrink-0 mt-0.5 sm:mt-0 ${t.status === "completed" ? "bg-emerald-500 text-white" : "border-2 border-slate-300 hover:border-[#0a66ff]"}`}
                        >
                          {t.status === "completed" && <i className="fas fa-check"></i>}
                        </button>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-sm font-bold ${t.status === "completed" ? "line-through text-slate-400" : "text-[#0b1a33]"}`}>
                              {t.title}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-[#e8f0fe] text-[#0a66ff] text-[0.65rem] font-bold">
                              {t.course}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[0.65rem] font-bold uppercase">
                              {t.category}
                            </span>
                            {t.isUrgent && (
                              <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-600 text-[0.65rem] font-extrabold">
                                Urgent
                              </span>
                            )}
                          </div>
                          <div className="text-[0.7rem] text-slate-500 flex items-center gap-2 mt-1">
                            <span><i className="fas fa-calendar text-slate-400 mr-1"></i>{t.date} at {t.time}</span>
                            <span>·</span>
                            <span><i className="fas fa-hourglass-half text-slate-400 mr-1"></i>{t.duration}</span>
                            <span>·</span>
                            <span className="text-[#0a66ff] font-medium"><i className="fas fa-shield-check mr-1"></i>{t.verificationMethod.toUpperCase()} Proof</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => setIsAlarmActive(true)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#0a66ff] hover:text-white text-slate-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <i className="fas fa-bolt text-xs"></i>
                          <span>Solve Now</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-view: CALENDAR VIEW */}
            {taskViewMode === "calendar" && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-extrabold text-[#0b1a33]">September 2026 Academic Calendar</h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0a66ff]">
                    <span>FUNAAB Exam & Study Block Schedule</span>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 pb-2 border-b border-slate-100">
                  <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
                </div>

                <div className="grid grid-cols-7 gap-2 min-h-[300px]">
                  {Array.from({ length: 35 }).map((_, i) => {
                    const dayNum = (i % 30) + 1;
                    const hasExam = dayNum === 28 || dayNum === 12;
                    const hasPact = dayNum === 5 || dayNum === 10 || dayNum === 15;
                    return (
                      <div
                        key={i}
                        className={`p-2 rounded-2xl border text-left min-h-[70px] flex flex-col justify-between transition-all ${dayNum === 5 ? "bg-[#e8f0fe]/60 border-[#0a66ff]" : "bg-slate-50/40 border-slate-100"}`}
                      >
                        <span className={`text-[0.7rem] font-bold ${dayNum === 5 ? "text-[#0a66ff]" : "text-slate-500"}`}>{dayNum}</span>
                        {hasExam && (
                          <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-600 text-[0.55rem] font-extrabold truncate">
                            CHM 201 Exam
                          </span>
                        )}
                        {hasPact && !hasExam && (
                          <span className="px-1.5 py-0.5 rounded bg-blue-100 text-[#0a66ff] text-[0.55rem] font-bold truncate">
                            Pact Verification
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sub-view: KANBAN BOARD */}
            {taskViewMode === "kanban" && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Column 1: To Do */}
                <div className="bg-slate-100/70 rounded-3xl p-4 space-y-3">
                  <div className="flex items-center justify-between font-bold text-xs text-slate-700">
                    <span>To Do</span>
                    <span className="px-2 py-0.5 rounded-full bg-white text-slate-500 text-[0.65rem]">2</span>
                  </div>
                  {tasks.filter((t) => t.status === "pending").slice(0, 2).map((t) => (
                    <div key={t.id} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                      <span className="text-xs font-bold text-[#0b1a33] block">{t.title}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[0.65rem] font-bold">{t.course}</span>
                    </div>
                  ))}
                </div>

                {/* Column 2: In Progress */}
                <div className="bg-blue-50/50 rounded-3xl p-4 space-y-3">
                  <div className="flex items-center justify-between font-bold text-xs text-[#0a66ff]">
                    <span>In Progress</span>
                    <span className="px-2 py-0.5 rounded-full bg-white text-[#0a66ff] text-[0.65rem]">1</span>
                  </div>
                  {tasks.filter((t) => t.status === "active").map((t) => (
                    <div key={t.id} className="bg-white p-3.5 rounded-2xl border border-[#0a66ff]/30 shadow-2xs space-y-2">
                      <span className="text-xs font-bold text-[#0b1a33] block">{t.title}</span>
                      <span className="px-2 py-0.5 rounded bg-[#e8f0fe] text-[#0a66ff] text-[0.65rem] font-bold">{t.course}</span>
                    </div>
                  ))}
                </div>

                {/* Column 3: Verification Pending */}
                <div className="bg-amber-50/50 rounded-3xl p-4 space-y-3">
                  <div className="flex items-center justify-between font-bold text-xs text-amber-600">
                    <span>Verification Required</span>
                    <span className="px-2 py-0.5 rounded-full bg-white text-amber-600 text-[0.65rem]">1</span>
                  </div>
                  {tasks.filter((t) => t.status === "overdue").map((t) => (
                    <div key={t.id} className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-2xs space-y-2">
                      <span className="text-xs font-bold text-[#0b1a33] block">{t.title}</span>
                      <button onClick={() => setIsAlarmActive(true)} className="w-full py-1 rounded bg-amber-500 text-white text-[0.65rem] font-bold cursor-pointer">
                        Verify Now
                      </button>
                    </div>
                  ))}
                </div>

                {/* Column 4: Completed */}
                <div className="bg-emerald-50/50 rounded-3xl p-4 space-y-3">
                  <div className="flex items-center justify-between font-bold text-xs text-emerald-600">
                    <span>Completed & Sealed</span>
                    <span className="px-2 py-0.5 rounded-full bg-white text-emerald-600 text-[0.65rem]">47</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-2xs space-y-2">
                    <span className="text-xs font-bold text-slate-400 line-through block">Calculus Problem Set 1</span>
                    <span className="text-[0.65rem] text-emerald-600 font-bold flex items-center gap-1">
                      <i className="fas fa-check-circle"></i> Proof Verified
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: PAGES 18 & 19 — COURSE VAULT & AI ASSISTANT                       */}
        {/* ========================================================================= */}
        {activeTab === "courses" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            
            {/* Left Column: Enrolled Courses */}
            <div className="lg:col-span-1 space-y-3">
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-extrabold text-[#0b1a33]">Enrolled Course Vault</h3>
                  <span className="text-xs text-[#0a66ff] font-bold">{courses.length} Courses</span>
                </div>

                <div className="space-y-2.5">
                  {courses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => {
                        setSelectedCourse(course);
                        setGradeCalc({ currentStanding: course.currentGrade, finalWeight: 45, goalGrade: course.targetGrade });
                      }}
                      className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${selectedCourse.id === course.id
                        ? "bg-[#e8f0fe] border-[#0a66ff] shadow-sm"
                        : "bg-slate-50/50 hover:bg-white border-slate-200/80"
                        }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-[#0a66ff]">{course.code}</span>
                          <span className="text-xs font-bold text-[#0b1a33] truncate max-w-[160px]">{course.name}</span>
                        </div>
                        <span className="text-[0.7rem] text-slate-400">{course.professor}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-[#0b1a33]">{course.currentGrade}%</span>
                        <span className="text-[0.62rem] text-slate-400 block">Goal: {course.targetGrade}%</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle & Right Column: Course Detail, Syllabus & Grade Calculator */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Course Detail Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-100">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-extrabold">
                      {selectedCourse.code}
                    </span>
                    <h2 className="text-lg font-black text-[#0b1a33] mt-2">{selectedCourse.name}</h2>
                    <p className="text-xs text-slate-500">Instructor: {selectedCourse.professor} · FUNAAB Academic Registry</p>
                  </div>
                  <button
                    onClick={() => setIsAiDrawerOpen(true)}
                    className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#0a66ff] to-[#7c3aed] text-white text-xs font-bold shadow-md shadow-[#0a66ff]/20 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
                  >
                    <i className="fas fa-wand-magic-sparkles text-xs"></i>
                    <span>Ask Coursework AI</span>
                  </button>
                </div>

                {/* Auto-parsed Syllabus Dates */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                    Auto-Parsed Syllabus Milestones
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedCourse.syllabusDates.map((milestone, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-[#0a66ff] text-[0.6rem] font-bold uppercase">
                          {milestone.type}
                        </span>
                        <h5 className="text-xs font-bold text-[#0b1a33] mt-1.5">{milestone.title}</h5>
                        <p className="text-[0.7rem] text-slate-400 mt-0.5">{milestone.date}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Grade Goal Calculator */}
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                    Final Exam Grade Goal Calculator
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#f8faff] p-4 rounded-2xl border border-slate-200/70">
                    <div>
                      <label className="text-[0.7rem] font-bold text-slate-600 block mb-1">Current Standing (%)</label>
                      <input
                        type="number"
                        value={gradeCalc.currentStanding}
                        onChange={(e) => setGradeCalc({ ...gradeCalc, currentStanding: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-[#0b1a33]"
                      />
                    </div>
                    <div>
                      <label className="text-[0.7rem] font-bold text-slate-600 block mb-1">Target Grade (%)</label>
                      <input
                        type="number"
                        value={gradeCalc.goalGrade}
                        onChange={(e) => setGradeCalc({ ...gradeCalc, goalGrade: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-[#0b1a33]"
                      />
                    </div>
                    <div>
                      <label className="text-[0.7rem] font-bold text-slate-600 block mb-1">Final Weight (%)</label>
                      <input
                        type="number"
                        value={gradeCalc.finalWeight}
                        onChange={(e) => setGradeCalc({ ...gradeCalc, finalWeight: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-[#0b1a33]"
                      />
                    </div>
                  </div>

                  {/* Calculated Result */}
                  <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
                    <span>
                      Required Score on Final Exam:{" "}
                      <strong>
                        {Math.max(
                          0,
                          Math.round(
                            (gradeCalc.goalGrade -
                              gradeCalc.currentStanding * (1 - gradeCalc.finalWeight / 100)) /
                              (gradeCalc.finalWeight / 100)
                          )
                        )}
                        %
                      </strong>
                    </span>
                    <span className="text-[0.68rem] text-emerald-600 font-medium">Auto-calibrated for A (4.0)</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: PAGE 20 — FOCUS ROOM & SOUNDSCAPE GENERATOR                       */}
        {/* ========================================================================= */}
        {activeTab === "focus" && (
          <div className="bg-gradient-to-br from-[#0b1a33] to-[#142b4a] rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-white/10 space-y-8 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#0a66ff]/20 text-[#0a66ff] border border-[#0a66ff]/30 text-[0.65rem] font-extrabold uppercase tracking-wider">
                  Distraction Shield Active
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Focus Sanctuary</h2>
                <p className="text-xs text-slate-300">Strict tab-lock and ambient neuro-acoustic generator</p>
              </div>

              {/* Focus Mode Selector */}
              <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/10">
                <button
                  onClick={() => { setFocusMode("pomodoro"); setFocusTimeLeft(25 * 60); setIsFocusRunning(false); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${focusMode === "pomodoro" ? "bg-[#0a66ff] text-white" : "text-slate-300 hover:text-white"}`}
                >
                  25m Pomodoro
                </button>
                <button
                  onClick={() => { setFocusMode("shortBreak"); setFocusTimeLeft(5 * 60); setIsFocusRunning(false); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${focusMode === "shortBreak" ? "bg-[#0a66ff] text-white" : "text-slate-300 hover:text-white"}`}
                >
                  5m Break
                </button>
                <button
                  onClick={() => { setFocusMode("longBreak"); setFocusTimeLeft(15 * 60); setIsFocusRunning(false); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${focusMode === "longBreak" ? "bg-[#0a66ff] text-white" : "text-slate-300 hover:text-white"}`}
                >
                  15m Long Break
                </button>
              </div>
            </div>

            {/* Pomodoro Timer Circular Display */}
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#0a66ff"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="326.72"
                    strokeDashoffset={326.72 - (326.72 * focusTimeLeft) / (focusMode === "pomodoro" ? 25 * 60 : focusMode === "shortBreak" ? 5 * 60 : 15 * 60)}
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tighter">
                    {String(focusMinutes).padStart(2, "0")}:{String(focusSecondsDisplay).padStart(2, "0")}
                  </span>
                  <span className="text-[0.7rem] uppercase font-bold text-slate-400 mt-1">
                    {isFocusRunning ? "Session in Progress" : "Ready to Start"}
                  </span>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setIsFocusRunning(!isFocusRunning)}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#0a66ff] to-[#3b82f6] text-white font-extrabold text-sm shadow-xl hover:shadow-[0_8px_32px_rgba(10,102,255,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <i className={`fas ${isFocusRunning ? "fa-pause" : "fa-play"} text-xs`}></i>
                  <span>{isFocusRunning ? "Pause Session" : "Start Focus Session"}</span>
                </button>
                <button
                  onClick={() => { setIsFocusRunning(false); setFocusTimeLeft(25 * 60); }}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Reset Timer"
                >
                  <i className="fas fa-rotate-left text-sm"></i>
                </button>
              </div>
            </div>

            {/* Ambient Soundscapes Synthesizer Generator */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <i className="fas fa-waveform text-[#0a66ff]"></i>
                  <span>Neuro-Acoustic Soundscapes</span>
                </span>
                <span className="text-[0.7rem] text-slate-400">
                  {activeSound !== "silence" ? `Playing: ${activeSound.toUpperCase()}` : "Synthesizer Idle"}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { id: "silence", name: "Mute", icon: "fa-volume-xmark" },
                  { id: "rain", name: "Rain", icon: "fa-cloud-rain" },
                  { id: "cafe", name: "Cafe", icon: "fa-mug-hot" },
                  { id: "white", name: "White Noise", icon: "fa-wind" },
                  { id: "binaural", name: "40Hz Gamma", icon: "fa-brain" },
                ].map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => toggleSoundscape(sound.id as any)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${activeSound === sound.id
                      ? "bg-[#0a66ff] text-white border-[#0a66ff] shadow-lg shadow-[#0a66ff]/40 scale-105"
                      : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
                      }`}
                  >
                    <i className={`fas ${sound.icon} text-base`}></i>
                    <span className="text-xs font-bold">{sound.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 5: PAGE 21 — DISCIPLINE & AUDIT DASHBOARD                            */}
        {/* ========================================================================= */}
        {activeTab === "audit" && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Score History & Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
                <span className="text-[0.7rem] uppercase font-bold text-slate-400">30-Day Discipline Index</span>
                <div className="text-3xl font-black text-[#0a66ff] mt-1">85 / 100</div>
                <p className="text-xs text-emerald-600 font-bold mt-1">Top 3% of Students in FUNAAB</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
                <span className="text-[0.7rem] uppercase font-bold text-slate-400">Pact Verification Rate</span>
                <div className="text-3xl font-black text-emerald-600 mt-1">98.2%</div>
                <p className="text-xs text-slate-400 font-bold mt-1">47 completed · 0 falsified</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
                <span className="text-[0.7rem] uppercase font-bold text-slate-400">Partner Alert Dispatch Count</span>
                <div className="text-3xl font-black text-amber-500 mt-1">2</div>
                <p className="text-xs text-slate-400 font-bold mt-1">Resolved within 15 minutes</p>
              </div>
            </div>

            {/* Immutable Audit Trail List */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-extrabold text-[#0b1a33]">Immutable Cryptographic Audit Trail</h3>
                  <p className="text-[0.7rem] text-slate-400">Verifiable tamper-proof activity ledger</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[0.65rem] font-bold">
                  Verified Ledger
                </span>
              </div>

              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-[#0a66ff]">{log.hash}</span>
                        <span className="text-xs font-bold text-[#0b1a33]">{log.action}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[0.62rem] font-bold">
                          {log.course}
                        </span>
                      </div>
                      <p className="text-[0.72rem] text-slate-500 mt-1">{log.details}</p>
                    </div>
                    <span className="text-[0.68rem] font-medium text-slate-400 shrink-0">
                      {log.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 6: PAGE 22 — ACCOUNTABILITY NETWORK                                  */}
        {/* ========================================================================= */}
        {activeTab === "network" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-extrabold text-[#0b1a33]">Linked Accountability Partners</h3>
                  <p className="text-[0.7rem] text-slate-400">Emergency alert contacts and verification supervisors</p>
                </div>
                <button
                  onClick={() => alert("Partner Invite link copied to clipboard!")}
                  className="px-4 py-2 rounded-xl bg-[#0a66ff] text-white text-xs font-bold shadow-sm shadow-[#0a66ff]/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <i className="fas fa-user-plus text-xs"></i>
                  <span>Invite New Partner</span>
                </button>
              </div>

              {/* Partners Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {partners.map((partner) => (
                  <div key={partner.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0a66ff] text-white font-black text-sm flex items-center justify-center">
                          {partner.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#0b1a33]">{partner.name}</h4>
                          <p className="text-[0.7rem] text-slate-400">{partner.relationship}</p>
                          <span className="text-[0.7rem] font-mono text-slate-600">{partner.phone}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[0.62rem] font-bold">
                        Connected
                      </span>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                      <span className="text-[0.65rem] text-slate-400">Last alert: {partner.lastDispatch}</span>
                      <button
                        onClick={() => handleTestPartnerDispatch(partner.name)}
                        className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-[#0a66ff] hover:text-white text-slate-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <i className="fas fa-paper-plane text-[0.65rem]"></i>
                        <span>Test Alert</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 7: PAGES 23 & 24 — SETTINGS & SECURITY                               */}
        {/* ========================================================================= */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 animate-fadeIn max-w-3xl mx-auto">
            
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-[#0b1a33]">Enforcement & Device Security</h3>
              <p className="text-xs text-slate-400">Manage strictness controls, lockouts, and authentication parameters</p>
            </div>

            <div className="space-y-4">
              {/* Strict Mode Toggle */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#0b1a33]">Strict Anti-Procrastination Mode</h4>
                  <p className="text-[0.7rem] text-slate-500">Locks non-study applications during focus sprints</p>
                </div>
                <input
                  type="checkbox"
                  checked={settingsState.strictMode}
                  onChange={(e) => setSettingsState({ ...settingsState, strictMode: e.target.checked })}
                  className="w-5 h-5 accent-[#0a66ff] cursor-pointer"
                />
              </div>

              {/* WhatsApp Alert Broadcast */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#0b1a33]">WhatsApp Partner Escalations</h4>
                  <p className="text-[0.7rem] text-slate-500">Automatically broadcast SMS/WhatsApp when alarm is ignored</p>
                </div>
                <input
                  type="checkbox"
                  checked={settingsState.partnerWhatsappAlerts}
                  onChange={(e) => setSettingsState({ ...settingsState, partnerWhatsappAlerts: e.target.checked })}
                  className="w-5 h-5 accent-[#0a66ff] cursor-pointer"
                />
              </div>

              {/* Emergency Passcode */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <label className="text-xs font-bold text-[#0b1a33] block mb-1">Emergency Override PIN</label>
                <div className="flex items-center gap-3">
                  <input
                    type="password"
                    value={settingsState.emergencyPin}
                    onChange={(e) => setSettingsState({ ...settingsState, emergencyPin: e.target.value })}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white font-mono text-sm tracking-widest text-[#0b1a33] outline-none"
                  />
                  <span className="text-[0.7rem] text-slate-400">Held only by your accountability partner</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">All changes cryptographically synced</span>
              <button
                onClick={() => alert("Settings updated successfully!")}
                className="px-6 py-2 rounded-full bg-[#0a66ff] text-white text-xs font-bold shadow-md hover:bg-[#084bc2] transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>

          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: PAGE 14 — GLOBAL SEARCH OVERLAY                                  */}
      {/* ========================================================================= */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-10 animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-white/80 overflow-hidden mt-10">
            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3">
              <i className="fas fa-search text-slate-400 text-sm"></i>
              <input
                type="text"
                autoFocus
                placeholder="Search courses, tasks, notes, audit hash..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm font-medium text-[#0b1a33] placeholder-slate-400 outline-none bg-transparent"
              />
              <button onClick={() => setIsSearchOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <i className="fas fa-xmark text-sm"></i>
              </button>
            </div>

            {/* Filter Pills */}
            <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto">
              {(["all", "courses", "tasks", "notes", "audit"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSearchFilter(filter)}
                  className={`px-3 py-1 rounded-full text-[0.68rem] font-bold uppercase tracking-wider transition-colors cursor-pointer ${searchFilter === filter ? "bg-[#0a66ff] text-white" : "bg-white text-slate-600 border border-slate-200"}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Search Results Preview */}
            <div className="p-4 max-h-80 overflow-y-auto space-y-2">
              <div className="text-[0.65rem] uppercase font-bold text-slate-400 px-2">Instant Matches</div>
              {tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="p-3 rounded-2xl hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-xs">
                      <i className="fas fa-file-lines"></i>
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#0b1a33]">{task.title}</h4>
                      <p className="text-[0.68rem] text-slate-400">{task.course} · {task.date}</p>
                    </div>
                  </div>
                  <span className="text-[0.65rem] text-[#0a66ff] font-bold">Open →</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[0.68rem] text-slate-400 px-5">
              <span>Press <strong>ESC</strong> to close</span>
              <span>Universal Search Engine</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: PAGE 16 — TASK CREATION MODAL                                    */}
      {/* ========================================================================= */}
      {isCreateTaskOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-white/80 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-sm font-bold">
                  <i className="fas fa-plus"></i>
                </div>
                <h3 className="text-sm font-extrabold text-[#0b1a33]">Create New Study Pact</h3>
              </div>
              <button onClick={() => setIsCreateTaskOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <i className="fas fa-xmark text-sm"></i>
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-[0.72rem] font-bold text-slate-700 block mb-1">Pact Title / Deliverable</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Chemistry Problem Set Ch. 8"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-[#0b1a33] outline-none focus:bg-white focus:border-[#0a66ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[0.72rem] font-bold text-slate-700 block mb-1">Course</label>
                  <select
                    value={newTask.course}
                    onChange={(e) => setNewTask({ ...newTask, course: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-[#0b1a33] outline-none"
                  >
                    <option value="CHM 201">CHM 201</option>
                    <option value="MAT 301">MAT 301</option>
                    <option value="CSC 202">CSC 202</option>
                    <option value="PHY 102">PHY 102</option>
                  </select>
                </div>
                <div>
                  <label className="text-[0.72rem] font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-[#0b1a33] outline-none"
                  >
                    <option value="study">Study Sprint</option>
                    <option value="exam">Exam Prep</option>
                    <option value="homework">Homework</option>
                    <option value="lab">Lab Report</option>
                    <option value="project">Group Project</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[0.72rem] font-bold text-slate-700 block mb-1">Required Verification Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "math", name: "Math Solver", icon: "fa-square-root-variable" },
                    { id: "barcode", name: "Textbook Barcode", icon: "fa-barcode" },
                    { id: "quiz", name: "AI Notes Quiz", icon: "fa-brain" },
                    { id: "gps", name: "Library GPS Proof", icon: "fa-location-dot" },
                  ].map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setNewTask({ ...newTask, verificationMethod: m.id as any })}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-all ${newTask.verificationMethod === m.id
                        ? "bg-[#e8f0fe] border-[#0a66ff] text-[#0a66ff] font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-600"
                        }`}
                    >
                      <i className={`fas ${m.icon} text-xs`}></i>
                      <span className="text-xs">{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateTaskOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-[#0a66ff] to-[#3b82f6] text-white text-xs font-bold shadow-md cursor-pointer hover:shadow-lg transition-all"
                >
                  Seal Pact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: PAGE 17 — ACTIVE ALARM & TASK VERIFICATION CHALLENGE            */}
      {/* ========================================================================= */}
      {isAlarmActive && (
        <div className="fixed inset-0 z-50 bg-[#0b1a33]/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn text-white">
          <div className="w-full max-w-xl bg-gradient-to-b from-[#142b4a] to-[#0b1a33] rounded-3xl border border-red-500/40 p-6 sm:p-8 shadow-[0_0_80px_rgba(239,68,68,0.3)] space-y-6">
            
            {/* Alarm Siren Header */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-3xl mx-auto border border-red-500/40 animate-pulse">
                <i className="fas fa-bell"></i>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                Active Verification Challenge
              </h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Solve the challenge before the timer elapses to dismiss alarm and prevent partner WhatsApp dispatch.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 text-red-400 font-mono text-sm font-black border border-red-500/30">
                <i className="fas fa-clock"></i>
                <span>01:{String(alarmTimeRemaining).padStart(2, "0")} remaining</span>
              </div>
            </div>

            {/* Challenge Tabs */}
            <div className="flex items-center justify-center gap-2 bg-black/30 p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => setAlarmChallengeTab("math")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${alarmChallengeTab === "math" ? "bg-[#0a66ff] text-white" : "text-slate-400 hover:text-white"}`}
              >
                <i className="fas fa-square-root-variable mr-1.5"></i>Math Solver
              </button>
              <button
                onClick={() => setAlarmChallengeTab("barcode")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${alarmChallengeTab === "barcode" ? "bg-[#0a66ff] text-white" : "text-slate-400 hover:text-white"}`}
              >
                <i className="fas fa-barcode mr-1.5"></i>Barcode Scan
              </button>
              <button
                onClick={() => setAlarmChallengeTab("quiz")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${alarmChallengeTab === "quiz" ? "bg-[#0a66ff] text-white" : "text-slate-400 hover:text-white"}`}
              >
                <i className="fas fa-brain mr-1.5"></i>AI Notes Quiz
              </button>
            </div>

            {/* Challenge 1: MATH SOLVER */}
            {alarmChallengeTab === "math" && (
              <div className="bg-black/40 rounded-2xl p-5 border border-white/10 space-y-4">
                <div className="text-center">
                  <span className="text-[0.65rem] uppercase font-bold text-slate-400">Calculus Derivative Problem</span>
                  <div className="text-lg font-mono font-bold text-amber-400 mt-1">
                    f(x) = 4x³ - 6x² + 7x. Find f&apos;(2)
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter numerical answer..."
                    value={alarmMathInput}
                    onChange={(e) => setAlarmMathInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-center font-bold text-sm outline-none focus:border-[#0a66ff]"
                  />
                  <button
                    onClick={handleSolveMath}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-lg cursor-pointer"
                  >
                    Submit Proof
                  </button>
                </div>

                {alarmMathResult === "correct" && (
                  <p className="text-center text-xs font-bold text-emerald-400">
                    <i className="fas fa-check-circle mr-1"></i> Correct! Alarm dismissed. +10 Discipline XP.
                  </p>
                )}
                {alarmMathResult === "wrong" && (
                  <p className="text-center text-xs font-bold text-red-400">
                    <i className="fas fa-circle-xmark mr-1"></i> Incorrect derivative evaluation. Try again!
                  </p>
                )}
              </div>
            )}

            {/* Challenge 2: BARCODE SCANNER SIMULATOR */}
            {alarmChallengeTab === "barcode" && (
              <div className="bg-black/40 rounded-2xl p-5 border border-white/10 text-center space-y-4">
                <div className="w-full h-32 rounded-xl bg-slate-900 border-2 border-dashed border-[#0a66ff] flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="w-full h-1 bg-red-500 absolute top-1/2 -translate-y-1/2 animate-pulse shadow-[0_0_12px_red]" />
                  <i className="fas fa-camera text-2xl text-slate-500 mb-1"></i>
                  <span className="text-[0.65rem] text-slate-400">Point camera at CHM 201 Textbook ISBN Barcode</span>
                </div>

                <button
                  onClick={handleScanBarcode}
                  disabled={barcodeScanned}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0a66ff] to-[#3b82f6] text-white font-bold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <i className="fas fa-barcode"></i>
                  <span>{barcodeScanned ? "Verifying ISBN 978-0134074580..." : "Simulate Live Barcode Scan"}</span>
                </button>
              </div>
            )}

            {/* Challenge 3: AI NOTES QUIZ */}
            {alarmChallengeTab === "quiz" && (
              <div className="bg-black/40 rounded-2xl p-5 border border-white/10 space-y-3">
                <span className="text-[0.65rem] uppercase font-bold text-slate-400">Organic Chemistry Reaction Quiz</span>
                <p className="text-xs font-bold text-white">
                  Which reagent is best suited for converting an alcohol directly into an alkyl chloride?
                </p>
                <div className="space-y-2">
                  {["SOCl₂ (Thionyl chloride)", "H₂SO₄ (Sulfuric acid)", "NaBH₄ (Sodium borohydride)"].map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuizSelectedOption(idx);
                        if (idx === 0) {
                          setTimeout(() => {
                            setIsAlarmActive(false);
                            setQuizSelectedOption(null);
                          }, 1000);
                        }
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${quizSelectedOption === idx
                        ? idx === 0
                          ? "bg-emerald-500 text-white border-emerald-400"
                          : "bg-red-500 text-white border-red-400"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                        }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center pt-2">
              <button
                onClick={() => setIsAlarmActive(false)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer underline"
              >
                Close simulation
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DRAWER: COURSEWORK AI STUDY ASSISTANT (PAGES 18-19)                       */}
      {/* ========================================================================= */}
      {isAiDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-fadeIn">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-5 flex flex-col justify-between">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0a66ff] to-[#7c3aed] text-white flex items-center justify-center text-xs">
                  <i className="fas fa-wand-magic-sparkles"></i>
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-[#0b1a33]">Coursework AI Assistant</h3>
                  <span className="text-[0.62rem] text-emerald-600 font-bold">Indexed with {selectedCourse.code} Notes</span>
                </div>
              </div>
              <button onClick={() => setIsAiDrawerOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <i className="fas fa-xmark text-sm"></i>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {aiMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs ${msg.sender === "user" ? "bg-[#0a66ff] text-white" : "bg-slate-100 text-[#0b1a33]"}`}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className={`text-[0.55rem] block mt-1 ${msg.sender === "user" ? "text-blue-200" : "text-slate-400"}`}>{msg.time}</span>
                  </div>
                </div>
              ))}
              {isAiTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 p-3 rounded-2xl text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-200" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Box */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask formula, theorem, or quiz question..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendAiMessage()}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#0b1a33] outline-none"
              />
              <button
                onClick={handleSendAiMessage}
                className="w-10 h-10 rounded-xl bg-[#0a66ff] text-white flex items-center justify-center cursor-pointer shadow-sm"
              >
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ====== FOOTER BAR ====== */}
      <footer className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>All enforcement systems operational · Synchronized with MyPact Academic Trust</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="hover:text-[#0a66ff] transition-colors">Platform Home</Link>
          <span>·</span>
          <a
            href="https://wa.me/2349027874036"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0a66ff] font-bold hover:underline flex items-center gap-1"
          >
            <i className="fab fa-whatsapp"></i>
            <span>Student Emergency Desk</span>
          </a>
        </div>
      </footer>

    </div>
  );
}
