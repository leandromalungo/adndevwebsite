"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Share2,
  Building2,
  MapPin,
  Calendar,
  Layers,
  ArrowLeft,
  Check,
  Globe,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Facebook,
  X,
} from "lucide-react";
import {
  type StartupDetailResponse,
  getCountryByCode,
} from "@/lib/startup-types";
import { StartupComments } from "@/components/startups/StartupComments";
import { StartupCard } from "@/components/startups/StartupCard";

interface StartupDetailClientProps {
  initialData: StartupDetailResponse;
  isLoggedIn: boolean;
  currentUser?: any;
}

export function StartupDetailClient({
  initialData,
  isLoggedIn,
  currentUser,
}: StartupDetailClientProps) {
  const [data, setData] = useState<StartupDetailResponse>(initialData);
  const [isFollowing, setIsFollowing] = useState<boolean>(initialData.isFollowing);
  const [followersCount, setFollowersCount] = useState<number>(
    initialData.startup.followers_count || 0
  );
  const [isSubmittingFollow, setIsSubmittingFollow] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  const startup = data.startup;
  const country = getCountryByCode(startup.country_code);

  const handleFollowToggle = async () => {
    if (!isLoggedIn) {
      setAuthModalOpen(true);
      return;
    }

    if (isSubmittingFollow) return;

    const previousState = isFollowing;
    const previousCount = followersCount;
    setIsFollowing(!previousState);
    setFollowersCount(previousState ? Math.max(0, previousCount - 1) : previousCount + 1);
    setIsSubmittingFollow(true);

    try {
      const res = await fetch(`/api/startups/${startup.id}/follow`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Erro");
      const resData = await res.json();
      setIsFollowing(resData.isFollowing);
      setFollowersCount(resData.followersCount);
    } catch {
      setIsFollowing(previousState);
      setFollowersCount(previousCount);
    } finally {
      setIsSubmittingFollow(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="w-full pb-16">
      {/* Barra de Navegação Superior de Retorno */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <Link
            href="/startups"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-violet-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Diretório de Startups</span>
          </Link>
        </div>
      </div>

      {/* Capa & Cabeçalho Principal da Startup */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200/90 pt-8 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                {startup.logo_url ? (
                  <img
                    src={startup.logo_url}
                    alt={startup.name}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <Building2 className="h-10 w-10 text-violet-700" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-sm" aria-hidden="true">
                    {country.flag}
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    {country.name}
                  </span>
                  <span aria-hidden="true" className="text-gray-300">
                    ·
                  </span>
                  <span className="text-xs font-bold text-violet-700">
                    {startup.sector?.name || "Tecnologia"}
                  </span>
                  <span aria-hidden="true" className="text-gray-300">
                    ·
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    Estágio: {startup.stage}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {startup.name}
                </h1>

                <p className="mt-2 text-sm sm:text-base text-gray-700 font-medium max-w-2xl leading-relaxed">
                  {startup.tagline}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>Fundada em {startup.founded_year}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5 text-gray-400" />
                    <span className="tabular-nums font-mono">{followersCount} seguidores</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="tabular-nums font-mono">{startup.views_count} visualizações</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações Primárias (Estilo Product Hunt: Visitar Site, Seguir, Partilhar) */}
            <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-center">
              {startup.website_url && (
                <a
                  href={startup.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-violet-700 hover:bg-violet-800 transition shadow-xs cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visitar Site Oficial</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              )}

              <button
                type="button"
                onClick={handleFollowToggle}
                disabled={isSubmittingFollow}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                  isFollowing
                    ? "bg-violet-50 text-violet-800 border-violet-200"
                    : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {isFollowing ? (
                  <BookmarkCheck className="w-4 h-4 text-violet-700" />
                ) : (
                  <Bookmark className="w-4 h-4 text-gray-500" />
                )}
                <span>{isFollowing ? "A seguir" : "Seguir Startup"}</span>
                <span className="font-mono tabular-nums text-xs opacity-75">
                  ({followersCount})
                </span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition cursor-pointer"
                title="Partilhar link da startup"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copiado</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-gray-500" />
                    <span>Partilhar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal (2 Colunas: Descrição + Fundadores/Links à Direita) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da Esquerda (2/3): Descrição detalhada + Discussão da Comunidade */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sobre a Startup */}
            <section className="rounded-xl border border-gray-200/90 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">
                Sobre a {startup.name}
              </h2>
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>{startup.description}</p>
              </div>

              {/* Redes Sociais */}
              {startup.social_links && (
                <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-gray-500">Conectar:</span>
                  {startup.social_links.linkedin && (
                    <a
                      href={startup.social_links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:text-violet-700 hover:bg-violet-50 transition"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {startup.social_links.twitter && (
                    <a
                      href={startup.social_links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:text-violet-700 hover:bg-violet-50 transition"
                      aria-label="Twitter / X"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {startup.social_links.instagram && (
                    <a
                      href={startup.social_links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:text-violet-700 hover:bg-violet-50 transition"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {startup.social_links.facebook && (
                    <a
                      href={startup.social_links.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:text-violet-700 hover:bg-violet-50 transition"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {startup.social_links.github && (
                    <a
                      href={startup.social_links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:text-violet-700 hover:bg-violet-50 transition"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </section>

            {/* Discussão & Comentários Estilo Product Hunt */}
            <StartupComments
              startupId={startup.id}
              initialComments={data.comments}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onRequireAuth={() => setAuthModalOpen(true)}
            />
          </div>

          {/* Coluna da Direita (1/3): Fundadores & Informações do Ecossistema */}
          <div className="space-y-6">
            {/* Fundadores */}
            <div className="rounded-xl border border-gray-200/90 bg-white p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-100 pb-3 mb-4">
                Fundadores & Liderança
              </h3>

              {startup.founders && startup.founders.length > 0 ? (
                <div className="space-y-3.5">
                  {startup.founders.map((founder, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 font-bold text-xs text-violet-800">
                        {founder.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-gray-900 truncate">
                          {founder.name}
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">
                          {founder.role}
                        </p>
                      </div>
                      {founder.linkedin && (
                        <a
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-violet-700 transition"
                          aria-label={`LinkedIn de ${founder.name}`}
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">
                  Fundadores não listados publicamente.
                </p>
              )}
            </div>

            {/* Ficha Resumida */}
            <div className="rounded-xl border border-gray-200/90 bg-white p-6 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-100 pb-3 mb-2">
                Ficha Técnica
              </h3>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">País</span>
                <span className="font-semibold text-gray-800">
                  {country.flag} {country.name}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Setor</span>
                <span className="font-semibold text-gray-800">
                  {startup.sector?.name || "Tecnologia"}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Estágio</span>
                <span className="font-semibold text-gray-800">{startup.stage}</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Ano de Fundação</span>
                <span className="font-semibold text-gray-800 tabular-nums">
                  {startup.founded_year}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Comunidade</span>
                <span className="font-semibold text-gray-800 tabular-nums">
                  {followersCount} seguidores
                </span>
              </div>
            </div>

            {/* Startups Relacionadas */}
            {data.relatedStartups && data.relatedStartups.length > 0 && (
              <div className="rounded-xl border border-gray-200/90 bg-white p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-100 pb-3 mb-4">
                  Outras Startups Relacionadas
                </h3>

                <div className="space-y-3">
                  {data.relatedStartups.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/startups/${rel.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                    >
                      <div className="h-9 w-9 shrink-0 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                        {rel.logo_url ? (
                          <img
                            src={rel.logo_url}
                            alt={rel.name}
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <Building2 className="h-4 w-4 text-violet-700" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-900 truncate">
                            {rel.name}
                          </span>
                          <span className="text-xs">
                            {getCountryByCode(rel.country_code).flag}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 truncate">
                          {rel.tagline}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Autenticação */}
      {authModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          onClick={() => setAuthModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-700">
                Acesso Requerido
              </span>
              <button
                type="button"
                onClick={() => setAuthModalOpen(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-700 mb-3">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Inicie sessão para interagir
              </h3>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed max-w-xs mx-auto">
                Para seguir {startup.name}, receber novidades em primeira mão e conversar com
                os fundadores, inicie sessão na plataforma.
              </p>
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <Link
                href="/?auth=login"
                className="w-full text-center py-2.5 px-4 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs transition shadow-xs"
              >
                Iniciar Sessão
              </Link>
              <button
                type="button"
                onClick={() => setAuthModalOpen(false)}
                className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"
              >
                Continuar a navegar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
