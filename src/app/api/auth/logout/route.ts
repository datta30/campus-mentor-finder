import { NextRequest, NextResponse } from "next/server";
import { clearSessionUserCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ success: true });
  clearSessionUserCookie(res);
  return res;
}
