/**
 * PÁGINA INICIAL — ADN Developer
 *
 * Ponto de entrada da plataforma, apresentando o Hero, serviços, coleções selecionadas, 
 * testemunhos e secções de destaque para o utilizador.
 */

import Navbar from "@/components/auth/Navbar";
import Hero from "@/components/home/Hero";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/Footer";
import { SectionHero as ServiceSection } from "@/components/home/ServiceSection";
import { CTACardsContainer } from "@/components/home/cardCta/Content";
import Vision from "@/components/home/VisionSection";
import GradientBackground from "@/components/home/GradientBackground";
import SectionCall from "@/components/sectionCall";
import CardVideo from "@/components/home/cardVideo";
import OpportunitiesSection from "@/components/home/OpportunitiesSection";

const Page = () => {
  /**
   * Dados dos serviços e ofertas da plataforma - Lista de cartões exibidos na Secção de Serviços
   */
  const servicesData = [
    {
      id: 1,
      title: "Workshops",
      description:
        "Workshops práticos liderados por especialistas da indústria para desenvolver habilidades técnicas de forma dinâmica.",
      imageUrl: "/images-card1.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Palestras",
      description:
        "Palestras com profissionais da área trazendo insights, tendências e networking estratégico.",
      imageUrl: "/images-card2.webp",
      link: "#",
    },
    {
      id: 3,
      title: "Bolsas de estudos",
      description:
        "Oportunidades de bolsas com suporte financeiro e mentoria para impulsionar carreiras em tecnologia.",
      imageUrl: "/images-card3.webp",
      link: "#",
    },
    {
      id: 4,
      title: "Hackathon",
      description:
        "Desafios colaborativos para criar soluções inovadoras e acelerar aprendizado prático.",
      imageUrl: "/images-card4.webp",
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
    <div className="min-h-screen flex flex-col bg-white selection:bg-yellow-200 overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full overflow-x-hidden">
        {/* SECÇÃO HERO: Introdução visual impactante e Chamada para Ação (CTA) principal */}
        <section className="relative min-h-screen w-full overflow-hidden">
          <div className="relative z-10">
            <Hero />
          </div>

        {/* Background ShaderGradient Absoluto: Contido dentro da secção hero, não afecta o scroll */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-black">
            <GradientBackground />
            {/* Camadas de Sobreposição (Overlays): Melhoram a legibilidade do texto sobre o fundo dinâmico */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          </div>
        </section>

        {/* ÁREA DE CONTEÚDO E SERVIÇOS: Layout principal com serviços, visões e componentes de contacto */}
        <section className="relative z-10 bg-[#f7f8f9] flex flex-col items-center py-5 px-4 md:px-10 space-y-24">

          <ServiceSection services={servicesData} />

          <SectionCall />

          <CardVideo />

          <Vision />
        </section>

        <div className="relative z-10 bg-white w-full overflow-hidden">
          <OpportunitiesSection />
          
          <CTACardsContainer />
                    
          <FAQSection />
          
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Page;
