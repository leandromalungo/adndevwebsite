"use client";

const CardHero = () => {
  return (
    <div className="relative lg:w-[86%] md:w-[95%] w-full max-w-5xl min-h-[100px] rounded-xl overflow-hidden flex items-center px-8 md:px-20 py-8 mx-auto">
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/86843ada19050958a1aecf7de9c7403876f74d53230a5a96d7e615c1348ba6a9_explore_catalog_2560x570_2x.webp')",
        }}
      />

      {/* Sobreposições */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Conteúdo CENTRALIZADO */}
      <div className="relative z-10 max-w-2xl text-center space-y-3 px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl text-white tracking-tight leading-tight uppercase">
          Aproveitando o melhor conteúdo
        </h2>

        <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium">
          Todos os nossos conteúdos premium e receba alertas filtrados durante
          todo o mês. Aproveite recursos exclusivos que vão impulsionar sua
          jornada de trabalho e tudo isso por um preço acessível. Assine agora e comece a
          explorar!
        </p>
      </div>
    </div>
  );
};

export default CardHero;
