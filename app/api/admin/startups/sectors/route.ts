import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin-auth";
import { adminCreateSector, adminToggleSector } from "@/lib/startup-service";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const isAdmin = session?.user?.isAdmin || isAdminEmail(userEmail);

    if (!session || !isAdmin) {
      return NextResponse.json({ error: "Acesso reservado a administradores." }, { status: 403 });
    }

    const body = await req.json();
    const result = await adminCreateSector(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar setor:", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const isAdmin = session?.user?.isAdmin || isAdminEmail(userEmail);

    if (!session || !isAdmin) {
      return NextResponse.json({ error: "Acesso reservado a administradores." }, { status: 403 });
    }

    const { sectorId, isActive } = await req.json();
    if (!sectorId) {
      return NextResponse.json({ error: "ID do setor é obrigatório." }, { status: 400 });
    }

    const result = await adminToggleSector(sectorId, Boolean(isActive));
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Erro ao atualizar setor:", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
