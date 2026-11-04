import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { addStartupComment } from "@/lib/startup-service";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || (session?.user as any)?.email;

    if (!session?.user || !userId) {
      return NextResponse.json(
        { error: "É necessário iniciar sessão para comentar." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { content, parentId } = body;

    const userName = (session.user as any)?.username || session.user.name || "Membro";
    const userAvatar = session.user.image || "";

    const result = await addStartupComment({
      startupId: id,
      userId,
      userName,
      userAvatar,
      content,
      parentId,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.message || "Erro ao publicar comentário." },
        { status: 400 }
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao adicionar comentário:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao comentar." },
      { status: 500 }
    );
  }
}
