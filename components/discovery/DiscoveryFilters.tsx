"use client";

import React, { useState } from "react";
import {
  Search,
  X,
  SlidersHorizontal,
  ChevronDown,
  Globe,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Check,
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

export const CATEGORIES: { id: DiscoveryCategory; label: string; icon?: string }[] = [
  { id: "todos", label: "Todas as Oportunidades" },
  { id: "eventos", label: "Eventos & Meetups" },
  { id: "hackathons", label: "Hackathons & Desafios" },
  { id: "bolsas", label: "Bolsas de Estudo" },
  { id: "cursos", label: "Cursos Gratuitos" },
  { id: "comunidades", label: "Comunidades Tech" },
  { id: "startups", label: "Startups & Apoio" },
  { id: "mulheres_ti", label: "Mulheres na TI" },
  { id: "game_dev", label: "Game Development" },
  { id: "intercambio", label: "Intercâmbio & Voluntariado" },
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

  // Contagem de filtros ativos para badge móvel
  const activeFiltersCount = [
    selectedCategory !== "todos",
    selectedCountry !== "Todos",
    selectedFormat !== "todos",
    selectedStatus !== "todos",
    selectedPrice !== "todos",
    Boolean(searchQuery.trim()),
  ].filter(Boolean).length;

  return (
    <div className="w-full space-y-4">
      {/* 1. Barra de Busca Principal (Inspirada no Meetup Find) */}
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="relative flex items-center bg-white border border-gray-300 rounded-2xl shadow-sm focus-within:border-violet-600 focus-within:ring-2 focus-within:ring-violet-600/20 transition-all">
          <Search className="w-5 h-5 text-gray-400 ml-4 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Pesquisar por título, tecnologia (ex: React, Python), organização, tema..."
            className="w-full py-3.5 sm:py-4 pl-3 pr-10 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 bg-transparent outline-none rounded-2xl"
            aria-label="Pesquisar oportunidades"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="p-2 mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              aria-label="Limpar pesquisa"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>

      {/* 2. Categorias em Pílulas / Chips (Estilo Meetup Discover) */}
      <div className="relative w-full">
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth"
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
                onClick={() => onCategoryChange(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 border ${
                  isSelected
                    ? "bg-violet-700 text-white border-violet-700 shadow-sm"
                    : "bg-white text-gray-700 border-gray-200 hover:border-violet-300 hover:bg-violet-50/50"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Barra Secundária de Filtros Avançados */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-gray-100">
        {/* Filtros em Dropdown para Desktop */}
        <div className="hidden md:flex flex-wrap items-center gap-2.5">
          {/* País */}
          <div className="relative">
            <select
              value={selectedCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:border-violet-600 cursor-pointer shadow-sm"
              aria-label="Filtrar por país"
            >
              <option value="Todos">Todos os Países</option>
              {COUNTRIES.filter((c) => c !== "Todos").map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Formato */}
          <div className="relative">
            <select
              value={selectedFormat}
              onChange={(e) => onFormatChange(e.target.value as DiscoveryFormat)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:border-violet-600 cursor-pointer shadow-sm"
              aria-label="Filtrar por formato"
            >
              <option value="todos">Qualquer Formato</option>
              <option value="online">Online</option>
              <option value="presencial">Presencial</option>
              <option value="hibrido">Híbrido</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Estado / Prazo */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value as DiscoveryStatus)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:border-violet-600 cursor-pointer shadow-sm"
              aria-label="Filtrar por estado"
            >
              <option value="todos">Todos os Estados</option>
              <option value="ativos">Inscrições Abertas / Futuros</option>
              <option value="encerrados">Encerrados / Passados</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Custo */}
          <div className="relative">
            <select
              value={selectedPrice}
              onChange={(e) => onPriceChange(e.target.value as DiscoveryPrice)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:border-violet-600 cursor-pointer shadow-sm"
              aria-label="Filtrar por gratuitidade"
            >
              <option value="todos">Qualquer Valor</option>
              <option value="gratis">Gratuito</option>
              <option value="pago">Pago</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Botão de Filtros no Mobile */}
        <div className="flex md:hidden items-center gap-2 w-full justify-between">
          <button
            type="button"
            onClick={() => setMobileModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-800 shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-violet-700" />
            Filtros
            {activeFiltersCount > 0 ? (
              <span className="ml-1 w-4 h-4 rounded-full bg-violet-700 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            ) : null}
          </button>

          {hasActiveFilters ? (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-xs font-semibold text-violet-700 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Limpar
            </button>
          ) : null}
        </div>

        {/* Contador de Resultados & Limpar Filtros (Desktop) */}
        <div className="hidden md:flex items-center gap-3 text-xs text-gray-600">
          <span className="font-semibold text-gray-800">
            {totalResults} {totalResults === 1 ? "oportunidade" : "oportunidades"}
          </span>

          {hasActiveFilters ? (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-violet-700 hover:text-violet-800 hover:underline transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Limpar filtros
            </button>
          ) : null}
        </div>
      </div>

      {/* 4. Badges de Filtros Ativos (Removíveis individualmente) */}
      {hasActiveFilters ? (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-gray-500 font-medium">Filtros aplicados:</span>

          {searchQuery ? (
            <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-800 border border-violet-200 px-2.5 py-1 rounded-full font-medium">
              Busca: &ldquo;{searchQuery}&rdquo;
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="hover:text-violet-950 p-0.5 rounded-full"
                aria-label="Remover busca"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : null}

          {selectedCategory !== "todos" ? (
            <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-800 border border-violet-200 px-2.5 py-1 rounded-full font-medium">
              {CATEGORIES.find((c) => c.id === selectedCategory)?.label}
              <button
                type="button"
                onClick={() => onCategoryChange("todos")}
                className="hover:text-violet-950 p-0.5 rounded-full"
                aria-label="Remover filtro de categoria"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : null}

          {selectedCountry !== "Todos" ? (
            <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-800 border border-violet-200 px-2.5 py-1 rounded-full font-medium">
              País: {selectedCountry}
              <button
                type="button"
                onClick={() => onCountryChange("Todos")}
                className="hover:text-violet-950 p-0.5 rounded-full"
                aria-label="Remover filtro de país"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : null}

          {selectedFormat !== "todos" ? (
            <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-800 border border-violet-200 px-2.5 py-1 rounded-full font-medium">
              Formato: {selectedFormat === "online" ? "Online" : selectedFormat === "presencial" ? "Presencial" : "Híbrido"}
              <button
                type="button"
                onClick={() => onFormatChange("todos")}
                className="hover:text-violet-950 p-0.5 rounded-full"
                aria-label="Remover filtro de formato"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : null}

          {selectedStatus !== "todos" ? (
            <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-800 border border-violet-200 px-2.5 py-1 rounded-full font-medium">
              Estado: {selectedStatus === "ativos" ? "Abertos" : "Encerrados"}
              <button
                type="button"
                onClick={() => onStatusChange("todos")}
                className="hover:text-violet-950 p-0.5 rounded-full"
                aria-label="Remover filtro de estado"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : null}

          {selectedPrice !== "todos" ? (
            <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-800 border border-violet-200 px-2.5 py-1 rounded-full font-medium">
              Custo: {selectedPrice === "gratis" ? "Gratuito" : "Pago"}
              <button
                type="button"
                onClick={() => onPriceChange("todos")}
                className="hover:text-violet-950 p-0.5 rounded-full"
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
                    className={`p-2 rounded-lg border text-xs font-semibold text-center ${
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
                    className={`p-2 rounded-lg border text-xs font-semibold text-center ${
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
                    className={`p-2 rounded-lg border text-xs font-semibold text-center ${
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
              className="text-xs font-semibold text-gray-600 hover:text-gray-900"
            >
              Limpar todos
            </button>
            <DialogClose asChild>
              <button
                type="button"
                className="bg-violet-700 hover:bg-violet-800 text-white text-xs font-bold px-5 py-2.5 rounded-lg"
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
