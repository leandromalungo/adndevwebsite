"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  fallbackHref?: string;
  label?: string;
  className?: string;
}

export function BackButton({
  fallbackHref = "/",
  label = "Voltar à lista",
  className = "",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // router.back() preserva nativamente a posição de rolagem e os parâmetros de filtro da página anterior
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-700 shadow-xs transition-all hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 active:scale-95 cursor-pointer ${className}`}
      aria-label="Voltar para a lista de oportunidades preservando os filtros aplicados"
    >
      <ArrowLeft className="w-4 h-4 text-violet-700" />
      <span>{label}</span>
    </button>
  );
}
