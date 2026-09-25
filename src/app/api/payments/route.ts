import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import Payment from "@/models/Payment";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";
import { sendPaymentPendingAdminEmail } from "@/lib/email";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("mypact_token")?.value;
    const payload = token ? verifyToken(token) : null;

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const query: any = {};
    if (status && status !== "all") {
      query.status = status;
    }

    const payments = await Payment.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, payments });
  } catch (error: any) {
    console.error("Fetch payments error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch payments" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("mypact_token")?.value;
    const authHeader = req.headers.get("authorization");
    if (!token && authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    const payload = token ? verifyToken(token) : null;
    const body = await req.json();

    const {
      planId,
      planName,
      amount,
      senderName,
      senderBank,
      transactionRef,
      reference,
      paymentProof,
      userEmail,
      userId,
    } = body;

    if (!senderName || !senderName.trim()) {
      return NextResponse.json(
        { error: "Sender account name is required for transfer verification." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    let user = null;
    if (payload?.userId || userId) {
      user = await User.findById(payload?.userId || userId);
    }
    if (!user && (userEmail || payload?.email)) {
      user = await User.findOne({ email: (userEmail || payload?.email).toLowerCase().trim() });
    }

    const effectiveUserEmail = user ? user.email : userEmail || "student@mypact.app";
    const effectiveUserName = user ? user.name : senderName || "MyPact Student";

    // Deduplication check: prevent submitting the exact same reference
    const refNumber = reference && reference.startsWith("PACT-") ? reference : "PACT-" + Math.floor(100000 + Math.random() * 900000);
    const existingPayment = await Payment.findOne({ reference: refNumber });
    if (existingPayment) {
      return NextResponse.json({
        success: true,
        message: "Payment transfer already recorded and is awaiting verification.",
        payment: existingPayment,
      });
    }

    // Always create with "pending" status (NEVER activate automatically)
    const payment = await Payment.create({
      userId: user ? user._id : undefined,
      userEmail: effectiveUserEmail,
      userName: effectiveUserName,
      planId: planId || "scholar-pro",
      planName: planName || "Scholar Pro",
      amount: Number(amount) || 1500,
      currency: "NGN",
      senderName: senderName.trim(),
      senderBank: senderBank ? senderBank.trim() : "OPay",
      transactionRef: transactionRef ? transactionRef.trim() : "",
      reference: refNumber,
      paymentProof: paymentProof || "",
      status: "pending",
    });

    // Send automatic email notification to Admin (graceful / non-blocking)
    try {
      await sendPaymentPendingAdminEmail({
        userName: payment.userName,
        userEmail: payment.userEmail,
        planName: payment.planName,
        amount: payment.amount,
        reference: payment.reference,
        transactionRef: payment.transactionRef,
        senderName: payment.senderName,
        senderBank: payment.senderBank,
        submittedAt: payment.createdAt,
      });
    } catch (emailErr) {
      console.warn("Non-fatal email notification warning:", emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Payment transfer submitted successfully and is awaiting admin verification.",
        payment,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create payment error:", error);
    return NextResponse.json({ error: error.message || "Failed to submit payment" }, { status: 500 });
  }
}
