import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { calculateMatchScore } from "@/lib/matching";

export async function POST(req: NextRequest) {
  try {
    const { menteeId } = await req.json();
    const mentee = db.getMentees().find(m => m.userId === menteeId);
    if (!mentee) {
      return NextResponse.json({ error: "Mentee profile not found" }, { status: 404 });
    }

    const mentors = db.getMentors();
    const scored = mentors.map(mentor => {
      const matchDetails = calculateMatchScore(mentee, mentor);
      return {
        mentor,
        matchDetails
      };
    }).sort((a, b) => b.matchDetails.score - a.matchDetails.score);

    return NextResponse.json({ matches: scored });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
