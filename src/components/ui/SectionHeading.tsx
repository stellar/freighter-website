"use client";

import { motion } from "framer-motion";
import { fadeSlideUp } from "@/lib/animations";
import { clsx } from "clsx";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export function SectionHeading({
  badge,
  title,
  description,
  center = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeSlideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={clsx(center && "text-center")}
    >
      {badge && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary tracking-tight">
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "text-lg text-text-secondary mt-4 max-w-2xl",
            center && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
