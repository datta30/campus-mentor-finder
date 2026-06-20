"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Users, Sparkles, BookOpen, Calendar, HelpCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950 border-b border-slate-900">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-900/30 text-indigo-400 border border-indigo-500/20 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Campus Connections
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
            Find the Perfect Mentor <br className="hidden md:inline" />
            to Navigate Your Campus Journey
          </h1>
          
          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-400 mb-8 font-normal leading-relaxed">
            Connect with seniors, alumni, and peer mentors matching your goals, major, domain interests, and availability. Get real compatibility recommendations instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/mentors"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-900/40 hover:scale-[1.02]"
            >
              <Compass className="w-5 h-5" />
              Discover Mentors
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/signup?role=mentor"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02]"
            >
              <Users className="w-5 h-5 text-indigo-400" />
              Become a Mentor
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
            Why Campus Mentor Finder?
          </h2>
          <p className="text-slate-400">
            A comprehensive, data-driven platform built directly to foster real guidance on campus.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="bg-indigo-600/10 p-3.5 rounded-xl text-indigo-400 w-fit mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">Hybrid Matching Score</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our custom algorithm calculates overlapping skills, domains, languages, availability, and college status to present a detailed compatibility score.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="bg-indigo-600/10 p-3.5 rounded-xl text-indigo-400 w-fit mb-6">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">Domain & Skills Directory</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Easily search across Software Development, UI/UX Design, Product Management, AI/ML, and quant trading to find mentors with specific skill stacks.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="bg-indigo-600/10 p-3.5 rounded-xl text-indigo-400 w-fit mb-6">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">Direct Mentorship Flow</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Submit structured requests directly to potential mentors. Track matching statuses, incoming applications, and manage bookmarks smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
              How it works
            </h2>
            <p className="text-slate-400">
              Three simple steps to connect with qualified advisors who've walked your path.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 mx-auto text-lg">
                1
              </div>
              <h4 className="text-lg font-bold text-slate-200">Sign Up & Onboard</h4>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">
                Create an account, specify your major, college background, skills, and mentor preferences.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 mx-auto text-lg">
                2
              </div>
              <h4 className="text-lg font-bold text-slate-200">Discover Matches</h4>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">
                Sort, filter, and view real match breakdown explanations based on goals, availability, and domains.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 mx-auto text-lg">
                3
              </div>
              <h4 className="text-lg font-bold text-slate-200">Request Mentorship</h4>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">
                Send direct requests. Mentors accept or decline, updating your dashboards in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
