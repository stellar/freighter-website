"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LINKS } from "@/lib/constants";

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
      className="relative z-50 h-16"
    >
      <div className="max-w-[1024px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <div className="logo-glow relative size-10 rounded-[9px] overflow-hidden bg-[#5842c3]">
            <Image
              src="/images/freighter-icon.png"
              alt="Freighter"
              width={245}
              height={100}
              priority
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none pointer-events-none"
            />
          </div>
        </Link>

        {/* Download button — hidden on mobile */}
        <a
          href={LINKS.chromeExtension}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-200"
        >
          Download
        </a>
      </div>
    </motion.nav>
  );
}
