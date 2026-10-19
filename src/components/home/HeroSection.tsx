"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/animations";
import { LINKS } from "@/lib/constants";
import { AppleLogoFill, AndroidLogoFill } from "@/components/ui/PhosphorIcons";

const springTransition = { type: "spring" as const, stiffness: 300, damping: 20 };

const HERO_NAV_LINKS = [
  { label: "Docs", href: LINKS.docs, external: true },
  { label: "GitHub", href: "https://github.com/stellar/freighter", external: true },
  { label: "Changelog", href: "/changelog", external: false },
  { label: "Support", href: LINKS.support, external: true },
] as const;

const HEADLINE_LEAD = "Your everyday wallet for";
const HEADLINE_TAILS = [
  "Stellar apps",
  "stablecoins",
  "swaps and earning",
  "everything on Stellar",
] as const;
const HEADLINE_INTERVAL_MS = 3400;
/** Per-character stagger of the wipe, like Zoah's hero. */
const WIPE_STEP_MS = 18;
const WIPE_FADE_MS = 260;

/**
 * Hero headline: a fixed lead and a trailing phrase that swaps out one
 * character at a time (each char tints blue and fades, then the next phrase
 * fades back in from blue). The lead slides to keep the line centred.
 */
function RotatingHeadline({ delay }: { delay: number }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  // idle → out (chars wipe away) → in (next phrase mounted hidden) → idle (fades in)
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const firstRef = useRef(true);

  useEffect(() => {
    if (reduced) return;
    let ms: number;
    let next: () => void;
    if (phase === "idle") {
      ms = HEADLINE_INTERVAL_MS + (firstRef.current ? delay * 1000 : 0);
      firstRef.current = false;
      next = () => setPhase("out");
    } else if (phase === "out") {
      ms = HEADLINE_TAILS[index].length * WIPE_STEP_MS + WIPE_FADE_MS;
      next = () => {
        setIndex((i) => (i + 1) % HEADLINE_TAILS.length);
        setPhase("in");
      };
    } else {
      ms = 40; // one paint with the new chars hidden, then let them fade in
      next = () => setPhase("idle");
    }
    const t = setTimeout(next, ms);
    return () => clearTimeout(t);
  }, [phase, index, delay, reduced]);

  const wiping = phase !== "idle";
  const tail = HEADLINE_TAILS[index];
  let charIndex = 0;

  return (
    <motion.h1
      initial={{ opacity: 0, y: 12, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: delay + 0.1 }}
      className="flex min-h-[2.2em] max-w-[900px] flex-wrap items-center justify-center gap-x-[0.26em] text-center text-4xl font-medium leading-[1.1] tracking-[-0.04em] text-[#171717] sm:text-5xl lg:min-h-[2.2em] lg:text-[64px]"
    >
      <motion.span layout="position" transition={{ duration: 0.3, ease: EASE_OUT }} className="inline-block">
        {HEADLINE_LEAD}
      </motion.span>
      <span aria-label={tail} className="inline-block whitespace-nowrap">
        {Array.from(tail).map((ch, i) => {
          if (ch === " ") return <span key={`sp-${index}-${i}`}> </span>;
          const d = charIndex++ * WIPE_STEP_MS;
          return (
            <span
              key={`${index}-${i}`}
              aria-hidden
              className="inline-block"
              style={{
                opacity: wiping ? 0 : 1,
                color: wiping ? "#0050FF" : "#171717",
                transition: `opacity ${WIPE_FADE_MS}ms, color 600ms`,
                transitionDelay: `${d}ms`,
              }}
            >
              {ch}
            </span>
          );
        })}
      </span>
    </motion.h1>
  );
}

type PhoneId = "left" | "middle" | "right";

const PHONES: { id: PhoneId; src: string; alt: string }[] = [
  { id: "left", src: "/images/varial-swap-screen.png", alt: "Varial swap" },
  { id: "middle", src: "/images/varial-wallet.png", alt: "Varial wallet" },
  { id: "right", src: "/images/varial-discover.png", alt: "Varial discover" },
];

function PhoneMockups({ delay }: { delay: number }) {
  const [hovered, setHovered] = useState<PhoneId | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 1200 + delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  const yFor = (id: PhoneId) => (hovered === id ? -18 : 0);

  return (
    <div className="absolute left-1/2 top-[320px] sm:top-[410px] lg:top-[490px] z-10 flex -translate-x-1/2 items-start justify-center gap-4 sm:gap-6 lg:gap-8 pointer-events-none">
      {PHONES.map((phone, i) => (
        <motion.div
          key={phone.id}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: yFor(phone.id) }}
          transition={
            entered
              ? springTransition
              : { delay: delay + 0.7 + i * 0.1, duration: 0.5, ease: EASE_OUT }
          }
          onMouseEnter={() => setHovered(phone.id)}
          onMouseLeave={() => setHovered(null)}
          onContextMenu={(event) => event.preventDefault()}
          className="pointer-events-auto w-[220px] lg:w-[300px] xl:w-[330px] aspect-[330/717] select-none rounded-[16px] bg-white shadow-[0px_24px_24px_4px_rgba(0,0,0,0.25)] overflow-hidden cursor-default shrink-0"
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

function HeroNav({ delay }: { delay: number }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: EASE_OUT }}
      className="absolute left-1/2 top-5 z-30 flex w-[min(calc(100%-48px),1024px)] -translate-x-1/2 items-center justify-between"
      aria-label="Primary navigation"
    >
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
        {HERO_NAV_LINKS.map((item) => (
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
        href="#download"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#171717] px-5 py-2 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#2a2a2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/70"
      >
        Download
      </a>
    </motion.nav>
  );
}

export function HeroSection() {
  const delay = 0;

  return (
    <section className="px-6 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.01 }}
        className="relative mx-auto h-[100vh] min-h-[600px] max-h-[700px] w-full overflow-hidden rounded-[24px] sm:min-h-[680px] sm:max-h-[760px] lg:min-h-[960px] lg:max-h-[1000px]"
      >
        {/* Blue glow the phones rise out of */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.9, ease: EASE_OUT }}
          className="pointer-events-none absolute left-1/2 top-[330px] sm:top-[420px] lg:top-[500px] z-[1] h-[520px] w-[140%] max-w-[1400px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,#0050FF_0%,rgba(0,80,255,0.55)_38%,rgba(0,80,255,0)_72%)] blur-2xl"
        />

        <HeroNav delay={delay + 0.1} />

        <div className="relative z-20 flex flex-col items-center gap-7 px-6 pt-[112px] sm:pt-[160px] lg:pt-[176px]">
          <RotatingHeadline delay={delay} />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: delay + 0.45 }}
            className="flex flex-row items-center gap-3"
          >
            <a
              href={LINKS.iosApp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#2a2a2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/70"
            >
              <AppleLogoFill size={18} className="shrink-0" />
              Get iOS
            </a>
            <a
              href={LINKS.androidApp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-transparent px-6 py-3 text-base font-semibold text-[#171717] shadow-[inset_0_0_0_1px_#DBDBDB] transition-colors duration-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/70"
            >
              <AndroidLogoFill size={18} className="shrink-0" />
              Get Android
            </a>
          </motion.div>
        </div>

        <PhoneMockups delay={delay} />
      </motion.div>
    </section>
  );
}
