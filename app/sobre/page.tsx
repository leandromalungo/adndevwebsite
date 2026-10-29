import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import PartnersSection from "@/components/home/PartnersSection";
import { SectionHero as ServiceSection } from "@/components/home/ServiceSection";
import { CTACardsContainer } from "@/components/home/cardCta/Content";
import Vision from "@/components/home/VisionSection";
import SectionCall from "@/components/sectionCall";
import FAQSection from "@/components/home/FAQSection";
import {
  Compass,
  Globe2,
  Mail,
  MapPin,
  Sparkles,
  Users2,
  GraduationCap,
  Calendar,
  Rocket,
  ShieldCheck,
} from "lucide-react";

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
      role: "Founder & Manager",
      country: "Angola",
      image: "/leandro.jpg",
      description:
        "Fundador e gestor do ADN Developer, com uma visão estratégica para conectar talentos, comunidades e oportunidades no ecossistema tecnológico lusófono.",
    },
    {
      name: "Neuza Nascimento",
      role: "Co-Founder",
      country: "Portugal",
      image: "/neuza.jpg",
      description:
        "Co-fundadora e estrategista de parcerias, dedicada a construir pontes entre comunidades, startups e oportunidades tecnológicas.",
    },
    {
      name: "Whitney Velasco",
      role: "Content Creator",
      country: "Moçambique",
      image: "/whitiney.jpg",
      description: "Estudante de engenharia informática e criadora de conteúdos tecnológicos focada na lusofonia.",
    },
    {
      name: "Fernanda Sehn",
      role: "Designer",
      country: "Brasil",
      image: "/fernanda.jpg",
      description: "Designer de produto e comunicação, dedicada a interfaces acessíveis e experiências centradas no utilizador.",
    },
    {
      name: "Filipe Mafuila",
      role: "Frontend Developer",
      country: "Angola",
      image: "/filipe.jpg",
      description: "Desenvolvedor frontend focado em criar interfaces modernas, responsivas e de alta performance.",
    },
    {
      name: "Fanio Panga",
      role: "Frontend Developer",
      country: "Angola",
      image: "/filipe.jpg",
      description: "Desenvolvedor frontend apaixonado por código limpo, design systems e arquitetura web.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-violet-200">
      <Navbar />

      <main className="flex-1 w-full">
        {/* 1. HERO INSTITUCIONAL */}
        <section className="relative overflow-hidden">
          <Hero />
        </section>

        {/* 2. O QUE É A ADN DEVELOPER & MISSÃO */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-violet-200">
                <Globe2 className="w-3.5 h-3.5" />
                Quem Somos
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                A ponte tecnológica para toda a comunidade lusófona.
              </h2>
              <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
                A <strong>ADN Developer</strong> nasceu com uma missão clara: centralizar e democratizar o acesso a oportunidades, conhecimento e eventos no ecossistema tech da Comunidade dos Países de Língua Portuguesa (CPLP) e diáspora.
              </p>
              <p className="mt-3 text-gray-600 text-base leading-relaxed">
                Acreditamos que o talento não tem fronteiras geográficas. Quer estejas em Luanda, São Paulo, Lisboa, Maputo, Cidade da Praia, Bissau, São Tomé ou Díli, aqui encontras as ferramentas, bolsas, comunidades e roadmaps para acelerar a tua jornada na tecnologia.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-700 hover:bg-violet-800 text-white font-semibold text-sm shadow-sm transition-all"
                >
                  <Compass className="w-4 h-4" />
                  Explorar Oportunidades
                </Link>
                <a
                  href="mailto:geral.adndeveloper@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold text-sm transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Falar Connosco
                </a>
              </div>
            </div>

            {/* Metas & Impacto em Números */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm text-center">
                <Users2 className="w-8 h-8 text-violet-600 mx-auto mb-2" />
                <p className="text-3xl font-black text-gray-900">10K+</p>
                <p className="text-xs uppercase font-bold text-gray-500 mt-1">Devs & Membros</p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm text-center">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-3xl font-black text-gray-900">1.000+</p>
                <p className="text-xs uppercase font-bold text-gray-500 mt-1">Eventos & Meetups</p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm text-center">
                <GraduationCap className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-3xl font-black text-gray-900">500+</p>
                <p className="text-xs uppercase font-bold text-gray-500 mt-1">Bolsas & Formações</p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm text-center">
                <Rocket className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-3xl font-black text-gray-900">200+</p>
                <p className="text-xs uppercase font-bold text-gray-500 mt-1">Startups & Hubs</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SERVIÇOS E OFERTAS DA PLATAFORMA */}
        <section className="bg-[#111111] text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-violet-400 text-xs font-bold uppercase tracking-widest">
                O que oferecemos
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-2 text-white">
                Recursos selecionados para a tua evolução
              </h2>
            </div>
            <ServiceSection services={servicesData} />
          </div>
        </section>

        {/* 4. VISÃO, MISSÃO E PILARES */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-violet-700 text-xs font-bold uppercase tracking-widest">
              Compromisso
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              Nossa Visão e Princípios de Atuação
            </h2>
          </div>
          <Vision />
        </section>

        {/* 5. EQUIPA DA ADN DEVELOPER */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-b border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-violet-700 text-xs font-bold uppercase tracking-widest">
                Quem Faz Acontecer
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                A Equipa ADN Developer
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Líderes comunitários, desenvolvedores e designers de Angola, Brasil, Moçambique e Portugal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, idx) => (
                <div
                  key={`${member.name}-${idx}`}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
                >
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-violet-100">
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
                  <p className="text-xs text-gray-600 leading-relaxed">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CHAMADA E CTA */}
        <section className="bg-white">
          <SectionCall />
          <CTACardsContainer />
        </section>

        {/* 7. PARCEIROS */}
        <section className="bg-white py-12 border-t border-gray-100">
          <PartnersSection />
        </section>

        {/* 8. FAQ E CANAIS OFICIAIS DE CONTACTO */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Perguntas Frequentes</h2>
            <p className="mt-2 text-sm text-gray-500">Tudo o que precisas saber sobre a nossa atuação.</p>
          </div>
          <FAQSection />

          {/* Cartão de Contacto Oficial */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-violet-900 to-indigo-900 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Queres sugerir uma oportunidade ou fazer parceria?</h3>
            <p className="text-sm text-violet-200 max-w-xl mx-auto mb-6">
              Estamos sempre abertos a colaborar com organizadores de eventos, universidades, startups e comunidades tecnológicas.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <a
                href="mailto:geral.adndeveloper@gmail.com"
                className="inline-flex items-center gap-2 bg-white text-violet-950 px-6 py-2.5 rounded-lg text-sm font-bold shadow hover:bg-violet-50 transition-colors"
              >
                <Mail className="w-4 h-4" />
                geral.adndeveloper@gmail.com
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-violet-800/80 hover:bg-violet-800 text-white border border-violet-600 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Voltar à Descoberta
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
