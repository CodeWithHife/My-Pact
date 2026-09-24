import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("mypact_token")?.value;

    if (!token) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findById(payload.userId).select("-password");

    if (!user) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 404 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        university: user.university,
        faculty: user.faculty,
        level: user.level,
        targetGpa: user.targetGpa,
        tier: user.tier,
        isOnboarded: user.isOnboarded,
        streakDays: user.streakDays,
        focusMinutesTotal: user.focusMinutesTotal,
        focusSessionsCompleted: user.focusSessionsCompleted,
      },
    });
  } catch (error: any) {
    console.error("Session check error:", error);
    return NextResponse.json({ authenticated: false, error: "Session verification failed" }, { status: 500 });
  }
}
