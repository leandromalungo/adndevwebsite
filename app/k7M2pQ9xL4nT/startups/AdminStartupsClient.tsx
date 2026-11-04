"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Rocket,
  Plus,
  ArrowUp,
  ArrowDown,
  Star,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Building2,
  Users,
  MessageSquare,
  Bookmark,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
  Sliders,
  ExternalLink,
} from "lucide-react";
import {
  type Startup,
  type StartupSector,
  type StartupComment,
  type StartupFounder,
  type StartupStatus,
  type StartupStage,
  LUSOPHONE_STARTUP_COUNTRIES,
  STARTUP_STAGES,
  getCountryByCode,
} from "@/lib/startup-types";
import { type AdminStartupsData } from "@/lib/startup-service";

interface AdminStartupsClientProps {
  initialData: AdminStartupsData;
}

export function AdminStartupsClient({ initialData }: AdminStartupsClientProps) {
  const [data, setData] = useState<AdminStartupsData>(initialData);
  const [activeTab, setActiveTab] = useState<"catalog" | "comments" | "sectors">("catalog");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStartup, setEditingStartup] = useState<Startup | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formTagline, setFormTagline] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLogoUrl, setFormLogoUrl] = useState("");
  const [formCoverUrl, setFormCoverUrl] = useState("");
  const [formCountryCode, setFormCountryCode] = useState("AO");
  const [formSectorId, setFormSectorId] = useState("fintech");
  const [formStage, setFormStage] = useState<StartupStage>("Seed");
  const [formWebsiteUrl, setFormWebsiteUrl] = useState("");
  const [formFoundedYear, setFormFoundedYear] = useState(new Date().getFullYear());
  const [formStatus, setFormStatus] = useState<StartupStatus>("published");
  const [formTwitter, setFormTwitter] = useState("");
  const [formLinkedin, setFormLinkedin] = useState("");
  const [formInstagram, setFormInstagram] = useState("");
  const [formFounders, setFormFounders] = useState<StartupFounder[]>([
    { name: "", role: "Fundador", linkedin: "" },
  ]);

  // Sector Form State
  const [newSectorName, setNewSectorName] = useState("");
  const [newSectorDesc, setNewSectorDesc] = useState("");

  // Bulk Actions State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkLoading, setIsBulkLoading] = useState(false);

  const allSelected = data.startups.length > 0 && selectedIds.length === data.startups.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < data.startups.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.startups.map((s) => s.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  const handleBulkAction = async (action: "publish" | "unpublish" | "delete") => {
    if (selectedIds.length === 0) return;

    if (action === "delete") {
      const confirmDelete = window.confirm(
        `Tem a certeza que deseja eliminar permanentemente as ${selectedIds.length} startup(s) selecionada(s)? Esta ação é irreversível.`
      );
      if (!confirmDelete) return;
    }

    setIsBulkLoading(true);
    try {
      const res = await fetch("/api/admin/startups/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ids: selectedIds }),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || "Erro ao executar ação em massa.");
      }

      showFeedback(resData.message || "Ação em massa executada com sucesso.");
      setSelectedIds([]);
      await reloadData();
    } catch (err: any) {
      showFeedback(err.message || "Erro ao processar ação em massa.", "error");
    } finally {
      setIsBulkLoading(false);
    }
  };

  const showFeedback = (text: string, type: "success" | "error" = "success") => {
    setActionMessage({ type, text });
    setTimeout(() => setActionMessage(null), 4000);
  };

  const reloadData = async () => {
    try {
      const res = await fetch("/api/admin/startups");
      if (res.ok) {
        const fresh: AdminStartupsData = await res.json();
        setData(fresh);
      }
    } catch {
      // Falha silenciosa
    }
  };

  const openCreateModal = () => {
    setEditingStartup(null);
    setFormName("");
    setFormSlug("");
    setFormTagline("");
    setFormDescription("");
    setFormLogoUrl("");
    setFormCoverUrl("");
    setFormCountryCode("AO");
    setFormSectorId(data.sectors[0]?.id || "fintech");
    setFormStage("Seed");
    setFormWebsiteUrl("");
    setFormFoundedYear(new Date().getFullYear());
    setFormStatus("published");
    setFormTwitter("");
    setFormLinkedin("");
    setFormInstagram("");
    setFormFounders([{ name: "", role: "Fundador", linkedin: "" }]);
    setIsModalOpen(true);
  };

  const openEditModal = (startup: Startup) => {
    setEditingStartup(startup);
    setFormName(startup.name);
    setFormSlug(startup.slug);
    setFormTagline(startup.tagline);
    setFormDescription(startup.description);
    setFormLogoUrl(startup.logo_url);
    setFormCoverUrl(startup.cover_url || "");
    setFormCountryCode(startup.country_code);
    setFormSectorId(startup.sector_id);
    setFormStage(startup.stage);
    setFormWebsiteUrl(startup.website_url);
    setFormFoundedYear(startup.founded_year);
    setFormStatus(startup.status);
    setFormTwitter(startup.social_links?.twitter || "");
    setFormLinkedin(startup.social_links?.linkedin || "");
    setFormInstagram(startup.social_links?.instagram || "");
    setFormFounders(
      startup.founders && startup.founders.length > 0
        ? JSON.parse(JSON.stringify(startup.founders))
        : [{ name: "", role: "Fundador", linkedin: "" }]
    );
    setIsModalOpen(true);
  };

  const handleSaveStartup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSlug.trim() || !formTagline.trim()) {
      showFeedback("Nome, slug e tagline são obrigatórios.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formName.trim(),
        slug: formSlug.trim().toLowerCase(),
        tagline: formTagline.trim(),
        description: formDescription.trim(),
        logo_url: formLogoUrl.trim(),
        cover_url: formCoverUrl.trim(),
        country_code: formCountryCode,
        sector_id: formSectorId,
        stage: formStage,
        website_url: formWebsiteUrl.trim(),
        founded_year: Number(formFoundedYear),
        status: formStatus,
        social_links: {
          twitter: formTwitter.trim() || undefined,
          linkedin: formLinkedin.trim() || undefined,
          instagram: formInstagram.trim() || undefined,
        },
        founders: formFounders.filter((f) => f.name.trim().length > 0),
      };

      if (editingStartup) {
        // Update
        const res = await fetch("/api/admin/startups", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingStartup.id, ...payload }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Erro ao atualizar");
        }
        showFeedback("Startup atualizada com sucesso!");
      } else {
        // Create
        const res = await fetch("/api/admin/startups", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Erro ao criar");
        }
        showFeedback("Startup criada com sucesso!");
      }

      setIsModalOpen(false);
      await reloadData();
    } catch (err: any) {
      showFeedback(err.message || "Erro ao guardar startup.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStartup = async (id: string, name: string) => {
    if (!confirm(`Tem a certeza que deseja eliminar "${name}" permanentemente?`)) return;

    try {
      const res = await fetch(`/api/admin/startups?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao eliminar");
      showFeedback(`Startup "${name}" eliminada com sucesso.`);
      await reloadData();
    } catch {
      showFeedback("Erro ao eliminar startup.", "error");
    }
  };

  const handleSetFeaturedToday = async (id: string, name: string) => {
    try {
      const res = await fetch("/api/admin/startups/featured", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startupId: id }),
      });
      if (!res.ok) throw new Error("Erro");
      showFeedback(`"${name}" foi definida como Destaque do Dia!`);
      await reloadData();
    } catch {
      showFeedback("Erro ao definir destaque.", "error");
    }
  };

  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    const list = [...data.startups];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    const orderedIds = list.map((s) => s.id);
    setData((prev) => ({ ...prev, startups: list }));

    try {
      await fetch("/api/admin/startups/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });
      showFeedback("Ordem de exibição salva com sucesso.");
    } catch {
      showFeedback("Erro ao salvar ordem.", "error");
    }
  };

  const handleModerateComment = async (commentId: string, isHidden: boolean) => {
    try {
      const res = await fetch("/api/admin/startups/comments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId, isHidden }),
      });
      if (!res.ok) throw new Error("Erro");
      showFeedback(isHidden ? "Comentário ocultado." : "Comentário aprovado e visível.");
      await reloadData();
    } catch {
      showFeedback("Erro ao moderar comentário.", "error");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Eliminar este comentário permanentemente?")) return;
    try {
      const res = await fetch(`/api/admin/startups/comments?id=${commentId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro");
      showFeedback("Comentário eliminado com sucesso.");
      await reloadData();
    } catch {
      showFeedback("Erro ao eliminar comentário.", "error");
    }
  };

  const handleToggleSector = async (sectorId: string, currentActive: boolean) => {
    try {
      const res = await fetch("/api/admin/startups/sectors", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectorId, isActive: !currentActive }),
      });
      if (!res.ok) throw new Error("Erro");
      showFeedback("Estado do setor atualizado.");
      await reloadData();
    } catch {
      showFeedback("Erro ao atualizar setor.", "error");
    }
  };

  const handleCreateSector = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectorName.trim()) return;

    try {
      const res = await fetch("/api/admin/startups/sectors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newSectorName.trim(),
          slug: newSectorName.trim().toLowerCase().replace(/\s+/g, "-"),
          description: newSectorDesc.trim(),
          icon: "Rocket",
          sort_order: data.sectors.length + 1,
          is_active: true,
        }),
      });
      if (!res.ok) throw new Error("Erro ao criar");
      setNewSectorName("");
      setNewSectorDesc("");
      showFeedback("Novo setor cadastrado com sucesso.");
      await reloadData();
    } catch {
      showFeedback("Erro ao criar setor.", "error");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Cabeçalho do Painel Admin */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-violet-700 mb-1">
            <Rocket className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Gestão do Catálogo</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Startups Lusófonas & Comunidade
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Cadastre, edite, defina o Destaque do Dia, ordene o feed e modere os comentários.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-violet-800 transition shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Nova Startup</span>
        </button>
      </div>

      {/* Alerta de Feedback */}
      {actionMessage && (
        <div
          className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold border ${
            actionMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {actionMessage.type === "success" ? (
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          )}
          <span>{actionMessage.text}</span>
        </div>
      )}

      {/* Cards de Métricas Reais do Diretório */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <span className="text-[11px] font-bold uppercase text-gray-400">Total Startups</span>
          <p className="text-xl font-bold text-gray-900 mt-1 tabular-nums">
            {data.stats.totalStartups}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <span className="text-[11px] font-bold uppercase text-emerald-600">Publicadas</span>
          <p className="text-xl font-bold text-emerald-700 mt-1 tabular-nums">
            {data.stats.publishedCount}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <span className="text-[11px] font-bold uppercase text-amber-600">Em Análise</span>
          <p className="text-xl font-bold text-amber-700 mt-1 tabular-nums">
            {data.stats.pendingCount}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <span className="text-[11px] font-bold uppercase text-gray-500">Arquivadas</span>
          <p className="text-xl font-bold text-gray-700 mt-1 tabular-nums">
            {data.stats.archivedCount}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <span className="text-[11px] font-bold uppercase text-violet-700">Seguidores</span>
          <p className="text-xl font-bold text-violet-800 mt-1 tabular-nums">
            {data.stats.totalFollowers}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <span className="text-[11px] font-bold uppercase text-blue-600">Visualizações</span>
          <p className="text-xl font-bold text-blue-700 mt-1 tabular-nums">
            {data.stats.totalViews}
          </p>
        </div>
      </div>

      {/* Tabs de Navegação */}
      <div className="flex items-center gap-1 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab("catalog")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition cursor-pointer ${
            activeTab === "catalog"
              ? "border-violet-700 text-violet-700"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Catálogo & Reordenação ({data.startups.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("comments")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition cursor-pointer ${
            activeTab === "comments"
              ? "border-violet-700 text-violet-700"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Moderação de Comentários ({data.comments.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("sectors")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition cursor-pointer ${
            activeTab === "sectors"
              ? "border-violet-700 text-violet-700"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Setores & Verticais ({data.sectors.length})
        </button>
      </div>

      {/* =========================================================================
          TAB 1: CATÁLOGO E REORDENAÇÃO MANUAL
         ========================================================================= */}
      {activeTab === "catalog" && (
        <div className="space-y-4">
          {/* Barra de Ações em Massa Flutuante / Destaque */}
          {selectedIds.length > 0 && (
            <div className="sticky top-4 z-30 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-violet-700 bg-gray-900 px-4 py-3 text-white shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="flex h-6 min-w-6 items-center justify-center rounded-md bg-violet-600 px-1.5 font-mono text-xs font-bold text-white">
                  {selectedIds.length}
                </span>
                <span className="text-xs font-semibold text-gray-200">
                  {selectedIds.length === 1
                    ? "1 startup selecionada"
                    : `${selectedIds.length} startups selecionadas`}
                </span>
                <button
                  type="button"
                  onClick={clearSelection}
                  disabled={isBulkLoading}
                  className="text-[11px] text-gray-400 hover:text-white underline cursor-pointer disabled:opacity-50"
                >
                  Limpar seleção
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isBulkLoading}
                  onClick={() => handleBulkAction("publish")}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50 transition cursor-pointer shadow-xs"
                  title="Publicar todas as startups selecionadas"
                >
                  {isBulkLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                  <span>Publicar ({selectedIds.length})</span>
                </button>

                <button
                  type="button"
                  disabled={isBulkLoading}
                  onClick={() => handleBulkAction("unpublish")}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-500 disabled:opacity-50 transition cursor-pointer shadow-xs"
                  title="Despublicar / colocar em análise"
                >
                  {isBulkLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5" />
                  )}
                  <span>Despublicar ({selectedIds.length})</span>
                </button>

                <button
                  type="button"
                  disabled={isBulkLoading}
                  onClick={() => handleBulkAction("delete")}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-500 disabled:opacity-50 transition cursor-pointer shadow-xs"
                  title="Eliminar permanentemente as startups selecionadas"
                >
                  {isBulkLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  <span>Eliminar ({selectedIds.length})</span>
                </button>
              </div>
            </div>
          )}

          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-xs">
            <div className="p-4 bg-gray-50/80 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-gray-300 text-violet-700 focus:ring-violet-600 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-gray-700">
                    Selecionar Todas ({data.startups.length})
                  </span>
                </label>
                {selectedIds.length > 0 && (
                  <span className="text-[11px] font-semibold text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">
                    {selectedIds.length} de {data.startups.length} selecionadas
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500">
                Use os checkboxes para ações em massa ou as setas ↑ ↓ para reordenar
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {data.startups.map((startup, index) => {
                const country = getCountryByCode(startup.country_code);
                const sector = data.sectors.find((s) => s.id === startup.sector_id);
                const isSelected = selectedIds.includes(startup.id);

                return (
                  <div
                    key={startup.id}
                    className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${
                      isSelected
                        ? "bg-violet-50/70 border-l-4 border-l-violet-600"
                        : "hover:bg-gray-50/60"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Checkbox Individual */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(startup.id)}
                        className="h-4 w-4 rounded border-gray-300 text-violet-700 focus:ring-violet-600 cursor-pointer shrink-0"
                        aria-label={`Selecionar ${startup.name}`}
                      />

                      {/* Botões de Reordenação */}
                      <div className="flex flex-col gap-0.5">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMoveOrder(index, "up")}
                          className="p-1 rounded text-gray-400 hover:text-gray-800 disabled:opacity-20 cursor-pointer"
                          title="Subir posição"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={index === data.startups.length - 1}
                          onClick={() => handleMoveOrder(index, "down")}
                          className="p-1 rounded text-gray-400 hover:text-gray-800 disabled:opacity-20 cursor-pointer"
                          title="Descer posição"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    <span className="font-mono text-xs font-bold text-gray-400 w-6 tabular-nums">
                      #{index + 1}
                    </span>

                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                      {startup.logo_url ? (
                        <img
                          src={startup.logo_url}
                          alt={startup.name}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Building2 className="h-5 w-5 text-violet-700" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900 truncate">
                          {startup.name}
                        </span>
                        <span>{country.flag}</span>
                        {startup.is_featured && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                            ★ Destaque do Dia
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            startup.status === "published"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : startup.status === "pending"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {startup.status === "published"
                            ? "Publicada"
                            : startup.status === "pending"
                            ? "Em Análise"
                            : "Arquivada"}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 truncate max-w-xl">
                        {startup.tagline}
                      </p>

                      <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-400">
                        <span>{sector?.name || startup.sector_id}</span>
                        <span>·</span>
                        <span>{startup.stage}</span>
                        <span>·</span>
                        <span className="tabular-nums">{startup.followers_count} seguidores</span>
                        <span>·</span>
                        <span className="tabular-nums">{startup.comments_count} comentários</span>
                      </div>
                    </div>
                  </div>

                  {/* Ações de Gestão */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      type="button"
                      onClick={() => handleSetFeaturedToday(startup.id, startup.name)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        startup.is_featured
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                      }`}
                      title="Destacar no topo da página de Startups"
                    >
                      <Star className="w-3.5 h-3.5" />
                      <span>{startup.is_featured ? "Destaque Ativo" : "Definir Destaque"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditModal(startup)}
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-violet-700 hover:bg-violet-50 transition cursor-pointer"
                      title="Editar informações"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteStartup(startup.id, startup.name)}
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                      title="Eliminar startup"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: MODERAÇÃO DE COMENTÁRIOS
         ========================================================================= */}
      {activeTab === "comments" && (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-xs">
          <div className="p-4 bg-gray-50/80 border-b border-gray-200">
            <span className="text-xs font-bold text-gray-700">
              Comentários da Comunidade ({data.comments.length} no total)
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {data.comments.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-500">
                Ainda não há comentários registados na plataforma.
              </div>
            ) : (
              data.comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-4 flex flex-col md:flex-row md:items-start justify-between gap-4 ${
                    comment.is_hidden ? "bg-red-50/30" : "hover:bg-gray-50/50"
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-900">
                        {comment.user_name}
                      </span>
                      <span className="text-xs text-violet-700 font-semibold">
                        na {comment.startupName}
                      </span>
                      {comment.is_hidden && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
                          Ocultado
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed max-w-2xl">
                      {comment.content}
                    </p>
                    <span className="text-[11px] text-gray-400">
                      Likes: {comment.likes_count} · Data: {new Date(comment.created_at).toLocaleString("pt-PT")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleModerateComment(comment.id, !comment.is_hidden)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                        comment.is_hidden
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {comment.is_hidden ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Aprovar</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Ocultar</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteComment(comment.id)}
                      className="p-1.5 rounded-lg border border-gray-200 text-red-600 hover:bg-red-50 cursor-pointer"
                      title="Eliminar comentário"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: GESTÃO DE SETORES & VERTICAIS
         ========================================================================= */}
      {activeTab === "sectors" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-xl border border-gray-200 bg-white overflow-hidden shadow-xs">
            <div className="p-4 bg-gray-50/80 border-b border-gray-200">
              <span className="text-xs font-bold text-gray-700">
                Setores Ativos & Visíveis no Feed
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {data.sectors.map((sec) => (
                <div
                  key={sec.id}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50/50"
                >
                  <div>
                    <p className="text-xs font-bold text-gray-900">{sec.name}</p>
                    <p className="text-[11px] text-gray-500">{sec.description}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleSector(sec.id, sec.is_active)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                      sec.is_active
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {sec.is_active ? "Ativo" : "Inativo"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Adicionar Novo Setor</h3>
            <form onSubmit={handleCreateSector} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase text-gray-600 block mb-1">
                  Nome do Setor
                </label>
                <input
                  type="text"
                  value={newSectorName}
                  onChange={(e) => setNewSectorName(e.target.value)}
                  placeholder="Ex: GovTech & Cidadania"
                  className="w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-800 focus:border-violet-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-gray-600 block mb-1">
                  Descrição
                </label>
                <textarea
                  value={newSectorDesc}
                  onChange={(e) => setNewSectorDesc(e.target.value)}
                  placeholder="Breve descrição da vertical..."
                  rows={2}
                  className="w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-800 focus:border-violet-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs transition cursor-pointer"
              >
                Cadastrar Setor
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL CRIAR / EDITAR STARTUP
         ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h2 className="text-base font-bold text-gray-900">
                {editingStartup ? "Editar Startup" : "Cadastrar Nova Startup Lusófona"}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveStartup} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase text-gray-600 block mb-1">
                    Nome da Startup *
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => {
                      setFormName(e.target.value);
                      if (!editingStartup) {
                        setFormSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]/g, "-")
                            .replace(/-+/g, "-")
                        );
                      }
                    }}
                    placeholder="Ex: Bantu Makers"
                    className="w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-800 focus:border-violet-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-gray-600 block mb-1">
                    Slug (URL Amigável) *
                  </label>
                  <input
                    type="text"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="ex: bantu-makers"
                    className="w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-800 focus:border-violet-600 focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-gray-600 block mb-1">
                  Tagline (Proposta de Valor em 1 Linha) *
                </label>
                <input
                  type="text"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  placeholder="Ex: Venture builder que desenvolve negócios digitais em África"
                  className="w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-800 focus:border-violet-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-gray-600 block mb-1">
                  Descrição Completa
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Conte a história, missão, modelo de negócio e impacto da startup..."
                  rows={3}
                  className="w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-800 focus:border-violet-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-gray-600 block mb-1">
                    País Lusófono
                  </label>
                  <select
                    value={formCountryCode}
                    onChange={(e) => setFormCountryCode(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-800 focus:border-violet-600 focus:outline-none"
                  >
                    {LUSOPHONE_STARTUP_COUNTRIES.filter((c) => c.code !== "ALL").map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-gray-600 block mb-1">
                    Setor
                  </label>
                  <select
                    value={formSectorId}
                    onChange={(e) => setFormSectorId(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-800 focus:border-violet-600 focus:outline-none"
                  >
                    {data.sectors.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-gray-600 block mb-1">
                    Estágio
                  </label>
                  <select
                    value={formStage}
                    onChange={(e) => setFormStage(e.target.value as StartupStage)}
                    className="w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-800 focus:border-violet-600 focus:outline-none"
                  >
                    {STARTUP_STAGES.map((stg) => (
                      <option key={stg} value={stg}>
                        {stg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-gray-600 block mb-1">
                    Website Oficial
                  </label>
                  <input
                    type="url"
                    value={formWebsiteUrl}
                    onChange={(e) => setFormWebsiteUrl(e.target.value)}
                    placeholder="https://exemplo.com"
                    className="w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-800 focus:border-violet-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-gray-600 block mb-1">
                    Ano de Fundação
                  </label>
                  <input
                    type="number"
                    value={formFoundedYear}
                    onChange={(e) => setFormFoundedYear(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-800 focus:border-violet-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-gray-600 block mb-1">
                    Estado de Publicação
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as StartupStatus)}
                    className="w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-800 focus:border-violet-600 focus:outline-none"
                  >
                    <option value="published">Publicada</option>
                    <option value="pending">Em Análise</option>
                    <option value="archived">Arquivada</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-gray-600 block mb-1">
                    URL do Logotipo
                  </label>
                  <input
                    type="url"
                    value={formLogoUrl}
                    onChange={(e) => setFormLogoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-800 focus:border-violet-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-gray-600 block mb-1">
                    LinkedIn da Empresa
                  </label>
                  <input
                    type="url"
                    value={formLinkedin}
                    onChange={(e) => setFormLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/company/..."
                    className="w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-800 focus:border-violet-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Fundadores */}
              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold uppercase text-gray-600">
                    Fundadores
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormFounders([
                        ...formFounders,
                        { name: "", role: "Co-fundador", linkedin: "" },
                      ])
                    }
                    className="text-xs text-violet-700 font-semibold hover:underline"
                  >
                    + Adicionar Fundador
                  </button>
                </div>

                <div className="space-y-2">
                  {formFounders.map((founder, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={founder.name}
                        onChange={(e) => {
                          const updated = [...formFounders];
                          updated[idx].name = e.target.value;
                          setFormFounders(updated);
                        }}
                        placeholder="Nome do fundador"
                        className="flex-1 rounded-lg border border-gray-200 p-2 text-xs text-gray-800 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={founder.role}
                        onChange={(e) => {
                          const updated = [...formFounders];
                          updated[idx].role = e.target.value;
                          setFormFounders(updated);
                        }}
                        placeholder="Cargo (ex: CEO)"
                        className="w-32 rounded-lg border border-gray-200 p-2 text-xs text-gray-800 focus:outline-none"
                      />
                      {formFounders.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormFounders(formFounders.filter((_, i) => i !== idx));
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-violet-700 hover:bg-violet-800 disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                >
                  {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingStartup ? "Salvar Alterações" : "Cadastrar Startup"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
