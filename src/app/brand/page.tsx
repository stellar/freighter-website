import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrandContent } from "./brand-content";

export const metadata: Metadata = {
  title: "Freighter is now Varial",
  description:
    "Official Varial logos, icons, and colors. Update your app's Freighter branding to Varial.",
};

export default function BrandPage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="mt-[120px] pb-24">
        <div className="mx-auto w-full max-w-[1280px] px-6">
          <BrandContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
