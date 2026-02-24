import Image from "next/image";

const CardHero = () => {
  return (
    <div className="relative w-full min-h-[450px] rounded overflow-hidden flex items-center px-8 md:px-20 py-16">
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <Image
          src="/api/images/cardheroo"
          alt="Card Hero Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Sobreposições (escurecer para legibilidade) */}
      <div className="absolute inset-0 bg-black/85" />
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" /> */}

      {/* Conteúdo */}
      <div className="relative z-10 max-w-xl space-y-6 animate-in fade-in slide-in-from-left-4 duration-1000">
        <h2 className="text-4xl md:text-5xl text-white tracking-tight leading-tight">
          Nós somos a voz de quem desenvolve na lusofonia
        </h2>

        <p className="text-gray-300 text-lg leading-relaxed font-medium">
          Fale conosco e descubra como podemos ajudar a impulsionar sua
          carreira, usando nossos recursos, conexões e expertise no setor de
          tecnologico para levar você ao próximo nível.
        </p>

        <div className="pt-4">
          <button
            className=" inline-flex items-center justify-center
                border border-violet-600
                bg-violet-550 hover:bg-violet-600/90
                text-white
                px-4 sm:px-10 lg:px-12
                py-2 sm:py-4 lg:py-5
                rounded text-xs sm:text-lg lg:text-xl
                transition-all transform
                shadow-xl shadow-violet-500/40
                active:scale-95
                disabled:opacity-70 disabled:cursor-not-allowed
                uppercase tracking-wide"
          >
            Junte-se a nós
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardHero;
