import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const mentors = db.getMentors();
  const mentor = mentors.find(m => m.userId === id);
  if (!mentor) {
    return NextResponse.json({ error: "Mentor not found" }, { status: 404 });
  }
  return NextResponse.json({ mentor });
}
