# Campus Mentor Finder

Campus Mentor Finder is a full-stack web application designed for student-to-mentor connection inside university communities. Students (mentees) can discover mentors (seniors, alumni, or peer advisors) based on domain fields, experience, college, language, availability, and alignment.

## 🚀 Features

- **Landing Page**: Modern premium UI highlighting mentor matching features, value propositions, and Call to Action.
- **Simulated Auth Service**: Fully working cookie-backed login, logout, and registration flows without requiring third-party credentials.
- **Onboarding Flow**: Specialized forms for Mentors and Mentees to specify backgrounds, skills, availability, and interests.
- **Mentor Directory**: Real-time filtering by college preference, expertise domains, availability hours, bookmark statuses, and sorting preferences.
- **Match Compatibility System**: Server-side scoring engine that evaluates overlap across college backgrounds, language fluency, domain fields, specific skill sets, and schedules. Provides custom written explanations for recommendations.
- **Request Manager**: Send direct mentorship request invitations. Mentors can view incoming entries, toggle acceptance/rejection, and update mentee dashboard feeds instantly.
- **Dashboard Hubs**: Custom layouts for:
  - **Mentees**: View recommended compatible mentors, bookmarks, and request invitation statuses.
  - **Mentors**: View stats overview metrics, incoming applications, and process reviews.
  - **Admins**: View total user statistics, system activity analytics, and request status breakdowns.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Programming Language**: TypeScript
- **State Management & DB**: Mock Database singleton (`src/db/db.ts`) pre-seeded with 15 mentors, 10 mentees, and multiple college connections.
- **Validation**: Zod
- **Icons**: Lucide React
- **Forms**: Managed with state inputs

---

## 📂 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── admin/stats/  # Admin statistics generator
│   │   ├── auth/         # Login, logout, signup, me session routes
│   │   ├── bookmarks/    # Toggle bookmarks logic
│   │   ├── match/        # Hybrid compatibility calculator
│   │   ├── mentors/      # Individual or list queries
│   │   └── requests/     # Submitting and processing requests
│   ├── onboarding/       # Multi-step profiles form
│   ├── dashboard/        # Dashboard view hub
│   ├── bookmarks/        # Bookmarked profiles listing
│   ├── requests/         # Incoming/outgoing requests overview
│   ├── login/            # Authentication sign in
│   ├── signup/           # Account registration
│   ├── profile/          # User status overview
│   ├── settings/         # Privacy preferences toggle
│   ├── layout.tsx        # HTML wrapper layout
│   └── globals.css       # Global tailwind styles
├── components/
│   ├── AuthProvider.tsx  # React Context Sync Hook
│   └── Layout.tsx        # Navigation and Footer
├── db/
│   └── db.ts             # Mock database, seeding, and CRUD methods
├── lib/
│   ├── auth.ts           # Cookie helper
│   ├── matching.ts       # Similarity rating calculation algorithm
│   └── validation.ts     # Zod schema definitions
└── types/
    └── index.ts          # Shared TypeScript interfaces
```

---

## 💻 Local Setup & Development

### 1. Pre-requisites
- [Node.js](https://nodejs.org/) (v18.0.0 or later recommended)
- npm (installed automatically with Node)

### 2. Installation
Clone this repository to your local directory and install dependencies:
```bash
npm install
```

### 3. Running Dev Server
Launch the development environment:
```bash
npm run dev
```
Open **http://localhost:3000** in your browser to access the platform.

### 4. Demo Login Credentials
Use these pre-registered emails to inspect and test various user viewpoints (no password required):
- **Sarah Jenkins (Mentor)**: `sarahjenkins@campusmentor.com`
- **Jane Doe (Mentee)**: `janedoe@campusmentor.com`
- **System Administrator (Admin)**: `admin@campusmentor.com`

---

## ☁️ Deployment Instructions

### Deploying to Vercel
1. Ensure all local changes are committed and pushed to a GitHub repository.
2. Go to the [Vercel Dashboard](https://vercel.com/) and click **Add New Project**.
3. Select your GitHub repository.
4. Click **Deploy**. (No environment variables or secrets are strictly required upfront; the project functions with mock storage automatically, enabling immediate preview).
