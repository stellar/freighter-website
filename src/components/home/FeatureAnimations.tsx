"use client";

import { type ReactNode, type ComponentType } from "react";

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full bg-bg-elevated">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {children}
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════
   1. SEND — White pill with arrow, gentle float
   ════════════════════════════════════════ */
export function SendAnimation() {
  return (
    <Card>
      <defs>
        <style>{`
          .fc-send { animation: fc-send 3.5s ease-in-out infinite }
          @keyframes fc-send {
            0%, 100% { transform: translate(0, 0) }
            50% { transform: translate(10px, -10px) }
          }
        `}</style>
      </defs>
      <g className="fc-send">
        <rect x="85" y="165" width="230" height="70" rx="35" fill="#818cf8" />
        <path
          d="M175 200h50"
          stroke="#18181b"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M213 188l13 12-13 12"
          stroke="#18181b"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </Card>
  );
}

/* ════════════════════════════════════════
   2. SWAP — Two circles arc-swap positions
   ════════════════════════════════════════ */
export function SwapAnimation() {
  return (
    <Card>
      <defs>
        <style>{`
          .fc-sw-a { animation: fc-sw-a 4s ease-in-out infinite }
          .fc-sw-b { animation: fc-sw-b 4s ease-in-out infinite }
          @keyframes fc-sw-a {
            0%, 8% { transform: translate(0, 0) }
            25% { transform: translate(40px, -50px) }
            42%, 58% { transform: translate(80px, 0) }
            75% { transform: translate(40px, 50px) }
            92%, 100% { transform: translate(0, 0) }
          }
          @keyframes fc-sw-b {
            0%, 8% { transform: translate(0, 0) }
            25% { transform: translate(-40px, 50px) }
            42%, 58% { transform: translate(-80px, 0) }
            75% { transform: translate(-40px, -50px) }
            92%, 100% { transform: translate(0, 0) }
          }
        `}</style>
      </defs>
      <circle
        className="fc-sw-a"
        cx="160"
        cy="200"
        r="45"
        fill="#22d3ee"
        opacity=".9"
      />
      <circle
        className="fc-sw-b"
        cx="240"
        cy="200"
        r="35"
        fill="#22d3ee"
        opacity=".55"
      />
    </Card>
  );
}

/* ════════════════════════════════════════
   3. DISCOVER — Compass ring with rotating needle,
      dots pulse as the sweep passes
   ════════════════════════════════════════ */
export function DiscoverAnimation() {
  return (
    <Card>
      <defs>
        <style>{`
          .fc-disc-n {
            animation: fc-disc-spin 8s linear infinite;
            transform-origin: 200px 200px;
          }
          @keyframes fc-disc-spin {
            from { transform: rotate(0deg) }
            to { transform: rotate(360deg) }
          }
          .fc-disc-d {
            animation: fc-disc-p 8s ease-out infinite;
            transform-box: fill-box;
            transform-origin: center;
          }
          @keyframes fc-disc-p {
            0%, 2% { opacity: .7; transform: scale(1.4) }
            15%, 100% { opacity: .15; transform: scale(1) }
          }
        `}</style>
      </defs>
      {/* Compass rings */}
      <circle cx="200" cy="200" r="90" stroke="#fbbf24" strokeWidth="2" opacity=".25" />
      <circle cx="200" cy="200" r="60" stroke="#fbbf24" strokeWidth="1.5" opacity=".12" />
      {/* Discovery dots — pulse when needle sweeps past */}
      <circle className="fc-disc-d" cx="200" cy="110" r="6" fill="#fbbf24" style={{ animationDelay: "0s" }} />
      <circle className="fc-disc-d" cx="290" cy="200" r="6" fill="#fbbf24" style={{ animationDelay: "-6s" }} />
      <circle className="fc-disc-d" cx="200" cy="290" r="6" fill="#fbbf24" style={{ animationDelay: "-4s" }} />
      <circle className="fc-disc-d" cx="110" cy="200" r="6" fill="#fbbf24" style={{ animationDelay: "-2s" }} />
      {/* Rotating needle */}
      <g className="fc-disc-n">
        <line x1="200" y1="200" x2="200" y2="125" stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="200" cy="125" r="6" fill="#fbbf24" opacity=".85" />
      </g>
      {/* Center dot */}
      <circle cx="200" cy="200" r="4.5" fill="#fbbf24" />
    </Card>
  );
}

/* ════════════════════════════════════════
   4. HISTORY — Staggered bars drop in like a feed
   ════════════════════════════════════════ */
export function HistoryAnimation() {
  return (
    <Card>
      <defs>
        <style>{`
          .fc-hist { animation: fc-hist 4.5s ease-in-out infinite }
          @keyframes fc-hist {
            0%, 5% { transform: translateY(-25px); opacity: 0 }
            18%, 55% { transform: translateY(0); opacity: 1 }
            72%, 100% { opacity: 0; transform: translateY(0) }
          }
        `}</style>
      </defs>
      <rect className="fc-hist" x="100" y="148" width="200" height="28" rx="14" fill="#34d399" opacity=".9" style={{ animationDelay: "0s" }} />
      <rect className="fc-hist" x="120" y="193" width="160" height="28" rx="14" fill="#34d399" opacity=".6" style={{ animationDelay: ".3s" }} />
      <rect className="fc-hist" x="105" y="238" width="190" height="28" rx="14" fill="#34d399" opacity=".35" style={{ animationDelay: ".6s" }} />
    </Card>
  );
}

