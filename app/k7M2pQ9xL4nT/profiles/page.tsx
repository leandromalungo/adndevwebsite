import { supabaseAdmin } from "@/lib/supabase/admin";

type ProfileRow = {
  user_id: string;
  username: string | null;
  country: string | null;
  phone: string | null;
  whatsapp: string | null;
  telegram: string | null;
  it_area: string | null;
  it_role: string | null;
  bio: string | null;
  updated_at: string | null;
};

type UserBase = {
  id: string;
  name: string | null;
  email: string | null;
  created_at: string | null;
};

async function getProfileData() {
  const last7dIso = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [usersResult, profilesResult, linksResult, skillsResult, experiencesResult, projectsResult, certsResult] = await Promise.all([
    supabaseAdmin.from("users").select("id, name, email, created_at").order("created_at", { ascending: false }).limit(500),
    supabaseAdmin
      .from("user_profiles")
      .select("user_id, username, country, phone, whatsapp, telegram, it_area, it_role, bio, updated_at")
      .order("updated_at", { ascending: false })
      .limit(500),
    supabaseAdmin.from("user_social_links").select("user_id, created_at").limit(2000),
    supabaseAdmin.from("user_skills").select("user_id, created_at").limit(5000),
    supabaseAdmin.from("user_experiences").select("user_id, created_at").limit(3000),
    supabaseAdmin.from("user_projects").select("user_id, created_at").limit(3000),
    supabaseAdmin.from("user_certifications").select("user_id, created_at").limit(3000),
  ]);

  const users = (usersResult.data as UserBase[] | null) ?? [];
  const profiles = (profilesResult.data as ProfileRow[] | null) ?? [];

  const profileByUser = new Map<string, ProfileRow>();
  for (const profile of profiles) profileByUser.set(profile.user_id, profile);

  const completedProfiles = profiles.filter(
    (p) => Boolean(p.username) && Boolean(p.country) && Boolean(p.it_area) && Boolean(p.it_role)
  ).length;

  const withBio = profiles.filter((p) => Boolean(p.bio && p.bio.trim())).length;
  const withPhone = profiles.filter((p) => Boolean(p.phone || p.whatsapp || p.telegram)).length;

  const socialRows = (linksResult.data as Array<{ user_id: string; created_at: string | null }> | null) ?? [];
  const skillsRows = (skillsResult.data as Array<{ user_id: string; created_at: string | null }> | null) ?? [];
  const experiencesRows = (experiencesResult.data as Array<{ user_id: string; created_at: string | null }> | null) ?? [];
  const projectsRows = (projectsResult.data as Array<{ user_id: string; created_at: string | null }> | null) ?? [];
  const certRows = (certsResult.data as Array<{ user_id: string; created_at: string | null }> | null) ?? [];

  const socialCount = socialRows.length;
  const skillsCount = skillsRows.length;
  const expCount = experiencesRows.length;
  const projectsCount = projectsRows.length;
  const certsCount = certRows.length;

  const rows = users.map((user) => {
    const profile = profileByUser.get(user.id);
    const filledFields = [
      profile?.username,
      profile?.country,
      profile?.bio,
      profile?.phone || profile?.whatsapp || profile?.telegram,
      profile?.it_area,
      profile?.it_role,
    ].filter(Boolean).length;
    const completion = Math.round((filledFields / 6) * 100);

    return {
      id: user.id,
      name: user.name ?? "-",
      email: user.email ?? "-",
      username: profile?.username ?? "-",
      country: profile?.country ?? "-",
      itArea: profile?.it_area ?? "-",
      itRole: profile?.it_role ?? "-",
      completion,
      updatedAt: profile?.updated_at,
      createdAt: user.created_at,
    };
  });

  const avgCompletion =
    rows.length > 0
      ? Math.round(rows.reduce((acc, row) => acc + row.completion, 0) / rows.length)
      : 0;

  const activeProfiles7d = profiles.filter(
    (profile) => profile.updated_at && profile.updated_at >= last7dIso
  ).length;

  const engagedUsers = new Set<string>([
    ...socialRows.map((row) => row.user_id),
    ...skillsRows.map((row) => row.user_id),
    ...experiencesRows.map((row) => row.user_id),
    ...projectsRows.map((row) => row.user_id),
    ...certRows.map((row) => row.user_id),
  ]).size;

  const highCompletionUsers = rows.filter((row) => row.completion >= 80).length;
  const lowCompletionUsers = rows.filter((row) => row.completion < 50).length;

  const countryMap = new Map<string, number>();
  const areaMap = new Map<string, number>();
  for (const profile of profiles) {
    if (profile.country) countryMap.set(profile.country, (countryMap.get(profile.country) ?? 0) + 1);
    if (profile.it_area) areaMap.set(profile.it_area, (areaMap.get(profile.it_area) ?? 0) + 1);
  }

  const topCountries = [...countryMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  const topAreas = [...areaMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);

  const recentlyUpdated = rows
    .filter((row) => Boolean(row.updatedAt))
    .sort((a, b) => new Date(b.updatedAt as string).getTime() - new Date(a.updatedAt as string).getTime())
    .slice(0, 20);

  return {
    totalUsers: users.length,
    totalProfiles: profiles.length,
    completedProfiles,
    withBio,
    withPhone,
    socialCount,
    skillsCount,
    expCount,
    projectsCount,
    certsCount,
    avgCompletion,
    activeProfiles7d,
    engagedUsers,
    highCompletionUsers,
    lowCompletionUsers,
    topCountries,
    topAreas,
    recentlyUpdated,
    rows: rows.slice(0, 200),
  };
}

export default async function AdminProfilesPage() {
  const data = await getProfileData();

  return (
    <main className="space-y-4">
      <header className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Perfis</h1>
        <p className="mt-1 text-sm text-gray-600">Controlo de dados usados nos perfis dos utilizadores.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"><p className="text-sm text-gray-500">Users</p><p className="mt-1 text-2xl font-semibold">{data.totalUsers}</p></div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"><p className="text-sm text-gray-500">Profiles</p><p className="mt-1 text-2xl font-semibold">{data.totalProfiles}</p></div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"><p className="text-sm text-gray-500">Complete Profiles</p><p className="mt-1 text-2xl font-semibold">{data.completedProfiles}</p></div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"><p className="text-sm text-gray-500">With Bio</p><p className="mt-1 text-2xl font-semibold">{data.withBio}</p></div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"><p className="text-sm text-gray-500">With Contacts</p><p className="mt-1 text-2xl font-semibold">{data.withPhone}</p></div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"><p className="text-sm text-gray-500">Avg Completion</p><p className="mt-1 text-2xl font-semibold">{data.avgCompletion}%</p></div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"><p className="text-sm text-gray-500">Active Profiles (7d)</p><p className="mt-1 text-2xl font-semibold">{data.activeProfiles7d}</p></div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"><p className="text-sm text-gray-500">Engaged Users</p><p className="mt-1 text-2xl font-semibold">{data.engagedUsers}</p></div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"><p className="text-sm text-gray-500">80%+ Profiles</p><p className="mt-1 text-2xl font-semibold">{data.highCompletionUsers}</p></div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"><p className="text-sm text-gray-500">Below 50%</p><p className="mt-1 text-2xl font-semibold">{data.lowCompletionUsers}</p></div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"><p className="text-sm text-gray-500">Profile Data Items</p><p className="mt-1 text-2xl font-semibold">{data.socialCount + data.skillsCount + data.expCount + data.projectsCount + data.certsCount}</p></div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Dados de perfis por utilizador</h2>
        <div className="mt-4 overflow-auto">
          <table className="w-full min-w-[1100px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="py-2 pr-3">Nome</th>
                <th className="py-2 pr-3">Email</th>
                <th className="py-2 pr-3">Username</th>
                <th className="py-2 pr-3">Pais</th>
                <th className="py-2 pr-3">IT Area</th>
                <th className="py-2 pr-3">IT Role</th>
                <th className="py-2 pr-3">Profile %</th>
                <th className="py-2 pr-3">Criado em</th>
                <th className="py-2 pr-3">Atualizado em</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-100">
                  <td className="py-2.5 pr-3 text-gray-900">{row.name}</td>
                  <td className="py-2.5 pr-3 text-gray-700">{row.email}</td>
                  <td className="py-2.5 pr-3 text-gray-700">{row.username}</td>
                  <td className="py-2.5 pr-3 text-gray-700">{row.country}</td>
                  <td className="py-2.5 pr-3 text-gray-700">{row.itArea}</td>
                  <td className="py-2.5 pr-3 text-gray-700">{row.itRole}</td>
                  <td className="py-2.5 pr-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${row.completion >= 80 ? "bg-emerald-100 text-emerald-700" : row.completion >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                      {row.completion}%
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 text-gray-700">{row.createdAt ? new Date(row.createdAt).toLocaleString("pt-BR") : "-"}</td>
                  <td className="py-2.5 pr-3 text-gray-700">{row.updatedAt ? new Date(row.updatedAt).toLocaleString("pt-BR") : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Top countries in profiles</h2>
          <div className="mt-4 space-y-2">
            {data.topCountries.length ? (
              data.topCountries.map(([country, count]) => (
                <div key={country} className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                  <span className="text-gray-700">{country}</span>
                  <span className="font-medium text-gray-900">{count}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Sem dados de pais.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Top IT areas</h2>
          <div className="mt-4 space-y-2">
            {data.topAreas.length ? (
              data.topAreas.map(([area, count]) => (
                <div key={area} className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                  <span className="text-gray-700">{area}</span>
                  <span className="font-medium text-gray-900">{count}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Sem dados de area IT.</p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Perfis atualizados recentemente</h2>
        <div className="mt-4 overflow-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="py-2 pr-3">Nome</th>
                <th className="py-2 pr-3">Email</th>
                <th className="py-2 pr-3">Completude</th>
                <th className="py-2 pr-3">Ultima atualizacao</th>
              </tr>
            </thead>
            <tbody>
              {data.recentlyUpdated.length ? (
                data.recentlyUpdated.map((row) => (
                  <tr key={`recent-${row.id}`} className="border-b border-gray-100">
                    <td className="py-2.5 pr-3 text-gray-900">{row.name}</td>
                    <td className="py-2.5 pr-3 text-gray-700">{row.email}</td>
                    <td className="py-2.5 pr-3 text-gray-700">{row.completion}%</td>
                    <td className="py-2.5 pr-3 text-gray-700">{row.updatedAt ? new Date(row.updatedAt).toLocaleString("pt-BR") : "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 text-gray-500" colSpan={4}>
                    Sem perfis atualizados recentemente.
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
