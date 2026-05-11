"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowDownBold,
  CaretDownBold,
  CheckCircleBold,
  ImageSquareBold,
} from "@/components/ui/PhosphorIcons";
import { SlidingNumber } from "@/components/ui/sliding-number";

/* ───────────────────────────────────────────────────
   Shared frame — clean card with stage; title lives
   outside the card in the carousel layout.
   ─────────────────────────────────────────────────── */

function FeatureCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`fc-card${className ? ` ${className}` : ""}`}>
      <div className="fc-stage">{children}</div>
    </div>
  );
}

/* Token chips — USDC sits in a blue disc with the white $ mark; XLM
   sits in a white disc with the black Stellar mark. Matches the
   styling used by the History card's TokenTile. */

function UsdcIcon({ className }: { className?: string }) {
  return (
    <span className={`fc-token-chip fc-token-chip--usdc${className ? ` ${className}` : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/usdc-logo.svg" alt="" />
    </span>
  );
}

function XlmIcon({ className }: { className?: string }) {
  return (
    <span className={`fc-token-chip fc-token-chip--xlm${className ? ` ${className}` : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/stellar-xlm-logo.png" alt="" />
    </span>
  );
}

/* ════════════════════════════════════════
   1. SEND — gray frame with white panel, USDC
       currency selector, cycling amount, and
       a separate Send button below.
   ════════════════════════════════════════ */

const SEND_AMOUNTS = [100, 250, 500, 1000] as const;

function SendStage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SEND_AMOUNTS.length);
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  const amount = SEND_AMOUNTS[index];

  return (
    <div className="fc-send-screen" aria-label="Choosing send amount">
      <div className="fc-send-panel" aria-hidden="true">
        <div className="fc-send-currency">
          <UsdcIcon className="fc-send-currency-icon" />
          <span className="fc-send-currency-code">USDC</span>
          <CaretDownBold size={14} className="fc-send-currency-caret" />
        </div>

        <div className="fc-send-amount">
          <span className="fc-send-amount-symbol">$</span>
          <span className="fc-send-amount-highlight">
            <SlidingNumber number={amount} className="fc-send-amount-num" />
            <span className="fc-send-amount-caret" />
          </span>
        </div>

        <div className="fc-send-balance">
          Balance: <span className="fc-send-balance-num">$4,921.22</span>
        </div>
      </div>

      <div className="fc-send-action" aria-hidden="true">Send</div>
    </div>
  );
}

/* ════════════════════════════════════════
   2. SWAP — two stacked currency panels with
       a small swap-indicator circle between
       them. Cycles through preset USDC ↔ XLM pairs.
   ════════════════════════════════════════ */

const SWAP_PAIRS = [
  { usdc: 10, xlm: 25.64 },
  { usdc: 25, xlm: 64.1 },
  { usdc: 50, xlm: 128.2 },
  { usdc: 100, xlm: 256.41 },
] as const;

function SwapArrowsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M8 3 V19 M8 19 L4.5 15.5 M8 19 L11.5 15.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 21 V5 M16 5 L12.5 8.5 M16 5 L19.5 8.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SwapStage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SWAP_PAIRS.length);
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  const pair = SWAP_PAIRS[index];

  return (
    <div className="fc-swap-screen" aria-label="Swapping currencies">
      <div className="fc-swap-panel" aria-hidden="true">
        <div className="fc-swap-amount">
          <span className="fc-swap-amount-symbol">$</span>
          <SlidingNumber number={pair.usdc} />
        </div>
        <div className="fc-swap-currency">
          <UsdcIcon className="fc-swap-currency-icon" />
          <span className="fc-swap-currency-code">USDC</span>
          <CaretDownBold size={12} className="fc-swap-currency-caret" />
        </div>
      </div>

      <div className="fc-swap-divider" aria-hidden="true">
        <div className="fc-swap-divider-button">
          <SwapArrowsIcon className="fc-swap-divider-icon" />
        </div>
      </div>

      <div className="fc-swap-panel" aria-hidden="true">
        <div className="fc-swap-amount">
          <SlidingNumber number={pair.xlm} decimalPlaces={2} />
          <span className="fc-swap-amount-suffix">XLM</span>
        </div>
        <div className="fc-swap-currency">
          <XlmIcon className="fc-swap-currency-icon" />
          <span className="fc-swap-currency-code">XLM</span>
          <CaretDownBold size={12} className="fc-swap-currency-caret" />
        </div>
      </div>
    </div>
  );
}

