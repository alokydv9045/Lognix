"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ACTIVITY_WEEKLY_DATA } from "@/constants/mockData";
import { NmCard } from "../ui/NmCard";
import { Calendar } from "lucide-react";

export function ActivityChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <NmCard variant="raised" className="h-80 flex items-center justify-center">
        <div className="text-xs font-mono text-[var(--nm-muted-foreground)] animate-pulse">
          Loading telemetry chart...
        </div>
      </NmCard>
    );
  }

  return (
    <NmCard variant="raised" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-[var(--nm-foreground)]">
            Weekly Solving Velocity
          </h3>
          <p className="text-xs text-[var(--nm-muted-foreground)] font-mono">
            Solved vs Attempted submissions
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-[var(--primary)] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]" />
            Solved
          </span>
          <span className="flex items-center gap-1.5 text-[var(--nm-muted-foreground)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--nm-muted-foreground)] opacity-40" />
            Attempts
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ACTIVITY_WEEKLY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis
              dataKey="day"
              stroke="var(--nm-muted-foreground)"
              fontSize={11}
              fontFamily="var(--font-mono)"
              tickLine={false}
            />
            <YAxis
              stroke="var(--nm-muted-foreground)"
              fontSize={11}
              fontFamily="var(--font-mono)"
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--nm-surface)",
                borderColor: "var(--nm-border)",
                borderRadius: "12px",
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
                color: "var(--nm-foreground)",
              }}
            />
            <Bar dataKey="solved" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="attempts" fill="var(--nm-muted-foreground)" opacity={0.25} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </NmCard>
  );
}
