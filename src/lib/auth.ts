import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types";
import { db } from "@/db/db";

// Simulating cookie-based state since external libraries might require accounts/credentials to deploy cleanly.
// We set a lightweight HTTP-Only or regular cookie with the User ID, which works cleanly on Vercel immediately.
export async function getSessionUser(req: NextRequest): Promise<User | null> {
  const userIdCookie = req.cookies.get("userId")?.value;
  if (!userIdCookie) return null;

  const users = db.getUsers();
  return users.find(u => u.id === userIdCookie) || null;
}

export function setSessionUserCookie(response: NextResponse, userId: string) {
  response.cookies.set("userId", userId, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: "lax",
  });
}

export function clearSessionUserCookie(response: NextResponse) {
  response.cookies.delete("userId");
}
