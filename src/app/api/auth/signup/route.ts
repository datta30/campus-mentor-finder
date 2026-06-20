import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { setSessionUserCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, role } = await req.json();

    const users = db.getUsers();
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const newUser = db.addUser({
      id: `${role}-${Date.now()}`,
      email,
      name,
      role,
      isOnboarded: false,
      createdAt: new Date().toISOString()
    });

    const res = NextResponse.json({ user: newUser });
    setSessionUserCookie(res, newUser.id);
    return res;
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
