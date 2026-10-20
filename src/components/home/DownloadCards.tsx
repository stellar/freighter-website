"use client";

import { motion } from "framer-motion";
import { fadeSlideUp } from "@/lib/animations";
import { RoundedQR } from "@/components/ui/RoundedQR";
import { LINKS } from "@/lib/constants";
import Image from "next/image";
import { AppleLogoFill, AndroidLogoFill } from "@/components/ui/PhosphorIcons";

const PRIMARY_BTN =
  "inline-flex min-h-11 items-center gap-2 rounded-full bg-[#171717] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#2a2a2a]";

/** Blue glow tucked behind the screenshot, bottom-right of the card. */
function Glow() {
  return (
    <div
      className="pointer-events-none absolute -bottom-[45%] -right-[28%] z-0 h-[130%] w-[100%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,#73A5FF_0%,#C8E0FF_40%,rgba(238,244,255,0)_72%)] blur-3xl"
      aria-hidden
    />
  );
}

export function DownloadCards() {
  return (
    <section id="download" className="scroll-mt-[72px]">
      <div className="mx-auto max-w-[1280px] px-6">
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 items-start gap-8 md:grid-cols-2"
        >
          {/* For mobile */}
          <div className="group relative flex h-[420px] flex-col overflow-hidden rounded-[32px] bg-white p-8 md:h-[500px] md:p-10">
            <Glow />

            <div className="relative z-10 max-w-[320px]">
              <h3 className="text-2xl font-medium tracking-[-0.04em] text-[#171717] sm:text-[28px]">
                For mobile
              </h3>
              <p className="mt-2 text-base leading-6 text-[#6F6F6F]">
                The full wallet in your pocket, on iOS and Android.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={LINKS.iosApp} className={PRIMARY_BTN}>
                  <AppleLogoFill size={16} />
                  Get iOS
                </a>
                <a href={LINKS.androidApp} className={PRIMARY_BTN}>
                  <AndroidLogoFill size={16} />
                  Get Android
                </a>
              </div>
            </div>

            {/* Phone — bleeds off the bottom-right */}
            <div className="absolute right-8 top-[46%] z-[1] aspect-[804/1630] w-[220px] overflow-hidden rounded-[24px] bg-white shadow-[0px_24px_48px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-out group-hover:-translate-y-3 md:right-10 md:top-[42%] md:w-[250px]">
              <Image
                src="/images/varial-wallet.png"
                alt="Varial mobile app"
                width={804}
                height={1630}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="qr-glow absolute bottom-8 left-8 z-10 size-[96px] rounded-[8px] bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)] md:left-10">
              <RoundedQR value={LINKS.iosApp} size={80} />
            </div>
          </div>

          {/* For browser */}
          <div className="group relative flex h-[420px] flex-col overflow-hidden rounded-[32px] bg-white p-8 md:h-[500px] md:p-10">
            <Glow />

            <div className="relative z-10 max-w-[320px]">
              <h3 className="text-2xl font-medium tracking-[-0.04em] text-[#171717] sm:text-[28px]">
                For browser
              </h3>
              <p className="mt-2 text-base leading-6 text-[#6F6F6F]">
                Connect to Stellar apps from Chrome, Firefox, or Brave.
              </p>
              <div className="mt-5">
                <a
                  href={LINKS.chromeExtension}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={PRIMARY_BTN}
                >
                  <span className="flex items-center -space-x-1">
                    <Image
                      src="/images/browser-chrome.png"
                      alt="Chrome"
                      width={18}
                      height={18}
                      className="size-[18px] rounded-full ring-1 ring-black/40"
                    />
                    <Image
                      src="/images/browser-firefox.png"
                      alt="Firefox"
                      width={18}
                      height={18}
                      className="size-[18px] rounded-full ring-1 ring-black/40"
                    />
                    <Image
                      src="/images/browser-brave.png"
                      alt="Brave"
                      width={18}
                      height={18}
                      className="size-[18px] rounded-full ring-1 ring-black/40"
                    />
                  </span>
                  Get extension
                </a>
              </div>
            </div>

            {/* Extension popup — bleeds off the bottom-right */}
            <div className="absolute right-8 top-[46%] z-[1] aspect-[720/1200] w-[250px] overflow-hidden rounded-[20px] bg-white shadow-[0px_24px_48px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-out group-hover:-translate-y-3 md:right-10 md:top-[42%] md:w-[290px]">
              <Image
                src="/images/varial-for-extension.png"
                alt="Varial browser extension"
                width={720}
                height={1200}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
