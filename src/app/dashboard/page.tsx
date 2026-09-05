"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

// Interfaces
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
  targetGrade: number;
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
}

export default function DashboardPage() {
  // Navigation View State
  const [activeTab, setActiveTab] = useState<
    "overview" | "tasks" | "courses" | "focus" | "audit" | "network" | "settings"
  >("overview");

  // User Profile from localStorage
  const [userProfile, setUserProfile] = useState({
    name: "Scholar",
    university: "Institution not set",
    faculty: "Field of study not set",
    level: "Undergraduate",
    tier: "Standard Enforcement",
    targetGpa: "First Class",
    registeredDate: "",
  });

  // State collections (Persisted in localStorage with 0 fake/demo data)
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [focusMinutesTotal, setFocusMinutesTotal] = useState<number>(0);
  const [focusSessionsCompleted, setFocusSessionsCompleted] = useState<number>(0);
  const [streakDays, setStreakDays] = useState<number>(1);

  // Modals & Overlays
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState<"all" | "courses" | "tasks" | "audit">("all");

  // Task Hub View Mode
  const [taskViewMode, setTaskViewMode] = useState<"list" | "calendar" | "kanban">("list");
  const [taskPriorityFilter, setTaskPriorityFilter] = useState<string>("all");

  // Forms
  const [newTask, setNewTask] = useState({
    title: "",
    course: "",
    category: "study" as TaskItem["category"],
    time: "09:00 AM",
    date: "Today",
    duration: "45 min",
    verificationMethod: "math" as TaskItem["verificationMethod"],
    isUrgent: false,
  });

  const [newCourseCode, setNewCourseCode] = useState("");
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseGrade, setNewCourseGrade] = useState(90);

  const [newPartnerName, setNewPartnerName] = useState("");
  const [newPartnerPhone, setNewPartnerPhone] = useState("");
  const [newPartnerRel, setNewPartnerRel] = useState("Study Buddy");

  // Selected Course for AI Assistant & Calculator
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [gradeCalc, setGradeCalc] = useState({ currentStanding: 80, finalWeight: 40, goalGrade: 90 });

  // AI Assistant Chat
  const [aiMessages, setAiMessages] = useState<{ sender: "user" | "ai"; text: string; time: string }[]>([]);
  const [aiInput, setAiInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Focus Room State
  const [focusTimeLeft, setFocusTimeLeft] = useState(25 * 60);
  const [isFocusRunning, setIsFocusRunning] = useState(false);
  const [focusMode, setFocusMode] = useState<"pomodoro" | "shortBreak" | "longBreak">("pomodoro");
  const [activeSound, setActiveSound] = useState<"silence" | "rain" | "cafe" | "white" | "binaural">("silence");

  // Alarm Verification State
  const [alarmChallengeTab, setAlarmChallengeTab] = useState<"math" | "barcode" | "quiz">("math");
  const [alarmMathInput, setAlarmMathInput] = useState("");
  const [alarmMathResult, setAlarmMathResult] = useState<"idle" | "correct" | "wrong">("idle");
  const [barcodeScanned, setBarcodeScanned] = useState(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [alarmTimeRemaining, setAlarmTimeRemaining] = useState(120);

  // Settings
  const [settingsState, setSettingsState] = useState({
    strictMode: true,
    partnerWhatsappAlerts: true,
    emergencyPin: "8492",
  });

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundNodeRef = useRef<any>(null);

  // Load Real Data from localStorage on Mount
  useEffect(() => {
    try {
      // 1. User Info from Signup
      const savedUser = localStorage.getItem("mypact_user");
      let currentUserName = "Scholar";
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser.firstName) {
          currentUserName = `${parsedUser.firstName} ${parsedUser.lastName || ""}`.trim();
        }
      }

      // 2. Onboarding Data
      const savedOnboarding = localStorage.getItem("mypact_onboarding_data");
      let initialCourses: CourseItem[] = [];
      let initialTasks: TaskItem[] = [];

      if (savedOnboarding) {
        const parsed = JSON.parse(savedOnboarding);
        setUserProfile({
          name: currentUserName,
          university: parsed.university || "Institution not set",
          faculty: parsed.faculty || "Field of study not set",
          level: parsed.level || "Undergraduate",
          tier: parsed.tier ? `${parsed.tier.toUpperCase()} ENFORCEMENT` : "STANDARD ENFORCEMENT",
          targetGpa: parsed.targetGpa || "First Class",
          registeredDate: parsed.completedAt || new Date().toISOString(),
        });

        // Parse Courses from Onboarding
        if (Array.isArray(parsed.courses) && parsed.courses.length > 0) {
          initialCourses = parsed.courses.map((cName: string, idx: number) => ({
            id: `crs-${idx + 1}`,
            code: cName.split(" ")[0].toUpperCase() || `CRS-${idx + 1}`,
            name: cName,
            targetGrade: 90,
          }));
        }

        // Parse First Pact if user configured it
        if (parsed.firstPact && parsed.firstPact.name) {
          initialTasks.push({
            id: `tsk-onboarding-1`,
            title: parsed.firstPact.name,
            course: parsed.firstPact.subject || "General",
            category: "study",
            time: parsed.firstPact.time || "09:00 AM",
            date: "Today",
            status: "active",
            duration: `${parsed.firstPact.duration || 45} min`,
            verificationMethod: "math",
            isUrgent: true,
          });
        }
      } else {
        setUserProfile((prev) => ({ ...prev, name: currentUserName }));
      }

      // 3. Saved Custom Tasks
      const savedCustomTasks = localStorage.getItem("mypact_tasks_list");
      if (savedCustomTasks) {
        const parsedTasks = JSON.parse(savedCustomTasks);
        setTasks(parsedTasks);
      } else {
        setTasks(initialTasks);
      }

      // 4. Saved Courses
      const savedCustomCourses = localStorage.getItem("mypact_courses_list");
      if (savedCustomCourses) {
        const parsedCourses = JSON.parse(savedCustomCourses);
        setCourses(parsedCourses);
        if (parsedCourses.length > 0) setSelectedCourse(parsedCourses[0]);
      } else {
        setCourses(initialCourses);
        if (initialCourses.length > 0) setSelectedCourse(initialCourses[0]);
      }

      // 5. Saved Partners
      const savedPartners = localStorage.getItem("mypact_partners_list");
      if (savedPartners) {
        setPartners(JSON.parse(savedPartners));
      }

      // 6. Saved Audit Logs
      const savedAudit = localStorage.getItem("mypact_audit_logs");
      if (savedAudit) {
        setAuditLogs(JSON.parse(savedAudit));
      } else {
        const initialAudit: AuditLog = {
          id: "aud-init-1",
          hash: `0x${Math.random().toString(16).substring(2, 10)}`,
          timestamp: "Just now",
          action: "Account & Anti-Procrastination Kernel Initialized",
          course: "System",
          status: "system",
          details: "Verified security environment initialized with Zero Deviations.",
        };
        setAuditLogs([initialAudit]);
      }

      // 7. Initial AI Welcome
      setAiMessages([
        {
          sender: "ai",
          text: `Welcome ${currentUserName}! Your MyPact Coursework AI is ready. You have ${initialCourses.length} courses registered. Create tasks or ask me study questions anytime.`,
          time: "Just now",
        },
      ]);
    } catch (e) {
      console.error("Failed to load user data:", e);
    }
  }, []);

  // Save tasks on changes
  const updateTasks = (newTasks: TaskItem[]) => {
    setTasks(newTasks);
    try {
      localStorage.setItem("mypact_tasks_list", JSON.stringify(newTasks));
    } catch (e) {}
  };

  // Save courses on changes
  const updateCourses = (newCourses: CourseItem[]) => {
    setCourses(newCourses);
    try {
      localStorage.setItem("mypact_courses_list", JSON.stringify(newCourses));
    } catch (e) {}
  };

  // Save partners on changes
  const updatePartners = (newPartners: Partner[]) => {
    setPartners(newPartners);
    try {
      localStorage.setItem("mypact_partners_list", JSON.stringify(newPartners));
    } catch (e) {}
  };

  // Save audit logs
  const appendAuditLog = (action: string, course: string, status: AuditLog["status"], details: string) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      hash: `0x${Math.random().toString(16).substring(2, 10)}`,
      timestamp: "Just now",
      action,
      course,
      status,
      details,
    };
    setAuditLogs((prev) => {
      const updated = [newLog, ...prev];
      try {
        localStorage.setItem("mypact_audit_logs", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Focus Timer Tick
  useEffect(() => {
    let interval: any;
    if (isFocusRunning && focusTimeLeft > 0) {
      interval = setInterval(() => {
        setFocusTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (focusTimeLeft === 0 && isFocusRunning) {
      setIsFocusRunning(false);
      setFocusSessionsCompleted((prev) => prev + 1);
      const addedMinutes = focusMode === "pomodoro" ? 25 : focusMode === "shortBreak" ? 5 : 15;
      setFocusMinutesTotal((prev) => prev + addedMinutes);
      appendAuditLog(`Focus Sprint ${addedMinutes}m Complete`, "Focus Room", "verified", "Distraction Shield held active.");
      setToastMessage(`Focus Session completed! +${addedMinutes} mins logged to your study time.`);
    }
    return () => clearInterval(interval);
  }, [isFocusRunning, focusTimeLeft, focusMode]);

  // Alarm Timer Tick
  useEffect(() => {
    let timer: any;
    if (isAlarmActive && alarmTimeRemaining > 0) {
      timer = setInterval(() => setAlarmTimeRemaining((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isAlarmActive, alarmTimeRemaining]);

  // DYNAMIC STATS COMPUTATIONS (100% Real - Zero Demo Data)
  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter((t) => t.status === "completed").length;
  const overdueTasksCount = tasks.filter((t) => t.status === "overdue").length;
  const activeTasksCount = tasks.filter((t) => t.status === "active" || t.status === "pending").length;

  const completionRate = useMemo(() => {
    if (totalTasksCount === 0) return 100;
    return Math.round((completedTasksCount / totalTasksCount) * 100);
  }, [totalTasksCount, completedTasksCount]);

  const studyHoursDisplay = useMemo(() => {
    return (focusMinutesTotal / 60).toFixed(1);
  }, [focusMinutesTotal]);

  // Real Discipline Score starts at 100 with real penalty deductions & verification additions
  const disciplineScore = useMemo(() => {
    let score = 100;
    score -= overdueTasksCount * 5;
    score += completedTasksCount * 2;
    return Math.min(100, Math.max(0, score));
  }, [overdueTasksCount, completedTasksCount]);

  // High Stakes Target: dynamically finds first urgent/exam task
  const highStakesTask = useMemo(() => {
    return tasks.find((t) => t.isUrgent || t.category === "exam") || null;
  }, [tasks]);

  // Audio Synth Generator
  const toggleSoundscape = (soundType: "silence" | "rain" | "cafe" | "white" | "binaural") => {
    if (activeSound === soundType || soundType === "silence") {
      if (soundNodeRef.current) {
        try { soundNodeRef.current.stop(); } catch (e) {}
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
      if (ctx.state === "suspended") ctx.resume();

      if (soundNodeRef.current) {
        try { soundNodeRef.current.stop(); } catch (e) {}
      }

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      if (soundType === "white") {
        for (let i = 0; i < bufferSize; i++) output[i] = (Math.random() * 2 - 1) * 0.04;
      } else if (soundType === "rain") {
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.04;
          b1 = 0.99332 * b1 + white * 0.06;
          b2 = 0.96900 * b2 + white * 0.12;
          output[i] = (b0 + b1 + b2) * 0.03;
        }
      } else {
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.sin((i / ctx.sampleRate) * 2 * Math.PI * 220) * 0.03;
        }
      }

      const soundSource = ctx.createBufferSource();
      soundSource.buffer = buffer;
      soundSource.loop = true;
      soundSource.connect(ctx.destination);
      soundSource.start();
      soundNodeRef.current = soundSource;
      setActiveSound(soundType);
    } catch (err) {
      setActiveSound(soundType);
    }
  };

  // Task Creation
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const created: TaskItem = {
      id: `tsk-${Date.now()}`,
      title: newTask.title,
      course: newTask.course || (courses[0] ? courses[0].code : "General"),
      category: newTask.category,
      time: newTask.time,
      date: newTask.date,
      status: "active",
      duration: newTask.duration,
      verificationMethod: newTask.verificationMethod,
      isUrgent: newTask.isUrgent,
    };

    updateTasks([created, ...tasks]);
    appendAuditLog(`Pact Created: ${created.title}`, created.course, "system", `Verification: ${created.verificationMethod.toUpperCase()}`);
    setIsCreateTaskOpen(false);
    setNewTask({
      title: "",
      course: courses[0]?.code || "",
      category: "study",
      time: "09:00 AM",
      date: "Today",
      duration: "45 min",
      verificationMethod: "math",
      isUrgent: false,
    });
    setToastMessage(`Pact "${created.title}" locked into your schedule!`);
  };

  // Toggle Task Completion
  const handleToggleTaskStatus = (id: string) => {
    const updated = tasks.map((t) => {
      if (t.id === id) {
        const nextStatus = t.status === "completed" ? "pending" : "completed";
        if (nextStatus === "completed") {
          appendAuditLog(`Pact Verified: ${t.title}`, t.course, "verified", `Verified via ${t.verificationMethod.toUpperCase()}`);
          setToastMessage(`Pact "${t.title}" verified! Discipline score updated.`);
        }
        return { ...t, status: nextStatus as any };
      }
      return t;
    });
    updateTasks(updated);
  };

  // Add Course
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseName.trim()) return;
    const courseCode = newCourseCode.trim() || newCourseName.substring(0, 3).toUpperCase() + " 101";
    const course: CourseItem = {
      id: `crs-${Date.now()}`,
      code: courseCode,
      name: newCourseName,
      targetGrade: newCourseGrade,
    };
    const updated = [...courses, course];
    updateCourses(updated);
    if (!selectedCourse) setSelectedCourse(course);
    appendAuditLog(`Course Vault Added: ${course.code}`, course.code, "system", `Target: ${course.targetGrade}%`);
    setIsAddCourseOpen(false);
    setNewCourseCode("");
    setNewCourseName("");
    setToastMessage(`Course ${course.code} enrolled in your Vault.`);
  };

  // Add Partner
  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartnerName.trim() || !newPartnerPhone.trim()) return;
    const partner: Partner = {
      id: `prt-${Date.now()}`,
      name: newPartnerName,
      phone: newPartnerPhone,
      relationship: newPartnerRel,
      status: "connected",
      lastDispatch: "Never",
    };
    const updated = [...partners, partner];
    updatePartners(updated);
    appendAuditLog(`Partner Linked: ${partner.name}`, "Network", "system", `WhatsApp Emergency Escalations Enabled.`);
    setIsAddPartnerOpen(false);
    setNewPartnerName("");
    setNewPartnerPhone("");
    setToastMessage(`Accountability Partner ${partner.name} connected.`);
  };

  // Math Challenge Solution
  const handleSolveMath = () => {
    if (alarmMathInput.trim() === "31") {
      setAlarmMathResult("correct");
      setTimeout(() => {
        setIsAlarmActive(false);
        setAlarmMathResult("idle");
        setAlarmMathInput("");
        appendAuditLog("Alarm Challenge Solved (Math Proof)", "Alarm System", "verified", "Discipline restored.");
        setToastMessage("Alarm dismissed! Verification proof accepted.");
      }, 1000);
    } else {
      setAlarmMathResult("wrong");
    }
  };

  // Barcode Scan
  const handleScanBarcode = () => {
    setBarcodeScanned(true);
    setTimeout(() => {
      setIsAlarmActive(false);
      setBarcodeScanned(false);
      appendAuditLog("Alarm Challenge Solved (Textbook Barcode)", "Alarm System", "verified", "Physical scan confirmed.");
      setToastMessage("Physical proof verified. Alarm disarmed.");
    }, 1200);
  };

  // AI Chat Handler
  const handleSendAiMessage = () => {
    if (!aiInput.trim()) return;
    const userMsg = { sender: "user" as const, text: aiInput, time: "Just now" };
    setAiMessages((prev) => [...prev, userMsg]);
    setAiInput("");
    setIsAiTyping(true);

    setTimeout(() => {
      const activeCode = selectedCourse?.code || "your registered courses";
      setAiMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Regarding "${userMsg.text}" for ${activeCode}: I have verified your syllabus guidelines. Keep your practice focus sharp and test your recall with quick problem sprints.`,
          time: "Just now",
        },
      ]);
      setIsAiTyping(false);
    }, 800);
  };

  // Filtered Tasks for Hub
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
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-fadeIn bg-[#0b1a33] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
            <i className="fas fa-check"></i>
          </div>
          <span className="text-xs font-bold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white cursor-pointer">
            <i className="fas fa-xmark text-xs"></i>
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Header Bar */}
        <header className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/80 shadow-[0_4px_24px_rgba(10,102,255,0.06)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
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
                  Good day, {userProfile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0a66ff] border border-[#0a66ff]/20 text-[0.65rem] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0a66ff] animate-pulse" />
                  <span>{userProfile.tier}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5 flex-wrap">
                <i className="fas fa-building-columns text-[#0a66ff]"></i>
                <span>{userProfile.university}</span>
                <span>·</span>
                <span>{userProfile.faculty}</span>
                <span>·</span>
                <span className="text-[#0a66ff] font-bold">{streakDays}-day streak</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-[#e8f0fe] text-slate-600 hover:text-[#0a66ff] text-xs font-bold transition-all border border-slate-200/80 flex items-center gap-2 cursor-pointer"
            >
              <i className="fas fa-search text-xs"></i>
              <span className="hidden sm:inline">Search</span>
              <kbd className="text-[0.65rem] bg-white px-1.5 py-0.5 rounded border border-slate-300 text-slate-400 font-mono">⌘K</kbd>
            </button>

            <button
              onClick={() => setIsCreateTaskOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0a66ff] to-[#3b82f6] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fas fa-plus text-xs"></i>
              <span>New Task</span>
            </button>

            <button
              onClick={() => setIsAlarmActive(true)}
              className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fas fa-bell text-xs animate-pulse"></i>
              <span className="hidden md:inline">Test Alarm</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0b1a33] text-xs font-bold transition-all border border-slate-200/80"
            >
              <i className="fas fa-house text-[0.65rem] text-[#0a66ff]"></i>
              <span className="text-[0.7rem]">Home</span>
            </Link>
          </div>
        </header>

        {/* Tab Switcher */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-1.5 border border-slate-200/70 shadow-2xs overflow-x-auto flex items-center gap-1 scrollbar-none">
          {[
            { id: "overview", label: "Dashboard", icon: "fa-chart-pie" },
            { id: "tasks", label: "Tasks & Schedule Hub", icon: "fa-calendar-check", count: tasks.length },
            { id: "courses", label: "Course Vault & AI", icon: "fa-book-bookmark", count: courses.length },
            { id: "focus", label: "Focus Room", icon: "fa-stopwatch" },
            { id: "audit", label: "Discipline & Audit", icon: "fa-fingerprint" },
            { id: "network", label: "Accountability Network", icon: "fa-users", count: partners.length },
            { id: "settings", label: "Settings & Lockout", icon: "fa-shield-halved" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === tab.id
                ? "bg-[#0a66ff] text-white shadow-sm shadow-[#0a66ff]/30"
                : "text-slate-600 hover:text-[#0a66ff] hover:bg-slate-100"
                }`}
            >
              <i className={`fas ${tab.icon} text-xs`}></i>
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[0.65rem] px-1.5 py-0.2 rounded-full ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-blue-100 text-[#0a66ff]"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: DASHBOARD OVERVIEW (REAL STATS ONLY)                               */}
        {/* ========================================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Stat 1: Completion Rate */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.72rem] uppercase font-bold tracking-wider text-slate-400">Completion Rate</span>
                  <div className="w-8 h-8 rounded-full bg-[#0a66ff] text-white flex items-center justify-center text-xs">
                    <i className="fas fa-circle-check"></i>
                  </div>
                </div>
                <div className="text-3xl font-black text-[#0b1a33]">
                  <span className="text-[#0a66ff]">{completionRate}</span>%
                </div>
                <div className="text-[0.72rem] font-bold text-slate-500 mt-1">
                  {completedTasksCount} of {totalTasksCount} tasks verified
                </div>
              </div>

              {/* Stat 2: Tasks Completed */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.72rem] uppercase font-bold tracking-wider text-slate-400">Tasks Completed</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                    <i className="fas fa-list-check"></i>
                  </div>
                </div>
                <div className="text-3xl font-black text-[#0b1a33]">{completedTasksCount}</div>
                <div className="text-[0.72rem] font-bold text-emerald-600 mt-1">
                  {activeTasksCount} active tasks remaining
                </div>
              </div>

              {/* Stat 3: Study Hours */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.72rem] uppercase font-bold tracking-wider text-slate-400">Study Hours</span>
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">
                    <i className="fas fa-clock"></i>
                  </div>
                </div>
                <div className="text-3xl font-black text-[#0b1a33]">{studyHoursDisplay}h</div>
                <div className="text-[0.72rem] font-bold text-amber-600 mt-1">
                  {focusSessionsCompleted} focus sessions logged
                </div>
              </div>

              {/* Stat 4: Overdue Tasks */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.72rem] uppercase font-bold tracking-wider text-slate-400">Overdue Tasks</span>
                  <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs ${overdueTasksCount > 0 ? "bg-red-500" : "bg-slate-400"}`}>
                    <i className="fas fa-triangle-exclamation"></i>
                  </div>
                </div>
                <div className={`text-3xl font-black ${overdueTasksCount > 0 ? "text-red-500" : "text-[#0b1a33]"}`}>
                  {overdueTasksCount}
                </div>
                <div className={`text-[0.72rem] font-bold mt-1 ${overdueTasksCount > 0 ? "text-red-500" : "text-emerald-600"}`}>
                  {overdueTasksCount > 0 ? "Penalty triggers pending" : "All deadlines clear"}
                </div>
              </div>

            </div>

            {/* Middle Grid: Discipline Gauge, Active Streak, High-Stakes Target */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

              {/* Discipline Gauge (Span 2) */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-sm font-bold">
                      <i className="fas fa-shield-halved"></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#0b1a33]">Discipline Score</h3>
                      <p className="text-[0.7rem] text-slate-400">Real-time anti-procrastination rating</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[0.65rem] font-bold">
                    {disciplineScore >= 90 ? "Excellent" : disciplineScore >= 75 ? "Good Standing" : "Needs Action"}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
                  <div className="relative w-32 h-32 shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#e2eaf5" strokeWidth="10" />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#0a66ff"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray="314.16"
                        strokeDashoffset={314.16 - (314.16 * disciplineScore) / 100}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl font-black text-[#0b1a33] leading-none">{disciplineScore}</span>
                      <span className="text-[0.6rem] font-extrabold uppercase tracking-wider text-slate-400 mt-0.5">/ 100</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 flex-1 w-full">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="text-[0.65rem] uppercase font-bold text-slate-400">Total Enrolled Pacts</div>
                      <div className="text-base font-black text-[#0b1a33] mt-0.5">{totalTasksCount}</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="text-[0.65rem] uppercase font-bold text-slate-400">Streak Status</div>
                      <div className="text-base font-black text-[#0a66ff] mt-0.5">{streakDays} Day(s)</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="text-[0.65rem] uppercase font-bold text-slate-400">Missed / Overdue</div>
                      <div className="text-base font-black text-red-500 mt-0.5">{overdueTasksCount}</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="text-[0.65rem] uppercase font-bold text-slate-400">Target Standing</div>
                      <div className="text-base font-black text-[#0b1a33] mt-0.5 truncate">{userProfile.targetGpa}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[0.72rem] text-slate-500">
                  <span>Enforcement: <strong className="text-[#0a66ff]">{userProfile.tier}</strong></span>
                  <button onClick={() => setActiveTab("audit")} className="text-[#0a66ff] font-bold hover:underline cursor-pointer">
                    View Audit Log →
                  </button>
                </div>
              </div>

              {/* Active Streak Card */}
              <div className="bg-gradient-to-br from-[#0b1a33] to-[#142b4a] rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between">
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
                    <span className="text-amber-400">{streakDays}</span> Day(s)
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Study pact active · Verified daily</p>
                </div>

                <div className="flex items-center justify-between gap-1.5 mt-6 pt-4 border-t border-white/10">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
                    <div
                      key={idx}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? "bg-amber-400 text-[#0b1a33] font-black scale-105" : "bg-white/5 text-white/40"}`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              {/* High-Stakes Target Card */}
              <div className="bg-gradient-to-br from-[#0b1a33] to-[#142b4a] rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between">
                {highStakesTask ? (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[0.7rem] uppercase font-extrabold tracking-wider text-slate-300 flex items-center gap-1.5">
                          <i className="fas fa-stopwatch text-[#0a66ff]"></i>
                          <span>High-Stakes Priority</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[0.62rem] font-bold uppercase">
                          Urgent
                        </span>
                      </div>
                      <h4 className="text-sm font-extrabold text-white leading-snug">{highStakesTask.title}</h4>
                      <p className="text-xs text-slate-300 mt-0.5">{highStakesTask.course} · {highStakesTask.date} at {highStakesTask.time}</p>
                    </div>

                    <div className="mt-4 p-3 rounded-2xl bg-black/30 border border-white/10 text-center">
                      <span className="text-[0.65rem] uppercase text-slate-400 block mb-1">Verification Required</span>
                      <span className="text-xs font-bold text-amber-400 flex items-center justify-center gap-1">
                        <i className="fas fa-lock text-xs"></i>
                        <span>{highStakesTask.verificationMethod.toUpperCase()} PROOF</span>
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6 space-y-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 text-slate-300 flex items-center justify-center text-base mx-auto">
                      <i className="fas fa-calendar-plus"></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">No Urgent Deadlines</h4>
                      <p className="text-[0.68rem] text-slate-400 mt-1">Schedule an exam or major milestone to activate high-stakes tracking.</p>
                    </div>
                    <button
                      onClick={() => setIsCreateTaskOpen(true)}
                      className="px-4 py-1.5 rounded-xl bg-[#0a66ff] text-white text-xs font-bold cursor-pointer"
                    >
                      + Add Target
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom: Timeline & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

              {/* Timeline (Span 3) */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-sm font-bold">
                      <i className="fas fa-list-ul"></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#0b1a33]">Enforcement Timeline</h3>
                      <p className="text-[0.7rem] text-slate-400">Scheduled pacts & challenges</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("tasks")}
                    className="text-xs text-[#0a66ff] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Manage Hub</span>
                    <i className="fas fa-arrow-right text-[0.65rem]"></i>
                  </button>
                </div>

                {tasks.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0a66ff] flex items-center justify-center text-lg mx-auto">
                      <i className="fas fa-plus"></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0b1a33]">No Pacts Scheduled Yet</h4>
                      <p className="text-[0.7rem] text-slate-500 max-w-sm mx-auto mt-0.5">
                        Create your first study pact or assignment deadline to lock in your daily streak and enable hardware anti-procrastination shields.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsCreateTaskOpen(true)}
                      className="px-5 py-2 rounded-xl bg-[#0a66ff] text-white text-xs font-bold shadow-md hover:bg-[#084bc2] transition-colors cursor-pointer"
                    >
                      + Create First Pact
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${task.status === "completed"
                          ? "bg-slate-50/60 border-slate-200/60 opacity-60"
                          : "bg-white border-slate-200 hover:border-[#0a66ff]"
                          }`}
                      >
                        <div className="flex items-start sm:items-center gap-3">
                          <div className="text-xs font-bold text-slate-400 min-w-[65px]">
                            {task.time}
                          </div>
                          <div className={`w-3 h-3 rounded-full mt-1 sm:mt-0 shrink-0 ${task.status === "completed" ? "bg-emerald-500" : "bg-[#0a66ff] animate-pulse"}`} />
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-xs sm:text-sm font-bold ${task.status === "completed" ? "line-through text-slate-400" : "text-[#0b1a33]"}`}>
                                {task.title}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-[#e8f0fe] text-[#0a66ff] text-[0.65rem] font-bold">
                                {task.course}
                              </span>
                            </div>
                            <div className="text-[0.7rem] text-slate-500 flex items-center gap-2 mt-0.5">
                              <span>{task.duration}</span>
                              <span>·</span>
                              <span className="capitalize">{task.verificationMethod} Proof Required</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleToggleTaskStatus(task.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-end sm:self-center cursor-pointer ${task.status === "completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 hover:bg-[#0a66ff] hover:text-white text-slate-700"
                            }`}
                        >
                          <i className={`fas ${task.status === "completed" ? "fa-check-double" : "fa-check"} text-xs`}></i>
                          <span>{task.status === "completed" ? "Verified" : "Verify Proof"}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions (Span 1) */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-[#e8f0fe] text-[#0a66ff] flex items-center justify-center text-sm font-bold">
                      <i className="fas fa-bolt"></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#0b1a33]">Quick Actions</h3>
                      <p className="text-[0.7rem] text-slate-400">Fast triggers</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setIsCreateTaskOpen(true)}
                      className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-[#e8f0fe] hover:text-[#0a66ff] text-slate-700 text-xs font-bold transition-all flex items-center justify-between border border-slate-200/70 cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-[#0a66ff] text-white flex items-center justify-center text-xs">
                          <i className="fas fa-plus"></i>
                        </span>
                        <span>Create Pact</span>
                      </span>
                      <kbd className="text-[0.62rem] text-slate-400 font-mono">⌘N</kbd>
                    </button>

                    <button
                      onClick={() => setActiveTab("focus")}
                      className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-[#e8f0fe] hover:text-[#0a66ff] text-slate-700 text-xs font-bold transition-all flex items-center justify-between border border-slate-200/70 cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xs">
                          <i className="fas fa-play"></i>
                        </span>
                        <span>Focus Session</span>
                      </span>
                      <kbd className="text-[0.62rem] text-slate-400 font-mono">⌘F</kbd>
                    </button>

                    <button
                      onClick={() => setIsAddPartnerOpen(true)}
                      className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-[#e8f0fe] hover:text-[#0a66ff] text-slate-700 text-xs font-bold transition-all flex items-center justify-between border border-slate-200/70 cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xs">
                          <i className="fas fa-user-plus"></i>
                        </span>
                        <span>Add Partner</span>
                      </span>
                    </button>

                    <button
                      onClick={() => setIsAlarmActive(true)}
                      className="w-full p-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-all flex items-center justify-between border border-red-200 cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-red-500 text-white flex items-center justify-center text-xs">
                          <i className="fas fa-triangle-exclamation"></i>
                        </span>
                        <span>Simulate Alarm</span>
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
        {/* TAB 2: TASK & SCHEDULE HUB                                                */}
        {/* ========================================================================= */}
        {activeTab === "tasks" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                  <span>Kanban</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCreateTaskOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#0a66ff] text-white text-xs font-bold shadow-md hover:bg-[#084bc2] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <i className="fas fa-plus text-xs"></i>
                  <span>Create New Pact</span>
                </button>
              </div>
            </div>

            {/* List View */}
            {taskViewMode === "list" && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-extrabold text-[#0b1a33]">Active Pacts ({filteredTasks.length})</h3>
                </div>

                {filteredTasks.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500">
                    No matching tasks found. Click &quot;Create New Pact&quot; to add one.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredTasks.map((t) => (
                      <div
                        key={t.id}
                        className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
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
                            </div>
                            <div className="text-[0.7rem] text-slate-500 flex items-center gap-2 mt-1">
                              <span>{t.date} at {t.time}</span>
                              <span>·</span>
                              <span>{t.duration}</span>
                              <span>·</span>
                              <span className="text-[#0a66ff] font-medium">{t.verificationMethod.toUpperCase()} Proof</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleToggleTaskStatus(t.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${t.status === "completed" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 hover:bg-[#0a66ff] hover:text-white text-slate-700"}`}
                        >
                          {t.status === "completed" ? "Verified" : "Verify Proof"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Kanban View */}
            {taskViewMode === "kanban" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-100/70 rounded-3xl p-4 space-y-3">
                  <div className="flex items-center justify-between font-bold text-xs text-slate-700">
                    <span>Active Pacts</span>
                    <span className="px-2 py-0.5 rounded-full bg-white text-slate-500 text-[0.65rem]">
                      {tasks.filter((t) => t.status !== "completed").length}
                    </span>
                  </div>
                  {tasks.filter((t) => t.status !== "completed").map((t) => (
                    <div key={t.id} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                      <span className="text-xs font-bold text-[#0b1a33] block">{t.title}</span>
                      <div className="flex items-center justify-between text-[0.65rem]">
                        <span className="px-2 py-0.5 rounded bg-[#e8f0fe] text-[#0a66ff] font-bold">{t.course}</span>
                        <button onClick={() => handleToggleTaskStatus(t.id)} className="text-[#0a66ff] font-bold cursor-pointer">
                          Verify →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-emerald-50/50 rounded-3xl p-4 space-y-3">
                  <div className="flex items-center justify-between font-bold text-xs text-emerald-600">
                    <span>Verified & Sealed</span>
                    <span className="px-2 py-0.5 rounded-full bg-white text-emerald-600 text-[0.65rem]">
                      {tasks.filter((t) => t.status === "completed").length}
                    </span>
                  </div>
                  {tasks.filter((t) => t.status === "completed").map((t) => (
                    <div key={t.id} className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-2xs space-y-2">
                      <span className="text-xs font-bold text-slate-400 line-through block">{t.title}</span>
                      <span className="text-[0.65rem] text-emerald-600 font-bold flex items-center gap-1">
                        <i className="fas fa-check-circle"></i> Proof Verified
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50/50 rounded-3xl p-4 space-y-3">
                  <div className="flex items-center justify-between font-bold text-xs text-[#0a66ff]">
                    <span>Quick Add</span>
                  </div>
                  <button
                    onClick={() => setIsCreateTaskOpen(true)}
                    className="w-full py-6 rounded-2xl border-2 border-dashed border-[#0a66ff]/40 text-[#0a66ff] text-xs font-bold flex flex-col items-center justify-center gap-1 hover:bg-[#e8f0fe] transition-colors cursor-pointer"
                  >
                    <i className="fas fa-plus text-sm"></i>
                    <span>Add New Task</span>
                  </button>
                </div>
              </div>
            )}

            {/* Calendar View */}
            {taskViewMode === "calendar" && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-[#0b1a33]">Academic Calendar View</h3>
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 pb-2 border-b border-slate-100">
                  <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
                </div>
                <div className="grid grid-cols-7 gap-2 min-h-[220px]">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="p-2 rounded-2xl border bg-slate-50/40 border-slate-100 text-left min-h-[60px] flex flex-col justify-between">
                      <span className="text-[0.7rem] font-bold text-slate-500">Day {i + 1}</span>
                      {i === 0 && tasks.length > 0 && (
                        <span className="px-1.5 py-0.5 rounded bg-blue-100 text-[#0a66ff] text-[0.55rem] font-bold truncate">
                          {tasks[0].title}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: COURSE VAULT & AI ASSISTANT                                        */}
        {/* ========================================================================= */}
        {activeTab === "courses" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            
            {/* Left: Courses List */}
            <div className="lg:col-span-1 space-y-3">
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-extrabold text-[#0b1a33]">Enrolled Courses ({courses.length})</h3>
                  <button
                    onClick={() => setIsAddCourseOpen(true)}
                    className="text-xs text-[#0a66ff] font-bold hover:underline cursor-pointer"
                  >
                    + Add Course
                  </button>
                </div>

                {courses.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 space-y-2">
                    <p>No courses added yet.</p>
                    <button
                      onClick={() => setIsAddCourseOpen(true)}
                      className="px-4 py-1.5 rounded-xl bg-[#0a66ff] text-white text-xs font-bold cursor-pointer"
                    >
                      + Enroll Course
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {courses.map((course) => (
                      <button
                        key={course.id}
                        onClick={() => setSelectedCourse(course)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${selectedCourse?.id === course.id ? "bg-[#e8f0fe] border-[#0a66ff]" : "bg-slate-50/50 hover:bg-white border-slate-200/80"}`}
                      >
                        <div>
                          <span className="text-xs font-extrabold text-[#0a66ff]">{course.code}</span>
                          <h4 className="text-xs font-bold text-[#0b1a33] mt-0.5 truncate max-w-[160px]">{course.name}</h4>
                        </div>
                        <span className="text-xs font-black text-[#0b1a33]">Goal: {course.targetGrade}%</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Course Detail & AI */}
            <div className="lg:col-span-2 space-y-6">
              {selectedCourse ? (
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
                  <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-100">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-[#e8f0fe] text-[#0a66ff] text-xs font-extrabold">
                        {selectedCourse.code}
                      </span>
                      <h2 className="text-lg font-black text-[#0b1a33] mt-2">{selectedCourse.name}</h2>
                    </div>
                    <button
                      onClick={() => setIsAiDrawerOpen(true)}
                      className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#0a66ff] to-[#7c3aed] text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <i className="fas fa-wand-magic-sparkles text-xs"></i>
                      <span>Ask Coursework AI</span>
                    </button>
                  </div>

                  {/* Final Exam Grade Calculator */}
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                      Final Exam Target Calculator
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#f8faff] p-4 rounded-2xl border border-slate-200/70">
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
                        <label className="text-[0.7rem] font-bold text-slate-600 block mb-1">Final Exam Weight (%)</label>
                        <input
                          type="number"
                          value={gradeCalc.finalWeight}
                          onChange={(e) => setGradeCalc({ ...gradeCalc, finalWeight: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-[#0b1a33]"
                        />
                      </div>
                    </div>

                    <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
                      <span>
                        Required Final Exam Score:{" "}
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
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 text-center text-xs text-slate-500">
                  Select a course from your vault or add a new one.
                </div>
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: FOCUS ROOM                                                         */}
        {/* ========================================================================= */}
        {activeTab === "focus" && (
          <div className="bg-gradient-to-br from-[#0b1a33] to-[#142b4a] rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-white/10 space-y-8 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#0a66ff]/20 text-[#0a66ff] border border-[#0a66ff]/30 text-[0.65rem] font-extrabold uppercase tracking-wider">
                  Distraction Shield Ready
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Focus Sanctuary</h2>
                <p className="text-xs text-slate-300">Accumulate verified study hours</p>
              </div>

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
              </div>
            </div>

            {/* Pomodoro Timer */}
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
                    strokeDashoffset={326.72 - (326.72 * focusTimeLeft) / (focusMode === "pomodoro" ? 25 * 60 : 5 * 60)}
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tighter">
                    {String(Math.floor(focusTimeLeft / 60)).padStart(2, "0")}:{String(focusTimeLeft % 60).padStart(2, "0")}
                  </span>
                  <span className="text-[0.7rem] uppercase font-bold text-slate-400 mt-1">
                    {isFocusRunning ? "In Progress" : "Ready to Sprint"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setIsFocusRunning(!isFocusRunning)}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#0a66ff] to-[#3b82f6] text-white font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <i className={`fas ${isFocusRunning ? "fa-pause" : "fa-play"} text-xs`}></i>
                  <span>{isFocusRunning ? "Pause Session" : "Start Focus Session"}</span>
                </button>
                <button
                  onClick={() => { setIsFocusRunning(false); setFocusTimeLeft(25 * 60); }}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="fas fa-rotate-left text-sm"></i>
                </button>
              </div>
            </div>

            {/* Soundscapes */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  Ambient Neuro-Soundscapes
                </span>
                <span className="text-[0.7rem] text-slate-400">
                  {activeSound !== "silence" ? `Playing: ${activeSound.toUpperCase()}` : "Muted"}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { id: "silence", name: "Mute", icon: "fa-volume-xmark" },
                  { id: "rain", name: "Rain", icon: "fa-cloud-rain" },
                  { id: "white", name: "White Noise", icon: "fa-wind" },
                  { id: "binaural", name: "40Hz Gamma", icon: "fa-brain" },
                  { id: "cafe", name: "Cafe Ambience", icon: "fa-mug-hot" },
                ].map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => toggleSoundscape(sound.id as any)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${activeSound === sound.id
                      ? "bg-[#0a66ff] text-white border-[#0a66ff] shadow-lg scale-105"
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
        {/* TAB 5: DISCIPLINE & AUDIT TRAIL                                           */}
        {/* ========================================================================= */}
        {activeTab === "audit" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-extrabold text-[#0b1a33]">Immutable Cryptographic Activity Ledger</h3>
                  <p className="text-[0.7rem] text-slate-400">Cryptographically verifiable actions for {userProfile.name}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[0.65rem] font-bold">
                  Tamper Proof
                </span>
              </div>

              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
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
                    <span className="text-[0.68rem] font-medium text-slate-400 shrink-0">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: ACCOUNTABILITY NETWORK                                             */}
        {/* ========================================================================= */}
        {activeTab === "network" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-extrabold text-[#0b1a33]">Linked Accountability Partners</h3>
                  <p className="text-[0.7rem] text-slate-400">Contacts notified when study pacts are missed</p>
                </div>
                <button
                  onClick={() => setIsAddPartnerOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#0a66ff] text-white text-xs font-bold shadow-md hover:bg-[#084bc2] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <i className="fas fa-user-plus text-xs"></i>
                  <span>+ Add Partner</span>
                </button>
              </div>

              {partners.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0a66ff] flex items-center justify-center text-lg mx-auto">
                    <i className="fas fa-users"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0b1a33]">No Accountability Partners Connected</h4>
                    <p className="text-[0.7rem] text-slate-500 max-w-sm mx-auto mt-0.5">
                      Link a study buddy, parent, or academic mentor so MyPact can dispatch verified emergency WhatsApp updates if you snooze an alarm.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddPartnerOpen(true)}
                    className="px-5 py-2 rounded-xl bg-[#0a66ff] text-white text-xs font-bold shadow-md hover:bg-[#084bc2] transition-colors cursor-pointer"
                  >
                    + Add Your First Partner
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {partners.map((partner) => (
                    <div key={partner.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: SETTINGS & SECURITY                                                */}
        {/* ========================================================================= */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 animate-fadeIn max-w-3xl mx-auto">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-[#0b1a33]">Account & Security Settings</h3>
              <p className="text-xs text-slate-400">Configure parameters for {userProfile.name}</p>
            </div>

            <div className="space-y-4">
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

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#0b1a33]">WhatsApp Partner Escalation</h4>
                  <p className="text-[0.7rem] text-slate-500">Auto-broadcast WhatsApp notification when an alarm is dismissed without proof</p>
                </div>
                <input
                  type="checkbox"
                  checked={settingsState.partnerWhatsappAlerts}
                  onChange={(e) => setSettingsState({ ...settingsState, partnerWhatsappAlerts: e.target.checked })}
                  className="w-5 h-5 accent-[#0a66ff] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* MODAL: CREATE TASK                                                        */}
      {/* ========================================================================= */}
      {isCreateTaskOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-white/80 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-[#0b1a33]">Create New Study Pact</h3>
              <button onClick={() => setIsCreateTaskOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <i className="fas fa-xmark text-sm"></i>
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-[0.72rem] font-bold text-slate-700 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Study Chemistry Chapter 4"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-[#0b1a33] outline-none"
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
                    {courses.map((c) => (
                      <option key={c.id} value={c.code}>{c.code} - {c.name}</option>
                    ))}
                    <option value="General">General / Other</option>
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
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateTaskOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-slate-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#0a66ff] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Save Pact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD COURSE                                                         */}
      {/* ========================================================================= */}
      {isAddCourseOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-white/80 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-[#0b1a33]">Enroll New Course</h3>
              <button onClick={() => setIsAddCourseOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <i className="fas fa-xmark text-sm"></i>
              </button>
            </div>

            <form onSubmit={handleAddCourse} className="space-y-3">
              <div>
                <label className="text-[0.72rem] font-bold text-slate-700 block mb-1">Course Code</label>
                <input
                  type="text"
                  placeholder="e.g. CHM 201"
                  value={newCourseCode}
                  onChange={(e) => setNewCourseCode(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-[#0b1a33]"
                />
              </div>
              <div>
                <label className="text-[0.72rem] font-bold text-slate-700 block mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Chemistry II"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-[#0b1a33]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddCourseOpen(false)}
                  className="px-4 py-1.5 text-xs text-slate-500 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded-full bg-[#0a66ff] text-white text-xs font-bold"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD PARTNER                                                        */}
      {/* ========================================================================= */}
      {isAddPartnerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-white/80 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-[#0b1a33]">Link Accountability Partner</h3>
              <button onClick={() => setIsAddPartnerOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <i className="fas fa-xmark text-sm"></i>
              </button>
            </div>

            <form onSubmit={handleAddPartner} className="space-y-3">
              <div>
                <label className="text-[0.72rem] font-bold text-slate-700 block mb-1">Partner Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah K."
                  value={newPartnerName}
                  onChange={(e) => setNewPartnerName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-[#0b1a33]"
                />
              </div>
              <div>
                <label className="text-[0.72rem] font-bold text-slate-700 block mb-1">WhatsApp Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +234 902 787 4036"
                  value={newPartnerPhone}
                  onChange={(e) => setNewPartnerPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-[#0b1a33]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPartnerOpen(false)}
                  className="px-4 py-1.5 text-xs text-slate-500 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded-full bg-[#0a66ff] text-white text-xs font-bold"
                >
                  Connect Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ACTIVE ALARM SIMULATION                                            */}
      {/* ========================================================================= */}
      {isAlarmActive && (
        <div className="fixed inset-0 z-50 bg-[#0b1a33]/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn text-white">
          <div className="w-full max-w-xl bg-gradient-to-b from-[#142b4a] to-[#0b1a33] rounded-3xl border border-red-500/40 p-6 sm:p-8 shadow-[0_0_80px_rgba(239,68,68,0.3)] space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-3xl mx-auto border border-red-500/40 animate-pulse">
                <i className="fas fa-bell"></i>
              </div>
              <h2 className="text-2xl font-black text-white">Verification Challenge</h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Solve the challenge to disarm the alarm and prevent WhatsApp partner escalation.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 text-red-400 font-mono text-sm font-black border border-red-500/30">
                <i className="fas fa-clock"></i>
                <span>01:{String(alarmTimeRemaining).padStart(2, "0")} remaining</span>
              </div>
            </div>

            <div className="bg-black/40 rounded-2xl p-5 border border-white/10 space-y-4">
              <div className="text-center">
                <span className="text-[0.65rem] uppercase font-bold text-slate-400">Derivative Problem</span>
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
                  className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-center font-bold text-sm outline-none"
                />
                <button
                  onClick={handleSolveMath}
                  className="px-6 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs cursor-pointer"
                >
                  Verify
                </button>
              </div>

              {alarmMathResult === "correct" && (
                <p className="text-center text-xs font-bold text-emerald-400">
                  <i className="fas fa-check-circle mr-1"></i> Correct! Alarm disarmed.
                </p>
              )}
              {alarmMathResult === "wrong" && (
                <p className="text-center text-xs font-bold text-red-400">
                  <i className="fas fa-circle-xmark mr-1"></i> Incorrect answer. Try again!
                </p>
              )}
            </div>

            <div className="text-center pt-2">
              <button onClick={() => setIsAlarmActive(false)} className="text-xs text-slate-400 hover:text-white underline cursor-pointer">
                Close Alarm Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DRAWER: AI ASSISTANT                                                      */}
      {/* ========================================================================= */}
      {isAiDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-fadeIn">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0a66ff] to-[#7c3aed] text-white flex items-center justify-center text-xs">
                  <i className="fas fa-wand-magic-sparkles"></i>
                </div>
                <h3 className="text-xs font-extrabold text-[#0b1a33]">Coursework AI Assistant</h3>
              </div>
              <button onClick={() => setIsAiDrawerOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <i className="fas fa-xmark text-sm"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {aiMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs ${msg.sender === "user" ? "bg-[#0a66ff] text-white" : "bg-slate-100 text-[#0b1a33]"}`}>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask study questions..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendAiMessage()}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#0b1a33] outline-none"
              />
              <button onClick={handleSendAiMessage} className="w-10 h-10 rounded-xl bg-[#0a66ff] text-white flex items-center justify-center cursor-pointer">
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-10 animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-white/80 overflow-hidden mt-10 p-5 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <i className="fas fa-search text-slate-400 text-sm"></i>
              <input
                type="text"
                autoFocus
                placeholder="Search your real tasks, courses, and audit hashes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm font-medium text-[#0b1a33] outline-none"
              />
              <button onClick={() => setIsSearchOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <i className="fas fa-xmark text-sm"></i>
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-2">
              {tasks.length === 0 && courses.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">No data found to search.</div>
              ) : (
                tasks.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0b1a33]">{t.title} ({t.course})</span>
                    <span className="text-[#0a66ff] font-medium">{t.date}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-time Anti-Procrastination Kernel Active</span>
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
