import { supabaseAdmin } from "@/lib/supabase/admin";
import { AdminContentView } from "@/components/admin/AdminContentView";

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

  return <AdminContentView {...data} />;
}
