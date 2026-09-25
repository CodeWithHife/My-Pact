import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Plan from "@/models/Plan";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all");

    const query: any = all === "true" ? {} : { isActive: true };
    const plans = await Plan.find(query).sort({ order: 1, price: 1 }).lean();

    return NextResponse.json({ success: true, plans });
  } catch (error: any) {
    console.error("Get plans error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch plans" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("mypact_token")?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    await connectToDatabase();
    const body = await req.json();

    const plan = await Plan.create(body);
    return NextResponse.json({ success: true, plan }, { status: 201 });
  } catch (error: any) {
    console.error("Create plan error:", error);
    return NextResponse.json({ error: error.message || "Failed to create plan" }, { status: 500 });
  }
}
