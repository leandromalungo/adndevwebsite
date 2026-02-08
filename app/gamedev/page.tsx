"use client";

import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DiscoverSection from "@/components/gamedev/DiscoverSection";
import FortniteSection from "@/components/gamedev/FortniteSection";
import TopChartsSection from "@/components/gamedev/TopChartsSection";
import NewsSection from "@/components/gamedev/NewsSection";
import LatestNewsFeed from "@/components/gamedev/LatestNewsFeed";
import MagazineSubscription from "@/components/gamedev/MagazineSubscription";
import WeeklyHighlights from "@/components/gamedev/WeeklyHighlights";
import CardHero from "@/components/gamedev/CardHero";
import GOGPreservation from "@/components/gamedev/GOGPreservation";

const Page = () => {

  // --- BOTÃO CTA ---
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);

    // exemplo: redirecionar depois de clicar
    setTimeout(() => {
      router.push("/assinatura"); // muda para a rota que quiseres
    }, 1200);
  };

  return (
    <>
      <Head>
        <title>Game Development e Jogos Digitais na lusofonia</title>
        <meta
          name="description"
          content="Os maiores criadores de jogos na lusofonia. Desde comunidades, eventos e newslatter para game developers e criadores de jogos digitais."
        />
      </Head>

      <Navbar />

      {/* HERO */}
      <section className="relative w-full h-[50vh] overflow-hidden bg-zinc-900">
        {/* FUNDO */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/games.jpg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        {/* CONTEÚDO */}
        <div className="relative flex items-center h-full px-8 md:px-12">
          <div className="max-w-md">
            <h2 className="text-2xl mt-3 md:text-4xl font-bold text-white mb-3 leading-tight">
              Um mundo de jogos e entretenimento ao seu alcance, um espaço para Game developers.
            </h2>

            <p className="text-gray-100 mb-3 text-sm md:text-base">
                Descubra, partilhe e conecte-se com uma comunidade vibrante de desenvolvedores de jogos. Conheça os maiores densevolvedores nesta área na lusofonia.
            </p>

            <button
              onClick={handleClick}
              disabled={loading}
              className={`inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all active:scale-95 rounded ${
                loading
                  ? "bg-blue-300 cursor-not-allowed text-zinc-800"
                  : "bg-blue-400 hover:bg-blue-500 text-white"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  Assinar agora!
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 md:px-8 overflow-x-hidden">
        <div className="w-full max-w-[1400px] space-y-12">
          <CardHero />
          <DiscoverSection />
          <GOGPreservation />
          <FortniteSection />
          <TopChartsSection />
          <WeeklyHighlights />
          <MagazineSubscription />
          <NewsSection />
          <LatestNewsFeed />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
