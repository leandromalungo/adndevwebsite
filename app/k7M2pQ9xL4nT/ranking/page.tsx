import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { adminPath } from "@/lib/admin-routes";
import { isAdminEmail } from "@/lib/admin-auth";
import { AdminPanelShell } from "@/components/admin/AdminPanelShell";
import { getAdminRankingData } from "@/lib/ranking-service";
import { AdminRankingClient } from "./AdminRankingClient";

export const metadata = {
  title: "Gestão do Ranking de Tecnologias | ADN Developer Admin",
};

export default async function AdminRankingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(adminPath("/login"));
  }

  const isUserAdmin = Boolean(
    session.user.isAdmin || isAdminEmail(session.user.email)
  );

  if (!isUserAdmin) {
    redirect("/");
  }

  const initialData = await getAdminRankingData();

  return (
    <AdminPanelShell active="ranking">
      <AdminRankingClient initialData={initialData} />
    </AdminPanelShell>
  );
}
