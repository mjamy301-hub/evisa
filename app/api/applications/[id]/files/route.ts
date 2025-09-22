import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkPermission } from "@/lib/rbac";
import { FileStatus, Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session)
    return NextResponse.json(
      {
        success: false,
        error: { code: "UNAUTHORIZED", message: "Login required" }
      },
      { status: 401 }
    );
  try {
    checkPermission(session.role, "file:read:all");
  } catch {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Admin only" } }, { status: 403 });
  }

  const id = (await params).id;

  const application = await prisma.application.findUnique({
    where: {
      Id: Number(id),
      UserId: Number(session.id)
    },
    select: {
      Id: true
    }
  });

  if (session.role !== Role.ADMIN && !application) {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "You are not the " } },
      { status: 403 }
    );
  }

  const files = await prisma.file.findMany({
    where: {
      Status: FileStatus.ACTIVE,
      FileableType: "Application",
      FileableId: Number(id)
    }
  });

  return NextResponse.json({ success: true, data: files });
}
