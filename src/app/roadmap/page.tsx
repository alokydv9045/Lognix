"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { RoadmapGraph } from "@/components/roadmap/RoadmapGraph";
import { TopicDetailModal } from "@/components/roadmap/TopicDetailModal";
import { ROADMAP_MODULES } from "@/constants/roadmap";
import { RoadmapTopic } from "@/types";
import { Map, Sparkles } from "lucide-react";

export default function RoadmapPage() {
  const [selectedTopic, setSelectedTopic] = useState<RoadmapTopic | null>(null);

  return (
    <AppShell>
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--nm-foreground)] flex items-center gap-2.5">
              <Map className="w-7 h-7 text-[var(--primary)]" />
              DSA Mastery Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-[var(--nm-muted-foreground)] mt-1">
              A comprehensive, sequential 15-module path designed to build rock-solid algorithmic logic.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--primary)] font-bold px-3 py-1.5 rounded-full nm-pressed-sm">
            <Sparkles className="w-3.5 h-3.5" /> 3 of 15 Modules Completed
          </div>
        </div>

        {/* Roadmap Node Visualizer */}
        <RoadmapGraph
          modules={ROADMAP_MODULES}
          onSelectTopic={(topic) => setSelectedTopic(topic)}
        />

        {/* Modal Drawer for Topic Details */}
        <TopicDetailModal
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
        />
      </div>
    </AppShell>
  );
}
