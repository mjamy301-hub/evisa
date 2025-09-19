import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { Role } from "@prisma/client";
import { isPublicRoute, isAllowed } from "@/lib/rbac";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);

async function getRoleFromCookie(req: NextRequest): Promise<Role | undefined> {
  const token = req.cookies.get("token")?.value;
  if (!token) return undefined;
  try {
    const { payload } = await jwtVerify(token, secret);
    const r = payload.role as string | undefined;
    if (r) return r as Role;
  } catch {}
  return undefined;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const role = await getRoleFromCookie(req);
  if (pathname === "/login" && role) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Protected routes
  if (!role) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!isAllowed(pathname, role)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/applications", "/applications/:path*", "/users", "/users/:path*"]
};
