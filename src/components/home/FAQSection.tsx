"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeSlideUp } from "@/lib/animations";
import Link from "next/link";
import { PlusBold, ArrowRightBold } from "@/components/ui/PhosphorIcons";

const FAQ_ITEMS = [
  {
    question: "Is Freighter safe to use?",
    answer:
      "Freighter is non-custodial, which means your keys are encrypted and stored only on your device — never on a server. It's fully open source and auditable on GitHub, and includes advanced transaction protection powered by Blockaid to help block scams and malicious sites.",
  },
  {
    question: "Does Freighter charge fees?",
    answer:
      "No. Freighter doesn't add any wallet fees on top of transactions. You only pay Stellar's network fees, which typically cost a fraction of a cent.",
  },
  {
    question: "What happens if I lose my device?",
    answer:
      "Your account can always be restored on a new device using your recovery phrase — a unique set of words generated when you first set up Freighter. Freighter never stores your phrase, so keep it somewhere safe; it's the only way to recover your account.",
  },
  {
    question: "What can I do with Freighter?",
    answer:
      "Hold XLM and other Stellar assets, swap tokens directly in the wallet, manage multiple accounts, and connect to any Stellar or Soroban app that supports WalletConnect or the Stellar Wallets Kit.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="flex gap-4 items-start text-left w-full cursor-pointer"
    >
      {/* Plus/minus icon — spring rotation */}
      <motion.div
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="shrink-0 mt-1 text-[#B3A8FF]"
      >
        <PlusBold size={18} />
      </motion.div>
      {/* Question + Answer */}
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-normal text-text-primary leading-7">
          {question}
        </h3>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
              animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
              exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="overflow-hidden"
            >
              <p className="text-base text-text-secondary leading-6 mt-4">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}

export function FAQSection() {
  return (
    <section>
      <div className="max-w-[1024px] mx-auto px-6">
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
        >
          {/* Left column — heading */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-white tracking-[-1.6px] leading-[1.2]">
              Frequently asked
              <br />
              questions
            </h2>
          </div>

          {/* Right column — FAQ items */}
          <div className="flex flex-col gap-8">
            {FAQ_ITEMS.map((item, i) => (
              <div key={item.question}>
                <FAQItem question={item.question} answer={item.answer} />
                {i < FAQ_ITEMS.length - 1 && (
                  <div className="h-px bg-border mt-8" />
                )}
              </div>
            ))}

            <div className="h-px bg-border" />

            {/* See more FAQs */}
            <Link
              href="/faq"
              className="inline-flex items-center gap-1 self-start px-6 py-3 text-sm font-medium text-text-primary bg-bg-hover rounded-full hover:bg-zinc-700 transition-colors"
            >
              See more FAQs
              <ArrowRightBold size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
