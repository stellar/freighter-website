import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FAQContent } from "./faq-content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Freighter, the non-custodial Stellar wallet.",
};

export default function FAQPage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="mt-[120px]">
        <div className="mx-auto grid w-full max-w-[1024px] gap-12 px-6 lg:grid-cols-[240px_minmax(0,720px)] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <h1 className="text-4xl font-medium tracking-tight text-text-primary md:text-5xl lg:text-6xl">
              FAQs
            </h1>
            <p className="mt-3 text-base text-text-secondary">
              Last Updated April 2026
            </p>
          </div>
          <FAQContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
