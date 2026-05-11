import { supabaseAdmin } from "@/lib/supabase/admin";
import { AdminContentManager } from "@/components/admin/AdminContentManager";
import Link from "next/link";
import { adminPath } from "@/lib/admin-routes";

async function getLatestRows() {
  const [events, scholarships, communities] = await Promise.all([
    supabaseAdmin
      .from("admin_events")
      .select("id, title, country, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabaseAdmin
      .from("admin_scholarships")
      .select("id, title, country, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabaseAdmin
      .from("admin_communities")
      .select("id, name, country, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return {
    events: events.data ?? [],
    scholarships: scholarships.data ?? [],
    communities: communities.data ?? [],
  };
}

export default async function AdminContentPage() {
  const latest = await getLatestRows();

  return (
    <main className="space-y-4">
      <header className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Publicações</h1>
            <p className="mt-1 text-sm text-gray-600">
              Cadastre eventos, bolsas e comunidades. Ao salvar, vai automaticamente para o banco.
            </p>
          </div>
          <Link
            href={adminPath("/content/ver")}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Ver e editar
          </Link>
        </div>
      </header>

      <AdminContentManager
        latestEvents={latest.events}
        latestScholarships={latest.scholarships}
        latestCommunities={latest.communities}
      />
    </main>
  );
}
