import "server-only";

import { headers } from "next/headers";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";

export type AppEventType =
  | "login_success"
  | "login_failed"
  | "signup_success"
  | "email_sent"
  | "page_view"
  | "admin_panel_access";

type TrackEventParams = {
  eventType: AppEventType;
  userId?: string | null;
  userEmail?: string | null;
  route?: string | null;
  metadata?: Record<string, unknown>;
};

export async function trackEvent({
  eventType,
  userId,
  userEmail,
  route,
  metadata,
}: TrackEventParams): Promise<void> {
  if (!isSupabaseConfigured()) return;

  try {
    const headersList = await headers();
    const ipAddress =
      headersList.get("x-forwarded-for") ||
      headersList.get("x-real-ip") ||
      "unknown";
    const userAgent = headersList.get("user-agent");

    await supabaseAdmin.from("app_events").insert([
      {
        event_type: eventType,
        user_id: userId ?? null,
        user_email: userEmail ?? null,
        route: route ?? null,
        ip_address: ipAddress,
        user_agent: userAgent,
        metadata: metadata ?? {},
        created_at: new Date().toISOString(),
      },
    ]);
  } catch {
    // O painel admin depende desta tabela opcional.
    // Se ainda não existir, não quebramos o fluxo da aplicação.
  }
}
