import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";

export async function GET(req: NextRequest) {
  const users = db.getUsers();
  const requests = db.getRequests();

  const totalUsers = users.length;
  const totalMentors = db.getMentors().length;
  const totalMentees = db.getMentees().length;
  
  const pendingRequests = requests.filter(r => r.status === "pending").length;
  const acceptedRequests = requests.filter(r => r.status === "accepted").length;
  const rejectedRequests = requests.filter(r => r.status === "rejected").length;

  return NextResponse.json({
    totalUsers,
    totalMentors,
    totalMentees,
    stats: {
      pending: pendingRequests,
      accepted: acceptedRequests,
      rejected: rejectedRequests
    }
  });
}
