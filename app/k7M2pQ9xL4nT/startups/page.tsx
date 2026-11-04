import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { adminPath } from "@/lib/admin-routes";
import { isAdminEmail } from "@/lib/admin-auth";
import { AdminPanelShell } from "@/components/admin/AdminPanelShell";
import { getAdminStartupsData } from "@/lib/startup-service";
import { AdminStartupsClient } from "./AdminStartupsClient";

export const metadata = {
  title: "Gestão de Startups Lusófonas | ADN Developer Admin",
};

export default async function AdminStartupsPage() {
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

  const initialData = await getAdminStartupsData();

  return (
    <AdminPanelShell active="startups">
      <AdminStartupsClient initialData={initialData} />
    </AdminPanelShell>
  );
}
