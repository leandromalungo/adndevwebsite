"use client";

import FifaHospitalityBanner from '@/components/comp/HospitalityBanner';
import FifaTournaments from '@/components/comp/Tournaments';
import FifaInfoSection from '@/components/comp/InfoSection';
import FifaRecentEvents from '@/components/comp/RecentEvents';
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import { NewsItem } from '@/data/types';

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
