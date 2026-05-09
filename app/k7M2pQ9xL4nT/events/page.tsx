import { supabaseAdmin } from "@/lib/supabase/admin";

type AppEvent = {
  event_type: string;
  user_email: string | null;
  route: string | null;
  created_at: string;
};

type DbActivity = {
  when: string;
  source: string;
  action: string;
  reference: string;
};

async function getEventData() {
  const [appEventsResult, usersResult, adminEventsResult, scholarshipsResult, communitiesResult] =
    await Promise.all([
      supabaseAdmin
        .from("app_events")
        .select("event_type, user_email, route, created_at")
        .order("created_at", { ascending: false })
        .limit(600),
      supabaseAdmin
        .from("users")
        .select("email, created_at")
        .order("created_at", { ascending: false })
        .limit(120),
      supabaseAdmin
        .from("admin_events")
        .select("title, country, created_at")
        .order("created_at", { ascending: false })
        .limit(120),
      supabaseAdmin
        .from("admin_scholarships")
        .select("title, country, created_at")
        .order("created_at", { ascending: false })
        .limit(120),
      supabaseAdmin
        .from("admin_communities")
        .select("name, country, created_at")
        .order("created_at", { ascending: false })
        .limit(120),
    ]);

  const events = (appEventsResult.data as AppEvent[] | null) ?? [];
  const eventTypes = new Map<string, number>();
  for (const event of events) {
    eventTypes.set(event.event_type, (eventTypes.get(event.event_type) ?? 0) + 1);
  }

  const users = (usersResult.data as Array<{ email: string | null; created_at: string }> | null) ?? [];
  const adminEvents =
    (adminEventsResult.data as Array<{ title: string; country: string | null; created_at: string }> | null) ?? [];
  const scholarships =
    (scholarshipsResult.data as Array<{ title: string; country: string | null; created_at: string }> | null) ?? [];
  const communities =
    (communitiesResult.data as Array<{ name: string; country: string | null; created_at: string }> | null) ?? [];

  const dbActivities: DbActivity[] = [
    ...users.map((u) => ({
      when: u.created_at,
      source: "users",
      action: "user_created",
      reference: u.email ?? "unknown",
    })),
    ...adminEvents.map((e) => ({
      when: e.created_at,
      source: "admin_events",
      action: "event_post_created",
      reference: `${e.title} (${e.country ?? "-"})`,
    })),
    ...scholarships.map((s) => ({
      when: s.created_at,
      source: "admin_scholarships",
      action: "scholarship_post_created",
      reference: `${s.title} (${s.country ?? "-"})`,
    })),
    ...communities.map((c) => ({
      when: c.created_at,
      source: "admin_communities",
      action: "community_post_created",
      reference: `${c.name} (${c.country ?? "-"})`,
    })),
  ]
    .sort((a, b) => new Date(b.when).getTime() - new Date(a.when).getTime())
    .slice(0, 120);

  return {
    total: events.length,
    byType: [...eventTypes.entries()].sort((a, b) => b[1] - a[1]),
    recent: events.slice(0, 60),
    dbActivities,
    dbCounts: {
      users: users.length,
      adminEvents: adminEvents.length,
      scholarships: scholarships.length,
      communities: communities.length,
    },
  };
}

export default async function AdminEventsPage() {
  const data = await getEventData();

  return (
    <main className="space-y-4">
      <header className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Eventos</h1>
        <p className="mt-1 text-sm text-gray-600">Auditoria de eventos da aplicacao.</p>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-500">Total de eventos carregados</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">{data.total}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {data.byType.map(([type, total]) => (
            <span key={type} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
              {type}: {total}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Monitoramento de base de dados</h2>
        <p className="mt-1 text-sm text-gray-600">
          Atividade das tabelas principais que impactam a plataforma.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-700">users: {data.dbCounts.users}</span>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-700">admin_events: {data.dbCounts.adminEvents}</span>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-700">admin_scholarships: {data.dbCounts.scholarships}</span>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-700">admin_communities: {data.dbCounts.communities}</span>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Linha do tempo de eventos</h2>
        <div className="mt-4 overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="py-2 pr-3">Quando</th>
                <th className="py-2 pr-3">Evento</th>
                <th className="py-2 pr-3">Email</th>
                <th className="py-2 pr-3">Rota</th>
              </tr>
            </thead>
            <tbody>
              {data.recent.length ? (
                data.recent.map((item, index) => (
                  <tr key={`${item.created_at}-${index}`} className="border-b border-gray-100">
                    <td className="py-2.5 pr-3 text-gray-700">{new Date(item.created_at).toLocaleString("pt-BR")}</td>
                    <td className="py-2.5 pr-3 text-gray-900">{item.event_type}</td>
                    <td className="py-2.5 pr-3 text-gray-700">{item.user_email ?? "-"}</td>
                    <td className="py-2.5 pr-3 text-gray-700">{item.route ?? "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 text-gray-500" colSpan={4}>
                    Sem eventos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Linha do tempo de atividade no banco</h2>
        <div className="mt-4 overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="py-2 pr-3">Quando</th>
                <th className="py-2 pr-3">Tabela</th>
                <th className="py-2 pr-3">Acao</th>
                <th className="py-2 pr-3">Referencia</th>
              </tr>
            </thead>
            <tbody>
              {data.dbActivities.length ? (
                data.dbActivities.map((item, index) => (
                  <tr key={`${item.when}-${item.source}-${index}`} className="border-b border-gray-100">
                    <td className="py-2.5 pr-3 text-gray-700">{new Date(item.when).toLocaleString("pt-BR")}</td>
                    <td className="py-2.5 pr-3 text-gray-900">{item.source}</td>
                    <td className="py-2.5 pr-3 text-gray-700">{item.action}</td>
                    <td className="py-2.5 pr-3 text-gray-700">{item.reference}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 text-gray-500" colSpan={4}>
                    Sem atividade de base de dados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
