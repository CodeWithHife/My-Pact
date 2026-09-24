import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mypact_jwt_secret_fallback_key";

export interface TokenPayload {
  userId: string;
  email: string;
  username: string;
  name: string;
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
