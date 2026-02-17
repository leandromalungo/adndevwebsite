/**
 * HOME PAGE — ADN Developer
 *
 * Página inicial da plataforma.
 */

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Hero from "@/components/home/Hero";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/Footer";
import { SectionHero as ServiceSection } from "@/components/home/ServiceSection";
import Vision from "@/components/home/VisionSection";
import Testimonials from "@/components/home/TestimonialsSection";
import CuratedCollections from "@/components/cursos/courses/CuratedCollections";
import TeamMemberSection from "@/components/home/TeamMemberSection";
import { Destaque } from "@/components/home/Destaque";
import CardHero from "@/components/home/CardHero";
import UniverseSection from "@/components/home/content/ContentSection";
import DicasSection from "@/components/home/dicas/DicasSection";


const Page = () => {
  const servicesData = [
    {
      id: 1,
      title: "Workshops",
      description:
        "Workshops práticos liderados por especialistas da indústria para desenvolver habilidades técnicas de forma dinâmica.",
      imageUrl: "/images/img1.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Palestras",
      description:
        "Palestras com profissionais da área trazendo insights, tendências e networking estratégico.",
      imageUrl: "/images/IMG-20251221-WA0008.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Bolsas de estudos",
      description:
        "Oportunidades de bolsas com suporte financeiro e mentoria para impulsionar carreiras em tecnologia.",
      imageUrl: "/images/cnjgrad09.jpg",
      link: "#",
    },
    {
      id: 4,
      title: "Hackathon",
      description:
        "Desafios colaborativos para criar soluções inovadoras e acelerar aprendizado prático.",
      imageUrl: "/images/1768288533539.jpg",
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
      {/* Secção HERO */}
      <section className="relative min-h-[100dvh] w-full bg-black/90 overflow-hidden">
        <main className="relative z-10">
          <Hero />
        </main>

        {/* Fundo de imagem */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/index.jpg"
            alt="Background"
            fill
            className="object-cover opacity-60 grayscale-[0.2]"
            priority
          />

          {/* Sobreposições */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        </div>
      </section>
      <Destaque />
      <DicasSection />
      {/* CONTEÚDO */}
      <section className="relative z-10 bg-[#f7f8f9] flex flex-col items-center py-5 px-4 md:px-10 space-y-24">
        <div className="w-full max-w-7xl">
          <ServiceSection services={servicesData} />
        </div>

        <div className="w-full max-w-7xl">
          <CuratedCollections />
        </div>

        <div className="w-full max-w-7xl">
          <CardHero />
        </div>
        <UniverseSection />
        <div className="w-full max-w-7xl">
          <Vision />
        </div>
      </section>
      <Testimonials />
      <TeamMemberSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Page;
