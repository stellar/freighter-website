import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://varialwallet.com"),
  title: {
    default: "Varial | Your Everyday Stellar Wallet",
    template: "%s | Varial",
  },
  description:
    "Browse, connect, and use Stellar apps — all in one place. Non-custodial Stellar wallet for browser and mobile.",
  keywords: [
    "Stellar",
    "wallet",
    "XLM",
    "crypto",
    "non-custodial",
    "browser extension",
    "mobile wallet",
    "DEX",
    "Stellar network",
  ],
  authors: [{ name: "Stellar Development Foundation" }],
  // Mark only, no tile. One SVG switches blue for light / dark tabs itself
  // (prefers-color-scheme inside the file); the .ico is the 32px fallback.
  // No sizes="any" on the .ico — Chrome would pick it over the SVG.
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Varial",
    title: "Varial | Your Everyday Stellar Wallet",
    description: "Browse, connect, and use Stellar apps — all in one place.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Varial Wallet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Varial | Your Everyday Stellar Wallet",
    description: "Browse, connect, and use Stellar apps — all in one place.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="min-h-screen bg-bg-page text-text-primary font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log("%c✦ Varial","font-size:24px;font-weight:bold;color:#0050FF");console.log("%cYour everyday Stellar wallet — https://github.com/stellar/freighter","font-size:12px;color:#6F6F6F");`,
          }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
