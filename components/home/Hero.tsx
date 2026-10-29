"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Loader2, Smartphone } from "lucide-react";
import { useSession } from "next-auth/react";
import { AppComingSoonModal } from "@/components/AppComingSoonModal";

type LoadingButton = "assinar" | null;

export const Hero = () => {
  const [loadingButton, setLoadingButton] = useState<LoadingButton>(null);
  const [showAppComingSoon, setShowAppComingSoon] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const handleClick = (button: LoadingButton) => {
    setLoadingButton(button);

    if (button === "assinar") {
      router.push("/?auth=register");
      setLoadingButton(null);
      return;
    }
  };

  return (
    <section className="relative isolate overflow-hidden min-h-screen w-full bg-[#06070a]">
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.22),_transparent_48%),linear-gradient(135deg,_rgba(10,10,10,0.98),_rgba(17,24,39,0.96))]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-20">
       
        <div className="grid w-full items-center gap-5 lg:grid-cols-[1fr_0.9fr] lg:gap-8">
          <div className="order-2 max-w-xl text-left lg:order-1">
            <span className="inline-flex items-center rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200 backdrop-blur sm:text-sm">
              Novo hub de oportunidades tech
            </span>

            <h1 className="mt-4 text-3xl font-semibold uppercase leading-tight tracking-tight text-white sm:mt-5 sm:text-4xl lg:text-5xl">
              Ecossistema de conteúdo, impulsionado por tecnologia
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-300 sm:mt-5 sm:text-base lg:text-lg">
              Somos um hub de conteúdo tecnológico lusófono pensado para acelerar a sua carreira.
              Encontre comunidades, roadmaps, bolsas e eventos em um só lugar.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => setShowAppComingSoon(true)}
                  className="group inline-flex items-center justify-center rounded-lg border border-violet-400/40 bg-gradient-to-br from-violet-900/70 via-indigo-950/80 to-black/90 px-5 py-3 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:border-violet-300/70 hover:shadow-violet-500/20 active:scale-95"
                >
                  <Smartphone size={18} className="mr-2" />
                  Baixar o aplicativo
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleClick("assinar")}
                  disabled={loadingButton !== null}
                  className="inline-flex items-center justify-center rounded-lg border border-violet-500/40 bg-gradient-to-br from-violet-700/80 via-indigo-800/90 to-black/90 px-5 py-3 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:border-violet-400/70 hover:shadow-violet-500/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadingButton === "assinar" ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Aguarde...
                    </>
                  ) : (
                    "Inscrever-se no portal"
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={() => router.push("/events")}
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white/20"
              >
                Explorar eventos
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs text-gray-400 sm:text-sm">
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">Comunidades ativas</span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">Roadmaps claros</span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">Oportunidades reais</span>
            </div>
          </div>

          <div className="hidden lg:block order-1 relative lg:order-2">
            <div className="absolute inset-0 rounded-[2rem] bg-violet-500/20 blur-3xl" />
            <div className="relative overflow-hidden">
              <img
                src="/heroimg.png"
                alt="Pessoa em ambiente de tecnologia e networking"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="rounded-lg border border-white/10 bg-white/10 p-3 backdrop-blur-md sm:p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-200 sm:text-sm">
                    Conteúdo em destaque
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white sm:text-base">
                    Acompanhe eventos, bolsas e trilhas de aprendizado em um só lugar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppComingSoonModal open={showAppComingSoon} onClose={() => setShowAppComingSoon(false)} />
    </section>
  );
};

export default Hero;