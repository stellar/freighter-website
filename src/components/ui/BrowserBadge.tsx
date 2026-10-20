"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LINKS } from "@/lib/constants";

type Browser = "chrome" | "firefox" | "brave" | "unknown";

/** Detects the visitor's browser on the client (Brave exposes `navigator.brave`). */
export function useBrowser(): Browser {
  const [browser, setBrowser] = useState<Browser>("unknown");
  useEffect(() => {
    const nav = navigator as Navigator & {
      brave?: { isBrave?: () => Promise<boolean> };
    };
    const ua = navigator.userAgent;
    const detect = async (): Promise<Browser> => {
      if (nav.brave?.isBrave && (await nav.brave.isBrave())) return "brave";
      if (/Firefox\//.test(ua)) return "firefox";
      if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return "chrome";
      return "unknown";
    };
    let cancelled = false;
    detect().then((b) => {
      if (!cancelled) setBrowser(b);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return browser;
}

const ICONS: Record<
  Exclude<Browser, "unknown">,
  { src: string; alt: string }
> = {
  chrome: { src: "/images/chrome-icon.png", alt: "Chrome" },
  firefox: { src: "/images/browser-firefox.png", alt: "Firefox" },
  brave: { src: "/images/browser-brave.png", alt: "Brave" },
};

/** The store link for the visitor's browser; Chrome Web Store otherwise. */
export function extensionHref(browser: Browser) {
  return browser === "firefox" && LINKS.firefoxExtension !== "#"
    ? LINKS.firefoxExtension
    : LINKS.chromeExtension;
}

/**
 * Browser icon(s) for an extension button: the visitor's own browser when it
 * is one we support, otherwise the three-icon stack.
 */
export function BrowserBadge({
  browser,
  ring = "ring-black/40",
}: {
  browser: Browser;
  ring?: string;
}) {
  if (browser !== "unknown") {
    const icon = ICONS[browser];
    return (
      <Image
        src={icon.src}
        alt={icon.alt}
        width={18}
        height={18}
        className={`size-[18px] rounded-full ring-1 ${ring}`}
      />
    );
  }
  return (
    <span className="flex shrink-0 items-center -space-x-1">
      {(["chrome", "firefox", "brave"] as const).map((b) => (
        <Image
          key={b}
          src={ICONS[b].src}
          alt={ICONS[b].alt}
          width={18}
          height={18}
          className={`size-[18px] rounded-full ring-1 ${ring}`}
        />
      ))}
    </span>
  );
}
