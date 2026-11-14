import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { BackButton } from "@/components/discovery/BackButton";
import { OpportunityMap } from "@/components/discovery/OpportunityMap";
import { ShareButton } from "@/components/discovery/ShareButton";
import { FavoriteButton } from "@/components/discovery/FavoriteButton";
import { fetchOpportunity, getAllOpportunityIds } from "@/lib/opportunity-detail";
import {
  Calendar,
  Clock,
  MapPin,
  Globe,
  Tag,
  CheckCircle2,
  Building2,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Users,
  ShieldCheck,
  AlertCircle,
  Award,
  Layers,
  Mail,
  DollarSign,
  Lock,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = await fetchOpportunity(id);

  if (!item) {
    return {
      title: "Oportunidade não encontrada | ADN Developer",
      description: "A oportunidade solicitada não foi encontrada no centro de descoberta.",
    };
  }

  const cleanDescription = (item.fullDescription || item.description).slice(0, 160);

  return {
    title: `${item.title} | ADN Developer`,
    description: cleanDescription,
    openGraph: {
      title: `${item.title} | ADN Developer`,
      description: cleanDescription,
      images: item.imageUrl ? [{ url: item.imageUrl }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | ADN Developer`,
      description: cleanDescription,
    },
  };
}

export default async function OpportunityDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fafbfc]">
        <Navbar />
        <main className="flex-1 max-w-2xl mx-auto px-4 py-24 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 border border-amber-200 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-3">
            Conteúdo Restrito a Membros
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Inicie sessão para aceder a esta oportunidade
          </h1>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
            As informações completas, requisitos, formulários de inscrição e contactos estão disponíveis exclusivamente para utilizadores com conta na comunidade.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <Link
              href="/?auth=login"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm shadow-sm transition active:scale-95 text-center"
            >
              Iniciar Sessão / Criar Conta
            </Link>
            <BackButton fallbackHref="/" label="Voltar à lista" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { id } = await params;
  const item = await fetchOpportunity(id);

  if (!item) {
    notFound();
  }

  const isOnline = item.format === "online";
  const isHybrid = item.format === "hibrido";

  // Rótulo dinâmico para o botão de ação principal
  const getActionLabel = () => {
    switch (item.category) {
      case "bolsas":
        return "Candidatar-se à Bolsa";
      case "hackathons":
        return "Inscrever no Hackathon";
      case "cursos":
        return "Aceder ao Curso";
      case "comunidades":
        return "Entrar na Comunidade";
      case "startups":
        return "Conhecer Startup / Programa";
      default:
        return "Inscrever-se no Evento";
    }
  };

  const actionLabel = getActionLabel();

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc] selection:bg-violet-200">
      <Navbar />

      <main className="flex-1 w-full pt-20 sm:pt-24 pb-24 md:pb-16">
        {/* Barra Superior de Navegação e Metadados */}
        <div className="bg-white border-b border-gray-200/80 sticky top-[65px] z-30 shadow-2xs backdrop-blur-md bg-white/95">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <BackButton fallbackHref="/" label="Voltar à lista" />

              <span className="hidden sm:inline-block h-4 w-px bg-gray-200" />

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200">
                <Tag className="w-3 h-3" />
                {item.categoryLabel}
              </span>

              {item.isFree ? (
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  Gratuito
                </span>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <FavoriteButton itemId={item.id} variant="detail" />
              <ShareButton title={item.title} />

              {/* Botão de ação desktop compacto no cabeçalho */}
              {item.link ? (
                <a
                  href={item.link}
                  target={item.isExternalLink ? "_blank" : undefined}
                  rel={item.isExternalLink ? "noopener noreferrer" : undefined}
                  className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-violet-700 hover:bg-violet-800 text-white shadow-xs transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                >
                  <span>{actionLabel}</span>
                  {item.isExternalLink ? <ExternalLink className="w-3.5 h-3.5" /> : null}
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          {/* Header da Oportunidade */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-violet-700 bg-violet-100/70 px-2.5 py-0.5 rounded-md">
                {item.country}
              </span>

              {isOnline ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  <Globe className="w-3 h-3" />
                  Online
                </span>
              ) : isHybrid ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-md border border-cyan-200">
                  <Sparkles className="w-3 h-3" />
                  Híbrido
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-md border border-gray-200">
                  <MapPin className="w-3 h-3" />
                  Presencial
                </span>
              )}

              {item.isExpired ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-md border border-red-200">
                  <Clock className="w-3 h-3" />
                  Inscrições Encerradas
                </span>
              ) : null}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {item.title}
            </h1>

            {/* Organizador / Entidade ofertante */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2.5">
                {item.organizerLogo ? (
                  <img
                    src={item.organizerLogo}
                    alt={item.organizer || "Organizador"}
                    className="w-7 h-7 rounded-full object-cover border border-gray-200 shadow-2xs"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xs shadow-2xs">
                    {item.organizer?.charAt(0) || "A"}
                  </div>
                )}
                <div>
                  <span className="text-gray-400">Oferecido por </span>
                  <span className="font-bold text-gray-900">
                    {item.organizer || item.institution || "ADN Developer & Parceiros"}
                  </span>
                </div>
              </div>

              {item.dateOrDeadline ? (
                <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                  <Calendar className="w-4 h-4 text-violet-600" />
                  <span>{item.dateOrDeadline}</span>
                  {item.timeRange ? <span className="text-gray-400">({item.timeRange})</span> : null}
                </div>
              ) : null}

              {item.location ? (
                <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                  <MapPin className="w-4 h-4 text-violet-600" />
                  <span>{[item.location, item.country].filter(Boolean).join(", ")}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Grid Principal: Esquerda Conteúdo Detalhado, Direita Card Fixo de Ação */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
            {/* Coluna Esquerda: Capa, Descrição, Requisitos, Benefícios */}
            <div className="space-y-8 min-w-0">
              {/* Imagem de Capa em Alta Resolução */}
              <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/80 shadow-xs">
                <Image
                  src={item.imageUrl || "/images-events.webp"}
                  alt={item.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {item.dateBadge ? (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs rounded-xl shadow-md p-2.5 text-center min-w-[56px] border border-gray-100">
                    <span className="block text-lg font-black text-violet-700 leading-none">
                      {item.dateBadge.day}
                    </span>
                    <span className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mt-0.5">
                      {item.dateBadge.month}
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Destaques Rápidos em Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl border border-gray-200 bg-white shadow-2xs">
                  <div className="text-gray-400 mb-1 flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider">
                    <DollarSign className="w-3.5 h-3.5 text-violet-600" />
                    Investimento
                  </div>
                  <div className="font-bold text-sm text-gray-900 truncate">
                    {item.funding || (item.isFree ? "Gratuito" : "Consultar")}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200 bg-white shadow-2xs">
                  <div className="text-gray-400 mb-1 flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider">
                    <Globe className="w-3.5 h-3.5 text-violet-600" />
                    Formato
                  </div>
                  <div className="font-bold text-sm text-gray-900 capitalize truncate">
                    {item.format}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200 bg-white shadow-2xs">
                  <div className="text-gray-400 mb-1 flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-violet-600" />
                    Prazo / Data
                  </div>
                  <div className="font-bold text-sm text-gray-900 truncate">
                    {item.deadline || item.dateOrDeadline || "Disponível"}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200 bg-white shadow-2xs">
                  <div className="text-gray-400 mb-1 flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-violet-600" />
                    País
                  </div>
                  <div className="font-bold text-sm text-gray-900 truncate">
                    {item.country}
                  </div>
                </div>
              </div>

              {/* Seção Sobre / Descrição Completa */}
              <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                  Sobre esta oportunidade
                </h2>

                <div className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
                  {item.fullDescription || item.description}
                </div>

                {item.degreeLevels ? (
                  <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Graus Académicos / Níveis Elegíveis
                      </div>
                      <div className="text-sm font-bold text-gray-900 mt-0.5">
                        {item.degreeLevels}
                      </div>
                    </div>
                  </div>
                ) : null}
              </section>

              {/* Requisitos (se existirem na estrutura de dados) */}
              {item.requirements && item.requirements.length > 0 ? (
                <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    Requisitos e Critérios de Participação
                  </h2>

                  <ul className="space-y-3">
                    {item.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{req}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {/* Benefícios e Apoios (se existirem na estrutura de dados) */}
              {item.benefits && item.benefits.length > 0 ? (
                <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    Benefícios e Oportunidades Incluídas
                  </h2>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/50 border border-amber-100 text-xs sm:text-sm text-amber-950 font-medium"
                      >
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {/* Tags e Palavras-chave */}
              {item.tags && item.tags.length > 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Tópicos e Tags Relacionadas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Informações da Entidade Ofertante */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-black text-base shrink-0 shadow-xs">
                    {item.organizerLogo ? (
                      <img
                        src={item.organizerLogo}
                        alt={item.organizer || "Organização"}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                    ) : (
                      <Building2 className="w-6 h-6" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-gray-900 truncate">
                      {item.organizer || item.institution || "ADN Developer"}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                      Entidade promotora ativa no ecossistema lusófono.
                    </p>

                    {item.contactEmail ? (
                      <div className="mt-3 flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <Mail className="w-3.5 h-3.5 text-violet-600" />
                        <a
                          href={`mailto:${item.contactEmail}`}
                          className="hover:text-violet-700 underline underline-offset-2"
                        >
                          {item.contactEmail}
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna Direita (Sidebar Desktop com Ação e Mapa) */}
            <aside className="space-y-6 lg:sticky lg:top-32">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                {/* Preço e Situação */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Custo de Inscrição
                    </span>
                    <span className="text-2xl font-black text-gray-900 mt-0.5 block">
                      {item.funding || (item.isFree ? "Gratuito" : "Consulte valores")}
                    </span>
                  </div>

                  {item.isExpired ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                      Encerrado
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                      Inscrições Abertas
                    </span>
                  )}
                </div>

                {/* Resumo de Data e Local */}
                <div className="py-4 space-y-3.5 border-b border-gray-100 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-semibold text-gray-900">
                        {item.dateOrDeadline || "Data a confirmar"}
                      </span>
                      {item.timeRange ? (
                        <span className="block text-gray-500 text-xs mt-0.5">
                          {item.timeRange}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-semibold text-gray-900">
                        {item.location || (isOnline ? "Ambiente Virtual" : item.country)}
                      </span>
                      <span className="block text-gray-500 text-xs mt-0.5">
                        {item.country} • Formato {item.format}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botão de Ação Principal Desktop */}
                <div className="pt-5 space-y-3">
                  {item.link ? (
                    <a
                      href={item.link}
                      target={item.isExternalLink ? "_blank" : undefined}
                      rel={item.isExternalLink ? "noopener noreferrer" : undefined}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-violet-700 hover:bg-violet-800 text-white shadow-md shadow-violet-700/20 transition-all duration-150 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                    >
                      <span>{actionLabel}</span>
                      {item.isExternalLink ? <ExternalLink className="w-4 h-4" /> : null}
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm bg-gray-100 text-gray-400 cursor-not-allowed text-center"
                    >
                      Link indisponível no momento
                    </button>
                  )}

                  <ShareButton title={item.title} className="w-full" />

                  <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1 mt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                    <span>Redirecionamento para a página oficial do promotor</span>
                  </p>
                </div>
              </div>

              {/* Mapa do Local ou Cartão Informativo de Evento Online */}
              <OpportunityMap
                country={item.country}
                location={item.address || item.location}
                format={item.format}
                venueName={item.location}
              />
            </aside>
          </div>
        </div>

        {/* Barra Fixa Inferior no Mobile (estilo Meetup / Airbnb) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-xl">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Investimento
              </span>
              <span className="text-base font-extrabold text-gray-900 truncate block">
                {item.funding || (item.isFree ? "Gratuito" : "Consultar")}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <ShareButton title={item.title} className="p-2.5!" />

              {item.link ? (
                <a
                  href={item.link}
                  target={item.isExternalLink ? "_blank" : undefined}
                  rel={item.isExternalLink ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-violet-700 hover:bg-violet-800 text-white shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                >
                  <span>{actionLabel}</span>
                  {item.isExternalLink ? <ExternalLink className="w-3.5 h-3.5" /> : null}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
