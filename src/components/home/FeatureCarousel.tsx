"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue } from "framer-motion";
import { fadeSlideUp } from "@/lib/animations";
import { useXlmUsdRate } from "@/lib/xlm-price";
import {
  PaperPlaneTiltBold,
  ArrowsLeftRightBold,
  CompassBold,
  ClockCounterClockwiseBold,
  ImagesBold,
  WalletBold,
  ArrowDownBold,
  PlayFill,
  PauseFill,
} from "@/components/ui/PhosphorIcons";
import { FEATURE_ANIMATIONS } from "./FeatureAnimations";

const ITEMS = [
  { label: "Send", icon: PaperPlaneTiltBold },
  { label: "Swap", icon: ArrowsLeftRightBold },
  { label: "Deposit", icon: ArrowDownBold },
  { label: "Discover", icon: CompassBold },
  { label: "History", icon: ClockCounterClockwiseBold },
  { label: "Collectibles", icon: ImagesBold },
  { label: "Wallets", icon: WalletBold },
];

/** Marquee speed, px per second */
const FLOW_SPEED = 28;
const GAP = 17;

export type CardStyle = "solid" | "glow" | "glass" | "editorial";

export function FeatureCarousel({
  cardStyle = "solid",
}: { cardStyle?: CardStyle } = {}) {
  const xlmUsdRate = useXlmUsdRate();
  const [cardWidth, setCardWidth] = useState(320);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  // Pause the dozens of CSS keyframe loops inside each card when the
  // section is off-screen — saves a meaningful amount of GPU/CPU on
  // long pages where the carousel is one of many sections.
  const inView = useInView(sectionRef, { margin: "200px 0px" });

  // Measure container and compute card width
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const count = w < 640 ? 1 : w < 900 ? 2 : 3;
        setCardWidth((w - (count - 1) * GAP) / count);
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Continuous flow: the track holds the items twice and `x` drifts left,
  // wrapping by one set's width so the loop is seamless.
  const x = useMotionValue(0);
  const loopWidth = ITEMS.length * (cardWidth + GAP);
  const wrap = (v: number) => {
    let n = v % loopWidth;
    if (n > 0) n -= loopWidth;
    return n;
  };
  const [playing, setPlaying] = useState(true);
  const dragging = useRef(false);

  useEffect(() => {
    if (!playing || !inView) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!dragging.current) x.set(wrap(x.get() - FLOW_SPEED * dt));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- wrap depends only on loopWidth
  }, [playing, inView, loopWidth, x]);

  // Trackpad / horizontal wheel nudges the flow. Native non-passive listener
  // so the browser's back/forward swipe is blocked over the cards; vertical
  // scrolling is left untouched.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      x.set(wrap(x.get() - e.deltaX));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- wrap depends only on loopWidth
  }, [loopWidth, x]);

  const isEditorial = cardStyle === "editorial";

  return (
    <section
      ref={sectionRef}
      className={`feature-cards feature-cards--${cardStyle}${inView ? "" : " feature-cards--paused"}`}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header row */}
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-text-primary tracking-[-1.6px] leading-[1.2]">
            Your everyday stellar wallet
          </h2>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="ml-4 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#171717] text-white transition-colors hover:bg-[#2a2a2a]"
            aria-label={playing ? "Pause" : "Play"}
            aria-pressed={playing}
          >
            {playing ? <PauseFill size={16} /> : <PlayFill size={16} />}
          </button>
        </motion.div>

        {/* Carousel viewport — overflow visible so cards bleed off-page */}
        <div ref={containerRef} className="overflow-visible">
          <motion.div
            style={{ x, gap: GAP }}
            drag="x"
            dragMomentum={false}
            onDragStart={() => (dragging.current = true)}
            onDragEnd={() => {
              dragging.current = false;
              x.set(wrap(x.get()));
            }}
            className="flex cursor-grab active:cursor-grabbing"
          >
            {[...ITEMS, ...ITEMS].map((item, i) => {
              const Icon = item.icon;
              const Animation = FEATURE_ANIMATIONS[item.label];
              return (
                <motion.div
                  key={`${item.label}-${i}`}
                  className="shrink-0"
                  style={{ width: cardWidth }}
                >
                  {Animation ? (
                    <Animation xlmUsdRate={xlmUsdRate} />
                  ) : (
                    <div className="fc-card" />
                  )}
                  {isEditorial ? (
                    <div className="mt-5 flex items-baseline gap-3">
                      <span className="text-[11px] font-medium tracking-[0.2em] text-text-tertiary tabular-nums">
                        {String((i % ITEMS.length) + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[22px] font-semibold text-text-primary tracking-[-0.6px] leading-none">
                        {item.label}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 mt-4">
                      <div className="size-[35px] rounded-full bg-[#EEF4FF] shrink-0 flex items-center justify-center text-accent">
                        <Icon size={18} />
                      </div>
                      <span className="text-base sm:text-lg font-medium text-text-primary tracking-[-0.96px]">
                        {item.label}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
