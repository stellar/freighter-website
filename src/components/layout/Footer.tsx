"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SITE, LINKS } from "@/lib/constants";

const footerLinks = [
  { label: "GitHub", href: SITE.github, external: true },
  { label: "Changelog", href: "/changelog" },
  { label: "Feedback", href: LINKS.feedback, external: true },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

const discordLinks = [
  { label: "Stellar Global", href: "https://discord.gg/stellarglobal" },
  { label: "Stellar Developers", href: "https://discord.gg/stellardev" },
];

export function Footer() {
  const [discordOpen, setDiscordOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDiscordOpen(false);
      }
    }
    if (discordOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [discordOpen]);

  return (
    <footer>
      <div className="max-w-[1024px] mx-auto px-6 sm:h-8 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 text-sm font-normal text-text-secondary">
        <p>&copy; 2026 Stellar Development Foundation</p>
        <nav className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {footerLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            )
          )}

          {/* Discord with dropdown */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setDiscordOpen(!discordOpen)}
              className="hover:text-text-primary transition-colors cursor-pointer"
            >
              Discord
            </button>
            <AnimatePresence>
              {discordOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute bottom-full mb-2 right-0 bg-bg-elevated border border-border rounded-lg py-1 min-w-[180px] shadow-lg"
                >
                  {discordLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>
    </footer>
  );
}
