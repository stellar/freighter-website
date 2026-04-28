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
  CaretLeftBold,
  CaretRightBold,
} from "@/components/ui/PhosphorIcons";
import { FEATURE_ANIMATIONS } from "./FeatureAnimations";

const ITEMS = [
  { label: "Send", icon: PaperPlaneTiltBold },
  { label: "Swap", icon: SwapBold },
  { label: "Discover", icon: CompassBold },
  { label: "History", icon: ClockCounterClockwiseBold },
  { label: "Collectibles", icon: DiamondBold },
  { label: "Receive", icon: DownloadSimpleBold },
  { label: "Wallets", icon: WalletBold },
];

const GAP = 17;
const AUTO_INTERVAL = 2000;

export function FeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cardWidth, setCardWidth] = useState(320);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  // Auto-advance
  useEffect(() => {
    if (isHovered) return;
    intervalRef.current = setInterval(goNext, AUTO_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, goNext]);

  // Reset timer on manual navigation
  const handlePrev = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    goPrev();
  };

  const handleNext = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    goNext();
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const threshold = cardWidth / 4;
    if (info.offset.x < -threshold) {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    } else if (info.offset.x > threshold) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const translateX = -(currentIndex * (cardWidth + GAP));

  return (
    <section>
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
        <div
          ref={containerRef}
          className="overflow-visible"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
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
            {ITEMS.map((item) => {
              const Icon = item.icon;
              const Animation = FEATURE_ANIMATIONS[item.label];
              return (
                <div
                  key={item.label}
                  className="shrink-0"
                  style={{ width: cardWidth }}
                >
                  <div className="aspect-square rounded-[32px] overflow-hidden transition-all duration-300 ease-out hover:scale-[1.04] hover:shadow-[0_8px_30px_rgba(101,76,216,0.15)]">
                    {Animation ? <Animation /> : <div className="w-full h-full bg-bg-elevated" />}
                  </div>
                  {/* Icon + label */}
                  <div className="flex items-center gap-3 mt-4">
                    <div className="size-[35px] rounded-full bg-bg-elevated shrink-0 flex items-center justify-center text-accent-light">
                      <Icon size={18} />
                    </div>
                    <span className="text-base sm:text-lg font-medium text-white tracking-[-0.96px]">
                      {item.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
