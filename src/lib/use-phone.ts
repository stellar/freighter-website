"use client";

import { useEffect, useState } from "react";

export type Phone = "ios" | "android" | null;

/**
 * Which phone the page is open on, from the user agent — `null` on
 * desktop (and during server rendering). Used to show only that phone's
 * store button where both would otherwise be listed.
 */
export function usePhone(): Phone {
  const [phone, setPhone] = useState<Phone>(null);

  useEffect(() => {
    // Deferred so the client-only value is not set synchronously in the effect
    const t = setTimeout(() => {
      const ua = navigator.userAgent;
      if (/iPhone|iPad|iPod/.test(ua)) setPhone("ios");
      else if (/Android/.test(ua)) setPhone("android");
    }, 0);
    return () => clearTimeout(t);
  }, []);

  return phone;
}
