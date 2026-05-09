"use client";

import React from "react";
import { FadeIn } from "@/components/ui/fade-in";
import type { FilterTab } from "@/components/CountryFilter";

interface CategoryCardProps {
  image: string;
  title: string;
  description: string;
  href: string;
  buttonLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  image,
  title,
  description,
  href,
  buttonLabel,
  secondaryHref,
  secondaryLabel,
}) => {
  const buttons = [
    { href, label: buttonLabel ?? "Inscrever" },
    secondaryHref && { href: secondaryHref, label: secondaryLabel ?? "Detalhes" },
  ].filter(Boolean) as Array<{ href: string; label: string }>;

  return (
    <div className="flex flex-col h-auto md:h-full rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="h-40 md:h-48 overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-grow p-6 bg-[#2e405c]">
        <h3 className="text-lg md:text-xl font-extrabold text-white mb-2 leading-tight">
          {title}
        </h3>

        <p className="text-white text-xs sm:text-sm leading-relaxed mb-4 md:mb-6 flex-grow line-clamp-3">
          {description}
        </p>
        <span className="text-[10px] text-gray-100 mb-4">
          Fonte: Esta bolsa tem as suas fontes devidamente mencionadas nesta postagem sem nenhuma alteração.
        </span>
        <div className="flex flex-wrap gap-3">
          {buttons.map((button) => (
            <a
              key={button.href}
              href={button.href}
              target="_blank"
              rel="noreferrer"
              className="inline-block border-2 border-white text-white font-bold py-2 px-6 rounded hover:bg-[#0d9488] hover:text-white transition duration-200 text-sm"
            >
              {button.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

interface RecentSectionProps {
  selectedCountry?: FilterTab;
  dynamicItems?: Array<{
    id: string;
    image: string;
    title: string;
    description: string;
    href: string;
    buttonLabel?: string;
  }>;
}

export const RecentSection: React.FC<RecentSectionProps> = ({
  selectedCountry,
  dynamicItems = [],
}) => {

  const categories = [
    {
      image: "/africadsul.png",
      title: "BOLSAS DE ESTUDO MANDELA RHODES 2026",
      description:
        "Totalmente Financiadas! Para todos os países Africanos. As bolsas são oferecidas para os níveis de Mestrado e Doutorado.",
      href: "https://www.mandelarhodes.org/scholarship/apply/",
      buttonLabel: "Inscrever",
    },
    {
      image: "/esp.png",
      title: "BOLSAS DE ESTUDOS PARA ESPANHA | 2026-2027",
      description:
        "País: Espanha. Programa: Aprenda África. Nível educacional: Cursos de Especialização, Mestrado & Pré-Doutorado. Prazo: 19 de Abril de 2026, 23:59 (horário de Madrid).",
      href: "https://mujeresporafrica.es/learn-africa-programa-2026/",
      buttonLabel: "Inscrever",
    },
    {
      image: "/irlnd.png",
      title: "BOLSA DE ESTUDOS JOHN THOMPSON 2026 NA IRLANDA",
      description:
        "País anfitrião: Irlanda. Universidade: Dublin City University (DCU). Duração: Um ano. Mensalidades totalmente cobertas. Prazo final: 30 de julho de 2026.",
      href: "https://business.dcu.ie/scholarships/john-thompson-scholarship/",
      buttonLabel: "Inscrever",
    },
    {
      image: "/en.png",
      title: "BOLSA DE EXCELÊNCIA INTERNACIONAL SALFORD 2026-2027",
      description:
        "País: Reino Unido. Nível: Bacharelado e Mestrado. Financiado. Prazo: 14 de julho de 2026.",
      href: "https://www.salford.ac.uk/international/scholarships/global-gold-excellence-scholarship",
      buttonLabel: "Inscrever",
    },
    {
      image: "/onl.png",
      title: "BOLSAS DE ESTUDOS DA UNIVERSIDADE HAN 2026 NA HOLANDA",
      description:
        "País: Holanda. Nível: Licenciatura e Mestrado. Universidade HAN. Prazo de candidatura: 1° de Maio de 2026.",
      href: "https://www.hanuniversity.com/en/study-and-living/scholarships/",
      buttonLabel: "Inscrever",
    },
    {
      image: "/ugnd.png",
      title: "PROGRAMA DE BOLSAS MASTERCARD FOUNDATION MAKERERE 2026-2027",
      description:
        "País: Uganda. Universidade: Makerere. Nível: Licenciatura & Mestrado. Totalmente financiado. Prazo: 5 de Junho de 2026.",
      href: "https://apply.mastercardfoundation.mak.ac.ug/scholarships",
      buttonLabel: "Inscrever",
    },
    {
      image: "/trk.png",
      title: "BOLSAS INTERNACIONAIS DA UNIVERSIDADE BILKENT 2026/2027",
      description:
        "País: Turquia. Nível: Licenciatura, Mestrado & PhD. Universidade Bilkent. Prazo: 13 de Julho de 2026.",
      href: "https://w3.bilkent.edu.tr/international/how-to-apply/",
      buttonLabel: "Detalhes Licenciatura",
      secondaryHref: "https://stars.bilkent.edu.tr/gradapp/index.php",
      secondaryLabel: "Detalhes Mestrado",
    },
    {
      image: "/brlm.png",
      title: "BOLSAS INTERNACIONAIS SBW BERLIN 2026",
      description:
        "País: Alemanha. Nível: Licenciatura e Mestrado. Fornecido por SBW Berlin. Prazo: Aberto ano todo.",
      href: "https://sbw.berlin/en/portfolio-items/sbw-berlin-scholarship",
      buttonLabel: "Inscrever",
    },
    {
      image: "/china.png",
      title: "BOLSAS DA UNIVERSIDADE CENTRAL DO SUL 2026 NA CHINA",
      description:
        "País: China. Nível: Licenciatura, Mestrado e Doutorado. Financiamento integral. Data limite: 31 de maio de 2026.",
      href: "https://intl.csu.edu.cn/English/Scholarship/CSC_Scholarship.htm",
      buttonLabel: "Inscrever",
    },
    {
      image: "/en.png",
      title: "BOLSA DE MBA DA UNIVERSIDADE DE CAMBRIDGE 2026",
      description:
        "País: Reino Unido. Nível: MBA. Universidade de Cambridge. Prazo: 15 de maio de 2026. Enviar CV, GMAT e carta de aceitação para admissions@boustany-foundation.org.",
      href: "https://boustany-foundation.org/scholarship-programmes/mba-cambridge/",
      buttonLabel: "Inscrever",
    },
    {
      image: "/br.jpg",
      title: "BOLSA DE ESTUDANTES CONVÊNIO PEC-G 2026",
      description:
        "Universidade do Extremo Sul Catarinense (UNESC) publica o Edital para Processo Seletivo de Estudantes Internacionais para Cursos de Graduação. PEC-G oferece graduação totalmente gratuita em universidades brasileiras, sem taxas e sem exames de admissão. Pré-inscrição até 9 de Maio de 2026.",
      href: "https://www.unesc.net/portal/resources/official_documents/27492.pdf?1775052806",
      buttonLabel: "Edital PDF",
      secondaryHref: "https://www.gov.br/mre/pt-br/assuntos/cultura-e-educacao/temas-educacionais/programas-de-estudo-para-estrangeiros/pec-g/processo-seletivo",
      secondaryLabel: "Saiba mais",
    },
    {
      image: "/itl.png",
      title: "BOLSA DE ESTUDOS MAECI DO GOVERNO ITALIANO 2026",
      description:
        "País: Itália. Nível: Mestrado ou Doutorado. Financiada pelo Ministério das Relações Exteriores da Itália (MAECI). Data limite: 26 de maio de 2026.",
      href: "https://www.esteri.it/en/opportunita/borse-di-studio/per-cittadini-stranieri/borsestudio_stranieri/",
      buttonLabel: "Inscrever",
    },
  ];
  const allCategories = [...dynamicItems, ...categories];

  return (
    <section className="bg-white pt-6 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-4 sm:mb-6">
          <h2 className="sm:text-2xl md:text-4xl lg:text-5xl text-[#040a17] mb-1 sm:mb-2 uppercase">
            Bolsas de estudo{" "}
            <span className="font-bolt opacity-40 text-violet-700">mais recorrentes</span>
          </h2>

          <p className="text-[#4b5563] text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-6 sm:mb-8">
            {selectedCountry && (
              <span>
                Bolsas disponíveis em <strong>{selectedCountry}</strong>
              </span>
            )}
            {!selectedCountry &&
              "Explore as bolsas de estudo mais recentes e populares disponíveis para você, independentemente do país Assine a plataforma e receba alertas durante o mês."}
          </p>

        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCategories.map((cat, index) => (
            <FadeIn key={index} delay={index * 0.15} direction="up" className="h-full">
              <CategoryCard {...cat} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
