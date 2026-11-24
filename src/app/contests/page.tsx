"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Trophy, Clock, Users, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { NmButton } from "@/components/ui/NmButton";
import { SpotlightCard } from "@/components/animations/SpotlightCard";

interface Contest {
  id: string;
  title: string;
  type: "Weekly" | "Biweekly" | "Championship";
  status: "active" | "upcoming" | "ended";
  startTime: string;
  duration: string;
  participants: number;
  prizePool: string;
  problemsCount: number;
}

const CONTESTS: Contest[] = [
  {
    id: "contest-104",
    title: "Lognix Weekly Contest 104",
    type: "Weekly",
    status: "active",
    startTime: "Live Now (ends in 1h 24m)",
    duration: "90 Mins",
    participants: 4120,
    prizePool: "$1,500 + Swag",
    problemsCount: 4,
  },
  {
    id: "contest-105",
    title: "Lognix Biweekly Contest 48",
    type: "Biweekly",
    status: "upcoming",
    startTime: "Saturday, 8:00 PM IST",
    duration: "120 Mins",
    participants: 2890,
    prizePool: "$2,000",
    problemsCount: 4,
  },
  {
    id: "contest-106",
    title: "Spring Code Championship 2026",
    type: "Championship",
    status: "upcoming",
    startTime: "Next Sunday, 6:00 PM IST",
    duration: "180 Mins",
    participants: 8400,
    prizePool: "$10,000 + FAANG Referrals",
    problemsCount: 5,
  },
  {
    id: "contest-103",
    title: "Lognix Weekly Contest 103",
    type: "Weekly",
    status: "ended",
    startTime: "Ended 2 days ago",
    duration: "90 Mins",
    participants: 5210,
    prizePool: "$1,500",
    problemsCount: 4,
  },
];

export default function ContestsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "upcoming" | "ended">("all");
  const [registered, setRegistered] = useState<Record<string, boolean>>({});

  const filteredContests = CONTESTS.filter((c) => {
    if (activeTab === "all") return true;
    return c.status === activeTab;
  });

  const handleRegister = (id: string) => {
    setRegistered((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <AppShell>
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--nm-foreground)] flex items-center gap-2.5">
              <Trophy className="w-7 h-7 text-[var(--accent-gold)]" />
              Algorithmic Contests
            </h1>
            <p className="text-xs sm:text-sm text-[var(--nm-muted-foreground)] mt-1">
              Compete in real-time, test your problem-solving speed, and climb the global ELO rating ladder.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--primary)] font-bold px-3 py-1.5 rounded-full bg-[var(--nm-surface-sunken)] border border-[var(--nm-border)]">
            <Sparkles className="w-3.5 h-3.5" /> Next Live Contest in 2h
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[var(--nm-surface-sunken)] border border-[var(--nm-border)] w-fit">
          {(["all", "active", "upcoming", "ended"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-xl capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-[var(--nm-surface)] text-[var(--primary)] font-bold border border-[var(--nm-border)] shadow-sm"
                  : "text-[var(--nm-muted-foreground)] hover:text-[var(--nm-foreground)]"
              }`}
            >
              {tab === "all" ? "All Contests" : tab}
            </button>
          ))}
        </div>

        {/* Contests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredContests.map((contest) => {
            const isLive = contest.status === "active";
            const isUpcoming = contest.status === "upcoming";
            const isRegistered = registered[contest.id];

            return (
              <SpotlightCard
                key={contest.id}
                spotlightColor={isLive ? "rgba(34, 197, 94, 0.2)" : "rgba(234, 179, 8, 0.15)"}
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
                        isLive
                          ? "bg-[var(--diff-easy-bg)] text-[var(--diff-easy)] border border-[var(--diff-easy)]/30 animate-pulse"
                          : isUpcoming
                          ? "bg-[var(--diff-medium-bg)] text-[var(--diff-medium)] border border-[var(--diff-medium)]/30"
                          : "bg-[var(--nm-surface-sunken)] text-[var(--nm-muted-foreground)] border border-[var(--nm-border)]"
                      }`}
                    >
                      {isLive && <span className="w-2 h-2 rounded-full bg-[var(--diff-easy)]" />}
                      {contest.status}
                    </span>
                    <span className="text-xs font-mono font-bold text-[var(--accent-gold)]">
                      {contest.prizePool}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--nm-foreground)]">
                    {contest.title}
                  </h3>
                  <p className="text-xs text-[var(--nm-muted-foreground)] font-mono mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {contest.startTime} • {contest.duration}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-xs font-mono text-[var(--nm-muted-foreground)]">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> {contest.participants.toLocaleString()} joined
                    </span>
                    <span>•</span>
                    <span>{contest.problemsCount} Problems</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--nm-border)] flex items-center justify-between">
                  {isLive ? (
                    <Link href="/problems/two-sum" className="w-full">
                      <NmButton variant="primary" size="sm" className="w-full gap-2">
                        Enter Live Contest Room <ArrowRight className="w-3.5 h-3.5" />
                      </NmButton>
                    </Link>
                  ) : isUpcoming ? (
                    <NmButton
                      variant={isRegistered ? "raised" : "primary"}
                      size="sm"
                      onClick={() => handleRegister(contest.id)}
                      className="w-full gap-2"
                    >
                      {isRegistered ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" /> Registered (Reminder Set)
                        </>
                      ) : (
                        "Register for Contest"
                      )}
                    </NmButton>
                  ) : (
                    <Link href="/problems" className="w-full">
                      <NmButton variant="raised" size="sm" className="w-full">
                        View Past Problems & Scoreboard
                      </NmButton>
                    </Link>
                  )}
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
