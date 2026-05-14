import Image from "next/image";

interface PartnerItem {
  name: string;
  href: string;
  logoSrc?: string;
  initials: string;
}

const partners: PartnerItem[] = [
  {
    name: "Saturno Software",
    href: "https://saturno.software/",
    logoSrc: "/saturno.png",
    initials: "S",
  },
   {
    name: "GDG Luanda",
    href: "https://gdg.community.dev/gdg-luanda/",
    logoSrc: "/gdg.png",
    initials: "GdgL",
  },
   {
    name: "Querando o Controle",
    href: "https://quebrandoocontrole.com",
    logoSrc: "/qoc.png",
    initials: "QoC",
  },
   {
    name: "Elas no Code",
    href: "https://saturno.software/",
    logoSrc: "/enc.png",
    initials: "EnC",
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

        <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 text-center"
            >
              <div className="mx-auto mb-2 flex items-center justify-center">
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
