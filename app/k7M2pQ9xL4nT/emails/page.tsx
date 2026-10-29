import { supabaseAdmin } from "@/lib/supabase/admin";

type EmailEvent = {
  user_email: string | null;
  created_at: string;
  metadata: Record<string, unknown> | null;
};

type EmailDbActivity = {
  when: string;
  source: string;
  action: string;
  reference: string;
};

async function getEmailData() {
  const now = Date.now();
  const last30d = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const [emailEventsResult, appEventsResult, verifyTokensResult, resetTokensResult, usersResult] =
    await Promise.all([
      supabaseAdmin
        .from("app_events")
        .select("user_email, created_at, metadata")
        .eq("event_type", "email_sent")
        .gte("created_at", last30d)
        .order("created_at", { ascending: false })
        .limit(600),
      supabaseAdmin
        .from("app_events")
        .select("event_type, user_email, created_at")
        .in("event_type", ["signup_success", "login_success", "login_failed", "email_sent"])
        .gte("created_at", last30d)
        .order("created_at", { ascending: false })
        .limit(600),
      supabaseAdmin
        .from("email_verification_tokens")
        .select("email, created_at, used_at")
        .order("created_at", { ascending: false })
        .limit(300),
      supabaseAdmin
        .from("password_reset_tokens")
        .select("email, created_at, used_at")
        .order("created_at", { ascending: false })
        .limit(300),
      supabaseAdmin
        .from("users")
        .select("email, created_at, email_verified_at")
        .order("created_at", { ascending: false })
        .limit(300),
    ]);

  const events = (emailEventsResult.data as EmailEvent[] | null) ?? [];
  const templates = new Map<string, number>();
  for (const event of events) {
    const template = String(event.metadata?.template ?? "nao_informado");
    templates.set(template, (templates.get(template) ?? 0) + 1);
  }

  const appEvents =
    (appEventsResult.data as Array<{ event_type: string; user_email: string | null; created_at: string }> | null) ??
    [];
  const verificationTokens =
    (verifyTokensResult.data as Array<{ email: string | null; created_at: string; used_at: string | null }> | null) ??
    [];
  const resetTokens =
    (resetTokensResult.data as Array<{ email: string | null; created_at: string; used_at: string | null }> | null) ??
    [];
  const users =
    (usersResult.data as Array<{ email: string | null; created_at: string; email_verified_at: string | null }> | null) ??
    [];

  const emailSent24h = events.filter(
    (e) => now - new Date(e.created_at).getTime() <= 24 * 60 * 60 * 1000
  ).length;
  const verificationIssued = verificationTokens.length;
  const verificationUsed = verificationTokens.filter((t) => Boolean(t.used_at)).length;
  const resetIssued = resetTokens.length;
  const resetUsed = resetTokens.filter((t) => Boolean(t.used_at)).length;
  const usersVerified = users.filter((u) => Boolean(u.email_verified_at)).length;

  const dbActivity: EmailDbActivity[] = [
    ...verificationTokens.map((token) => ({
      when: token.created_at,
      source: "email_verification_tokens",
      action: token.used_at ? "token_used" : "token_issued",
      reference: token.email ?? "unknown",
    })),
    ...resetTokens.map((token) => ({
      when: token.created_at,
      source: "password_reset_tokens",
      action: token.used_at ? "reset_used" : "reset_issued",
      reference: token.email ?? "unknown",
    })),
    ...users.map((user) => ({
      when: user.created_at,
      source: "users",
      action: user.email_verified_at ? "user_verified" : "user_registered",
      reference: user.email ?? "unknown",
    })),
  ]
    .sort((a, b) => new Date(b.when).getTime() - new Date(a.when).getTime())
    .slice(0, 120);

  return {
    total: events.length,
    emailSent24h,
    verificationIssued,
    verificationUsed,
    resetIssued,
    resetUsed,
    usersVerified,
    templates: [...templates.entries()].map(([name, total]) => ({ name, total })),
    appEvents: appEvents.slice(0, 60),
    dbActivity,
    recent: events.slice(0, 50),
  };
}

export default async function AdminEmailsPage() {
  const data = await getEmailData();

  return (
    <main className="space-y-4">
      <header className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Emails</h1>
        <p className="mt-1 text-sm text-gray-600">Monitoramento dos emails enviados.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
        <div>
          <p className="mb-1 text-sm font-medium text-gray-600">Total enviado (30 dias)</p>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-2xl font-semibold text-gray-900">{data.total}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-gray-600">Enviados (24h)</p>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-2xl font-semibold text-gray-900">{data.emailSent24h}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-gray-600">Tokens verificacao</p>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-2xl font-semibold text-gray-900">
              {data.verificationIssued} / usados {data.verificationUsed}
            </p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-gray-600">Tokens reset</p>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-2xl font-semibold text-gray-900">
              {data.resetIssued} / usados {data.resetUsed}
            </p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-gray-600">Utilizadores verificados</p>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-2xl font-semibold text-gray-900">{data.usersVerified}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-gray-600">Templates usados</p>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {data.templates.length ? (
                data.templates.map((item) => (
                  <span key={item.name} className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-800">
                    {item.name}: {item.total}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">Sem dados</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Eventos da plataforma relacionados a email</h2>
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
              {data.appEvents.length ? (
                data.appEvents.map((item, index) => (
                  <tr key={`${item.created_at}-${index}`} className="border-b border-gray-100">
                    <td className="py-2.5 pr-3 text-gray-700">{new Date(item.created_at).toLocaleString("pt-BR")}</td>
                    <td className="py-2.5 pr-3 text-gray-900">{item.event_type}</td>
                    <td className="py-2.5 pr-3 text-gray-700">{item.user_email ?? "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 text-gray-500" colSpan={3}>
                    Sem eventos da plataforma.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Ultimos destinatarios</h2>
        <div className="mt-4 overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="py-2 pr-3">Quando</th>
                <th className="py-2 pr-3">Email</th>
                <th className="py-2 pr-3">Template</th>
              </tr>
            </thead>
            <tbody>
              {data.recent.length ? (
                data.recent.map((item, index) => (
                  <tr key={`${item.created_at}-${index}`} className="border-b border-gray-100">
                    <td className="py-2.5 pr-3 text-gray-700">{new Date(item.created_at).toLocaleString("pt-BR")}</td>
                    <td className="py-2.5 pr-3 text-gray-900">{item.user_email ?? "-"}</td>
                    <td className="py-2.5 pr-3 text-gray-700">{String(item.metadata?.template ?? "nao_informado")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 text-gray-500" colSpan={3}>
                    Sem emails no periodo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Atividade de banco relacionada a emails</h2>
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
              {data.dbActivity.length ? (
                data.dbActivity.map((item, index) => (
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
                    Sem atividade no banco relacionada a emails.
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
