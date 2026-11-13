"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import type {
  DiscoveryCategory,
  DiscoveryFormat,
  DiscoveryStatus,
  DiscoveryPrice,
} from "@/lib/discovery-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export const CATEGORIES: { id: DiscoveryCategory; label: string; icon: string }[] = [
  { id: "eventos", label: "Eventos & Meetups", icon: "/images/discovery-icons/eventos.png" },
  { id: "hackathons", label: "Hackathons & Desafios", icon: "/images/discovery-icons/hackathons.png" },
  { id: "bolsas", label: "Bolsas de Estudo", icon: "/images/discovery-icons/bolsas.png" },
  { id: "cursos", label: "Cursos Gratuitos", icon: "/images/discovery-icons/cursos.png" },
  { id: "comunidades", label: "Comunidades Tech", icon: "/images/discovery-icons/comunidades.png" },
  { id: "startups", label: "Startups & Apoio", icon: "/images/discovery-icons/startups.png" },
  { id: "mulheres_ti", label: "Mulheres na TI", icon: "/images/discovery-icons/mulheres_ti.png" },
  { id: "game_dev", label: "Game Development", icon: "/images/discovery-icons/game_dev.png" },
  { id: "intercambio", label: "Intercâmbio & Voluntariado", icon: "/images/discovery-icons/intercambio.png" },
];

export const COUNTRIES = [
  "Todos",
  "Angola",
  "Brasil",
  "Moçambique",
  "Portugal",
  "Cabo Verde",
  "Guiné-Bissau",
  "São Tomé e Príncipe",
  "Timor-Leste",
  "Internacional",
];

interface DiscoveryFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: DiscoveryCategory;
  onCategoryChange: (cat: DiscoveryCategory) => void;
  selectedCountry: string;
  onCountryChange: (c: string) => void;
  selectedFormat: DiscoveryFormat;
  onFormatChange: (f: DiscoveryFormat) => void;
  selectedStatus: DiscoveryStatus;
  onStatusChange: (s: DiscoveryStatus) => void;
  selectedPrice: DiscoveryPrice;
  onPriceChange: (p: DiscoveryPrice) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  totalResults: number;
}

