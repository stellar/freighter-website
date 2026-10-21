"use client";

import { motion } from "framer-motion";
import { fadeSlideUp } from "@/lib/animations";
import { LINKS } from "@/lib/constants";
import {
  BrowserBadge,
  useBrowser,
  extensionHref,
} from "@/components/ui/BrowserBadge";
import Image from "next/image";
import { AppleLogoFill, AndroidLogoFill } from "@/components/ui/PhosphorIcons";
import { usePhone } from "@/lib/use-phone";

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
  const browser = useBrowser();
  // On a phone, only that phone's store button
  const phone = usePhone();
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
                Take Varial with you
              </h3>
              <p className="mt-2 min-h-12 text-base leading-6 text-[#6F6F6F]">
                Available on iOS and Android.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {phone !== "android" && (
                  <a href={LINKS.iosApp} className={PRIMARY_BTN}>
                    <AppleLogoFill size={16} />
                    Get iOS
                  </a>
                )}
                {phone !== "ios" && (
                  <a href={LINKS.androidApp} className={PRIMARY_BTN}>
                    <AndroidLogoFill size={16} />
                    Get Android
                  </a>
                )}
              </div>
            </div>

            {/* Phone — monotone device frame, bleeds off the bottom-right */}
            <div className="absolute right-8 top-[50%] z-[1] w-[236px] rounded-[36px] bg-[#171717] p-[10px] shadow-[0px_24px_48px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-out group-hover:-translate-y-3 md:right-10 md:top-[49%] md:w-[270px]">
              <div className="relative overflow-hidden rounded-[28px] bg-white pt-7">
                {/* Dynamic island */}
                <span
                  className="absolute left-1/2 top-2 z-10 h-[18px] w-[64px] -translate-x-1/2 rounded-full bg-[#171717]"
                  aria-hidden
                />
                <div className="aspect-[804/1630] w-full">
                  <Image
                    src="/images/varial-wallet.png"
                    alt="Varial mobile app"
                    width={804}
                    height={1630}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* For browser */}
          <div className="group relative flex h-[340px] flex-col overflow-hidden rounded-[32px] bg-white p-8 md:h-[500px] md:p-10">
            <Glow />

            <div className="relative z-10 max-w-[320px]">
              <h3 className="text-2xl font-medium tracking-[-0.04em] text-[#171717] sm:text-[28px]">
                Varial in your browser
              </h3>
              <p className="mt-2 min-h-12 text-base leading-6 text-[#6F6F6F]">
                Connect to Stellar apps with the browser extension.
              </p>
              <div className="mt-5 hidden md:block">
                <a
                  href={extensionHref(browser)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={PRIMARY_BTN}
                >
                  <BrowserBadge browser={browser} />
                  Get extension
                </a>
              </div>
            </div>

            {/* Browser window: toolbar, and the extension popup hanging under its icon */}
            <div className="absolute right-8 top-[46%] z-[1] w-[300px] overflow-hidden rounded-[16px] bg-[#F3F3F3] shadow-[0px_24px_48px_rgba(0,0,0,0.2)] ring-1 ring-[#EDEDED] transition-transform duration-500 ease-out group-hover:-translate-y-3 md:right-10 md:top-[48%] md:w-[340px]">
              {/* Toolbar */}
              <div
                className="flex items-center gap-3 bg-[#F8F8F8] px-3 py-2.5"
                aria-hidden
              >
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#DBDBDB]" />
                  <span className="size-2.5 rounded-full bg-[#DBDBDB]" />
                  <span className="size-2.5 rounded-full bg-[#DBDBDB]" />
                </span>
                <span className="h-6 flex-1 rounded-full bg-white shadow-[inset_0_0_0_1px_#EDEDED]" />
                {/* Extension icon, pressed */}
                <span className="flex size-7 items-center justify-center rounded-[8px] bg-[#EDEDED]">
                  <Image
                    src="/images/varial-icon.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="size-4 rounded-[4px]"
                  />
                </span>
              </div>
              {/* Page + popup */}
              <div className="relative h-[520px]">
                <div className="absolute right-2 top-0 w-[76%] overflow-hidden rounded-b-[14px] bg-white shadow-[0px_16px_40px_rgba(0,0,0,0.18)] ring-1 ring-[#EDEDED]">
                  <div className="aspect-[720/1200] w-full">
                    <Image
                      src="/images/varial-for-extension.png"
                      alt="Varial browser extension"
                      width={720}
                      height={1200}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
