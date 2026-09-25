import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import SupportRequest from "@/models/SupportRequest";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("mypact_token")?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const query: any = {};
    if (status && status !== "all") query.status = status;

    const tickets = await SupportRequest.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, tickets });
  } catch (error: any) {
    console.error("Get support requests error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch tickets" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const ticket = await SupportRequest.create({
      ...body,
      status: "open",
    });

    return NextResponse.json({ success: true, ticket }, { status: 201 });
  } catch (error: any) {
    console.error("Submit support request error:", error);
    return NextResponse.json({ error: error.message || "Failed to submit ticket" }, { status: 500 });
  }
}
