# Lognix – Modern Data Structures & Algorithms Intelligence Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Lognix** is a high-performance, developer-grade Data Structures and Algorithms learning, practice, and interview preparation platform inspired by LeetCode, Codeforces, and modern developer tooling.

---

## 🚀 Key Capabilities

- **Monaco Code Workspace**: Full VS Code editor experience with multi-language support (Python 3, C++ 20, Java 17, JavaScript ES2024), live telemetry bar, custom test case runner, and execution state machine.
- **Structured 15-Module Curriculum**: Sequential, mastery-based roadmap from Programming Fundamentals to 2D Dynamic Programming with interactive topic drawers.
- **Developer Theme System**: Calibrated Light and Dark modes with emerald green accents, crisp borders, and zero visual clutter.
- **Telemetry Analytics Dashboard**: Recharts weekly problem velocity, active streak counter, and topic mastery distribution.
- **Comprehensive Problem Explorer**: Multi-criteria search, topic/difficulty filter chips, bookmark toggling, and pagination.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS v4 & Centralized Design Tokens
- **Icons:** Lucide React
- **Code Editor:** Monaco Editor (`@monaco-editor/react`)
- **Visualizations:** Recharts

---

## 📦 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/alokydv9045/Lognix.git
cd Lognix
npm install
```

### 2. Development Server
Start the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to experience Lognix.

### 3. Production Build
Verify types and generate static production assets:
```bash
npm run build
npm start
```

---

## 📂 Project Architecture

```
src/
├── app/                  # Next.js App Router (18 statically generated pages)
│   ├── dashboard/        # Student Analytics & KPI Mission Control
│   ├── login/            # Developer Authentication & Session Initialization
│   ├── problems/         # Problem Explorer & Filter Matrix
│   │   └── [slug]/       # Monaco Split-Pane Problem Workspace
│   ├── roadmap/          # Visual 15-Module DSA Node Curriculum
│   ├── signup/           # Interactive Registration with Password Strength Meter
│   ├── globals.css       # Global CSS Reset & Theme Tokens
│   ├── layout.tsx        # Root HTML Layout with Theme & Auth Providers
│   └── page.tsx          # High-Converting Marketing Landing Page
├── components/
│   ├── dashboard/        # KPI Cards, Recharts Telemetry, Submissions Table
│   ├── landing/          # Hero, Interactive Code Visualizer, Features, Footer
│   ├── layout/           # AppShell, Collapsible Sidebar, TopNav
│   ├── problems/         # Problem Filters, Data Table, Difficulty Badges
│   ├── roadmap/          # Connected Node Graph, Topic Detail Modal
│   ├── ui/               # Atomic Primitives (Buttons, Cards, Inputs, States)
│   └── workspace/        # Monaco Editor Pane, Test Case Runner, Description
├── constants/            # Curated Problem Database & 15-Module Curriculum
├── providers/            # ThemeProvider (Dark/Light) & AuthContext
├── styles/               # Centralized Design Tokens (tokens.css)
└── types/                # Strict Domain TypeScript Interfaces
```

---

## 🛡️ License

This project is licensed under the MIT License.
