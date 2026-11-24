"use client";

import React from "react";
import Link from "next/link";
import { RoadmapTopic } from "@/types";
import { X, BookOpen, Clock, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { NmBadge } from "../ui/NmBadge";
import { NmButton } from "../ui/NmButton";

interface TopicDetailModalProps {
  topic: RoadmapTopic | null;
  onClose: () => void;
}

export function TopicDetailModal({ topic, onClose }: TopicDetailModalProps) {
  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-3xl nm-flat-lg p-6 border border-[var(--nm-border)] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-xl text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)] hover:bg-[var(--nm-surface-sunken)]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <NmBadge difficulty={topic.difficulty}>{topic.difficulty}</NmBadge>
          <span className="text-xs font-mono text-[var(--nm-muted-foreground)]">
            Est. {topic.estimatedHours} Hours
          </span>
        </div>

        <h2 className="text-xl font-extrabold text-[var(--nm-foreground)]">
          {topic.title}
        </h2>
        <p className="text-xs text-[var(--nm-muted-foreground)] mt-2 leading-relaxed">
          {topic.description}
        </p>

        {/* Core Subtopics */}
        <div className="mt-5 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--nm-muted-foreground)]">
            Key Algorithmic Concepts
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {topic.subtopics.map((sub, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl nm-pressed text-xs text-[var(--nm-foreground)] flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                <span>{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Practice CTA */}
        <div className="mt-6 pt-4 border-t border-[var(--nm-border)] flex items-center justify-between">
          <span className="text-xs font-mono text-[var(--nm-muted-foreground)]">
            {topic.completedProblems}/{topic.totalProblems} Problems Completed
          </span>
          <Link href="/problems" onClick={onClose}>
            <NmButton variant="primary" size="sm" className="gap-1.5">
              Practice Topic Problems <ArrowRight className="w-3.5 h-3.5" />
            </NmButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
