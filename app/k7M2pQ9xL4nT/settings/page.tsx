import { getAdminEmails } from "@/lib/admin-auth";

export default function AdminSettingsPage() {
  const admins = getAdminEmails();

  return (
    <main className="space-y-4">
      <header className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="mt-1 text-sm text-gray-600">Definições e estado do painel administrativo.</p>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Admins autorizados (.env)</h2>
        <p className="mt-1 text-sm text-gray-600">
          Estes emails podem acessar o painel via variavel <code>ADMIN_EMAILS</code>.
        </p>
        <div className="mt-3 space-y-2">
          {admins.length ? (
            admins.map((email) => (
              <div key={email} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800">
                {email}
              </div>
            ))
          ) : (
            <p className="text-sm text-amber-700">
              Nenhum admin definido. Configure <code>ADMIN_EMAILS</code> no <code>.env.local</code>.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Boas praticas recomendadas</h2>
        <ul className="mt-2 space-y-1 text-sm text-gray-700">
          <li>Usar senhas fortes e exclusivas para contas admin.</li>
          <li>Ativar 2FA para contas de administracao.</li>
          <li>Revisar periodicamente eventos de login falhado e emails enviados.</li>
        </ul>
      </section>
    </main>
  );
}
