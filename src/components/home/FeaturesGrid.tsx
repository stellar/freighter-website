"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeSlideUp } from "@/lib/animations";
import {
  CurrencyDollarBold,
  ArrowDownBold,
  ArrowRightBold,
  ShieldCheckBold,
} from "@/components/ui/PhosphorIcons";

/**
 * Three reasons to trust Varial: no wallet fees, deposits from other chains,
 * and the foundation behind it. Each card leads with one big visual.
 */

/** Networks you can deposit from, with their official marks */
const CHAINS: { name: string; logo: string; size?: string }[] = [
  { name: "Ethereum", logo: "/images/chains/ethereum.svg" },
  { name: "Polygon", logo: "/images/chains/polygon.svg" },
  // The Base square reads heavier than the other marks, so it sits a bit smaller
  { name: "Base", logo: "/images/chains/base.svg", size: "size-6" },
];

/** A network mark in a round tile with its name underneath */
function ChainTile({
  name,
  dark,
  children,
}: {
  name: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className="flex flex-col items-center gap-2">
      <span
        className={`flex size-12 items-center justify-center rounded-full sm:size-14 ${
          dark
            ? "bg-[#171717] shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
            : "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_20px_rgba(0,0,0,0.08)] ring-1 ring-[#EDEDED]"
        }`}
      >
        {children}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#6F6F6F]">
        {name}
      </span>
    </span>
  );
}

const CARD =
  "relative flex min-h-[380px] flex-col overflow-hidden rounded-[32px] bg-white p-8 md:p-10";
const ICON =
  "flex size-9 items-center justify-center rounded-full bg-[#EEF4FF] text-accent";

export function FeaturesGrid() {
  return (
    <section>
      <div className="mx-auto max-w-[1280px] px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {/* Zero fees */}
          <motion.div variants={fadeSlideUp} className={CARD}>
            <div className={ICON}>
              <CurrencyDollarBold size={18} />
            </div>
            <div className="my-auto py-8">
              <span className="block text-[88px] font-medium leading-none tracking-[-0.06em] text-[#171717] md:text-[104px]">
                $0
              </span>
              <span className="mt-2 block text-sm font-medium uppercase tracking-[0.18em] text-[#0050FF]">
                wallet fees
              </span>
            </div>
            <div>
              <h3 className="text-xl font-medium tracking-[-0.02em] text-[#171717]">
                No wallet fees
              </h3>
              <p className="mt-2 text-base leading-6 text-[#6F6F6F]">
                Varial doesn&apos;t charge wallet fees. Stellar network fees
                still apply.
              </p>
            </div>
          </motion.div>

          {/* Cross-chain deposits */}
          <motion.div variants={fadeSlideUp} className={CARD}>
            <div className={ICON}>
              <ArrowDownBold size={18} />
            </div>
            {/* Three network marks, each named, flowing into Stellar */}
            <div className="my-auto flex items-end gap-1.5 py-8 sm:gap-2">
              {CHAINS.map((chain) => (
                <ChainTile key={chain.name} name={chain.name}>
                  <Image
                    src={chain.logo}
                    alt={chain.name}
                    width={28}
                    height={28}
                    className={`${chain.size ?? "size-7"} object-contain`}
                  />
                </ChainTile>
              ))}
              <span
                className="mb-6 flex items-center gap-1 px-0.5 text-[#B4B4B4]"
                aria-hidden
              >
                <span className="size-1 rounded-full bg-current" />
                <span className="size-1 rounded-full bg-current" />
                <ArrowRightBold size={14} />
              </span>
              <ChainTile name="Stellar" dark>
                <Image
                  src="/images/stellar-xlm-logo.png"
                  alt="Stellar"
                  width={28}
                  height={28}
                  className="size-7 object-contain invert"
                />
              </ChainTile>
            </div>
            <div>
              <h3 className="text-xl font-medium tracking-[-0.02em] text-[#171717]">
                From other chains to Stellar
              </h3>
              <p className="mt-2 text-base leading-6 text-[#6F6F6F]">
                Deposit supported assets from other networks into your Stellar
                wallet.
              </p>
            </div>
          </motion.div>

          {/* Built by SDF */}
          <motion.div variants={fadeSlideUp} className={CARD}>
            <div className={ICON}>
              <ShieldCheckBold size={18} />
            </div>
            <div className="my-auto py-8">
              <Image
                src="/images/stellar-xlm-logo.png"
                alt="Stellar"
                width={96}
                height={96}
                className="size-[96px]"
              />
              <span className="mt-4 block text-sm font-medium uppercase tracking-[0.18em] text-[#171717]">
                Stellar Development Foundation
              </span>
            </div>
            <div>
              <h3 className="text-xl font-medium tracking-[-0.02em] text-[#171717]">
                Built by the Stellar Development Foundation
              </h3>
              <p className="mt-2 text-base leading-6 text-[#6F6F6F]">
                Open source and non-custodial. You control your wallet and
                private keys.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
