import { ReactNode } from "react";
import { getCurrentSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminPanelShell } from "@/components/admin/AdminPanelShell";
import { adminPath } from "@/lib/admin-routes";
import { trackEvent } from "@/lib/analytics";

export default async function AdminSettingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getCurrentSession();

  if (!session?.user) redirect(adminPath("/login"));
  if (!session.user.isAdmin) redirect("/");

  await trackEvent({
    eventType: "admin_panel_access",
    userId: session.user.id,
    userEmail: session.user.email,
    route: "/settings",
    metadata: { method: "credentials_session", section: "settings" },
  });

  return <AdminPanelShell active="settings">{children}</AdminPanelShell>;
}
