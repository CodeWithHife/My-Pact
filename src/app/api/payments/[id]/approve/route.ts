import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Plan from "@/models/Plan";
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

    await connectToDatabase();
    const payment = await Payment.findById(id);
    if (!payment) {
      return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
    }

    if (payment.status === "approved") {
      return NextResponse.json({ success: true, message: "Payment was already approved", payment });
    }

    payment.status = "approved";
    payment.reviewedBy = payload.email || payload.name || "Admin";
    payment.reviewedAt = new Date();
    await payment.save();

    const plan = await Plan.findById(payment.planId) || await Plan.findOne({ slug: payment.planId });
    const durationDays = plan?.durationDays || (payment.amount >= 6000 ? 120 : payment.amount >= 3500 ? 90 : 30);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

    if (payment.userId || payment.userEmail) {
      const userQuery = payment.userId ? { _id: payment.userId } : { email: payment.userEmail.toLowerCase().trim() };
      await User.findOneAndUpdate(
        userQuery,
        {
          subscription: {
            planId: payment.planId,
            planName: payment.planName,
            planType: "paid",
            status: "active",
            paidAt: now,
            expiresAt,
            amountPaid: payment.amount,
            reference: payment.reference,
            maxCourses: plan?.limits?.maxCourses || 12,
            maxStudyTasks: plan?.limits?.maxDailyTasks || 50,
          },
        }
      );
    }

    await AuditLog.create({
      adminId: payload.userId,
      adminEmail: payload.email || "admin@mypact.app",
      action: "payment_approved",
      target: "Payment " + payment.reference + " for " + payment.userName + " (" + payment.userEmail + ")",
      details: { amount: payment.amount, planName: payment.planName, reference: payment.reference },
    });

    return NextResponse.json({
      success: true,
      message: "Payment approved and " + payment.planName + " subscription unlocked for " + payment.userName + ".",
      payment,
    });
  } catch (error: any) {
    console.error("Approve payment error:", error);
    return NextResponse.json({ error: error.message || "Failed to approve payment" }, { status: 500 });
  }
}
