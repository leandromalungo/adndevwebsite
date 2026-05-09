import { supabaseAdmin } from "@/lib/supabase/admin";
import { SecurityTabs } from "@/components/admin/SecurityTabs";

type AppEvent = {
  event_type: string;
  user_email: string | null;
  route: string | null;
  created_at: string;
  metadata: Record<string, unknown> | null;
  ip_address?: string | null;
  user_agent?: string | null;
};

async function getSecurityMetrics() {
  const now = Date.now();
  const last7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  let events: AppEvent[] = [];
  try {
    const { data } = await supabaseAdmin
      .from("app_events")
      .select("event_type, user_email, route, created_at, metadata, ip_address, user_agent")
      .gte("created_at", last7d)
      .order("created_at", { ascending: false })
      .limit(1000);

    events = (data as AppEvent[] | null) ?? [];
  } catch {
    events = [];
  }

  const failed24hEvents = events.filter(
    (item) => item.event_type === "login_failed" && new Date(item.created_at).getTime() >= Date.now() - 24 * 60 * 60 * 1000
  );

  const failed7dEvents = events.filter((item) => item.event_type === "login_failed");
  const loginSuccessCount = events.filter((item) => item.event_type === "login_success").length;
  const signupEvents = events.filter((item) => item.event_type === "signup_success");
  const adminAccessEvents = events.filter((item) => item.event_type === "admin_panel_access");

  // Análise de IPs suspeitos
  const failedByIpMap = new Map<string, number>();
  for (const event of failed24hEvents) {
    if (event.ip_address) {
      failedByIpMap.set(event.ip_address, (failedByIpMap.get(event.ip_address) ?? 0) + 1);
    }
  }

  const suspiciousIps = [...failedByIpMap.entries()]
    .filter(([, total]) => total >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([ip, total]) => ({ ip, total }));

  // Análise de emails alvo
  const failedByEmailMap = new Map<string, number>();
  for (const event of failed24hEvents) {
    if (event.user_email) {
      failedByEmailMap.set(event.user_email, (failedByEmailMap.get(event.user_email) ?? 0) + 1);
    }
  }

  const highRiskAccounts = [...failedByEmailMap.entries()]
    .filter(([, total]) => total >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([email, total]) => ({ email, total }));

  // Análise de signups suspeitos
  const signup24hEvents = signupEvents.filter(
    (item) => new Date(item.created_at).getTime() >= Date.now() - 24 * 60 * 60 * 1000
  );

  const signupByIpMap = new Map<string, number>();
  for (const event of signup24hEvents) {
    if (event.ip_address) {
      signupByIpMap.set(event.ip_address, (signupByIpMap.get(event.ip_address) ?? 0) + 1);
    }
  }

  const suspiciousSignupIps = [...signupByIpMap.entries()]
    .filter(([, total]) => total >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([ip, total]) => ({ ip, total }));

  // Acessos admin
  const adminAccess24h = adminAccessEvents.filter(
    (item) => new Date(item.created_at).getTime() >= Date.now() - 24 * 60 * 60 * 1000
  ).length;

  const totalAttempts24h = loginSuccessCount + failed24hEvents.length;
  const failureRate24h = totalAttempts24h > 0 ? Math.round((failed24hEvents.length / totalAttempts24h) * 100) : 0;

  const alertLevel =
    suspiciousIps.length > 5 || highRiskAccounts.length > 5
      ? "critico"
      : failed24hEvents.length >= 20 || failureRate24h >= 40
        ? "alto"
        : failed24hEvents.length >= 10
          ? "medio"
          : "baixo";

  // Eventos recentes de segurança
  const securityEvents = [
    ...failed24hEvents.map((e) => ({
      type: "login_failed",
      timestamp: e.created_at,
      email: e.user_email ?? "desconhecido",
      ip: e.ip_address ?? "-",
      description: `Falha de login`,
    })),
    ...adminAccessEvents.slice(0, 10).map((e) => ({
      type: "admin_access",
      timestamp: e.created_at,
      email: e.user_email ?? "desconhecido",
      ip: e.ip_address ?? "-",
      description: `Acesso ao painel admin`,
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 30);

  return {
    failed24h: failed24hEvents.length,
    failed7d: failed7dEvents.length,
    loginSuccess7d: loginSuccessCount,
    failureRate24h,
    suspiciousIps,
    highRiskAccounts,
    suspiciousSignupIps,
    signup24h: signup24hEvents.length,
    adminAccess24h,
    adminAccess7d: adminAccessEvents.length,
    alertLevel,
    securityEvents,
    totalEvents: events.length,
  };
}

function AlertBadge({ level }: { level: string }) {
  const colors = {
    critico: "bg-red-100 text-red-700 border-red-200",
    alto: "bg-orange-100 text-orange-700 border-orange-200",
    medio: "bg-yellow-100 text-yellow-700 border-yellow-200",
    baixo: "bg-green-100 text-green-700 border-green-200",
  };

  const labels = {
    critico: "CRÍTICO",
    alto: "ALTO",
    medio: "MÉDIO",
    baixo: "BAIXO",
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${colors[level as keyof typeof colors]}`}>
      {labels[level as keyof typeof labels]}
    </span>
  );
}

export default async function SecurityPage() {
  const metrics = await getSecurityMetrics();

  return (
    <main className="space-y-4">
      <header className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Segurança e Monitoramento</h1>
            <p className="mt-1 text-sm text-gray-600">Controlo centralizado de ataques, tentativas suspeitas e acessos.</p>
          </div>
          <AlertBadge level={metrics.alertLevel} />
        </div>
      </header>

      {/* Security Tabs Component */}
      <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <SecurityTabs metrics={metrics} />
      </section>

      {/* Security Recommendations */}
      <section className="rounded-lg border border-blue-200 bg-blue-50 p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-blue-900">Recomendações de Segurança</h2>
        <ul className="mt-3 space-y-2 text-sm text-blue-800">
          {metrics.alertLevel === "critico" && (
            <>
              <li><strong>CRÍTICO:</strong> Múltiplos IPs e contas com atividade suspeita. Considere bloquear IPs ou implementar verificação adicional.</li>
              <li>• Revisar IPs suspeitos acima e considerar add à blacklist temporária</li>
              <li>• Notificar utilizadores em risco para resetar password</li>
            </>
          )}
          {metrics.alertLevel === "alto" && (
            <>
              <li><strong>ALTO:</strong> Taxa de falha elevada ou múltiplos IPs com atividade suspeita.</li>
              <li>• Monitorizar proximas horas de perto</li>
              <li>• Considerar aumentar requisitos de verificação (CAPTCHA, 2FA)</li>
            </>
          )}
          {metrics.failureRate24h >= 40 && (
            <li>Taxa de falha acima de 40% - pode indicar ataque em brute force</li>
          )}
          {metrics.suspiciousSignupIps.length > 0 && (
            <li>Múltiplas contas criadas do mesmo IP - possível spam ou bot</li>
          )}
          <li>Sistema em funcionamento normal</li>
        </ul>
      </section>
    </main>
  );
}
