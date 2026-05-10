import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminPanelShell } from "@/components/admin/AdminPanelShell";
import { adminPath } from "@/lib/admin-routes";
import { trackEvent } from "@/lib/analytics";

export default async function AdminUsersLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) redirect(adminPath("/login"));
  if (!session.user.isAdmin) redirect("/");

  await trackEvent({
    eventType: "admin_panel_access",
    userId: session.user.id,
    userEmail: session.user.email,
    route: "/users",
    metadata: { method: "credentials_session", section: "users" },
  });

  return <AdminPanelShell active="users">{children}</AdminPanelShell>;
}
