"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";
import {
  ArrowDownBold,
  BridgeFill,
  CaretDownBold,
  ChartBarFill,
  ChartLineUpFill,
  CheckCircleBold,
  CoinFill,
  CurrencyDollarFill,
  GameControllerFill,
  HandCoinsFill,
  ImageFill,
  ImagesFill,
  UsersThreeFill,
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
   1. SEND — sliding amount rolls to $125.00,
       presses Send, then fades to a CheckCircle
       + "Sent" confirmation. Panel stays gray.
   ════════════════════════════════════════ */

function SendStage() {
  const [phase, setPhase] = useState<"idle" | "pressing" | "sent">("idle");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setPhase("sent");
      return;
    }
    const timers: number[] = [];
    const queue = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const cycle = () => {
      setPhase("idle");
      // Press-and-hold begins after a brief reading beat.
      queue(() => setPhase("pressing"), 1400);
      // Hold the press long enough for the fill to sweep across.
      queue(() => setPhase("sent"), 2200);
      // Confirmation holds, then loop (gives ~3.8s on the Sent state).
      queue(cycle, 6000);
    };
    cycle();
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const isSent = phase === "sent";
  const isPressed = phase === "pressing";

  return (
    <div className="fc-send-screen" aria-label="Sending payment">
      <div className="fc-send-panel" aria-hidden="true">
        <div className={`fc-send-panel-content${isSent ? " is-hidden" : ""}`}>
          <div className="fc-send-recipient">
            <span className="fc-send-recipient-label">To:</span>
            <span className="fc-send-recipient-address">G80FJ...8HPOD</span>
          </div>

          <div className="fc-send-amount">
            <span className="fc-send-amount-symbol">$</span>
            <span className="fc-send-amount-num">60.00</span>
          </div>

          <div className="fc-send-currency">
            <UsdcIcon className="fc-send-currency-icon" />
            <span className="fc-send-currency-code">USDC</span>
            <CaretDownBold size={14} className="fc-send-currency-caret" />
          </div>
        </div>

        <div
          className={`fc-send-action${isPressed ? " fc-send-action--pressed" : ""}${isSent ? " fc-send-action--filled" : ""}`}
          aria-hidden="true"
        >
          <span className="fc-send-action-label">Send</span>
        </div>

        <div className={`fc-send-confirmed${isSent ? " is-visible" : ""}`}>
          <CheckCircleBold className="fc-send-confirmed-icon" />
          <span className="fc-send-confirmed-text">Sent</span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   2. SWAP — two stacked currency panels with
       a small swap-indicator circle between
       them. Cycles through preset USDC ↔ XLM pairs.
   ════════════════════════════════════════ */

const SWAP_XLM_AMOUNTS = [100, 250, 500] as const;
const SWAP_FALLBACK_RATE = 0.39;
const SWAP_TYPE_INTERVAL = 120;
const SWAP_ERASE_INTERVAL = 80;
const SWAP_HOLD_DURATION = 1500;
const SWAP_BETWEEN_DELAY = 220;

function SwapStage({ xlmUsdRate }: { xlmUsdRate?: number }) {
  const [valueIndex, setValueIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTypedChars(String(SWAP_XLM_AMOUNTS[0]).length);
      return;
    }
    const timers: number[] = [];
    const queue = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const runCycle = (idx: number) => {
      const fullStr = String(SWAP_XLM_AMOUNTS[idx]);
      const len = fullStr.length;
      setValueIndex(idx);
      setTypedChars(0);

      for (let i = 1; i <= len; i++) {
        queue(() => setTypedChars(i), i * SWAP_TYPE_INTERVAL);
      }
      const eraseStart = len * SWAP_TYPE_INTERVAL + SWAP_HOLD_DURATION;
      for (let i = 1; i <= len; i++) {
        queue(() => setTypedChars(len - i), eraseStart + i * SWAP_ERASE_INTERVAL);
      }

      const cycleDone = eraseStart + len * SWAP_ERASE_INTERVAL + SWAP_BETWEEN_DELAY;
      queue(() => runCycle((idx + 1) % SWAP_XLM_AMOUNTS.length), cycleDone);
    };

    runCycle(0);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const rate = xlmUsdRate && xlmUsdRate > 0 ? xlmUsdRate : SWAP_FALLBACK_RATE;
  const fullStr = String(SWAP_XLM_AMOUNTS[valueIndex]);
  const xlmShown = fullStr.slice(0, typedChars);
  const xlmValue = xlmShown ? Number(xlmShown) : 0;
  const usdcValue = xlmValue * rate;
  const pair = { xlm: xlmShown || "0", usdc: usdcValue };

  return (
    <div className="fc-swap-screen" aria-label="Swapping currencies">
      <div className="fc-swap-panel" aria-hidden="true">
        <div className="fc-swap-panel-label">You sell</div>
        <div className="fc-swap-panel-main">
          <div className="fc-swap-amount">
            <span>{pair.xlm}</span>
          </div>
          <div className="fc-swap-currency">
            <XlmIcon className="fc-swap-currency-icon" />
            <span className="fc-swap-currency-code">XLM</span>
            <CaretDownBold size={12} className="fc-swap-currency-caret" />
          </div>
        </div>
        <div className="fc-swap-panel-footer">
          <span className="fc-swap-panel-usd">${pair.usdc.toFixed(2)}</span>
        </div>
      </div>

      <div className="fc-swap-divider" aria-hidden="true">
        <div className="fc-swap-divider-button">
          <CaretDownBold className="fc-swap-divider-icon" />
        </div>
      </div>

      <div className="fc-swap-panel" aria-hidden="true">
        <div className="fc-swap-panel-label">You receive</div>
        <div className="fc-swap-panel-main">
          <div className="fc-swap-amount">
            <span>{pair.usdc.toFixed(2)}</span>
          </div>
          <div className="fc-swap-currency">
            <UsdcIcon className="fc-swap-currency-icon" />
            <span className="fc-swap-currency-code">USDC</span>
            <CaretDownBold size={12} className="fc-swap-currency-caret" />
          </div>
        </div>
        <div className="fc-swap-panel-footer">
          <span className="fc-swap-panel-usd">${pair.usdc.toFixed(2)}</span>
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
   3. DISCOVER — pill toggles for browsing
       categories. The active pill cycles through
       the set to show the filter behaviour.
   ════════════════════════════════════════ */

const DISCOVER_CATEGORIES = [
  { label: "Payments", Icon: CurrencyDollarFill, bg: "#3ecf8e", fg: "#0a3320" },
  { label: "Bridges", Icon: BridgeFill, bg: "#4cb9ff", fg: "#04263f" },
  { label: "Trading", Icon: ChartLineUpFill, bg: "#ffd24f", fg: "#3a2a14" },
  { label: "Lending", Icon: HandCoinsFill, bg: "#b390ff", fg: "#1a0d3d" },
  { label: "Derivatives", Icon: ChartBarFill, bg: "#7B68FF", fg: "#ffffff" },
  { label: "Stablecoins", Icon: CoinFill, bg: "#4cd6c1", fg: "#04302a" },
  { label: "Collectibles", Icon: ImagesFill, bg: "#ff5fa2", fg: "#ffffff" },
  { label: "Gaming", Icon: GameControllerFill, bg: "#ff8a4c", fg: "#ffffff" },
  { label: "Social", Icon: UsersThreeFill, bg: "#ff7474", fg: "#ffffff" },
] as const;

function DiscoverStage() {
  // Triple the pill set so the carousel can loop infinitely: pills sit
  // to the left of the active one (faded behind the mask) AND to the
  // right of it at all times. When the active index reaches the third
  // copy we silently snap back into the second copy — the visible
  // viewport is identical so the swap is invisible.
  const N = DISCOVER_CATEGORIES.length;
  const items = [...DISCOVER_CATEGORIES, ...DISCOVER_CATEGORIES, ...DISCOVER_CATEGORIES];
  const [activeIndex, setActiveIndex] = useState<number>(N);
  const [transitionOn, setTransitionOn] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [trackOffset, setTrackOffset] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }
    const id = window.setInterval(() => {
      setActiveIndex((i) => i + 1);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  // Anchor the active pill to the left of the visible track each time
  // the selection advances. Measured after layout so pill widths are real.
  useEffect(() => {
    const track = trackRef.current;
    const activePill = pillRefs.current[activeIndex];
    if (!track || !activePill) {
      return;
    }
    const paddingLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    setTrackOffset(paddingLeft - activePill.offsetLeft);
  }, [activeIndex]);

  // When the active pill has advanced into the third copy, wait for the
  // in-flight transition to finish and then silently jump back into the
  // second copy at the equivalent category — keeps the loop endless.
  useEffect(() => {
    if (activeIndex < 2 * N) {
      return;
    }
    const t = window.setTimeout(() => {
      setTransitionOn(false);
      setActiveIndex((i) => i - N);
      // Re-enable transitions two frames later so the jump itself
      // doesn't animate but subsequent advances do.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionOn(true));
      });
    }, 650);
    return () => window.clearTimeout(t);
  }, [activeIndex, N]);

  const realIndex = activeIndex % N;

  return (
    <div className="fc-discover" aria-label="Browsing discover categories">
      <div className="fc-discover-pills" aria-hidden="true">
        <div
          ref={trackRef}
          className="fc-discover-pills-track"
          style={{
            transform: `translateX(${trackOffset}px)`,
            transition: transitionOn ? undefined : "none",
          }}
        >
          {items.map(({ label, Icon, bg, fg }, i) => {
            const isActive = i === activeIndex;
            return (
              <span
                key={i}
                ref={(el) => {
                  pillRefs.current[i] = el;
                }}
                className="fc-discover-pill"
                data-active={isActive ? "" : undefined}
                style={
                  isActive
                    ? ({ "--fc-pill-bg": bg, "--fc-pill-fg": fg } as CSSProperties)
                    : undefined
                }
              >
                <Icon className="fc-discover-pill-icon" />
                <span>{label}</span>
              </span>
            );
          })}
        </div>
      </div>

      <div
        key={realIndex}
        className="fc-discover-rows"
        aria-hidden="true"
      >
        <div className="fc-discover-row" />
        <div className="fc-discover-row" />
        <div className="fc-discover-row" />
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
    primary: "+$40.40",
    primaryColor: "green",
  },
  {
    tile: <TokenTile variant="xlm" />,
    action: "Sent",
    primary: "$19.50",
    primaryColor: "white",
  },
  {
    tile: <TokenTile variant="xlm" />,
    action: "Received",
    primary: "+$9.75",
    primaryColor: "green",
  },
  {
    tile: <TokenTile variant="usdc" />,
    action: "Sent",
    primary: "$15.00",
    primaryColor: "white",
  },
  {
    tile: <TokenTile variant="usdc" />,
    action: "Interacted",
    primary: "$20.00",
    primaryColor: "white",
  },
  {
    tile: <TokenTile variant="arst" />,
    action: "Received",
    primary: "+$13.20",
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
      <span className="fc-feed-row-text flex-1 font-medium text-[var(--fc-ink)]">
        {item.action}
      </span>
      <span className={`fc-feed-amount fc-feed-row-text font-semibold tabular-nums shrink-0 ${colorClass}`}>
        {item.primary}
      </span>
    </div>
  );
}

function HistoryStage() {
  return (
    <div className="fc-feed-wrap" aria-hidden="true">
      <div className="fc-feed-heading">This month</div>
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

const COLLECTIBLE_TILES: ReadonlyArray<{ variant: string }> = [
  { variant: "sky" },
  { variant: "plum" },
  { variant: "moss" },
  { variant: "clay" },
];

function CollectiblesStage() {
  return (
    <div className="fc-collectibles">
      <div className="fc-collectibles-grid">
        {COLLECTIBLE_TILES.map(({ variant }) => (
          <div key={variant} className={`fc-collectible-tile fc-collectible-tile--${variant}`}>
            <ImageFill className="fc-collectible-icon" />
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
   7. WALLETS — column list of accounts. Each row
       has an identicon, address, and balance, so
       the card reads as a real wallet switcher.
   ════════════════════════════════════════ */

type IdenticonCells = ReadonlyArray<ReadonlyArray<0 | 1>>;

function WalletIdenticon({
  cells,
  on,
  off,
}: {
  cells: IdenticonCells;
  on: string;
  off: string;
}) {
  return (
    <svg viewBox="0 0 5 5" shapeRendering="crispEdges" aria-hidden="true">
      <rect width="5" height="5" fill={off} />
      {cells.flatMap((row, y) =>
        row.map((cell, x) =>
          cell ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={on} /> : null,
        ),
      )}
    </svg>
  );
}

const WALLETS = [
  {
    name: "Personal",
    address: "GC6N...K4P9",
    balance: "$1,420.18",
    cells: [
      [1, 0, 1, 0, 1],
      [0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1],
    ] as IdenticonCells,
    on: "#9E8CFC",
    off: "#3A2F6E",
  },
  {
    name: "Trading",
    address: "GBQH...28HF",
    balance: "$483.62",
    cells: [
      [0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [0, 1, 1, 1, 0],
      [1, 0, 1, 0, 1],
      [0, 1, 1, 1, 0],
    ] as IdenticonCells,
    on: "#5fffaf",
    off: "#163b2c",
  },
  {
    name: "Savings",
    address: "GAZX...8L2J",
    balance: "$94.10",
    cells: [
      [1, 1, 0, 1, 1],
      [1, 0, 1, 0, 1],
      [0, 1, 1, 1, 0],
      [1, 0, 1, 0, 1],
      [1, 1, 0, 1, 1],
    ] as IdenticonCells,
    on: "#f4b860",
    off: "#3a2a14",
  },
] as const;

function WalletsStage() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }
    const id = window.setInterval(() => {
      setSelectedIndex((i) => (i + 1) % WALLETS.length);
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="fc-wallet-stage" aria-label="Multiple wallets">
      <div className="fc-wallet-list" aria-hidden="true">
        {WALLETS.map((w, i) => {
          const isSelected = i === selectedIndex;
          return (
            <div
              key={w.address}
              className={`fc-wallet-row${isSelected ? " fc-wallet-row--selected" : ""}`}
            >
              <span className="fc-wallet-row-avatar">
                <WalletIdenticon cells={w.cells} on={w.on} off={w.off} />
                <span
                  className={`fc-wallet-row-badge${isSelected ? " is-visible" : ""}`}
                >
                  <ThickCheck />
                </span>
              </span>
              <span className="fc-wallet-row-text">
                <span className="fc-wallet-row-name">{w.name}</span>
                <span className="fc-wallet-row-address">{w.address}</span>
              </span>
              <span className="fc-wallet-row-balance">{w.balance}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   8. DEPOSIT — single dashed pill that cycles
       through deposit-flow states, surrounded
       by concentric dashed rings.
   ════════════════════════════════════════ */

const DEPOSIT_STATES = [
  "Connecting",
  "Selecting amount",
  "Amount: $500",
  "Confirming",
  "Deposited",
] as const;

const DEPOSIT_RING_COUNT = 6;

function ThickCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5 L10 17 L19 7.5"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EarnStage() {
  const [stateIndex, setStateIndex] = useState(0);
  const [ringsActive, setRingsActive] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const [pillSize, setPillSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }
    // Each non-final state holds for DEFAULT_HOLD. The final ("Deposited")
    // state has its own three-beat sequence: rings ripple in to white →
    // rings ripple back out to invisible → a short hold on the white pill
    // alone → cycle restarts.
    const DEFAULT_HOLD = 1500;
    const RIPPLE_STAGGER = 50;
    const RIPPLE_TRANSITION = 300;
    const RIPPLE_DURATION = DEPOSIT_RING_COUNT * RIPPLE_STAGGER + RIPPLE_TRANSITION;
    const PILL_HOLD_AFTER_RINGS = 900;

    let cancelled = false;
    let timer: number | undefined;

    const advanceTo = (idx: number) => {
      if (cancelled) return;
      setStateIndex(idx);

      if (idx === DEPOSIT_STATES.length - 1) {
        // Rings ripple in (turn white).
        setRingsActive(true);
        timer = window.setTimeout(() => {
          if (cancelled) return;
          // Rings ripple back out to invisible, pill stays "Deposited".
          setRingsActive(false);
          timer = window.setTimeout(() => {
            if (cancelled) return;
            // Pause done — restart from the first state.
            advanceTo(0);
          }, RIPPLE_DURATION + PILL_HOLD_AFTER_RINGS);
        }, RIPPLE_DURATION);
      } else {
        setRingsActive(false);
        timer = window.setTimeout(() => {
          advanceTo(idx + 1);
        }, DEFAULT_HOLD);
      }
    };

    advanceTo(0);
    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  // Track the pill's actual rendered size so the surrounding rings can
  // ease toward the pill's current width / height. Use `offsetWidth` /
  // `offsetHeight` (includes padding + border) so the rings sit outside
  // the pill's visible edge, not its content box — otherwise the first
  // ring hugs the pill too tightly.
  useEffect(() => {
    const pill = pillRef.current;
    if (!pill || typeof ResizeObserver === "undefined") {
      return;
    }
    const measure = () => {
      setPillSize({ width: pill.offsetWidth, height: pill.offsetHeight });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(pill);
    measure();
    return () => observer.disconnect();
  }, []);

  const isDone = stateIndex === DEPOSIT_STATES.length - 1;

  return (
    <div className="fc-earn" aria-label="Deposit flow">
      <div
        className={`fc-earn-rings${ringsActive ? " fc-earn-rings--done" : ""}`}
        aria-hidden="true"
      >
        {Array.from({ length: DEPOSIT_RING_COUNT }, (_, i) => {
          const step = i + 1;
          // Each ring grows by a fixed pixel offset per step so the
          // overall shape echoes the pill's aspect ratio. The ripple
          // delay staggers the stroke / opacity transition so the
          // white state radiates outward from ring 1 to ring N.
          const horizontalStep = 28;
          const verticalStep = 22;
          const w = pillSize ? pillSize.width + step * horizontalStep * 2 : 0;
          const h = pillSize ? pillSize.height + step * verticalStep * 2 : 0;
          const style: CSSProperties = pillSize
            ? {
                width: `${w}px`,
                height: `${h}px`,
                opacity: ringsActive ? 1 : Math.max(0, 0.55 - step * 0.07),
                // Always staggered — so the rings ripple OUT immediately
                // when the cycle restarts, mirroring the ripple-in instead
                // of a holding all-white pause.
                "--ring-state-delay": `${step * 50}ms`,
              } as CSSProperties
            : { opacity: 0 };
          // viewBox matches pixel dimensions so rx/ry render as true
          // half-height pill corners regardless of ring size.
          return (
            <svg
              key={i}
              className="fc-earn-ring"
              viewBox={`0 0 ${Math.max(1, w)} ${Math.max(1, h)}`}
              style={style}
              aria-hidden="true"
            >
              <rect
                x="0"
                y="0"
                width={w}
                height={h}
                rx={h / 2}
                ry={h / 2}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          );
        })}
      </div>
      <div
        ref={pillRef}
        className={`fc-earn-pill${isDone ? " fc-earn-pill--done" : ""}`}
        aria-hidden="true"
      >
        <span className="fc-earn-pill-leader">
          {isDone ? (
            <span className="fc-earn-pill-check">
              <ThickCheck />
            </span>
          ) : (
            <span className="fc-earn-pill-spinner" />
          )}
        </span>
        <span key={stateIndex} className="fc-earn-pill-text">
          {DEPOSIT_STATES[stateIndex]}
        </span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   Wrappers — wrap each stage in the card frame
   ════════════════════════════════════════ */

export type FeatureAnimationProps = { xlmUsdRate?: number };

export function SendAnimation()         { return <FeatureCard><SendStage /></FeatureCard>; }
export function SwapAnimation({ xlmUsdRate }: FeatureAnimationProps = {}) { return <FeatureCard><SwapStage xlmUsdRate={xlmUsdRate} /></FeatureCard>; }
export function DiscoverAnimation()     { return <FeatureCard><DiscoverStage /></FeatureCard>; }
export function HistoryAnimation()      { return <FeatureCard><HistoryStage /></FeatureCard>; }
export function CollectiblesAnimation() { return <FeatureCard><CollectiblesStage /></FeatureCard>; }
export function ReceiveAnimation()      { return <FeatureCard><ReceiveStage /></FeatureCard>; }
export function WalletsAnimation()      { return <FeatureCard><WalletsStage /></FeatureCard>; }
export function EarnAnimation()         { return <FeatureCard className="fc-card--raised"><EarnStage /></FeatureCard>; }

export const FEATURE_ANIMATIONS: Record<string, ComponentType<FeatureAnimationProps>> = {
  Send: SendAnimation,
  Swap: SwapAnimation,
  Discover: DiscoverAnimation,
  History: HistoryAnimation,
  Collectibles: CollectiblesAnimation,
  Receive: ReceiveAnimation,
  Wallets: WalletsAnimation,
  Deposit: EarnAnimation,
};
