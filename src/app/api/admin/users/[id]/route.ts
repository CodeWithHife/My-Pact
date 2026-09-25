import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import Task from "@/models/Task";
import Course from "@/models/Course";
import Payment from "@/models/Payment";
import AuditLog from "@/models/AuditLog";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("mypact_token")?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectToDatabase();
    const user = await User.findById(id).select("-password").lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const [tasks, courses, payments] = await Promise.all([
      Task.find({ userId: id }).lean(),
      Course.find({ userId: id }).lean(),
      Payment.find({ $or: [{ userId: id }, { userEmail: user.email }] }).lean(),
    ]);

    return NextResponse.json({ success: true, user, tasks, courses, payments });
  } catch (error: any) {
    console.error("Admin get user detail error:", error);
    return NextResponse.json({ error: error.message || "Failed to load user" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("mypact_token")?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectToDatabase();
    const body = await req.json();

    const user = await User.findByIdAndUpdate(id, body, { new: true }).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await AuditLog.create({
      adminId: payload.userId,
      adminEmail: payload.email || "admin@mypact.app",
      action: "user_updated",
      target: "User " + user.name + " (" + user.email + ")",
      details: body,
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error("Admin update user error:", error);
    return NextResponse.json({ error: error.message || "Failed to update user" }, { status: 500 });
  }
}
