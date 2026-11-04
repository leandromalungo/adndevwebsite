import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin-auth";
import { createCategory } from "@/lib/ranking-service";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const isAdmin = session?.user?.isAdmin || isAdminEmail(userEmail);

    if (!session || !isAdmin) {
      return NextResponse.json(
        { error: "Acesso reservado a administradores." },
        { status: 403 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { id, name, description, icon, sort_order } = body;

    if (!id || !name || !description) {
      return NextResponse.json(
        { error: "ID, nome e descrição da categoria são obrigatórios." },
        { status: 400 }
      );
    }

    const newCategory = await createCategory({
      id,
      name,
      description,
      icon,
      sort_order: typeof sort_order === "number" ? sort_order : undefined,
    });

    return NextResponse.json({ success: true, category: newCategory }, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar categoria:", error);
    return NextResponse.json(
      { error: error?.message || "Erro ao processar criação de categoria." },
      { status: 500 }
    );
  }
}
