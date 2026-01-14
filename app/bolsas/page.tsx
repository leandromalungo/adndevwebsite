
import React from 'react';
import { HeroSection } from '@/components/bolsas/HeroSection';
import { OurWorkSection } from '@/components/bolsas/OurWorkSection';
import { AboutUsSection } from '@/components/bolsas/AboutUsSection';
import { SupportersSection } from '@/components/bolsas/SupportersSection';
import { ScholarshipSection } from '@/components/bolsas/HeroDescr';
import { ScholarshipListSection } from '@/components/bolsas/ScholarshipListSection';
import { HowToWinSection } from '@/components/bolsas/HowToWinSection';
import { FAQSection } from '@/components/bolsas/faq';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


const App: React.FC = () => {
  return (

    <>
    <Navbar />
    <main className="min-h-screen bg-white">
      <HeroSection />
      <ScholarshipSection />
      <div className="space-y-0">
   
        <div className="py-12 px-4 md:px-8">
          <AboutUsSection />
        </div>
        
        <SupportersSection />

        <div className="py-12 px-4 md:px-8">
          <OurWorkSection />
        </div>     

        <ScholarshipListSection />

        <HowToWinSection />

        <FAQSection />

        <Footer />
      </div>
    </main>
    </>
  );
};

export default App;
