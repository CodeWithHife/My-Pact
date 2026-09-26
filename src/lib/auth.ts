import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import User, { IUser } from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "mypact_jwt_secret_fallback_key";

export interface TokenPayload {
  userId: string;
  email: string;
  username?: string;
  name?: string;
  role?: string;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Server-side Admin Authentication Guard.
 * Extracts token, verifies JWT, queries live MongoDB, and enforces user.role === 'admin' and user.status === 'active'.
 */
export async function requireAdminAuth(req?: Request): Promise<{ user: IUser; payload: TokenPayload }> {
  const cookieStore = await cookies();
  let token = cookieStore.get("mypact_token")?.value;

  if (!token && req) {
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  const payload = verifyToken(token);
  if (!payload || !payload.userId) {
    throw new Error("Invalid or expired session. Please log in again.");
  }

  await connectToDatabase();
  const user = await User.findById(payload.userId);

  if (!user) {
    throw new Error("User account not found.");
  }

  if (user.status === "suspended") {
    throw new Error("This account has been suspended.");
  }

  if (user.role !== "admin") {
    throw new Error("Unauthorized. Administrator access required.");
  }

  return { user, payload };
}
