"use client";

import type { ComponentType, ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowsClockwiseBold,
  ArrowUpBold,
  ArrowDownBold,
  CheckCircleBold,
  ArrowSquareInBold,
} from "@/components/ui/PhosphorIcons";

/* ───────────────────────────────────────────────────
   Shared frame — clean card with stage; title lives
   outside the card in the carousel layout.
   ─────────────────────────────────────────────────── */

function FeatureCard({ children }: { children: ReactNode }) {
  return (
    <div className="fc-card">
      <div className="fc-stage">{children}</div>
    </div>
  );
}

/* ════════════════════════════════════════
   1. SEND — paper plane + particles + amount carousel
   ════════════════════════════════════════ */

const SEND_AMOUNTS = ["25 XLM", "2,500 XLM", "100 USDC", "$50.00", "1,000 XLM", "420 USDC"];

function SendStage() {
  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 320 320"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {/* Trail particles — soft white puffs */}
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            className="fc-particle"
            cx={150 + (i % 2) * 20}
            cy={170 + i * 4}
            r="2.5"
            fill="#ffffff"
            opacity="0.7"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {/* Plane body — friendly, white, with rounded corners and a soft
            drop shadow underneath */}
        <g className="fc-plane">
          {/* Soft floor shadow that bobs with the plane */}
          <ellipse cx="160" cy="172" rx="38" ry="5" fill="#000000" opacity="0.18" />

          {/* Outer body with rounded joins */}
          <path
            d="M160 64 L198 156 L160 138 L122 156 Z"
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Right wing — a touch darker for dimension */}
          <path
            d="M160 64 L198 156 L160 138 Z"
            fill="#000000"
            opacity="0.06"
          />
          {/* Center fold — soft gray line */}
          <path
            d="M160 76 L160 134"
            stroke="#cfd2dc"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Amount carousel + caption */}
      <div className="absolute left-0 right-0 bottom-[66px] flex flex-col items-center">
        <div className="relative h-[46px] w-full overflow-hidden">
          {SEND_AMOUNTS.map((amt, i) => (
            <span
              key={amt}
              className="fc-amount absolute inset-0 flex items-center justify-center text-[32px] font-medium leading-none"
              style={{ animationDelay: `${i * 1.4}s`, color: "#4f8cff" }}
            >
              {amt}
            </span>
          ))}
        </div>
        <span className="fc-mono-cap mt-2">SENDING</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   2. SWAP — 3D coin flip with real token logos
   ════════════════════════════════════════ */

/* Each coin face is a complete circular SVG with its own radial face gradient,
   darker outer rim, embossed iconography, and a specular gloss overlay. The
   stage div is just a placement layer — the SVG owns the 3D look. */

function XlmCoinFace() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="fc-xlm-face" cx="35%" cy="28%" r="80%">
          <stop offset="0%"   stopColor="#fbfbfc" />
          <stop offset="55%"  stopColor="#d6d8de" />
          <stop offset="100%" stopColor="#9da0aa" />
        </radialGradient>
        <radialGradient id="fc-xlm-gloss" cx="35%" cy="20%" r="55%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        {/* A subtle inner bevel that pushes the coin's edge into the rim */}
        <radialGradient id="fc-xlm-bevel" cx="50%" cy="50%" r="50%">
          <stop offset="86%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="94%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
        </radialGradient>
      </defs>

      {/* Outer rim */}
      <circle cx="50" cy="50" r="50" fill="#a4a7b1" />
      {/* Slight inner bevel between rim and face */}
      <circle cx="50" cy="50" r="50" fill="url(#fc-xlm-bevel)" />
      {/* Inner face */}
      <circle cx="50" cy="50" r="45" fill="url(#fc-xlm-face)" />

      {/* Real Stellar mark — clipped to the inner face circle so the logo
          can extend right up to the coin's bevel without spilling onto the
          rim. */}
      <defs>
        <clipPath id="fc-xlm-clip">
          <circle cx="50" cy="50" r="45" />
        </clipPath>
      </defs>
      <g clipPath="url(#fc-xlm-clip)">
        <image
          href="/images/stellar-xlm-logo.png"
          x="25"
          y="25"
          width="50"
          height="50"
          preserveAspectRatio="xMidYMid meet"
        />
      </g>

      {/* Glossy specular highlight on top-left */}
      <circle cx="50" cy="50" r="45" fill="url(#fc-xlm-gloss)" />
    </svg>
  );
}

