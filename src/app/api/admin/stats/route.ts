import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import Payment from "@/models/Payment";
import Task from "@/models/Task";
import Course from "@/models/Course";
import SupportRequest from "@/models/SupportRequest";

export async function GET(req: Request) {
  try {
    await requireAdminAuth(req);
    await connectToDatabase();

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      newUsers,
      activeUsers,
      freeUsers,
      paidUsers,
      pendingPayments,
      approvedPayments,
      rejectedPayments,
      totalTasks,
      totalCourses,
      openSupport,
      recentUsers,
      recentPayments,
      recentTasks,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      User.countDocuments({ status: "active" }),
      User.countDocuments({ $or: [{ "subscription.planType": "free" }, { subscription: { $exists: false } }] }),
      User.countDocuments({ "subscription.planType": "paid", "subscription.status": "active" }),
      Payment.countDocuments({ status: "pending" }),
      Payment.find({ status: "approved" }).lean(),
      Payment.countDocuments({ status: "rejected" }),
      Task.countDocuments(),
      Course.countDocuments(),
      SupportRequest.countDocuments({ status: "open" }),
      User.find().sort({ createdAt: -1 }).limit(6).select("-password").lean(),
      Payment.find().sort({ createdAt: -1 }).limit(6).lean(),
      Task.find().sort({ createdAt: -1 }).limit(6).lean(),
    ]);

    const totalRevenue = approvedPayments.reduce((acc: number, p: any) => acc + (p.amount || 0), 0);

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        newUsers,
        activeUsers,
        freeUsers,
        paidUsers,
        activeSubscriptions: paidUsers,
        expiredSubscriptions: Math.max(0, totalUsers - activeUsers - paidUsers),
        pendingPayments,
        approvedPaymentsCount: approvedPayments.length,
        rejectedPayments,
        totalRevenue,
        totalTasks,
        totalCourses,
        openSupport,
      },
      recentUsers,
      recentPayments,
      recentActivity: recentTasks,
    });
  } catch (error: any) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: error.message || "Unauthorized" }, { status: 403 });
  }
}
