import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { getSessionUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (user.role === "mentee") {
      db.addMentee({
        userId: user.id,
        name: user.name,
        college: body.college,
        year: body.year,
        major: body.major,
        goals: body.goals.split(",").map((g: string) => g.trim()),
        interests: body.interests.split(",").map((i: string) => i.trim()),
        preferredMentorType: body.preferredMentorType,
        languages: body.languages.split(",").map((l: string) => l.trim()),
        availability: body.availability
      });
    } else if (user.role === "mentor") {
      db.addMentor({
        userId: user.id,
        name: user.name,
        college: body.college,
        background: body.background,
        expertise: body.expertise,
        skills: body.skills.split(",").map((s: string) => s.trim()),
        experience: Number(body.experience),
        mentoringTopics: body.mentoringTopics.split(",").map((t: string) => t.trim()),
        languages: body.languages.split(",").map((l: string) => l.trim()),
        availability: body.availability,
        bio: body.bio,
        avatarUrl: `https://images.unsplash.com/photo-${user.role === "mentor" ? "1534528741775-53994a69daeb" : "1539571696357-5a69c17a67c6"}?w=150`
      });
    }

    db.updateUser(user.id, { isOnboarded: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
