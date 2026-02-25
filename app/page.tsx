/**
 * PÁGINA INICIAL (HOME) — ADN Developer
 *
 * Esta é a porta de entrada da plataforma, apresentando o Hero, serviços,
 * coleções curadas, testemunhos e secções de destaque.
 */

import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/Footer";
import { SectionHero as ServiceSection } from "@/components/home/ServiceSection";
import { CTACardsContainer } from "@/components/home/cardCta/Container";
import Vision from "@/components/home/VisionSection";
import TeamMemberSection from "@/components/home/TeamMemberSection";
import CardHero from "@/components/home/CardHero";
import GradientBackground from "@/components/home/GradientBackground";
import SectionCall from "@/components/sectionCall";
import CardVideo from "@/components/home/cardVideo";

const Page = () => {
  /**
   * Dados dos serviços/ofertas da plataforma
   */
  const servicesData = [
    {
      id: 1,
      title: "Workshops",
      description:
        "Workshops práticos liderados por especialistas da indústria para desenvolver habilidades técnicas de forma dinâmica.",
      imageUrl: "/api/images/images-card1",
      link: "#",
    },
    {
      id: 2,
      title: "Palestras",
      description:
        "Palestras com profissionais da área trazendo insights, tendências e networking estratégico.",
      imageUrl: "/api/images/images-card2?v=1",
      link: "#",
    },
    {
      id: 3,
      title: "Bolsas de estudos",
      description:
        "Oportunidades de bolsas com suporte financeiro e mentoria para impulsionar carreiras em tecnologia.",
      imageUrl: "/api/images/images-card3?v=1",
      link: "#",
    },
    {
      id: 4,
      title: "Hackathon",
      description:
        "Desafios colaborativos para criar soluções inovadoras e acelerar aprendizado prático.",
      imageUrl: "/api/images/card4",
      link: "#",
    },
    {
      id: 5,
      title: "Desafios nacionais",
      description:
        "Competições para testar habilidades e conquistar reconhecimento no cenário tecnológico.",
      imageUrl:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
      link: "#",
    },
    {
      id: 6,
      title: "Testes de codificação",
      description:
        "Avaliação técnica para desenvolver raciocínio lógico e solução de problemas em código.",
      imageUrl:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-yellow-200">
      <Navbar />

      {/* Secção HERO: Introdução visual e CTA principal */}
      <section className="relative min-h-[100dvh] w-full bg-black/90 overflow-hidden">
        <main className="relative z-10">
          <Hero />
        </main>

        {/* Fundo ShaderGradient fixo para não piscar/recarregar no scroll */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <GradientBackground />
          {/* Sobreposições para legibilidade do texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>
      </section>

      {/* ÁREA DE CONTEÚDO E SERVIÇOS */}
      <section className="relative z-10 bg-[#f7f8f9] flex flex-col items-center py-5 px-4 md:px-10 space-y-24">
        <div className="w-full max-w-7xl">
          <ServiceSection services={servicesData} />
        </div>

        <div className="w-full max-w-7xl">
          <SectionCall />
        </div>

        <div className="w-full px-4 md:px-8">
          <CardVideo />
        </div>

        <div className="w-full max-w-7xl">
          <CardHero />
        </div>

        <div className="w-full max-w-7xl">
          <Vision />
        </div>
      </section>

      <div className="relative z-10 bg-white w-full">
        <CTACardsContainer />
        <TeamMemberSection />
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
