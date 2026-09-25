import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import SystemSetting from "@/models/SystemSetting";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("mypact_token")?.value;
    const authHeader = req.headers.get("authorization");
    if (!token && authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    const payload = token ? verifyToken(token) : null;

    const body = await req.json().catch(() => ({}));
    const targetUserId = payload?.userId || body?.userId;
    const targetEmail = payload?.email || body?.email;

    await connectToDatabase();

    let user = null;
    if (targetUserId) {
      user = await User.findById(targetUserId);
    }
    if (!user && targetEmail) {
      user = await User.findOne({ email: targetEmail.toLowerCase().trim() });
    }

    if (!user) {
      return NextResponse.json({ error: "User account not found" }, { status: 404 });
    }

    // Get configurable free limits from SystemSetting
    const limitSetting = await SystemSetting.findOne({ key: "free_plan_limits" }).lean();
    const trialDays = limitSetting?.value?.trialDurationDays || 7;
    const maxStudyTasks = limitSetting?.value?.maxDailyTasks || 10;
    const maxCourses = limitSetting?.value?.maxCourses || 3;

    const now = new Date();
    const expiresAt = new Date(now.getTime() + trialDays * 24 * 60 * 60 * 1000);

    user.subscription = {
      planId: "free-trial",
      planName: "Free Trial",
      planType: "free",
      status: "active",
      freeTrialStartedAt: now,
      freeTrialExpiresAt: expiresAt,
      studyTasksUsed: 0,
      maxStudyTasks,
      maxCourses,
    };

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Free " + trialDays + "-Day Plan activated successfully.",
      subscription: user.subscription,
    });
  } catch (error: any) {
    console.error("Free plan activation error:", error);
    return NextResponse.json({ error: error.message || "Failed to activate free plan" }, { status: 500 });
  }
}
