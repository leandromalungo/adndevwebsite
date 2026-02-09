"use client";

const CardHero = () => {
  return (
    <div className="relative w-full min-h-[450px] rounded-xl overflow-hidden flex items-center px-8 md:px-20 py-16">
      
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/86843ada19050958a1aecf7de9c7403876f74d53230a5a96d7e615c1348ba6a9_explore_catalog_2560x570_2x.webp')",
        }}
      />

      {/* Sobreposições (escurecer para legibilidade) */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-xl space-y-6 animate-in fade-in slide-in-from-left-4 duration-1000">
        <h2 className="text-4xl md:text-5xl text-white tracking-tight leading-tight">
          Nós somos a voz de quem desenvolve na lusofonia
        </h2>

        <p className="text-gray-300 text-lg leading-relaxed font-medium">
          Fale conosco e descubra como podemos ajudar a impulsionar sua carreira, usando nossos recursos, conexões e expertise no setor de tecnologico para levar você ao próximo nível.
        </p>

        <div className="pt-4">
          <button className="bg-[#356ae6] font-semibold hover:bg-[#4071e5] text-white py-4 px-10 rounded transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#a3e635]/20 text-sm uppercase tracking-wide">
            Acessar agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardHero;
