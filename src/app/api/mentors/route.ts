import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";

export async function GET(req: NextRequest) {
  const mentors = db.getMentors();
  return NextResponse.json({ mentors });
}
