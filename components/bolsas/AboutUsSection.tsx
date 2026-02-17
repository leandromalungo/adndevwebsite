"use client";

export const AboutUsSection = () => {
  return (
    <section className="max-w-7xl mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left Column: Text Content */}
        <div className="flex flex-col">
          <span className="text-[#666666] font-bold text-sm tracking-widest uppercase mb-4">
            Como funciona?
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-4xl text-[#222222] leading-[1.1] mb-8 uppercase">
            O repositório é mantido para ajudar jovens talentos a encontrarem
            oportunidades educacionais globais.
          </h2>

          <p className="text-[#666666] text-lg leading-relaxed mb-10">
            Nós conectamos você com oportunidades de bolsas de estudo em
            universidades renomadas ao redor do mundo, facilitando o acesso a
            uma educação de qualidade sem custos financeiros. Seja você um
            estudante buscando expandir seus horizontes acadêmicos ou um jovem
            profissional em busca de crescimento pessoal e profissional, nosso
            repositório é o seu ponto de partida para alcançar seus objetivos
            educacionais globais.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Feature 1 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-bold text-[#222222] text-xl">
                  O que acontece se eu assinar?
                </h3>
              </div>
              <p className="text-[#666666] leading-relaxed">
                Ao assinar, você receberá alertas mensais sobre novas bolsas de
                estudo e programas educacionais que correspondem ao seu perfil e
                interesses. Isso garante que você esteja sempre atualizado sobre
                as melhores oportunidades disponíveis, facilitando sua jornada
                acadêmica e profissional.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-bold text-[#222222] text-xl">
                  Informações adicionais
                </h3>
              </div>
              <p className="text-[#666666] leading-relaxed">
              Todas as informações partilhadas aqui são coletadas de fontes públicas e
              verificadas. Nosso objetivo é fornecer um repositório confiável e
              atualizado de oportunidades educacionais globais para jovens talentos. 
              Dai nós por simplesmente não somos responsáveis por quaisquer mudanças ou atualizações
              feitas pelas instituições que oferecem as bolsas de estudo.
              </p>
              <span className="text-[9px] text-gray-400">
              Fonte: fontes devidamente mencionadas nesta postagem sem nenhuma alteração.
            </span>
            </div>
          </div>

          <div>
            <button className="bg-[#1c7ae0] hover:bg-[#1d69ba] text-[#ffffff] font-bold py-4 px-8 rounded transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">
              Assine agora
            </button>
          </div>
        </div>

        {/* Right Column: Image Stack */}
        <div className="flex flex-col gap-6">
          <div className="rounded overflow-hidden shadow-lg h-[350px] lg:h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop"
              alt="Group of people talking to an elder"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded overflow-hidden shadow-lg h-[350px] lg:h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop"
              alt="Large group of young people posing outdoors"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
