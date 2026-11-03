"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Bell,
  Sliders,
  CheckCheck,
  Calendar,
  GraduationCap,
  Users,
  Code,
  Rocket,
  ShieldCheck,
  ExternalLink,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  Inbox,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useNotifications } from "./NotificationsContext";
import type { NotificationPreferences } from "@/lib/notifications-service";

interface CategoryMeta {
  key: keyof NotificationPreferences;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  color: string;
  bgLight: string;
  borderColor: string;
}

const CATEGORIES_CONFIG: CategoryMeta[] = [
  {
    key: "eventos",
    title: "Eventos & Hackathons",
    description: "Alertas sobre novas conferências tecnológicas, maratonas de programação e meetups presenciais ou online nos países da CPLP.",
    icon: Calendar,
    tag: "Eventos",
    color: "text-violet-700",
    bgLight: "bg-violet-50",
    borderColor: "border-violet-200",
  },
  {
    key: "bolsas",
    title: "Bolsas de Estudo & Intercâmbio",
    description: "Novos editais abertos, prazos de candidatura a terminar e oportunidades de financiamento académico para estudantes lusófonos.",
    icon: GraduationCap,
    tag: "Bolsas",
    color: "text-amber-700",
    bgLight: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    key: "comunidades",
    title: "Comunidades Tech",
    description: "Avisos sobre criação e encontros de novas comunidades técnicas de desenvolvedores, grupos locais e partilha de conhecimento.",
    icon: Users,
    tag: "Comunidades",
    color: "text-emerald-700",
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    key: "cursos",
    title: "Cursos & Capacitações",
    description: "Lançamento de workshops, roadmaps práticos, bootcamps gratuitos e formações certificadas para acelerar a tua carreira.",
    icon: Code,
    tag: "Cursos",
    color: "text-blue-700",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    key: "startups",
    title: "Startups & Inovação",
    description: "Oportunidades de aceleração, rondas de investimento, competições de pitch e programas de inovação tecnológica.",
    icon: Rocket,
    tag: "Startups",
    color: "text-purple-700",
    bgLight: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    key: "plataforma",
    title: "Plataforma & Segurança",
    description: "Comunicações importantes sobre a tua conta, novas funcionalidades na ADN Developer e orientações de segurança.",
    icon: ShieldCheck,
    tag: "Sistema",
    color: "text-indigo-700",
    bgLight: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
];

export function NotificationsView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated" && !!session?.user;

  const currentTab = searchParams.get("tab") === "preferencias" ? "preferencias" : "todas";

  const {
    notifications,
    unreadCount,
    preferences,
    isLoading,
    isSavingPrefs,
    markAsRead,
    markAllAsRead,
    updatePreferences,
  } = useNotifications();

  const [filterCategory, setFilterCategory] = useState<string>("todos");
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  const handleTabChange = (tab: "todas" | "preferencias") => {
    if (tab === "preferencias") {
      router.push("/notificacoes?tab=preferencias");
    } else {
      router.push("/notificacoes");
    }
  };

  const handleTogglePreference = async (key: keyof NotificationPreferences) => {
    const nextVal = !preferences[key];
    const success = await updatePreferences({ [key]: nextVal });
    if (success) {
      setSaveSuccessMessage("Preferências atualizadas com sucesso!");
      setTimeout(() => setSaveSuccessMessage(null), 3000);
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filterCategory === "todos") return true;
    if (filterCategory === "nao_lidas") return !notif.isRead;
    return notif.category === filterCategory;
  });

  // Estado: Sessão em carregamento
  if (status === "loading") {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-violet-700 animate-spin mb-3" />
        <p className="text-xs text-gray-500 font-medium">A carregar notificações...</p>
      </div>
    );
  }

  // Estado: Não Autenticado
  if (!isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 sm:py-24 text-center">
        <div className="w-16 h-16 rounded-3xl bg-violet-50 text-violet-700 flex items-center justify-center mx-auto mb-4 border border-violet-100 shadow-sm">
          <Bell className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-200 mb-3 inline-block">
          Acesso Exclusivo a Membros
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Inicie sessão para gerir as suas notificações
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed max-w-md mx-auto">
          Aceda a avisos personalizados sobre eventos, bolsas e conteúdos da sua escolha no ecossistema tech lusófono.
        </p>
        <button
          type="button"
          onClick={() => router.push("/?auth=login")}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs sm:text-sm shadow-sm transition active:scale-95 cursor-pointer"
        >
          <span>Iniciar Sessão / Criar Conta</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho da Página com Segmented Controls (Separando Notificações e Preferências) */}
      <div className="bg-white border-b border-gray-100 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-700 flex items-center justify-center shrink-0 border border-violet-100 shadow-2xs">
              {currentTab === "preferencias" ? (
                <Sliders className="w-6 h-6" />
              ) : (
                <Bell className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  {currentTab === "preferencias"
                    ? "Preferências de Notificações"
                    : "Central de Notificações"}
                </h1>
                {currentTab === "todas" && unreadCount > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-violet-100 text-violet-700">
                    {unreadCount} novas
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-relaxed">
                {currentTab === "preferencias"
                  ? "Escolha exatamente quais os tipos de conteúdo da plataforma que deseja receber alertas."
                  : "Acompanhe atualizações personalizadas de acordo com os conteúdos que escolheu seguir."}
              </p>
            </div>
          </div>

          {/* Seletor de Sessão / Abas Claras e Distintas */}
          <div className="flex items-center p-1 bg-gray-100/90 rounded-xl border border-gray-200 self-start md:self-center shrink-0">
            <button
              type="button"
              onClick={() => handleTabChange("todas")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                currentTab === "todas"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Bell className="w-4 h-4 text-violet-600" />
              <span>Notificações</span>
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-violet-600" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("preferencias")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                currentTab === "preferencias"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Sliders className="w-4 h-4 text-violet-600" />
              <span>Preferências de Conteúdo</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==============================================================
          SESSÃO 1: LISTA DE NOTIFICAÇÕES (currentTab === "todas")
          ============================================================== */}
      {currentTab === "todas" && (
        <div className="space-y-4">
          {/* Barra de Filtros e Ações Rápidas */}
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Filtros por Categoria */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none text-xs">
              <button
                type="button"
                onClick={() => setFilterCategory("todos")}
                className={`px-3 py-1.5 rounded-full font-semibold transition shrink-0 cursor-pointer ${
                  filterCategory === "todos"
                    ? "bg-violet-700 text-white shadow-2xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Todas ({notifications.length})
              </button>

              <button
                type="button"
                onClick={() => setFilterCategory("nao_lidas")}
                className={`px-3 py-1.5 rounded-full font-semibold transition shrink-0 cursor-pointer ${
                  filterCategory === "nao_lidas"
                    ? "bg-violet-700 text-white shadow-2xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Não Lidas ({unreadCount})
              </button>

              {CATEGORIES_CONFIG.map((cat) => {
                const count = notifications.filter((n) => n.category === cat.key).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setFilterCategory(cat.key)}
                    className={`px-3 py-1.5 rounded-full font-semibold transition shrink-0 cursor-pointer ${
                      filterCategory === cat.key
                        ? "bg-violet-700 text-white shadow-2xs"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat.tag} ({count})
                  </button>
                );
              })}
            </div>

            {/* Ações: Marcar todas como lidas e Atalho para Preferências */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5 text-violet-600" />
                  <span>Marcar todas como lidas</span>
                </button>
              )}

              <Link
                href="/notificacoes?tab=preferencias"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 transition"
              >
                <Sliders className="w-3 h-3" />
                <span className="hidden sm:inline">Definições</span>
              </Link>
            </div>
          </div>

          {/* Lista de Notificações */}
          {isLoading ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <Loader2 className="w-8 h-8 text-violet-700 animate-spin mx-auto mb-3" />
              <p className="text-xs text-gray-500 font-medium">A carregar notificações...</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-14 text-center max-w-lg mx-auto my-8 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center mx-auto mb-3 border border-gray-100">
                <Inbox className="w-7 h-7" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                Sem notificações para apresentar
              </h3>
              <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                {filterCategory === "nao_lidas"
                  ? "Está tudo em dia! Não tem notificações por ler de momento."
                  : "Ainda não tem alertas nesta categoria. Pode configurar os tipos de conteúdo que deseja receber nas preferências."}
              </p>
              <button
                type="button"
                onClick={() => handleTabChange("preferencias")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-semibold text-xs shadow-xs transition"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Configurar Preferências de Alertas</span>
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs divide-y divide-gray-100 overflow-hidden">
              {filteredNotifications.map((notif) => {
                const meta = CATEGORIES_CONFIG.find((c) => c.key === notif.category);
                const IconComponent = meta?.icon || Bell;

                return (
                  <div
                    key={notif.id}
                    onClick={() => {
                      if (!notif.isRead) markAsRead(notif.id);
                    }}
                    className={`p-4 sm:p-5 flex items-start gap-3.5 sm:gap-4 transition-colors ${
                      notif.isRead ? "bg-white hover:bg-gray-50/60" : "bg-violet-50/30 hover:bg-violet-50/60"
                    }`}
                  >
                    {/* Ícone da Categoria */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        meta?.bgLight || "bg-gray-100"
                      } ${meta?.color || "text-gray-700"} ${meta?.borderColor || "border-gray-200"}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Conteúdo da Notificação */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            meta?.bgLight || "bg-gray-100"
                          } ${meta?.color || "text-gray-700"} ${meta?.borderColor || "border-gray-200"}`}
                        >
                          {meta?.tag || notif.category}
                        </span>

                        <span className="text-[11px] text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            {new Date(notif.createdAt).toLocaleDateString("pt-PT", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </span>

                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-violet-600 shrink-0" title="Não lida" />
                        )}
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 leading-snug">
                        {notif.title}
                      </h4>

                      <p className="text-xs text-gray-600 leading-relaxed mb-3">
                        {notif.message}
                      </p>

                      <div className="flex items-center gap-3">
                        {notif.link && (
                          <Link
                            href={notif.link}
                            onClick={() => {
                              if (!notif.isRead) markAsRead(notif.id);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-bold text-violet-700 hover:text-violet-900 transition"
                          >
                            <span>Ver detalhes</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}

                        {!notif.isRead && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notif.id);
                            }}
                            className="text-[11px] font-medium text-gray-400 hover:text-gray-700 transition"
                          >
                            Marcar como lida
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ==============================================================
          SESSÃO 2: SESSÃO PRÓPRIA DE PREFERÊNCIAS DE CONTEÚDO (currentTab === "preferencias")
          Organizada, limpa e dedicada para o utilizador ativar/desativar
          ============================================================== */}
      {currentTab === "preferencias" && (
        <div className="space-y-6">
          {/* Feedback de sucesso */}
          {saveSuccessMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{saveSuccessMessage}</span>
            </div>
          )}

          {/* Banner explicativo de controlo total do utilizador */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-violet-900 to-indigo-900 text-white border border-violet-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-violet-200 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-violet-300" />
                <span>Gestão Personalizada de Conteúdos</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold">
                Tu decides o que queres acompanhar
              </h3>
              <p className="text-xs text-violet-200 max-w-2xl leading-relaxed">
                Ativa ou desativa as categorias conforme o teu interesse. As notificações só serão geradas e apresentadas para os tipos de conteúdo que mantiveres ativos.
              </p>
            </div>

            <div className="shrink-0 self-end sm:self-center">
              {isSavingPrefs ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs font-semibold backdrop-blur-md">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  A guardar...
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-200 text-xs font-semibold border border-emerald-500/30">
                  <Check className="w-3 h-3 text-emerald-400" />
                  Sincronizado
                </span>
              )}
            </div>
          </div>

          {/* Grelha de Categorias de Notificação - Sessão Limpa e Dedicada */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CATEGORIES_CONFIG.map((cat) => {
              const IconComponent = cat.icon;
              const isEnabled = preferences[cat.key] !== false;

              return (
                <div
                  key={cat.key}
                  className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    isEnabled
                      ? "bg-white border-gray-200/90 shadow-2xs hover:border-violet-300"
                      : "bg-gray-50/70 border-gray-200 opacity-75"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                          cat.bgLight
                        } ${cat.color} ${cat.borderColor}`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">
                          {cat.title}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                            isEnabled
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-gray-100 text-gray-500 border border-gray-200"
                          }`}
                        >
                          {isEnabled ? "Ativado" : "Desativado"}
                        </span>
                      </div>
                    </div>

                    {/* Toggle Switch Seguro e Acessível */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isEnabled}
                      onClick={() => handleTogglePreference(cat.key)}
                      disabled={isSavingPrefs}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 ${
                        isEnabled ? "bg-violet-700" : "bg-gray-300"
                      }`}
                    >
                      <span className="sr-only">Ativar ou desativar {cat.title}</span>
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          isEnabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed mt-1">
                    {cat.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Rodapé informativo de segurança */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-violet-600 shrink-0" />
              <span>
                As tuas preferências são guardadas de forma segura na tua conta e aplicadas instantaneamente a todas as notificações.
              </span>
            </div>
            <Link
              href="/notificacoes"
              className="font-bold text-violet-700 hover:text-violet-900 transition flex items-center gap-1 shrink-0 ml-4"
            >
              <span>Ver notificações ativas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
