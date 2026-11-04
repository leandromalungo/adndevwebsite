import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getStartupBySlug } from "@/lib/startup-service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Identificador ou slug é obrigatório" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || (session?.user as any)?.email || null;

    const result = await getStartupBySlug(id, userId);
    if (!result) {
      return NextResponse.json({ error: "Startup não encontrada" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Erro ao obter detalhe da startup:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar pedido." },
      { status: 500 }
    );
  }
}
