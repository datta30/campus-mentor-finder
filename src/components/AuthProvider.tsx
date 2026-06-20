"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<boolean>;
  signup: (name: string, email: string, role: "mentor" | "mentee" | "admin") => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: (userId?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async (userId?: string) => {
    try {
      const url = userId ? `/api/auth/me?userId=${userId}` : `/api/auth/me`;
      const res = await fetch(url);
      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if client has local user saved or cookies
    const savedUserId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    refreshUser(savedUserId || undefined);
  }, []);

  const login = async (email: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: "mock-password" }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        localStorage.setItem("userId", data.user.id);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, role: "mentor" | "mentee" | "admin") => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, password: "mock-password" }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        localStorage.setItem("userId", data.user.id);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      localStorage.removeItem("userId");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
