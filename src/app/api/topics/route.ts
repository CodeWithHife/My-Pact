import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Topic from "@/models/Topic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const courseCode = searchParams.get("courseCode");
    const courseId = searchParams.get("courseId");

    await connectToDatabase();
    const query: any = {};
    if (courseCode) query.courseCode = courseCode.toUpperCase();
    if (courseId) query.courseId = courseId;

    const topics = await Topic.find(query).sort({ week: 1, order: 1 }).lean();
    return NextResponse.json({ success: true, topics });
  } catch (error: any) {
    console.error("Get topics error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch topics" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const topic = await Topic.create(body);
    return NextResponse.json({ success: true, topic }, { status: 201 });
  } catch (error: any) {
    console.error("Create topic error:", error);
    return NextResponse.json({ error: error.message || "Failed to create topic" }, { status: 500 });
  }
}
