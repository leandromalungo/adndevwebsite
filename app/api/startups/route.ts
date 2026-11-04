import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getStartupFeed } from "@/lib/startup-service";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || (session?.user as any)?.email || null;

    const { searchParams } = new URL(req.url);
    const country = searchParams.get("pais") || "ALL";
    const sector = searchParams.get("setor") || "all";
    const stage = searchParams.get("estagio") || "all";
    const search = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const result = await getStartupFeed({
      country,
      sector,
      stage,
      search,
      page,
      limit,
      userId,
    });

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=5, stale-while-revalidate=20",
      },
    });
  } catch (error: any) {
    console.error("Erro na API de Startups:", error);
    return NextResponse.json(
      { error: "Erro interno ao carregar o feed de startups." },
      { status: 500 }
    );
  }
}
