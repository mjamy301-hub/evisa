import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const JWT_COOKIE = "token";
const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);

export type JwtPayload = { id: string; role: "ADMIN" | "USER" };

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { Email: email } });
  if (!user)
    return {
      error: {
        Email: "Email and password does not match",
        Password: "Password and password does not match"
      }
    };
  const ok = await bcrypt.compare(password, user.PasswordHash);
  if (!ok)
    return {
      error: {
        Email: "Email and password does not match",
        Password: "Password and password does not match"
      }
    };
  const payload: JwtPayload = { id: user.Id.toString(), role: user.Role };
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
  (await cookies()).set(JWT_COOKIE, token, { httpOnly: true, sameSite: "lax", secure: true, path: "/" });
  return payload;
}

export async function logout() {
  (await cookies()).delete(JWT_COOKIE);
}

export async function getSession(): Promise<JwtPayload | null> {
  const token = (await cookies()).get(JWT_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as JwtPayload;
  } catch {
    return null;
  }
}
