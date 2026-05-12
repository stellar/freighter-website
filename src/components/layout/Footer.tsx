"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { EASE_OUT } from "@/lib/animations";
import { SITE, LINKS } from "@/lib/constants";
import { CaretDownBold } from "@/components/ui/PhosphorIcons";

const footerLinks = [
  { label: "GitHub", href: SITE.github, external: true },
  { label: "Changelog", href: "/changelog" },
  { label: "Feedback", href: LINKS.feedback, external: true },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

const discordLinks = [
  { label: "Stellar Developers", href: "https://discord.gg/stellardev" },
  { label: "Stellar Global", href: "https://discord.gg/stellarglobal" },
];

export function Footer() {
  const [discordOpen, setDiscordOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDiscordMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setDiscordOpen(true);
  };

  const scheduleDiscordMenuClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setDiscordOpen(false);
      closeTimerRef.current = null;
    }, 180);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDiscordOpen(false);
      }
    }
    if (discordOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [discordOpen]);

  return (
    <footer className="mt-8 pb-[72px]">
      <div className="max-w-[1024px] mx-auto px-6 sm:h-8 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-3 text-sm font-normal text-text-secondary">
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
          <div
            ref={menuRef}
            className="relative"
            onMouseEnter={openDiscordMenu}
            onMouseLeave={scheduleDiscordMenuClose}
            onFocus={openDiscordMenu}
          >
            <button
              onClick={() => setDiscordOpen(!discordOpen)}
              className="inline-flex items-center gap-1 hover:text-text-primary transition-colors cursor-pointer"
            >
              <span>Discord</span>
              <CaretDownBold
                size={12}
                className={`transition-transform duration-150 ${discordOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {discordOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15, ease: EASE_OUT }}
                  className="absolute bottom-full left-0 sm:left-auto sm:right-0 z-50 min-w-[180px] pb-2"
                >
                  <div className="rounded-lg border border-white/10 bg-[#1b1b1b] p-1 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
                    {discordLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-white/10 hover:text-text-primary"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>
    </footer>
  );
}
