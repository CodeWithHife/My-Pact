import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import Course from "@/models/Course";
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
    const courses = await Course.find({ userId }).sort({ code: 1 });

    const formattedCourses = courses.map((c) => ({
      id: c._id.toString(),
      code: c.code,
      name: c.name,
      targetGrade: c.targetGrade,
      units: c.units,
      currentGrade: c.currentGrade,
    }));

    return NextResponse.json({ courses: formattedCourses });
  } catch (error: any) {
    console.error("Fetch courses error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromReq(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { code, name, targetGrade, units } = body;

    if (!code || !name) {
      return NextResponse.json({ error: "Course code and course name are required." }, { status: 400 });
    }

    await connectToDatabase();

    const newCourse = await Course.create({
      userId,
      code: code.trim().toUpperCase(),
      name: name.trim(),
      targetGrade: targetGrade ? Number(targetGrade) : 90,
      units: units ? Number(units) : 3,
    });

    return NextResponse.json({
      message: "Course added successfully.",
      course: {
        id: newCourse._id.toString(),
        code: newCourse.code,
        name: newCourse.name,
        targetGrade: newCourse.targetGrade,
        units: newCourse.units,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error("Create course error:", error);
    return NextResponse.json({ error: error.message || "Failed to add course" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const userId = await getUserIdFromReq(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, code, name, targetGrade, units, currentGrade } = body;

    if (!id) {
      return NextResponse.json({ error: "Course ID is required." }, { status: 400 });
    }

    await connectToDatabase();

    const updatePayload: any = {};
    if (code) updatePayload.code = code.trim().toUpperCase();
    if (name) updatePayload.name = name.trim();
    if (targetGrade !== undefined) updatePayload.targetGrade = Number(targetGrade);
    if (units !== undefined) updatePayload.units = Number(units);
    if (currentGrade !== undefined) updatePayload.currentGrade = Number(currentGrade);

    const updated = await Course.findOneAndUpdate(
      { _id: id, userId },
      updatePayload,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    return NextResponse.json({
      message: "Course updated.",
      course: {
        id: updated._id.toString(),
        code: updated.code,
        name: updated.name,
        targetGrade: updated.targetGrade,
        units: updated.units,
        currentGrade: updated.currentGrade,
      },
    });
  } catch (error: any) {
    console.error("Update course error:", error);
    return NextResponse.json({ error: error.message || "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const userId = await getUserIdFromReq(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Course ID is required." }, { status: 400 });
    }

    await connectToDatabase();
    const deleted = await Course.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Course removed successfully." });
  } catch (error: any) {
    console.error("Delete course error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete course" }, { status: 500 });
  }
}
