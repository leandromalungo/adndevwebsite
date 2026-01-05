"use client";

import Hero from '@/components/comp/Hero';
import FifaHospitalityBanner from '@/components/comp/HospitalityBanner';
import FifaTournaments from '@/components/comp/Tournaments';
import FifaInfoSection from '@/components/comp/InfoSection';
import FifaRecentEvents from '@/components/comp/RecentEvents';
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import { NewsItem } from '@/data/types';

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    category: "FIFA Women's Champions Cup 2026",
    title: "As campeãs pioneiras desse torneio inédito serão coroadas em fevereiro",
    description: "Todas as informações que você precisa sobre a edição inaugural da Copa dos Campeões Feminina podem ser encontradas na página do torneio",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200&h=800",
    dateBadge: "28 de janeiro – 1o. de fevereiro de 2026"
  },
  {
    id: '2',
    category: "FIFA World Cup 2026™",
    title: "Prepare-se para a maior Copa do Mundo de todos os tempos",
    description: "A contagem regressiva começou para o evento que unirá três nações e milhões de fãs em torno do esporte mais amado do planeta.",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200&h=800",
    dateBadge: "Junho de 2026"
  },
  {
    id: '3',
    category: "Youth Development",
    title: "Investimentos na base garantem o futuro do futebol",
    description: "Novos centros de treinamento e programas de bolsas estão sendo implementados para descobrir a próxima geração de talentos globais.",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200&h=800",
    dateBadge: "Inscrições Abertas"
  }
];

const App = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 bg-gray-50 space-y-8">
      <div className="w-full max-w-7xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Descubra as melhores competições.</h1>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">Portal Oficial de Notícias</p>
          </div>
      
        </header>
        
        {/* Main News Slider */}
        <Hero items={MOCK_NEWS} />
        
        {/* Hospitality Banner */}
        <div className="mt-8">
          <FifaHospitalityBanner />
        </div>

        {/* Recent Events Section (History) */}
        <div className="mt-12">
          <FifaRecentEvents />
        </div>

        {/* Upcoming Tournaments Section */}
        <div className="mt-12">
          <FifaTournaments />
        </div>

        {/* Info Section - The best in the world */}
        <div className="mt-8">
          <FifaInfoSection />
        </div>
          <Footer />
      </div>
    </div>
    </>
  );
};

export default App;
