import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import SystemSetting from "@/models/SystemSetting";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (key) {
      const setting = await SystemSetting.findOne({ key }).lean();
      return NextResponse.json({ success: true, setting: setting?.value || null });
    }

    const settings = await SystemSetting.find().lean();
    const settingsMap: Record<string, any> = {};
    settings.forEach((s: any) => {
      settingsMap[s.key] = s.value;
    });

    return NextResponse.json({ success: true, settings: settingsMap });
  } catch (error: any) {
    console.error("Get settings error:", error);
    return NextResponse.json({ error: error.message || "Failed to load settings" }, { status: 500 });
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
    const { key, value, description } = await req.json();

    if (!key) {
      return NextResponse.json({ error: "Setting key is required" }, { status: 400 });
    }

    const setting = await SystemSetting.findOneAndUpdate(
      { key },
      { key, value, description, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, setting });
  } catch (error: any) {
    console.error("Save setting error:", error);
    return NextResponse.json({ error: error.message || "Failed to save setting" }, { status: 500 });
  }
}
