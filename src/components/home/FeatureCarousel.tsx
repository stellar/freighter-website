"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView, type PanInfo } from "framer-motion";
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
  CaretLeftBold,
  CaretRightBold,
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

const GAP = 17;

export type CardStyle = "solid" | "glow" | "glass" | "editorial";

export function FeatureCarousel({
  cardStyle = "solid",
}: { cardStyle?: CardStyle } = {}) {
  const xlmUsdRate = useXlmUsdRate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(320);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  // Pause the dozens of CSS keyframe loops inside each card when the
  // section is off-screen — saves a meaningful amount of GPU/CPU on
  // long pages where the carousel is one of many sections.
  const inView = useInView(sectionRef, { margin: "200px 0px" });

  const maxIndex = Math.max(0, ITEMS.length - visibleCount);

  // Measure container and compute card width
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const count = w < 640 ? 1 : w < 900 ? 2 : 3;
        setVisibleCount(count);
        setCardWidth((w - (count - 1) * GAP) / count);
        setCurrentIndex((prev) => Math.min(prev, Math.max(0, ITEMS.length - count)));
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Trackpad / horizontal wheel: swipe left/right over the carousel to step
  // one card at a time. Native listener (non-passive) so we can block the
  // browser's back/forward swipe while the gesture is over the cards;
  // vertical scrolling is left untouched.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let acc = 0;
    let locked = false;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    let unlockTimer: ReturnType<typeof setTimeout> | undefined;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (locked) return;
      acc += e.deltaX;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => (acc = 0), 150);
      if (Math.abs(acc) < 40) return;
      const dir = acc > 0 ? 1 : -1;
      acc = 0;
      locked = true;
      unlockTimer = setTimeout(() => (locked = false), 450);
      setCurrentIndex((prev) => Math.min(Math.max(prev + dir, 0), maxIndex));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(resetTimer);
      clearTimeout(unlockTimer);
    };
  }, [maxIndex]);

  const handlePrev = () => goPrev();
  const handleNext = () => goNext();

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = cardWidth / 4;
    if (info.offset.x < -threshold) {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    } else if (info.offset.x > threshold) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const translateX = -(currentIndex * (cardWidth + GAP));

  const isEditorial = cardStyle === "editorial";

  return (
    <section ref={sectionRef} className={`feature-cards feature-cards--${cardStyle}${inView ? "" : " feature-cards--paused"}`}>
      <div className="max-w-[1024px] mx-auto px-6">
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
          <div className="flex gap-2 shrink-0 ml-4">
            <button
              onClick={handlePrev}
              className="size-11 rounded-full bg-[#171717] flex items-center justify-center text-white hover:bg-[#2a2a2a] transition-colors cursor-pointer"
              aria-label="Previous"
            >
              <CaretLeftBold size={16} />
            </button>
            <button
              onClick={handleNext}
              className="size-11 rounded-full bg-[#171717] flex items-center justify-center text-white hover:bg-[#2a2a2a] transition-colors cursor-pointer"
              aria-label="Next"
            >
              <CaretRightBold size={16} />
            </button>
          </div>
        </motion.div>

        {/* Carousel viewport — overflow visible so cards bleed off-page */}
        <div ref={containerRef} className="overflow-visible">
          <motion.div
            animate={{ x: translateX }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="flex cursor-grab active:cursor-grabbing"
            style={{ gap: GAP }}
          >
            {ITEMS.map((item, i) => {
              const Icon = item.icon;
              const Animation = FEATURE_ANIMATIONS[item.label];
              return (
                <motion.div
                  key={item.label}
                  className="shrink-0"
                  style={{ width: cardWidth }}
                >
                  {Animation ? <Animation xlmUsdRate={xlmUsdRate} /> : <div className="fc-card" />}
                  {isEditorial ? (
                    <div className="mt-5 flex items-baseline gap-3">
                      <span className="text-[11px] font-medium tracking-[0.2em] text-text-tertiary tabular-nums">
                        {String(i + 1).padStart(2, "0")}
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
