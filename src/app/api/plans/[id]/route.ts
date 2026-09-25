import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Plan from "@/models/Plan";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("mypact_token")?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    await connectToDatabase();
    const body = await req.json();

    const updatedPlan = await Plan.findByIdAndUpdate(id, body, { new: true });
    if (!updatedPlan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, plan: updatedPlan });
  } catch (error: any) {
    console.error("Update plan error:", error);
    return NextResponse.json({ error: error.message || "Failed to update plan" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("mypact_token")?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    await connectToDatabase();
    const plan = await Plan.findByIdAndDelete(id);
    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Plan removed successfully" });
  } catch (error: any) {
    console.error("Delete plan error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete plan" }, { status: 500 });
  }
}
