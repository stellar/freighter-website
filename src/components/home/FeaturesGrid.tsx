"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeSlideUp } from "@/lib/animations";
import { CurrencyDollarBold, ArrowDownBold, ShieldCheckBold } from "@/components/ui/PhosphorIcons";

/**
 * Three reasons to trust Varial: no wallet fees, deposits from other chains,
 * and the foundation behind it. Each card leads with one big visual.
 */

const CHAINS = ["Ethereum", "Solana", "Base", "Polygon", "Arbitrum", "BNB Chain"];

const CARD =
  "relative flex min-h-[380px] flex-col overflow-hidden rounded-[32px] bg-white p-8 md:p-10";
const ICON = "flex size-9 items-center justify-center rounded-full bg-[#EEF4FF] text-accent";

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
              <span className="mt-2 block text-sm font-medium uppercase tracking-[0.18em] text-[#0050FF]">wallet fees</span>
            </div>
            <div>
              <h3 className="text-xl font-medium tracking-[-0.02em] text-[#171717]">Zero fees, always</h3>
              <p className="mt-2 text-base leading-6 text-[#6F6F6F]">
                No wallet fees, ever — just Stellar&apos;s network cost, a fraction of a cent.
              </p>
            </div>
          </motion.div>

          {/* Cross-chain deposits */}
          <motion.div variants={fadeSlideUp} className={CARD}>
            <div className={ICON}>
              <ArrowDownBold size={18} />
            </div>
            <div className="my-auto flex flex-wrap gap-2 py-8">
              {CHAINS.map((chain, i) => (
                <span
                  key={chain}
                  className={
                    i % 3 === 1
                      ? "rounded-full bg-[#171717] px-4 py-2 text-sm font-medium text-white"
                      : "rounded-full bg-[#EEF4FF] px-4 py-2 text-sm font-medium text-[#0050FF]"
                  }
                >
                  {chain}
                </span>
              ))}
              <span className="rounded-full px-4 py-2 text-sm font-medium text-[#8F8F8F] shadow-[inset_0_0_0_1px_#DBDBDB]">
                + more
              </span>
            </div>
            <div>
              <h3 className="text-xl font-medium tracking-[-0.02em] text-[#171717]">Cross-chain deposits</h3>
              <p className="mt-2 text-base leading-6 text-[#6F6F6F]">
                Bring assets from other chains straight into your Stellar wallet.
              </p>
            </div>
          </motion.div>

          {/* Built by SDF */}
          <motion.div variants={fadeSlideUp} className={CARD}>
            <div className={ICON}>
              <ShieldCheckBold size={18} />
            </div>
            <div className="my-auto flex items-center gap-4 py-8">
              <Image
                src="/images/stellar-xlm-logo.png"
                alt="Stellar"
                width={72}
                height={72}
                className="size-[72px] rounded-full"
              />
              <div className="text-sm font-medium leading-5 text-[#6F6F6F]">
                <span className="block text-[#171717]">Stellar Development</span>
                <span className="block text-[#171717]">Foundation</span>
                <span className="mt-1 block text-[#0050FF]">Open source · Non-custodial</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium tracking-[-0.02em] text-[#171717]">Built by the Stellar Foundation</h3>
              <p className="mt-2 text-base leading-6 text-[#6F6F6F]">
                Open source, non-custodial, and maintained by the team behind Stellar.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
