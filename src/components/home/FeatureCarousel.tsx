"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, type PanInfo } from "framer-motion";
import { fadeSlideUp } from "@/lib/animations";
import {
  PaperPlaneTiltBold,
  SwapBold,
  CompassBold,
  ClockCounterClockwiseBold,
  DiamondBold,
  DownloadSimpleBold,
  WalletBold,
  TrendUpBold,
  CaretLeftBold,
  CaretRightBold,
} from "@/components/ui/PhosphorIcons";
import { FEATURE_ANIMATIONS } from "./FeatureAnimations";

const ITEMS = [
  { label: "Send", icon: PaperPlaneTiltBold },
  { label: "Swap", icon: SwapBold },
  { label: "Earn", icon: TrendUpBold },
  { label: "Discover", icon: CompassBold },
  { label: "History", icon: ClockCounterClockwiseBold },
  { label: "Collectibles", icon: DiamondBold },
  { label: "Receive", icon: DownloadSimpleBold },
  { label: "Wallets", icon: WalletBold },
];

const GAP = 17;

export type CardStyle = "solid" | "glow" | "glass" | "editorial";

export function FeatureCarousel({ cardStyle = "solid" }: { cardStyle?: CardStyle } = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(320);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Reset index if it exceeds new maxIndex after resize
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
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
    <section className={`feature-cards feature-cards--${cardStyle}`}>
      <div className="max-w-[1024px] mx-auto px-6">
        {/* Header row */}
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-white tracking-[-1.6px] leading-[1.2]">
            Your everyday stellar wallet
          </h2>
          <div className="flex gap-2 shrink-0 ml-4">
            <button
              onClick={handlePrev}
              className="size-11 rounded-full bg-bg-elevated flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors cursor-pointer"
              aria-label="Previous"
            >
              <CaretLeftBold size={16} />
            </button>
            <button
              onClick={handleNext}
              className="size-11 rounded-full bg-bg-elevated flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors cursor-pointer"
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
              const isInView = i >= currentIndex && i < currentIndex + visibleCount;
              const edgeScale = isInView ? 1 : 0.95;
              const edgeOpacity = isInView ? 1 : 0.4;
              const edgeBlur = isInView ? 0 : 4;
              return (
                <motion.div
                  key={item.label}
                  className="shrink-0"
                  style={{ width: cardWidth }}
                  animate={{
                    scale: edgeScale,
                    opacity: edgeOpacity,
                    filter: `blur(${edgeBlur}px)`,
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                  {Animation ? <Animation /> : <div className="fc-card" />}
                  {isEditorial ? (
                    <div className="mt-5 flex items-baseline gap-3">
                      <span className="text-[11px] font-medium tracking-[0.2em] text-text-tertiary tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[22px] font-semibold text-white tracking-[-0.6px] leading-none">
                        {item.label}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 mt-4">
                      <div className="size-[35px] rounded-full bg-bg-elevated shrink-0 flex items-center justify-center text-accent-light">
                        <Icon size={18} />
                      </div>
                      <span className="text-base sm:text-lg font-medium text-white tracking-[-0.96px]">
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
