import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import Task from "@/models/Task";
import User from "@/models/User";
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
    const tasks = await Task.find({ userId }).sort({ date: 1, time: 1, createdAt: -1 });

    const formattedTasks = tasks.map((t) => ({
      id: t._id.toString(),
      title: t.title,
      course: t.course,
      category: t.category,
      time: t.time,
      date: t.date,
      days: t.days,
      status: t.status,
      duration: t.duration,
      verificationMethod: t.verificationMethod,
      isUrgent: t.isUrgent,
      completedAt: t.completedAt,
    }));

    return NextResponse.json({ tasks: formattedTasks });
  } catch (error: any) {
    console.error("Fetch tasks error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromReq(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, course, category, time, date, days, duration, verificationMethod, isUrgent } = body;

    if (!title || !course || !time || !date) {
      return NextResponse.json({ error: "Title, course, time, and date are required." }, { status: 400 });
    }

    await connectToDatabase();

    const newTask = await Task.create({
      userId,
      title: title.trim(),
      course: course.trim(),
      category: category || "study",
      time: time.trim(),
      date: date.trim(),
      days: Array.isArray(days) && days.length > 0 ? days : ["Mon", "Wed", "Fri"],
      duration: duration || "45 min",
      verificationMethod: verificationMethod || "math",
      isUrgent: !!isUrgent,
      status: "active",
    });

    return NextResponse.json({
      message: "Study pact created successfully.",
      task: {
        id: newTask._id.toString(),
        title: newTask.title,
        course: newTask.course,
        category: newTask.category,
        time: newTask.time,
        date: newTask.date,
        days: newTask.days,
        status: newTask.status,
        duration: newTask.duration,
        verificationMethod: newTask.verificationMethod,
        isUrgent: newTask.isUrgent,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error("Create task error:", error);
    return NextResponse.json({ error: error.message || "Failed to create study pact" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const userId = await getUserIdFromReq(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Task ID is required." }, { status: 400 });
    }

    await connectToDatabase();

    const updatePayload: any = { ...updates };
    if (status) {
      updatePayload.status = status;
      if (status === "completed") {
        updatePayload.completedAt = new Date();
      }
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId },
      updatePayload,
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }

    // If completed, optionally increment focusSessionsCompleted on user
    if (status === "completed") {
      await User.findByIdAndUpdate(userId, {
        $inc: { focusSessionsCompleted: 1 },
      });
    }

    return NextResponse.json({
      message: "Task updated.",
      task: {
        id: updatedTask._id.toString(),
        title: updatedTask.title,
        course: updatedTask.course,
        category: updatedTask.category,
        time: updatedTask.time,
        date: updatedTask.date,
        days: updatedTask.days,
        status: updatedTask.status,
        duration: updatedTask.duration,
        verificationMethod: updatedTask.verificationMethod,
        isUrgent: updatedTask.isUrgent,
      },
    });
  } catch (error: any) {
    console.error("Update task error:", error);
    return NextResponse.json({ error: error.message || "Failed to update task" }, { status: 500 });
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
      return NextResponse.json({ error: "Task ID is required." }, { status: 400 });
    }

    await connectToDatabase();
    const deleted = await Task.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully." });
  } catch (error: any) {
    console.error("Delete task error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete task" }, { status: 500 });
  }
}
