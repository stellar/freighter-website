"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeSlideUp, EASE_OUT } from "@/lib/animations";
import { LINKS } from "@/lib/constants";
import { AppleLogoFill, AndroidLogoFill } from "@/components/ui/PhosphorIcons";
import { IridescenceBackground } from "@/components/ui/IridescenceBackground";

const springTransition = { type: "spring" as const, stiffness: 300, damping: 20 };

const HERO_NAV_LINKS = [
  { label: "Docs", href: LINKS.docs, external: true },
  { label: "Github", href: "https://github.com/stellar/freighter", external: true },
  { label: "Changelog", href: "/changelog", external: false },
  { label: "Feedback", href: LINKS.feedback, external: true },
] as const;

type PhoneId = "left" | "middle" | "right";

const PHONES: { id: PhoneId; src: string; alt: string }[] = [
  { id: "left", src: "/images/swap.png", alt: "Freighter swap" },
  { id: "middle", src: "/images/discover-phone.png", alt: "Freighter wallet" },
  { id: "right", src: "/images/discover.png", alt: "Freighter discover" },
];

function PhoneMockups() {
  const [hovered, setHovered] = useState<PhoneId | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const yFor = (id: PhoneId) => (hovered === id ? -18 : 0);

  return (
    <div className="absolute left-1/2 top-[340px] sm:top-[520px] lg:top-[540px] z-10 flex -translate-x-1/2 items-start justify-center gap-4 sm:gap-6 lg:gap-8 pointer-events-none">
      {PHONES.map((phone, i) => (
        <motion.div
          key={phone.id}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: yFor(phone.id) }}
          transition={
            entered
              ? springTransition
              : { delay: 0.55 + i * 0.1, duration: 0.7, ease: EASE_OUT }
          }
          onMouseEnter={() => setHovered(phone.id)}
          onMouseLeave={() => setHovered(null)}
          onContextMenu={(event) => event.preventDefault()}
          className="pointer-events-auto w-[220px] lg:w-[300px] xl:w-[330px] aspect-[330/717] select-none rounded-[16px] bg-zinc-800 shadow-[0px_24px_24px_4px_rgba(0,0,0,0.25)] overflow-hidden cursor-default shrink-0"
        >
          <Image
            src={phone.src}
            alt={phone.alt}
            width={330}
            height={717}
            priority
            draggable={false}
            sizes="(max-width: 1024px) 220px, (max-width: 1280px) 300px, 330px"
            className="w-full h-full select-none object-cover pointer-events-none"
          />
        </motion.div>
      ))}
    </div>
  );
}

function HeroNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: EASE_OUT }}
      className="absolute left-1/2 top-3 z-30 flex w-[min(calc(100%-32px),720px)] -translate-x-1/2 items-center justify-between rounded-full bg-transparent p-3 sm:bg-[#181818]"
      aria-label="Primary navigation"
    >
      <Link href="/" className="logo-glow relative ml-3 size-10 shrink-0 overflow-hidden rounded-[9px] bg-[#5842c3] ring-2 ring-white/10 sm:ring-0">
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
        {HERO_NAV_LINKS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="text-sm font-medium leading-5 text-text-secondary transition-colors duration-200 hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <a
        href="#download"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#e8e8e8] px-4 py-2 text-base font-semibold text-[#171717] transition-colors duration-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
      >
        Download
      </a>
    </motion.nav>
  );
}

export function HeroSection() {
  return (
    <section className="px-6 py-6">
      <motion.div
        variants={fadeSlideUp}
        initial="hidden"
        animate="visible"
        className="relative mx-auto h-[100vh] min-h-[600px] max-h-[700px] w-full overflow-hidden rounded-[24px] bg-[#7B68FF] sm:min-h-[960px] sm:max-h-[1000px]"
      >
        <IridescenceBackground />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.16),transparent_34%),linear-gradient(180deg,rgba(9,9,11,0.04),rgba(9,9,11,0.2))]" />

        <HeroNav />

        <div className="relative z-20 flex flex-col items-center gap-6 px-6 pt-[120px] sm:pt-[208px] lg:pt-[225px]">
          <motion.h1
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="shimmer-text max-w-[760px] text-center text-3xl font-medium leading-[1.17] tracking-[-0.04em] text-[#ededed] sm:text-4xl lg:text-[48px] lg:leading-[56px]"
          >
            Browse, connect, and use Stellar apps - all in one place
          </motion.h1>
          <motion.div
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="flex flex-row items-center gap-3"
          >
            <a
              href={LINKS.iosApp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#2a2a2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
            >
              <AppleLogoFill size={18} className="shrink-0" />
              Get iOS
            </a>
            <a
              href={LINKS.androidApp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#2a2a2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
            >
              <AndroidLogoFill size={18} className="shrink-0" />
              Get Android
            </a>
          </motion.div>
        </div>

        <PhoneMockups />
      </motion.div>
    </section>
  );
}
