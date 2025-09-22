import { NextResponse } from "next/server";
import path from "path";
import mime from "mime";

import { getSession } from "@/lib/auth";
import { type Role } from "@prisma/client";
import { checkPermission } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Login required" } },
      { status: 401 }
    );
  }
  try {
    checkPermission(session.role as Role, "file:read:all");
  } catch {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Admin only" } }, { status: 403 });
  }

  const fileId = Number((await params).id);
  if (isNaN(fileId)) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "BAD_REQUEST", file: "Invalid file" }
      },
      { status: 400 }
    );
  }

  const file = await prisma.file.findUnique({
    where: { Id: fileId }
  });

  if (!file) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "BAD_REQUEST", file: "File not found" }
      },
      { status: 404 }
    );
  }

  const filepath = path.resolve(process.cwd(), file.Path);

  try {
    const data = await fs.readFile(filepath);
    // @ts-expect-error data will send as buffer
    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": mime.getType(file.Extension)!,
        "Content-Disposition": `attachment; filename="${file.FileName}"`,
        "Cache-Control": "private, max-age=0, must-revalidate"
      }
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: { code: "NOT_FOUND", file: "File missing on disk" }
      },
      { status: 404 }
    );
  }
}
