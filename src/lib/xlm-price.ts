// Client-side hook for fetching the current XLM/USD spot price.
// The site is statically exported, so we fetch on the client with
// a sensible fallback if CoinGecko is unreachable.

"use client";

import { useState, useEffect } from "react";

const FALLBACK_USD_PRICE = 0.39;
const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd";

type CoinGeckoResponse = {
  stellar?: { usd?: number };
};

export function useXlmUsdRate(): number {
  const [rate, setRate] = useState(FALLBACK_USD_PRICE);

  useEffect(() => {
    let mounted = true;

    async function fetchRate() {
      try {
        const res = await fetch(COINGECKO_URL);
        if (!res.ok) {
          return;
        }
        const data: CoinGeckoResponse = await res.json();
        const price = data?.stellar?.usd;
        if (mounted && typeof price === "number" && price > 0) {
          setRate(price);
        }
      } catch {
        // Keep fallback rate
      }
    }

    fetchRate();

    return () => {
      mounted = false;
    };
  }, []);

  return rate;
}
