import { NextResponse } from "next/server";
import { login } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
import { formatErrors } from "@/utils/formatError";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    const formatted = formatErrors(parsed.error);
    return NextResponse.json({ success: false, error: { code: "BAD_REQUEST", ...formatted } }, { status: 400 });
  }
  const session = await login(parsed.data.username, parsed.data.password);
  if ("error" in session)
    return NextResponse.json(
      { success: false, error: { code: "INVALID_CREDENTIALS", ...session.error } },
      { status: 401 }
    );
  return NextResponse.json({ success: true, data: session });
}
