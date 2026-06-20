"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { 
  Compass, 
  Bookmark, 
  MessageSquare, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  X, 
  User as UserIcon,
  Shield
} from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: "/mentors", label: "Discover Mentors", icon: Compass },
  ];

  if (user) {
    links.push({ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard });
    if (user.role === "mentee") {
      links.push({ href: "/bookmarks", label: "Bookmarks", icon: Bookmark });
    }
    links.push({ href: "/requests", label: "Requests", icon: MessageSquare });
    if (user.role === "admin") {
      links.push({ href: "/admin", label: "Admin Panel", icon: Shield });
    }
  }

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 p-2 rounded-lg text-white font-bold group-hover:from-violet-500 group-hover:to-indigo-500 transition-all shadow-md shadow-violet-900/45">
                CM
              </span>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                CampusMentor
              </span>
            </Link>

            <div className="hidden md:flex ml-10 space-x-1">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-indigo-600/15 text-indigo-400 border-b-2 border-indigo-500 rounded-b-none"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all text-xs font-semibold"
                >
                  <UserIcon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{user.name}</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-slate-900 text-[10px] uppercase text-indigo-400 border border-indigo-900/50">
                    {user.role}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-slate-300 hover:text-white text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md shadow-indigo-900/30 hover:scale-[1.02]"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-2 pt-2 pb-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href)
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
          <div className="border-t border-slate-800 my-2 pt-2">
            {user ? (
              <div className="px-3 py-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-200">{user.name}</span>
                  <span className="text-xs uppercase bg-indigo-900/50 text-indigo-400 border border-indigo-800/30 px-2 py-0.5 rounded">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-red-900/30 rounded-md text-base font-medium text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-3 py-2 flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-slate-300 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md font-semibold"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <p className="font-semibold text-slate-300">Campus Mentor Finder</p>
        <p className="text-sm">
          A full-stack project built for seamless student-alumni peer connection.
        </p>
        <p className="text-xs text-slate-600">
          &copy; {new Date().getFullYear()} CampusMentor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
