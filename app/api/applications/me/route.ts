import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { checkPermission } from "@/lib/rbac";

export async function GET() {
  const session = await getSession();
  if (!session)
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Login required" } },
      { status: 401 }
    );
  try {
    checkPermission(session.role, "applications:read:own");
  } catch {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Forbidden" } }, { status: 403 });
  }
  const app = await prisma.application.findUnique({ where: { UserId: Number(session.id) } });
  return NextResponse.json({ success: true, data: app });
}
