"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, Search, Smartphone } from "lucide-react";
import { useSession } from "next-auth/react";
import { AppComingSoonModal } from "@/components/AppComingSoonModal";

type LoadingButton = "assinar" | "area" | null;

export const Hero = () => {
  const [loadingButton, setLoadingButton] = useState<LoadingButton>(null);
  const [showAppComingSoon, setShowAppComingSoon] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const placeholders = [
    "Pesquisar comunidades tech...",
    "Pesquisar eventos de tecnologia...",
    "Pesquisar bolsas e oportunidades...",
    "Pesquisar dicas para devs...",
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const router = useRouter();

  const { data: session } = useSession();

  const isLoggedIn = !!session;


  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) =>
        prev === placeholders.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Debounced search suggestions
  useEffect(() => {
    if (!isLoggedIn) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    if (!search || search.trim().length === 0) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();
    setIsSearching(true);

    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(search)}`, { signal: controller.signal });
        if (res.status === 401) {
          setSuggestions([]);
          setIsSearching(false);
          return;
        }
        const data = await res.json();
        setSuggestions(data.suggestions || []);
      } catch (err) {
        if ((err as any)?.name !== 'AbortError') {
          setSuggestions([]);
        }
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [search, isLoggedIn]);

  const handleClick = (button: LoadingButton) => {
    setLoadingButton(button);

    if (button === "assinar") {
      router.push("/?auth=register");
      setLoadingButton(null);
      return;
    }

    if (button === "area") {
      setTimeout(() => {
        router.push("/sobre-nos");
        setLoadingButton(null);
      }, 900);
    }
  };

  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col min-h-[75vh] md:min-h-[70vh] pt-28 sm:pt-32 md:pt-16 pb-12 md:pb-16 justify-center ">
      <div className="max-w-5xl mx-auto text-center">
        {/* TITULO */}
        <h1 className="text-3xl font-thin sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl leading-[1.1] mb-5 sm:mb-6 md:mb-8 lg:mb-10 tracking-tight text-gray-50 uppercase mt-12 ">
          Ecossistema de conteúdo, impulsionado por tecnologia
        </h1>

        {/* INPUT PESQUISA */}
        <div className="w-full max-w-3xl mx-auto mb-8">
          <div className="relative group">
            {/* glow */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-600 opacity-40 blur"/>

            <div
              className="relative flex items-center rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl overflow-hidden ">
              <div className="pl-5">
                <Search size={20} className="text-violet-300"/>
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value) }
                placeholder={ placeholders[placeholderIndex] }
                className="w-full bg-transparent px-4 py-4 sm:py-5 text-sm sm:text-base lg:text-lg text-white placeholder:text-gray-400 outline-none "
                aria-autocomplete="list"
              />

              <button className="mr-2 border-l border-gray-50 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white transition-all hover:text-violet-600 active:scale-95 "
                onClick={async () => {
                  if (!isLoggedIn) {
                    router.push("/?auth=login");
                    return;
                  }
                }} > Pesquisar </button>
            </div>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <p className="text-[12px] text-gray-300 mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-relaxed max-w-3xl mx-auto">
          Somos um hub de conteúdo tecnológico lusófono
          definitivo para a sua carreira. Encontre Comunidades, 
          Roadmaps, dicas e suporte.
        </p>

        {/* BOTÕES */}
        <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          <div className="flex flex-row justify-center gap-2 md:gap-3 lg:gap-4 items-center w-full sm:w-auto ">
            {/* BOTÃO PRINCIPAL */}
            {isLoggedIn ? (
              <button
                type="button"
                onClick={() =>
                  setShowAppComingSoon(true)
                }
                className="
                  group relative
                  inline-flex items-center justify-center
                  px-3 sm:px-8 lg:px-10
                  py-3 sm:py-5
                  rounded-2xl
                  border-2 border-violet-700
                  bg-gradient-to-br
                  from-neutral-950/80
                  via-neutral-900/90
                  to-black/90
                  text-white
                  font-bold
                  text-[11px] sm:text-base lg:text-lg
                  shadow-xl
                  transition-all duration-300 ease-out
                  hover:shadow-violet-600/40
                  hover:shadow-xl
                  hover:border-violet-600/70
                  active:scale-95
                  overflow-hidden
                  flex-1 sm:flex-none
                "
              >
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-r
                    from-transparent
                    via-violet-400/30
                    to-transparent
                    -translate-x-full
                    group-hover:translate-x-full
                    transition-transform
                    duration-1000
                    ease-out
                  "
                />

                <div
                  className="
                    absolute inset-0 rounded-2xl
                    bg-gradient-to-r
                    from-violet-600/10
                    via-violet-400/20
                    to-violet-600/10
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-500
                  "
                />

                <span
                  className="
                    relative z-10
                    flex items-center
                    gap-1.5 sm:gap-2
                    whitespace-nowrap
                  "
                >
                  <Smartphone size={16} />

                  <span className="hidden sm:inline">
                    Baixar o aplicativo
                  </span>

                  <span className="sm:hidden">
                    Baixar o Aplicativo
                  </span>
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  handleClick("assinar")
                }
                disabled={loadingButton !== null}
                className="
                  group relative
                  inline-flex items-center justify-center
                  px-3 sm:px-10 lg:px-12
                  py-3 sm:py-5
                  rounded-lg
                  border-2 border-violet-500/50
                  bg-gradient-to-br
                  from-violet-900/80
                  via-indigo-950/90
                  to-black/90
                  text-white
                  font-bold
                  text-[11px] sm:text-lg lg:text-xl
                  shadow-xl
                  transition-all duration-300 ease-out
                  hover:shadow-violet-500/40
                  hover:shadow-xl
                  hover:border-violet-400/70
                  active:scale-95
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                  w-1/2 sm:w-auto
                  overflow-hidden
                "
              >
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-r
                    from-transparent
                    via-violet-400/30
                    to-transparent
                    -translate-x-full
                    group-hover:translate-x-full
                    transition-transform
                    duration-1000
                    ease-out
                  "
                />

                <div
                  className="
                    absolute inset-0 rounded-2xl
                    bg-gradient-to-r
                    from-violet-500/10
                    via-violet-400/20
                    to-violet-500/10
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-500
                  "
                />

                <span
                  className="
                    relative z-10
                    flex items-center
                    gap-1 sm:gap-2
                    whitespace-nowrap
                  "
                >
                  {loadingButton === "assinar" ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />

                      <span className="hidden sm:inline">
                        Carregando...
                      </span>

                      <span className="sm:hidden">
                        Aguarde...
                      </span>
                    </>
                  ) : (
                    "Inscrever-se no portal"
                  )}
                </span>
              </button>
            )}

            {/* SOBRE NÓS */}
            <button
              type="button"
              onClick={() => handleClick("area")}
              disabled={loadingButton !== null}
              className="
                group relative
                inline-flex h-12
                items-center justify-center
                overflow-hidden
                rounded-md
                border-2 border-violet-200
                bg-transparent
                px-10
                font-bold
                text-white
                transition-all duration-100
                [box-shadow:5px_5px_rgb(124,58,237)]
                hover:translate-x-[3px]
                hover:translate-y-[3px]
                hover:[box-shadow:0px_0px_rgb(124,58,237)]
                active:scale-95
                disabled:opacity-70
                disabled:cursor-not-allowed
                w-1/2 sm:w-auto
                whitespace-nowrap
              "
            >
              {loadingButton === "area" ? (
                <span className="inline-flex items-center gap-1 sm:gap-2">
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />

                  <span className="hidden sm:inline">
                    Processando...
                  </span>

                  <span className="sm:hidden">
                    Aguarde...
                  </span>
                </span>
              ) : (
                "Sobre Nós"
              )}
            </button>
          </div>

          {/* TEXTO INFERIOR */}
          <p
            className="
              hidden lg:block
              text-[10px]
              text-gray-100
              font-medium
              max-w-3xl
              mt-1
              mx-auto
              text-center
            "
          >
            Não perca tempo! Junte-se a nós e esteja
            com profissionais de tecnologia que já
            estão a transformar suas carreiras com
            nossos recursos exclusivos. Este site não
            possui parceria oficial com os eventos,
            cursos, comunidades, projectos, bolsas e
            entidades aqui divulgadas. Fornecemos
            informações sobre o sector tecnologia e
            muito mais na lusofonia. Para qualquer
            esclarecimento, entre em contacto
            connosco.
          </p>
        </div>
      </div>

      <AppComingSoonModal open={showAppComingSoon} onClose={() => setShowAppComingSoon(false)} />
    </section>
  );
};

export default Hero;