"use client";

const CardHero = () => {
  return (
    <div className="relative w-full min-h-[100px] rounded-xl overflow-hidden flex items-center px-8 md:px-20 py-8">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/86843ada19050958a1aecf7de9c7403876f74d53230a5a96d7e615c1348ba6a9_explore_catalog_2560x570_2x.webp')",
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Content CENTRALIZADO */}
      <div className="relative z-10 max-w-3xl text-center space-y-3 px-4">
        <h2 className="text-3xl md:text-4xl text-white tracking-tight leading-tight">
          Assinatura ADN Developer
        </h2>

        <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium">
          Tenha acesso ilimitado a todos os nossos conteúdos premium, incluindo alertas filtrados durante um mês inteiro,
          a um preço acessível. Aproveite ao máximo os recursos exclusivos que oferecemos para impulsionar sua jornada
        </p>
      </div>
    </div>
  );
};

export default CardHero;
