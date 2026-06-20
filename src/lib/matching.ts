import { MentorProfile, MenteeProfile, MatchScore } from "@/types";

/**
 * Deterministically computes a similarity score and details between a mentee and mentor profile.
 * Match logic:
 * 1. Expertise domain overlap: +30 points
 * 2. Skills overlap: Up to +25 points (proportional to shared skills)
 * 3. College match: +20 points if same college or mentor is alumni of mentee's college
 * 4. Goal-to-topic match: Up to +15 points based on overlapping mentorship topics or goals
 * 5. Language match: +10 points
 * 6. Availability overlap: Up to +10 points
 */
export function calculateMatchScore(mentee: MenteeProfile, mentor: MentorProfile): MatchScore {
  let domainOverlap = 0;
  let skillOverlap = 0;
  let goalMatch = 0;
  let collegeMatch = 0;
  let languageMatch = 0;
  let availabilityMatch = 0;

  // 1. Expertise / Domain match
  // Normalize strings to compare
  const normalizedExpertise = mentor.expertise.toLowerCase();
  const interestsAndMajor = [...mentee.interests, mentee.major].map(i => i.toLowerCase());
  const domainIsMatched = interestsAndMajor.some(interest => 
    interest.includes(normalizedExpertise) || normalizedExpertise.includes(interest)
  );
  if (domainIsMatched) {
    domainOverlap = 30;
  }

  // 2. Skill overlap
  const menteeSkills = mentee.interests.map(i => i.toLowerCase());
  const mentorSkills = mentor.skills.map(s => s.toLowerCase());
  const sharedSkills = mentorSkills.filter(s => 
    menteeSkills.some(ms => ms.includes(s) || s.includes(ms))
  );
  if (mentorSkills.length > 0) {
    const ratio = sharedSkills.length / Math.max(mentorSkills.length, 1);
    skillOverlap = Math.round(ratio * 25);
  }

  // 3. College match
  if (mentee.college.toLowerCase().trim() === mentor.college.toLowerCase().trim()) {
    collegeMatch = 20;
  }

  // 4. Goal match (topics of mentor vs mentee goals)
  const menteeGoals = mentee.goals.map(g => g.toLowerCase());
  const mentorTopics = mentor.mentoringTopics.map(t => t.toLowerCase());
  const matchedGoals = menteeGoals.filter(goal => 
    mentorTopics.some(topic => goal.includes(topic) || topic.includes(goal))
  );
  if (matchedGoals.length > 0) {
    goalMatch = 15;
  } else if (mentor.expertise.toLowerCase() === mentee.preferredMentorType.toLowerCase()) {
    goalMatch = 10;
  }

  // 5. Language match
  const menteeLanguages = mentee.languages.map(l => l.toLowerCase());
  const mentorLanguages = mentor.languages.map(l => l.toLowerCase());
  const sharedLanguages = mentorLanguages.filter(l => menteeLanguages.includes(l));
  if (sharedLanguages.length > 0) {
    languageMatch = 10;
  }

  // 6. Availability match
  const menteeAvail = mentee.availability?.map(a => a.toLowerCase()) || [];
  const mentorAvail = mentor.availability?.map(a => a.toLowerCase()) || [];
  const sharedAvail = mentorAvail.filter(a => menteeAvail.includes(a));
  if (sharedAvail.length > 0) {
    availabilityMatch = 10;
  }

  const totalScore = domainOverlap + skillOverlap + collegeMatch + goalMatch + languageMatch + availabilityMatch;

  // Generate a customized match explanation
  const reasons: string[] = [];
  if (collegeMatch > 0) {
    reasons.push(`You both share college background from ${mentor.college}`);
  }
  if (domainOverlap > 0) {
    reasons.push(`Strong overlap in your interests/major and mentor's expertise of ${mentor.expertise}`);
  }
  if (sharedSkills.length > 0) {
    reasons.push(`Matches your interest in ${sharedSkills.slice(0, 2).join(", ")}`);
  }
  if (goalMatch > 0) {
    reasons.push(`Mentor targets topics aligned with your career goals`);
  }

  const explanation = reasons.length > 0 
    ? reasons.join(". ") + "."
    : `Good general match with alignment on communication language and general availability.`;

  return {
    score: totalScore,
    breakdown: {
      domainOverlap,
      skillOverlap,
      goalMatch,
      collegeMatch,
      languageMatch,
      availabilityMatch
    },
    explanation
  };
}
