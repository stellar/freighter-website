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
  BridgeBold,
  CaretDownBold,
  ChartBarBold,
  ChartLineUpBold,
  CheckCircleBold,
  CoinBold,
  CurrencyDollarBold,
  GameControllerBold,
  HandCoinsBold,
  ImageSquareBold,
  UsersThreeBold,
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

const SEND_AMOUNTS = [100, 250, 500, 750] as const;

function SendStage() {
  const [index, setIndex] = useState(0);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }
    // Slower than Swap's 1800ms and offset by an initial delay so the
    // two cards never tick in lock-step.
    let intervalId: number | undefined;
    const startId = window.setTimeout(() => {
      setIndex((i) => (i + 1) % SEND_AMOUNTS.length);
      intervalId = window.setInterval(() => {
        setIndex((i) => (i + 1) % SEND_AMOUNTS.length);
      }, 2800);
    }, 1100);
    return () => {
      window.clearTimeout(startId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, []);

  // After each amount transition lands, briefly compress the Send
  // button so it reads as if the user just tapped it.
  useEffect(() => {
    if (index === 0) return;
    const pressIn = window.setTimeout(() => setPressed(true), 650);
    const pressOut = window.setTimeout(() => setPressed(false), 920);
    return () => {
      window.clearTimeout(pressIn);
      window.clearTimeout(pressOut);
    };
  }, [index]);

  const amount = SEND_AMOUNTS[index];

  return (
    <div className="fc-send-screen" aria-label="Choosing send amount">
      <div className="fc-send-panel" aria-hidden="true">
        <div className="fc-send-recipient">
          <span className="fc-send-recipient-label">To:</span>
          <span className="fc-send-recipient-address">G80FJ...8HPOD</span>
        </div>

        <div className="fc-send-amount">
          <span className="fc-send-amount-symbol">$</span>
          <SlidingNumber number={amount} className="fc-send-amount-num" />
          <span className="fc-send-amount-decimals">.00</span>
        </div>

        <div className="fc-send-currency">
          <UsdcIcon className="fc-send-currency-icon" />
          <span className="fc-send-currency-code">USDC</span>
          <CaretDownBold size={14} className="fc-send-currency-caret" />
        </div>
      </div>

      <div
        className={`fc-send-action${pressed ? " fc-send-action--pressed" : ""}`}
        aria-hidden="true"
      >
        Send
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   2. SWAP — two stacked currency panels with
       a small swap-indicator circle between
       them. Cycles through preset USDC ↔ XLM pairs.
   ════════════════════════════════════════ */

const XLM_TO_USD = 0.39;

const SWAP_PAIRS = [
  { xlm: 10, usdc: 3.9 },
  { xlm: 25, usdc: 9.75 },
  { xlm: 50, usdc: 19.5 },
  { xlm: 100, usdc: 39 },
] as const;

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
        <div className="fc-swap-panel-label">You sell</div>
        <div className="fc-swap-panel-main">
          <div className="fc-swap-amount">
            <SlidingNumber number={pair.xlm} />
          </div>
          <div className="fc-swap-currency">
            <XlmIcon className="fc-swap-currency-icon" />
            <span className="fc-swap-currency-code">XLM</span>
            <CaretDownBold size={12} className="fc-swap-currency-caret" />
          </div>
        </div>
        <div className="fc-swap-panel-footer">
          <span className="fc-swap-panel-usd">
            $<SlidingNumber number={pair.xlm * XLM_TO_USD} decimalPlaces={2} />
          </span>
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
            <SlidingNumber number={pair.usdc} decimalPlaces={2} />
          </div>
          <div className="fc-swap-currency">
            <UsdcIcon className="fc-swap-currency-icon" />
            <span className="fc-swap-currency-code">USDC</span>
            <CaretDownBold size={12} className="fc-swap-currency-caret" />
          </div>
        </div>
        <div className="fc-swap-panel-footer">
          <span className="fc-swap-panel-usd">
            $<SlidingNumber number={pair.usdc} decimalPlaces={2} />
          </span>
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
  { label: "Payments", Icon: CurrencyDollarBold, bg: "#3ecf8e", fg: "#0a3320" },
  { label: "Bridge", Icon: BridgeBold, bg: "#4cb9ff", fg: "#04263f" },
  { label: "Trading", Icon: ChartLineUpBold, bg: "#ffd24f", fg: "#3a2a14" },
  { label: "Lending", Icon: HandCoinsBold, bg: "#b390ff", fg: "#1a0d3d" },
  { label: "Derivatives", Icon: ChartBarBold, bg: "#7B68FF", fg: "#ffffff" },
  { label: "Stablecoin", Icon: CoinBold, bg: "#4cd6c1", fg: "#04302a" },
  { label: "Collectibles", Icon: ImageSquareBold, bg: "#ff5fa2", fg: "#ffffff" },
  { label: "Gaming", Icon: GameControllerBold, bg: "#ff8a4c", fg: "#ffffff" },
  { label: "Social", Icon: UsersThreeBold, bg: "#ff7474", fg: "#ffffff" },
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
      <span className="flex-1 text-[16px] font-medium text-[var(--fc-ink)]">
        {item.action}
      </span>
      <span className={`text-[16px] font-semibold tabular-nums shrink-0 ${colorClass}`}>
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

type CollectibleShape = "circle" | "hexagon" | "square" | "triangle";

const COLLECTIBLE_TILES: ReadonlyArray<{ variant: string; shape: CollectibleShape }> = [
  { variant: "sky", shape: "circle" },
  { variant: "plum", shape: "hexagon" },
  { variant: "moss", shape: "square" },
  { variant: "clay", shape: "triangle" },
];

function CollectibleShapeIcon({
  shape,
  className,
}: {
  shape: CollectibleShape;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {shape === "circle" && <circle cx="50" cy="50" r="34" fill="currentColor" />}
      {shape === "hexagon" && (
        <path d="M50 16 L82 33 L82 67 L50 84 L18 67 L18 33 Z" fill="currentColor" />
      )}
      {shape === "square" && (
        <rect x="20" y="20" width="60" height="60" rx="8" fill="currentColor" />
      )}
      {shape === "triangle" && (
        <path d="M50 18 L84 76 L16 76 Z" fill="currentColor" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function CollectiblesStage() {
  return (
    <div className="fc-collectibles">
      <div className="fc-collectibles-grid">
        {COLLECTIBLE_TILES.map(({ variant, shape }) => (
          <div key={variant} className={`fc-collectible-tile fc-collectible-tile--${variant}`}>
            <CollectibleShapeIcon shape={shape} className="fc-collectible-icon" />
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
                {isSelected && (
                  <span className="fc-wallet-row-badge">
                    <ThickCheck />
                  </span>
                )}
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
  const pillRef = useRef<HTMLDivElement>(null);
  const [pillSize, setPillSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }
    // Each non-final state holds for 1500ms; the final ("Deposited")
    // state holds only as long as the outward ripple takes — once the
    // outermost ring has turned white we jump straight back to the
    // first state without a lingering all-white pause.
    //
    // Side effects (the recursive setTimeout) live outside the state
    // updater so they only run once per tick — React strict mode runs
    // updater functions twice in dev, which would otherwise duplicate
    // timers and rapidly march the index past valid values.
    const DEFAULT_HOLD = 1500;
    const RIPPLE_HOLD = DEPOSIT_RING_COUNT * 90 + 500;
    let cancelled = false;
    let current = 0;
    let timer: number | undefined;

    const scheduleNext = () => {
      const hold = current === DEPOSIT_STATES.length - 1 ? RIPPLE_HOLD : DEFAULT_HOLD;
      timer = window.setTimeout(() => {
        if (cancelled) return;
        current = (current + 1) % DEPOSIT_STATES.length;
        setStateIndex(current);
        scheduleNext();
      }, hold);
    };

    scheduleNext();
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
        className={`fc-earn-rings${isDone ? " fc-earn-rings--done" : ""}`}
        aria-hidden="true"
      >
        {Array.from({ length: DEPOSIT_RING_COUNT }, (_, i) => {
          const step = i + 1;
          // Each ring grows by a fixed pixel offset per step so the
          // overall shape echoes the pill's aspect ratio. The ripple
          // delay staggers the border-color / opacity transition so
          // the white state radiates outward from ring 1 to ring N.
          const horizontalStep = 28;
          const verticalStep = 22;
          const style: CSSProperties = pillSize
            ? {
                width: `${pillSize.width + step * horizontalStep * 2}px`,
                height: `${pillSize.height + step * verticalStep * 2}px`,
                opacity: isDone ? 1 : Math.max(0, 0.55 - step * 0.07),
                // Always staggered — so the rings ripple OUT immediately
                // when the cycle restarts, mirroring the ripple-in instead
                // of a holding all-white pause.
                "--ring-state-delay": `${step * 90}ms`,
              } as CSSProperties
            : { opacity: 0 };
          return <span key={i} className="fc-earn-ring" style={style} />;
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