function ArstCoinFace() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <clipPath id="fc-arst-clip">
          <circle cx="50" cy="50" r="45" />
        </clipPath>
        <radialGradient id="fc-arst-gloss" cx="35%" cy="20%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="#82baf8" />
      <g clipPath="url(#fc-arst-clip)">
        <rect x="5" y="5" width="90" height="30" fill="#74b9ff" />
        <rect x="5" y="35" width="90" height="30" fill="#ffffff" />
        <rect x="5" y="65" width="90" height="30" fill="#74b9ff" />
        <circle cx="50" cy="50" r="8" fill="#ffd24f" />
        <path d="M50 33 L53 45 L65 45 L55 52 L59 64 L50 57 L41 64 L45 52 L35 45 L47 45 Z" fill="#ffbf33" opacity="0.75" />
      </g>
      <circle cx="50" cy="50" r="45" fill="url(#fc-arst-gloss)" />
    </svg>
  );
}

/* ════════════════════════════════════════
   3. DISCOVER — browsing app cards
   ════════════════════════════════════════ */

const DISCOVER_PANELS = ["top", "center", "bottom"] as const;

function DiscoverStage() {
  return (
    <div className="fc-discover-apps" aria-label="Browsing discover cards">
      <div className="fc-discover-panel-track" aria-hidden="true">
        {DISCOVER_PANELS.map((panel) => (
          <span key={panel} className={`fc-discover-panel fc-discover-panel--${panel}`} />
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   4. HISTORY — scrolling transaction feed
   ════════════════════════════════════════ */

/* Small white-circle token tile that can host either an inline SVG
   coin face (XLM, USDC) or a colored circle (other assets). */
function TokenTile({
  variant,
  background,
  letter,
}: {
  variant: "xlm" | "usdc" | "arst" | "color";
  background?: string;
  letter?: string;
}) {
  const base = "w-[40px] h-[40px] shrink-0 rounded-full flex items-center justify-center overflow-hidden";
  if (variant === "xlm") {
    return (
      <div className={`${base} bg-white`}>
        <Image
          src="/images/stellar-xlm-logo.png"
          alt=""
          width={24}
          height={24}
          className="w-[60%] h-[60%] object-contain"
        />
      </div>
    );
  }
  if (variant === "usdc") {
    return (
      <div className={`${base}`} style={{ background: "#2775ca" }}>
        <Image
          src="/images/usdc-logo.svg"
          alt=""
          width={28}
          height={28}
          className="w-[68%] h-[68%] object-contain"
        />
      </div>
    );
  }
  if (variant === "arst") {
    return (
      <div className={base}>
        <ArstCoinFace />
      </div>
    );
  }
  return (
    <div className={base} style={{ background }}>
      <span className="text-[14px] font-bold text-white">{letter}</span>
    </div>
  );
}

/* The little "Swapped" stack: XLM top-left, USDC bottom-right — they
   stagger diagonally to fit the same 40×40 footprint as a single token
   tile while reading clearly as two distinct coins. */
function SwapTile() {
  const chipBase =
    "absolute w-[28px] h-[28px] rounded-full flex items-center justify-center overflow-hidden ring-1 ring-[var(--fc-line)]";
  return (
    <div className="relative w-[40px] h-[40px] shrink-0">
      <div className={`${chipBase} left-0 top-0 bg-white`}>
        <Image
          src="/images/stellar-xlm-logo.png"
          alt=""
          width={20}
          height={20}
          className="w-[70%] h-[70%] object-contain"
        />
      </div>
      <div className={`${chipBase} right-0 bottom-0`} style={{ background: "#2775ca" }}>
        <Image
          src="/images/usdc-logo.svg"
          alt=""
          width={20}
          height={20}
          className="w-[70%] h-[70%] object-contain"
        />
      </div>
    </div>
  );
}

type HistoryItem = {
  action: string;
  primary: string;
  primaryColor: "green" | "white";
  tile: ReactNode;
};

const HISTORY_ITEMS: HistoryItem[] = [
  {
    tile: <SwapTile />,
    action: "Swapped",
    primary: "+40.40 USDC",
    primaryColor: "green",
  },
  {
    tile: <TokenTile variant="xlm" />,
    action: "Sent",
    primary: "−50.00 XLM",
    primaryColor: "white",
  },
  {
    tile: <TokenTile variant="xlm" />,
    action: "Received",
    primary: "+25.00 XLM",
    primaryColor: "green",
  },
  {
    tile: <TokenTile variant="usdc" />,
    action: "Sent",
    primary: "−15.00 USDC",
    primaryColor: "white",
  },
  {
    tile: <TokenTile variant="usdc" />,
    action: "Interacted",
    primary: "−20.00 USDC",
    primaryColor: "white",
  },
  {
    tile: <TokenTile variant="arst" />,
    action: "Received",
    primary: "+50.00 ARST",
    primaryColor: "green",
  },
];

function HistoryRow({ item }: { item: HistoryItem }) {
  const colorClass =
    item.primaryColor === "green"
      ? "text-[var(--fc-grn)]"
      : "text-[var(--fc-ink)]";
  return (
    <div className="flex items-center gap-3.5">
      {item.tile}
      <span className="flex-1 text-[15px] font-medium text-[var(--fc-ink)]">
        {item.action}
      </span>
      <span className={`text-[15px] font-semibold tabular-nums shrink-0 ${colorClass}`}>
        {item.primary}
      </span>
    </div>
  );
}

function HistoryStage() {
  return (
    <div className="fc-feed-wrap" aria-hidden="true">
      <div className="fc-feed-stack">
        {HISTORY_ITEMS.map((item, i) => (
          <div
            key={i}
            className="fc-feed-row"
            style={{ animationDelay: `${-i * 2}s` }}
          >
            <HistoryRow item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   5. COLLECTIBLES — 2x2 gallery placeholders
   ════════════════════════════════════════ */

const COLLECTIBLE_TILES = ["sky", "plum", "moss", "clay"] as const;

function CollectiblesStage() {
  return (
    <div className="fc-collectibles">
      <div className="fc-collectibles-grid">
        {COLLECTIBLE_TILES.map((tone) => (
          <div key={tone} className={`fc-collectible-tile fc-collectible-tile--${tone}`}>
            <ImageSquareBold className="fc-collectible-icon" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   6. RECEIVE — incoming payment notification
   A notification card slides down from the top with a green arrow-down
   badge, the received amount, and a check that pops in once it lands.
   ════════════════════════════════════════ */

function ReceiveStage() {
  const items = [
    { amount: "+$50.00 USDC", meta: "Received", variant: "front" },
    { amount: "+$24.18 XLM", meta: "Received", variant: "middle" },
    { amount: "+$12.50 AQUA", meta: "Received", variant: "back" },
  ];

  return (
    <div className="fc-receive-incoming">
      <div className="fc-receive-incoming-glow" aria-hidden="true" />
      {items.map((item) => (
        <div
          key={item.variant}
          className={`fc-receive-incoming-card fc-receive-incoming-card--${item.variant}`}
          aria-hidden="true"
        >
          <span className="fc-receive-incoming-badge">
            <ArrowDownBold size={14} />
          </span>
          <span className="fc-receive-incoming-text">
            <span className="fc-receive-incoming-amount">{item.amount}</span>
            <span className="fc-receive-incoming-meta">{item.meta}</span>
          </span>
          <span className="fc-receive-incoming-check">
            <CheckCircleBold size={16} />
          </span>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   7. WALLETS — stacked wallet cards
   ════════════════════════════════════════ */

function WalletIdenticon() {
  const cells = [
    [1, 0, 1, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 1, 0, 1, 1],
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
  ];

  return (
    <svg viewBox="0 0 5 5" shapeRendering="crispEdges" aria-hidden="true">
      <rect width="5" height="5" fill="#d9d9d9" />
      {cells.flatMap((row, y) =>
        row.map((on, x) =>
          on ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#737373" /> : null,
        ),
      )}
    </svg>
  );
}

function WalletsStage() {
  return (
    <div className="fc-wallet-stage" aria-label="Multiple wallets stacked together">
      <div className="fc-wallet-stack" aria-hidden="true">
        <span className="fc-wallet-card fc-wallet-card--back fc-wallet-card--left" />
        <span className="fc-wallet-card fc-wallet-card--back fc-wallet-card--center" />
        <span className="fc-wallet-card fc-wallet-card--back fc-wallet-card--right" />
        <span className="fc-wallet-card fc-wallet-card--front">
          <span className="fc-wallet-avatar">
            <WalletIdenticon />
          </span>
          <span className="fc-wallet-address">GC6N...K4P9</span>
          <span className="fc-wallet-balance">$281</span>
        </span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   8. EARN — interest accruing on a balance
   A circular progress ring sweeps to ~75% (three-quarters), while the
   balance counts up from $0 → $349 to convey interest accumulating.
   The "4% interest" tag fades in below the amount.
   ════════════════════════════════════════ */

const EARN_ARC_FILL = 0.75;

function EarnStage() {
  const [display, setDisplay] = useState({ amount: 0, progress: 0, showRate: false });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const frame = requestAnimationFrame(() => {
        setDisplay({ amount: 349, progress: 1, showRate: true });
      });
      return () => cancelAnimationFrame(frame);
    }

    let frame = 0;
    const duration = 5600;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = () => {
      const cycle = (performance.now() % duration) / duration;
      const active = Math.min(1, Math.max(0, (cycle - 0.08) / 0.64));
      const reset = cycle > 0.92 ? Math.max(0, 1 - (cycle - 0.92) / 0.08) : 1;
      const progress = easeOutCubic(active) * reset;

      setDisplay({
        amount: Math.round(349 * progress),
        progress,
        showRate: cycle > 0.68 && cycle < 0.92,
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const arcOffset = 100 - display.progress * EARN_ARC_FILL * 100;

  return (
    <div className="fc-earn">
      <svg
        viewBox="0 0 200 200"
        className="fc-earn-svg"
        aria-hidden="true"
      >
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
        />
        <circle
          className="fc-earn-arc"
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="#5fffaf"
          strokeWidth="10"
          strokeLinecap="round"
          pathLength="100"
          transform="rotate(-90 100 100)"
          style={{ strokeDasharray: 100, strokeDashoffset: arcOffset }}
        />
      </svg>
      <div className="fc-earn-text">
        <div className="fc-earn-amount" aria-label={`$${display.amount}`}>
          <span aria-hidden="true">$</span>
          <SlidingNumber number={display.amount} aria-hidden="true" />
        </div>
        <div className={`fc-earn-rate${display.showRate ? " fc-earn-rate--visible" : ""}`}>
          Earned 13.2% APY*
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   Wrappers — wrap each stage in the card frame
   ════════════════════════════════════════ */

export function SendAnimation()         { return <FeatureCard><SendStage /></FeatureCard>; }
export function SwapAnimation()         { return <FeatureCard><SwapStage /></FeatureCard>; }
export function DiscoverAnimation()     { return <FeatureCard><DiscoverStage /></FeatureCard>; }
export function HistoryAnimation()      { return <FeatureCard><HistoryStage /></FeatureCard>; }
export function CollectiblesAnimation() { return <FeatureCard><CollectiblesStage /></FeatureCard>; }
export function ReceiveAnimation()      { return <FeatureCard><ReceiveStage /></FeatureCard>; }
export function WalletsAnimation()      { return <FeatureCard><WalletsStage /></FeatureCard>; }
export function EarnAnimation()         { return <FeatureCard className="fc-card--raised"><EarnStage /></FeatureCard>; }

export const FEATURE_ANIMATIONS: Record<string, ComponentType> = {
  Send: SendAnimation,
  Swap: SwapAnimation,
  Discover: DiscoverAnimation,
  History: HistoryAnimation,
  Collectibles: CollectiblesAnimation,
  Receive: ReceiveAnimation,
  Wallets: WalletsAnimation,
  Deposit: EarnAnimation,
};
