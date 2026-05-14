import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";

export default async function RoadmapsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getCurrentSession();
  if (!session?.user) redirect("/?auth=register");

  return <>{children}</>;
}
