import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import Partner from "@/models/Partner";
import { verifyToken } from "@/lib/auth";

async function getUserIdFromReq(req: Request): Promise<string | null> {
  const cookieStore = await cookies();
  let token = cookieStore.get("mypact_token")?.value;

  if (!token) {
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  if (!token) return null;
  const payload = verifyToken(token);
  return payload ? payload.userId : null;
}

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromReq(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const partners = await Partner.find({ userId }).sort({ createdAt: -1 });

    const formatted = partners.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      relationship: p.relationship,
      phone: p.phone,
      status: p.status,
      lastDispatch: p.lastDispatch,
    }));

    return NextResponse.json({ partners: formatted });
  } catch (error: any) {
    console.error("Fetch partners error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch partners" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromReq(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, relationship, phone } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone number are required." }, { status: 400 });
    }

    await connectToDatabase();

    const newPartner = await Partner.create({
      userId,
      name: name.trim(),
      relationship: relationship ? relationship.trim() : "Study Partner",
      phone: phone.trim(),
      status: "connected",
      lastDispatch: "Standby",
    });

    return NextResponse.json({
      message: "Accountability partner linked.",
      partner: {
        id: newPartner._id.toString(),
        name: newPartner.name,
        relationship: newPartner.relationship,
        phone: newPartner.phone,
        status: newPartner.status,
        lastDispatch: newPartner.lastDispatch,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error("Create partner error:", error);
    return NextResponse.json({ error: error.message || "Failed to add partner" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const userId = await getUserIdFromReq(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Partner ID is required." }, { status: 400 });
    }

    await connectToDatabase();
    const deleted = await Partner.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return NextResponse.json({ error: "Partner not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Partner unlinked successfully." });
  } catch (error: any) {
    console.error("Delete partner error:", error);
    return NextResponse.json({ error: error.message || "Failed to unlink partner" }, { status: 500 });
  }
}
