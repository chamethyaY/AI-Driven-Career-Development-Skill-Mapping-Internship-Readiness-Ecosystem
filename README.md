# CareerForge

### *The AI-Powered Career Operating System for Student Developers*

**CareerForge transforms students into internship-ready developers through structured skill development, intelligent project guidance, and personalized career intelligence — all in one unified platform.**
---

## The Problem

Most students in tech face the same cycle of confusion:

> *"I've completed a few tutorials, but I don't know what to learn next. I don't know what projects to build, and I have no idea if I'm actually ready for internships."*

Traditional learning platforms teach concepts — but they don't build careers. Students are left to figure out:

- What skills are actually relevant for the industry
-        What projects will stand out on a CV
- How to measure their own progress objectively
- When they're genuinely ready to apply for internships
- How to present themselves professionally

---

## The Solution

**CareerForge** is an AI-driven career operating system that closes the gap between *learning* and *landing your first internship*.

It acts as your **personal career mentor**, **roadmap generator**, **project advisor**, and **readiness tracker** — all in one place.

```
Learning → Building → Internship Readiness → Career Success
```

---

## Core Features

### AI Career Intelligence Engine
Your personal career mentor, available 24/7.

- Generates personalized career roadmaps based on your goals and current skill level
- Answers "What should I learn next?" with context-aware, actionable guidance
- Identifies skill gaps by comparing your profile against real internship requirements
- Adapts recommendations continuously as your profile evolves

###  Skill Progression System
Visual, satisfying, and structured skill tracking.

- Interactive skill tree from **Beginner → Intermediate → Advanced**
- Covers all major domains: Frontend, Backend, Mobile, DevOps, AI/ML, and more
- Progress analytics dashboard with streak tracking and completion milestones
- Milestone-based achievement system to keep motivation high

###  Project Recommendation Engine
Stop building random projects. Build portfolio-worthy ones.

Each recommended project includes:
- Full **feature breakdown** with scope guidance
- Suggested **tech stack** aligned to your current skill level
- **Complexity rating** so you're always in the challenge zone
- **CV impact score** — how much this project will actually impress recruiters

###  Internship Readiness Score
A dynamic, data-driven score that shows exactly where you stand.

Your readiness score is calculated from:

| Factor | Weight |
|--------|--------|
| Skills Completed | 35% |
| Projects Built | 30% |
| Consistency & Streaks | 20% |
| Technical Depth | 15% |

Get a clear percentage score, plus specific actions to improve it — no more guessing.

###  Portfolio Generator
Turn your work into professional assets instantly.

The AI transforms your tracked projects into:
- **GitHub-ready** repository descriptions with impact-focused language
- **CV bullet points** using the STAR format (Situation, Task, Action, Result)
- **LinkedIn project summaries** optimized for recruiter visibility

###  Smart Guidance System
Stay on track without being overwhelmed.

- Personalized learning reminders based on your schedule and pace
- Milestone-based notifications that celebrate progress
- Adaptive goal tracking that adjusts to your availability

---

##  System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CareerForge App                        │
│                   (Flutter / React Native)                  │
├─────────────┬───────────────────┬───────────────────────────┤
│   Auth &    │   User Dashboard  │    AI Interaction Layer   │
│   Profile   │   Skill Tracker   │    (Chat + Roadmaps)      │
└──────┬──────┴────────┬──────────┴──────────┬────────────────┘
       │               │                     │
       ▼               ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                     Backend API Layer                       │
│              (Node.js / FastAPI / Firebase)                 │
├──────────────────────┬──────────────────────────────────────┤
│  User Data Service   │        AI Orchestration Service      │
│  Progress Tracking   │   (Roadmap Gen · Gap Analysis ·      │
│  Portfolio Storage   │    Project Recs · Readiness Score)   │
└──────────────────────┴──────────────────┬───────────────────┘
                                          │
                                          ▼
                           ┌──────────────────────────┐
                           │     AI Provider Layer     │
                           │   LLM API (OpenAI / etc.) │
                           │   Vector DB (Embeddings)  │
                           │   Job Market Data Feed    │
                           └──────────────────────────┘
```

---

##  Tech Stack

| Layer | Technology |
|-------|------------|
| Mobile Frontend | Flutter (iOS & Android) |
| Backend API | Node.js / FastAPI |
| Database | Firebase Firestore / PostgreSQL |
| Authentication | Firebase Auth |
| AI Engine | OpenAI GPT-4 / Claude API |
| Vector Search | Pinecone / Supabase pgvector |
| Notifications | Firebase Cloud Messaging |
| CI/CD | GitHub Actions |

---

##  Getting Started

### Prerequisites

- Flutter SDK `>=3.0.0`
- Dart `>=3.0.0`
- Node.js `>=18.x`
- Firebase project (for auth & database)
- OpenAI API key (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/careerforge.git
cd careerforge

# Install Flutter dependencies
flutter pub get

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Run the app
flutter run
```

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start the development server
npm run dev
```

### Environment Variables

```env
# AI Configuration
OPENAI_API_KEY=your_openai_key_here

# Firebase
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_API_KEY=your_firebase_api_key

# Backend
API_BASE_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret
```

---

## Screenshots

> *Coming soon — the app is currently in active development.*

---

##  Project Structure

```
careerforge/
├── lib/
│   ├── core/               # App configuration, themes, constants
│   ├── features/
│   │   ├── auth/           # Authentication screens & logic
│   │   ├── dashboard/      # Main dashboard & analytics
│   │   ├── roadmap/        # AI roadmap generation
│   │   ├── projects/       # Project recommendation engine
│   │   ├── portfolio/      # Portfolio generator
│   │   └── readiness/      # Internship readiness score
│   ├── shared/             # Shared widgets and utilities
│   └── main.dart
├── backend/
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   ├── ai/             # AI orchestration layer
│   │   └── models/         # Data models
│   └── package.json
├── docs/                   # Documentation & architecture diagrams
└── README.md
```

---

##  Roadmap

### Phase 1 — Foundation *(Current)*
- [x] Project architecture & planning
- [ ] User authentication & onboarding
- [ ] Skill profile creation
- [ ] Basic dashboard UI

### Phase 2 — AI Core
- [ ] AI Career Intelligence Engine
- [ ] Personalized roadmap generation
- [ ] Skill gap analysis
- [ ] "What's next?" assistant

### Phase 3 — Engagement
- [ ] Project Recommendation Engine
- [ ] Internship Readiness Score
- [ ] Progress tracking & streaks
- [ ] Smart notification system

### Phase 4 — Polish & Launch
- [ ] Portfolio Generator
- [ ] LinkedIn / GitHub integration
- [ ] App Store & Play Store launch
- [ ] Analytics & performance monitoring

---

##  Contributing

Contributions are welcome! CareerForge is built for students, by students.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
---

##  License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

##  Author

**Chamethya Yasodie**
- GitHub:https://github.com/chamethyaY 
- LinkedIn: https://www.linkedin.com/in/chamethya-yasodie-a8278a349/

---
