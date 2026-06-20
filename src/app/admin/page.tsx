"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { 
  Shield, 
  Users, 
  UserCheck, 
  GraduationCap, 
  ArrowRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  Clock,
  XCircle
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "admin") {
      router.push("/dashboard");
      return;
    }

    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [user, router]);

  if (!user || user.role !== "admin") return null;

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-slate-950 text-slate-100">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            Admin System Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">Platform overview metrics, request processing stats, and user totals.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
        </div>
      ) : stats ? (
        <div className="space-y-8">
          {/* Key Stat Cards Grid */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md space-y-2 relative overflow-hidden">
              <div className="absolute right-4 top-4 p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-450 uppercase">Total User Accounts</p>
              <h3 className="text-3xl font-extrabold text-slate-100">{stats.totalUsers}</h3>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md space-y-2 relative overflow-hidden">
              <div className="absolute right-4 top-4 p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-450 uppercase">Active Mentors</p>
              <h3 className="text-3xl font-extrabold text-slate-100 text-emerald-450">{stats.totalMentors}</h3>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md space-y-2 relative overflow-hidden">
              <div className="absolute right-4 top-4 p-2 bg-violet-500/10 rounded-xl text-violet-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-450 uppercase">Active Mentees</p>
              <h3 className="text-3xl font-extrabold text-slate-100 text-violet-405">{stats.totalMentees}</h3>
            </div>
          </div>

          {/* Mentorship request stats */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-md space-y-6">
            <h3 className="text-lg font-bold text-slate-200 flex items-center gap-1.5 border-b border-slate-800 pb-4">
              <Activity className="w-5 h-5 text-indigo-500" />
              Mentorship Connection Request Analytics
            </h3>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-slate-950 border border-slate-850 p-5 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Pending Approvals</h4>
                  <p className="text-2xl font-extrabold text-amber-450 mt-1">{stats.stats.pending}</p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-850 p-5 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Accepted Connections</h4>
                  <p className="text-2xl font-extrabold text-emerald-450 mt-1">{stats.stats.accepted}</p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-850 p-5 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Declined Proposals</h4>
                  <p className="text-2xl font-extrabold text-red-450 mt-1">{stats.stats.rejected}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-slate-400 text-sm">Failed to load statistics.</div>
      )}
    </div>
  );
}
