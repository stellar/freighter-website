"use client";

import { motion } from "framer-motion";
import { fadeSlideUp } from "@/lib/animations";
import { RoundedQR } from "@/components/ui/RoundedQR";
import { LINKS } from "@/lib/constants";
import Image from "next/image";
import { AppleLogoBold, AndroidLogoBold } from "@/components/ui/PhosphorIcons";
import { IridescenceBackground } from "@/components/ui/IridescenceBackground";

export function DownloadCards() {
  return (
    <section id="download" className="scroll-mt-[72px]">
      <div className="max-w-[1024px] mx-auto px-6">
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
        >
          {/* For mobile */}
          <div className="group relative h-[400px] md:h-[480px] rounded-[32px] bg-bg-elevated overflow-hidden p-8 flex flex-col">
            <IridescenceBackground amplitude={0.06} patternClassName="scale-150 -translate-x-20 translate-y-8" />

            <h3 className="text-xl sm:text-2xl font-medium text-white tracking-[-0.96px] relative z-10">
              For mobile
            </h3>
            <div className="flex gap-2 mt-auto self-end relative z-10">
              <a
                href={LINKS.iosApp}
                className="inline-flex items-center gap-1 px-6 py-3 text-sm font-medium text-white bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition duration-300 ease-out"
              >
                <AppleLogoBold size={14} className="opacity-70" />
                Get iOS
              </a>
              <a
                href={LINKS.androidApp}
                className="inline-flex items-center gap-1 px-6 py-3 text-sm font-medium text-white bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition duration-300 ease-out"
              >
                <AndroidLogoBold size={14} className="opacity-70" />
                Get Android
              </a>
            </div>

            {/* Phone screenshot */}
            <div className="absolute bottom-[120px] right-0 h-[360px] w-[166px] sm:-right-4 sm:h-[420px] sm:w-[194px] md:-right-8 md:h-[500px] md:w-[231px] rounded-[24px] shadow-[0px_24px_24px_4px_rgba(0,0,0,0.25)] z-[1] overflow-hidden transition-transform duration-300 ease-out group-hover:-translate-x-3 group-hover:translate-y-3">
              <Image src="/images/for-mobile.png" alt="Freighter mobile app" fill className="object-cover object-top" />
            </div>
            <div className="qr-glow absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-10 size-[96px] rounded-[8px] bg-white p-2 shadow-lg">
              <RoundedQR value="https://apps.apple.com/us/app/freihter/id6743947720" size={80} />
            </div>
          </div>

          {/* For extension */}
          <div className="group relative h-[400px] md:h-[480px] rounded-[32px] bg-bg-elevated overflow-hidden p-8 flex flex-col">
            <IridescenceBackground amplitude={0.06} patternClassName="scale-125 -translate-x-10 -translate-y-10 rotate-180" />

            <h3 className="text-xl sm:text-2xl font-medium text-white tracking-[-0.96px] relative z-10">
              For browser
            </h3>
            <a
              href={LINKS.chromeExtension}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-6 py-3 text-sm font-medium text-white bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition duration-300 ease-out mt-auto self-start relative z-10"
            >
              <span className="flex items-center -space-x-0.5">
                <Image src="/images/browser-chrome.png" alt="Chrome" width={18} height={18} className="size-[18px] rounded-full ring-1 ring-white/50" />
                <Image src="/images/browser-firefox.png" alt="Firefox" width={18} height={18} className="size-[18px] rounded-full ring-1 ring-white/50" />
                <Image src="/images/browser-brave.png" alt="Brave" width={18} height={18} className="size-[18px] rounded-full ring-1 ring-white/50" />
              </span>
              Get extension
            </a>

            {/* Browser extension screenshot — 360×600 aspect ratio */}
            <div className="absolute bottom-[120px] -right-16 aspect-[360/600] h-[420px] overflow-hidden rounded-[24px] shadow-[0px_24px_24px_4px_rgba(0,0,0,0.25)] z-[1] sm:-right-20 sm:h-[500px] md:-right-24 md:h-[580px] transition-transform duration-300 ease-out group-hover:-translate-x-3 group-hover:translate-y-3">
              <Image src="/images/for-extension.png" alt="Freighter browser extension" fill className="object-cover object-top" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
