"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeSlideUp, EASE_OUT } from "@/lib/animations";
import Link from "next/link";
import { PlusBold, ArrowRightBold } from "@/components/ui/PhosphorIcons";

const FAQ_ITEMS = [
  {
    question: "Is Varial safe to use?",
    answer:
      "Varial is non-custodial, which means your keys are encrypted and stored only on your device — never on a server. It's fully open source and auditable on GitHub, and includes advanced transaction protection powered by Blockaid to help block scams and malicious sites.",
  },
  {
    question: "Does Varial charge fees?",
    answer:
      "No. Varial doesn't add any wallet fees on top of transactions. You only pay Stellar's network fees, which typically cost a fraction of a cent.",
  },
  {
    question: "What happens if I lose my device?",
    answer:
      "Your account can always be restored on a new device using your recovery phrase — a unique set of words generated when you first set up Varial. Varial never stores your phrase, so keep it somewhere safe; it's the only way to recover your account.",
  },
  {
    question: "What can I do with Varial?",
    answer:
      "Hold XLM and other Stellar assets, swap tokens directly in the wallet, manage multiple accounts, and connect to any Stellar or Soroban app that supports WalletConnect or the Stellar Wallets Kit.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="flex w-full cursor-pointer items-start gap-4 rounded-[24px] bg-white p-6 text-left transition-colors duration-200 hover:bg-[#FCFCFC]"
    >
      {/* Plus/minus icon — spring rotation */}
      <motion.div
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="mt-1 shrink-0 text-[#171717]"
      >
        <PlusBold size={18} />
      </motion.div>
      {/* Question + Answer */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium leading-7 text-text-primary">
          {question}
        </h3>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
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
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
        >
          {/* Left column — heading + link */}
          <div className="flex flex-col items-start gap-6">
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-text-primary tracking-[-1.6px] leading-[1.2]">
              Frequently asked
              <br className="hidden md:inline" /> questions
            </h2>
            <Link
              href="/faq"
              className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2a2a2a]"
            >
              See more FAQs
              <ArrowRightBold size={16} />
            </Link>
          </div>

          {/* Right column — FAQ cards */}
          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
