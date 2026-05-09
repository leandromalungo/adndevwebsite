import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { AdminPanelShell } from "@/components/admin/AdminPanelShell";
import { adminPath } from "@/lib/admin-routes";
import { trackEvent } from "@/lib/analytics";

export default async function AdminProfilesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect(adminPath("/login"));
  if (!session.user.isAdmin) redirect("/");

  await trackEvent({
    eventType: "admin_panel_access",
    userId: session.user.id,
    userEmail: session.user.email,
    route: "/profiles",
    metadata: { method: "credentials_session", section: "profiles" },
  });

  return <AdminPanelShell active="profiles">{children}</AdminPanelShell>;
}
