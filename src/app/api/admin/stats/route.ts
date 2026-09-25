import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import Payment from "@/models/Payment";
import Task from "@/models/Task";
import Course from "@/models/Course";
import SupportRequest from "@/models/SupportRequest";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("mypact_token")?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectToDatabase();

    const [
      totalUsers,
      activeUsers,
      pendingPayments,
      approvedPayments,
      totalTasks,
      totalCourses,
      openSupport,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ status: "active" }),
      Payment.countDocuments({ status: "pending" }),
      Payment.find({ status: "approved" }).lean(),
      Task.countDocuments(),
      Course.countDocuments(),
      SupportRequest.countDocuments({ status: "open" }),
    ]);

    const totalRevenue = approvedPayments.reduce((acc: number, p: any) => acc + (p.amount || 0), 0);

    const recentPayments = await Payment.find().sort({ createdAt: -1 }).limit(5).lean();
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select("-password").lean();

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        pendingPayments,
        approvedPaymentsCount: approvedPayments.length,
        totalRevenue,
        totalTasks,
        totalCourses,
        openSupport,
      },
      recentPayments,
      recentUsers,
    });
  } catch (error: any) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: error.message || "Failed to load stats" }, { status: 500 });
  }
}
