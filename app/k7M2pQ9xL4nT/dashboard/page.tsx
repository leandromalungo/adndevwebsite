import { supabaseAdmin } from "@/lib/supabase/admin";

type AppEvent = {
  event_type: string;
  user_email: string | null;
  route: string | null;
  created_at: string;
  metadata: Record<string, unknown> | null;
  ip_address?: string | null;
  user_agent?: string | null;
};

async function getMetrics() {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const last7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [{ count: totalUsers }, { count: usersToday }] = await Promise.all([
    supabaseAdmin.from("users").select("*", { count: "exact", head: true }),
    supabaseAdmin
      .from("users")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayStart.toISOString()),
  ]);

  let postEvents = 0;
  let postScholarships = 0;
  let postCommunities = 0;
  try {
    const [eventsCount, scholarshipsCount, communitiesCount] = await Promise.all([
      supabaseAdmin.from("admin_events").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("admin_scholarships").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("admin_communities").select("*", { count: "exact", head: true }),
    ]);
    postEvents = eventsCount.count ?? 0;
    postScholarships = scholarshipsCount.count ?? 0;
    postCommunities = communitiesCount.count ?? 0;
  } catch {
    postEvents = 0;
    postScholarships = 0;
    postCommunities = 0;
  }

  let events: AppEvent[] = [];
  try {
    const { data } = await supabaseAdmin
      .from("app_events")
      .select("event_type, user_email, route, created_at, metadata, ip_address, user_agent")
      .gte("created_at", last7d)
      .order("created_at", { ascending: false })
      .limit(500);

    events = (data as AppEvent[] | null) ?? [];
  } catch {
    events = [];
  }

  const loginCount = events.filter((e: AppEvent) => e.event_type === "login_success").length;
  const signupCount = events.filter((e: AppEvent) => e.event_type === "signup_success").length;
  const emailEvents = events.filter((e: AppEvent) => e.event_type === "email_sent");
  const adminAccessEvents = events.filter((e: AppEvent) => e.event_type === "admin_panel_access");
  const adminAccess24h = adminAccessEvents.filter(
    (item) => Date.now() - new Date(item.created_at).getTime() <= 24 * 60 * 60 * 1000
  ).length;

  const flowMap = new Map<string, number>();
  for (const event of events) {
    if (!event.route) continue;
    flowMap.set(event.route, (flowMap.get(event.route) ?? 0) + 1);
  }

  const topFlows = [...flowMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([route, total]) => ({ route, total }));

  return {
    totalUsers: totalUsers ?? 0,
    usersToday: usersToday ?? 0,
    loginCount,
    signupCount,
    emailCount: emailEvents.length,
    emailRecipients: emailEvents.slice(0, 10).map((item) => ({
      email: item.user_email ?? "desconhecido",
      when: new Date(item.created_at).toLocaleString("pt-BR"),
      template: String(item.metadata?.template ?? "nao_informado"),
    })),
    recentEvents: events.slice(0, 20),
    topFlows,
    postEvents,
    postScholarships,
    postCommunities,
    adminAccessCount: adminAccessEvents.length,
    adminAccess24h,
  };
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div>
      <p className="mb-1 text-sm font-medium text-gray-600">{title}</p>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="break-words text-xl font-semibold text-gray-900 sm:text-2xl">{value}</p>
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const data = await getMetrics();

  return (
    <main className="space-y-4">
      <div className="space-y-4">
        <header>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Dashboard Admin</h1>
          <p className="mt-1 text-gray-600">Visao geral em tempo real da plataforma.</p>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          <StatCard title="Total Users" value={data.totalUsers} />
          <StatCard title="New Today" value={data.usersToday} />
          <StatCard title="Logins (7d)" value={data.loginCount} />
          <StatCard title="Signups (7d)" value={data.signupCount} />
          <StatCard title="Emails Sent (7d)" value={data.emailCount} />
          <StatCard title="Event Posts" value={data.postEvents} />
          <StatCard title="Scholarship Posts" value={data.postScholarships} />
          <StatCard title="Community Posts" value={data.postCommunities} />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="mb-1 text-sm font-medium text-gray-600">Admin Access (7d)</p>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-2xl font-semibold text-gray-900">{data.adminAccessCount}</p>
            </div>
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-gray-600">Admin Access (24h)</p>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-2xl font-semibold text-gray-900">{data.adminAccess24h}</p>
            </div>
          </div>
        </section>



        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">Fluxo de uso (rotas mais visitadas)</h2>
            <div className="mt-4 space-y-2 max-h-72 overflow-y-auto pr-1 md:max-h-none md:overflow-visible">
              {data.topFlows.length ? (
                data.topFlows.map((item) => (
                  <div
                    key={item.route}
                    className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
                  >
                    <span className="mr-3 break-all text-gray-700">{item.route}</span>
                    <span className="font-medium text-gray-900">{item.total}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Sem dados ainda.</p>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">Ultimos emails enviados</h2>
            <div className="mt-4 space-y-2 max-h-72 overflow-y-auto pr-1 md:max-h-none md:overflow-visible">
              {data.emailRecipients.length ? (
                data.emailRecipients.map((item, index) => (
                  <div key={`${item.email}-${index}`} className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                    <p className="text-gray-800">{item.email}</p>
                    <p className="text-gray-500">{item.template} - {item.when}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Sem emails enviados no periodo.</p>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold">Tudo o que esta acontecendo (eventos recentes)</h2>
          <div className="mt-4 max-h-80 overflow-auto md:max-h-none">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500">
                  <th className="py-2 pr-3">Quando</th>
                  <th className="py-2 pr-3">Evento</th>
                  <th className="py-2 pr-3">Email</th>
                  <th className="py-2 pr-3">Rota</th>
                </tr>
              </thead>
              <tbody>
                {data.recentEvents.length ? (
                  data.recentEvents.map((event, index) => (
                    <tr key={`${event.created_at}-${index}`} className="border-b border-gray-100">
                      <td className="py-2 pr-3 text-gray-700">{new Date(event.created_at).toLocaleString("pt-BR")}</td>
                      <td className="py-2 pr-3 text-gray-900">{event.event_type}</td>
                      <td className="py-2 pr-3 text-gray-800">{event.user_email ?? "-"}</td>
                      <td className="py-2 pr-3 text-gray-700">{event.route ?? "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-3 text-gray-500" colSpan={4}>
                      Sem eventos recentes.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>


      </div>
    </main>
  );
}
