"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
} from "framer-motion";
import { EASE_OUT } from "@/lib/animations";
import { FlowDemo, SWAP_DEMO, DISCOVER_DEMO } from "@/components/home/FlowDemo";
import { LINKS } from "@/lib/constants";
import { DownloadPill, openDownloadCard } from "@/components/ui/DownloadPill";
import {
  AppleLogoFill,
  AndroidLogoFill,
  MonitorBold,
} from "@/components/ui/PhosphorIcons";

const HERO_NAV_LINKS = [
  { label: "Docs", href: LINKS.docs, external: true },
  {
    label: "GitHub",
    href: "https://github.com/stellar/freighter",
    external: true,
  },
  { label: "Changelog", href: "/changelog", external: false },
  { label: "Support", href: LINKS.support, external: true },
] as const;

const HEADLINE_LEAD = "Your everyday wallet for";
const HEADLINE_TAILS = ["Stellar apps", "stablecoins", "swapping"] as const;
const HEADLINE_INTERVAL_MS = 3400;
/** Per-character stagger of the wipe, like Zoah's hero. */
const WIPE_STEP_MS = 18;
const WIPE_FADE_MS = 160;

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
      className="flex max-w-[560px] flex-col items-center text-center text-4xl font-medium leading-[1.08] tracking-[-0.04em] text-[#171717] sm:text-5xl lg:items-start lg:text-left lg:text-[60px]"
    >
      <span className="block">{HEADLINE_LEAD}</span>
      {/* Screen readers get the phrase as plain text; the animated chars are hidden */}
      <span className="sr-only">{tail}</span>
      <span
        aria-hidden
        className="flex min-h-[1.1em] flex-wrap justify-center gap-x-[0.26em] lg:justify-start"
      >
        {/* Words wrap normally; characters inside a word never break apart */}
        {tail.split(" ").map((word, wi) => (
          <span
            key={`${index}-${wi}`}
            className="inline-block whitespace-nowrap"
          >
            {Array.from(word).map((ch, ci) => {
              const d = charIndex++ * WIPE_STEP_MS;
              return (
                <span
                  key={ci}
                  className="inline-block"
                  style={{
                    opacity: wiping ? 0 : 1,
                    color: wiping ? "#0050FF" : "#171717",
                    transition: `opacity ${WIPE_FADE_MS}ms, color 400ms`,
                    transitionDelay: `${d}ms`,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </motion.h1>
  );
}

function HeroNav({ delay }: { delay: number }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: EASE_OUT }}
      className="relative z-30 w-full"
      aria-label="Primary navigation"
    >
      <div className="relative mx-auto flex min-h-11 w-full max-w-[1280px] items-center justify-between">
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

        <DownloadPill />
      </div>
    </motion.nav>
  );
}

type Screen = { src: string; alt: string };
type SideMode = "fan" | "slide" | "single";
type Stage = {
  id: string;
  /** Small uppercase label above the title (decorative) */
  eyebrow?: string;
  title?: string;
  sub?: string;
  /** fan: side screens swing out with a tilt. slide: they slide straight out. single: centre phone only. */
  mode: SideMode;
  /** Centre phone slowly cycles through all three screens while the stage is open. */
  rotate?: boolean;
  /** Centre phone plays a scripted walkthrough instead of a screenshot. */
  demo?: "swap" | "discover";
  /** [centre, left, right] */
  screens: [Screen, Screen, Screen];
};

const STAGES: Stage[] = [
  {
    id: "wallet",
    sub: "Send, swap, and connect to apps on Stellar.",
    mode: "fan",
    screens: [
      { src: "/images/varial-wallet.png", alt: "Varial wallet home" },
      { src: "/images/varial-token-xlm.png", alt: "Varial token detail" },
      { src: "/images/varial-collectible.png", alt: "Varial collectible" },
    ],
  },
  {
    id: "swap",
    eyebrow: "Swap",
    title: "Smarter swaps. Better rates.",
    sub: "Compare available routes and see exactly how your swap works before you confirm.",
    mode: "single",
    demo: "swap",
    screens: [
      { src: "/images/varial-swap-screen.png", alt: "Varial swap" },
      { src: "/images/varial-swap-route.png", alt: "Varial swap route" },
      { src: "/images/varial-swap-review.png", alt: "Varial review swap" },
    ],
  },
  {
    id: "discover",
    eyebrow: "Discover",
    title: "Explore beyond your wallet.",
    sub: "Connect to Stellar apps and discover what's possible.",
    mode: "single",
    demo: "discover",
    screens: [
      { src: "/images/varial-discover.png", alt: "Varial discover" },
      { src: "/images/varial-add-funds.png", alt: "Varial add funds" },
      { src: "/images/varial-token-xlm.png", alt: "Varial token detail" },
    ],
  },
];

const ROTATE_EVERY_MS = 3600;
/** Sticky phone column: top offset and inner padding (px), see the lg layout */
const STICKY_TOP = 84;
const STICKY_PAD = 24;
/** Scale of the phone past the first stage */
const SMALL_SCALE = 0.82;
/**
 * Screen image inside a phone. Shows this phone's screen for the active stage;
 * on a rotating stage the centre phone cycles through all of them, slowly.
 */
function PhoneScreen({
  phone,
  active,
  step,
}: {
  phone: 0 | 1 | 2;
  active: number;
  step: number;
}) {
  return (
    <div className="relative h-full w-full">
      {STAGES.map((stage, si) =>
        stage.demo && phone === 0 ? (
          <div
            key={stage.id}
            className="absolute inset-0 transition-opacity duration-500 ease-out"
            style={{ opacity: active === si ? 1 : 0 }}
          >
            <FlowDemo
              playing={active === si}
              config={stage.demo === "swap" ? SWAP_DEMO : DISCOVER_DEMO}
            />
          </div>
        ) : (
          stage.screens.map((screen, idx) => {
            const shown = stage.rotate && phone === 0 ? step % 3 : phone;
            const visible = active === si && idx === shown;
            return (
              <Image
                key={`${stage.id}-${idx}`}
                src={screen.src}
                alt={screen.alt}
                width={804}
                height={1630}
                priority={si === 0 && idx === phone}
                draggable={false}
                sizes="380px"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
                style={{ opacity: visible ? 1 : 0 }}
              />
            );
          })
        ),
      )}
    </div>
  );
}

/**
 * One phone. `pos` is its slot (-1 left, 0 centre, 1 right); `openness` and
 * `mode` decide how far the side slots sit from the centre, whether they tilt,
 * and whether they show at all.
 */
function Phone({
  phone,
  active,
  step,
  pos,
  openness,
  modeMV,
  delay,
  className,
}: {
  phone: 0 | 1 | 2;
  active: number;
  step: number;
  pos: number;
  openness: MotionValue<number>;
  modeMV: MotionValue<number>; // 0 single, 1 slide, 2 fan
  delay: number;
  className: string;
}) {
  const mix = (a: number, b: number, t: number) => a + (b - a) * t;
  const x = useTransform([openness, modeMV], ([o, m]) => {
    const spread =
      (m as number) === 2
        ? mix(4, 56, o as number)
        : (m as number) === 1
          ? mix(4, 58, o as number)
          : 0;
    return `${pos * spread}%`;
  });
  const rotate = useTransform([openness, modeMV], ([o, m]) =>
    (m as number) === 2 ? pos * mix(0, 6, o as number) : 0,
  );
  const scale = useTransform([openness, modeMV], ([o, m]) => {
    const side =
      (m as number) === 2
        ? mix(0.88, 0.9, o as number)
        : mix(0.88, 0.92, o as number);
    return pos === 0 ? 1 : side;
  });
  const y = useTransform([openness, modeMV], ([o, m]) => {
    if (pos === 0) return "0%";
    const side =
      (m as number) === 2 ? mix(0, 4, o as number) : mix(0, 3, o as number);
    // Tuck fully behind the centre while fading out on a single-phone stage.
    return `${side * Math.min(1, m as number)}%`;
  });
  // Side phones fade away entirely on a "single" stage.
  const opacity = useTransform([openness, modeMV], ([o, m]) =>
    pos === 0 ? 1 : Math.min(1, m as number) * (0.6 + 0.4 * (o as number)),
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay + (pos === 0 ? 0.45 : 0.5), duration: 0.5 }}
      onContextMenu={(e) => e.preventDefault()}
      className={`absolute ${pos === 0 ? "z-10" : "z-[5]"}`}
      style={{ transformOrigin: "50% 100%" }}
    >
      <motion.div
        style={{ x, y, rotate, scale, opacity, transformOrigin: "50% 100%" }}
        className={`${pos === 0 ? "shadow-[0px_24px_48px_rgba(0,0,0,0.22)]" : "shadow-[0px_16px_40px_rgba(0,0,0,0.14)]"} ${className}`}
      >
        <PhoneScreen phone={phone} active={active} step={step} />
      </motion.div>
    </motion.div>
  );
}

/**
 * Three phones that stay put while the copy scrolls. Each shows the active
 * stage's screen for its index; side phones fan or slide out from behind the
 * centre (`openness`) or hide on single-phone stages, where the centre phone
 * slowly cycles through the stage's screens.
 */
function StickyPhone({
  active,
  delay,
  openness,
}: {
  active: number;
  delay: number;
  openness: MotionValue<number>;
}) {
  const stage = STAGES[active] ?? STAGES[0];
  const modeValue = stage.mode === "fan" ? 2 : stage.mode === "slide" ? 1 : 0;
  const modeMV = useMotionValue(2);
  useEffect(() => {
    const controls = animate(modeMV, modeValue, {
      duration: 0.5,
      ease: EASE_OUT,
    });
    return () => controls.stop();
  }, [modeValue, modeMV]);

  // Rotation step, keyed by stage so entering a stage starts from its first screen.
  const [rotation, setRotation] = useState({ stageId: stage.id, step: 0 });
  const step = rotation.stageId === stage.id ? rotation.step : 0;
  useEffect(() => {
    if (!stage.rotate) return;
    const id = setInterval(
      () =>
        setRotation((r) => ({
          stageId: stage.id,
          step: r.stageId === stage.id ? r.step + 1 : 1,
        })),
      ROTATE_EVERY_MS,
    );
    return () => clearInterval(id);
  }, [stage]);

  const phoneClass =
    "aspect-[804/1630] w-[240px] overflow-hidden rounded-[24px] bg-white select-none sm:w-[300px] lg:h-[min(92vh,880px)] lg:w-auto";

  // Past the first stage the phone shrinks and is nudged so its centre sits
  // on the viewport centre, level with the stage copy. The sticky column
  // starts at STICKY_TOP + STICKY_PAD and the phone is min(92vh, 880px) tall.
  const [centerOffset, setCenterOffset] = useState(0);
  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      if (window.innerWidth < 1024) {
        setCenterOffset(0);
        return;
      }
      const phoneH = Math.min(vh * 0.92, 880) * SMALL_SCALE;
      setCenterOffset(
        Math.round(vh / 2 - (STICKY_TOP + STICKY_PAD + phoneH / 2)),
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <motion.div
      animate={{
        scale: active === 0 ? 1 : SMALL_SCALE,
        y: active === 0 ? 0 : centerOffset,
      }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      style={{ transformOrigin: "50% 0%" }}
      className="relative flex items-start justify-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.9, ease: EASE_OUT }}
        className="pointer-events-none absolute left-1/2 top-[45%] z-0 h-[120%] w-[220%] max-w-[1400px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,#0050FF_0%,rgba(0,80,255,0.45)_38%,rgba(0,80,255,0)_70%)] blur-2xl"
      />
      {/* Invisible sizer so the absolute phones have a box to centre in */}
      <div className={`invisible ${phoneClass}`} aria-hidden />
      <Phone
        phone={1}
        active={active}
        step={step}
        pos={-1}
        openness={openness}
        modeMV={modeMV}
        delay={delay}
        className={phoneClass}
      />
      <Phone
        phone={2}
        active={active}
        step={step}
        pos={1}
        openness={openness}
        modeMV={modeMV}
        delay={delay}
        className={phoneClass}
      />
      <Phone
        phone={0}
        active={active}
        step={step}
        pos={0}
        openness={openness}
        modeMV={modeMV}
        delay={delay}
        className={phoneClass}
      />
    </motion.div>
  );
}

/** Below lg: one phone per later stage, playing that stage's walkthrough. */
function MobileDemoPhone({ stage }: { stage: Stage }) {
  return (
    <div className="relative mt-10 flex w-full justify-center lg:hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[110%] w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,#0050FF_0%,rgba(0,80,255,0.45)_38%,rgba(0,80,255,0)_70%)] blur-2xl"
        aria-hidden
      />
      <div className="relative z-10 aspect-[804/1630] w-[240px] overflow-hidden rounded-[24px] bg-white shadow-[0px_24px_48px_rgba(0,0,0,0.22)] sm:w-[300px]">
        {stage.demo ? (
          <FlowDemo
            playing={true}
            config={stage.demo === "swap" ? SWAP_DEMO : DISCOVER_DEMO}
          />
        ) : (
          <Image
            src={stage.screens[0].src}
            alt={stage.screens[0].alt}
            width={804}
            height={1630}
            sizes="300px"
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

export function HeroSection() {
  const delay = 0;
  const [active, setActive] = useState(0);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  // 1 while a stage sits in the middle of the viewport, 0 while scrolling between stages.
  const scrollOpenness = useMotionValue(1);
  // Entrance: the fan unfolds from behind the centre phone once on load.
  const introOpenness = useMotionValue(0);
  const openness = useTransform([scrollOpenness, introOpenness], ([a, b]) =>
    Math.min(a as number, b as number),
  );

  useEffect(() => {
    const controls = animate(introOpenness, 1, {
      delay: delay + 1.0,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [introOpenness, delay]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      let best = 0;
      let nearest = 0;
      let nearestD = Infinity;
      stageRefs.current.forEach((el, i) => {
        // Skip stages hidden at this breakpoint (display: none)
        if (!el || !el.offsetParent) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - vh / 2) / vh;
        best = Math.max(best, Math.min(1, Math.max(0, 1 - (d - 0.08) / 0.3)));
        if (d < nearestD) {
          nearestD = d;
          nearest = i;
        }
      });
      scrollOpenness.set(best);
      // The stage nearest the viewport centre is active; at the very top it is always the first.
      setActive(window.scrollY < 40 ? 0 : nearest);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollOpenness]);

  const setStageRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      stageRefs.current[i] = el;
    },
    [],
  );

  return (
    <section className="px-6 pt-5">
      <HeroNav delay={delay + 0.1} />

      <div className="relative mx-auto mt-12 w-full max-w-[1280px] lg:mt-0 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-8">
        {/* Copy — three stages; each a screen tall on desktop, stacked with its own phone below lg */}
        <div className="flex min-w-0 flex-col">
          {STAGES.map((stage, i) => (
            <div
              key={stage.id}
              ref={setStageRef(i)}
              data-stage={i}
              // Later stages are taller than the viewport and their copy sticks
              // to the viewport centre while the stage scrolls past, so it is
              // always level with the sticky phone (also centred on the viewport)
              className={`flex flex-col items-center text-center lg:items-start lg:text-left ${i === 0 ? "gap-6 lg:min-h-[85vh] lg:justify-center" : "mt-20 lg:mt-0 lg:min-h-[150vh]"}`}
            >
              <div
                className={
                  i === 0
                    ? "contents"
                    : "flex flex-col items-center gap-6 lg:sticky lg:top-0 lg:h-screen lg:items-start lg:justify-center"
                }
              >
                {stage.eyebrow && (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20% 0px" }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                    className="-mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0050FF]"
                    aria-hidden
                  >
                    {stage.eyebrow}
                  </motion.span>
                )}
                {i === 0 ? (
                  <RotatingHeadline delay={delay} />
                ) : (
                  <motion.h2
                    initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-20% 0px" }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    // -2px: optical alignment — the big glyphs' side bearing otherwise
                    // leaves the title a hair right of the eyebrow and paragraph
                    className="max-w-[460px] text-4xl font-medium leading-[1.1] tracking-[-0.04em] text-[#171717] sm:text-5xl lg:-ml-[2px] lg:text-[52px]"
                  >
                    {stage.title}
                  </motion.h2>
                )}
                {stage.sub && (
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20% 0px" }}
                    transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
                    className="max-w-[420px] text-pretty text-lg leading-7 text-[#6F6F6F] sm:text-xl sm:leading-8"
                  >
                    {stage.sub}
                  </motion.p>
                )}
                {i === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: EASE_OUT,
                      delay: delay + 0.5,
                    }}
                    // On phones the floating pill is the single download CTA
                    className="hidden flex-wrap items-center justify-center gap-3 md:flex lg:justify-start"
                  >
                    {/* Opens the QR card in the corner, same as the Download pill */}
                    <button
                      type="button"
                      onClick={openDownloadCard}
                      className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#171717] px-7 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#2a2a2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/70"
                    >
                      <span className="flex items-center gap-1.5">
                        <AndroidLogoFill size={18} />
                        <AppleLogoFill size={18} />
                      </span>
                      Download
                    </button>
                    <a
                      href={LINKS.chromeExtension}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-[#171717] shadow-[inset_0_0_0_1px_#DBDBDB] transition-colors duration-200 hover:bg-[#EDEDED] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/70"
                    >
                      <MonitorBold size={18} className="shrink-0" />
                      Get extension
                    </a>
                  </motion.div>
                )}
              </div>

              {/* Below lg each stage carries its own phone: the fan under the
                  first stage, a single demo phone under the later ones */}
              {i === 0 ? (
                <div className="mt-12 h-[460px] w-full [clip-path:inset(-60%_-20%_0_-20%)] sm:h-[520px] lg:hidden">
                  <StickyPhone active={0} delay={delay} openness={openness} />
                </div>
              ) : (
                <MobileDemoPhone stage={stage} />
              )}
            </div>
          ))}
        </div>

        {/* Phone fan — sticks while the copy scrolls past (desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-[84px] flex h-[calc(100vh-84px)] items-start justify-center pt-6 [clip-path:inset(-50%_-80%_0_-80%)]">
            <StickyPhone active={active} delay={delay} openness={openness} />
          </div>
        </div>
      </div>
    </section>
  );
}
