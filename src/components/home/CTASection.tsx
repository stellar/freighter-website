"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeSlideUp, EASE_OUT } from "@/lib/animations";
import { LINKS } from "@/lib/constants";
import {
  BrowserBadge,
  useBrowser,
  extensionHref,
} from "@/components/ui/BrowserBadge";
import { AppleLogoFill, AndroidLogoFill } from "@/components/ui/PhosphorIcons";
import { usePhone } from "@/lib/use-phone";

const EDGE_WORDS = [
  "Your everyday Stellar wallet",
  "Send",
  "Swap",
  "Discover",
  "No wallet fees",
  "Non-custodial",
  "Open source",
  "Stablecoins",
];
/** Columns per side: [x offset px, duration s, direction, opacity] */
const RAIN_COLUMNS: [number, number, 1 | -1, number][] = [
  [16, 150, 1, 0.14],
  [48, 210, -1, 0.09],
  [80, 120, 1, 0.12],
  [112, 240, -1, 0.07],
  [144, 180, 1, 0.1],
  [176, 135, -1, 0.13],
];

/** Matrix-style columns of small uppercase copy drifting along both edges of the card. */
function EdgeRain({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 z-[2] hidden w-[220px] overflow-hidden sm:block"
      style={side === "left" ? { left: 0 } : { right: 0 }}
    >
      {RAIN_COLUMNS.map(([x, dur, dir, op], i) => {
        // Each column starts on a different word so they don't read in lockstep
        const words = [...EDGE_WORDS.slice(i), ...EDGE_WORDS.slice(0, i)];
        const line = words.join("  ·  ") + "  ·  ";
        return (
          <div
            key={i}
            className="absolute inset-y-0 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]"
            style={side === "left" ? { left: x } : { right: x }}
          >
            <motion.span
              className="block whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.3em] text-[#171717]"
              style={{ writingMode: "vertical-rl", opacity: op }}
              animate={{ y: dir === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
              transition={{ duration: dur, ease: "linear", repeat: Infinity }}
            >
              {line.repeat(6)}
              {line.repeat(6)}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}

export function CTASection() {
  const browser = useBrowser();
  // On a phone, only that phone's store button
  const phone = usePhone();
  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-8"
        >
          {/* CTA card */}
          <div className="relative overflow-hidden rounded-[32px] bg-white">
            {/* Subtle vertical type running down both edges */}
            <EdgeRain side="left" />
            <EdgeRain side="right" />

            <div className="relative z-10 flex flex-col items-center justify-center p-8 gap-8 h-[360px] sm:h-[420px] lg:h-[480px]">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <Image
                  src="/images/varial-icon.svg"
                  alt="Varial"
                  width={64}
                  height={64}
                  className="size-16 rounded-[14px]"
                />
              </motion.div>

              {/* Heading */}
              <div className="flex flex-col items-center gap-3">
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5, ease: EASE_OUT }}
                  className="text-3xl sm:text-4xl lg:text-[48px] font-medium text-[#171717] tracking-[-1.92px] text-center leading-[1.17]"
                >
                  Get Varial
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.5, ease: EASE_OUT }}
                  className="text-base sm:text-lg text-[#6F6F6F] text-center text-pretty max-w-[40ch]"
                >
                  On your phone or in your browser.
                </motion.p>
              </div>

              {/* Download buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5, ease: EASE_OUT }}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                {phone !== "android" && (
                  <a
                    href={LINKS.iosApp}
                    className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#2a2a2a]"
                  >
                    <AppleLogoFill size={16} className="shrink-0" />
                    Get iOS
                  </a>
                )}
                {phone !== "ios" && (
                  <a
                    href={LINKS.androidApp}
                    className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#2a2a2a]"
                  >
                    <AndroidLogoFill size={16} className="shrink-0" />
                    Get Android
                  </a>
                )}
                <a
                  href={extensionHref(browser)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#2a2a2a]"
                >
                  <BrowserBadge browser={browser} />
                  Get extension
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
