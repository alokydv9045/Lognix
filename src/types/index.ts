export type Difficulty = "Easy" | "Medium" | "Hard";

export type ExecutionStatus =
  | "AC" // Accepted
  | "WA" // Wrong Answer
  | "TLE" // Time Limit Exceeded
  | "MLE" // Memory Limit Exceeded
  | "CE" // Compilation Error
  | "RE" // Runtime Error
  | "RUNNING"
  | "IDLE";

export type SupportedLanguage = "python" | "cpp" | "java" | "javascript";

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  isCustom?: boolean;
  passed?: boolean;
}

export interface Problem {
  id: number;
  slug: string;
  title: string;
  difficulty: Difficulty;
  acceptanceRate: number;
  category: string;
  tags: string[];
  companies: string[];
  solved: boolean;
  bookmarked: boolean;
  description: string;
  constraints: string[];
  hints: string[];
  starterCode: Record<SupportedLanguage, string>;
  testCases: TestCase[];
}

export interface Submission {
  id: string;
  problemId: number;
  problemTitle: string;
  status: ExecutionStatus;
  language: SupportedLanguage;
  runtimeMs: number;
  memoryKb: number;
  code: string;
  timestamp: string;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  status: "locked" | "available" | "in_progress" | "completed";
  estimatedHours: number;
  totalProblems: number;
  completedProblems: number;
  prerequisites: string[];
  subtopics: string[];
  problemSlugs: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl?: string;
  streakDays: number;
  solvedCount: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalAvailable: number;
}

export type UIState = "loading" | "success" | "empty" | "error" | "disabled" | "unauthorized";