function UsdcCoinFace() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="fc-usdc-face" cx="35%" cy="28%" r="80%">
          <stop offset="0%"   stopColor="#7fc3ee" />
          <stop offset="55%"  stopColor="#2890e0" />
          <stop offset="100%" stopColor="#1a5f9b" />
        </radialGradient>
        <radialGradient id="fc-usdc-gloss" cx="35%" cy="20%" r="55%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fc-usdc-bevel" cx="50%" cy="50%" r="50%">
          <stop offset="86%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="94%" stopColor="#ffffff" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
        </radialGradient>
      </defs>

      {/* Outer rim — slightly darker than the face */}
      <circle cx="50" cy="50" r="50" fill="#1d6cb0" />
      <circle cx="50" cy="50" r="50" fill="url(#fc-usdc-bevel)" />
      {/* Inner face */}
      <circle cx="50" cy="50" r="45" fill="url(#fc-usdc-face)" />

      {/* USDC mark — the SVG ships pre-filled white, so it can be dropped
          straight onto the blue face without any luminance trickery. */}
      <image
        href="/images/usdc-logo.svg"
        x="18"
        y="18"
        width="64"
        height="64"
        preserveAspectRatio="xMidYMid meet"
      />

      <circle cx="50" cy="50" r="45" fill="url(#fc-usdc-gloss)" />
    </svg>
  );
}

function SwapStage() {
  // Stack of thin disks at staggered Z values — when the coin rotates past
  // 90° the user sees the edges of these disks lined up, which reads as the
  // coin's metallic rim.
  const rimSlices = [-3, -1.5, 0, 1.5, 3];

  return (
    <div className="fc-coin-stage flex flex-col items-center justify-center w-full h-full">
      <div className="fc-coin">
        {rimSlices.map((z) => (
          <div
            key={z}
            className="fc-coin-rim"
            style={{ transform: `translateZ(${z}px)` }}
          />
        ))}
        <div className="fc-coin-face fc-coin-front">
          <XlmCoinFace />
        </div>
        <div className="fc-coin-face fc-coin-back">
          <UsdcCoinFace />
        </div>
      </div>
      <div className="fc-coin-shadow" />
      <span className="mt-8 text-[20px] font-medium text-white tracking-[-0.3px]">
        XLM → USDC
      </span>
    </div>
  );
}

/* ════════════════════════════════════════
   3. DISCOVER — radar / sonar
   ════════════════════════════════════════ */

/* Each blip lives at a fixed angle around the dial.  The radar takes 6s to
   complete a revolution, so the delay (= angle ÷ 60°/s − cycle offset)
   lines up the icon-grow moment with the sweep crossing the blip. */
const DISCOVER_BLIPS = [
  { xPct: 70,    yPct: 28.75, color: "#5fffaf", icon: "/images/app-icon-1.png", delay: "-5.4s" },
  { xPct: 78.75, yPct: 62.5,  color: "#ffd24f", icon: "/images/app-icon-2.png", delay: "-3.65s" },
  { xPct: 28.75, yPct: 72.5,  color: "#ff4f8c", icon: "/images/app-icon-3.png", delay: "-2.1s" },
];

