"use client";

import { useState } from "react";
import Link from "next/link";
import { DeletePublicationForm } from "@/components/admin/DeletePublicationForm";
import { updateAdminCommunity, updateAdminEvent, updateAdminScholarship, deleteAdminCommunity, deleteAdminEvent, deleteAdminScholarship } from "@/app/k7M2pQ9xL4nT/content/actions";
import { LUSOPHONE_COUNTRIES, EVENT_CATEGORIES, SCHOLARSHIP_LEVELS, COMMUNITY_CATEGORIES } from "@/data/admin-form-data";
import { adminPath } from "@/lib/admin-routes";

type EventItem = {
  id: string | number;
  title?: string;
  description?: string;
  date_label?: string;
  location?: string;
  country?: string | null;
  category?: string;
  organizer?: string;
  link?: string;
  image_url?: string;
  is_published?: boolean;
  created_at?: string;
};

type ScholarshipItem = {
  id: string | number;
  title?: string;
  description?: string;
  country?: string | null;
  level?: string;
  deadline?: string;
  link?: string;
  image_url?: string;
  is_published?: boolean;
  created_at?: string;
};

type CommunityItem = {
  id: string | number;
  name?: string;
  description?: string;
  country?: string | null;
  category?: string;
  location?: string;
  link?: string;
  logo_url?: string;
  is_published?: boolean;
  created_at?: string;
};

type AdminContentViewProps = {
  events: EventItem[];
  scholarships: ScholarshipItem[];
  communities: CommunityItem[];
};

function formatDate(dateString?: string) {
  if (!dateString) return "-";
  try {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

function excerpt(text?: string, length = 120) {
  if (!text) return "Sem descrição disponível.";
  if (text.length <= length) return text;
  return `${text.slice(0, length).trim()}...`;
}

function Input({ name, label, placeholder, defaultValue }: { name: string; label: string; placeholder?: string; defaultValue?: string | null; }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">{label}</span>
      <input
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-700"
      />
    </label>
  );
}

function Select({ name, label, options, defaultValue }: { name: string; label: string; options: string[]; defaultValue?: string | null; }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-700 bg-white"
      >
        <option value="">-- Selecione --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function MultiSelectEdit({ name, label, options, defaultValues }: { name: string; label: string; options: string[]; defaultValues?: string[]; }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">{label}</span>
      <select
        name={name}
        multiple
        defaultValue={defaultValues ?? []}
        className="h-40 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-700 bg-white"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-500 mt-1">Segure Ctrl/Cmd para selecionar múltiplas categorias.</p>
    </label>
  );
}

function DatePickerEdit({ name, label, defaultValue }: { name: string; label: string; defaultValue?: string | null; }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">{label}</span>
      <input
        type="date"
        name={name}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-700 bg-white"
      />
    </label>
  );
}

function CardSectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4 border-b border-gray-200 pb-3">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">Total: {count}</p>
      </div>
      <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700">{count}</span>
    </div>
  );
}

const adminButtonInteractive = "transition duration-200 active:scale-95";

