"use client";

import React, { useState } from "react";
import { Play, CheckCircle2, RotateCcw, Terminal, Zap } from "lucide-react";
import { NmButton } from "../ui/NmButton";

export function CodeVisualizer() {
  const [isRunning, setIsRunning] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const algorithmSteps = [
    { line: 5, note: "Initialize hash lookup table: map = {}" },
    { line: 6, note: "Iterate: i = 0, num = 2, complement = 9 - 2 = 7. Not in map." },
    { line: 7, note: "Insert: map[2] = 0" },
    { line: 6, note: "Iterate: i = 1, num = 7, complement = 9 - 7 = 2. Found at index 0!" },
    { line: 8, note: "Return indices: [0, 1] — Solution found in O(N) time." }
  ];

  const handleSimulate = () => {
    setIsRunning(true);
    setExecuted(false);
    setActiveStep(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < algorithmSteps.length) {
        setActiveStep(current);
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setExecuted(true);
      }
    }, 700);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-8">
      <div className="rounded-3xl nm-flat p-4 sm:p-6 border border-[var(--nm-border)]">
        {/* Visualizer Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--nm-border)]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--destructive)]" />
            <div className="w-3 h-3 rounded-full bg-[var(--accent-gold)]" />
            <div className="w-3 h-3 rounded-full bg-[var(--primary)]" />
            <span className="ml-2 text-xs font-mono font-bold text-[var(--nm-foreground)]">
              TwoSum_Optimal.py
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded nm-pressed-sm text-[var(--primary)]">
              O(N) Time
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded nm-pressed-sm text-[var(--accent-blue)]">
              O(N) Space
            </span>
            <NmButton
              variant="primary"
              size="sm"
              onClick={handleSimulate}
              isLoading={isRunning}
              className="gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {isRunning ? "Simulating..." : "Run Step-Through"}
            </NmButton>
          </div>
        </div>

        {/* Code Canvas & Telemetry */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Code syntax area */}
          <div className="md:col-span-7 rounded-2xl nm-pressed p-4 font-mono text-xs overflow-x-auto leading-relaxed">
            <pre className="text-[var(--nm-foreground)]">
              <code>
                {`1  class Solution:
2      def twoSum(self, nums: list[int], target: int) -> list[int]:
3          # Hash map complement search
4          lookup = {}
5          for i, num in enumerate(nums):
6              complement = target - num
7              if complement in lookup:
8                  return [lookup[complement], i]
9              lookup[num] = i
10         return []`}
              </code>
            </pre>
          </div>

          {/* Stepper Telemetry Monitor */}
          <div className="md:col-span-5 flex flex-col justify-between rounded-2xl bg-[var(--nm-surface-raised)] p-4 border border-[var(--nm-border)]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[var(--nm-muted-foreground)] uppercase">
                  Telemetry Monitor
                </span>
                <span className="text-xs font-mono font-bold text-[var(--primary)]">
                  Step {activeStep + 1} of {algorithmSteps.length}
                </span>
              </div>
              <div className="p-3 rounded-xl nm-pressed-sm text-xs font-mono text-[var(--nm-foreground)] min-h-[90px] flex items-center">
                <p>{algorithmSteps[activeStep].note}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--nm-border)] flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--nm-muted-foreground)]">Status:</span>
              {executed ? (
                <span className="flex items-center gap-1 text-[var(--primary)] font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Passed [0, 1]
                </span>
              ) : isRunning ? (
                <span className="flex items-center gap-1 text-[var(--accent-orange)] font-bold animate-pulse">
                  <Zap className="w-4 h-4" /> Executing trace...
                </span>
              ) : (
                <span className="text-[var(--nm-muted-foreground)]">Ready</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
