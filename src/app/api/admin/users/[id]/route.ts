import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import Task from "@/models/Task";
import Course from "@/models/Course";
import Payment from "@/models/Payment";
import AuditLog from "@/models/AuditLog";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await requireAdminAuth(req);
    await connectToDatabase();

    const user = await User.findById(id).select("-password").lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const [tasks, courses, payments] = await Promise.all([
      Task.find({ userId: id }).lean(),
      Course.find({ userId: id }).lean(),
      Payment.find({ $or: [{ userId: id }, { userEmail: user.email }] }).sort({ createdAt: -1 }).lean(),
    ]);

    return NextResponse.json({ success: true, user, tasks, courses, payments });
  } catch (error: any) {
    console.error("Admin get user detail error:", error);
    return NextResponse.json({ error: error.message || "Unauthorized" }, { status: 403 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { payload } = await requireAdminAuth(req);
    await connectToDatabase();

    const body = await req.json();

    // Prevent non-superadmin privilege escalation or accidental self-demotion
    const user = await User.findByIdAndUpdate(id, body, { new: true }).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await AuditLog.create({
      adminId: payload.userId,
      adminEmail: payload.email || "admin@mypact.app",
      action: body.status === "suspended" ? "user_suspended" : body.status === "active" ? "user_reactivated" : "user_updated",
      target: `User ${user.name} (${user.email})`,
      details: body,
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error("Admin update user error:", error);
    return NextResponse.json({ error: error.message || "Unauthorized" }, { status: 403 });
  }
}
