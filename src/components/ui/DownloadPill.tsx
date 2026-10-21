"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { LINKS } from "@/lib/constants";
import {
  AppleLogoFill,
  AndroidLogoFill,
  QrCodeBold,
} from "@/components/ui/PhosphorIcons";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The floating Download button. On desktop a click unfolds the pill into a
 * card with a QR code (which opens /get — phones are routed to their store);
 * on a phone the button simply opens the right store.
 */
export function DownloadPill() {
  const [open, setOpen] = useState(false);
  const [qrValue, setQrValue] = useState("https://varial.app/get"); // TODO(varial): domain
  const [phoneStore, setPhoneStore] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Deferred so the client-only values are not set synchronously inside the effect
    const t = setTimeout(() => {
      setQrValue(`${window.location.origin}/get`);
      const ua = navigator.userAgent;
      if (/iPhone|iPad|iPod/.test(ua)) setPhoneStore(LINKS.iosApp);
      else if (/Android/.test(ua)) setPhoneStore(LINKS.androidApp);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // On a phone the pill is just a link to that phone's store, with its logo.
  if (phoneStore) {
    const StoreLogo =
      phoneStore === LINKS.iosApp ? AppleLogoFill : AndroidLogoFill;
    return (
      <a
        href={phoneStore}
        className="fixed right-[max(1.5rem,calc((100vw-1280px)/2))] top-5 z-50 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#171717] pl-4 pr-5 py-2 text-base font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-colors duration-200 hover:bg-[#2a2a2a]"
      >
        <StoreLogo size={18} className="shrink-0" />
        Download
      </a>
    );
  }

  return (
    <div className="fixed right-[max(1.5rem,calc((100vw-1280px)/2))] top-5 z-50">
      <LayoutGroup>
        <AnimatePresence mode="popLayout" initial={false}>
          {!open ? (
            <motion.button
              key="pill"
              layoutId="download-pill"
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                layout: { duration: 0.45, ease: EASE },
                opacity: { duration: 0.15 },
              }}
              style={{ borderRadius: 999 }}
              className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 bg-[#171717] pl-4 pr-5 py-2 text-base font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-colors duration-200 hover:bg-[#2a2a2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/70"
            >
              <QrCodeBold size={18} className="shrink-0" />
              Download
            </motion.button>
          ) : (
            <motion.div
              key="card"
              ref={cardRef}
              layoutId="download-pill"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                layout: { duration: 0.45, ease: EASE },
                opacity: { duration: 0.2 },
              }}
              style={{ borderRadius: 28 }}
              className="w-[320px] overflow-hidden bg-white p-6 shadow-[0_24px_64px_rgba(0,0,0,0.18)] ring-1 ring-[#EDEDED]"
              role="dialog"
              aria-label="Download Varial"
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.35, ease: EASE }}
                className="flex flex-col items-center gap-5"
              >
                <div className="flex w-full items-start justify-between">
                  <div>
                    <p className="text-lg font-medium tracking-[-0.02em] text-[#171717]">
                      Scan to get Varial
                    </p>
                    <p className="mt-0.5 text-sm text-[#6F6F6F]">
                      Point your camera at the code
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="-mr-2 -mt-1 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#6F6F6F] transition-colors hover:bg-[#F3F3F3] hover:text-[#171717]"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M4 4l8 8M12 4l-8 8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="qr-rounded flex w-full justify-center rounded-[20px] bg-[#F6F6F5] p-5">
                  <QRCodeSVG
                    value={qrValue}
                    size={232}
                    bgColor="transparent"
                    fgColor="#171717"
                    level="M"
                    imageSettings={{
                      src: "/images/varial-icon.svg",
                      width: 40,
                      height: 40,
                      excavate: true,
                    }}
                  />
                </div>

                <div className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F3F3F3] px-4 py-2.5 text-sm font-medium text-[#171717]">
                  <AndroidLogoFill size={16} />
                  <AppleLogoFill size={16} />
                  iOS and Android
                </div>

                <a
                  href={LINKS.chromeExtension}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-mt-1 text-sm font-medium text-[#6F6F6F] transition-colors hover:text-[#171717]"
                >
                  Get the browser extension →
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}
