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
  { id: "todos", label: "Ver Todas" },
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
    <div className="w-full space-y-3">
      {/* Indicador de Pesquisa Ativa do Header */}
      {searchQuery && (
        <div className="flex items-center justify-between bg-violet-50/80 border border-violet-200/80 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-gray-700">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-gray-500 shrink-0">Pesquisa:</span>
            <span className="font-semibold text-violet-900 truncate">&ldquo;{searchQuery}&rdquo;</span>
          </div>
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="text-violet-700 hover:text-violet-900 font-medium hover:underline text-xs shrink-0 ml-2"
          >
            Limpar busca
          </button>
        </div>
      )}

      {/* 2. Categorias e filtros avançados */}
      <div className="flex items-center gap-1.5">
        <details className="group relative hidden shrink-0 md:block">
          <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-gray-700 shadow-sm transition-colors hover:border-violet-300 hover:bg-violet-50/50 [&::-webkit-details-marker]:hidden">
            <SlidersHorizontal className="h-3.5 w-3.5 text-violet-700" />
            Filtros
            <ChevronDown className="h-3.5 w-3.5 text-gray-400 transition-transform group-open:rotate-180" />
          </summary>
          <div className="absolute left-0 top-full z-30 mt-2 grid w-64 gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
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

        <div
          className="flex min-w-0 flex-1 flex-nowrap items-center gap-1"
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
                onClick={() => onCategoryChange(cat.id)}
                className={`min-w-0 flex-1 overflow-hidden whitespace-nowrap px-1.5 py-1.5 rounded-full text-[9px] lg:text-[10px] font-semibold transition-all border ${
                  isSelected
                    ? "bg-violet-700 text-white border-violet-700 shadow-sm"
                    : "bg-white text-gray-700 border-gray-200 hover:border-violet-300 hover:bg-violet-50/50"
                }`}
              >
                <span className="block truncate">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Barra Secundária de Filtros Avançados */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-gray-100">
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
