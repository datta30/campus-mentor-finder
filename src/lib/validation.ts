import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["mentee", "mentor", "admin"]),
});

export const MenteeOnboardingSchema = z.object({
  college: z.string().min(2, "College name is required"),
  year: z.string().min(1, "Select your academic year"),
  major: z.string().min(2, "Major/branch is required"),
  goals: z.string().min(2, "Enter at least one goal"),
  interests: z.string().min(2, "Enter at least one interest"),
  preferredMentorType: z.string().min(2, "Preferred mentor type is required"),
  languages: z.string().min(2, "Specify preferred languages"),
  availability: z.array(z.string()).min(1, "Select at least one option"),
});

export const MentorOnboardingSchema = z.object({
  college: z.string().min(2, "College/Alumni affiliation is required"),
  background: z.string().min(2, "Briefly state your current role or degree"),
  expertise: z.string().min(2, "Select or type your core area of expertise"),
  skills: z.string().min(2, "List your core skills (comma-separated)"),
  experience: z.number().min(0, "Experience cannot be negative"),
  mentoringTopics: z.string().min(2, "What topics do you want to mentor in?"),
  languages: z.string().min(2, "Specify language(s) you speak"),
  availability: z.array(z.string()).min(1, "Select at least one slot"),
  bio: z.string().min(20, "Bio should be at least 20 characters long"),
});

export const MentorshipRequestSchema = z.object({
  message: z.string().min(10, "Please provide a message with details for your request (min 10 chars)."),
});
