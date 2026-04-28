import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Agentation } from "agentation";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.freighter.app"),
  title: {
    default: "Freighter | Your Everyday Stellar Wallet",
    template: "%s | Freighter",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.freighter.app",
    siteName: "Freighter",
    title: "Freighter | Your Everyday Stellar Wallet",
    description: "Browse, connect, and use Stellar apps — all in one place.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Freighter Wallet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freighter | Your Everyday Stellar Wallet",
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
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen text-text-primary font-sans" style={{ background: "linear-gradient(198deg, #141419 0%, #09090b 100%)" }}>
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log("%c⚡ Freighter","font-size:24px;font-weight:bold;color:#654cd8");console.log("%cYour everyday Stellar wallet — https://github.com/stellar/freighter","font-size:12px;color:#a1a1aa");`,
          }}
        />
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
