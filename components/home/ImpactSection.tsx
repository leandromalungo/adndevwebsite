"use client";

const ImpactSection = () => {
  const stats = [
    {
      value: "+ 500 Mil",
      description: "A soma das nossas taxas de visualizações nas redes sociais passam as espectativas mensais."
    },
    {
      value: "1000",
      description: "Já contamos com mil inscrito na nossa plataforma."
    },
    {
      value: "2",
      description: "Contamos com dois projectos já implementados."
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-semibold text-[#1e293b] mb-6 uppercase">
            Nossos alcance
          </h2>
          <p className="text-[#64748b] text-base sm:text-lg max-w-3xl leading-relaxed">
            We're closing the opportunity gap for the next generation of innovators— from elementary school to early career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-3xl lg:text-5xl font-semibold text-[#1e293b] mb-4 tracking-tight">
                {stat.value}
              </span>
              <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
