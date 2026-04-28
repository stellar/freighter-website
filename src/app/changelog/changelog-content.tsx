"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeSlideUp } from "@/lib/animations";

interface ChangelogEntry {
  version: string;
  date: string;
  platform: "extension" | "mobile";
  title: string;
  changes: string[];
}

export function ChangelogContent({ entries }: { entries: ChangelogEntry[] }) {
  const [filter, setFilter] = useState<"all" | "extension" | "mobile">("all");

  const filtered =
    filter === "all"
      ? entries
      : entries.filter((e) => e.platform === filter);

  return (
    <>
      {/* Filter tabs */}
      <div className="inline-flex bg-bg-elevated rounded-lg p-1 mt-8">
        {(["all", "extension", "mobile"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize cursor-pointer ${
              filter === tab
                ? "bg-bg-hover text-text-primary"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mt-12 relative"
      >
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

        <div className="space-y-8">
          {filtered.map((entry, index) => (
            <motion.div
              key={`${entry.version}-${index}`}
              variants={fadeSlideUp}
              className="relative pl-8"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-accent bg-bg-primary" />

              <div className="bg-bg-elevated rounded-xl border border-border p-6">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-xs font-mono bg-accent/10 text-accent px-2 py-1 rounded">
                    v{entry.version}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider bg-bg-hover text-text-tertiary px-2 py-1 rounded">
                    {entry.platform}
                  </span>
                  <span className="text-sm text-text-tertiary">
                    {entry.date}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {entry.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {entry.changes.map((change, i) => (
                    <li
                      key={i}
                      className="text-sm text-text-secondary flex items-start gap-2"
                    >
                      <span className="text-accent mt-1.5 shrink-0">
                        &bull;
                      </span>
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
