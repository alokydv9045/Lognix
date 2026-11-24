"use client";

import React from "react";
import { motion } from "motion/react";

export function AnimatedBeam({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`relative w-full h-8 flex items-center justify-center overflow-hidden pointer-events-none ${className}`}>
      {/* Background Track */}
      <div className="w-full h-[1px] bg-[var(--nm-border)]" />

      {/* Traveling Light Pulse Beam */}
      <motion.div
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.4,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 -translate-y-1/2 w-32 h-[3px] rounded-full bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent blur-[1px]"
      />
    </div>
  );
}
