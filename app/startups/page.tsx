
import React from 'react';
import Hero from '@/components/startups/Hero';
import Features from '@/components/startups/Features';
import AccessSection from '@/components/startups/AccessSection';
import Matchmaking from '@/components/startups/Matchmaking';
import HubShowcase from '@/components/startups/HubShowcase';
import ChallengesSection from '@/components/startups/ChallengesSection';
import NewsletterSection from '@/components/startups/NewsletterSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'

const App = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-black">
      <main>
        <Hero 
          title="Descubra as melhores oportunidades para sua startup"
          description="Mostramos as startups inovadoras com investidores, aceleradoras e programas de apoio para impulsionar seu crescimento. Networking e sucesso no ecossistema de inovação."
          videoUrl="https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-man-walking-in-a-greenhouse-40030-large.mp4"
          buttonText="Descubrir mais"
        />
        
        <Features />
        
        <AccessSection />

        <Matchmaking />

        <HubShowcase />

        <ChallengesSection />

        <NewsletterSection />
        
        <Footer />
      </main>
    </div>
    </>
  );
};

export default App;
