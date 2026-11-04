import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin-auth";
import { getAdminRankingData } from "@/lib/ranking-service";

export async function GET(req: NextRequest) {
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

    const data = await getAdminRankingData();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Erro ao obter dados de admin do ranking:", error);
    return NextResponse.json(
      { error: "Erro ao carregar dados de administração do ranking." },
      { status: 500 }
    );
  }
}
