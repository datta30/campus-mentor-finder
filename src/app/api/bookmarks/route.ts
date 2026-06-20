import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { getSessionUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user || user.role !== "mentee") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookmarks = db.getBookmarks().filter(b => b.menteeId === user.id);
  const mentors = db.getMentors();
  const bookmarkedMentors = mentors.filter(m => 
    bookmarks.some(b => b.mentorId === m.userId)
  );

  return NextResponse.json({ mentors: bookmarkedMentors });
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user || user.role !== "mentee") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { mentorId } = await req.json();
    const existing = db.getBookmarks().find(b => b.menteeId === user.id && b.mentorId === mentorId);

    if (existing) {
      db.removeBookmark(user.id, mentorId);
      return NextResponse.json({ bookmarked: false });
    } else {
      db.addBookmark(user.id, mentorId);
      return NextResponse.json({ bookmarked: true });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
