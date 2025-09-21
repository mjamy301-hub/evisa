import { NextResponse } from "next/server";
import { login } from "@/lib/auth";
import { formatErrors } from "@/utils/formatError";
import { loginSchema } from "@/lib/validation/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    const formatted = formatErrors(parsed.error);
    return NextResponse.json({ success: false, error: { code: "BAD_REQUEST", ...formatted } }, { status: 400 });
  }
  const session = await login(parsed.data.Email, parsed.data.Password);
  if ("error" in session)
    return NextResponse.json(
      { success: false, error: { code: "INVALID_CREDENTIALS", ...session.error } },
      { status: 401 }
    );
  return NextResponse.json({ success: true, data: session });
}
