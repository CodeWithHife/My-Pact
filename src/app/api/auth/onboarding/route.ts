import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import Task from "@/models/Task";
import Course from "@/models/Course";
import Partner from "@/models/Partner";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request) {
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
      return NextResponse.json({ error: "Unauthorized. Please sign in." }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid or expired session token." }, { status: 401 });
    }

    const body = await req.json();
    const { university, faculty, level, targetGpa, tier, courses, firstPact, partnerInfo } = body;

    await connectToDatabase();

    const updatedUser = await User.findByIdAndUpdate(
      payload.userId,
      {
        university: university || "Institution not set",
        faculty: faculty || "Field of study not set",
        level: level || "Undergraduate",
        targetGpa: targetGpa || "First Class (4.50 - 5.00)",
        tier: tier ? `${tier.toUpperCase()} ENFORCEMENT` : "STRICT ENFORCEMENT",
        isOnboarded: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Seed Courses if provided
    if (Array.isArray(courses) && courses.length > 0) {
      const courseDocs = courses.map((crs: any) => {
        const code = typeof crs === "string" ? crs.split(" ")[0].toUpperCase() : crs.code || "CRS";
        const name = typeof crs === "string" ? crs : crs.name || "Course";
        return {
          userId: updatedUser._id,
          code,
          name,
          targetGrade: 90,
          units: 3,
        };
      });

      // Avoid duplicates
      for (const crs of courseDocs) {
        await Course.findOneAndUpdate(
          { userId: updatedUser._id, code: crs.code },
          crs,
          { upsert: true, new: true }
        );
      }
    }

    // Seed Initial Pact if provided
    if (firstPact && firstPact.name) {
      const today = new Date().toISOString().split("T")[0];
      await Task.create({
        userId: updatedUser._id,
        title: firstPact.name,
        course: firstPact.subject || "General Study",
        category: "study",
        time: "19:00",
        date: today,
        days: firstPact.frequency === "daily" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["Mon", "Wed", "Fri"],
        status: "active",
        duration: `${firstPact.duration || 45} min`,
        verificationMethod: "math",
        isUrgent: false,
      });
    }

    // Save partner if provided
    if (partnerInfo && partnerInfo.name && partnerInfo.phone) {
      await Partner.create({
        userId: updatedUser._id,
        name: partnerInfo.name,
        relationship: "Accountability Partner",
        phone: partnerInfo.phone,
        status: "connected",
        lastDispatch: "Standby",
      });
    }

    return NextResponse.json({
      message: "Onboarding completed and synced successfully.",
      user: {
        id: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email,
        university: updatedUser.university,
        faculty: updatedUser.faculty,
        level: updatedUser.level,
        targetGpa: updatedUser.targetGpa,
        tier: updatedUser.tier,
        isOnboarded: updatedUser.isOnboarded,
      },
    });
  } catch (error: any) {
    console.error("Onboarding sync error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save onboarding data." },
      { status: 500 }
    );
  }
}
