import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChangelogContent } from "./changelog-content";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Keep up with the latest Freighter updates and releases.",
};

const changelogEntries = [
  {
    version: "5.28.0",
    date: "March 2025",
    platform: "extension" as const,
    title: "Performance improvements and bug fixes",
    changes: [
      "Improved transaction signing speed",
      "Fixed asset display issue for certain tokens",
      "Updated Stellar SDK to latest version",
      "Minor UI improvements throughout the extension",
    ],
  },
  {
    version: "2.12.0",
    date: "February 2025",
    platform: "mobile" as const,
    title: "Biometric authentication enhancements",
    changes: [
      "Added Face ID support for iOS",
      "Improved fingerprint authentication on Android",
      "Fixed crash on account switch",
      "Updated onboarding flow for new users",
    ],
  },
  {
    version: "5.27.0",
    date: "January 2025",
    platform: "extension" as const,
    title: "DEX swap improvements",
    changes: [
      "Added configurable slippage tolerance for swaps",
      "Improved price quotes for DEX trades",
      "Added swap history view",
      "Fixed issue with certain trustline additions",
    ],
  },
  {
    version: "2.11.0",
    date: "January 2025",
    platform: "mobile" as const,
    title: "Portfolio view and fiat ramp",
    changes: [
      "New portfolio overview with asset breakdown",
      "Integrated Coinbase on-ramp for buying XLM",
      "Added push notification support",
      "Various stability improvements",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight">
            Changelog
          </h1>
          <p className="text-lg text-text-secondary mt-4">
            Keep up with the latest Freighter updates.
          </p>
          <ChangelogContent entries={changelogEntries} />
        </div>
      </main>
      <Footer />
    </>
  );
}
