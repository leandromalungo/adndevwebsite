"use client";

import { MapPin, Globe, ExternalLink, Navigation } from "lucide-react";

interface OpportunityMapProps {
  location?: string;
  country: string;
  format: "online" | "presencial" | "hibrido";
  venueName?: string;
}

export function OpportunityMap({
  location,
  country,
  format,
  venueName,
}: OpportunityMapProps) {
  const isOnlineOnly = format === "online" || (!location && format !== "presencial");

  if (isOnlineOnly) {
    return (
      <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
            <Globe className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-emerald-950">
              Oportunidade 100% Online
            </h4>
            <p className="mt-1 text-xs text-emerald-800 leading-relaxed">
              Pode participar a partir de qualquer localidade em {country || "qualquer país lusófono"}. Os links de acesso direto e transmissões estarão disponíveis após a inscrição.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const query = [venueName, location, country].filter(Boolean).join(", ");
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xs">
      <div className="p-4 border-b border-gray-100 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-700 uppercase tracking-wider mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Localização do Evento</span>
          </div>
          <h4 className="text-sm font-bold text-gray-900 truncate">
            {venueName || location || country}
          </h4>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {[location, country].filter(Boolean).join(" • ")}
          </p>
        </div>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-violet-50 text-gray-700 hover:text-violet-700 transition border border-gray-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
          aria-label={`Ver rota para ${query} no Google Maps (abre num novo separador)`}
        >
          <Navigation className="w-3.5 h-3.5 text-violet-600" />
          <span>Ver mapa</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
      </div>

      {/* Embed interativo do mapa */}
      <div className="relative w-full h-52 sm:h-60 bg-gray-100">
        <iframe
          title={`Mapa de localização: ${query}`}
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen={false}
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full filter saturate-[0.95]"
        />
      </div>
    </div>
  );
}
