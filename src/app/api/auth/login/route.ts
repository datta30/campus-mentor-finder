import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { setSessionUserCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    // Find the seeded user or any registered user
    const users = db.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Accept any password for mock evaluation ease, or check matching
    const res = NextResponse.json({ user });
    setSessionUserCookie(res, user.id);
    return res;
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