/* ════════════════════════════════════════
   5. COLLECTIBLES — Slow-spinning diamond + sparkles
   ════════════════════════════════════════ */
export function CollectiblesAnimation() {
  return (
    <Card>
      <defs>
        <style>{`
          .fc-coll {
            animation: fc-coll-r 10s linear infinite;
            transform-origin: 200px 200px;
          }
          @keyframes fc-coll-r {
            from { transform: rotate(45deg) }
            to { transform: rotate(405deg) }
          }
          .fc-coll-s {
            animation: fc-coll-tw 2.2s ease-in-out infinite;
            transform-box: fill-box;
            transform-origin: center;
          }
          @keyframes fc-coll-tw {
            0%, 100% { opacity: .15; transform: scale(.5) }
            50% { opacity: .8; transform: scale(1.3) }
          }
        `}</style>
      </defs>
      {/* Rotating diamond */}
      <g className="fc-coll">
        <rect x="140" y="140" width="120" height="120" rx="18" fill="#f472b6" opacity=".85" />
      </g>
      {/* Sparkles */}
      <circle className="fc-coll-s" cx="118" cy="138" r="5" fill="#f472b6" style={{ animationDelay: "0s" }} />
      <circle className="fc-coll-s" cx="282" cy="158" r="4" fill="#f472b6" style={{ animationDelay: ".7s" }} />
      <circle className="fc-coll-s" cx="268" cy="282" r="5" fill="#f472b6" style={{ animationDelay: "1.4s" }} />
    </Card>
  );
}

/* ════════════════════════════════════════
   6. RECEIVE — Pulsing rings + bobbing down arrow
   ════════════════════════════════════════ */
export function ReceiveAnimation() {
  return (
    <Card>
      <defs>
        <style>{`
          .fc-recv-r {
            animation: fc-recv 3s ease-out infinite;
            transform-origin: 200px 200px;
          }
          @keyframes fc-recv {
            0% { transform: scale(.3); opacity: 0 }
            15% { opacity: .5 }
            100% { transform: scale(1.6); opacity: 0 }
          }
          .fc-recv-a { animation: fc-recv-b 2.5s ease-in-out infinite }
          @keyframes fc-recv-b {
            0%, 100% { transform: translateY(0) }
            50% { transform: translateY(8px) }
          }
        `}</style>
      </defs>
      {/* Pulsing rings — expand outward like a beacon */}
      <circle className="fc-recv-r" cx="200" cy="200" r="80" stroke="#84cc16" strokeWidth="2" style={{ animationDelay: "0s" }} />
      <circle className="fc-recv-r" cx="200" cy="200" r="80" stroke="#84cc16" strokeWidth="2" style={{ animationDelay: "-1s" }} />
      <circle className="fc-recv-r" cx="200" cy="200" r="80" stroke="#84cc16" strokeWidth="2" style={{ animationDelay: "-2s" }} />
      {/* Down arrow */}
      <g className="fc-recv-a">
        <path d="M200 168v64" stroke="#84cc16" strokeWidth="5" strokeLinecap="round" />
        <path d="M182 216l18 18 18-18" stroke="#84cc16" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Card>
  );
}

/* ════════════════════════════════════════
   7. WALLETS — Three cards fan apart and collapse
   ════════════════════════════════════════ */
export function WalletsAnimation() {
  return (
    <Card>
      <defs>
        <style>{`
          .fc-wall { transform-origin: 200px 350px }
          .fc-wall-l { animation: fc-wall-l 4s ease-in-out infinite }
          .fc-wall-r { animation: fc-wall-r 4s ease-in-out infinite }
          @keyframes fc-wall-l {
            0%, 15%, 85%, 100% { transform: rotate(0deg) }
            35%, 65% { transform: rotate(-15deg) }
          }
          @keyframes fc-wall-r {
            0%, 15%, 85%, 100% { transform: rotate(0deg) }
            35%, 65% { transform: rotate(15deg) }
          }
        `}</style>
      </defs>
      {/* Back card — fans left */}
      <g className="fc-wall fc-wall-l">
        <rect x="145" y="115" width="110" height="170" rx="14" fill="#a78bfa" opacity=".4" />
      </g>
      {/* Middle card — stays put */}
      <rect x="145" y="115" width="110" height="170" rx="14" fill="#a78bfa" opacity=".65" />
      {/* Front card — fans right */}
      <g className="fc-wall fc-wall-r">
        <rect x="145" y="115" width="110" height="170" rx="14" fill="#a78bfa" opacity=".9" />
      </g>
    </Card>
  );
}

/* ════════════════════════════════════════ */
export const FEATURE_ANIMATIONS: Record<string, ComponentType> = {
  Send: SendAnimation,
  Swap: SwapAnimation,
  Discover: DiscoverAnimation,
  History: HistoryAnimation,
  Collectibles: CollectiblesAnimation,
  Receive: ReceiveAnimation,
  Wallets: WalletsAnimation,
};
