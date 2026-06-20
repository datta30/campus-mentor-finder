"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { MentorProfile } from "@/types";
import { 
  Search, 
  Filter, 
  Bookmark, 
  Sparkles, 
  Award, 
  GraduationCap, 
  MessageSquare,
  Clock,
  CheckCircle,
  HelpCircle
} from "lucide-react";

export default function MentorDirectory() {
  const { user } = useAuth();
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [matchedMentors, setMatchedMentors] = useState<{ mentor: MentorProfile; matchDetails: any }[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [sortBy, setSortBy] = useState("score"); // default is score matching

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch mentors
        const res = await fetch("/api/mentors");
        const data = await res.json();
        const rawMentors = data.mentors || [];
        setMentors(rawMentors);

        // Fetch bookmarks if logged in
        if (user && user.role === "mentee") {
          const bookmarkRes = await fetch("/api/bookmarks");
          const bookmarkData = await bookmarkRes.json();
          const savedIds = (bookmarkData.mentors || []).map((m: MentorProfile) => m.userId);
          setBookmarkedIds(savedIds);

          // Get match details
          const matchRes = await fetch("/api/match", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ menteeId: user.id })
          });
          if (matchRes.ok) {
            const matchData = await matchRes.json();
            setMatchedMentors(matchData.matches || []);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  // Combine scored list with regular fallback list
  const combinedList = useMemo(() => {
    if (user && user.role === "mentee" && matchedMentors.length > 0) {
      return matchedMentors;
    }
    return mentors.map(m => ({
      mentor: m,
      matchDetails: { score: 50, explanation: "Register or log in as a Mentee to view direct compatibility scores." }
    }));
  }, [user, mentors, matchedMentors]);

  // Apply filters
  const filteredList = useMemo(() => {
    return combinedList.filter(({ mentor, matchDetails }) => {
      const matchesSearch = 
        mentor.name.toLowerCase().includes(search.toLowerCase()) ||
        mentor.skills.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
        mentor.expertise.toLowerCase().includes(search.toLowerCase());

      const matchesDomain = !domainFilter || mentor.expertise === domainFilter;
      const matchesCollege = !collegeFilter || mentor.college.toLowerCase().includes(collegeFilter.toLowerCase());
      const matchesAvail = !availabilityFilter || mentor.availability.includes(availabilityFilter);

      return matchesSearch && matchesDomain && matchesCollege && matchesAvail;
    }).sort((a, b) => {
      if (sortBy === "score") {
        return b.matchDetails.score - a.matchDetails.score;
      }
      if (sortBy === "experience") {
        return b.mentor.experience - a.mentor.experience;
      }
      return a.mentor.name.localeCompare(b.mentor.name);
    });
  }, [combinedList, search, domainFilter, collegeFilter, availabilityFilter, sortBy]);

  const handleBookmarkToggle = async (mentorId: string) => {
    if (!user || user.role !== "mentee") return;
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mentorId })
      });
      if (res.ok) {
        setBookmarkedIds(prev => 
          prev.includes(mentorId) ? prev.filter(id => id !== mentorId) : [...prev, mentorId]
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Discover Mentors</h1>
        <p className="text-slate-400 text-sm mt-1">Explore, search, and view detailed compatibility scores for peer mentors and alumni.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, skills, or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
            >
              <option value="">All Domains</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="AI & Machine Learning">AI & Machine Learning</option>
              <option value="Product Management">Product Management</option>
              <option value="Product Design">Product Design</option>
              <option value="Data Science">Data Science</option>
              <option value="Cloud & Devops">Cloud & Devops</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Quantitative Finance">Quantitative Finance</option>
            </select>

            <input
              type="text"
              placeholder="College/University"
              value={collegeFilter}
              onChange={(e) => setCollegeFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-350 focus:outline-none focus:border-indigo-500"
            />

            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
            >
              <option value="">Availability</option>
              <option value="Weekday mornings">Weekday mornings</option>
              <option value="Weekday evenings">Weekday evenings</option>
              <option value="Weekends">Weekends</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-indigo-900/50 rounded-xl px-3 py-2 text-xs text-indigo-400 focus:outline-none"
            >
              <option value="score">Sort: Match Compatibility</option>
              <option value="experience">Sort: Experience</option>
              <option value="name">Sort: Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
        </div>
      ) : filteredList.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map(({ mentor, matchDetails }) => {
            const isBookmarked = bookmarkedIds.includes(mentor.userId);
            return (
              <div key={mentor.userId} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  {/* Top line: avatar and compatibility score badge */}
                  <div className="flex justify-between items-start">
                    <img
                      src={mentor.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                      alt={mentor.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-750"
                    />

                    <div className="flex items-center gap-1.5">
                      <div className="flex flex-col items-end">
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md border ${
                          matchDetails.score >= 70
                            ? "bg-emerald-950/40 border-emerald-900 text-emerald-400"
                            : matchDetails.score >= 40
                            ? "bg-indigo-950/40 border-indigo-900 text-indigo-400"
                            : "bg-slate-950 border-slate-850 text-slate-500"
                        }`}>
                          Score: {matchDetails.score}%
                        </span>
                      </div>
                      
                      {user && user.role === "mentee" && (
                        <button
                          onClick={() => handleBookmarkToggle(mentor.userId)}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            isBookmarked
                              ? "bg-indigo-600/10 border-indigo-500 text-indigo-400"
                              : "bg-slate-950 border-slate-850 text-slate-500 hover:text-slate-350"
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Identity */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                      {mentor.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-400">{mentor.background}</p>
                    <p className="text-[11px] text-indigo-500 font-semibold mt-1">{mentor.college}</p>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {mentor.bio}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1">
                    {mentor.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded-md bg-slate-950 text-[10px] text-slate-450 border border-slate-850">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Match Reason explanation */}
                  <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl text-[10px] text-slate-400 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{matchDetails.explanation}</span>
                  </div>
                </div>

                <div className="border-t border-slate-850 my-4" />

                {/* Footer action */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Award className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{mentor.experience} yrs exp</span>
                  </div>

                  <Link
                    href={`/mentors/${mentor.userId}`}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-1.5 px-3 rounded-lg text-[11px] transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-850 p-12 text-center rounded-2xl">
          <HelpCircle className="w-12 h-12 text-slate-650 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-200">No Mentors Found</h3>
          <p className="text-slate-500 text-sm mt-1">Try expanding your search query or selecting a different domain filter.</p>
        </div>
      )}
    </div>
  );
}
