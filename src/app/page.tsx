import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCarousel } from "@/components/home/FeatureCarousel";
import { DownloadCards } from "@/components/home/DownloadCards";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { getXlmUsdRate } from "@/lib/xlm-price";

export default async function Home() {
  const xlmUsdRate = await getXlmUsdRate();
  return (
    <div
      className="overflow-x-clip flex flex-col"
      style={{ background: "linear-gradient(198deg, #1C1C1C 0%, #161616 100%)" }}
    >
      <div className="flex flex-col gap-16 sm:gap-[120px]">
        <main className="flex flex-col gap-16 sm:gap-[120px]">
          <HeroSection />
          <div data-uidotsh-pick="Card style" className="contents">
            <div data-uidotsh-option="Solid (current)" className="contents">
              <FeatureCarousel cardStyle="solid" xlmUsdRate={xlmUsdRate} />
            </div>
            <div data-uidotsh-option="Glow ring" className="contents" hidden>
              <FeatureCarousel cardStyle="glow" xlmUsdRate={xlmUsdRate} />
            </div>
            <div data-uidotsh-option="Glass" className="contents" hidden>
              <FeatureCarousel cardStyle="glass" xlmUsdRate={xlmUsdRate} />
            </div>
            <div data-uidotsh-option="Editorial" className="contents" hidden>
              <FeatureCarousel cardStyle="editorial" xlmUsdRate={xlmUsdRate} />
            </div>
          </div>
          <DownloadCards />
          <FeaturesGrid />
          <FAQSection />
          <CTASection />
        </main>
      </div>
      <Footer />
    </div>
  );
}
