import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await requireAdminAuth(req);
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role");
    const status = searchParams.get("status");
    const plan = searchParams.get("plan");

    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { university: { $regex: search, $options: "i" } },
      ];
    }
    if (role && role !== "all") query.role = role;
    if (status && status !== "all") query.status = status;
    if (plan && plan !== "all") {
      if (plan === "free") {
        query.$or = [{ "subscription.planType": "free" }, { subscription: { $exists: false } }];
      } else if (plan === "paid") {
        query["subscription.planType"] = "paid";
      }
    }

    const users = await User.find(query).select("-password").sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    console.error("Admin users list error:", error);
    return NextResponse.json({ error: error.message || "Unauthorized" }, { status: 403 });
  }
}
