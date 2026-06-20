"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { UserPlus, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = (searchParams.get("role") as "mentor" | "mentee" | "admin") || "mentee";

  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"mentor" | "mentee" | "admin">(defaultRole);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);
    setError("");

    try {
      const success = await signup(name, email, role);
      if (success) {
        router.push("/onboarding");
        router.refresh();
      } else {
        setError("Email is already registered. Choose another one.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6 relative z-10">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight flex items-center justify-center gap-2">
          <UserPlus className="w-5 h-5 text-indigo-500" />
          Create Account
        </h1>
        <p className="text-slate-400 text-sm">
          Get started with Campus Mentor Finder
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs leading-relaxed">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <UserIcon className="w-3.5 h-3.5 text-indigo-400" />
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.edu"
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Choose Role</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("mentee")}
              className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                role === "mentee"
                  ? "bg-indigo-600/15 border-indigo-500 text-indigo-400"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900"
              }`}
            >
              I am a Mentee
            </button>
            <button
              type="button"
              onClick={() => setRole("mentor")}
              className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                role === "mentor"
                  ? "bg-indigo-600/15 border-indigo-500 text-indigo-400"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900"
              }`}
            >
              I am a Mentor
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-indigo-400" />
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            disabled
            className="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed select-none"
          />
          <span className="text-[10px] text-slate-500">
            Mock environment: password is auto-validated.
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-900/40 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="border-t border-slate-800/80 pt-4 text-center">
        <p className="text-xs text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="flex-grow flex items-center justify-center bg-slate-950 px-4 py-16 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
      <Suspense fallback={<div className="text-slate-400 text-sm">Loading signup settings...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
