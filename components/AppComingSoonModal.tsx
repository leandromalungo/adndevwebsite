"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type AppComingSoonModalProps = {
  open: boolean;
  onClose: () => void;
};

export function AppComingSoonModal({ open, onClose }: AppComingSoonModalProps) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    setPortalElement(el);

    return () => {
      if (document.body.contains(el)) {
        document.body.removeChild(el);
      }
    };
  }, []);

  if (!open || !portalElement) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[calc(100vh-4rem)] overflow-hidden rounded border border-white/10 bg-zinc-950/95 p-8 shadow-2xl shadow-black/50">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6 flex flex-col gap-4 sm:gap-6">
          <span className="inline-flex px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-violet-300">
            Lançamento
          </span>
          <div>
            <h2 className="text-3xl font-thin text-white sm:text-4xl">
              App disponível em breve
            </h2>
            <p className="mt-3 max-w-xl text-gray-300 sm:text-lg">
              A aplicação estará disponível no dia <strong>20 de junho de 2026</strong>.
              Fique atento para baixar o app e aproveitar todas as novidades.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-500"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>,
    portalElement
  );
}
