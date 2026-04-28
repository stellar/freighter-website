"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeSlideUp } from "@/lib/animations";
import { RoundedQR } from "@/components/ui/RoundedQR";
import { LINKS } from "@/lib/constants";
import Image from "next/image";
import { AppleLogoBold, AndroidLogoBold } from "@/components/ui/PhosphorIcons";

const ColorBends = dynamic(
  () => import("@/components/ui/ColorBends"),
  { ssr: false }
);

export function DownloadCards() {
  return (
    <section id="download">
      <div className="max-w-[1024px] mx-auto px-6">
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
        >
          {/* For mobile */}
          <div className="card-hover relative h-[400px] md:h-[480px] rounded-[32px] bg-bg-elevated overflow-hidden p-8 flex flex-col">
            <div className="absolute inset-0 z-0">
              <ColorBends
                colors={["#5842c3", "#3b1f8e", "#1a0a4a"]}
                speed={0.2}
                noise={0.06}
                transparent={false}
              />
            </div>

            <h3 className="text-xl sm:text-2xl font-medium text-white tracking-[-0.96px] relative z-10">
              For mobile
            </h3>
            <div className="flex gap-2 mt-auto self-end relative z-10">
              <a
                href={LINKS.iosApp}
                className="inline-flex items-center gap-1 px-6 py-3 text-sm font-medium text-white bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
              >
                <AppleLogoBold size={14} className="opacity-70" />
                Get iOS
              </a>
              <a
                href={LINKS.androidApp}
                className="inline-flex items-center gap-1 px-6 py-3 text-sm font-medium text-white bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
              >
                <AndroidLogoBold size={14} className="opacity-70" />
                Get Android
              </a>
            </div>

            {/* Phone screenshot */}
            <div className="absolute bottom-0 right-4 sm:right-8 w-[180px] sm:w-[220px] md:w-[260px] top-[72px] rounded-[2px] shadow-[0px_24px_24px_4px_rgba(0,0,0,0.25)] z-[1] overflow-hidden">
              <Image src="/images/for-mobile.png" alt="Freighter mobile app" fill className="object-cover object-top" />
            </div>
            {/* QR code linking to freighter.app */}
            <div className="qr-glow absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-10 size-[96px] rounded-[4px] bg-white p-2 shadow-lg">
              <RoundedQR value="https://www.freighter.app" size={80} />
            </div>
          </div>

          {/* For extension */}
          <div className="card-hover relative h-[400px] md:h-[480px] rounded-[32px] bg-bg-elevated overflow-hidden p-8 flex flex-col">
            <div className="absolute inset-0 z-0">
              <ColorBends
                colors={["#5842c3", "#3b1f8e", "#1a0a4a"]}
                speed={0.2}
                noise={0.06}
                transparent={false}
              />
            </div>

            <h3 className="text-xl sm:text-2xl font-medium text-white tracking-[-0.96px] relative z-10">
              For browser
            </h3>
            <a
              href={LINKS.chromeExtension}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-6 py-3 text-sm font-medium text-white bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors mt-auto self-end relative z-10"
            >
              <span className="flex items-center -space-x-1.5">
                <Image src="/images/browser-chrome.png" alt="Chrome" width={18} height={18} className="size-[18px] rounded-full ring-1 ring-bg-tertiary" />
                <Image src="/images/browser-firefox.png" alt="Firefox" width={18} height={18} className="size-[18px] rounded-full ring-1 ring-bg-tertiary" />
                <Image src="/images/browser-brave.png" alt="Brave" width={18} height={18} className="size-[18px] rounded-full ring-1 ring-bg-tertiary" />
              </span>
              Get extension
            </a>

            {/* Browser extension screenshot — 360×600 aspect ratio */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 top-[72px] aspect-[360/600] h-full overflow-hidden rounded-[16px] shadow-[0px_24px_24px_4px_rgba(0,0,0,0.25)] z-[1]">
              <Image src="/images/for-extension.png" alt="Freighter browser extension" fill className="object-cover object-top" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
