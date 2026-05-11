import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { adminPath } from "@/lib/admin-routes";
import { DeletePublicationForm } from "@/components/admin/DeletePublicationForm";
import {
  updateAdminCommunity,
  updateAdminEvent,
  updateAdminScholarship,
  deleteAdminCommunity,
  deleteAdminEvent,
  deleteAdminScholarship,
} from "@/app/k7M2pQ9xL4nT/content/actions";
import {
  LUSOPHONE_COUNTRIES,
  EVENT_CATEGORIES,
  SCHOLARSHIP_LEVELS,
  COMMUNITY_CATEGORIES,
} from "@/data/admin-form-data";

async function getContentRows() {
  const [events, scholarships, communities] = await Promise.all([
    supabaseAdmin
      .from("admin_events")
      .select("id, title, description, date_label, location, country, category, organizer, link, image_url, is_published, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
    supabaseAdmin
      .from("admin_scholarships")
      .select("id, title, description, country, level, deadline, link, image_url, is_published, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
    supabaseAdmin
      .from("admin_communities")
      .select("id, name, description, country, category, location, link, logo_url, is_published, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  return {
    events: events.data ?? [],
    scholarships: scholarships.data ?? [],
    communities: communities.data ?? [],
  };
}

function Input({
  name,
  label,
  placeholder,
  defaultValue,
}: {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string | null;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">{label}</span>
      <input
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-violet-700"
      />
    </label>
  );
}

function Select({
  name,
  label,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  options: string[];
  defaultValue?: string | null;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-violet-700 bg-white"
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

function MultiSelectEdit({
  name,
  label,
  options,
  defaultValues,
}: {
  name: string;
  label: string;
  options: string[];
  defaultValues?: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">{label}</span>
      <select
        name={name}
        multiple
        defaultValue={defaultValues ?? []}
        className="h-40 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-violet-700 bg-white"
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

function DatePickerEdit({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">{label}</span>
      <input
        type="date"
        name={name}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-violet-700 bg-white"
      />
    </label>
  );
}

export default async function AdminContentViewPage() {
  const data = await getContentRows();

  return (
    <main className="space-y-4">
      <header className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ver e editar publicacoes</h1>
            <p className="mt-1 text-sm text-gray-600">Edite Eventos, Bolsas e Comunidades ja cadastrados.</p>
          </div>
          <Link href={adminPath("/content")} className="rounded-lg bg-violet-700 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            Nova postagem
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="#admin-events" className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200">
            Eventos ({data.events.length})
          </a>
          <a href="#admin-scholarships" className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200">
            Bolsas ({data.scholarships.length})
          </a>
          <a href="#admin-communities" className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200">
            Comunidades ({data.communities.length})
          </a>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section id="admin-events" className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Eventos</h2>
          <div className="mt-4 space-y-3">
          {data.events.map((item: any) => (
            <div key={`event-${item.id}`} className="rounded-xl border border-gray-200 bg-gray-50/60 p-3 md:p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-600">
                  ID #{item.id}
                </span>
              </div>
              <form action={updateAdminEvent} className="space-y-2">
                <input type="hidden" name="id" value={item.id} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                  <textarea name="description" defaultValue={item.description} placeholder="Descreva o evento em detalhe..." className="min-h-24 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-violet-700" />
                </label>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                    <input name="is_published" type="checkbox" defaultChecked={Boolean(item.is_published)} />
                    Publicado
                  </label>
                  <button className="rounded-md bg-violet-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-600">
                    Guardar alteracoes
                  </button>
                </div>
              </form>
              <DeletePublicationForm
                id={item.id}
                type="event"
                label={item.title}
                action={deleteAdminEvent}
              />
            </div>
          ))}
        </div>
      </section>

      <section id="admin-scholarships" className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Bolsas</h2>
        <div className="mt-4 space-y-3">
          {data.scholarships.map((item: any) => (
            <div key={`scholarship-${item.id}`} className="rounded-xl border border-gray-200 bg-gray-50/60 p-3 md:p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-600">
                  ID #{item.id}
                </span>
              </div>
              <form action={updateAdminScholarship} className="space-y-2">
                <input type="hidden" name="id" value={item.id} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Input name="title" label="Titulo" placeholder="Ex: Bolsa de Mestrado" defaultValue={item.title} />
                  <Select name="country" label="Pais" options={LUSOPHONE_COUNTRIES} defaultValue={item.country} />
                  <Select name="level" label="Nivel" options={SCHOLARSHIP_LEVELS} defaultValue={item.level} />
                  <DatePickerEdit name="deadline" label="Prazo" defaultValue={item.deadline} />
                  <Input name="link" label="Link" placeholder="https://..." defaultValue={item.link} />
                  <Input name="image_url" label="Imagem URL" placeholder="https://..." defaultValue={item.image_url} />
                </div>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">Descricao</span>
                  <textarea name="description" defaultValue={item.description} placeholder="Descreva a bolsa, requisitos e benefícios..." className="min-h-24 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-violet-700" />
                </label>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                    <input name="is_published" type="checkbox" defaultChecked={Boolean(item.is_published)} />
                    Publicado
                  </label>
                  <button className="rounded-md bg-violet-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-600">
                    Guardar alteracoes
                  </button>
                </div>
              </form>
              <DeletePublicationForm
                id={item.id}
                type="scholarship"
                label={item.title}
                action={deleteAdminScholarship}
              />
            </div>
          ))}
        </div>
      </section>

      <section id="admin-communities" className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Comunidades</h2>
        <div className="mt-4 space-y-3">
          {data.communities.map((item: any) => (
            <div key={`community-${item.id}`} className="rounded-xl border border-gray-200 bg-gray-50/60 p-3 md:p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-600">
                  ID #{item.id}
                </span>
              </div>

              
              <form action={updateAdminCommunity} className="space-y-2">
                <input type="hidden" name="id" value={item.id} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Input name="name" label="Nome" placeholder="Ex: Comunidade de Desenvolvedores" defaultValue={item.name} />
                  <Select name="country" label="Pais" options={LUSOPHONE_COUNTRIES} defaultValue={item.country} />
                  <MultiSelectEdit
                    name="categories"
                    label="Categorias"
                    options={COMMUNITY_CATEGORIES}
                    defaultValues={item.category ? item.category.split(",").map((value: string) => value.trim()).filter(Boolean) : []}
                  />
                  <Input name="location" label="Localizacao" placeholder="Ex: Lisboa, Portugal" defaultValue={item.location} />
                  <Input name="link" label="Link" placeholder="https://..." defaultValue={item.link} />
                  <Input name="logo_url" label="Logo URL" placeholder="https://..." defaultValue={item.logo_url} />
                </div>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">Descricao</span>
                  <textarea name="description" defaultValue={item.description} placeholder="Descreva a comunidade, objetivos e atividades..." className="min-h-24 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-violet-700" />
                </label>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                    <input name="is_published" type="checkbox" defaultChecked={Boolean(item.is_published)} />
                    Publicado
                  </label>
                  <button className="rounded-md bg-violet-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-600">
                    Guardar alteracoes
                  </button>
                </div>
              </form>
              <DeletePublicationForm
                id={item.id}
                type="community"
                label={item.name}
                action={deleteAdminCommunity}
              />
            </div>
          ))}
        </div>
      </section>
      </div>
    </main>
  );
}
