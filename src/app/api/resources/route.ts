import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Resource from "@/models/Resource";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const courseCode = searchParams.get("courseCode");
    const type = searchParams.get("type");

    await connectToDatabase();
    const query: any = { isPublic: true };
    if (courseCode) query.courseCode = courseCode.toUpperCase();
    if (type && type !== "all") query.type = type;

    const resources = await Resource.find(query).sort({ downloads: -1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, resources });
  } catch (error: any) {
    console.error("Get resources error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch resources" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const resource = await Resource.create(body);
    return NextResponse.json({ success: true, resource }, { status: 201 });
  } catch (error: any) {
    console.error("Create resource error:", error);
    return NextResponse.json({ error: error.message || "Failed to create resource" }, { status: 500 });
  }
}
