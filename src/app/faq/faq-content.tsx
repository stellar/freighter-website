"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeSlideUp } from "@/lib/animations";
import { faqData } from "@/lib/faq-data";
import { PlusBold } from "@/components/ui/PhosphorIcons";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="flex gap-6 items-start text-left w-full cursor-pointer py-8"
    >
      <PlusBold
        size={20}
        className={`shrink-0 mt-1 text-[#B3A8FF] transition-transform duration-200 ${open ? "rotate-45" : ""}`}
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-lg md:text-xl font-medium text-text-primary leading-7">
          {question}
        </h3>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-base text-text-secondary leading-relaxed mt-4">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}

export function FAQContent() {
  return (
    <motion.div
      variants={fadeSlideUp}
      initial="hidden"
      animate="visible"
      className="mt-16"
    >
      {faqData.map((item, i) => (
        <div key={i}>
          {i > 0 && <div className="h-px bg-border" />}
          <FAQItem question={item.question} answer={item.answer} />
        </div>
      ))}
    </motion.div>
  );
}
