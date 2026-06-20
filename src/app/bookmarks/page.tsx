"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { MentorProfile } from "@/types";
import { Bookmark, Compass, HelpCircle, ArrowRight } from "lucide-react";

export default function BookmarksPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    async function fetchBookmarks() {
      try {
        const res = await fetch("/api/bookmarks");
        if (res.ok) {
          const data = await res.json();
          setMentors(data.mentors || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBookmarks();
  }, [user, router]);

  const handleRemoveBookmark = async (mentorId: string) => {
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mentorId })
      });
      if (res.ok) {
        setMentors(prev => prev.filter(m => m.userId !== mentorId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-slate-950 text-slate-100">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Your Bookmarks</h1>
        <p className="text-slate-400 text-sm mt-1">Keep track of mentors you are interested in connecting with.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
        </div>
      ) : mentors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.userId} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <img
                    src={mentor.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <button
                    onClick={() => handleRemoveBookmark(mentor.userId)}
                    className="p-1.5 rounded-lg border bg-indigo-600/10 border-indigo-500 text-indigo-400 cursor-pointer"
                    title="Remove Bookmark"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-100">{mentor.name}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{mentor.background}</p>
                  <p className="text-[11px] text-indigo-400 font-semibold mt-1">{mentor.college}</p>
                </div>
              </div>

              <div className="border-t border-slate-850 my-4" />

              <div className="flex justify-end">
                <Link
                  href={`/mentors/${mentor.userId}`}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-1.5 px-3 rounded-lg text-[11px] transition-colors flex items-center gap-1"
                >
                  View Profile
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-850 p-12 text-center rounded-2xl">
          <HelpCircle className="w-12 h-12 text-slate-650 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-200">No Bookmarks Saved</h3>
          <p className="text-slate-500 text-sm mt-1">Start browsing the directory to save interesting mentor profiles.</p>
          <Link
            href="/mentors"
            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs mt-6 transition-all"
          >
            <Compass className="w-4 h-4" /> Discover Mentors
          </Link>
        </div>
      )}
    </div>
  );
}
