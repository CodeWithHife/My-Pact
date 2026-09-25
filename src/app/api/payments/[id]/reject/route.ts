import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import Payment from "@/models/Payment";
import AuditLog from "@/models/AuditLog";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("mypact_token")?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const reason = body.reason || "Unable to match transfer with bank records.";

    await connectToDatabase();
    const payment = await Payment.findById(id);
    if (!payment) {
      return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
    }

    payment.status = "rejected";
    payment.rejectionReason = reason;
    payment.reviewedBy = payload.email || payload.name || "Admin";
    payment.reviewedAt = new Date();
    await payment.save();

    await AuditLog.create({
      adminId: payload.userId,
      adminEmail: payload.email || "admin@mypact.app",
      action: "payment_rejected",
      target: "Payment " + payment.reference + " (" + payment.userName + ")",
      details: { reason, amount: payment.amount },
    });

    return NextResponse.json({
      success: true,
      message: "Payment rejected with feedback note.",
      payment,
    });
  } catch (error: any) {
    console.error("Reject payment error:", error);
    return NextResponse.json({ error: error.message || "Failed to reject payment" }, { status: 500 });
  }
}
