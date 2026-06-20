"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { User as UserIcon, Shield, Mail, Edit3, Settings } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [successMsg, setSuccessMsg] = useState("");

  if (!user) return null;

  return (
    <div className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-slate-950 text-slate-100">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">User Profile</h1>
        <p className="text-slate-400 text-sm mt-1">Review your core profile details and credential settings.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-lg space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
            <UserIcon className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-200">{user.name}</h2>
            <span className="px-2 py-0.5 rounded-md bg-indigo-950/40 border border-indigo-900/30 text-[10px] text-indigo-455 font-bold uppercase mt-1 inline-block">
              {user.role}
            </span>
          </div>
        </div>

        <div className="border-t border-slate-850 pt-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Account ID</label>
              <p className="text-xs text-slate-300 font-mono bg-slate-950 px-3 py-2 rounded-lg border border-slate-850">
                {user.id}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
              <p className="text-xs text-slate-350 bg-slate-950 px-3 py-2 rounded-lg border border-slate-850 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-450" />
                {user.email}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</label>
              <p className="text-xs text-slate-350 bg-slate-950 px-3 py-2 rounded-lg border border-slate-850">
                {user.isOnboarded ? "✓ Profile Onboarded" : "⚠️ Pending Onboarding Setup"}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Registered Since</label>
              <p className="text-xs text-slate-350 bg-slate-950 px-3 py-2 rounded-lg border border-slate-850">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
