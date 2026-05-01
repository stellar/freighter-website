"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeSlideUp } from "@/lib/animations";

interface ChangelogEntry {
  version: string;
  date: string;
  platform: "extension" | "mobile";
  title: string;
  body: string;
  url: string;
}

function ReleaseBody({ body }: { body: string }) {
  // Split body into lines and render as simple formatted text
  const lines = body.split("\n").filter((l) => l.trim());

  return (
    <div className="mt-3 space-y-1.5 text-sm text-text-secondary">
      {lines.map((line, i) => {
        const trimmed = line.trim();

        // Section headers (## or ###)
        if (trimmed.startsWith("##")) {
          const text = trimmed.replace(/^#+\s*/, "");
          return (
            <p key={i} className="text-text-primary font-medium pt-2 first:pt-0">
              {text}
            </p>
          );
        }

        // List items (- or *)
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const text = trimmed.replace(/^[-*]\s*/, "");
          return (
            <div key={i} className="flex items-start gap-2">
              <span className="text-accent mt-1.5 shrink-0">&bull;</span>
              <span dangerouslySetInnerHTML={{ __html: inlineMarkdown(text) }} />
            </div>
          );
        }

        // Regular text
        if (trimmed) {
          return (
            <p key={i}>
              <span dangerouslySetInnerHTML={{ __html: inlineMarkdown(trimmed) }} />
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}

// Minimal inline markdown: bold, links, code
function inlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-text-primary font-medium">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="text-xs bg-bg-hover px-1 py-0.5 rounded">$1</code>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">$1</a>'
    );
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
            className="relative px-4 py-2 text-sm font-medium rounded-md capitalize cursor-pointer transition-colors"
          >
            {filter === tab && (
              <motion.div
                layoutId="changelog-tab"
                className="absolute inset-0 bg-bg-hover rounded-md"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${filter === tab ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary"}`}>
              {tab}
            </span>
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="mt-12 relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(6px)", y: -8 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {filtered.map((entry, index) => (
                <motion.div
                  key={`${entry.platform}-${entry.version}-${index}`}
                  variants={fadeSlideUp}
                  className="relative pl-8"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-accent bg-bg-primary" />

                  <div className="bg-bg-elevated rounded-xl border border-border p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono bg-accent/10 text-accent px-2 py-1 rounded hover:bg-accent/20 transition-colors"
                      >
                        v{entry.version}
                      </a>
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
                    {entry.body && <ReleaseBody body={entry.body} />}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
