"use client";

import React, { useState } from "react";
import { Problem } from "@/types";
import { NmBadge } from "../ui/NmBadge";
import { Lightbulb, ChevronDown, ChevronRight, BookOpen, MessageSquare, CheckCircle2 } from "lucide-react";

export function ProblemDescription({ problem }: { problem: Problem }) {
  const [activeTab, setActiveTab] = useState<"description" | "editorial" | "discussion">("description");
  const [openHints, setOpenHints] = useState<Record<number, boolean>>({});

  const toggleHint = (idx: number) => {
    setOpenHints((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="h-full flex flex-col rounded-2xl nm-flat overflow-hidden border border-[var(--nm-border)]">
      {/* Tab Header */}
      <div className="flex items-center gap-1.5 p-2 border-b border-[var(--nm-border)] bg-[var(--nm-surface-sunken)]/20">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === "description"
              ? "nm-flat text-[var(--primary)] font-bold"
              : "text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)]"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("editorial")}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === "editorial"
              ? "nm-flat text-[var(--primary)] font-bold"
              : "text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)]"
          }`}
        >
          Editorial
        </button>
        <button
          onClick={() => setActiveTab("discussion")}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === "discussion"
              ? "nm-flat text-[var(--primary)] font-bold"
              : "text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)]"
          }`}
        >
          Discussions
        </button>
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {activeTab === "description" && (
          <>
            {/* Title & Metadata */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-mono font-bold text-[var(--nm-muted-foreground)]">
                  #{problem.id}
                </span>
                <NmBadge difficulty={problem.difficulty}>{problem.difficulty}</NmBadge>
                <span className="text-xs font-mono text-[var(--nm-muted-foreground)]">
                  Acceptance: {problem.acceptanceRate}%
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--nm-foreground)]">
                {problem.title}
              </h1>
            </div>

            {/* Description Body */}
            <div className="text-xs sm:text-sm text-[var(--nm-foreground)] leading-relaxed space-y-3 whitespace-pre-line">
              {problem.description}
            </div>

            {/* Examples */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--nm-muted-foreground)]">
                Example Cases
              </h3>
              {problem.testCases.map((tc, idx) => (
                <div key={tc.id} className="p-3.5 rounded-xl nm-pressed text-xs font-mono space-y-1.5">
                  <p className="font-bold text-[var(--primary)]">Example {idx + 1}:</p>
                  <p className="text-[var(--nm-foreground)]">
                    <strong className="text-[var(--nm-muted-foreground)]">Input: </strong>
                    {tc.input}
                  </p>
                  <p className="text-[var(--nm-foreground)]">
                    <strong className="text-[var(--nm-muted-foreground)]">Expected Output: </strong>
                    {tc.expectedOutput}
                  </p>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--nm-muted-foreground)]">
                Constraints
              </h3>
              <ul className="list-disc list-inside space-y-1 text-xs font-mono text-[var(--nm-muted-foreground)]">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Hints Accordion */}
            {problem.hints.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[var(--nm-border)]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--nm-muted-foreground)] flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  Hints & Insights
                </h3>
                {problem.hints.map((hint, idx) => {
                  const isOpen = !!openHints[idx];
                  return (
                    <div key={idx} className="rounded-xl border border-[var(--nm-border)] overflow-hidden">
                      <button
                        onClick={() => toggleHint(idx)}
                        className="w-full p-2.5 flex items-center justify-between text-xs font-semibold text-[var(--nm-foreground)] hover:bg-[var(--nm-surface-sunken)] text-left cursor-pointer transition-colors"
                      >
                        <span>Hint {idx + 1}</span>
                        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </button>
                      {isOpen && (
                        <div className="p-3 text-xs text-[var(--nm-muted-foreground)] bg-[var(--nm-surface-sunken)]/50 border-t border-[var(--nm-border)] leading-relaxed">
                          {hint}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {activeTab === "editorial" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[var(--nm-foreground)] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--primary)]" />
              Approach & Complexity Analysis
            </h3>
            <p className="text-xs text-[var(--nm-muted-foreground)] leading-relaxed">
              For {problem.title}, optimal performance is achieved using a hash lookup or two-pointer technique.
            </p>
            <div className="p-3 rounded-xl nm-pressed text-xs font-mono space-y-1 text-[var(--nm-foreground)]">
              <p>• Time Complexity: <strong>O(N)</strong> one-pass traversal</p>
              <p>• Space Complexity: <strong>O(N)</strong> auxiliary hash map</p>
            </div>
          </div>
        )}

        {activeTab === "discussion" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[var(--nm-foreground)] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[var(--accent-blue)]" />
              Developer Discussion
            </h3>
            <div className="p-4 rounded-xl nm-pressed text-xs text-[var(--nm-muted-foreground)]">
              Be the first to share your clean Python or C++ solution with the community.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
