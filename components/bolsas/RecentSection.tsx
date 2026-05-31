"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { bolsas } from "@/data/bolsas";
import { intercambio } from "@/data/intercambio";
import type { FilterTab } from "@/components/CountryFilter";
import type { NavCategory, ScholarshipItem } from "@/data/types";
import { CardGridSkeleton } from "@/components/cards/CardSkeleton";

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

  let targetDate: Date;
  const ymdMatch = deadline.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const dmyMatch = deadline.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);

  if (ymdMatch) {
    const [, year, month, day] = ymdMatch.map(Number);
    targetDate = new Date(year, month - 1, day);
  } else if (dmyMatch) {
    const [, day, month, year] = dmyMatch.map(Number);
    targetDate = new Date(year, month - 1, day);
  } else {
    targetDate = new Date(deadline);
  }

  if (Number.isNaN(targetDate.getTime())) {
    return { text: "Data inválida", isExpired: false };
  }

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
type TimeFilter = "todas" | "ativas" | "passadas";

interface RecentSectionProps {
  selectedCountry?: FilterTab;
  dynamicItems?: ScholarshipItem[];
  isLoading?: boolean;
}

// ==========================================
// COMPONENTE PRINCIPAL: RECENT SECTION
// ==========================================
export const RecentSection: React.FC<RecentSectionProps> = ({
  dynamicItems = [],
  isLoading = false,
}) => {
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
  const categories = [...bolsas, ...intercambio];

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
            aria-label="Categorias">
              
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
        {isLoading ? (
          <CardGridSkeleton count={8} />
        ) : filteredItems.length > 0 ? (
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