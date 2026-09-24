import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, email, password } = body;

    const loginId = (identifier || email || "").toLowerCase().trim();

    if (!loginId || !password) {
      return NextResponse.json(
        { error: "Please enter your email or username and password." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find user by either email or username
    const user = await User.findOne({
      $or: [{ email: loginId }, { username: loginId }],
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid credentials. Please verify your email/username and password." },
        { status: 401 }
      );
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials. Please verify your email/username and password." },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      username: user.username,
      name: user.name,
    });

    const userPayload = {
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
    };

    const response = NextResponse.json(
      { message: "Login successful.", user: userPayload, token },
      { status: 200 }
    );

    response.cookies.set("mypact_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during login." },
      { status: 500 }
    );
  }
}
