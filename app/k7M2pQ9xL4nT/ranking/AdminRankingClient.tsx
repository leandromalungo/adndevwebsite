"use client";

import { useState } from "react";
import {
  Trophy,
  Layers,
  Vote,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Globe,
  ExternalLink,
  RotateCcw,
  Tag,
  FolderPlus,
  Shield,
  ArrowUp,
  ArrowDown,
  X,
  Loader2,
} from "lucide-react";
import type { Technology, TechnologyCategory, TechnologyVote } from "@/lib/ranking-types";

interface AdminRankingClientProps {
  initialData: {
    technologies: Technology[];
    categories: TechnologyCategory[];
    recentVotes: TechnologyVote[];
    metrics: {
      totalTechnologies: number;
      activeTechnologies: number;
      totalVotes: number;
      totalUpvotes: number;
      totalDownvotes: number;
      totalCategories: number;
      countryVoteStats: Record<string, number>;
    };
  };
}

export function AdminRankingClient({ initialData }: AdminRankingClientProps) {
  const [activeTab, setActiveTab] = useState<"technologies" | "categories" | "votes">("technologies");
  const [technologies, setTechnologies] = useState<Technology[]>(initialData.technologies);
  const [categories, setCategories] = useState<TechnologyCategory[]>(initialData.categories);
  const [metrics, setMetrics] = useState(initialData.metrics);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modais de Criação e Edição
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<Technology | null>(null);

  // Form State Tecnologia
  const [techName, setTechName] = useState("");
  const [techCategory, setTechCategory] = useState(categories[0]?.id || "web");
  const [techDescription, setTechDescription] = useState("");
  const [techWebsite, setTechWebsite] = useState("");
  const [techLogo, setTechLogo] = useState("");
  const [techTags, setTechTags] = useState("");

  // Form State Categoria
  const [catId, setCatId] = useState("");
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [catIcon, setCatIcon] = useState("Code");

  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Abrir Modal de Criação de Tecnologia
  const openCreateTechModal = () => {
    setEditingTech(null);
    setTechName("");
    setTechCategory(categories[0]?.id || "web");
    setTechDescription("");
    setTechWebsite("");
    setTechLogo("");
    setTechTags("");
    setIsTechModalOpen(true);
  };

  // Abrir Modal de Edição de Tecnologia
  const openEditTechModal = (tech: Technology) => {
    setEditingTech(tech);
    setTechName(tech.name);
    setTechCategory(tech.category_id);
    setTechDescription(tech.description);
    setTechWebsite(tech.website_url || "");
    setTechLogo(tech.logo_url || "");
    setTechTags(tech.tags ? tech.tags.join(", ") : "");
    setIsTechModalOpen(true);
  };

  // Salvar Tecnologia (Criar ou Editar)
  const handleSaveTechnology = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!techName.trim() || !techDescription.trim()) {
      setFeedback({ type: "error", message: "Nome e descrição são obrigatórios." });
      return;
    }

    setLoadingAction("save-tech");
    setFeedback(null);

    const tagsArray = techTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (editingTech) {
        // Atualizar
        const res = await fetch("/api/admin/ranking/technologies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "edit",
            id: editingTech.id,
            data: {
              name: techName.trim(),
              category_id: techCategory,
              description: techDescription.trim(),
              website_url: techWebsite.trim(),
              logo_url: techLogo.trim(),
              tags: tagsArray,
            },
          }),
        });

        if (!res.ok) throw new Error("Erro ao atualizar tecnologia.");
        const json = await res.json();

        setTechnologies((prev) =>
          prev.map((t) => (t.id === editingTech.id ? json.technology : t))
        );
        setFeedback({ type: "success", message: "Tecnologia atualizada com sucesso!" });
      } else {
        // Criar
        const res = await fetch("/api/admin/ranking/technologies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: techName.trim(),
            category_id: techCategory,
            description: techDescription.trim(),
            website_url: techWebsite.trim(),
            logo_url: techLogo.trim(),
            tags: tagsArray,
          }),
        });

        if (!res.ok) throw new Error("Erro ao criar tecnologia.");
        const json = await res.json();

        setTechnologies((prev) => [json.technology, ...prev]);
        setMetrics((m) => ({
          ...m,
          totalTechnologies: m.totalTechnologies + 1,
          activeTechnologies: m.activeTechnologies + 1,
        }));
        setFeedback({ type: "success", message: "Tecnologia criada com sucesso!" });
      }

      setIsTechModalOpen(false);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Erro ao salvar tecnologia." });
    } finally {
      setLoadingAction(null);
    }
  };

  // Alternar Status Ativo / Inativo
  const handleToggleStatus = async (tech: Technology) => {
    setLoadingAction(`toggle-${tech.id}`);
    try {
      const res = await fetch("/api/admin/ranking/technologies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle", id: tech.id }),
      });

      if (!res.ok) throw new Error("Falha ao alternar status.");
      const json = await res.json();

      setTechnologies((prev) =>
        prev.map((t) => (t.id === tech.id ? { ...t, is_active: json.is_active } : t))
      );
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Erro ao alternar status." });
    } finally {
      setLoadingAction(null);
    }
  };

  // Eliminar Tecnologia
  const handleDeleteTechnology = async (tech: Technology) => {
    if (!confirm(`Tem a certeza que deseja eliminar a tecnologia "${tech.name}" e todos os seus votos?`)) {
      return;
    }

    setLoadingAction(`delete-${tech.id}`);
    try {
      const res = await fetch(`/api/admin/ranking/technologies?id=${encodeURIComponent(tech.id)}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Falha ao eliminar tecnologia.");

      setTechnologies((prev) => prev.filter((t) => t.id !== tech.id));
      setMetrics((m) => ({
        ...m,
        totalTechnologies: Math.max(0, m.totalTechnologies - 1),
        activeTechnologies: tech.is_active ? Math.max(0, m.activeTechnologies - 1) : m.activeTechnologies,
      }));
      setFeedback({ type: "success", message: "Tecnologia eliminada com sucesso." });
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Erro ao eliminar tecnologia." });
    } finally {
      setLoadingAction(null);
    }
  };

  // Salvar Nova Categoria
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catId.trim() || !catName.trim() || !catDesc.trim()) {
      setFeedback({ type: "error", message: "Todos os campos da categoria são obrigatórios." });
      return;
    }

    setLoadingAction("save-cat");
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/ranking/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: catId.trim().toLowerCase(),
          name: catName.trim(),
          description: catDesc.trim(),
          icon: catIcon.trim(),
        }),
      });

      if (!res.ok) throw new Error("Falha ao criar categoria.");
      const json = await res.json();

      setCategories((prev) => [...prev, json.category]);
      setMetrics((m) => ({ ...m, totalCategories: m.totalCategories + 1 }));
      setFeedback({ type: "success", message: "Categoria adicionada com sucesso!" });
      setIsCategoryModalOpen(false);
      setCatId("");
      setCatName("");
      setCatDesc("");
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Erro ao criar categoria." });
    } finally {
      setLoadingAction(null);
    }
  };

  // Filtragem da Lista de Tecnologias
  const filteredTechs = technologies.filter((t) => {
    const matchesSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = categoryFilter === "all" || t.category_id === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Cabeçalho da Página */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-violet-700" />
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Gestão do Ranking de Tecnologias
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Controle total de tecnologias, categorias, moderação de votos e estatísticas comunitárias lusófonas.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={openCreateTechModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Tecnologia</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCategoryModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition cursor-pointer"
          >
            <FolderPlus className="w-4 h-4" />
            <span>Nova Categoria</span>
          </button>
        </div>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-3.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <span>{feedback.message}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Métricas Principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Tecnologias</span>
            <Layers className="w-4 h-4 text-violet-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">{metrics.totalTechnologies}</span>
            <span className="text-[11px] text-emerald-600 font-semibold">
              ({metrics.activeTechnologies} ativas)
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Total de Votos</span>
            <Vote className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-gray-900">{metrics.totalVotes.toLocaleString()}</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Up / Down</span>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-emerald-600 font-bold">↑</span>
              <span className="text-rose-600 font-bold">↓</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 text-xs font-black">
            <span className="text-emerald-700 text-lg">+{metrics.totalUpvotes}</span>
            <span className="text-gray-300">/</span>
            <span className="text-rose-700 text-lg">-{metrics.totalDownvotes}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Categorias</span>
            <FolderPlus className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-2xl font-black text-gray-900">{metrics.totalCategories}</span>
        </div>
      </div>

      {/* Tabs de Navegação */}
      <div className="border-b border-gray-200 flex items-center gap-4 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab("technologies")}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === "technologies"
              ? "border-violet-700 text-violet-800"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Tecnologias ({technologies.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("categories")}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === "categories"
              ? "border-violet-700 text-violet-800"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Categorias ({categories.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("votes")}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === "votes"
              ? "border-violet-700 text-violet-800"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Votos & Moderação Recente
        </button>
      </div>

      {/* =============================================================
          TAB 1: GESTÃO DE TECNOLOGIAS
          ============================================================= */}
      {activeTab === "technologies" && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
          {/* Barra de Filtros Interna */}
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filtrar por nome ou tag..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs font-semibold bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1.5 text-gray-700"
              >
                <option value="all">Todas as Categorias</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tabela de Tecnologias */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-3 px-4">Posição & Nome</th>
                  <th className="py-3 px-3">Categoria</th>
                  <th className="py-3 px-3 text-center">Score</th>
                  <th className="py-3 px-3 text-center">Votos (↑ / ↓)</th>
                  <th className="py-3 px-3 text-center">Estado</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredTechs.map((tech, idx) => {
                  const cat = categories.find((c) => c.id === tech.category_id);
                  const isToggling = loadingAction === `toggle-${tech.id}`;
                  const isDeleting = loadingAction === `delete-${tech.id}`;

                  return (
                    <tr key={tech.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-gray-400 font-bold w-6">#{idx + 1}</span>
                          <div className="w-8 h-8 rounded-lg bg-gray-100 p-1 border border-gray-200 flex items-center justify-center shrink-0">
                            {tech.logo_url ? (
                              <img src={tech.logo_url} alt="" className="w-full h-full object-contain" />
                            ) : (
                              <Globe className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block">{tech.name}</span>
                            <span className="text-[10px] text-gray-400 font-mono">{tech.slug}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-200">
                          {cat?.name || tech.category_id}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center font-black">
                        <span
                          className={`px-2 py-0.5 rounded ${
                            tech.score > 0
                              ? "text-emerald-700 bg-emerald-50"
                              : tech.score < 0
                              ? "text-rose-700 bg-rose-50"
                              : "text-gray-600 bg-gray-100"
                          }`}
                        >
                          {tech.score > 0 ? `+${tech.score}` : tech.score}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center font-semibold text-gray-600">
                        <span className="text-emerald-600">{tech.upvotes_count} ↑</span>
                        <span className="mx-1 text-gray-300">/</span>
                        <span className="text-rose-600">{tech.downvotes_count} ↓</span>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(tech)}
                          disabled={isToggling}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold transition cursor-pointer ${
                            tech.is_active
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {tech.is_active ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Ativa</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-gray-400" />
                              <span>Inativa</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditTechModal(tech)}
                            className="p-1 text-gray-500 hover:text-violet-700 hover:bg-violet-50 rounded transition"
                            title="Editar tecnologia"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteTechnology(tech)}
                            disabled={isDeleting}
                            className="p-1 text-gray-500 hover:text-rose-700 hover:bg-rose-50 rounded transition"
                            title="Eliminar tecnologia"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =============================================================
          TAB 2: GESTÃO DE CATEGORIAS
          ============================================================= */}
      {activeTab === "categories" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const techCount = technologies.filter((t) => t.category_id === cat.id).length;
            return (
              <div key={cat.id} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                      <FolderPlus className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{cat.name}</h3>
                      <span className="text-[10px] text-gray-400 font-mono">id: {cat.id}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {techCount} techs
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mt-2 line-clamp-2">
                  {cat.description}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* =============================================================
          TAB 3: VOTOS & MODERAÇÃO RECENTE
          ============================================================= */}
      {activeTab === "votes" && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">
              Distribuição de Votos por País Lusófono
            </h3>
            <span className="text-xs text-gray-500">Últimos registos</span>
          </div>

          {/* Gráfico / Barras de Distribuição por País */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
            {Object.entries(metrics.countryVoteStats).map(([code, count]) => (
              <div key={code} className="bg-gray-50 rounded-xl p-3 border border-gray-200/80 text-center">
                <span className="text-xs font-bold text-gray-700 block">{code}</span>
                <span className="text-lg font-black text-gray-900">{count}</span>
                <span className="text-[10px] text-gray-400 block">votos</span>
              </div>
            ))}
          </div>

          {/* Log de Votos Recentes */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-bold text-gray-500 uppercase">
                  <th className="py-2.5 px-3">Tecnologia</th>
                  <th className="py-2.5 px-3">Voto</th>
                  <th className="py-2.5 px-3">País</th>
                  <th className="py-2.5 px-3">Utilizador ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {initialData.recentVotes.slice(0, 15).map((vote) => {
                  const tech = technologies.find((t) => t.id === vote.technology_id);
                  return (
                    <tr key={vote.id} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-semibold text-gray-900">
                        {tech?.name || vote.technology_id}
                      </td>
                      <td className="py-2 px-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                            vote.vote_type === "up"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {vote.vote_type === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                          {vote.vote_type === "up" ? "Upvote" : "Downvote"}
                        </span>
                      </td>
                      <td className="py-2 px-3 font-mono text-gray-600">{vote.country_code}</td>
                      <td className="py-2 px-3 font-mono text-gray-400 truncate max-w-[150px]">
                        {vote.user_id}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =============================================================
          MODAL: CRIAR / EDITAR TECNOLOGIA
          ============================================================= */}
      {isTechModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-base font-bold text-gray-900">
                {editingTech ? "Editar Tecnologia" : "Adicionar Nova Tecnologia ao Ranking"}
              </h3>
              <button
                type="button"
                onClick={() => setIsTechModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTechnology} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nome da Tecnologia *</label>
                <input
                  type="text"
                  required
                  value={techName}
                  onChange={(e) => setTechName(e.target.value)}
                  placeholder="Ex: Next.js, Python, PostgreSQL..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-600"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Categoria *</label>
                <select
                  value={techCategory}
                  onChange={(e) => setTechCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-600"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Descrição Concisa *</label>
                <textarea
                  required
                  rows={3}
                  value={techDescription}
                  onChange={(e) => setTechDescription(e.target.value)}
                  placeholder="Explicação do propósito e vantagens da tecnologia..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Website Oficial</label>
                  <input
                    type="url"
                    value={techWebsite}
                    onChange={(e) => setTechWebsite(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">URL do Logo (SVG / PNG)</label>
                  <input
                    type="url"
                    value={techLogo}
                    onChange={(e) => setTechLogo(e.target.value)}
                    placeholder="https://... logo.svg"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={techTags}
                  onChange={(e) => setTechTags(e.target.value)}
                  placeholder="Frontend, React, SSR, Vercel"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-600"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTechModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-semibold"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={loadingAction === "save-tech"}
                  className="px-5 py-2 rounded-lg bg-violet-700 hover:bg-violet-800 text-white font-bold transition flex items-center gap-1.5"
                >
                  {loadingAction === "save-tech" && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingTech ? "Guardar Alterações" : "Criar Tecnologia"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =============================================================
          MODAL: CRIAR CATEGORIA
          ============================================================= */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-base font-bold text-gray-900">Adicionar Nova Categoria</h3>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">ID / Slug *</label>
                <input
                  type="text"
                  required
                  value={catId}
                  onChange={(e) => setCatId(e.target.value.toLowerCase().replace(/\s+/g, "_"))}
                  placeholder="Ex: cybersecurity, cloud..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-600"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Nome de Apresentação *</label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="Ex: Cibersegurança, Cloud Computing..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-600"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Descrição *</label>
                <textarea
                  required
                  rows={2}
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  placeholder="Descrição da área técnica..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-600"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-semibold"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={loadingAction === "save-cat"}
                  className="px-5 py-2 rounded-lg bg-violet-700 hover:bg-violet-800 text-white font-bold transition flex items-center gap-1.5"
                >
                  {loadingAction === "save-cat" && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Criar Categoria</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
