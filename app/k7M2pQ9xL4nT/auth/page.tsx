import { supabaseAdmin } from "@/lib/supabase/admin";

type AuthEvent = {
  event_type: string;
  user_email: string | null;
  created_at: string;
};

async function getAuthData() {
  const now = Date.now();
  const last7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data } = await supabaseAdmin
    .from("app_events")
    .select("event_type, user_email, created_at")
    .in("event_type", ["login_success", "login_failed", "signup_success"])
    .gte("created_at", last7d)
    .order("created_at", { ascending: false })
    .limit(300);

  const events = (data as AuthEvent[] | null) ?? [];
  const loginSuccess = events.filter((e) => e.event_type === "login_success").length;
  const loginFailed = events.filter((e) => e.event_type === "login_failed").length;
  const signups = events.filter((e) => e.event_type === "signup_success").length;
  const loginAttempts = loginSuccess + loginFailed;
  const successRate = loginAttempts > 0 ? Math.round((loginSuccess / loginAttempts) * 100) : 0;
  const riskRate = loginAttempts > 0 ? Math.round((loginFailed / loginAttempts) * 100) : 0;

  const recent24h = events.filter(
    (e) => now - new Date(e.created_at).getTime() <= 24 * 60 * 60 * 1000
  );

  const failuresByEmail = new Map<string, number>();
  const hourlyMap = new Map<string, { success: number; failed: number; signup: number }>();

  for (const event of events) {
    if (event.event_type === "login_failed" && event.user_email) {
      failuresByEmail.set(event.user_email, (failuresByEmail.get(event.user_email) ?? 0) + 1);
    }

    const hour = new Date(event.created_at).toISOString().slice(11, 13);
    const bucket = hourlyMap.get(hour) ?? { success: 0, failed: 0, signup: 0 };
    if (event.event_type === "login_success") bucket.success += 1;
    if (event.event_type === "login_failed") bucket.failed += 1;
    if (event.event_type === "signup_success") bucket.signup += 1;
    hourlyMap.set(hour, bucket);
  }

  return {
    loginSuccess,
    loginFailed,
    signups,
    loginAttempts,
    successRate,
    riskRate,
    recent24hCount: recent24h.length,
    topFailedAccounts: [...failuresByEmail.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([email, count]) => ({ email, count })),
    hourlyActivity: [...hourlyMap.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([hour, stats]) => ({ hour, ...stats })),
    recent: events.slice(0, 30),
  };
}

export default async function AdminAuthPage() {
  const data = await getAuthData();

  return (
    <main className="space-y-4">
      <header className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Autenticação</h1>
        <p className="mt-1 text-sm text-gray-600">Controlo de logins e registos.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
        <div>
          <p className="mb-1 text-sm font-medium text-gray-600">Logins (7 dias)</p>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-2xl font-semibold text-gray-900">{data.loginSuccess}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-gray-600">Falhas de login (7 dias)</p>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-2xl font-semibold text-gray-900">{data.loginFailed}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-gray-600">Signups (7 dias)</p>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-2xl font-semibold text-gray-900">{data.signups}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-gray-600">Tentativas login (7 dias)</p>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-2xl font-semibold text-gray-900">{data.loginAttempts}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-gray-600">Taxa de sucesso</p>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-2xl font-semibold text-emerald-700">{data.successRate}%</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-gray-600">Risco (falhas)</p>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-2xl font-semibold text-red-700">{data.riskRate}%</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Controlo de risco</h2>
          <p className="mt-1 text-sm text-gray-600">Contas com mais falhas de login nos ultimos 7 dias.</p>
          <div className="mt-4 space-y-2">
            {data.topFailedAccounts.length ? (
              data.topFailedAccounts.map((item) => (
                <div
                  key={item.email}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
                >
                  <span className="text-gray-700">{item.email}</span>
                  <span className="font-semibold text-red-700">{item.count} falhas</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Sem contas em risco no periodo.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Atividade por hora (UTC)</h2>
          <p className="mt-1 text-sm text-gray-600">
            Volume de logins/singups por janela de hora. Ultimas 24h: {data.recent24hCount}
          </p>
          <div className="mt-4 overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500">
                  <th className="py-2 pr-3">Hora</th>
                  <th className="py-2 pr-3">Success</th>
                  <th className="py-2 pr-3">Failed</th>
                  <th className="py-2 pr-3">Signups</th>
                </tr>
              </thead>
              <tbody>
                {data.hourlyActivity.map((row) => (
                  <tr key={row.hour} className="border-b border-gray-100">
                    <td className="py-2.5 pr-3 text-gray-700">{row.hour}:00</td>
                    <td className="py-2.5 pr-3 text-emerald-700">{row.success}</td>
                    <td className="py-2.5 pr-3 text-red-700">{row.failed}</td>
                    <td className="py-2.5 pr-3 text-gray-700">{row.signup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Eventos de autenticação</h2>
        <div className="mt-4 overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="py-2 pr-3">Quando</th>
                <th className="py-2 pr-3">Evento</th>
                <th className="py-2 pr-3">Email</th>
              </tr>
            </thead>
            <tbody>
              {data.recent.length ? (
                data.recent.map((item, index) => (
                  <tr key={`${item.created_at}-${index}`} className="border-b border-gray-100">
                    <td className="py-2.5 pr-3 text-gray-700">{new Date(item.created_at).toLocaleString("pt-BR")}</td>
                    <td className="py-2.5 pr-3 text-gray-900">{item.event_type}</td>
                    <td className="py-2.5 pr-3 text-gray-700">{item.user_email ?? "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 text-gray-500" colSpan={3}>
                    Sem eventos de autenticações.
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
