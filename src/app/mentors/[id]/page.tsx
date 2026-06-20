"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { MentorProfile } from "@/types";
import { 
  ArrowLeft, 
  MapPin, 
  Award, 
  Clock, 
  Check, 
  Bookmark, 
  MessageSquare,
  Sparkles,
  HelpCircle
} from "lucide-react";

export default function MentorProfilePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter();
  const { id } = use(params);
  const { user } = useAuth();
  
  const [mentor, setMentor] = useState<MentorProfile | null>(null);
  const [similarMentors, setSimilarMentors] = useState<MentorProfile[]>([]);
  const [matchDetails, setMatchDetails] = useState<any | null>(null);
  
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Request system states
  const [message, setMessage] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/mentors/${id}`);
        if (!res.ok) {
          setError("Mentor profile not found");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setMentor(data.mentor);

        // Fetch bookmarks
        if (user && user.role === "mentee") {
          const bookmarkRes = await fetch("/api/bookmarks");
          if (bookmarkRes.ok) {
            const bookmarkData = await bookmarkRes.json();
            const saved = (bookmarkData.mentors || []).some((m: MentorProfile) => m.userId === id);
            setBookmarked(saved);
          }

          // Fetch match details
          const matchRes = await fetch("/api/match", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ menteeId: user.id })
          });
          if (matchRes.ok) {
            const matchData = await matchRes.json();
            const currentMatch = (matchData.matches || []).find((m: any) => m.mentor.userId === id);
            if (currentMatch) {
              setMatchDetails(currentMatch.matchDetails);
            }
          }
        }

        // Fetch similar mentors
        const allRes = await fetch("/api/mentors");
        if (allRes.ok) {
          const allData = await allRes.json();
          const list = (allData.mentors || []).filter((m: MentorProfile) => 
            m.userId !== id && m.expertise === data.mentor.expertise
          ).slice(0, 3);
          setSimilarMentors(list);
        }
      } catch (err) {
        setError("Failed to fetch mentor information");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, user]);

  const handleBookmarkToggle = async () => {
    if (!user || user.role !== "mentee") return;
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mentorId: id })
      });
      if (res.ok) {
        setBookmarked(prev => !prev);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== "mentee" || !message.trim()) return;

    setSendingRequest(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mentorId: id, message })
      });
      if (res.ok) {
        setRequestSent(true);
        setMessage("");
      } else {
        setError("Failed to send request. Make sure you are registered.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setSendingRequest(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error || !mentor) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center bg-slate-950 text-slate-350 p-6 text-center">
        <HelpCircle className="w-12 h-12 text-slate-650 mb-3" />
        <h3 className="text-xl font-bold">Failed to Load Profile</h3>
        <p className="text-slate-500 text-sm mt-1">{error || "Mentor profile details could not be retrieved."}</p>
        <Link href="/mentors" className="mt-4 text-indigo-400 font-bold hover:underline flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to directory
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-slate-950 text-slate-100">
      <div>
        <Link href="/mentors" className="text-indigo-400 font-semibold hover:underline flex items-center gap-1 text-sm mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Mentor Directory
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card & Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              {user && user.role === "mentee" && (
                <button
                  onClick={handleBookmarkToggle}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    bookmarked
                      ? "bg-indigo-600/10 border-indigo-500 text-indigo-400"
                      : "bg-slate-950 border-slate-850 text-slate-500 hover:text-slate-350"
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <img
                src={mentor.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                alt={mentor.name}
                className="w-20 h-20 rounded-2xl object-cover border border-slate-750"
              />

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-slate-100">{mentor.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-900/40 border border-indigo-800/30 text-[10px] text-indigo-400 font-extrabold uppercase">
                    {mentor.expertise}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-400">{mentor.background}</p>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1 text-indigo-500 font-semibold">{mentor.college}</span>
                  <span>•</span>
                  <span>{mentor.experience} Years Experience</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-850 my-6" />

            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">About Mentor</h2>
              <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">{mentor.bio}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-850">
              <div className="space-y-1">
                <h3 className="text-[10px] font-bold text-slate-550 uppercase">Languages</h3>
                <p className="text-xs text-slate-350 font-semibold">{mentor.languages.join(", ")}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-[10px] font-bold text-slate-550 uppercase">Availability Preference</h3>
                <p className="text-xs text-slate-350 font-semibold">{mentor.availability.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Skills & topics details */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-lg space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">Expertise Stack</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-xl bg-slate-950 text-xs text-slate-350 border border-slate-850">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-850">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">Mentoring Topics</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.mentoringTopics.map((topic) => (
                  <span key={topic} className="px-3 py-1 rounded-xl bg-slate-950 text-xs text-indigo-400 border border-indigo-900/30">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel / Match AI Breakdown */}
        <div className="space-y-6">
          {/* Match Score explanation */}
          {matchDetails && (
            <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-800/20 p-6 rounded-2xl shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-indigo-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Match Insight</span>
                </div>
                <span className="text-xs font-extrabold bg-emerald-950/50 border border-emerald-900 text-emerald-400 px-2 py-0.5 rounded">
                  Score: {matchDetails.score}%
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                {matchDetails.explanation}
              </p>
            </div>
          )}

          {/* Mentorship request submit box */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg space-y-4">
            <h3 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-indigo-500" />
              Request Mentorship
            </h3>

            {requestSent ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 p-4 rounded-xl text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-450 mx-auto" />
                <h4 className="font-bold text-xs">Request Submitted Successfully</h4>
                <p className="text-[10px] text-slate-400">The mentor has been notified. You can track this request on your dashboard.</p>
              </div>
            ) : user && user.role === "mentee" ? (
              <form onSubmit={handleSendRequest} className="space-y-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Introduce yourself and specify what goals you'd like to work on with this mentor..."
                  required
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  disabled={sendingRequest || !message.trim()}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {sendingRequest ? "Sending..." : "Submit Mentorship Request"}
                </button>
              </form>
            ) : (
              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl text-center space-y-3">
                <p className="text-[11px] text-slate-400">
                  Register or login as a **Mentee** to send a direct request.
                </p>
                <Link
                  href="/login"
                  className="inline-block bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 font-bold px-3 py-1.5 rounded-lg text-[10px] transition-colors"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>

          {/* Similar Mentors Section */}
          {similarMentors.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Similar Mentors</h3>
              <div className="space-y-3">
                {similarMentors.map((sm) => (
                  <Link
                    key={sm.userId}
                    href={`/mentors/${sm.userId}`}
                    className="block bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={sm.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                        alt={sm.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">{sm.name}</h4>
                        <p className="text-[10px] text-slate-500">{sm.college}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
