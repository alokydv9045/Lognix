"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/providers/AuthContext";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { TopicProgressList } from "@/components/dashboard/TopicProgressList";
import { RecentSubmissionsTable } from "@/components/dashboard/RecentSubmissionsTable";
import { NmCard } from "@/components/ui/NmCard";
import { NmButton } from "@/components/ui/NmButton";
import { Play, Sparkles, Terminal, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <AppShell>
      <div className="space-y-6 animate-fadeIn">
        {/* Welcome & Daily Challenge Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 p-6 rounded-3xl nm-flat border border-[var(--nm-border)] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full nm-pressed-sm text-xs font-mono text-[var(--primary)] font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Active Session Telemetry
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--nm-foreground)]">
                Welcome back, {user?.name ?? "Developer"}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--nm-muted-foreground)] mt-2 max-w-xl leading-relaxed">
                You are currently on a 14-day algorithm streak. 28 problems solved this week. Pick up your next daily challenge below.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/problems/two-sum">
                <NmButton variant="primary" size="md" className="gap-2">
                  <Play className="w-4 h-4 fill-current" />
                  Continue Learning
                </NmButton>
              </Link>
              <Link href="/roadmap">
                <NmButton variant="raised" size="md">
                  View Roadmap
                </NmButton>
              </Link>
            </div>
          </div>

          {/* Daily Challenge Card */}
          <div className="p-6 rounded-3xl nm-flat border border-[var(--nm-border)] flex flex-col justify-between bg-[var(--primary-container)]/10">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--primary)]">
                  Daily Challenge
                </span>
                <span className="text-xs font-mono font-bold text-[var(--diff-medium)] px-2 py-0.5 rounded-full nm-pressed-sm">
                  Medium
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--nm-foreground)] mt-3">
                Maximum Subarray
              </h3>
              <p className="text-xs text-[var(--nm-muted-foreground)] mt-1.5 leading-relaxed">
                Find the contiguous subarray with the largest sum using Kadane&apos;s O(N) dynamic programming pattern.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[var(--nm-border)] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[var(--accent-orange)]">
                +50 XP Points
              </span>
              <Link href="/problems/maximum-subarray">
                <NmButton variant="primary" size="sm" className="gap-1.5 text-xs">
                  Solve Challenge <ArrowRight className="w-3.5 h-3.5" />
                </NmButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Top-Level KPI Summary */}
        <KpiCards user={user} />

        {/* Analytics Charts & Topic Mastery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <ActivityChart />
          </div>
          <div className="lg:col-span-5">
            <TopicProgressList />
          </div>
        </div>

        {/* Submissions Stream */}
        <RecentSubmissionsTable />
      </div>
    </AppShell>
  );
}
