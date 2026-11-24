import React from "react";
import { UserProfile } from "@/types";
import { Flame, CheckCircle, Award, Target } from "lucide-react";
import { NmCard } from "../ui/NmCard";

export function KpiCards({ user }: { user: UserProfile | null }) {
  const solved = user?.solvedCount ?? 142;
  const total = user?.totalAvailable ?? 450;
  const percentage = Math.round((solved / total) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Solved Card */}
      <NmCard variant="raised" className="flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold tracking-wider text-[var(--nm-muted-foreground)] uppercase">
            Total Solved
          </span>
          <div className="w-8 h-8 rounded-lg nm-pressed flex items-center justify-center text-[var(--primary)]">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-[var(--nm-foreground)]">
              {solved}
            </span>
            <span className="text-xs font-mono text-[var(--nm-muted-foreground)]">
              / {total} ({percentage}%)
            </span>
          </div>
          {/* Circular/Linear Progress track */}
          <div className="mt-3 h-2 w-full rounded-full bg-[var(--nm-surface-sunken)] nm-pressed-sm overflow-hidden">
            <div
              className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </NmCard>

      {/* Streak Tile */}
      <NmCard variant="raised" className="flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold tracking-wider text-[var(--nm-muted-foreground)] uppercase">
            Active Streak
          </span>
          <div className="w-8 h-8 rounded-lg nm-pressed flex items-center justify-center text-[var(--accent-orange)]">
            <Flame className="w-4 h-4 fill-current text-[var(--accent-orange)]" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-[var(--accent-orange)]">
              {user?.streakDays ?? 14}
            </span>
            <span className="text-xs font-mono text-[var(--nm-muted-foreground)]">
              Days in a row
            </span>
          </div>
          <p className="mt-3 text-xs text-[var(--nm-muted-foreground)] font-mono">
            Best Record: 32 Days
          </p>
        </div>
      </NmCard>

      {/* Difficulty Breakdown */}
      <NmCard variant="raised" className="flex flex-col justify-between sm:col-span-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[var(--nm-muted-foreground)] uppercase">
            Difficulty Distribution
          </span>
          <Award className="w-4 h-4 text-[var(--accent-gold)]" />
        </div>
        <div className="grid grid-cols-3 gap-3 mt-2">
          <div className="p-3 rounded-xl nm-pressed-sm text-center">
            <p className="text-[11px] font-mono font-bold text-[var(--diff-easy)] uppercase">Easy</p>
            <p className="text-xl font-bold font-mono text-[var(--nm-foreground)] mt-0.5">
              {user?.easySolved ?? 76}
            </p>
            <p className="text-[10px] text-[var(--nm-muted-foreground)] font-mono">/ 150</p>
          </div>
          <div className="p-3 rounded-xl nm-pressed-sm text-center">
            <p className="text-[11px] font-mono font-bold text-[var(--diff-medium)] uppercase">Med</p>
            <p className="text-xl font-bold font-mono text-[var(--nm-foreground)] mt-0.5">
              {user?.mediumSolved ?? 54}
            </p>
            <p className="text-[10px] text-[var(--nm-muted-foreground)] font-mono">/ 220</p>
          </div>
          <div className="p-3 rounded-xl nm-pressed-sm text-center">
            <p className="text-[11px] font-mono font-bold text-[var(--diff-hard)] uppercase">Hard</p>
            <p className="text-xl font-bold font-mono text-[var(--nm-foreground)] mt-0.5">
              {user?.hardSolved ?? 12}
            </p>
            <p className="text-[10px] text-[var(--nm-muted-foreground)] font-mono">/ 80</p>
          </div>
        </div>
      </NmCard>
    </div>
  );
}
