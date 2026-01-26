"use client";

const CardHero = () => {
  return (
    <div className="relative w-full min-h-[450px] rounded-xl overflow-hidden flex items-center px-8 md:px-20 py-16">
      
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/86843ada19050958a1aecf7de9c7403876f74d53230a5a96d7e615c1348ba6a9_explore_catalog_2560x570_2x.webp')",
        }}
      />

      {/* Overlays (escurecer para legibilidade) */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-xl space-y-6 animate-in fade-in slide-in-from-left-4 duration-1000">
        <h2 className="text-4xl md:text-5xl text-white tracking-tight leading-tight">
          Explore o nosso catálogo
        </h2>

        <p className="text-gray-300 text-lg leading-relaxed font-medium">
          Existem milhares de jogos esperando para serem explorados. Navegue por
          gênero, recursos, preço e muito mais para encontrar seu próximo jogo
          favorito.
        </p>

        <div className="pt-4">
          <button className="bg-[#a3e635] hover:bg-[#bef264] text-black font-black py-4 px-10 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#a3e635]/20 text-sm uppercase tracking-wide">
            Veja todos os jogos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardHero;
