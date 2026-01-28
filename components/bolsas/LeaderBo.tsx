"use client";

import { WorkCard } from "./WorkCard";

export const LeaderBo = () => {
  const workItems = [
    {
      image: "/images/bolsas/africabo.jpg",
      title: "Programa de bolsas estudo líderes africanos",
      description:
        "Este programa oferece bolsas de estudo completas para estudantes africanos talentosos que desejam cursar universidades de renome mundial. As bolsas cobrem todas as despesas, incluindo mensalidades, acomodação e despesas de subsistência.",
    },
    {
      image: "/images/bolsas/americabo.jpg",
      title: "Programa de bolsas estudo líderes na america",
      description:
        "Este programa de bolsas de estudo para líderes na América visa capacitar jovens talentos com potencial de liderança, oferecendo suporte financeiro e mentorias exclusivas para impulsionar suas carreiras acadêmicas e profissionais, tanto no Brasil quanto no exterior.",
    },
    {
      image: "/images/bolsas/eurobo.webp",
      title: "Programa de bolsas estudo líderes na europa",
      description:
        "Este programa de bolsas de estudo para líderes na Europa é projetado para identificar e apoiar estudantes excepcionais com potencial de liderança, proporcionando-lhes oportunidades acadêmicas em instituições de prestígio, juntamente com mentorias e desenvolvimento profissional, tanto em portugal quanto no exterior.",
    },
    {
      image: "/images/bolsas/mundialbo.jpg",
      title: "Programa de bolsas estudo líderes mundias",
      description:
        "Este programa de bolsas de estudo para líderes mundiais tem como objetivo identificar e apoiar estudantes talentosos com potencial de liderança global, oferecendo-lhes oportunidades acadêmicas em instituições de renome internacional, juntamente com mentorias e desenvolvimento profissional para prepará-los para desafios globais.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-12">
      <header className="mb-12">
        <h2 className="title-font text-4xl md:text-[40px] text-[#333333] mb-6 uppercase">
          Bolsas para líderes
        </h2>
        <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-5xl">
          A comunidade é a essência da Fundação Estudar. Identificamos e
          impulsionamos talentos brasileiros que encontram aqui um espaço de
          acolhimento e troca para a vida toda. Ao assinares a plataforma
          receberas alertas mensais para te candidatares a bolsas de estudo e
          programas a sua escolha.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {workItems.map((item, index) => (
          <WorkCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};