export function DiscoveryFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCountry,
  onCountryChange,
  selectedFormat,
  onFormatChange,
  selectedStatus,
  onStatusChange,
  selectedPrice,
  onPriceChange,
  onClearFilters,
  hasActiveFilters,
  totalResults,
}: DiscoveryFiltersProps) {
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Contagem de filtros ativos para badge
  const activeFiltersCount = [
    selectedCategory !== "todos",
    selectedCountry !== "Todos",
    selectedFormat !== "todos",
    selectedStatus !== "todos",
    selectedPrice !== "todos",
    Boolean(searchQuery.trim()),
  ].filter(Boolean).length;

  // Verificação de capacidade de rolagem para habilitar/desabilitar setas
  const checkScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    // Checagem adicional após montagem e carregamento de fontes
    const timer = setTimeout(checkScroll, 200);

    return () => {
      clearTimeout(timer);
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Função de rolagem suave com botões < e >
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === "left" ? -240 : 240;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(checkScroll, 350);
  };

  return (
    <div className="w-full space-y-2.5">
      {/* Indicador de Pesquisa Ativa */}
      {searchQuery && (
        <div className="flex items-center justify-between bg-violet-50/80 border border-violet-200/80 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-gray-700">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-gray-500 shrink-0">Pesquisa:</span>
            <span className="font-semibold text-violet-900 truncate">&ldquo;{searchQuery}&rdquo;</span>
          </div>
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="text-violet-700 hover:text-violet-900 font-medium hover:underline text-xs shrink-0 ml-2 cursor-pointer"
          >
            Limpar busca
          </button>
        </div>
      )}

      {/* =========================================================================
          BARRA ÚNICA: Botão Filtro + Seta Esquerda (<) + Categorias (sem scrollbar) + Seta Direita (>)
          Tudo na mesma linha em telas pequenas e grandes, com nomes 100% visíveis
          ========================================================================= */}
      <div className="flex items-center gap-1.5 sm:gap-2 w-full">
        {/* 1. Botão de Filtro na mesma linha */}
        <div className="shrink-0">
          {/* Desktop: dropdown avançado */}
          <details className="group relative hidden md:block">
            <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 sm:py-2 text-xs font-semibold text-gray-700 shadow-2xs transition-colors hover:border-violet-300 hover:bg-violet-50/50 [&::-webkit-details-marker]:hidden">
              <SlidersHorizontal className="h-3.5 w-3.5 text-violet-700 shrink-0" />
              <span>Filtros</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-violet-700 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown className="h-3.5 w-3.5 text-gray-400 transition-transform group-open:rotate-180" />
            </summary>

            <div className="absolute left-0 top-full z-40 mt-2 grid w-64 gap-3 rounded border border-gray-200 bg-white p-4 shadow-xl">
              <label className="grid gap-1.5 text-xs font-medium text-gray-700">
                País
                <select
                  value={selectedCountry}
                  onChange={(e) => onCountryChange(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 focus:border-violet-600 focus:outline-none"
                  aria-label="Filtrar por país"
                >
                  <option value="Todos">Todos os Países</option>
                  {COUNTRIES.filter((c) => c !== "Todos").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-1.5 text-xs font-medium text-gray-700">
                Formato
                <select
                  value={selectedFormat}
                  onChange={(e) => onFormatChange(e.target.value as DiscoveryFormat)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 focus:border-violet-600 focus:outline-none"
                  aria-label="Filtrar por formato"
                >
                  <option value="todos">Qualquer Formato</option>
                  <option value="online">Online</option>
                  <option value="presencial">Presencial</option>
                  <option value="hibrido">Híbrido</option>
                </select>
              </label>

              <label className="grid gap-1.5 text-xs font-medium text-gray-700">
                Estado
                <select
                  value={selectedStatus}
                  onChange={(e) => onStatusChange(e.target.value as DiscoveryStatus)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 focus:border-violet-600 focus:outline-none"
                  aria-label="Filtrar por estado"
                >
                  <option value="todos">Todos os Estados</option>
                  <option value="ativos">Inscrições Abertas / Futuros</option>
                  <option value="encerrados">Encerrados / Passados</option>
                </select>
              </label>

              <label className="grid gap-1.5 text-xs font-medium text-gray-700">
                Valor
                <select
                  value={selectedPrice}
                  onChange={(e) => onPriceChange(e.target.value as DiscoveryPrice)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 focus:border-violet-600 focus:outline-none"
                  aria-label="Filtrar por gratuitidade"
                >
                  <option value="todos">Qualquer Valor</option>
                  <option value="gratis">Gratuito</option>
                  <option value="pago">Pago</option>
                </select>
              </label>
            </div>
          </details>

          {/* Mobile: abre modal completo de filtros */}
          <button
            type="button"
            onClick={() => setMobileModalOpen(true)}
            className="inline-flex md:hidden items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-2xs hover:bg-violet-50/50 hover:border-violet-300 transition-colors cursor-pointer"
            aria-label="Abrir filtros"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-violet-700 shrink-0" />
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-violet-700 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* 2. Botão de Avançar para a Esquerda (<) */}
        <button
          type="button"
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
          className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-300 shadow-2xs flex items-center justify-center shrink-0 transition-all cursor-pointer ${
            !canScrollLeft
              ? "opacity-35 cursor-not-allowed hover:bg-white hover:text-gray-700 hover:border-gray-200"
              : "active:scale-95"
          }`}
          aria-label="Rolar categorias para a esquerda"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* 3. Container de Categorias: scroll horizontal sem scrollbar visível e nomes 100% visíveis */}
        <div
          ref={scrollContainerRef}
          className="flex-1 min-w-0 overflow-x-auto scrollbar-none scroll-smooth flex items-center gap-1.5 sm:gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          role="tablist"
          aria-label="Categorias de oportunidades"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isSelected}
                aria-label={cat.label}
                title={cat.label}
                onClick={() => onCategoryChange(selectedCategory === cat.id ? "todos" : cat.id)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all border cursor-pointer select-none ${
                  isSelected
                    ? "bg-violet-700 text-white border-violet-700 shadow-xs"
                    : "bg-white text-gray-700 border-gray-200 hover:border-violet-300 hover:bg-violet-50/50"
                }`}
              >
                <Image
                  src={cat.icon}
                  alt=""
                  width={18}
                  height={18}
                  referrerPolicy="no-referrer"
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] object-contain shrink-0 rounded-xs"
                />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 4. Botão de Avançar para a Direita (>) */}
        <button
          type="button"
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
          className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-300 shadow-2xs flex items-center justify-center shrink-0 transition-all cursor-pointer ${
            !canScrollRight
              ? "opacity-35 cursor-not-allowed hover:bg-white hover:text-gray-700 hover:border-gray-200"
              : "active:scale-95"
          }`}
          aria-label="Rolar categorias para a direita"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Barra Secundária: Informações e Limpar Filtros */}
      <div className="flex items-center justify-between gap- text-xs text-gray-600">
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-violet-700 hover:text-violet-800 hover:underline transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Limpar filtros
          </button>
        ) : null}
      </div>

      {/* 4. Badges de Filtros Ativos (Removíveis individualmente) */}
      {hasActiveFilters ? (
        <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs">
          <span className="text-gray-500 font-medium text-[11px]">Filtros aplicados:</span>

          {searchQuery ? (
            <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-800 border border-violet-200 px-2.5 py-0.5 rounded-full font-medium text-[11px]">
              Busca: &ldquo;{searchQuery}&rdquo;
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="hover:text-violet-950 p-0.5 rounded-full cursor-pointer"
                aria-label="Remover busca"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : null}

          {selectedCategory !== "todos" ? (
            <span className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-800 border border-violet-200 px-2.5 py-0.5 rounded-full font-medium text-[11px]">
              {CATEGORIES.find((c) => c.id === selectedCategory)?.icon ? (
                <Image
                  src={CATEGORIES.find((c) => c.id === selectedCategory)!.icon}
                  alt=""
                  width={14}
                  height={14}
                  referrerPolicy="no-referrer"
                  className="w-3.5 h-3.5 object-contain shrink-0 rounded-xs"
                />
              ) : null}
              {CATEGORIES.find((c) => c.id === selectedCategory)?.label || selectedCategory}
              <button
                type="button"
                onClick={() => onCategoryChange("todos")}
                className="hover:text-violet-950 p-0.5 rounded-full cursor-pointer"
                aria-label="Remover filtro de categoria"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : null}

          {selectedCountry !== "Todos" ? (
            <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-800 border border-violet-200 px-2.5 py-0.5 rounded-full font-medium text-[11px]">
              País: {selectedCountry}
              <button
                type="button"
                onClick={() => onCountryChange("Todos")}
                className="hover:text-violet-950 p-0.5 rounded-full cursor-pointer"
                aria-label="Remover filtro de país"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : null}

          {selectedFormat !== "todos" ? (
            <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-800 border border-violet-200 px-2.5 py-0.5 rounded-full font-medium text-[11px]">
              Formato: {selectedFormat === "online" ? "Online" : selectedFormat === "presencial" ? "Presencial" : "Híbrido"}
              <button
                type="button"
                onClick={() => onFormatChange("todos")}
                className="hover:text-violet-950 p-0.5 rounded-full cursor-pointer"
                aria-label="Remover filtro de formato"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : null}

          {selectedStatus !== "todos" ? (
            <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-800 border border-violet-200 px-2.5 py-0.5 rounded-full font-medium text-[11px]">
              Estado: {selectedStatus === "ativos" ? "Abertos" : "Encerrados"}
              <button
                type="button"
                onClick={() => onStatusChange("todos")}
                className="hover:text-violet-950 p-0.5 rounded-full cursor-pointer"
                aria-label="Remover filtro de estado"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : null}

          {selectedPrice !== "todos" ? (
            <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-800 border border-violet-200 px-2.5 py-0.5 rounded-full font-medium text-[11px]">
              Custo: {selectedPrice === "gratis" ? "Gratuito" : "Pago"}
              <button
                type="button"
                onClick={() => onPriceChange("todos")}
                className="hover:text-violet-950 p-0.5 rounded-full cursor-pointer"
                aria-label="Remover filtro de custo"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : null}
        </div>
      ) : null}

      {/* Modal / Dialog de Filtros para Mobile */}
      <Dialog open={mobileModalOpen} onOpenChange={setMobileModalOpen}>
        <DialogContent className="sm:max-w-md bg-white p-6 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900">
              Filtrar Oportunidades
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-3">
            {/* Assunto / Categoria */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Assunto
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => onCategoryChange(isSelected ? "todos" : cat.id)}
                      className={`inline-flex items-center gap-2 p-2 rounded-lg border text-xs font-semibold text-left cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-violet-700 text-white border-violet-700"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-violet-50/60"
                      }`}
                    >
                      <Image
                        src={cat.icon}
                        alt=""
                        width={18}
                        height={18}
                        referrerPolicy="no-referrer"
                        className="w-[18px] h-[18px] object-contain shrink-0 rounded-xs"
                      />
                      <span className="truncate">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* País */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                País ou Região
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => onCountryChange(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm text-gray-800 focus:border-violet-600 outline-none"
              >
                <option value="Todos">Todos os Países</option>
                {COUNTRIES.filter((c) => c !== "Todos").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Formato */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Formato
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "todos", label: "Qualquer" },
                  { id: "online", label: "Online" },
                  { id: "presencial", label: "Presencial" },
                  { id: "hibrido", label: "Híbrido" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => onFormatChange(f.id as DiscoveryFormat)}
                    className={`p-2 rounded-lg border text-xs font-semibold text-center cursor-pointer ${
                      selectedFormat === f.id
                        ? "bg-violet-700 text-white border-violet-700"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Estado */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Estado da Oportunidade
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "todos", label: "Todos" },
                  { id: "ativos", label: "Abertos / Ativos" },
                  { id: "encerrados", label: "Encerrados" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onStatusChange(s.id as DiscoveryStatus)}
                    className={`p-2 rounded-lg border text-xs font-semibold text-center cursor-pointer ${
                      selectedStatus === s.id
                        ? "bg-violet-700 text-white border-violet-700"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preço */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Custo
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "todos", label: "Todos" },
                  { id: "gratis", label: "Gratuito" },
                  { id: "pago", label: "Pago" },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onPriceChange(p.id as DiscoveryPrice)}
                    className={`p-2 rounded-lg border text-xs font-semibold text-center cursor-pointer ${
                      selectedPrice === p.id
                        ? "bg-violet-700 text-white border-violet-700"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 gap-3">
            <button
              type="button"
              onClick={onClearFilters}
              className="text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Limpar todos
            </button>
            <DialogClose asChild>
              <button
                type="button"
                className="bg-violet-700 hover:bg-violet-800 text-white text-xs font-bold px-5 py-2.5 rounded-lg cursor-pointer"
              >
                Ver {totalResults} resultados
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
