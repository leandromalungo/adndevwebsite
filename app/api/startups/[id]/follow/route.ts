import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { toggleFollowStartup } from "@/lib/startup-service";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || (session?.user as any)?.email;

    if (!session?.user || !userId) {
      return NextResponse.json(
        { error: "É necessário iniciar sessão para seguir uma startup." },
        { status: 401 }
      );
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID da startup não informado." }, { status: 400 });
    }

    const result = await toggleFollowStartup(id, userId);
    if (!result.success) {
      return NextResponse.json({ error: result.message || "Erro ao seguir." }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Erro na rota de seguir startup:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
