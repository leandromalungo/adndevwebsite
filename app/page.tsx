/**
 * HOME PAGE — ADN Developer
 * =========================
 *
 * Página inicial da plataforma.
 *
 * Seções:
 * 1. Hero
 * 2. Serviços
 * 3. LogoCloud
 * 4. Visão & Missão
 * 5. Coleções Curadas
 * 6. Depoimentos
 * 7. Equipe
 * 8. FAQ
 */

import Navbar from "@/components/Navbar";
import Hero from "@/components/home/hero";
import Faq from "@/components/home/faqHero";
import Footer from "@/components/Footer";
import { ServicesSection } from "@/components/home/sectionHero";
import Vision from "@/components/home/VisionHero";
import Testimonials from "@/components/home/TestimonialsHero";
import CuratedCollections from "@/components/roadmaps/courses/CuratedCollections";
import TeamMemberSection from "@/components/home/TeamMember";

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
      imageUrl: "/images/1768288539585.jpg",
      link: "#",
    },
    {
      id: 5,
      title: "Desafios nacionais",
      description:
        "Competições para testar habilidades e conquistar reconhecimento no cenário tecnológico.",
      imageUrl: "/images/1765482668812.jpg",
      link: "#",
    },
    {
      id: 6,
      title: "Testes de codificação",
      description:
        "Avaliação técnica para desenvolver raciocínio lógico e solução de problemas em código.",
      imageUrl: "/images/1768288533539.jpg",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-yellow-200">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen w-full bg-black overflow-hidden">
        <main className="relative z-10">
          <Hero />
        </main>

        {/* Video Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.2]"
            src="/videos/video1.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent hidden md:block" />
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="relative z-10 bg-[#f7f8f9] flex flex-col items-center py-5 px-4 md:px-10 space-y-24">
        <div className="w-full max-w-7xl">
          <ServicesSection services={servicesData} />
        </div>

        <CuratedCollections />
        <Vision />
      </section>

      <Testimonials />
      <TeamMemberSection />
      <Faq />
      <Footer />
    </div>
  );
};

export default Page;
