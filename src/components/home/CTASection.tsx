"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeSlideUp, EASE_OUT } from "@/lib/animations";
import { LINKS } from "@/lib/constants";
import { DownloadBold } from "@/components/ui/PhosphorIcons";
import { IridescenceBackground } from "@/components/ui/IridescenceBackground";

export function CTASection() {
  return (
    <section>
      <div className="max-w-[1024px] mx-auto px-6">
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-8"
        >
          {/* CTA card */}
          <div className="relative rounded-[16px] overflow-hidden">
            <IridescenceBackground amplitude={0.07} patternClassName="scale-[2.2] rotate-90" />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.16),transparent_34%),linear-gradient(180deg,rgba(9,9,11,0.04),rgba(9,9,11,0.24))]" />

            <div className="relative z-10 flex flex-col items-center justify-center p-8 gap-8 h-[360px] sm:h-[420px] lg:h-[480px]">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <Image
                  src="/images/logo.svg"
                  alt="Freighter"
                  width={64}
                  height={64}
                  className="size-16"
                />
              </motion.div>

              {/* Heading */}
              <div className="flex flex-col items-center gap-3">
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5, ease: EASE_OUT }}
                  className="text-3xl sm:text-4xl lg:text-[48px] font-medium text-white tracking-[-1.92px] text-center leading-[1.17]"
                >
                  Try Freighter today
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.5, ease: EASE_OUT }}
                  className="text-base sm:text-lg text-white/60 text-center text-pretty max-w-[40ch]"
                >
                  Open source and free to use
                </motion.p>
              </div>

              {/* Download buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5, ease: EASE_OUT }}
                className="flex w-full max-w-xs flex-col items-stretch gap-3"
              >
                <div className="flex gap-3">
                  <a
                    href={LINKS.iosApp}
                    className="inline-flex min-w-0 flex-1 basis-0 items-center justify-center gap-1 whitespace-nowrap rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition duration-300 ease-out hover:bg-white/20"
                  >
                    <DownloadBold size={16} className="shrink-0 opacity-50" />
                    iOS
                  </a>
                  <a
                    href={LINKS.androidApp}
                    className="inline-flex min-w-0 flex-1 basis-0 items-center justify-center gap-1 whitespace-nowrap rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition duration-300 ease-out hover:bg-white/20"
                  >
                    <DownloadBold size={16} className="shrink-0 opacity-50" />
                    Android
                  </a>
                </div>
                <a
                  href={LINKS.chromeExtension}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-[calc((100%-0.75rem)/2)] items-center justify-center gap-1 self-center whitespace-nowrap rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition duration-300 ease-out hover:bg-white/20"
                >
                  <DownloadBold size={16} className="shrink-0 opacity-50" />
                  Browser
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
