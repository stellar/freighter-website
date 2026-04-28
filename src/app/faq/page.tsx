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
    <div className="flex flex-col pt-8 pb-[72px]">
      <Navbar />
      <main className="mt-[120px]">
        <div className="max-w-[1024px] mx-auto px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-text-primary tracking-tight">
            FAQs
          </h1>
          <p className="text-base text-text-secondary mt-3">
            Last Updated April 2026
          </p>
          <FAQContent />
        </div>
      </main>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}
