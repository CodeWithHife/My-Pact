import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import AuditLog from "@/models/AuditLog";
import { verifyToken } from "@/lib/auth";

async function getUserIdFromReq(req: Request): Promise<string | null> {
  const cookieStore = await cookies();
  let token = cookieStore.get("mypact_token")?.value;

  if (!token) {
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  if (!token) return null;
  const payload = verifyToken(token);
  return payload ? payload.userId : null;
}

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromReq(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const logs = await AuditLog.find({ userId }).sort({ createdAt: -1 }).limit(100);

    const formatted = logs.map((l) => ({
      id: l._id.toString(),
      hash: l.hash,
      timestamp: l.timestamp,
      action: l.action,
      course: l.course,
      status: l.status,
      details: l.details,
    }));

    return NextResponse.json({ auditLogs: formatted });
  } catch (error: any) {
    console.error("Fetch audit logs error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch audit logs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromReq(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, course, status, details } = body;

    if (!action) {
      return NextResponse.json({ error: "Action is required." }, { status: 400 });
    }

    await connectToDatabase();

    const hash = `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 6)}`;
    const timestamp = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const newLog = await AuditLog.create({
      userId,
      hash,
      timestamp,
      action: action.trim(),
      course: course ? course.trim() : "General",
      status: status || "verified",
      details: details || "",
    });

    return NextResponse.json({
      message: "Audit record logged.",
      log: {
        id: newLog._id.toString(),
        hash: newLog.hash,
        timestamp: newLog.timestamp,
        action: newLog.action,
        course: newLog.course,
        status: newLog.status,
        details: newLog.details,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error("Create audit log error:", error);
    return NextResponse.json({ error: error.message || "Failed to create audit log" }, { status: 500 });
  }
}
