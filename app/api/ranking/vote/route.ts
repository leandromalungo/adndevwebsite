import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { castTechnologyVote, normalizeCountryCode } from "@/lib/ranking-service";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Inicie sessão com a sua conta para votar nas tecnologias." },
        { status: 401 }
      );
    }

    const userId = session.user.id || (session.user as any)?.email;
    if (!userId) {
      return NextResponse.json(
        { error: "Identificador de utilizador inválido." },
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { technologyId, voteType, countryCode } = body;

    if (!technologyId || typeof technologyId !== "string") {
      return NextResponse.json(
        { error: "Tecnologia não especificada." },
        { status: 400 }
      );
    }

    if (voteType !== "up" && voteType !== "down") {
      return NextResponse.json(
        { error: "Tipo de voto inválido. Utilize 'up' ou 'down'." },
        { status: 400 }
      );
    }

    // Resolver país do utilizador (do body, do perfil no Supabase ou padrão lusófono)
    let userCountry = countryCode ? normalizeCountryCode(countryCode) : null;
    if (!userCountry && isSupabaseConfigured()) {
      try {
        const { data: profile } = await supabaseAdmin
          .from("user_profiles")
          .select("country")
          .eq("user_id", userId)
          .maybeSingle();

        if (profile?.country) {
          userCountry = normalizeCountryCode(profile.country);
        }
      } catch {
        // Fallback
      }
    }

    if (!userCountry) {
      userCountry = "AO";
    }

    const voteResult = await castTechnologyVote({
      technologyId,
      userId,
      voteType,
      countryCode: userCountry,
    });

    return NextResponse.json({
      success: true,
      action: voteResult.action,
      userVote: voteResult.userVote,
      technology: {
        id: voteResult.technology.id,
        name: voteResult.technology.name,
        upvotes_count: voteResult.technology.upvotes_count,
        downvotes_count: voteResult.technology.downvotes_count,
        score: voteResult.technology.score,
      },
    });
  } catch (error: any) {
    console.error("Erro na votação de tecnologia:", error);
    return NextResponse.json(
      { error: error?.message || "Ocorreu um erro ao registar o seu voto." },
      { status: 500 }
    );
  }
}
