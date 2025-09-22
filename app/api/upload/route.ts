import { NextResponse } from "next/server";
import path from "path";
import mime from "mime";
import { v7 as uuidv7 } from "uuid";

import { getSession } from "@/lib/auth";
import { FileStatus, type Role } from "@prisma/client";
import { checkPermission } from "@/lib/rbac";
import assert from "@/utils/fs/assert";
import { prisma } from "@/lib/prisma";
import { uploadSchemaSchema } from "@/lib/validation/file";
import { formatErrors } from "@/utils/formatError";
import fs from "fs/promises";

const ALLOWED_MIME = ["application/pdf", "image/jpeg", "image/png"];
const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
const UPLOAD_FOLDER = "upload";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Login required" } },
      { status: 401 }
    );
  }

  try {
    checkPermission(session.role as Role, "file:create");
  } catch {
    return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Admin only" } }, { status: 403 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) {
    return NextResponse.json(
      { success: false, error: { code: "BAD_REQUEST", file: "No file uploaded" } },
      { status: 400 }
    );
  }

  if (!ALLOWED_MIME.includes(file.type)) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "BAD_REQUEST", file: "Invalid file type. Supported type .pdf, .png, .jpeg, .jpg" }
      },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { success: false, error: { code: "BAD_REQUEST", file: "File too large (max 2 MB)" } },
      { status: 413 }
    );
  }

  const data: Record<string, unknown> = {};
  form.forEach((value, key) => {
    data[key] = value;
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { file: _, ...restBody } = data;

  const parsed = uploadSchemaSchema.safeParse(restBody);
  if (!parsed.success) {
    const formatted = formatErrors(parsed.error);
    return NextResponse.json({ success: false, error: { code: "BAD_REQUEST", ...formatted } }, { status: 400 });
  }

  // Convert to buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), UPLOAD_FOLDER);
  await assert(uploadDir);

  const fileExtension = mime.getExtension(file.type);
  const fileName = uuidv7() + "." + fileExtension;
  const filePath = path.join(uploadDir, fileName);
  await fs.writeFile(filePath, buffer);

  await prisma.file.deleteMany({
    where: {
      FileableType: "Application",
      FileableId: Number(parsed.data.FileableId),
      Status: FileStatus.ACTIVE,
      Identifier: parsed.data.Identifier
    }
  });

  const realPath = [UPLOAD_FOLDER, fileName].join("/");

  const created = await prisma.file.create({
    data: {
      FileableId: Number(parsed.data.FileableId),
      FileableType: "Application",
      Identifier: parsed.data.Identifier,
      Path: realPath,
      Extension: mime.getExtension(file.type)!,
      FileName: file.name,
      Status: FileStatus.ACTIVE,
      UserId: Number(session.id)
    }
  });

  return NextResponse.json({ success: true, data: created });
}
