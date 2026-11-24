"use client";

import React from "react";
import { RoadmapTopic } from "@/types";
import { CheckCircle2, Lock, Play, Clock } from "lucide-react";
import { NmBadge } from "../ui/NmBadge";
import { NmButton } from "../ui/NmButton";
import { SpotlightCard } from "../animations/SpotlightCard";
import { AnimatedBeam } from "../animations/AnimatedBeam";

interface RoadmapGraphProps {
  modules: RoadmapTopic[];
  onSelectTopic: (topic: RoadmapTopic) => void;
}

export function RoadmapGraph({ modules, onSelectTopic }: RoadmapGraphProps) {
  return (
    <div className="space-y-6">
      {/* Visual Timeline Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {modules.map((topic, idx) => {
          const isCompleted = topic.status === "completed";
          const isInProgress = topic.status === "in_progress";
          const isLocked = topic.status === "locked";
          const percentage = Math.round(
            (topic.completedProblems / topic.totalProblems) * 100
          );

          return (
            <SpotlightCard
              key={topic.id}
              className={`p-6 flex flex-col justify-between transition-all duration-200 relative overflow-hidden group hover:translate-y-[-2px] ${
                isLocked ? "opacity-70" : ""
              }`}
            >
              <div>
                {/* Node Top Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <span className="w-6 h-6 rounded-lg bg-[var(--diff-easy-bg)] text-[var(--diff-easy)] flex items-center justify-center font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    ) : isLocked ? (
                      <span className="w-6 h-6 rounded-lg bg-[var(--nm-surface-sunken)] text-[var(--nm-muted-foreground)] flex items-center justify-center border border-[var(--nm-border)]">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="w-6 h-6 rounded-lg bg-[var(--accent-orange)]/15 text-[var(--accent-orange)] flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </span>
                    )}
                    <span className="text-xs font-mono font-bold text-[var(--nm-muted-foreground)]">
                      Module {idx + 1}
                    </span>
                  </div>

                  <NmBadge difficulty={topic.difficulty}>{topic.difficulty}</NmBadge>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-extrabold text-[var(--nm-foreground)] group-hover:text-[var(--primary)] transition-colors">
                  {topic.title}
                </h3>
                <p className="text-xs text-[var(--nm-muted-foreground)] mt-2 leading-relaxed">
                  {topic.description}
                </p>

                {/* Sub-skills Preview */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {topic.subtopics.slice(0, 3).map((sub, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[var(--nm-surface-sunken)] border border-[var(--nm-border)] text-[var(--nm-muted-foreground)]"
                    >
                      {sub}
                    </span>
                  ))}
                  {topic.subtopics.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--nm-muted-foreground)]">
                      +{topic.subtopics.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress & Trigger Action */}
              <div className="mt-6 pt-4 border-t border-[var(--nm-border)] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--nm-muted-foreground)] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {topic.estimatedHours} hrs
                  </span>
                  <span className="font-bold text-[var(--nm-foreground)]">
                    {topic.completedProblems}/{topic.totalProblems} Solved ({percentage}%)
                  </span>
                </div>

                {/* Track */}
                <div className="h-1.5 w-full rounded-full bg-[var(--nm-surface-sunken)] border border-[var(--nm-border)] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCompleted ? "bg-[var(--primary)]" : "bg-[var(--accent-orange)]"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <NmButton
                  variant={
                    isCompleted
                      ? "raised"
                      : isInProgress
                      ? "primary"
                      : isLocked
                      ? "ghost"
                      : "raised"
                  }
                  size="sm"
                  onClick={() => onSelectTopic(topic)}
                  disabled={isLocked}
                  className="w-full text-xs mt-1"
                >
                  {isCompleted
                    ? "Review Concepts"
                    : isInProgress
                    ? "Continue Module"
                    : isLocked
                    ? "Prerequisites Locked"
                    : "Start Module"}
                </NmButton>
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* Animmaster Style Animated Pulse Beam */}
      <AnimatedBeam className="my-8" />
    </div>
  );
}
