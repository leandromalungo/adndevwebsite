import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin-auth";
import {
  adminBulkUpdateStartupStatus,
  adminBulkDeleteStartups,
} from "@/lib/startup-service";
import type { StartupStatus } from "@/lib/startup-types";

async function verifyAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const isAdmin = session?.user?.isAdmin || isAdminEmail(userEmail);
  return { authorized: Boolean(session && isAdmin), session };
}

export async function POST(req: NextRequest) {
  try {
    const { authorized } = await verifyAdmin();
    if (!authorized) {
      return NextResponse.json({ error: "Acesso reservado a administradores." }, { status: 403 });
    }

    const body = await req.json();
    const { action, ids, status } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "Nenhuma startup selecionada para ação em massa." },
        { status: 400 }
      );
    }

    if (action === "delete") {
      const result = await adminBulkDeleteStartups(ids);
      return NextResponse.json({
        success: true,
        action: "delete",
        count: result.count,
        message: `${result.count} startup(s) eliminada(s) com sucesso.`,
      });
    }

    if (action === "publish") {
      const result = await adminBulkUpdateStartupStatus(ids, "published");
      return NextResponse.json({
        success: true,
        action: "publish",
        count: result.count,
        message: `${result.count} startup(s) publicada(s) com sucesso.`,
      });
    }

    if (action === "unpublish") {
      const targetStatus: StartupStatus = status === "archived" ? "archived" : "pending";
      const result = await adminBulkUpdateStartupStatus(ids, targetStatus);
      return NextResponse.json({
        success: true,
        action: "unpublish",
        count: result.count,
        message: `${result.count} startup(s) despublicada(s) com sucesso.`,
      });
    }

    if (action === "update-status" && status) {
      const result = await adminBulkUpdateStartupStatus(ids, status);
      return NextResponse.json({
        success: true,
        action: "update-status",
        count: result.count,
        message: `${result.count} startup(s) atualizada(s) para '${status}'.`,
      });
    }

    return NextResponse.json(
      { error: "Ação em massa inválida. Use 'publish', 'unpublish' ou 'delete'." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Erro na API bulk de startups:", error);
    return NextResponse.json({ error: "Erro interno ao executar ação em massa." }, { status: 500 });
  }
}
