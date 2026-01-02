"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { MovingBorder } from "./moving-border";

export function CurrentRoleCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl p-[1px]",
        className
      )}
    >
      <div className="absolute inset-0">
        <MovingBorder duration={4000} rx="12px" ry="12px">
          <div className="h-20 w-20 bg-[radial-gradient(var(--primary)_40%,transparent_60%)] opacity-[0.8]" />
        </MovingBorder>
      </div>
      <div className="relative rounded-xl border border-primary/20 bg-background/80 backdrop-blur-sm p-6">
        {children}
      </div>
    </div>
  );
}

export function PulsingDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-3 w-3", className)}>
      <motion.span
        className="absolute inline-flex h-full w-full rounded-full bg-primary"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.75, 0, 0.75],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
    </span>
  );
}
