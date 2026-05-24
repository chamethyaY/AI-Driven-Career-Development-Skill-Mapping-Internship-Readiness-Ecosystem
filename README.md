# CareerForge

### *The AI-Powered Career Operating System for Student Developers*

> **CareerForge transforms students into internship-ready developers** through personalised AI guidance, structured skill tracking, curated learning resources, and a 24/7 AI career mentor — all in one cross-platform mobile app.

---

## Overview

Most Computer Science students struggle with one major problem:

> *"I learned the tutorials… but I still don’t know if I’m actually ready for internships."*

Students often don’t know:
- What skills companies actually expect
- What to learn next
- Whether they are improving in the right direction
- How to track their progress properly

**CareerForge** solves this by acting as an AI-powered career mentor that helps students become internship-ready through:
- Skill tracking
- Personalised learning paths
- AI career guidance
- Internship readiness scoring
- Curated learning resources

---

#  Features

##  Authentication System

Built using Supabase Authentication.

### Features
- Email + OTP verification
- Secure authentication flow
- Persistent login sessions
- Automatic session refresh
- Smart routing based on onboarding completion
- Secure sign out

### Security
- Row Level Security (RLS)
- JWT-based authentication
- User data isolation

---

##  Smart Onboarding

A 4-step onboarding flow that personalises the app experience.

### Captures
- Career goal
- Current skill level
- Interested domains
- Weekly learning commitment

### Supported Domains
- Frontend Development
- Backend Development
- Mobile Development
- DevOps
- AI / Machine Learning

---

##  Internship Readiness Score

CareerForge calculates a live readiness score based on user activity.

### Formula

```text
Score =
(Skills Completed × 35%)
+ (Projects Built × 30%)
+ (Consistency × 20%)
+ (Depth × 15%)
```

### Adaptive Labels
- Internship Readiness
- Skill Mastery
- Career Transition

---

##  Skill Profile

Interactive skill tracking system.

### Features
- Mark skills as completed
- Real-time progress updates
- Domain-based tracking
- Personalised skill ordering
- Live completion percentages

### Domains
- Frontend
- Backend
- Mobile
- DevOps
- AI/ML

---

## 📚 Learn Screen

Personalised learning recommendations powered by AI.

### Features
- Continue learning card
- Recommended next skill
- Learning roadmaps
- Curated tutorials
- Free learning resources
- Skill-based recommendations

### Resource Types
- YouTube tutorials
- Official documentation
- Practice websites
- freeCodeCamp resources

---

## Forge AI — Career Mentor

AI-powered career guidance system using Gemini AI.

### Features
- Real-time AI chat
- Personalised responses
- Career guidance
- Skill gap analysis
- Project recommendations
- Internship preparation help

### AI Capabilities
- Suggests what to learn next
- Reviews user progress
- Gives roadmap guidance
- Generates learning resources

### Security
Gemini API is called securely through Supabase Edge Functions, keeping API keys hidden from the client.

---

##  Dashboard

Central personalised dashboard.

### Features
- Greeting system
- Internship readiness score
- Progress statistics
- Daily insights
- Quick navigation actions
- Activity tracking

### Live Stats
- Streak days
- Skills completed
- Projects completed

---

# 🛠 Tech Stack

| Layer | Technology |
|------|-------------|
| Mobile Framework | React Native |
| Platform | Expo |
| Language | TypeScript |
| Backend | Supabase |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| AI | Google Gemini API |
| Navigation | Expo Router |
| Icons | Expo Vector Icons |

---

# Architecture

```text
CareerForge Mobile App
│
├── Authentication & Onboarding
├── Dashboard & Readiness System
├── Skill Tracking
├── Learn Resources
├── Forge AI Chat
│
└── Supabase Backend
     ├── Authentication
     ├── PostgreSQL Database
     ├── Row Level Security
     └── Edge Functions
            │
            └── Gemini AI API
```

---

#  Database Design

## Tables

### user_profiles
Stores onboarding and user profile data.

### skill_progress
Stores completed skills.

### chat_messages
Stores AI chat history.

### skill_resources
Stores cached AI-generated learning resources.

### daily_activity
Stores streak tracking data.

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

---

#  Getting Started

## Prerequisites

- Node.js >= 18
- Expo CLI
- Supabase account
- Gemini API key

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
│
├── app/
│   ├── index.tsx
│   ├── login.tsx
│   ├── onboarding.tsx
│   └── (tabs)/
│       ├── index.tsx
│       ├── learn.tsx
│       ├── skills.tsx
│       └── ai-chat.tsx
│
├── src/
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── geminiChat.ts
│   │   └── skillResources.ts
│   │
│   └── constants/
│       └── skills.ts
│
├── supabase/
│   └── functions/
│       ├── dynamic-task/
│       └── get-skill-materials/
│
└── .env
```

---

#  Security

- Row Level Security enabled
- Secure Supabase authentication
- Protected Gemini API keys
- Environment variables used for secrets
- OTP email verification

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

Built  by Chamethya Yasodie

</div>
