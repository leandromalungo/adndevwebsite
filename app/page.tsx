/**
 * PÁGINA INICIAL — ADN Developer
 *
 * Ponto de entrada da plataforma, apresentando o Hero, serviços, coleções selecionadas, 
 * testemunhos e secções de destaque para o utilizador.
 */

import Navbar from "@/components/auth/Navbar";
import Hero from "@/components/home/Hero";
import PartnersSection from "@/components/home/PartnersSection";
import { SectionHero as ServiceSection } from "@/components/home/ServiceSection";
import { CTACardsContainer } from "@/components/home/cardCta/Content";
import Vision from "@/components/home/VisionSection";
import SectionCall from "@/components/sectionCall";
import Footer from "@/components/Footer";

const Page = () => {
  /**
   * Dados dos serviços e ofertas da plataforma - Lista de cartões exibidos na Secção de Serviços
   */
  const servicesData = [
    {
      id: 1,
      title: "Palestras",
      description:
        "Apresentações práticas liderados por especialistas da indústria para desenvolver habilidades técnicas de forma dinâmica.",
      imageUrl: "/images-card1.jpg",
      link: "/events",
    },
    {
      id: 2,
      title: "Bolsas de estudos",
      description:
        "Oportunidades de bolsas com suporte financeiro e mentoria para impulsionar carreiras em tecnologia.",
      imageUrl: "/images-card3.webp",
      link: "/bolsas",
    },
    {
      id: 4,
      title: "Hackathon",
      description:
        "Desafios colaborativos para criar soluções inovadoras e acelerar aprendizado prático.",
      imageUrl: "/images-card4.webp",
      link: "/events",
    },
    {
      id: 5,
      title: "Desafios",
      description:
        "Competições para testar habilidades e conquistar reconhecimento no cenário tecnológico.",
      imageUrl:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
      link: "/events",
    }
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

        </section>

        {/* ÁREA DE CONTEÚDO E SERVIÇOS: Layout principal com serviços, visões e componentes de contacto */}
        <section className="relative z-10 bg-[#111111] flex flex-col items-center py-5 px-4 md:px-10 space-y-24">
          <ServiceSection services={servicesData} />
        </section>

        <div className="relative z-10 bg-white w-full overflow-hidden">
          <SectionCall />
        
          <CTACardsContainer />

          <Vision />  

          <PartnersSection />

          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Page;
