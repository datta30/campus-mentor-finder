"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { MentorshipRequest } from "@/types";
import { 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  User as UserIcon,
  HelpCircle
} from "lucide-react";

export default function RequestsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    async function fetchRequests() {
      try {
        const res = await fetch("/api/requests");
        if (res.ok) {
          const data = await res.json();
          setRequests(data.requests || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, [user, router]);

  const handleAction = async (requestId: string, status: "accepted" | "rejected") => {
    try {
      const res = await fetch("/api/requests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, status })
      });
      if (res.ok) {
        setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status } : r));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-slate-950 text-slate-100">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Mentorship Requests</h1>
        <p className="text-slate-400 text-sm mt-1">
          {user.role === "mentee" 
            ? "Track the status of mentorship invitations you've sent." 
            : "Review and respond to incoming mentorship requests from students."}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
        </div>
      ) : requests.length > 0 ? (
        <div className="space-y-4 max-w-4xl">
          {requests.map((request) => (
            <div key={request.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200">
                      {user.role === "mentee" ? `Mentor: ${request.mentorName}` : `Student: ${request.menteeName}`}
                    </h3>
                    <p className="text-[10px] text-slate-500">Sent on {new Date(request.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase flex items-center gap-1 ${
                  request.status === "accepted"
                    ? "bg-emerald-950/40 border-emerald-900 text-emerald-450"
                    : request.status === "rejected"
                    ? "bg-red-950/40 border-red-900/50 text-red-400"
                    : "bg-amber-950/40 border-amber-900/50 text-amber-400"
                }`}>
                  {request.status === "pending" && <Clock className="w-3 h-3" />}
                  {request.status === "accepted" && <CheckCircle2 className="w-3 h-3" />}
                  {request.status === "rejected" && <XCircle className="w-3 h-3" />}
                  {request.status}
                </span>
              </div>

              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl text-xs text-slate-400 leading-relaxed italic">
                "{request.message}"
              </div>

              {user.role === "mentor" && request.status === "pending" && (
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleAction(request.id, "rejected")}
                    className="px-3.5 py-1.5 rounded-lg border border-red-900/30 text-red-400 bg-red-950/15 text-xs font-bold hover:bg-red-900/10 cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(request.id, "accepted")}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Accept Request
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-850 p-12 text-center rounded-2xl max-w-4xl">
          <HelpCircle className="w-12 h-12 text-slate-650 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-200">No Requests Found</h3>
          <p className="text-slate-550 text-sm mt-1">There are no matching pending or processed requests listed.</p>
        </div>
      )}
    </div>
  );
}
