import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { checkPermission } from "@/lib/rbac";
import { formatErrors } from "@/utils/formatError";
import { applicationPatchSchema } from "@/lib/validation/application";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session)
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Login required" } },
      { status: 401 }
    );
  const id = (await params).id;
  const app = await prisma.application.findUnique({ where: { Id: Number(id) } });
  if (!app)
    return NextResponse.json(
      { success: false, error: { code: "NOT_FOUND", message: "Application not found" } },
      { status: 404 }
    );

  if (app.UserId.toString() === session.id) {
    try {
      checkPermission(session.role, "applications:read:own");
    } catch {
      return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Forbidden" } }, { status: 403 });
    }
    return NextResponse.json({ success: true, data: app });
  }

  try {
    checkPermission(session.role, "applications:read:all");
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "NOT_FOUND", message: "Application not found" } },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: app });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session)
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Login required" } },
      { status: 401 }
    );
  try {
    checkPermission(session.role, "applications:update:all");
  } catch {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Admin only" } }, { status: 403 });
  }

  const body = await req.json();
  const parsed = applicationPatchSchema.safeParse(body);
  if (!parsed.success) {
    const formatted = formatErrors(parsed.error);
    return NextResponse.json({ success: false, error: { code: "BAD_REQUEST", ...formatted } }, { status: 400 });
  }
  const id = (await params).id;
  const updated = await prisma.application.update({ where: { Id: Number(id) }, data: parsed.data });
  return NextResponse.json({ success: true, data: updated });
}
