"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import type { FilterTab } from "@/components/CountryFilter";

interface CategoryCardProps {
  image: string;
  title: string;
  description: string;
  href: string;
  buttonLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  deadline?: string; // Nova prop opcional para a data final (Formato: "YYYY-MM-DD")
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  image,
  title,
  description,
  href,
  buttonLabel,
  secondaryHref,
  secondaryLabel,
  deadline,
}) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isLoggedIn = !!session;

  // Lógica matemática para calcular os dias restantes baseando-se na data atual
  const calculateDaysLeft = (): { text: string; isExpired: boolean } => {
    if (!deadline) return { text: "Prazo em aberto", isExpired: false };

    const today = new Date();
    // Zera as horas para comparar apenas os dias exatos
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(deadline);
    targetDate.setHours(0, 0, 0, 0);

    const differenceInTime = targetDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    if (daysLeft < 0) {
      return { text: "Expirado", isExpired: true };
    } else if (daysLeft === 0) {
      return { text: "Termina hoje!", isExpired: false };
    } else if (daysLeft === 1) {
      return { text: "Falta 1 dia", isExpired: false };
    } else {
      return { text: `Faltam ${daysLeft} dias`, isExpired: false };
    }
  };

  const { text: statusText, isExpired } = calculateDaysLeft();

  const buttons = [
    { 
      href: isLoggedIn ? href : `${pathname}?auth=login`, 
      label: isExpired ? "Inscrições Encerradas" : (buttonLabel ?? "Inscrever") 
    },
    secondaryHref && { 
      href: isLoggedIn ? secondaryHref : `${pathname}?auth=login`, 
      label: secondaryLabel ?? "Detalhes" 
    },
  ].filter(Boolean) as Array<{ href: string; label: string }>;

  return (
    <div className="flex flex-col h-auto md:h-full backdrop-blur-md rounded-2xl border border-violet-500/10 hover:border-violet-200 overflow-hidden shadow-lg hover:shadow-violet-500/55 transition-all duration-300 group relative">

      {/* Badge Flutuante do Contador de Dias */}
      <div className="absolute top-3 right-3 z-10">
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm backdrop-blur-sm transition-colors duration-300
          ${isExpired 
            ? "bg-red-500 text-white" 
            : statusText === "Termina hoje!" 
              ? "bg-amber-500 text-white animate-pulse" 
              : statusText === "Prazo em aberto"
                ? "bg-emerald-500 text-white"
                : "bg-white/90 text-violet-700 border border-violet-100"
          }`}
        >
          {statusText}
        </span>
      </div>

      {/* Contentor de Imagem */}
      <div className="h-40 md:h-48 overflow-hidden relative bg-slate-50 rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          loading="lazy"
        />
      </div>

      {/* Área de Conteúdo */}
      <div className="flex flex-col flex-grow p-5 bg-white">

        <h3 className="text-base font-bold text-slate-800 mb-2 leading-snug transition-colors duration-200 group-hover:text-violet-600">
          {title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-grow line-clamp-3 font-normal">
          {description}
        </p>

        {/* Botões de Ação */}
        <div className="pt-3 border-t border-slate-50 flex gap-2">
          {buttons.map((button, index) => {
            const isMainButton = index === 0;
            
            // Se estiver expirado, o botão principal fica cinza e desabilitado para cliques
            if (isExpired && isMainButton) {
              return (
                <div
                  key={button.href}
                  className="flex-1 text-center font-semibold py-2 px-3 rounded-lg text-xs tracking-wide bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed select-none"
                >
                  {button.label}
                </div>
              );
            }

            return (
              <a
                key={button.href}
                href={button.href}
                target={isLoggedIn ? "_blank" : undefined}
                rel={isLoggedIn ? "noreferrer" : undefined}
                className={`flex-1 text-center font-semibold py-2 px-3 rounded-lg text-xs tracking-wide transition-all duration-200 ${
                  isMainButton
                    ? "border border-violet-600 text-violet-600 hover:text-white shadow-sm hover:bg-violet-600 shadow-violet-600/10"
                    : "bg-slate-50 text-slate-600 hover:text-violet-600 border border-slate-200/60 hover:bg-slate-100"
                }`}
              >
                {button.label}
              </a>
            );
          })}
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
    deadline?: string;
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
      deadline: "2026-04-15", // Passado (Aparecerá como Expirado)
    },
    {
      image: "/esp.png",
      title: "BOLSAS DE ESTUDOS PARA ESPANHA | 2026-2027",
      description:
        "País: Espanha. Programa: Aprenda África. Nível educacional: Cursos de Especialização, Mestrado & Pré-Doutorado. Prazo: 19 de Abril de 2026, 23:59 (horário de Madrid).",
      href: "https://mujeresporafrica.es/learn-africa-programa-2026/",
      buttonLabel: "Inscrever",
      deadline: "2026-04-19", // Passado (Aparecerá como Expirado)
    },
    {
      image: "/irlnd.png",
      title: "BOLSA DE ESTUDOS JOHN THOMPSON 2026 NA IRLANDA",
      description:
        "País anfitrião: Irlanda. Universidade: Dublin City University (DCU). Duração: Um ano. Mensalidades totalmente cobertas. Prazo final: 30 de julho de 2026.",
      href: "https://business.dcu.ie/scholarships/john-thompson-scholarship/",
      buttonLabel: "Inscrever",
      deadline: "2026-07-30", // Futuro
    },
    {
      image: "/en.png",
      title: "BOLSA DE EXCELÊNCIA INTERNACIONAL SALFORD 2026-2027",
      description:
        "País: Reino Unido. Nível: Bacharelado e Mestrado. Financiado. Prazo: 14 de julho de 2026.",
      href: "https://www.salford.ac.uk/international/scholarships/global-gold-excellence-scholarship",
      buttonLabel: "Inscrever",
      deadline: "2026-07-14", // Futuro
    },
    {
      image: "/onl.png",
      title: "BOLSAS DE ESTUDOS DA UNIVERSIDADE HAN 2026 NA HOLANDA",
      description:
        "País: Holanda. Nível: Licenciatura e Mestrado. Universidade HAN. Prazo de candidatura: 1° de Maio de 2026.",
      href: "https://www.hanuniversity.com/en/study-and-living/scholarships/",
      buttonLabel: "Inscrever",
      deadline: "2026-05-01", // Passado (Aparecerá como Expirado)
    },
    {
      image: "/ugnd.png",
      title: "PROGRAMA DE BOLSAS MASTERCARD FOUNDATION MAKERERE 2026-2027",
      description:
        "País: Uganda. Universidade: Makerere. Nível: Licenciatura & Mestrado. Totalmente financiado. Prazo: 5 de Junho de 2026.",
      href: "https://apply.mastercardfoundation.mak.ac.ug/scholarships",
      buttonLabel: "Inscrever",
      deadline: "2026-06-05", // Futuro
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
      deadline: "2026-07-13", // Futuro
    },
    {
      image: "/brlm.png",
      title: "BOLSAS INTERNACIONAIS SBW BERLIN 2026",
      description:
        "País: Alemanha. Nível: Licenciatura e Mestrado. Fornecido por SBW Berlin. Prazo: Aberto ano todo.",
      href: "https://sbw.berlin/en/portfolio-items/sbw-berlin-scholarship",
      buttonLabel: "Inscrever",
      deadline: "", // Aberto o ano todo (Exibirá: Prazo em aberto)
    },
    {
      image: "/china.png",
      title: "BOLSAS DA UNIVERSIDADE CENTRAL DO SUL 2026 NA CHINA",
      description:
        "País: China. Nível: Licenciatura, Mestrado e Doutorado. Financiamento integral. Data limite: 31 de maio de 2026.",
      href: "https://intl.csu.edu.cn/English/Scholarship/CSC_Scholarship.htm",
      buttonLabel: "Inscrever",
      deadline: "2026-05-31", // Futuro
    },
    {
      image: "/en.png",
      title: "BOLSA DE MBA DA UNIVERSIDADE DE CAMBRIDGE 2026",
      description:
        "País: Reino Unido. Nível: MBA. Universidade de Cambridge. Prazo: 15 de maio de 2026. Enviar CV, GMAT e carta de aceitação para admissions@boustany-foundation.org.",
      href: "https://boustany-foundation.org/scholarship-programmes/mba-cambridge/",
      buttonLabel: "Inscrever",
      deadline: "2026-05-15", // Passado (Aparecerá como Expirado)
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
      deadline: "2026-05-09", // Passado (Aparecerá como Expirado)
    },
    {
      image: "/itl.png",
      title: "BOLSA DE ESTUDOS MAECI DO GOVERNO ITALIANO 2026",
      description:
        "País: Itália. Nível: Mestrado ou Doutorado. Financiada pelo Ministério das Relações Exteriores da Itália (MAECI). Data limite: 26 de maio de 2026.",
      href: "https://www.esteri.it/en/opportunita/borse-di-studio/per-cittadini-stranieri/borsestudio_stranieri/",
      buttonLabel: "Inscrever",
      deadline: "2026-05-26", // Hoje! (Aparecerá como Termina hoje!)
    },
  ];
  const allCategories = [...dynamicItems, ...categories];

  return (
    <section className="bg-white pt-6 pb-16 px-6 md:px-12">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allCategories.map((cat, index) => (
            <CategoryCard key={(cat as any).id ?? cat.href ?? index} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
};