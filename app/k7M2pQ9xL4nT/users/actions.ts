"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { trackEvent } from "@/lib/analytics";
import { adminPath } from "@/lib/admin-routes";

async function ensureAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    throw new Error("Sem permissao.");
  }
  return session;
}

export async function verifyUserEmailManually(formData: FormData) {
  const session = await ensureAdmin();
  const userId = String(formData.get("user_id") ?? "").trim();

  if (!userId) {
    throw new Error("Utilizador inválido.");
  }

  const { data: user, error: fetchError } = await supabaseAdmin
    .from("users")
    .select("id, email, email_verified_at")
    .eq("id", userId)
    .maybeSingle();

  if (fetchError || !user) {
    throw new Error("Utilizador não encontrado.");
  }

  if (!user.email_verified_at) {
    const { error: updateError } = await supabaseAdmin
      .from("users")
      .update({ email_verified_at: new Date().toISOString() })
      .eq("id", userId);

    if (updateError) {
      throw new Error("Não foi possível verificar o email.");
    }

    await trackEvent({
      eventType: "admin_panel_access",
      userId: session.user.id,
      userEmail: session.user.email,
      metadata: {
        action: "manual_email_verification",
        targetUserId: user.id,
        targetEmail: user.email,
      },
    });
  }

  revalidatePath("/k7M2pQ9xL4nT/users");
  revalidatePath(adminPath("/users"));
}
