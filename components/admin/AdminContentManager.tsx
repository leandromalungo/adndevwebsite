"use client";

import { useMemo, useState } from "react";
import {
  createAdminCommunity,
  createAdminEvent,
  createAdminScholarship,
} from "@/app/k7M2pQ9xL4nT/content/actions";
import {
  LUSOPHONE_COUNTRIES,
  EVENT_CATEGORIES,
  SCHOLARSHIP_LEVELS,
  COMMUNITY_CATEGORIES,
} from "@/data/admin-form-data";

type PostType = "event" | "scholarship" | "community";

type LatestItem = {
  id: string | number;
  title?: string;
  name?: string;
  country?: string | null;
};

const buttonBase = "rounded-lg px-3 py-2 text-sm font-medium transition duration-200 active:scale-95";

function Input({
  name,
  label,
  placeholder,
  required = false,
}: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      <input
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-700"
      />
    </label>
  );
}

function Select({
  name,
  label,
  options,
  required = false,
}: {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      <select
        name={name}
        required={required}
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

function MultiSelect({
  name,
  label,
  options,
  required = false,
}: {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      <select
        name={name}
        multiple
        required={required}
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

function DatePicker({
  name,
  label,
  required = false,
}: {
  name: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      <input
        type="date"
        name={name}
        required={required}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-700 bg-white"
      />
    </label>
  );
}

export function AdminContentManager({
  latestEvents,
  latestScholarships,
  latestCommunities,
}: {
  latestEvents: LatestItem[];
  latestScholarships: LatestItem[];
  latestCommunities: LatestItem[];
}) {
  const [postType, setPostType] = useState<PostType>("event");

  const latest = useMemo(() => {
    if (postType === "event") return latestEvents;
    if (postType === "scholarship") return latestScholarships;
    return latestCommunities;
  }, [postType, latestEvents, latestScholarships, latestCommunities]);

  return (
    <>
      <section className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Metodo de postagem</h2>
        <p className="mt-1 text-sm text-gray-600">Selecione o tipo e publique manualmente no banco de dados.</p>
        <div className="mt-4 flex flex-wrap gap-2">
            <button
            type="button"
            onClick={() => setPostType("event")}
            className={`${buttonBase} ${
              postType === "event" ? "bg-violet-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Evento
          </button>
          <button
            type="button"
            onClick={() => setPostType("scholarship")}
            className={`${buttonBase} ${
              postType === "scholarship" ? "bg-violet-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Bolsa
          </button>
          <button
            type="button"
            onClick={() => setPostType("community")}
            className={`${buttonBase} ${
              postType === "community" ? "bg-violet-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Comunidade
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
          {postType === "event" && (
            <form action={createAdminEvent} className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Postar novo Evento</h3>
              <Input
                name="title"
                label="Titulo"
                placeholder="Ex: Conferência de Tecnologia 2026"
                required
              />
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Descricao <span className="text-red-500">*</span>
                </span>
                <textarea
                  name="description"
                  required
                  placeholder="Descreva o evento em detalhe..."
                  className="min-h-[10rem] w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-700"
                />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <DatePicker
                  name="date_label"
                  label="Data"
                  required
                />
                <Input name="location" label="Local" placeholder="Ex: Centro de Convenções de Lisboa" required />
                <Select name="country" label="Pais" options={LUSOPHONE_COUNTRIES} required />
                <Select name="category" label="Categoria" options={EVENT_CATEGORIES} required />
                <Input name="organizer" label="Organizador" placeholder="Ex: Comunidade X" required />
                <Input name="link" label="Link" placeholder="https://..." required />
                <Input name="image_url" label="Imagem URL" placeholder="https://..." required />
              </div>
              <button type="submit" className="rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-bold text-white transition duration-200 active:scale-95 hover:bg-violet-600">
                Publicar Evento
              </button>
            </form>
          )}

          {postType === "scholarship" && (
            <form action={createAdminScholarship} className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Postar nova Bolsa</h3>
              <Input
                name="title"
                label="Titulo"
                placeholder="Ex: Bolsa de Mestrado em Engenharia"
                required
              />
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Descrição <span className="text-red-500">*</span>
                </span>
                <textarea
                  name="description"
                  required
                  placeholder="Descreva a bolsa, requisitos e benefícios..."
                  className="min-h-[10rem] w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-700"
                />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Select name="country" label="Pais" options={LUSOPHONE_COUNTRIES} required />
                <Select name="level" label="Nivel" options={SCHOLARSHIP_LEVELS} required />
                <DatePicker
                  name="deadline"
                  label="Prazo"
                  required
                />
                <Input name="link" label="Link" placeholder="https://..." required />
                <Input name="image_url" label="Imagem URL" placeholder="https://..." required />
              </div>
              <button type="submit" className="rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-bold text-white transition duration-200 active:scale-95 hover:bg-violet-600">
                Publicar Bolsa
              </button>
            </form>
          )}

          {postType === "community" && (
            <form action={createAdminCommunity} className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Postar nova Comunidade</h3>
              <Input
                name="name"
                label="Nome"
                placeholder="Ex: Comunidade de Desenvolvedores Lusófona"
                required
              />
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Descrição <span className="text-red-500">*</span>
                </span>
                <textarea
                  name="description"
                  required
                  placeholder="Descreva a comunidade, objetivos e atividades..."
                  className="min-h-[10rem] w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-700"
                />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Select name="country" label="Pais" options={LUSOPHONE_COUNTRIES} required />
                <Input name="location" label="Localização" placeholder="Ex: Lisboa, Portugal" required />
                <Input name="link" label="Link" placeholder="https://..." required />
                <Input name="logo_url" label="Logo URL" placeholder="https://..." required />
                <MultiSelect name="categories" label="Categorias" options={COMMUNITY_CATEGORIES} required={true} />

              </div>
              <button type="submit" className="rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-bold text-white transition duration-200 active:scale-95 hover:bg-violet-600">
                Publicar Comunidade
              </button>
            </form>
          )}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900">
            Ultimas postagens de {postType === "event" ? "eventos" : postType === "scholarship" ? "bolsas" : "comunidades"}
          </h3>
          <div className="mt-3 space-y-2 text-sm">
            {latest.length ? (
              latest.map((row) => (
                <p key={row.id} className="text-gray-700">
                  {row.title || row.name} - {row.country || "-"}
                </p>
              ))
            ) : (
              <p className="text-gray-500">Sem registos ainda.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
