import { supabaseAdmin } from "@/lib/supabase/admin";
import { verifyUserEmailManually } from "@/app/k7M2pQ9xL4nT/users/actions";

type UserRow = {
  id: string;
  name: string | null;
  email: string | null;
  created_at: string | null;
  email_verified_at?: string | null;
};

async function getUsers(): Promise<UserRow[]> {
  const { data } = await supabaseAdmin
    .from("users")
    .select("id, name, email, created_at, email_verified_at")
    .order("created_at", { ascending: false })
    .limit(300);

  return (data as UserRow[] | null) ?? [];
}

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <main className="space-y-4">
      <header className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Utilizadores</h1>
        <p className="mt-1 text-sm text-gray-600">
          Lista de utilizadores com dados de registo.
        </p>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <div className="overflow-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="py-2 pr-3 font-semibold">Nome</th>
                <th className="py-2 pr-3 font-semibold">Email</th>
                <th className="py-2 pr-3 font-semibold">Criado em</th>
                <th className="py-2 pr-3 font-semibold">Conta</th>
                <th className="py-2 pr-3 font-semibold">Email verificado</th>
                <th className="py-2 pr-3 font-semibold">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {users.length ? (
                users.map((user) => {
                  const createdAt = user.created_at ? new Date(user.created_at) : null;
                  const daysSinceCreate = createdAt
                    ? Math.max(
                        0,
                        Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
                      )
                    : null;

                  return (
                  <tr key={user.id} className="border-b border-gray-100">
                    <td className="py-2.5 pr-3 text-gray-800">{user.name || "-"}</td>
                    <td className="py-2.5 pr-3 text-gray-700">{user.email || "-"}</td>
                    <td className="py-2.5 pr-3 text-gray-700">
                      {createdAt ? createdAt.toLocaleString("pt-BR") : "-"}
                    </td>
                    <td className="py-2.5 pr-3 text-gray-700">
                      {daysSinceCreate !== null ? `${daysSinceCreate} dia(s)` : "-"}
                    </td>
                    <td className="py-2.5 pr-3 text-gray-700">
                      {user.email_verified_at ? "Sim" : "Nao"}
                    </td>
                    <td className="py-2.5 pr-3 text-gray-700">
                      {user.email_verified_at ? (
                        <span className="text-xs font-medium text-green-700">Ja verificado</span>
                      ) : (
                        <form action={verifyUserEmailManually}>
                          <input type="hidden" name="user_id" value={user.id} />
                          <button
                            type="submit"
                            className="rounded-md border border-violet-200 px-2.5 py-1 text-xs font-semibold text-violet-700 transition hover:bg-violet-50"
                          >
                            Verificar email
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                )})
              ) : (
                <tr>
                  <td className="py-3 text-gray-500" colSpan={6}>
                    Nenhum utilizador encontrado.
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
