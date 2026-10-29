"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LINKS } from "@/lib/constants";
import { AppleLogoFill, AndroidLogoFill } from "@/components/ui/PhosphorIcons";

/**
 * /get — the link behind the download QR. Phones are sent straight to their
 * store; the two store links are always shown as a fallback in case the
 * hand-off is blocked or the visitor comes back.
 */
export default function GetPage() {
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    const ua = navigator.userAgent;
    const target = /iPhone|iPad|iPod/.test(ua)
      ? LINKS.iosApp
      : /Android/.test(ua)
        ? LINKS.androidApp
        : null;
    if (target) {
      window.location.replace(target);
      return;
    }
    // Not a phone: show the links (deferred so it is not a synchronous setState in the effect)
    const t = setTimeout(() => setRedirecting(false), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-medium tracking-[-0.04em] text-[#171717]">
        {redirecting ? "Opening the store…" : "Get Varial"}
      </h1>
      <div className="flex flex-wrap justify-center gap-3">
        <a
          href={LINKS.iosApp}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-base font-semibold text-white"
        >
          <AppleLogoFill size={18} /> Get iOS
        </a>
        <a
          href={LINKS.androidApp}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-base font-semibold text-white"
        >
          <AndroidLogoFill size={18} /> Get Android
        </a>
      </div>
      <Link
        href="/"
        className="text-sm font-medium text-[#6F6F6F] hover:text-[#171717]"
      >
        Back to varial
      </Link>
    </main>
  );
}
