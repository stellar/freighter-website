"use client";

import { type ComponentType } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeSlideUp } from "@/lib/animations";
import { clsx } from "clsx";
import {
  SwapBold,
  DiamondBold,
  FingerprintBold,
  CurrencyDollarBold,
  ShieldCheckBold,
  WalletBold,
  LockBold,
  DownloadBold,
} from "@/components/ui/PhosphorIcons";
import { Shield } from "@phosphor-icons/react";

// Bold wrapper for Shield (no check variant needed separately)
const ShieldBold = (props: { size?: number }) => <Shield weight="bold" {...props} />;

const features: { title: string; description: string; icon: ComponentType<{ size?: number }> }[] = [
  {
    title: "Instant DEX Swaps.",
    description: "Trade Stellar assets instantly without leaving your wallet.",
    icon: SwapBold,
  },
  {
    title: "Collectibles.",
    description: "View, store, and manage your Stellar NFTs natively.",
    icon: DiamondBold,
  },
  {
    title: "Biometric Login.",
    description: "Unlock securely with Face ID or fingerprint.",
    icon: FingerprintBold,
  },
  {
    title: "Zero Fees.",
    description: "No wallet fees \u2014 just Stellar\u2019s low network cost per transaction.",
    icon: CurrencyDollarBold,
  },
  {
    title: "Trusted Assets.",
    description: "Control exactly which assets you hold and manage trustlines.",
    icon: ShieldCheckBold,
  },
  {
    title: "Multiple Addresses.",
    description: "Create or import wallets and switch freely between them.",
    icon: WalletBold,
  },
  {
    title: "Blockaid Protection.",
    description: "Blocks scams and malicious transactions automatically.",
    icon: ShieldBold,
  },
  {
    title: "Non-Custodial.",
    description: "Your keys stay on your device, always. You own your crypto.",
    icon: LockBold,
  },
  {
    title: "Import Any Wallet.",
    description: "Restore accounts with a recovery phrase from any provider.",
    icon: DownloadBold,
  },
];

export function FeaturesGrid() {
  return (
    <section>
      <div className="max-w-[960px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeSlideUp}
                className={clsx(
                  "feature-cell flex gap-4 items-start p-8",
                  i % 3 !== 2 && "md:border-r md:border-border",
                  i < 6 && "border-b border-border"
                )}
              >
                <div className="feature-icon shrink-0 mt-0.5 text-accent-light">
                  <Icon size={20} />
                </div>
                <p className="text-base leading-6 md:min-h-[72px]">
                  <span className="font-medium text-text-primary">
                    {feature.title}
                  </span>{" "}
                  <span className="text-text-secondary">
                    {feature.description}
                  </span>
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
