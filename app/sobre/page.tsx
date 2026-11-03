import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import PartnersSection from "@/components/home/PartnersSection";
import { SectionHero as ServiceSection } from "@/components/home/ServiceSection";
import { CTACardsContainer } from "@/components/home/cardCta/Content";
import Vision from "@/components/home/VisionSection";
import SectionCall from "@/components/sectionCall";
import FAQSection from "@/components/home/FAQSection";
import { Globe2, MapPin, Users2, Calendar, Rocket, GraduationCap, Mail } from "lucide-react";

export default function SobrePage() {
  const servicesData = [
    {
      id: 1,
      title: "Palestras & Conferências",
      description:
        "Apresentações práticas lideradas por especialistas da indústria para desenvolver habilidades técnicas e soft skills de forma dinâmica.",
      imageUrl: "/images-card1.jpg",
      link: "/events",
    },
    {
      id: 2,
      title: "Bolsas de Estudos",
      description:
        "Oportunidades de bolsas com suporte financeiro e mentoria para impulsionar carreiras em tecnologia nos países lusófonos e globais.",
      imageUrl: "/images-card3.webp",
      link: "/bolsas",
    },
    {
      id: 4,
      title: "Hackathons & Desafios",
      description:
        "Desafios colaborativos para criar soluções inovadoras, testar habilidades e acelerar aprendizado prático em equipa.",
      imageUrl: "/images-card4.webp",
      link: "/events",
    },
    {
      id: 5,
      title: "Comunidades & Mentoria",
      description:
        "Grupos ativos de programadores, entusiastas e criadores para troca constante de experiência e conexões reais de trabalho.",
      imageUrl:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
      link: "/community",
    },
  ];

  const teamMembers = [
    {
      name: "Leandro Malungo",
      role: "FullStack Developer",
      country: "Angola",
      image: "/leandro.jpg",
    },
    {
      name: "Neuza Nascimento",
      role: "42 Porto",
      country: "Portugal",
      image: "/neuza.jpg",
  },
    {
      name: "Whitney Velasco",
      role: "Eng. Informática",
      country: "Moçambique",
      image: "/whitiney.jpg",
    },
    {
      name: "Filipe Mafuila",
      role: "Frontend Developer",
      country: "Angola",
      image: "/filipe.jpg",
    },
    {
      name: "Thomas Herinques",
      role: "AWS",
      country: "Brazil",
      image: "/Thomas.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-violet-200">
      <Navbar />

      <main className="flex-1 w-full">
        {/* 1. HERO INSTITUCIONAL */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-violet-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-violet-200">
                <Globe2 className="w-3.5 h-3.5" />
                Quem Somos
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold uppercase text-gray-900 tracking-tight leading-tight">
                A ponte tecnológica para toda a comunidade lusófona.
              </h2>
              <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
                A <strong>ADN Developer</strong> nasceu com uma missão clara: centralizar e democratizar o acesso a oportunidades, conhecimento e eventos no ecossistema tech da Comunidade dos Países de Língua Portuguesa (CPLP) e diáspora.
              </p>
              <p className="mt-3 text-gray-600 text-base leading-relaxed">
                Acreditamos que o talento não tem fronteiras geográficas. Quer estejas em Luanda, São Paulo, Lisboa, Maputo, Cidade da Praia, Bissau, São Tomé ou Díli, aqui encontras as ferramentas, bolsas, comunidades e roadmaps para acelerar a tua jornada na tecnologia.
              </p>

            </div>

            {/* Metas & Impacto em Números */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded bg-gray-50 border border-gray-200 shadow-sm text-center">
                <Users2 className="w-8 h-8 text-violet-600 mx-auto mb-2" />
                <p className="text-3xl font-semibold text-gray-900">10K+</p>
                <p className="text-xs uppercase text-gray-500 mt-1">Devs & Membros</p>
              </div>

              <div className="p-6 rounded bg-gray-50 border border-gray-200 shadow-sm text-center">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-3xl font-semibold text-gray-900">1.000+</p>
                <p className="text-xs uppercase text-gray-500 mt-1">Eventos & Meetups</p>
              </div>

              <div className="p-6 rounded bg-gray-50 border border-gray-200 shadow-sm text-center">
                <GraduationCap className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-3xl font-semibold text-gray-900">500+</p>
                <p className="text-xs uppercase text-gray-500 mt-1">Bolsas & Formações</p>
              </div>

              <div className="p-6 rounded bg-gray-50 border border-gray-200 shadow-sm text-center">
                <Rocket className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-3xl font-semibold text-gray-900">200+</p>
                <p className="text-xs uppercase text-gray-500 mt-1">Startups & Hubs</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SERVIÇOS E OFERTAS DA PLATAFORMA */}
        <section className="bg-[#111111] text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <ServiceSection services={servicesData} />
          </div>
        </section>

        {/* 3. VISÃO, MISSÃO E PILARES */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <Vision />
        </section>

        {/* 4. EQUIPA DA ADN DEVELOPER */}
        <section className="px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-violet-700 text-xs font-bold uppercase tracking-widest">
               Nossa Equipa
              </span>
              <p className="mt-2 text-sm text-gray-600">
                Líderes comunitários e desenvolvedores de Angola, Brasil, Moçambique e Portugal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {teamMembers.map((member, idx) => (
                <div
                  key={`${member.name}-${idx}`}
                  className="p-6 flex flex-col items-center text-center"
                >
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-violet-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <span className="text-xs font-semibold text-violet-700 mt-0.5">{member.role}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1 mb-3">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span>{member.country}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PARCEIROS */}
        <section className="bg-white py-12 border-t border-gray-100">
          <PartnersSection />
        </section>

      </main>

      <Footer />
    </div>
  );
}
