import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin-auth";
import { adminSetFeaturedToday } from "@/lib/startup-service";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const isAdmin = session?.user?.isAdmin || isAdminEmail(userEmail);

    if (!session || !isAdmin) {
      return NextResponse.json({ error: "Acesso reservado a administradores." }, { status: 403 });
    }

    const { startupId, date } = await req.json();
    if (!startupId) {
      return NextResponse.json({ error: "ID da startup é obrigatório." }, { status: 400 });
    }

    const result = await adminSetFeaturedToday(startupId, date);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Erro ao definir destaque do dia:", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
