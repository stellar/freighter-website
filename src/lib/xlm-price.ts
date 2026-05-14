// Server-side fetch for the current XLM/USD spot price. The site is
// statically exported (`output: "export"`), so this runs at build time
// only — the rate refreshes whenever the site is redeployed, not at
// runtime. Falls back to a sensible default if CoinGecko is unreachable.

const FALLBACK_USD_PRICE = 0.39;
const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd";

type CoinGeckoResponse = {
  stellar?: { usd?: number };
};

export async function getXlmUsdRate(): Promise<number> {
  try {
    const res = await fetch(COINGECKO_URL);
    if (!res.ok) {
      return FALLBACK_USD_PRICE;
    }
    const data: CoinGeckoResponse = await res.json();
    const price = data?.stellar?.usd;
    return typeof price === "number" && price > 0 ? price : FALLBACK_USD_PRICE;
  } catch {
    return FALLBACK_USD_PRICE;
  }
}
