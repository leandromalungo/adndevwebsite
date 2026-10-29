import Link from "next/link";
import { ArrowLeft, ExternalLink, Globe, CalendarDays, CheckCircle2, ShieldCheck } from "lucide-react";
import type { ScholarshipItem } from "@/data/types";

export default function ScholarshipDetails({ item }: { item: ScholarshipItem }) {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/bolsas"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-72 w-full overflow-hidden bg-slate-100">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
            </div>
            <div className="space-y-4 p-6">
              <div className="space-y-1">
                <p className="text-sm uppercase tracking-[0.25em] text-violet-700">Bolsa de Estudo</p>
                <h1 className="text-2xl font-semibold text-slate-900">{item.title}</h1>
              </div>

              {item.country && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Globe className="w-4 h-4 text-violet-600" />
                  <span>{item.country}</span>
                </div>
              )}

              {item.deadline && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CalendarDays className="w-4 h-4 text-violet-600" />
                  <span>Deadline: {item.deadline}</span>
                </div>
              )}

              {item.funding && (
                <div className="rounded-2xl bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700">
                  {item.funding}
                </div>
              )}

              <div className="space-y-2 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                {item.degreeLevels && <p><strong>Nível:</strong> {item.degreeLevels}</p>}
                {item.institution && <p><strong>Instituição:</strong> {item.institution}</p>}
                {item.source && <p><strong>Detalhes específicos:</strong> {item.source}</p>}
              </div>

              <div className="space-y-3">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-800"
                >
                  Candidate-se Agora
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Visão Geral</h2>
              <p className="text-slate-700 leading-relaxed">{item.fullDescription ?? item.description}</p>
            </div>

            {item.benefits && item.benefits.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-violet-600" />
                  <h3 className="text-lg font-semibold text-slate-900">Benefícios Financeiros</h3>
                </div>
                <ul className="space-y-3 text-slate-700">
                  {item.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 w-4 h-4 text-emerald-500" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.requirements && item.requirements.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-violet-600" />
                  <h3 className="text-lg font-semibold text-slate-900">Documentos necessários</h3>
                </div>
                <ul className="grid gap-3 text-slate-700 sm:grid-cols-2">
                  {item.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-2.5 w-2.5 rounded-full bg-violet-600" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
