import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin-auth";
import {
  createTechnology,
  updateTechnology,
  toggleTechnologyActive,
  deleteTechnology,
} from "@/lib/ranking-service";

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
    const { action, id, data } = body;

    if (action === "toggle") {
      if (!id) return NextResponse.json({ error: "ID obrigatório." }, { status: 400 });
      const newStatus = await toggleTechnologyActive(id);
      return NextResponse.json({ success: true, is_active: newStatus });
    }

    if (action === "edit") {
      if (!id || !data) return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
      const updated = await updateTechnology(id, data);
      return NextResponse.json({ success: true, technology: updated });
    }

    // Ação padrão: criar nova tecnologia
    const { name, category_id, description, website_url, logo_url, tags } = body;
    if (!name || !category_id || !description) {
      return NextResponse.json(
        { error: "Nome, categoria e descrição são campos obrigatórios." },
        { status: 400 }
      );
    }

    const newTech = await createTechnology({
      name,
      category_id,
      description,
      website_url,
      logo_url,
      tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
    });

    return NextResponse.json({ success: true, technology: newTech }, { status: 201 });
  } catch (error: any) {
    console.error("Erro na gestão de tecnologias:", error);
    return NextResponse.json(
      { error: error?.message || "Erro ao processar ação de tecnologia." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID da tecnologia é obrigatório." }, { status: 400 });
    }

    await deleteTechnology(id);
    return NextResponse.json({ success: true, deletedId: id });
  } catch (error: any) {
    console.error("Erro ao eliminar tecnologia:", error);
    return NextResponse.json(
      { error: "Erro ao eliminar a tecnologia." },
      { status: 500 }
    );
  }
}
