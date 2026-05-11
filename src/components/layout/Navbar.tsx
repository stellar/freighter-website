"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/animations";
import { LINKS } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Docs", href: LINKS.docs, external: true },
  { label: "Github", href: "https://github.com/stellar/freighter", external: true },
  { label: "Changelog", href: "/changelog", external: false },
  { label: "Feedback", href: LINKS.feedback, external: true },
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
      <div className="relative mx-auto flex w-full max-w-[1024px] items-center justify-between p-3">
        <Link href="/" className="logo-glow relative ml-3 size-10 shrink-0 overflow-hidden rounded-[9px] bg-[#5842c3]">
          <Image
            src="/images/freighter-icon.png"
            alt="Freighter"
            width={245}
            height={100}
            priority
            className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          />
        </Link>

        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-4 sm:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="text-sm font-medium leading-5 text-[#ededed] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <a
          href={LINKS.chromeExtension}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#e8e8e8] px-4 py-2 text-base font-semibold text-[#171717] transition-colors duration-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
        >
          Download
        </a>
      </div>
    </motion.nav>
  );
}
