"use client";

import { useSyncExternalStore } from "react";
import { LINKS } from "@/lib/constants";

// The browser never changes during a session, so there is nothing to subscribe to.
const subscribe = () => () => {};

const getClientSnapshot = () =>
  /firefox|fxios/i.test(navigator.userAgent)
    ? LINKS.firefoxExtension
    : LINKS.chromeExtension;

// Static export has no user agent at build time, so pre-render with the
// Chrome Web Store link (it also serves Brave, Edge, Opera, etc.) and swap
// to the right store after hydration.
const getServerSnapshot = () => LINKS.chromeExtension;

/** Store link for the Freighter extension matching the visitor's browser. */
export function useExtensionLink() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
