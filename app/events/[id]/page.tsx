import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { COMPREHENSIVE_EVENTS } from "@/data/eventsDatabase";

export async function generateStaticParams() {
  return COMPREHENSIVE_EVENTS.map((e) => ({ id: e.id }));
}

/**
 * Gera metadata dinâmica com canonical URL para cada evento
 **/

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = COMPREHENSIVE_EVENTS.find((e) => e.id === id);

  if (!event) {
    return {
      title: "Evento não encontrado",
    };
  }

  return {
    title: `${event.title} - ADN Developer`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      type: "article",
      images: event.imageUrl
        ? [
            {
              url: event.imageUrl,
              width: 1200,
              height: 630,
              alt: event.title,
            },
          ]
        : [],
    },
  };
}

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fafbfc]">
        <Navbar />
        <main className="flex-1 max-w-2xl mx-auto px-4 py-24 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 border border-amber-200 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-3">
            Evento Restrito a Membros
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Inicie sessão para ver detalhes deste evento
          </h1>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
            Informações sobre locais, palestrantes, horários e inscrições estão reservadas aos utilizadores com conta na ADN Developer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <Link
              href="/?auth=login"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm shadow-sm transition active:scale-95 text-center"
            >
              Iniciar Sessão / Criar Conta
            </Link>
            <Link
              href="/events"
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm shadow-2xs transition text-center"
            >
              Voltar aos Eventos
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { id } = await params;
  const event = COMPREHENSIVE_EVENTS.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-4">
        {event.date} • {event.timeRange}
      </p>
      <div className="relative w-full max-h-80 h-[320px]">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover rounded-lg"
          loading="lazy"
        />
      </div>
      <p className="mb-4">{event.description}</p>
      <div className="text-sm text-gray-500">
        {event.location} — {event.country}
      </div>
    </main>
  );
}
