import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "kalo_admin_session";
const SESSION_DURATION = "7d";

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set.");
  return new TextEncoder().encode(secret);
}

export type AdminSession = {
  adminId: string;
  email: string;
};

export async function createSessionToken(session: AdminSession): Promise<string> {
  return new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.adminId !== "string" || typeof payload.email !== "string") {
      return null;
    }
    return { adminId: payload.adminId, email: payload.email };
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
