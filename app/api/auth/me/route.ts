import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/currentUser";

export async function GET() {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ success: false }, { status: 401 });
  return NextResponse.json({ success: true, data: me });
}
