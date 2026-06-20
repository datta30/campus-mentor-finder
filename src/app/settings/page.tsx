"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Settings, Shield, Lock, Bell, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (!user) return null;

  return (
    <div className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-slate-950 text-slate-100">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 flex items-center gap-2">
          <Settings className="w-8 h-8 text-indigo-500" />
          Settings
        </h1>
        <p className="text-slate-400 text-sm mt-1">Manage system preferences, notifications, and profile status updates.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-lg space-y-6">
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 p-4 rounded-xl flex items-center gap-2 text-xs">
            <CheckCircle className="w-4 h-4 text-emerald-450" />
            Preferences updated and saved successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-3">
              <Bell className="w-4 h-4 text-indigo-500" />
              Notification Settings
            </h3>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-800"
                />
                <span className="text-xs text-slate-300">Email notifications for new mentorship requests</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-800"
                />
                <span className="text-xs text-slate-300">Push/Dashboard alert on request status updates</span>
              </label>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-3">
              <Lock className="w-4 h-4 text-indigo-500" />
              Privacy & Access
            </h3>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-800"
                />
                <span className="text-xs text-slate-300">Keep profile search discovery enabled inside campus network</span>
              </label>
            </div>
          </div>

          <div className="border-t border-slate-850 pt-6 flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
