import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { toggleCommentLike } from "@/lib/startup-service";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || (session?.user as any)?.email;

    if (!session?.user || !userId) {
      return NextResponse.json(
        { error: "É necessário iniciar sessão para apoiar um comentário." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const result = await toggleCommentLike(id, userId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message || "Erro ao processar like." },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Erro ao gostar de comentário:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
