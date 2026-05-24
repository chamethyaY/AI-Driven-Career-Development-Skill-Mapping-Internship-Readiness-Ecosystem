<div align="center">

<br/><br/>

# CareerForge

### *The AI-Powered Career Operating System for Student Developers*

<br/>

<img src="./assets/banner.png" alt="CareerForge Banner" width="90%" />

<br/><br/>

> **CareerForge transforms students into internship-ready developers** through personalised AI roadmaps, structured skill tracking, intelligent project guidance, and real-time career intelligence — all in one cross-platform mobile app.

<br/>

[Features](#-features) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture) • [Database](#-database-design) • [Getting Started](#-getting-started) • [Screens](#-screens)

</div>

---

## The Problem

Most CS students face the same painful cycle:

> *"I've done the tutorials. I've watched the YouTube videos. But I don't know what to build, what skills actually matter, or if I'm actually ready for internships."*

Generic learning platforms teach syntax — not careers. Students are left guessing:

- Which skills do real internships actually require?
- What projects will stand out to recruiters?
- Am I ready to apply — or am I wasting my time?

---

## The Solution

**CareerForge** closes the gap between *learning* and *landing your first internship*.

It acts as a **personal career mentor that's always available** — generating personalised roadmaps based on your goals, recommending portfolio-worthy projects filtered to your tech interests, tracking your progress with a live readiness score, and giving you AI-powered guidance so you know exactly what to do next.

```text
Smart Onboarding → Personalised Roadmap → Skill Tracking → Internship Readiness
```

---

#  Features

##  Authentication System

A complete, production-grade auth flow built on Supabase Auth.

- Email + OTP verification on sign up
- Secure session management with automatic token refresh
- Smart routing — new users go through onboarding, returning users land directly on their dashboard
- Sign out clears the device session only — all profile data and progress persists in the database forever
- Row Level Security enforces data isolation at the database level, not just the application layer

---

##  Smart Onboarding

A 4-step personalisation flow that runs once for new users. Every answer is saved to Supabase and drives every feature in the app.

| Step | What we capture | How it personalises the app |
|------|----------------|----------------------------|
| Primary goal | internship / build skills / career switch | Changes readiness score label, weighting, and targets |
| Current level | beginner / intermediate / advanced | Sets starting point in skill tree, adjusts AI recommendations |
| Role interests | frontend / backend / mobile / devops / AI | Filters project recommendations and skill roadmap |
| Time commitment | casual / regular / intensive | Shapes weekly learning targets and AI pacing |

---

##  Internship Readiness Score

A dynamic, data-driven score that reflects real progress — not just activity.

```text
Score = (Skills Completed × 35%) + (Projects Built × 30%) + (Consistency × 20%) + (Technical Depth × 15%)
```

The score adapts based on the user's goal:

- **Internship** → "Internship Readiness"
- **Build Skills** → "Skill Mastery"
- **Career Switch** → "Career Transition"

---

##  Skill Progression System

An interactive skill tree covering every major development domain.

- Beginner → Intermediate → Advanced progression per domain
- Domains: Frontend, Backend, Mobile, DevOps, AI/ML
- Every completed skill updates the readiness score in real time
- Progress bars per domain showing exactly how far along each track the user is
- Confidence indicators: Confident / Learning / Locked

---

##  Project Recommendation Engine

Personalised project recommendations filtered by the user's role interests and skill level.

Every recommended project includes:

- Full feature breakdown with scope guidance
- Suggested tech stack matched to the user's current level
- Complexity rating to keep users challenged without being overwhelmed
- CV impact score — how much this project will actually impress a recruiter

---

##  Forge AI — Career Intelligence

A 24/7 AI career mentor powered by Google's **Gemini 2.5 Flash** model using the **Generative Language API (v1beta)**.

Forge AI knows the user's:
- Goal
- Skill level
- Role interests
- Current progress

So every response is genuinely personalised.

### Features

- Generates personalised career roadmaps on demand
- Answers "What should I learn next?"
- Identifies skill gaps
- Gives internship-focused guidance
- Provides one focused daily insight every 24 hours

### AI Model

CareerForge uses **Gemini 2.5 Flash** through Google's **Generative Language API (v1beta)** for:

- Personalised roadmap generation
- Career mentoring
- Skill gap analysis
- Learning recommendations
- Project guidance

---

##  Portfolio Generator

The AI transforms completed projects into professional assets ready to use immediately.

### Generates

- GitHub repository descriptions
- STAR-format CV bullet points
- LinkedIn summaries
- Recruiter-focused project writeups

---

#  Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Mobile | React Native + Expo | Cross-platform iOS & Android |
| Language | TypeScript | Full type safety |
| Navigation | Expo Router | File-based routing |
| Backend | Supabase | Auth + Database |
| Database | PostgreSQL | Relational database |
| Authentication | Supabase Auth | OTP + JWT sessions |
| AI Engine | Gemini 2.5 Flash (Google AI) | Career intelligence |
| Icons | @expo/vector-icons | UI icons |
| Styling | React Native StyleSheet | Consistent design system |

---

#  Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                    CareerForge Mobile App                   │
│               React Native · Expo · TypeScript              │
├─────────────┬──────────────────┬───────────────┬────────────┤
│  Auth &     │   Dashboard &    │  Skill Tree & │  AI Layer  │
│  Onboarding │   Readiness      │  Projects     │  Forge AI  │
│  Routing    │   Score          │  Portfolio    │  Roadmaps  │
└──────┬──────┴────────┬─────────┴───────┬───────┴─────┬──────┘
       │               │                 │             │
       ▼               ▼                 ▼             ▼
┌──────────────────────────────────────────────────────────────┐
│                         Supabase                            │
│         Auth · PostgreSQL · Row Level Security              │
│                                                              │
│   user_profiles · skill_progress · user_projects            │
│   daily_activity · ai_insights                              │
└───────────────────────────────────────┬──────────────────────┘
                                        │
                                        ▼
                          ┌─────────────────────────┐
                          │    Gemini 2.5 Flash    │
                          │ Generative Language API │
                          │        (v1beta)         │
                          └─────────────────────────┘
```

---

#  Database Design

CareerForge uses **Supabase (PostgreSQL)** with Row Level Security enabled on every table.

## Tables

```sql
-- Core profile
user_profiles (
  id uuid references auth.users PRIMARY KEY,
  goal text,
  level text,
  roles text[],
  time_commitment text,
  onboarding_completed boolean default false,
  created_at timestamptz default now()
)

-- Skill activity
skill_progress (
  id uuid PRIMARY KEY,
  user_id uuid references auth.users,
  skill_id text,
  status text,
  completed_at timestamptz
)

-- Projects
user_projects (
  id uuid PRIMARY KEY,
  user_id uuid references auth.users,
  title text,
  stack text,
  status text,
  built_at timestamptz
)

-- Daily streaks
daily_activity (
  id uuid PRIMARY KEY,
  user_id uuid references auth.users,
  date date
)

-- AI insights cache
ai_insights (
  id uuid PRIMARY KEY,
  user_id uuid references auth.users,
  tip text,
  generated_at timestamptz
)
```

---

#  Screens

| Screen | Description |
|--------|-------------|
| Login | User authentication |
| Sign Up | OTP verification |
| Onboarding | Personalisation flow |
| Dashboard | Main overview screen |
| Skills | Skill tracking |
| Learn | Learning roadmap |
| AI Chat | Forge AI mentor |
| Projects | AI-generated project ideas |
| Portfolio Generator | AI CV + LinkedIn export |

---

#  Getting Started

## Prerequisites

- Node.js >= 18
- Expo CLI
- Supabase account
- Google AI Studio API key

---

## Installation

```bash
git clone https://github.com/chamethyaY/careerforge.git

cd careerforge

npm install
```

---

## Environment Variables

Create a `.env` file:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url

EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

---

#  Run The App

```bash
npx expo start
```

---

#  Project Structure

```text
careerforge/
├── app/
│   ├── index.tsx
│   ├── login.tsx
│   ├── onboarding.tsx
│   └── (tabs)/
│       ├── dashboard.tsx
│       ├── learn.tsx
│       ├── skills.tsx
│       └── ai-chat.tsx
│
├── components/
│   ├── onboarding/
│   ├── dashboard/
│   └── shared/
│
├── lib/
│   ├── supabase.ts
│   └── scoring.ts
│
├── hooks/
│   ├── useAuth.ts
│   └── useProfile.ts
│
└── constants/
    ├── skills.ts
    └── theme.ts
```

---

#  Security

- Row Level Security enabled on every table
- JWT session management
- OTP email verification
- Environment variables for all secrets
- Secure Supabase authentication flow

---

#  Author

## Chamethya Yasodie

- Full-Stack Developer
- BSc Computer Science
- University of Westminster (IIT Colombo)

### Links

GitHub:  
https://github.com/chamethyaY

LinkedIn:  
https://www.linkedin.com/in/chamethya-yasodie-a8278a349/

Email:  
k.chamethya@gmail.com

---

#  License

MIT License

---

<div align="center">

Built by Chamethya Yasodie

</div>
