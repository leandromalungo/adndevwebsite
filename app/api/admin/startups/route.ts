import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin-auth";
import {
  getAdminStartupsData,
  adminCreateStartup,
  adminUpdateStartup,
  adminDeleteStartup,
} from "@/lib/startup-service";

async function verifyAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const isAdmin = session?.user?.isAdmin || isAdminEmail(userEmail);
  return { authorized: Boolean(session && isAdmin), session };
}

export async function GET() {
  try {
    const { authorized } = await verifyAdmin();
    if (!authorized) {
      return NextResponse.json({ error: "Acesso reservado a administradores." }, { status: 403 });
    }

    const data = await getAdminStartupsData();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Erro na API admin de startups:", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { authorized } = await verifyAdmin();
    if (!authorized) {
      return NextResponse.json({ error: "Acesso reservado a administradores." }, { status: 403 });
    }

    const body = await req.json();
    const result = await adminCreateStartup(body);

    if (!result.success) {
      return NextResponse.json({ error: result.message || "Erro ao criar startup." }, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar startup (admin):", error);
    return NextResponse.json({ error: "Erro interno ao cadastrar startup." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { authorized } = await verifyAdmin();
    if (!authorized) {
      return NextResponse.json({ error: "Acesso reservado a administradores." }, { status: 403 });
    }

    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "ID da startup é obrigatório." }, { status: 400 });
    }

    const result = await adminUpdateStartup(id, updates);
    if (!result.success) {
      return NextResponse.json({ error: result.message || "Erro ao atualizar startup." }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Erro ao atualizar startup (admin):", error);
    return NextResponse.json({ error: "Erro interno ao atualizar startup." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { authorized } = await verifyAdmin();
    if (!authorized) {
      return NextResponse.json({ error: "Acesso reservado a administradores." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID da startup é obrigatório." }, { status: 400 });
    }

    const result = await adminDeleteStartup(id);
    if (!result.success) {
      return NextResponse.json({ error: result.message || "Erro ao remover startup." }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Erro ao remover startup (admin):", error);
    return NextResponse.json({ error: "Erro interno ao eliminar startup." }, { status: 500 });
  }
}
