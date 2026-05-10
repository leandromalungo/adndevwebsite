import Image from "next/image";

interface PartnerItem {
  name: string;
  href: string;
  logoSrc?: string;
  description: string;
  initials: string;
}

const partners: PartnerItem[] = [
  {
    name: "Saturno Software",
    href: "https://saturno.software/",
    logoSrc: "/saturno.png",
    description: "Desenvolvimento autoral e colaboração com estúdios e equipes.",
    initials: "S",
  },
   {
    name: "GDG Luanda",
    href: "https://saturno.software/",
    logoSrc: "/gdg.png",
    description: "Desenvolvimento autoral e colaboração com estúdios e equipes.",
    initials: "S",
  },
   {
    name: "Open Source Angola Community",
    href: "https://saturno.software/",
    logoSrc: "/aosp.png",
    description: "Desenvolvimento autoral e colaboração com estúdios e equipes.",
    initials: "S",
  },
   {
    name: "Quebrando Controle",
    href: "https://saturno.software/",
    logoSrc: "/qoc.png",
    description: "Desenvolvimento autoral e colaboração com estúdios e equipes.",
    initials: "S",
  },
   {
    name: "Elas no Code",
    href: "https://saturno.software/",
    logoSrc: "/enc.png",
    description: "Desenvolvimento autoral e colaboração com estúdios e equipes.",
    initials: "S",
  }
];

export default function PartnersSection() {
  return (
    <section className="w-full py-12 bg-[#f7f8f9]">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-10">
          <h1 className="text-sm uppercase font-bold tracking-[0.3em] text-gray-900 mb-3">
            Parceiros
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Colaborações estratégicas com organizações e comunidades que compartilham nossa visão de capacitar talentos e impulsionar a inovação tecnológica. Juntos, estamos construindo um ecossistema vibrante.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 text-center"
            >
              <div className="mx-auto mb-2 flex items-center justify-center bg-slate-100">
                {partner.logoSrc ? (
                  <Image
                    src={partner.logoSrc}
                    alt={`${partner.name} logo`}
                    width={96}
                    height={96}
                    className="object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-3xl font-extrabold text-slate-800">
                    {partner.initials}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">
                {partner.name}
              </h3>
              <p className="text-[10px] text-slate-600 leading-relaxed">
                {partner.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
