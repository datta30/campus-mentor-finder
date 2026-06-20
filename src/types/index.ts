export type UserRole = "mentee" | "mentor" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isOnboarded: boolean;
  createdAt: string;
}

export interface MentorProfile {
  userId: string;
  name: string;
  college: string;
  background: string;
  expertise: string; // e.g. "Software Engineering", "Product Management"
  skills: string[];
  experience: number; // years
  mentoringTopics: string[];
  languages: string[];
  availability: string[]; // e.g. ["Weekends", "Weekday evenings"]
  bio: string;
  avatarUrl: string;
}

export interface MenteeProfile {
  userId: string;
  name: string;
  college: string;
  year: string; // e.g. "Freshman", "Senior"
  major: string;
  goals: string[];
  interests: string[];
  preferredMentorType: string;
  languages: string[];
  availability: string[];
}

export interface MentorshipRequest {
  id: string;
  menteeId: string;
  menteeName: string;
  mentorId: string;
  mentorName: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export interface Bookmark {
  id: string;
  menteeId: string;
  mentorId: string;
  createdAt: string;
}

export interface MatchScore {
  score: number;
  breakdown: {
    domainOverlap: number;
    skillOverlap: number;
    goalMatch: number;
    collegeMatch: number;
    languageMatch: number;
    availabilityMatch: number;
  };
  explanation: string;
}
