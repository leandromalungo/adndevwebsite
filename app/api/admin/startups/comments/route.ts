import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin-auth";
import { adminModerateComment, adminDeleteComment } from "@/lib/startup-service";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const isAdmin = session?.user?.isAdmin || isAdminEmail(userEmail);

    if (!session || !isAdmin) {
      return NextResponse.json({ error: "Acesso reservado a administradores." }, { status: 403 });
    }

    const { commentId, isHidden } = await req.json();
    if (!commentId) {
      return NextResponse.json({ error: "ID do comentário é obrigatório." }, { status: 400 });
    }

    const result = await adminModerateComment(commentId, Boolean(isHidden));
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Erro ao moderar comentário:", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const isAdmin = session?.user?.isAdmin || isAdminEmail(userEmail);

    if (!session || !isAdmin) {
      return NextResponse.json({ error: "Acesso reservado a administradores." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("id");
    if (!commentId) {
      return NextResponse.json({ error: "ID do comentário é obrigatório." }, { status: 400 });
    }

    const result = await adminDeleteComment(commentId);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Erro ao eliminar comentário:", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
