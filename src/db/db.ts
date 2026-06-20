import { User, MentorProfile, MenteeProfile, MentorshipRequest, Bookmark } from "../types";

// Realistic Seed Mentors (15)
const initialMentors: MentorProfile[] = [
  {
    userId: "mentor-1",
    name: "Sarah Jenkins",
    college: "Stanford University",
    background: "Alumni | Senior Software Engineer @ Google",
    expertise: "Software Engineering",
    skills: ["React", "System Design", "Node.js", "TypeScript", "Python"],
    experience: 5,
    mentoringTopics: ["Interview Prep", "Career Growth", "Web Architecture"],
    languages: ["English", "Spanish"],
    availability: ["Weekends", "Weekday evenings"],
    bio: "Stanford CS Alumni. Currently a Senior Developer at Google. Passionate about helping students crack coding interviews and transition into large tech companies.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
  },
  {
    userId: "mentor-2",
    name: "Dr. Alan Turing",
    college: "MIT",
    background: "Researcher & Alumni | AI/ML Research Lead",
    expertise: "AI & Machine Learning",
    skills: ["PyTorch", "Python", "Deep Learning", "Algorithms", "Linear Algebra"],
    experience: 8,
    mentoringTopics: ["Research Papers", "Ph.D. Applications", "Math for ML"],
    languages: ["English"],
    availability: ["Weekday mornings", "Weekends"],
    bio: "MIT Alumni and former researcher. I focus on theoretical AI, building deep learning models, and preparing students for graduate research programs.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  },
  {
    userId: "mentor-3",
    name: "Elena Rostova",
    college: "Georgia Tech",
    background: "Senior | Head of UX Club",
    expertise: "Product Design",
    skills: ["Figma", "UI/UX", "User Research", "Wireframing", "CSS"],
    experience: 2,
    mentoringTopics: ["Portfolio Review", "Design Systems", "Internships"],
    languages: ["English", "Russian"],
    availability: ["Weekday evenings"],
    bio: "Georgia Tech Senior. I secured UI/UX internship offers from Apple and Airbnb. Excited to help juniors design beautiful portfolios and crack UI challenges.",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
  },
  {
    userId: "mentor-4",
    name: "Marcus Chen",
    college: "UC Berkeley",
    background: "Alumni | Product Manager @ Meta",
    expertise: "Product Management",
    skills: ["Product Strategy", "Data Analytics", "SQL", "A/B Testing", "Agile"],
    experience: 6,
    mentoringTopics: ["PRD Writing", "Mock Interviews", "Product Sense"],
    languages: ["English", "Mandarin"],
    availability: ["Weekends"],
    bio: "Berkeley Alumni. PM at Meta. I specialize in helping developers, researchers, and designers pivot into Product Management roles.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
  },
  {
    userId: "mentor-5",
    name: "Priya Sharma",
    college: "Stanford University",
    background: "Graduate Student | Data Science Fellow",
    expertise: "Data Science",
    skills: ["SQL", "Pandas", "Scikit-Learn", "Tableau", "Data Viz"],
    experience: 3,
    mentoringTopics: ["Analytics Prep", "Storytelling with Data", "SQL Mastery"],
    languages: ["English", "Hindi"],
    availability: ["Weekday evenings", "Weekends"],
    bio: "Masters Student at Stanford. Ex-Data Analyst at McKinsey. I teach students how to bridge the gap between technical data and business decisions.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
  },
  {
    userId: "mentor-6",
    name: "Alex Mercer",
    college: "MIT",
    background: "Alumni | Devops Lead @ AWS",
    expertise: "Cloud & Devops",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux", "Go"],
    experience: 7,
    mentoringTopics: ["System Operations", "Cloud Architecting", "Terraform Guide"],
    languages: ["English"],
    availability: ["Weekday mornings"],
    bio: "MIT Alumni. DevOps Lead working on AWS EC2 orchestration. Let me help you learn Docker, Kubernetes, and scalable systems.",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150"
  },
  {
    userId: "mentor-7",
    name: "Chloe Dupont",
    college: "University of Michigan",
    background: "Alumni | CyberSecurity Consultant",
    expertise: "Cybersecurity",
    skills: ["Penetration Testing", "Cryptography", "Network Security", "Python"],
    experience: 4,
    mentoringTopics: ["Security Certifications", "CTF Challenges", "Ethical Hacking"],
    languages: ["English", "French"],
    availability: ["Weekends"],
    bio: "UMich Alumni. Active CTF player and security consultant. I love mentoring folks who want to understand network vulnerabilities and ethical hacking.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
  },
  {
    userId: "mentor-8",
    name: "David Kim",
    college: "Stanford University",
    background: "Alumni | Quantitative Trader",
    expertise: "Quantitative Finance",
    skills: ["C++", "Python", "Stochastic Calculus", "Algorithms"],
    experience: 5,
    mentoringTopics: ["Resume Prep", "Math Puzzles", "C++ Optimization"],
    languages: ["English", "Korean"],
    availability: ["Weekday evenings"],
    bio: "Stanford Financial Math Alumni. Quantitative Trader at a top Chicago firm. I offer rigorous mentoring for quantitative developer and trader tracks.",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150"
  },
  {
    userId: "mentor-9",
    name: "Sophia Martinez",
    college: "Georgia Tech",
    background: "Alumni | Mobile Developer @ Netflix",
    expertise: "Mobile Development",
    skills: ["Swift", "SwiftUI", "Kotlin", "React Native", "iOS SDK"],
    experience: 4,
    mentoringTopics: ["Mobile Apps", "App Store Publishing", "UI Polish"],
    languages: ["English", "Spanish"],
    availability: ["Weekends", "Weekday mornings"],
    bio: "Georgia Tech CS grad. Mobile Engineer at Netflix. Let's design and build beautiful native applications together and optimize layouts for performance.",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150"
  },
  {
    userId: "mentor-10",
    name: "Ryan Reynolds",
    college: "UC Berkeley",
    background: "Alumni | Venture Capitalist & Founder",
    expertise: "Entrepreneurship",
    skills: ["Pitching", "Fundraising", "Product-Market Fit", "Networking"],
    experience: 10,
    mentoringTopics: ["Startup Pitch", "Y-Combinator Prep", "Product Launch"],
    languages: ["English"],
    availability: ["Weekday evenings"],
    bio: "Berkeley Haas Alum. Founded 2 venture-backed startups. I help students structure their startup pitches, find co-founders, and raise seed funding.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
  },
  {
    userId: "mentor-11",
    name: "Emily Watson",
    college: "University of Michigan",
    background: "Senior | Peer Tutor & Researcher",
    expertise: "Software Engineering",
    skills: ["Java", "C", "Algorithms", "Data Structures"],
    experience: 1,
    mentoringTopics: ["Core Classes", "Data Structures Homework", "Exams Strategy"],
    languages: ["English"],
    availability: ["Weekday evenings", "Weekends"],
    bio: "Senior at UMich. Head Peer Tutor for Data Structures & Algorithms. If you are struggling to pass your sophomore and junior CS classes, I am here to help.",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150"
  },
  {
    userId: "mentor-12",
    name: "Vikram Malhotra",
    college: "MIT",
    background: "Alumni | Database Architect",
    expertise: "Database Systems",
    skills: ["PostgreSQL", "MongoDB", "Cassandra", "Redis", "SQL Tuning"],
    experience: 9,
    mentoringTopics: ["DB Design", "Scalability", "Indexing Strategies"],
    languages: ["English", "Hindi"],
    availability: ["Weekends"],
    bio: "MIT Grad. Principal DB Architect. I help engineers master databases, SQL query tuning, indexing, and structuring highly scalable distributed storage engines.",
    avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150"
  },
  {
    userId: "mentor-13",
    name: "Isabella Rossi",
    college: "Stanford University",
    background: "Alumni | UX Researcher @ Apple",
    expertise: "Product Design",
    skills: ["User Testing", "Figma", "Interaction Design", "Personas"],
    experience: 5,
    mentoringTopics: ["UX Audits", "Usability Testing", "Human Computer Interaction"],
    languages: ["English", "Italian"],
    availability: ["Weekday evenings"],
    bio: "Stanford HCI graduate. UX Researcher at Apple. I mentor student designers on building rigorous user testing frameworks and analyzing interface heuristics.",
    avatarUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150"
  },
  {
    userId: "mentor-14",
    name: "Arthur Pendragon",
    college: "UC Berkeley",
    background: "Alumni | AI Safety Researcher",
    expertise: "AI & Machine Learning",
    skills: ["Transformers", "Ethics", "Python", "Pytorch", "RLHF"],
    experience: 4,
    mentoringTopics: ["AI Ethics", "Alignment Research", "Graduate Admissions"],
    languages: ["English"],
    availability: ["Weekday mornings", "Weekday evenings"],
    bio: "Berkeley Alumni. Research Fellow at Center for AI Safety. Let's discuss neural alignment, RLHF techniques, and how to get published in top-tier conferences.",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"
  },
  {
    userId: "mentor-15",
    name: "Nisha Patel",
    college: "Georgia Tech",
    background: "Alumni | Senior PM @ Microsoft",
    expertise: "Product Management",
    skills: ["Agile Roadmap", "Metrics", "Stakeholder Communication", "Market Research"],
    experience: 8,
    mentoringTopics: ["Tech PM skills", "Microsoft Recruiting", "Negotiation"],
    languages: ["English", "Gujarati"],
    availability: ["Weekends"],
    bio: "Georgia Tech Alumni. Lead PM at Microsoft. Helping mentees understand PM roles in enterprise cloud setups, product roadmapping, and cross-functional leadership.",
    avatarUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150"
  }
];

// Realistic Seed Mentees (10)
const initialMentees: MenteeProfile[] = [
  {
    userId: "mentee-1",
    name: "Jane Doe",
    college: "Stanford University",
    year: "Sophomore",
    major: "Computer Science",
    goals: ["Software Engineer Intern", "Learn System Design"],
    interests: ["Web Tech", "React", "Node.js"],
    preferredMentorType: "Alumni",
    languages: ["English"],
    availability: ["Weekday evenings", "Weekends"]
  },
  {
    userId: "mentee-2",
    name: "John Smith",
    college: "MIT",
    year: "Junior",
    major: "Electrical Engineering & CS",
    goals: ["Get into AI Research", "Ph.D. prep"],
    interests: ["Neural Networks", "Python", "Deep Learning"],
    preferredMentorType: "Alumni",
    languages: ["English"],
    availability: ["Weekday mornings", "Weekends"]
  },
  {
    userId: "mentee-3",
    name: "Alice Cooper",
    college: "Georgia Tech",
    year: "Sophomore",
    major: "Computational Media",
    goals: ["Build UI/UX Portfolio", "UX Design Internship"],
    interests: ["Figma", "Graphic Design", "CSS"],
    preferredMentorType: "Senior",
    languages: ["English"],
    availability: ["Weekday evenings"]
  },
  {
    userId: "mentee-4",
    name: "Bob Vance",
    college: "UC Berkeley",
    year: "Freshman",
    major: "Business Administration",
    goals: ["Learn Product Management", "Tech Startup PM"],
    interests: ["Product Strategy", "Case Prep", "Entrepreneurship"],
    preferredMentorType: "Alumni",
    languages: ["English", "Mandarin"],
    availability: ["Weekends"]
  },
  {
    userId: "mentee-5",
    name: "Charlie Brown",
    college: "University of Michigan",
    year: "Junior",
    major: "Computer Science",
    goals: ["Pass DSA class", "Pass system programming exams"],
    interests: ["C++", "Algorithms", "Data Structures"],
    preferredMentorType: "Senior",
    languages: ["English"],
    availability: ["Weekends"]
  },
  {
    userId: "mentee-6",
    name: "Diana Prince",
    college: "Stanford University",
    year: "Freshman",
    major: "Data Science",
    goals: ["Data Analyst Role", "Learn Tableau & SQL"],
    interests: ["SQL", "Data Exploration", "Python"],
    preferredMentorType: "Alumni",
    languages: ["English", "Spanish"],
    availability: ["Weekday evenings"]
  },
  {
    userId: "mentee-7",
    name: "Evan Wright",
    college: "MIT",
    year: "Senior",
    major: "CS & Mathematics",
    goals: ["Quant Developer", "C++ optimization expert"],
    interests: ["Quantitative Finance", "C++", "Algorithms"],
    preferredMentorType: "Alumni",
    languages: ["English"],
    availability: ["Weekday mornings", "Weekends"]
  },
  {
    userId: "mentee-8",
    name: "Fiona Gallagher",
    college: "Georgia Tech",
    year: "Junior",
    major: "Computer Science",
    goals: ["Mobile Dev Internship", "Launch iOS application"],
    interests: ["Swift", "SwiftUI", "React Native"],
    preferredMentorType: "Alumni",
    languages: ["English"],
    availability: ["Weekends"]
  },
  {
    userId: "mentee-9",
    name: "George Costanza",
    college: "UC Berkeley",
    year: "Senior",
    major: "Informatics",
    goals: ["Product Launch", "Find startup mentor"],
    interests: ["Entrepreneurship", "Pitching", "Venture Capital"],
    preferredMentorType: "Alumni",
    languages: ["English"],
    availability: ["Weekday evenings"]
  },
  {
    userId: "mentee-10",
    name: "Hannah Abbott",
    college: "University of Michigan",
    year: "Sophomore",
    major: "Computer Science",
    goals: ["CyberSecurity Internship", "Learn Pentesting"],
    interests: ["Cryptography", "Network Security", "CTFs"],
    preferredMentorType: "Alumni",
    languages: ["English", "French"],
    availability: ["Weekends"]
  }
];

// Seed Users
const initialUsers: User[] = [
  { id: "admin-1", email: "admin@campusmentor.com", name: "System Administrator", role: "admin", isOnboarded: true, createdAt: new Date().toISOString() },
  
  // Mentors
  ...initialMentors.map(m => ({
    id: m.userId,
    email: `${m.name.toLowerCase().replace(/\s+/g, "")}@campusmentor.com`,
    name: m.name,
    role: "mentor" as const,
    isOnboarded: true,
    createdAt: new Date().toISOString()
  })),

  // Mentees
  ...initialMentees.map(m => ({
    id: m.userId,
    email: `${m.name.toLowerCase().replace(/\s+/g, "")}@campusmentor.com`,
    name: m.name,
    role: "mentee" as const,
    isOnboarded: true,
    createdAt: new Date().toISOString()
  }))
];

// Initial Requests
const initialRequests: MentorshipRequest[] = [
  {
    id: "req-1",
    menteeId: "mentee-1",
    menteeName: "Jane Doe",
    mentorId: "mentor-1",
    mentorName: "Sarah Jenkins",
    message: "Hi Sarah! I'm a CS Sophomore at Stanford hoping to break into Google next summer. I would love to get your advice on interview prep and resumes.",
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "req-2",
    menteeId: "mentee-2",
    menteeName: "John Smith",
    mentorId: "mentor-2",
    mentorName: "Dr. Alan Turing",
    message: "Hi Dr. Turing. I am currently reading deep learning papers and would appreciate your guidance on finding research positions in computer vision.",
    status: "accepted",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "req-3",
    menteeId: "mentee-3",
    menteeName: "Alice Cooper",
    mentorId: "mentor-3",
    mentorName: "Elena Rostova",
    message: "Hey Elena! I'm struggling with system layouts in my design club. Would appreciate if you could review my portfolio and Figma files.",
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Initial Bookmarks
const initialBookmarks: Bookmark[] = [
  {
    id: "b-1",
    menteeId: "mentee-1",
    mentorId: "mentor-1",
    createdAt: new Date().toISOString()
  },
  {
    id: "b-2",
    menteeId: "mentee-1",
    mentorId: "mentor-5",
    createdAt: new Date().toISOString()
  }
];

// Server-side Local Persistence Class
export class MockDatabase {
  private users: User[] = [...initialUsers];
  private mentors: MentorProfile[] = [...initialMentors];
  private mentees: MenteeProfile[] = [...initialMentees];
  private requests: MentorshipRequest[] = [...initialRequests];
  private bookmarks: Bookmark[] = [...initialBookmarks];

  getUsers() { return this.users; }
  getMentors() { return this.mentors; }
  getMentees() { return this.mentees; }
  getRequests() { return this.requests; }
  getBookmarks() { return this.bookmarks; }

  addUser(user: User) {
    this.users.push(user);
    return user;
  }

  updateUser(id: string, updates: Partial<User>) {
    const user = this.users.find(u => u.id === id);
    if (user) {
      Object.assign(user, updates);
    }
    return user;
  }

  addMentor(mentor: MentorProfile) {
    this.mentors = this.mentors.filter(m => m.userId !== mentor.userId);
    this.mentors.push(mentor);
    return mentor;
  }

  addMentee(mentee: MenteeProfile) {
    this.mentees = this.mentees.filter(m => m.userId !== mentee.userId);
    this.mentees.push(mentee);
    return mentee;
  }

  addRequest(req: MentorshipRequest) {
    this.requests.push(req);
    return req;
  }

  updateRequestStatus(id: string, status: "accepted" | "rejected") {
    const req = this.requests.find(r => r.id === id);
    if (req) {
      req.status = status;
      req.updatedAt = new Date().toISOString();
    }
    return req;
  }

  addBookmark(menteeId: string, mentorId: string) {
    const existing = this.bookmarks.find(b => b.menteeId === menteeId && b.mentorId === mentorId);
    if (!existing) {
      const b: Bookmark = {
        id: `b-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        menteeId,
        mentorId,
        createdAt: new Date().toISOString()
      };
      this.bookmarks.push(b);
      return b;
    }
    return existing;
  }

  removeBookmark(menteeId: string, mentorId: string) {
    this.bookmarks = this.bookmarks.filter(b => !(b.menteeId === menteeId && b.mentorId === mentorId));
  }
}

// Global Singleton for Development persistence (in-memory mock DB)
let globalDb: MockDatabase;

if (process.env.NODE_ENV === "production") {
  globalDb = new MockDatabase();
} else {
  // Prevent hot-reloads in Next.js from clearing the DB
  const g = global as any;
  if (!g.mockDb) {
    g.mockDb = new MockDatabase();
  }
  globalDb = g.mockDb;
}

export { globalDb };
export const db = globalDb;
export type { User, MentorProfile, MenteeProfile, MentorshipRequest, Bookmark };
