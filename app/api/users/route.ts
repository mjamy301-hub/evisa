import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth";
import { checkPermission } from "@/lib/rbac";
import { ApplicationStatus, Role } from "@prisma/client";
import { formatErrors } from "@/utils/formatError";
import { createUserSchema } from "@/lib/validation/user";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session)
    return NextResponse.json(
      {
        success: false,
        error: { code: "UNAUTHORIZED", message: "Login required" },
      },
      { status: 401 }
    );
  try {
    checkPermission(session.role, "users:read:all");
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "Admin only" } },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || undefined;
  const page = Number(searchParams.get("page") || "1");
  const pageSize = Number(searchParams.get("pageSize") || "20");

  const where = search
    ? { Username: { contains: search, mode: "insensitive" as const } }
    : undefined;
  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where: {
        Role: {
          not: Role.ADMIN,
        },
        ...where,
      },
      orderBy: { CreatedAt: "desc" },
      take: pageSize,
      skip: (page - 1) * pageSize,
      include: { Application: true },
    }),
    prisma.user.count({ where }),
  ]);
  return NextResponse.json({
    success: true,
    data: { items, total, page, pageSize },
  });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session)
    return NextResponse.json(
      {
        success: false,
        error: { code: "UNAUTHORIZED", message: "Login required" },
      },
      { status: 401 }
    );
  try {
    checkPermission(session.role, "users:create");
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "Admin only" } },
      { status: 403 }
    );
  }

  const body = await req.json();
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    const formatted = formatErrors(parsed.error);
    return NextResponse.json(
      { success: false, error: { code: "BAD_REQUEST", ...formatted } },
      { status: 400 }
    );
  }

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || "12");
  const hash = await bcrypt.hash(parsed.data.Password, saltRounds);
  const user = await prisma.user.create({
    data: { Username: parsed.data.Username, PasswordHash: hash, Role: "USER" },
  });
  await prisma.application.create({
    data: { UserId: user.Id, Status: ApplicationStatus.NEW },
  });
  return NextResponse.json(
    { success: true, data: { id: user.Id } },
    { status: 201 }
  );
}