function DiscoverStage() {
  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 320 320"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="fc-radar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6f4cff" />
            <stop offset="60%" stopColor="#4f8cff" />
            <stop offset="100%" stopColor="#2dd4ff" />
          </linearGradient>
          <linearGradient id="fc-radar-fill" x1="50%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#6f4cff" stopOpacity="0" />
            <stop offset="100%" stopColor="#2dd4ff" stopOpacity="0.32" />
          </linearGradient>
        </defs>

        {/* Concentric rings */}
        <circle cx="160" cy="160" r="120" stroke="#1d2238" strokeWidth="1.25" fill="none" />
        <circle cx="160" cy="160" r="80"  stroke="#1d2238" strokeWidth="1.25" fill="none" />
        <circle cx="160" cy="160" r="40"  stroke="#1d2238" strokeWidth="1.25" fill="none" />

        {/* Crosshairs */}
        <line x1="40" y1="160" x2="280" y2="160" stroke="#1d2238" strokeWidth="1" />
        <line x1="160" y1="40" x2="160" y2="280" stroke="#1d2238" strokeWidth="1" />

        {/* Sweep wedge */}
        <g className="fc-radar">
          <path
            d="M160 160 L160 40 A120 120 0 0 1 280 160 Z"
            fill="url(#fc-radar-fill)"
            opacity="0.85"
          />
          <line
            x1="160"
            y1="160"
            x2="280"
            y2="160"
            stroke="url(#fc-radar-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* Center dot */}
        <circle cx="160" cy="160" r="3.5" fill="url(#fc-radar-grad)" />
      </svg>

      {/* HTML overlay for blips — the dot and the icon share the same center
          point, both scale around that center, and the dot's max scale is
          tuned to match the icon's small-state size so they morph cleanly. */}
      {DISCOVER_BLIPS.map((b, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${b.xPct}%`,
            top: `${b.yPct}%`,
            width: 48,
            height: 48,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span
            className="fc-blip-dot"
            style={{ background: b.color, animationDelay: b.delay }}
          />
          <img
            src={b.icon}
            alt=""
            className="fc-blip-icon"
            style={{ animationDelay: b.delay }}
            draggable={false}
          />
        </div>
      ))}
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
  variant: "xlm" | "usdc" | "color";
  background?: string;
  letter?: string;
}) {
  const base = "w-[30px] h-[30px] shrink-0 rounded-full flex items-center justify-center overflow-hidden";
  if (variant === "xlm") {
    return (
      <div className={`${base} bg-white`}>
        <img src="/images/stellar-xlm-logo.png" alt="" className="w-[60%] h-[60%] object-contain" />
      </div>
    );
  }
  if (variant === "usdc") {
    return (
      <div className={`${base}`} style={{ background: "#2775ca" }}>
        <img
          src="/images/usdc-logo.svg"
          alt=""
          className="w-[68%] h-[68%] object-contain"
        />
      </div>
    );
  }
  return (
    <div className={base} style={{ background }}>
      <span className="text-[11px] font-bold text-white">{letter}</span>
    </div>
  );
}

/* The little "Swapped" stack: USDC pill in front of XLM pill, slightly
   overlapping like a deck of cards. */
function SwapTile() {
  return (
    <div className="relative w-[40px] h-[30px] shrink-0">
      <div className="absolute left-0 top-0">
        <TokenTile variant="xlm" />
      </div>
      <div className="absolute left-[12px] top-0">
        <TokenTile variant="usdc" />
      </div>
    </div>
  );
}

type HistoryItem = {
  title: ReactNode;
  subtitle: string;
  subIcon: ComponentType<{ size?: number; className?: string }>;
  primary: string;
  primaryColor: "green" | "white" | "muted";
  secondary?: string;
  tile: ReactNode;
};

const HISTORY_ITEMS: HistoryItem[] = [
  {
    tile: <SwapTile />,
    title: (
      <span className="inline-flex items-center gap-1">
        XLM <span className="text-[var(--fc-ink-3)]">→</span> USDC
      </span>
    ),
    subtitle: "Swapped",
    subIcon: ArrowsClockwiseBold,
    primary: "+40.40 USDC",
    primaryColor: "green",
    secondary: "−100.00 XLM",
  },
  {
    tile: <TokenTile variant="xlm" />,
    title: "XLM",
    subtitle: "Sent",
    subIcon: ArrowUpBold,
    primary: "−$20.20",
    primaryColor: "white",
    secondary: "−50.00 XLM",
  },
  {
    tile: <TokenTile variant="xlm" />,
    title: "XLM",
    subtitle: "Received",
    subIcon: ArrowDownBold,
    primary: "+$10.10",
    primaryColor: "green",
    secondary: "+25.00 XLM",
  },
  {
    tile: <TokenTile variant="xlm" />,
    title: "Stellar Lumens",
    subtitle: "Trustline added",
    subIcon: CheckCircleBold,
    primary: "Unlimited",
    primaryColor: "muted",
  },
  {
    tile: <TokenTile variant="usdc" />,
    title: "Contract Name",
    subtitle: "Interacted",
    subIcon: ArrowSquareInBold,
    primary: "−$20.00",
    primaryColor: "white",
    secondary: "−20.00 USDC",
  },
  {
    tile: <TokenTile variant="color" background="linear-gradient(135deg, #8a5cff, #4f8cff)" letter="A" />,
    title: "AQUA",
    subtitle: "Received",
    subIcon: ArrowDownBold,
    primary: "+$10.58",
    primaryColor: "green",
    secondary: "+50.00 AQUA",
  },
];

function HistoryRow({ item }: { item: HistoryItem }) {
  const SubIcon = item.subIcon;
  const colorClass =
    item.primaryColor === "green"
      ? "text-[#5fffaf]"
      : item.primaryColor === "white"
      ? "text-[var(--fc-ink)]"
      : "text-[var(--fc-ink-3)]";
  return (
    <div className="flex items-center gap-3">
      {item.tile}
      <div className="flex flex-col leading-tight min-w-0 flex-1">
        <span className="text-[12px] font-semibold text-[var(--fc-ink)] truncate">
          {item.title}
        </span>
        <span className="text-[10px] text-[var(--fc-ink-3)] flex items-center gap-1 mt-[2px]">
          <SubIcon size={10} />
          {item.subtitle}
        </span>
      </div>
      <div className="flex flex-col items-end leading-tight shrink-0">
        <span className={`text-[12px] font-semibold ${colorClass}`}>{item.primary}</span>
        {item.secondary && (
          <span className="text-[10px] text-[var(--fc-ink-3)] mt-[2px]">{item.secondary}</span>
        )}
      </div>
    </div>
  );
}

function HistoryStage() {
  return (
    <div className="fc-feed-wrap">
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
   5. COLLECTIBLES — Nouns marquee
   Real Noun PNGs (CC0, downloaded from noun.pics) live in
   public/images/nouns/.  Each tile is one Noun; the marquee rows
   shuffle the sequence so adjacent rows read as different Nouns.
   ════════════════════════════════════════ */

const NOUN_IDS = [1, 2, 7, 13, 17, 42, 55, 69, 88, 100, 142, 200];
// Disjoint sets so no Noun appears in both rows.
const ROW_A = NOUN_IDS.slice(0, 6);
const ROW_B = NOUN_IDS.slice(6, 12);

function NounTile({ id }: { id: number }) {
  return (
    <img
      src={`/images/nouns/noun-${id}.png`}
      alt=""
      width={130}
      height={130}
      loading="lazy"
      draggable={false}
    />
  );
}

function MarqueeRow({
  ids,
  direction,
  offset = 0,
}: {
  ids: number[];
  direction: "a" | "b" | "c";
  offset?: number;
}) {
  const sequence = [...ids, ...ids];
  return (
    <div className="fc-marquee-wrap">
      <div className={`fc-marquee fc-marquee-${direction}`} style={{ marginLeft: offset }}>
        {sequence.map((id, i) => (
          <div key={i} className="fc-tile">
            <NounTile id={id} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CollectiblesStage() {
  return (
    <div className="flex flex-col gap-3 w-full h-full justify-center">
      {/* Hand-drawn filter: low-frequency fractal noise drives a tiny
          displacement map so the pixel-perfect edges of each Noun take on
          a subtle "freehand" wobble — like a marker sketch instead of pure
          digital pixel art. */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="fc-handdrawn" x="-6%" y="-6%" width="112%" height="112%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.045"
              numOctaves="2"
              seed="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      {/* 2 rows × 160 px overflows the square card on purpose — tiles get
          cut at the top and bottom edges, suggesting the collection
          continues beyond the frame. */}
      <MarqueeRow ids={ROW_A} direction="a" />
      <MarqueeRow ids={ROW_B} direction="b" offset={-60} />
    </div>
  );
}

/* ════════════════════════════════════════
   6. RECEIVE — QR code + gradient halo
   ════════════════════════════════════════ */

function ReceiveStage() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="fc-qr-halo" />
        <div
          className="fc-qr-card relative w-[160px] h-[160px] rounded-[18px] p-3 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #fff, #e8e9f5)" }}
        >
          <QRCodeSVG
            value="https://freighter.app"
            level="M"
            bgColor="transparent"
            fgColor="#0a0b14"
            marginSize={0}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   7. WALLETS — account list with Stellar identicons
   ════════════════════════════════════════ */

/* Deterministic FNV-1a-ish hash so the identicon is stable for a given
   address.  We then read 15 bits to fill a 3×5 half-grid which is
   mirrored horizontally to give the classic 5×5 symmetric "blockies"
   pattern.  Color is derived from the same hash. */
function identiconHash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

function Identicon({ seed }: { seed: string }) {
  const h = identiconHash(seed);
  const hue = h % 360;
  const fg = `hsl(${hue} 72% 62%)`;
  const bg = `hsl(${(hue + 30) % 360} 28% 18%)`;

  const N = 5;
  const halfCols = Math.ceil(N / 2); // 3
  const cells: boolean[] = [];
  let bits = h;
  for (let i = 0; i < N * halfCols; i++) {
    cells.push((bits & 1) === 1);
    bits >>>= 1;
    if (bits === 0) bits = identiconHash(seed + i);
  }

  return (
    <svg viewBox={`0 0 ${N} ${N}`} shapeRendering="crispEdges" className="w-full h-full">
      <rect width={N} height={N} fill={bg} />
      {cells.flatMap((on, idx) => {
        if (!on) return [];
        const row = Math.floor(idx / halfCols);
        const col = idx % halfCols;
        const out = [
          <rect key={`l-${idx}`} x={col} y={row} width={1} height={1} fill={fg} />,
        ];
        if (col !== halfCols - 1) {
          out.push(
            <rect key={`r-${idx}`} x={N - 1 - col} y={row} width={1} height={1} fill={fg} />,
          );
        }
        return out;
      })}
    </svg>
  );
}

/* Made-up Stellar G-addresses — base32 (A–Z, 2–7), 56 chars, prefixed G.
   They are not real keys; they're just for visual demo. */
const ACCOUNTS: Array<{
  name: string;
  address: string;
  balance: string;
  hardware?: boolean;
}> = [
  {
    name: "Main",
    address: "GBVKI4Q2K7WCO4ZBDJ4CYWP3FQHVCQUYY27VGMXCLSWN3I3R6X4Q3EAB",
    balance: "$28,940",
  },
  {
    name: "Trading",
    address: "GAQT3FZP7BXY2OMVDJWGE5LK4NCIH6PSLM5R3VFTYBJW2QHXRDA7TLZQ",
    balance: "$12,408",
  },
  {
    name: "Savings",
    address: "GCBNPL3XGZRY7MHJ4KFE2DSWVQ56A8UCT9PR4OYI3HFDEAB7MQK2NSDF",
    balance: "$6,942",
  },
  {
    name: "Ledger",
    address: "GDQHZX5ABRYE2NF8MS4CG7VJW36LP9IUKT5R2OB4DAFCYE3HMQK7PWVR",
    balance: "$0.50",
    hardware: true,
  },
];

function truncateAddress(addr: string) {
  return `${addr.slice(0, 5)}…${addr.slice(-5)}`;
}

function WalletsStage() {
  return (
    <div className="w-full px-5 py-12 flex flex-col gap-2 fc-stagger">
      {ACCOUNTS.map((a, i) => (
        <div
          key={a.name}
          className="flex items-center gap-3 px-3 py-[10px] rounded-[12px]"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.05)",
            animationDelay: `${0.05 + i * 0.05}s`,
          }}
        >
          <div className="w-[32px] h-[32px] rounded-full shrink-0 overflow-hidden">
            <Identicon seed={a.address} />
          </div>
          <div className="flex flex-col leading-tight min-w-0 flex-1">
            <span className="text-[11px] font-semibold text-[var(--fc-ink)] inline-flex items-center gap-1">
              {a.name}
              {a.hardware && (
                <span className="text-[var(--fc-ink-3)] text-[9px]" aria-label="hardware">
                  ◇
                </span>
              )}
            </span>
            <span className="text-[9px] text-[var(--fc-ink-3)] tracking-wide">
              {truncateAddress(a.address)}
            </span>
          </div>
          <span className="text-[13px] font-semibold text-[var(--fc-ink)]">{a.balance}</span>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   8. EARN — interest accruing on a balance
   A circular progress ring sweeps to ~85%, while the balance counts up
   from $300 → $349 to convey interest accumulating. The "4% interest"
   tag fades in below the amount.
   ════════════════════════════════════════ */

function EarnStage() {
  /* SVG progress ring — the arc uses `pathLength="100"` so dasharray /
     dashoffset can be expressed in 0–100 percent units regardless of the
     actual circle radius.  That's what makes the keyframes work without
     needing to plumb the circumference through a CSS variable. */
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
          strokeDasharray="100"
          strokeDashoffset="100"
          transform="rotate(-90 100 100)"
        />
      </svg>
      <div className="fc-earn-text">
        <div className="fc-earn-amount">
          <span className="fc-earn-currency">$</span>
          <span>3</span>
          <span>4</span>
          <span className="fc-earn-roll">
            <span className="fc-earn-roll-track">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
            </span>
          </span>
        </div>
        <div className="fc-earn-rate">4% interest</div>
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
export function EarnAnimation()         { return <FeatureCard><EarnStage /></FeatureCard>; }

export const FEATURE_ANIMATIONS: Record<string, ComponentType> = {
  Send: SendAnimation,
  Swap: SwapAnimation,
  Discover: DiscoverAnimation,
  History: HistoryAnimation,
  Collectibles: CollectiblesAnimation,
  Receive: ReceiveAnimation,
  Wallets: WalletsAnimation,
  Earn: EarnAnimation,
};
