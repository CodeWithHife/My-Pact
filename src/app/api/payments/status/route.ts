import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Payment from "@/models/Payment";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref");
    const email = searchParams.get("email");

    if (!ref && !email) {
      return NextResponse.json({ error: "Reference or email query parameter required" }, { status: 400 });
    }

    await connectToDatabase();
    const query: any = {};
    if (ref) query.reference = ref;
    if (email) query.userEmail = email.toLowerCase().trim();

    const payment = await Payment.findOne(query).sort({ createdAt: -1 }).lean();
    if (!payment) {
      return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, payment });
  } catch (error: any) {
    console.error("Payment status check error:", error);
    return NextResponse.json({ error: error.message || "Failed to retrieve payment status" }, { status: 500 });
  }
}
