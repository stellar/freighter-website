"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Scripted walkthrough that plays inside a hero phone: a finger taps through
 * a flow made of Figma frames (402×815 logical after the status bar is cropped).
 * Tap targets and sheet tops are percentages of that frame so they scale with
 * the phone. Screens switch instantly like the real app; only bottom sheets
 * animate.
 */

export const FRAME_W = 402;
export const FRAME_H = 815;
export const pct = (x: number, y: number) => ({
  x: (x / FRAME_W) * 100,
  y: (y / FRAME_H) * 100,
});

export type Scene = {
  /** Which full-screen frame is showing (key into `bases`) */
  base: string;
  /** Which bottom sheet is up (key into `sheets`), or none */
  sheet: string | null;
  cursor: { x: number; y: number } | null;
  pressed?: boolean;
  /** Small status line (spinner + text) at `labelTop` %, e.g. "Fetching quote…" */
  label?: string | null;
};

export type Step = [atMs: number, scene: Partial<Scene>];

export type FlowDemoConfig = {
  /** Folder under /images/ holding the frames */
  dir: string;
  bases: string[];
  /** sheet key → top edge in % of frame height */
  sheets?: Record<string, number>;
  /** where the status label sits, % of frame height */
  labelTop?: number;
  script: Step[];
  loopMs: number;
};

const INITIAL: Scene = {
  base: "",
  sheet: null,
  cursor: null,
  pressed: false,
  label: null,
};

export function FlowDemo({
  playing,
  config,
}: {
  playing: boolean;
  config: FlowDemoConfig;
}) {
  const { dir, bases, sheets = {}, labelTop = 40, script, loopMs } = config;
  const [scene, setScene] = useState<Scene>({ ...INITIAL, base: bases[0] });

  useEffect(() => {
    if (!playing) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      timers.forEach(clearTimeout);
      timers = script.map(([at, patch]) =>
        setTimeout(() => setScene((s) => ({ ...s, ...patch })), at),
      );
      timers.push(setTimeout(run, loopMs));
    };
    run();
    return () => {
      timers.forEach(clearTimeout);
      setScene({ ...INITIAL, base: bases[0] });
    };
  }, [playing, script, loopMs, bases]);

  const dimmed = scene.sheet !== null;

  return (
    <div className="relative h-full w-full overflow-hidden bg-white [container-type:inline-size]">
      {bases.map((b) => (
        <Image
          key={b}
          src={`/images/${dir}/${b}.png`}
          alt=""
          width={804}
          height={1630}
          draggable={false}
          sizes="380px"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: scene.base === b ? 1 : 0 }}
        />
      ))}

      {/* Status line, e.g. "Fetching quote…" */}
      <AnimatePresence>
        {scene.label && (
          <motion.div
            key="label"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            className="pointer-events-none absolute inset-x-0 flex -translate-y-1/2 items-center justify-center gap-[1.6%] text-[#8F8F8F]"
            style={{ top: `${labelTop}%`, fontSize: "3.5cqw", lineHeight: 1 }}
          >
            <span
              className="inline-block aspect-square w-[3.6%] animate-spin rounded-full border-[0.4cqw] border-[#DBDBDB] border-t-[#171717]"
              aria-hidden
            />
            <span>{scene.label}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dim overlay behind sheets */}
      <motion.div
        animate={{ opacity: dimmed ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0 bg-black/55"
      />

      {/* Bottom sheets — slide up from below */}
      <AnimatePresence>
        {Object.entries(sheets).map(([key, top]) =>
          scene.sheet === key ? (
            <motion.div
              key={key}
              initial={{ y: "40%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "25%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="absolute inset-x-0"
              style={{ top: `${top}%`, bottom: 0 }}
            >
              <Image
                src={`/images/${dir}/sheet-${key}.png`}
                alt=""
                width={804}
                height={Math.round(((100 - top) / 100) * 1630)}
                draggable={false}
                sizes="380px"
                className="h-full w-full object-cover object-top"
              />
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>

      {/* Finger */}
      <AnimatePresence>
        {scene.cursor && (
          <motion.div
            key="cursor"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              left: `${scene.cursor.x}%`,
              top: `${scene.cursor.y}%`,
              scale: scene.pressed ? 0.78 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              left: { type: "spring", stiffness: 220, damping: 26 },
              top: { type: "spring", stiffness: 220, damping: 26 },
              scale: { duration: 0.12 },
              opacity: { duration: 0.25 },
            }}
            className="pointer-events-none absolute z-20 aspect-square w-[13%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9A9A9A]/40 shadow-[0_2px_10px_rgba(0,0,0,0.2),inset_0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-[1px]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Flows                                                               */
/* ------------------------------------------------------------------ */

const SWAP = {
  key1: pct(69, 571),
  seeDetails: pct(267, 340),
  routeRow: pct(200, 705),
  routeClose: pct(354, 253),
  reviewSwap: pct(200, 500),
  confirm: pct(303, 751),
};

/** Enter an amount → quote → details → route → review → confirm → done. */
export const SWAP_DEMO: FlowDemoConfig = {
  dir: "swap-demo",
  bases: ["empty", "typed", "filled", "pending", "success"],
  sheets: {
    details: (496 / FRAME_H) * 100,
    route: (213 / FRAME_H) * 100,
    review: (189 / FRAME_H) * 100,
  },
  labelTop: (340 / FRAME_H) * 100,
  script: [
    [
      0,
      { base: "empty", sheet: null, cursor: null, pressed: false, label: null },
    ],
    [500, { cursor: SWAP.key1 }],
    [1000, { pressed: true }],
    [1120, { pressed: false, base: "typed", label: "Fetching quote…" }],
    [2400, { label: null, base: "filled" }],
    [3200, { cursor: SWAP.seeDetails }],
    [3700, { pressed: true }],
    [3820, { pressed: false, sheet: "details" }],
    [4800, { cursor: SWAP.routeRow }],
    [5300, { pressed: true }],
    [5420, { pressed: false, sheet: "route" }],
    [6800, { cursor: SWAP.routeClose }],
    [7300, { pressed: true }],
    [7420, { pressed: false, sheet: null }],
    [8100, { cursor: SWAP.reviewSwap }],
    [8600, { pressed: true }],
    [8720, { pressed: false, sheet: "review" }],
    [9700, { cursor: SWAP.confirm }],
    [10200, { pressed: true }],
    [10320, { pressed: false, sheet: null, base: "pending", cursor: null }],
    [12100, { base: "success" }],
    [14300, { base: "empty" }],
  ],
  loopMs: 14900,
};

const DISCOVER = {
  paste: pct(297, 118),
  tabs: pct(359, 55),
};

/** Paste a URL into search → site opens → open the tabs switcher. */
export const DISCOVER_DEMO: FlowDemoConfig = {
  dir: "discover-demo",
  bases: ["home", "site", "tabs"],
  script: [
    [
      0,
      { base: "home", sheet: null, cursor: null, pressed: false, label: null },
    ],
    [700, { cursor: DISCOVER.paste }],
    [1300, { pressed: true }],
    [1420, { pressed: false, base: "site" }],
    [3400, { cursor: DISCOVER.tabs }],
    [3900, { pressed: true }],
    [4020, { pressed: false, base: "tabs", cursor: null }],
    [6500, { base: "home" }],
  ],
  loopMs: 7200,
};
