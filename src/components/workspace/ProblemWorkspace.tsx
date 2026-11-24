"use client";

import React, { useState, useEffect } from "react";
import { Problem, SupportedLanguage, ExecutionStatus } from "@/types";
import { ProblemDescription } from "./ProblemDescription";
import { MonacoEditorPane } from "./MonacoEditorPane";
import { TestCaseRunner } from "./TestCaseRunner";
import { DynamicIslandStatus } from "../animations/DynamicIslandStatus";

interface ProblemWorkspaceProps {
  problem: Problem;
}

export function ProblemWorkspace({ problem }: ProblemWorkspaceProps) {
  const [language, setLanguage] = useState<SupportedLanguage>("python");
  const [code, setCode] = useState<string>(problem.starterCode.python);
  const [executionStatus, setExecutionStatus] = useState<ExecutionStatus>("IDLE");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [executionResult, setExecutionResult] = useState<{
    status: ExecutionStatus;
    runtimeMs?: number;
    memoryKb?: number;
    output?: string;
    expected?: string;
    errorMsg?: string;
  } | null>(null);

  // Sync starter code when language changes
  useEffect(() => {
    setCode(problem.starterCode[language] || "");
  }, [language, problem]);

  const handleResetCode = () => {
    setCode(problem.starterCode[language] || "");
    setExecutionResult(null);
  };

  const handleRunCode = async (customInput?: string) => {
    setExecutionStatus("RUNNING");
    setExecutionResult(null);

    await new Promise((res) => setTimeout(res, 850));

    const isSuccess =
      code.includes("return") &&
      (code.includes("lookup") || code.includes("res") || code.includes("max"));

    setExecutionStatus(isSuccess ? "AC" : "WA");
    setExecutionResult({
      status: isSuccess ? "AC" : "WA",
      runtimeMs: Math.floor(Math.random() * 40) + 35,
      memoryKb: Math.floor(Math.random() * 2000) + 16500,
      output: isSuccess
        ? problem.testCases[0].expectedOutput
        : "[0, 0] (Failed to match target)",
      expected: problem.testCases[0].expectedOutput,
      errorMsg: isSuccess ? undefined : "Output does not match expected test output.",
    });
  };

  const handleSubmitSolution = async () => {
    setExecutionStatus("RUNNING");
    setExecutionResult(null);

    await new Promise((res) => setTimeout(res, 1200));

    const isSuccess = code.includes("return") && code.length > 50;
    setExecutionStatus(isSuccess ? "AC" : "WA");
    setExecutionResult({
      status: isSuccess ? "AC" : "WA",
      runtimeMs: Math.floor(Math.random() * 50) + 38,
      memoryKb: 17400,
      output: isSuccess
        ? "All 3/3 Test Cases Passed Successfully!"
        : "Test Case 2 Failed: Output mismatch.",
      expected: problem.testCases[0].expectedOutput,
    });
  };

  return (
    <div
      className={`w-full transition-all ${
        isFullScreen ? "fixed inset-0 z-50 p-3 bg-[var(--nm-bg)]" : "h-[calc(100vh-6.5rem)]"
      }`}
    >
      {/* Skiper-UI Style Dynamic Island Floating Status */}
      <DynamicIslandStatus
        status={executionStatus}
        runtimeMs={executionResult?.runtimeMs}
        memoryKb={executionResult?.memoryKb}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
        {/* Left Specification Column */}
        <div className="lg:col-span-5 h-[400px] lg:h-full">
          <ProblemDescription problem={problem} />
        </div>

        {/* Right Coding & Test Runner Column */}
        <div className="lg:col-span-7 flex flex-col gap-4 h-[650px] lg:h-full">
          {/* Top Monaco Editor Pane */}
          <div className="flex-1 min-h-[350px]">
            <MonacoEditorPane
              code={code}
              onChange={setCode}
              language={language}
              onLanguageChange={setLanguage}
              onResetCode={handleResetCode}
              isFullScreen={isFullScreen}
              onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
            />
          </div>

          {/* Bottom Test Case Runner Pane */}
          <div className="h-64 shrink-0">
            <TestCaseRunner
              testCases={problem.testCases}
              onRunCode={handleRunCode}
              onSubmitSolution={handleSubmitSolution}
              executionStatus={executionStatus}
              executionResult={executionResult}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
