"use client";

import HomeHero from "@/components/games/hero";
import { CommunityHero } from "@/components/games/community-hero";
import { FaqSection } from "@/components/games/faq-section";
import Footer from "@/components/Footer";
import { AssetStoreSection } from "@/components/games/games-section";

export default function Page() {
  return (
    <>
      <HomeHero />

      <div className="bg-black">
        <AssetStoreSection />

        <div className="p-8">
          <CommunityHero />
          <FaqSection />
        </div>

        <Footer />
      </div>
    </>
  );
}
