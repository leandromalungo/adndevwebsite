"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import type { FilterTab } from "@/components/CountryFilter";

// ==========================================
// FUNÇÕES UTILITÁRIAS (BUSINESS LOGIC)
// ==========================================
interface DateStatus {
  text: string;
  isExpired: boolean;
}

const checkDeadlineStatus = (deadline?: string): DateStatus => {
  if (!deadline) return { text: "Prazo em aberto", isExpired: false };

  const today = new Date();
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

// ==========================================
// COMPONENTE: CATEGORY CARD
// ==========================================
interface CategoryCardProps {
  image: string;
  title: string;
  description: string;
  href: string;
  buttonLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  deadline?: string;
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

  const { text: statusText, isExpired } = checkDeadlineStatus(deadline);

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
    <div className="flex flex-col h-auto md:h-full backdrop-blur-md rounded-2xl border border-violet-500/10 hover:border-violet-200 overflow-hidden shadow-lg hover:shadow-violet-300/55 transition-all duration-300 group relative">

      {/* Badge Flutuante do Contador de Dias */}
      <div className="absolute top-3 right-3 z-10">
        <span className={`px-2.5 py-1 rounded text-[11px] font-bold shadow-sm backdrop-blur-sm transition-colors duration-300
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
          className="w-full h-full object-cover"
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
                className={`flex-1 text-center font-semibold py-2 px-3 rounded-lg text-xs tracking-wide transition-all duration-200 ${isMainButton
                  ? "border border-violet-600 text-violet-600 hover:text-white shadow-sm hover:bg-violet-600 shadow-violet-600/10"
                  : "flex flex-end bg-slate-50 text-slate-600 hover:text-violet-600 border border-slate-200/60 hover:bg-slate-100"
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

// ==========================================
// TYPES E INTERFACES SEÇÃO
// ==========================================
type NavCategory = "bolsas" | "intercambio" | "cursos" | "bootcamps" | "certificações" | "Estágios";
type TimeFilter = "todas" | "ativas" | "passadas";

interface TimelineItem {
  id: string;
  category: NavCategory;
  image: string;
  title: string;
  description: string;
  href: string;
  buttonLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  deadline?: string;
}

interface RecentSectionProps {
  selectedCountry?: FilterTab;
  dynamicItems?: Array<TimelineItem>;
}

// ==========================================
// COMPONENTE PRINCIPAL: RECENT SECTION
// ==========================================
export const RecentSection: React.FC<RecentSectionProps> = ({ dynamicItems = [], }) => {
  const [activeCategory, setActiveCategory] = useState<NavCategory>("bolsas");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("todas");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown se clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lista de dados
  const categories: TimelineItem[] = [
    {
      id: "mandela-rhodes-2026",
      category: "bolsas",
      image: "/africadsul.png",
      title: "BOLSAS DE ESTUDO MANDELA RHODES 2026",
      description: "Totalmente Financiadas! Para todos os países Africanos. As bolsas são oferecidas para os níveis de Mestrado e Doutorado.",
      href: "https://www.mandelarhodes.org/scholarship/apply/",
      buttonLabel: "Inscrever",
      deadline: "2026-04-15",
    },
    {
      id: "aprenda-africa-espanha",
      category: "bolsas",
      image: "/esp.png",
      title: "BOLSAS DE ESTUDOS PARA ESPANHA | 2026-2027",
      description: "País: Espanha. Programa: Aprenda África. Nível educacional: Cursos de Especialização, Mestrado & Pré-Doutorado. Prazo: 19 de Abril de 2026, 23:59 (horário de Madrid).",
      href: "https://mujeresporafrica.es/learn-africa-programa-2026/",
      buttonLabel: "Inscrever",
      deadline: "2026-04-19",
    },
    {
      id: "john-thompson-irlanda",
      category: "bolsas",
      image: "/irlnd.png",
      title: "BOLSA DE ESTUDOS JOHN THOMPSON 2026 NA IRLANDA",
      description: "País anfitrião: Irlanda. Universidade: Dublin City University (DCU). Duração: Um ano. Mensalidades totalmente cobertas. Prazo final: 30 de julho de 2026.",
      href: "https://business.dcu.ie/scholarships/john-thompson-scholarship/",
      buttonLabel: "Inscrever",
      deadline: "2026-07-30",
    },
    {
      id: "salford-uk-2026",
      category: "bolsas",
      image: "/en.png",
      title: "BOLSA DE EXCELÊNCIA INTERNACIONAL SALFORD 2026-2027",
      description: "País: Reino Unido. Nível: Bacharelado e Mestrado. Financiado. Prazo: 14 de julho de 2026.",
      href: "https://www.salford.ac.uk/international/scholarships/global-gold-excellence-scholarship",
      buttonLabel: "Inscrever",
      deadline: "2026-07-14",
    },
    {
      id: "han-holanda-2026",
      category: "bolsas",
      image: "/onl.png",
      title: "BOLSAS DE ESTUDOS DA UNIVERSIDADE HAN 2026 NA HOLANDA",
      description: "País: Holanda. Nível: Licenciatura e Mestrado. Universidade HAN. Prazo de candidatura: 1° de Maio de 2026.",
      href: "https://www.hanuniversity.com/en/study-and-living/scholarships/",
      buttonLabel: "Inscrever",
      deadline: "2026-05-01",
    },
    {
      id: "mastercard-makerere-uganda",
      category: "bolsas",
      image: "/ugnd.png",
      title: "PROGRAMA DE BOLSAS MASTERCARD FOUNDATION MAKERERE 2026-2027",
      description: "País: Uganda. Universidade: Makerere. Nível: Licenciatura & Mestrado. Totalmente financiado. Prazo: 5 de Junho de 2026.",
      href: "https://apply.mastercardfoundation.mak.ac.ug/scholarships",
      buttonLabel: "Inscrever",
      deadline: "2026-06-05",
    },
    {
      id: "bilkent-turquia-2026",
      category: "bolsas",
      image: "/trk.png",
      title: "BOLSAS INTERNACIONAIS DA UNIVERSIDADE BILKENT 2026/2027",
      description: "País: Turquia. Nível: Licenciatura, Mestrado & PhD. Universidade Bilkent. Prazo: 13 de Julho de 2026.",
      href: "https://w3.bilkent.edu.tr/international/how-to-apply/",
      buttonLabel: "Detalhes Licenciatura",
      secondaryHref: "https://stars.bilkent.edu.tr/gradapp/index.php",
      secondaryLabel: "Detalhes Mestrado",
      deadline: "2026-07-13",
    },
    {
      id: "sbw-berlin-alemanha",
      category: "bolsas",
      image: "/brlm.png",
      title: "BOLSAS INTERNACIONAIS SBW BERLIN 2026",
      description: "País: Alemanha. Nível: Licenciatura e Mestrado. Fornecido por SBW Berlin. Prazo: Aberto ano todo.",
      href: "https://sbw.berlin/en/portfolio-items/sbw-berlin-scholarship",
      buttonLabel: "Inscrever",
      deadline: "",
    },
    {
      id: "csu-china-2026",
      category: "bolsas",
      image: "/china.png",
      title: "BOLSAS DA UNIVERSIDADE CENTRAL DO SUL 2026 NA CHINA",
      description: "País: China. Nível: Licenciatura, Mestrado e Doutorado. Financiamento integral. Data limite: 31 de maio de 2026.",
      href: "https://intl.csu.edu.cn/English/Scholarship/CSC_Scholarship.htm",
      buttonLabel: "Inscrever",
      deadline: "2026-05-31",
    },
    {
      id: "cambridge-mba-uk",
      category: "bolsas",
      image: "/en.png",
      title: "BOLSA DE MBA DA UNIVERSIDADE DE CAMBRIDGE 2026",
      description: "País: Reino Unido. Nível: MBA. Universidade de Cambridge. Prazo: 15 de maio de 2026. Enviar CV, GMAT e carta de aceitação para admissions@boustany-foundation.org.",
      href: "https://boustany-foundation.org/scholarship-programmes/mba-cambridge/",
      buttonLabel: "Inscrever",
      deadline: "2026-05-15",
    },
    {
      id: "pecg-unesc-brasil",
      category: "bolsas",
      image: "/br.jpg",
      title: "BOLSA DE ESTUDANTES CONVÊNIO PEC-G 2026",
      description: "Universidade do Extremo Sul Catarinense (UNESC) publica o Edital para Processo Seletivo de Estudantes Internacionais para Cursos de Graduação. PEC-G oferece graduação totalmente gratuita em universidades brasileiras, sem taxas e sem exames de admissão. Pré-inscrição até 9 de Maio de 2026.",
      href: "https://www.unesc.net/portal/resources/official_documents/27492.pdf?1775052806",
      buttonLabel: "Edital PDF",
      secondaryHref: "https://www.gov.br/mre/pt-br/assuntos/cultura-e-educacao/temas-educacionais/programas-de-estudo-para-estrangeiros/pec-g/processo-seletivo",
      secondaryLabel: "Saiba mais",
      deadline: "2026-05-09",
    },
    {
      id: "maeci-governo-italiano",
      category: "bolsas",
      image: "/itl.png",
      title: "BOLSA DE ESTUDOS MAECI DO GOVERNO ITALIANO 2026",
      description: "País: Itália. Nível: Mestrado ou Doutorado. Financiada pelo Ministério das Relações Exteriores da Itália (MAECI). Data limite: 26 de maio de 2026.",
      href: "https://www.esteri.it/en/opportunita/borse-di-studio/per-cittadini-stranieri/borsestudio_stranieri/",
      buttonLabel: "Inscrever",
      deadline: "2026-05-26",
    },
  ];

  const allCategories = [...dynamicItems, ...categories];

  // Filtro Duplo Combinado
  const filteredItems = allCategories.filter((item) => {
    if (item.category !== activeCategory) return false;

    const { isExpired } = checkDeadlineStatus(item.deadline);
    if (timeFilter === "ativas") return !isExpired;
    if (timeFilter === "passadas") return isExpired;

    return true; // "todas"
  });

  const navTabs: Array<{ id: NavCategory; label: string }> = [
    { id: "bolsas", label: "Bolsas de Estudo" },
    { id: "intercambio", label: "Programas de Intercâmbio" },
    { id: "cursos", label: "Cursos" },
    { id: "bootcamps", label: "Bootcamps" },
    { id: "certificações", label: "Certificações" },
    { id: "Estágios", label: "Estágios" },
  ];

  const timeTabs = [
    { id: "todas", label: "Todas" },
    { id: "ativas", label: "Inscrições Abertas" },
    { id: "passadas", label: "Encerradas / Passadas" },
  ] as const;

  const currentStatusLabel = timeTabs.find((t) => t.id === timeFilter)?.label;

  return (
    <section className="bg-white pb-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">

        {/* CONTAINER DA NAVBAR PRINCIPAL COM O DROPDOWN NA MESMA LINHA */}
        <div className="mb-8 w-full flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-50/50 p-2 rounded border border-slate-100 max-w-6xl mx-auto">
          
          {/* ABAS DE CATEGORIA CORRIGIDAS PARA MOBILE */}
          <nav
            className="flex flex-row items-center gap-1.5 sm:gap-2 w-full md:w-auto overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none snap-x"
            aria-label="Categorias"
          >
            {navTabs.map((tab) => {
              const isActive = activeCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3.5 md:px-4 rounded-lg text-xs font-semibold transition-all duration-300 outline-none select-none border text-center shrink-0 whitespace-nowrap snap-center
                    ${isActive
                      ? "bg-violet-600 border-violet-600 text-white shadow-sm shadow-violet-600/20"
                      : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* DROPDOWN COMPACTO DO PRAZO (NA MESMA LINHA) */}
          <div className="relative w-full md:w-auto shrink-0" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full md:w-auto flex items-center justify-between gap-2 bg-white border border-slate-200 text-slate-700 text-xs font-medium py-2 px-3 rounded-lg shadow-sm hover:bg-slate-50 transition-colors duration-200 outline-none select-none"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                <span className="truncate">{currentStatusLabel}</span>
              </div>
              <svg 
                className={`w-3 h-3 text-slate-400 transition-transform duration-200 shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* PAINEL FLUTUANTE DO DROPDOWN */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-full md:w-48 bg-white border border-slate-200 rounded-lg shadow-xl z-20 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                {timeTabs.map((tab) => {
                  const isSelected = timeFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setTimeFilter(tab.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors duration-150 outline-none flex items-center justify-between
                        ${isSelected 
                          ? "bg-violet-50 text-violet-700 font-semibold" 
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                    >
                      {tab.label}
                      {isSelected && (
                        <span className="w-1 h-1 rounded-full bg-violet-600"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* FEED DE CARDS FILTRADOS */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((cat) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl">
            <p className="text-sm text-slate-400 font-medium">Nenhuma informação disponível de momento.</p>
          </div>
        )}

      </div>
    </section>
  );
};