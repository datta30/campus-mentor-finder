"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { Lock, Mail, Loader2, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const success = await login(email);
      if (success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError("Invalid credentials or user does not exist. (Tip: Use a seed email like sarahjenkins@campusmentor.com)");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-slate-950 px-4 py-16 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight flex items-center justify-center gap-2">
            <LogIn className="w-5 h-5 text-indigo-500" />
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm">
            Sign in to Campus Mentor Finder
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
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. sarahjenkins@campusmentor.com"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            />
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
              Mock environment: Password checks are bypassed for evaluation.
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
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="border-t border-slate-800/80 pt-4 text-center">
          <p className="text-xs text-slate-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-indigo-400 hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        <div className="bg-slate-950/55 p-3 rounded-lg border border-slate-800/50">
          <p className="text-[11px] font-semibold text-slate-400 mb-1">💡 Demo Accounts</p>
          <ul className="text-[10px] text-slate-500 list-disc list-inside space-y-0.5">
            <li><strong>Sarah (Mentor):</strong> sarahjenkins@campusmentor.com</li>
            <li><strong>Turing (Mentor):</strong> dralanturing@campusmentor.com</li>
            <li><strong>Jane (Mentee):</strong> janedoe@campusmentor.com</li>
            <li><strong>Admin:</strong> admin@campusmentor.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
