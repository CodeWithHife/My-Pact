import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, username, email, password, phone } = body;

    if (!firstName || !lastName || !username || !email || !password) {
      return NextResponse.json(
        { error: "Please provide all required fields." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUsername = username.toLowerCase().trim();

    // Check if user already exists
    const existingEmail = await User.findOne({ email: normalizedEmail });
    if (existingEmail) {
      return NextResponse.json(
        { error: "An account with this email address already exists." },
        { status: 409 }
      );
    }

    const existingUsername = await User.findOne({ username: normalizedUsername });
    if (existingUsername) {
      return NextResponse.json(
        { error: "This username is already taken. Please choose another." },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      name: `${firstName.trim()} ${lastName.trim()}`,
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone ? phone.trim() : "",
      isOnboarded: false,
    });

    const token = signToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      username: newUser.username,
      name: newUser.name,
    });

    const userPayload = {
      id: newUser._id.toString(),
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone,
      university: newUser.university,
      faculty: newUser.faculty,
      level: newUser.level,
      targetGpa: newUser.targetGpa,
      tier: newUser.tier,
      isOnboarded: newUser.isOnboarded,
    };

    const response = NextResponse.json(
      { message: "Account created successfully.", user: userPayload, token },
      { status: 201 }
    );

    // Set secure cookie
    response.cookies.set("mypact_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}
