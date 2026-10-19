"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/animations";
import { LINKS } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Docs", href: LINKS.docs, external: true },
  { label: "GitHub", href: "https://github.com/stellar/freighter", external: true },
  { label: "Changelog", href: "/changelog", external: false },
  { label: "Support", href: LINKS.support, external: true },
] as const;

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: EASE_OUT }}
      className="relative z-50 px-6 pt-5"
      aria-label="Primary navigation"
    >
      <div className="relative mx-auto flex w-full max-w-[1024px] items-center justify-between py-3">
        <Link href="/" className="relative flex h-8 shrink-0 items-center">
          <Image
            src="/images/varial-logo.svg"
            alt="Varial"
            width={117}
            height={32}
            priority
            className="h-8 w-auto pointer-events-none"
          />
        </Link>

        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full bg-white p-1 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_0_0_1px_#F3F3F3] sm:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="rounded-full px-4 py-2 text-sm font-medium leading-5 text-text-primary transition-colors duration-200 hover:bg-[#F3F3F3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/70"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <a
          href={LINKS.chromeExtension}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#171717] px-5 py-2 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#2a2a2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/70"
        >
          Download
        </a>
      </div>
    </motion.nav>
  );
}
