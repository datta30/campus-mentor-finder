"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { MentorProfile, MentorshipRequest } from "@/types";
import { 
  Sparkles, 
  Bookmark, 
  MessageSquare, 
  Compass, 
  CheckCircle, 
  Clock, 
  Users, 
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [recommendations, setRecommendations] = useState<{ mentor: MentorProfile; matchDetails: any }[]>([]);
  const [bookmarks, setBookmarks] = useState<MentorProfile[]>([]);
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!user.isOnboarded) {
      router.push("/onboarding");
      return;
    }

    async function fetchDashboardData() {
      try {
        // Fetch recommendations if role is mentee
        if (user && user.role === "mentee") {
          const matchRes = await fetch("/api/match", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ menteeId: user.id })
          });
          if (matchRes.ok) {
            const matchData = await matchRes.json();
            setRecommendations((matchData.matches || []).slice(0, 3));
          }

          const bookmarkRes = await fetch("/api/bookmarks");
          if (bookmarkRes.ok) {
            const bookmarkData = await bookmarkRes.json();
            setBookmarks((bookmarkData.mentors || []).slice(0, 3));
          }
        }

        // Fetch requests
        const requestRes = await fetch("/api/requests");
        if (requestRes.ok) {
          const reqData = await requestRes.json();
          setRequests(reqData.requests || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [user, router]);

  if (!user || !user.isOnboarded) return null;

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-slate-950 text-slate-100">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Welcome back, {user.name}! Track connections, reviews, and matching mentors below.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
        </div>
      ) : user.role === "mentee" ? (
        /* MENTEE DASHBOARD */
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Recommendations */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  Recommended Mentors
                </h2>
                <Link href="/mentors" className="text-indigo-400 text-xs font-semibold hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {recommendations.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendations.map(({ mentor, matchDetails }) => (
                    <div key={mentor.userId} className="bg-slate-950 border border-slate-850 p-5 rounded-xl space-y-3 flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-start">
                          <img
                            src={mentor.avatarUrl}
                            alt={mentor.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="text-[10px] font-bold bg-indigo-950/40 border border-indigo-900 text-indigo-400 px-2 py-0.5 rounded">
                            {matchDetails.score}% Match
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-200">{mentor.name}</h4>
                          <p className="text-[10px] text-slate-500 font-semibold">{mentor.college}</p>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{mentor.background}</p>
                        </div>
                        <p className="text-[11px] text-slate-400 italic line-clamp-2">"{matchDetails.explanation}"</p>
                      </div>
                      <Link
                        href={`/mentors/${mentor.userId}`}
                        className="mt-3 w-full bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 font-bold py-1.5 rounded-lg text-[10px] transition-colors text-center block"
                      >
                        Profile & Request
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-slate-950 border border-slate-850 rounded-xl text-slate-500 text-xs">
                  Onboard to see matching compatibility.
                </div>
              )}
            </div>

            {/* Request Status log */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-1.5">
                  <MessageSquare className="w-5 h-5 text-indigo-400" />
                  Your Requests
                </h2>
                <Link href="/requests" className="text-indigo-400 text-xs font-semibold hover:underline">
                  All requests
                </Link>
              </div>

              {requests.length > 0 ? (
                <div className="space-y-3">
                  {requests.slice(0, 4).map((req) => (
                    <div key={req.id} className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">{req.mentorName}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5 font-semibold">Sent on {new Date(req.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase flex items-center gap-1 ${
                        req.status === "accepted"
                          ? "bg-emerald-950/40 border-emerald-900 text-emerald-450"
                          : req.status === "rejected"
                          ? "bg-red-950/40 border-red-900/50 text-red-400"
                          : "bg-amber-950/40 border-amber-900/50 text-amber-400"
                      }`}>
                        {req.status === "pending" && <Clock className="w-3 h-3" />}
                        {req.status === "accepted" && <CheckCircle className="w-3 h-3" />}
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-slate-950 border border-slate-850 rounded-xl text-slate-500 text-xs">
                  No active requests sent. Browse the directory to send one.
                </div>
              )}
            </div>
          </div>

          {/* Bookmarks bar */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-1.5">
                  <Bookmark className="w-5 h-5 text-indigo-400" />
                  Saved Mentors
                </h2>
                <Link href="/bookmarks" className="text-indigo-400 text-xs font-semibold hover:underline">
                  All
                </Link>
              </div>

              {bookmarks.length > 0 ? (
                <div className="space-y-3">
                  {bookmarks.map((mentor) => (
                    <Link
                      key={mentor.userId}
                      href={`/mentors/${mentor.userId}`}
                      className="flex items-center gap-3 bg-slate-950 border border-slate-850 p-3 rounded-xl hover:border-slate-700 transition-colors block"
                    >
                      <img
                        src={mentor.avatarUrl}
                        alt={mentor.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">{mentor.name}</h4>
                        <p className="text-[10px] text-slate-500 font-semibold">{mentor.college}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-slate-950 border border-slate-850 rounded-xl text-slate-500 text-xs">
                  No saved mentors.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* MENTOR DASHBOARD */
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-1.5">
                <Users className="w-5 h-5 text-indigo-400" />
                Incoming Mentorship Applications
              </h2>
              <Link href="/requests" className="text-indigo-400 text-xs font-semibold hover:underline">
                View All
              </Link>
            </div>

            {requests.length > 0 ? (
              <div className="space-y-4">
                {requests.map((req) => (
                  <div key={req.id} className="bg-slate-950 border border-slate-850 p-5 rounded-xl space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">{req.menteeName}</h4>
                        <p className="text-[10px] text-slate-500">Sent on {new Date(req.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                        req.status === "accepted" ? "bg-emerald-950/40 border-emerald-900 text-emerald-450" : "bg-amber-950/40 border-amber-900/50 text-amber-400"
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 italic">"{req.message}"</p>
                    {req.status === "pending" && (
                      <div className="flex gap-2 justify-end pt-2">
                        <Link
                          href="/requests"
                          className="bg-indigo-650 hover:bg-indigo-500 text-white font-bold py-1 px-3 rounded-lg text-[10px] transition-colors"
                        >
                          Process Application
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-slate-950 border border-slate-850 rounded-xl text-slate-500 text-xs">
                No incoming connection request invitations yet.
              </div>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md space-y-4">
            <h3 className="text-md font-bold text-slate-200 flex items-center gap-1.5">
              <Award className="w-5 h-5 text-indigo-400" />
              Overview Stats
            </h3>
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex justify-between items-center">
                <span className="text-xs text-slate-400">Total Applications</span>
                <span className="text-sm font-bold text-slate-100">{requests.length}</span>
              </div>
              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex justify-between items-center">
                <span className="text-xs text-slate-400">Accepted Mentees</span>
                <span className="text-sm font-bold text-emerald-400">
                  {requests.filter(r => r.status === "accepted").length}
                </span>
              </div>
              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex justify-between items-center">
                <span className="text-xs text-slate-400">Pending Requests</span>
                <span className="text-sm font-bold text-amber-400">
                  {requests.filter(r => r.status === "pending").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
