import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCarousel } from "@/components/home/FeatureCarousel";
import { DownloadCards } from "@/components/home/DownloadCards";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="overflow-x-clip flex flex-col pt-8 pb-[72px]">
      <div className="flex flex-col gap-16 sm:gap-[120px]">
        <Navbar />
        <main className="flex flex-col gap-16 sm:gap-[120px]">
          <HeroSection />
          <FeatureCarousel />
          <DownloadCards />
          <FeaturesGrid />
          <FAQSection />
          <CTASection />
        </main>
      </div>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}
