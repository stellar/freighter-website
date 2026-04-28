"use client";

import { motion } from "framer-motion";
import { fadeSlideUp } from "@/lib/animations";
import { clsx } from "clsx";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowCard({ children, className }: GlowCardProps) {
  return (
    <motion.div
      variants={fadeSlideUp}
      className={clsx(
        "group relative bg-bg-elevated border border-border rounded-2xl p-8 transition-all duration-300 hover:border-border-hover",
        className
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
