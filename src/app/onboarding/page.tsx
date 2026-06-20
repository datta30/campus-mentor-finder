"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { CheckSquare, Loader2, Sparkles, User, Award, MapPin, Globe, BookOpen } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Common availability slots
  const availabilities = ["Weekday mornings", "Weekday evenings", "Weekends"];

  // Form states
  const [college, setCollege] = useState("");
  const [year, setYear] = useState("Freshman");
  const [major, setMajor] = useState("");
  const [goals, setGoals] = useState("");
  const [interests, setInterests] = useState("");
  const [preferredMentorType, setPreferredMentorType] = useState("Alumni");
  const [languages, setLanguages] = useState("");
  const [availability, setAvailability] = useState<string[]>([]);

  // Mentor specific
  const [background, setBackground] = useState("");
  const [expertise, setExpertise] = useState("Software Engineering");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState(1);
  const [mentoringTopics, setMentoringTopics] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.isOnboarded) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const toggleAvailability = (slot: string) => {
    if (availability.includes(slot)) {
      setAvailability(availability.filter((a) => a !== slot));
    } else {
      setAvailability([...availability, slot]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError("");

    const payload = user.role === "mentee" 
      ? { college, year, major, goals, interests, preferredMentorType, languages, availability }
      : { college, background, expertise, skills, experience, mentoringTopics, languages, availability, bio };

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await refreshUser(user.id);
        router.push("/dashboard");
        router.refresh();
      } else {
        const d = await res.json();
        setError(d.error || "Failed to submit onboarding form. Please complete all fields.");
      }
    } catch {
      setError("Something went wrong. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex-grow flex items-center justify-center bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-xl bg-indigo-500/10 text-indigo-400 mb-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">
            Complete Onboarding
          </h1>
          <p className="text-slate-400 text-sm">
            Let's setup your {user.role === "mentee" ? "mentee" : "mentor"} profile to start connecting
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                University / College
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. Stanford University"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                Languages (comma separated)
              </label>
              <input
                type="text"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                placeholder="e.g. English, Spanish"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {user.role === "mentee" ? (
            /* MENTEE FIELDS */
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Academic Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option>Freshman</option>
                    <option>Sophomore</option>
                    <option>Junior</option>
                    <option>Senior</option>
                    <option>Graduate Student</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Major / Branch</label>
                  <input
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    placeholder="e.g. Computer Science"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">What are your primary goals? (comma separated)</label>
                <input
                  type="text"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="e.g. Get a SWE internship, Learn System Design"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">What skills/interests do you want to learn? (comma separated)</label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="e.g. React, Python, Algorithms"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Preferred Mentor Type</label>
                <select
                  value={preferredMentorType}
                  onChange={(e) => setPreferredMentorType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option>Alumni</option>
                  <option>Senior</option>
                  <option>Peer Mentor</option>
                </select>
              </div>
            </div>
          ) : (
            /* MENTOR FIELDS */
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Current Headline/Background</label>
                  <input
                    type="text"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    placeholder="e.g. Senior Software Engineer @ Google"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Years of Experience</label>
                  <input
                    type="number"
                    value={experience}
                    onChange={(e) => setExperience(Number(e.target.value))}
                    min={0}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Primary Domain Expertise</label>
                  <select
                    value={expertise}
                    onChange={(e) => setExpertise(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option>Software Engineering</option>
                    <option>AI & Machine Learning</option>
                    <option>Product Management</option>
                    <option>Product Design</option>
                    <option>Data Science</option>
                    <option>Cloud & Devops</option>
                    <option>Cybersecurity</option>
                    <option>Quantitative Finance</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Core Skills (comma separated)</label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="e.g. React, Docker, System Design"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Mentoring Topics you target (comma separated)</label>
                <input
                  type="text"
                  value={mentoringTopics}
                  onChange={(e) => setMentoringTopics(e.target.value)}
                  placeholder="e.g. Resume Prep, Career growth, Hackathons"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Short Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell students about yourself and what guidance you can provide..."
                  required
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              Select Availability Preferences
            </label>
            <div className="flex flex-wrap gap-2.5">
              {availabilities.map((slot) => {
                const active = availability.includes(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => toggleAvailability(slot)}
                    className={`flex items-center gap-1.5 py-2 px-3.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      active
                        ? "bg-indigo-600/15 border-indigo-500 text-indigo-400"
                        : "bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-900"
                    }`}
                  >
                    {active && <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />}
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-700 text-white py-3 rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-900/40 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting Profile...
              </>
            ) : (
              "Complete Onboarding"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
