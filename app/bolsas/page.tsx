
import React from 'react';
import { Hero } from '@/components/bolsas/Hero';
import { LeaderBo } from '@/components/bolsas/LeaderBo';
import { AboutUsSection } from '@/components/bolsas/AboutUsSection';
import { BigTechBo } from '@/components/bolsas/BigTechBo';
import { Preview } from '@/components/bolsas/Preview';
import { CarroselBo } from '@/components/bolsas/CarroselBo';
import { RecentSection } from '@/components/bolsas/RecentSection';
import Faq from '@/components/bolsas/Faq';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


const App: React.FC = () => {
  return (

    <>
    <Navbar />
    <main className="min-h-screen bg-white">
      <Hero />
      <Preview />
      <div className="space-y-0">
   
        <div className="py-12 px-4 md:px-8">
          <AboutUsSection />
        </div>
        
        <BigTechBo />

        <div className="py-12 px-4 md:px-8">
          <LeaderBo />
        </div>     

        <CarroselBo />

        <RecentSection />

        <Faq />

        <Footer />
      </div>
    </main>
    </>
  );
};

export default App;
