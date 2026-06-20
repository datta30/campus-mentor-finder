import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (userId) {
    const user = db.getUsers().find(u => u.id === userId);
    if (user) {
      return NextResponse.json({ user });
    }
  }

  // Fallback check cookies
  const userIdCookie = req.cookies.get("userId")?.value;
  if (userIdCookie) {
    const user = db.getUsers().find(u => u.id === userIdCookie);
    if (user) {
      return NextResponse.json({ user });
    }
  }

  return NextResponse.json({ user: null });
}
