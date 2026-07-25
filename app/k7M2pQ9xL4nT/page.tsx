import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { adminPath } from "@/lib/admin-routes";

export default async function AdminIndexPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(adminPath("/login"));
  }

  if (!session.user.isAdmin) {
    redirect("/");
  }

  redirect(adminPath("/dashboard"));
}
