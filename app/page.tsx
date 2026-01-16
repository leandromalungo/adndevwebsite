"use client";

/* Layout base */
import Navbar from "@/components/Navbar";
import Hero from "@/components/home/hero";
import Faq from "@/components/home/faqHero";
import Footer from "@/components/Footer";

/* Home sections */
import { CardHero } from "@/components/home/CardHero";
import { ServicesSection } from "@/components/home/sectionHero";
import { LogoCloud } from "@/components/home/logosHero";
import Vision from "@/components/home/VisionHero";
import Impact from "@/components/home/ImpactHero";
import Partners from "@/components/home/PartnersHero";
import Testimonials from "@/components/home/TestimonialsHero";
import CuratedCollections from "@/components/roadmaps/courses/CuratedCollections";
import TeamMemberSection from "@/components/home/TeamMember";

const Page = () => {
  /* ---------- DADOS ---------- */

 const servicesData = [
  {
    id: 1,
    title: "Workshops",
    description: "Participe de workshops práticos e interativos para aprimorar suas habilidades técnicas. Liderados por especialistas da indústria, esses workshops oferecem aprendizado prático em diversas áreas tecnológicas.",
    imageUrl: "/images/img1.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "Palestras",
    description:
      "Junte-se a palestras inspiradoras ministradas por profissionais renomados do setor de tecnologia, compartilhando insights valiosos e tendências emergentes. Para expandir seu conhecimento e rede de contatos, não perca essas oportunidades únicas.",
    imageUrl: "/images/IMG-20251221-WA0008.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Bolsas de estudos",
    description:
      "Acesse oportunidades de bolsas de estudo para impulsionar sua carreira na área de tecnologia, com apoio financeiro e mentoria especializada, ajudando você a alcançar seus objetivos acadêmicos e profissionais.",
    imageUrl: "/images/cnjgrad09.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "Hackathon",
    description:
      "Participe de hackathons para desenvolver soluções criativas e colaborativas em equipe, com desafios práticos e oportunidades de networking, impulsionando sua carreira na área de tecnologia.",
    imageUrl: "/images/1768288539585.jpg",
    link: "#",
  },
  {
    id: 5,
    title: "Desafios e competições nacionais",
    description:
      "Engaje-se em desafios e competições nacionais para testar suas habilidades técnicas e inovadoras, com prêmios emocionantes e reconhecimento no setor, impulsionando sua carreira na área de tecnologia.",
    imageUrl: "/images/1765482668812.jpg",
    link: "#",
  },
  {
    id: 6,
    title: "Testes de habilidades de codificação",
    description:
      "Teste suas habilidades de codificação em desafios práticos e competições, desenvolvendo soluções criativas e colaborativas com oportunidades de networking, impulsionando sua carreira na área de tecnologia.",
    imageUrl: "/images/1768288533539.jpg",
    link: "#",
  },
];


  /* ---------- RENDERIZAÇÃO ---------- */

  return (
    <div className="min-h-screen bg-white selection:bg-yellow-200">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen w-full bg-black overflow-hidden">
        {/* Conteúdo do Hero */}
        <main className="relative z-10">
          <Hero />
          <LogoCloud />
        </main>

        {/* Background isolado APENAS do Hero */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://cdn.prod.website-files.com/685be7dcd32275d3830651d3/68f7343a86a7563b64024c01_hp_desktop_a.webp"
            alt="Hero Background"
            className="absolute w-full h-full object-cover opacity-60 grayscale-[0.2]"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent hidden md:block" />
        </div>
      </section>

      {/* ================= CONTEÚDO NORMAL ================= */}
      <section className="relative z-10 bg-[#f7f8f9] flex flex-col items-center py-5 px-4 md:px-10 space-y-24">
        <div className="w-full max-w-7xl">
          <ServicesSection services={servicesData} />
        </div>
        <CuratedCollections />
        <Impact />
        <Vision />

        <div className="w-full max-w-7xl">
          <CardHero
            title="SOBRE A ADN Developer"
            paragraphs={[
              "A ADN Developer é um ecossistema dinâmico e inovador no setor de tecnologia",
              "Que abrange desde a educação até a inovação empresarial. Nossa missão é conectar indivíduos, instituições e empresas para fomentar o crescimento e a transformação digital.",
            ]}
          />
        </div>
      </section>

      <Testimonials />
      <Partners />
      <TeamMemberSection />
      <Faq />
      <Footer />
    </div>
  );
};

export default Page;
