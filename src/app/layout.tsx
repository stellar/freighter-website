import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Agentation } from "agentation";
import { MeasurerProvider } from "@/components/providers/MeasurerProvider";
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="min-h-screen bg-bg-page text-text-primary font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log("%c⚡ Freighter","font-size:24px;font-weight:bold;color:#7B68FF");console.log("%cYour everyday Stellar wallet — https://github.com/stellar/freighter","font-size:12px;color:#A0A0A0");`,
          }}
        />
        <MotionProvider>{children}</MotionProvider>
        {process.env.NODE_ENV === "development" && <Agentation />}
        {process.env.NODE_ENV === "development" && <MeasurerProvider />}
      </body>
    </html>
  );
}