export function AdminContentView({ events, scholarships, communities }: AdminContentViewProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sectionButtonClass = "rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 " + adminButtonInteractive;

  return (
    <main className="space-y-4">
      <header className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ver e editar publicações</h1>
            <p className="mt-1 text-sm text-gray-600">Edite Eventos, Bolsas e Comunidades ja cadastrados.</p>
          </div>
          <Link
            href={adminPath("/content")}
            className={`inline-flex items-center justify-center rounded-lg bg-violet-700 px-4 py-2 text-sm font-medium text-white hover:bg-violet-600 ${adminButtonInteractive}`}
          >
            Nova postagem
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="#admin-events" className={sectionButtonClass}>
            Eventos ({events.length})
          </a>
          <a href="#admin-scholarships" className={sectionButtonClass}>
            Bolsas ({scholarships.length})
          </a>
          <a href="#admin-communities" className={sectionButtonClass}>
            Comunidades ({communities.length})
          </a>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section id="admin-events" className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
          <CardSectionHeader title="Eventos" count={events.length} />
          <div className="space-y-3">
            {events.map((item) => {
              const key = `event-${item.id}`;
              const expanded = Boolean(expandedItems[key]);

              return (
                <article key={key} className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/80">
                  <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">{item.title || "Evento sem titulo"}</p>
                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-600">ID #{item.id}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.country ?? "Sem país"} • {formatDate(item.created_at)}
                      </div>
                      <p className="text-sm text-gray-600">{excerpt(item.description)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleItem(key)}
                      className={`self-start rounded-lg bg-violet-700 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-600 ${adminButtonInteractive}`}
                    >
                      {expanded ? "Minimizar" : "Expandir"}
                    </button>
                  </div>

                  {expanded ? (
                    <div className="border-t border-gray-200 bg-white p-4">
                      <form action={updateAdminEvent} className="space-y-3">
                        <input type="hidden" name="id" value={item.id} />
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <Input name="title" label="Titulo" placeholder="Ex: Conferência de Tecnologia" defaultValue={item.title} />
                          <Select name="country" label="Pais" options={LUSOPHONE_COUNTRIES} defaultValue={item.country} />
                          <DatePickerEdit name="date_label" label="Data" defaultValue={item.date_label} />
                          <Input name="location" label="Local" placeholder="Ex: Centro de Convenções" defaultValue={item.location} />
                          <Select name="category" label="Categoria" options={EVENT_CATEGORIES} defaultValue={item.category} />
                          <Input name="organizer" label="Organizador" placeholder="Ex: Comunidade X" defaultValue={item.organizer} />
                          <Input name="link" label="Link" placeholder="https://..." defaultValue={item.link} />
                          <Input name="image_url" label="Imagem URL" placeholder="https://..." defaultValue={item.image_url} />
                        </div>
                        <label className="block">
                          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">Descricao</span>
                          <textarea
                            name="description"
                            defaultValue={item.description ?? ""}
                            placeholder="Descreva o evento em detalhe..."
                            className="min-h-[10rem] w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-700"
                          />
                        </label>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                            <input name="is_published" type="checkbox" defaultChecked={Boolean(item.is_published)} />
                            Publicado
                          </label>
                          <button className={`rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-600 ${adminButtonInteractive}`}>
                            Guardar alteracoes
                          </button>
                        </div>
                      </form>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <DeletePublicationForm id={Number(item.id)} type="event" label={item.title ?? "Evento"} action={deleteAdminEvent} />
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">{item.category ?? "Sem categoria"}</span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">{item.location ?? "Sem local"}</span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          {item.is_published ? "Publicado" : "Rascunho"}
                        </span>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section id="admin-scholarships" className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
          <CardSectionHeader title="Bolsas" count={scholarships.length} />
          <div className="space-y-3">
            {scholarships.map((item) => {
              const key = `scholarship-${item.id}`;
              const expanded = Boolean(expandedItems[key]);

              return (
                <article key={key} className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/80">
                  <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">{item.title || "Bolsa sem titulo"}</p>
                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-600">ID #{item.id}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.country ?? "Sem país"} • {formatDate(item.created_at)}
                      </div>
                      <p className="text-sm text-gray-600">{excerpt(item.description)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleItem(key)}
                      className={`self-start rounded-lg bg-violet-700 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-600 ${adminButtonInteractive}`}
                    >
                      {expanded ? "Minimizar" : "Expandir"}
                    </button>
                  </div>

                  {expanded ? (
                    <div className="border-t border-gray-200 bg-white p-4">
                      <form action={updateAdminScholarship} className="space-y-3">
                        <input type="hidden" name="id" value={item.id} />
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <Input name="title" label="Titulo" placeholder="Ex: Bolsa de Mestrado" defaultValue={item.title} />
                          <Select name="country" label="Pais" options={LUSOPHONE_COUNTRIES} defaultValue={item.country} />
                          <Select name="level" label="Nivel" options={SCHOLARSHIP_LEVELS} defaultValue={item.level} />
                          <DatePickerEdit name="deadline" label="Prazo" defaultValue={item.deadline} />
                          <Input name="link" label="Link" placeholder="https://..." defaultValue={item.link} />
                          <Input name="image_url" label="Imagem URL" placeholder="https://..." defaultValue={item.image_url} />
                        </div>
                        <label className="block">
                          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">Descricao</span>
                          <textarea
                            name="description"
                            defaultValue={item.description ?? ""}
                            placeholder="Descreva a bolsa, requisitos e beneficios..."
                            className="min-h-[10rem] w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-700"
                          />
                        </label>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                            <input name="is_published" type="checkbox" defaultChecked={Boolean(item.is_published)} />
                            Publicado
                          </label>
                          <button className={`rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-600 ${adminButtonInteractive}`}>
                            Guardar alteracoes
                          </button>
                        </div>
                      </form>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <DeletePublicationForm id={Number(item.id)} type="scholarship" label={item.title ?? "Bolsa"} action={deleteAdminScholarship} />
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">{item.level ?? "Sem nivel"}</span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">{item.deadline ?? "Sem prazo"}</span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          {item.is_published ? "Publicado" : "Rascunho"}
                        </span>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section id="admin-communities" className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
          <CardSectionHeader title="Comunidades" count={communities.length} />
          <div className="space-y-3">
            {communities.map((item) => {
              const key = `community-${item.id}`;
              const expanded = Boolean(expandedItems[key]);

              return (
                <article key={key} className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/80">
                  <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">{item.name || "Comunidade sem nome"}</p>
                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-600">ID #{item.id}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.country ?? "Sem país"} • {formatDate(item.created_at)}
                      </div>
                      <p className="text-sm text-gray-600">{excerpt(item.description)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleItem(key)}
                      className={`self-start rounded-lg bg-violet-700 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-600 ${adminButtonInteractive}`}
                    >
                      {expanded ? "Minimizar" : "Expandir"}
                    </button>
                  </div>

                  {expanded ? (
                    <div className="border-t border-gray-200 bg-white p-4">
                      <form action={updateAdminCommunity} className="space-y-3">
                        <input type="hidden" name="id" value={item.id} />
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <Input name="name" label="Nome" placeholder="Ex: Comunidade de Desenvolvedores" defaultValue={item.name} />
                          <Select name="country" label="Pais" options={LUSOPHONE_COUNTRIES} defaultValue={item.country} />
                          <MultiSelectEdit
                            name="categories"
                            label="Categorias"
                            options={COMMUNITY_CATEGORIES}
                            defaultValues={item.category ? item.category.split(",").map((value) => value.trim()).filter(Boolean) : []}
                          />
                          <Input name="location" label="Localizacao" placeholder="Ex: Lisboa, Portugal" defaultValue={item.location} />
                          <Input name="link" label="Link" placeholder="https://..." defaultValue={item.link} />
                          <Input name="logo_url" label="Logo URL" placeholder="https://..." defaultValue={item.logo_url} />
                        </div>
                        <label className="block">
                          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">Descricao</span>
                          <textarea
                            name="description"
                            defaultValue={item.description ?? ""}
                            placeholder="Descreva a comunidade, objetivos e atividades..."
                            className="min-h-[10rem] w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-700"
                          />
                        </label>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                            <input name="is_published" type="checkbox" defaultChecked={Boolean(item.is_published)} />
                            Publicado
                          </label>
                          <button className={`rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-600 ${adminButtonInteractive}`}>
                            Guardar alteracoes
                          </button>
                        </div>
                      </form>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <DeletePublicationForm id={Number(item.id)} type="community" label={item.name ?? "Comunidade"} action={deleteAdminCommunity} />
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">{item.category ?? "Sem categorias"}</span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">{item.location ?? "Sem local"}</span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          {item.is_published ? "Publicado" : "Rascunho"}
                        </span>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
