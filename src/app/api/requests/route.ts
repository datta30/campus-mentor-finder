import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { getSessionUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requests = db.getRequests();
  
  if (user.role === "admin") {
    return NextResponse.json({ requests });
  }

  // Filter based on role
  const userRequests = requests.filter(r => 
    user.role === "mentee" ? r.menteeId === user.id : r.mentorId === user.id
  );
  
  return NextResponse.json({ requests: userRequests });
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user || user.role !== "mentee") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { mentorId, message } = await req.json();
    const mentors = db.getMentors();
    const mentor = mentors.find(m => m.userId === mentorId);

    if (!mentor) {
      return NextResponse.json({ error: "Mentor not found" }, { status: 404 });
    }

    const newRequest = db.addRequest({
      id: `req-${Date.now()}`,
      menteeId: user.id,
      menteeName: user.name,
      mentorId: mentor.userId,
      mentorName: mentor.name,
      message,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ request: newRequest });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user || (user.role !== "mentor" && user.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { requestId, status } = await req.json();
    if (!["accepted", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = db.updateRequestStatus(requestId, status);
    if (!updated) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    return NextResponse.json({ request: updated });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
