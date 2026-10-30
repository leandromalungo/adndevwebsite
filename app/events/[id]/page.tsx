import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
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
