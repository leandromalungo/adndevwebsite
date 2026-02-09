"use client";

import ContentCard from "@/components/home/ContentCard";

const ContentSection = () => {
  return (
    <section className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-gray-600 font-medium text-sm mb-1">Conteúdos</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] uppercase tracking-tight">
          Explore nosso universo
        </h2>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Large Vertical Card */}
        <div className="h-full">
          <ContentCard
            tag="VídeoCast"
            title="Canal Fora da Norma no YouTube"
            description="Um canal sobre a Vida, Universo Tech e tudo mais."
            linkText="Assista aos episódios"
            linkHref="#"
            backgroundImage="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1000"
            variant="large"
            showPlayButton
          />
        </div>

        {/* Right Column - Two Horizontal Cards */}
        <div className="flex flex-col gap-6">
          <ContentCard
            tag="42 Network"
            title="A 42 pelo mundo"
            description="Global, disruptiva e acessível. Conheça os campi ao redor do mundo."
            linkText="Conheça a 42 Network"
            linkHref="#"
            backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
            variant="small"
          />

          <ContentCard
            tag="Redes Sociais"
            title="Fique por dentro"
            description="Acompanhe as novidades e informações sobre os próximos processos seletivos nas redes sociais."
            linkText=""
            linkHref="#"
            backgroundImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000"
            variant="small"
            showSocialIcons
          />
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
