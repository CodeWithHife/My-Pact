import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import Announcement from "@/models/Announcement";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    await connectToDatabase();
    const announcements = await Announcement.find({ isActive: true }).sort({ isPinned: -1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, announcements });
  } catch (error: any) {
    console.error("Get announcements error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch announcements" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("mypact_token")?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectToDatabase();
    const body = await req.json();
    const announcement = await Announcement.create({
      ...body,
      createdBy: payload.email || "Admin",
    });

    return NextResponse.json({ success: true, announcement }, { status: 201 });
  } catch (error: any) {
    console.error("Create announcement error:", error);
    return NextResponse.json({ error: error.message || "Failed to create announcement" }, { status: 500 });
  }
}
