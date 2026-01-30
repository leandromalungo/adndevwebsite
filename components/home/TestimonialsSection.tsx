"use client";

import { Quote } from "lucide-react";

interface Testimonial {
  text: string;
  name?: string;
  role: string;
  avatar: string;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      text: "Eu nunca pensei que aprender programação pudesse ser tão acessível. Graças à ADN Developers, consegui adquirir habilidades valiosas sem gastares muito tempo e esforço!",
      name: "Filipe Mafuila",
      role: "Desenvolvedor Front-end, de Angola.",
      avatar: "https://picsum.photos/100/100?random=11",
    },
    {
      text: "A ADN Developers transformou minha jornada de aprendizado em tecnologia. Os recursos gratuitos e a comunidade de apoio me ajudaram a crescer como desenvolvedor e a alcançar meus objetivos profissionais.",
      name: "Francisco Diakomas",
      role: "Programador, de Moçambique.",
      avatar: "https://picsum.photos/100/100?random=12",
    },
    {
      text: "Como estudante de tecnologia, a ADN Developers tem sido uma fonte inestimável de conhecimento. Os tutoriais e cursos gratuitos me permitiram explorar novas áreas e aprimorar minhas habilidades técnicas.",
      name: "Bernardo Manuel",
      role: "Desenvolvedor Back-end, do Brasil.",
      avatar: "https://picsum.photos/100/100?random=13",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 text-center">
        <div className="mb-12">
          <h3 className="text-lg font-bold text-[#1e293b] mb-2">Testemunhos</h3>
          <h2 className="text-4xl sm:text-5xl text-[#1e293b] uppercase opacity-40">
            Somos a voz dos estudantes de T.I.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl overflow-hidden shadow-xl shadow-blue-900/10 transition-transform hover:scale-[1.02]"
            >
              {/* Seção Superior Branca */}
              <div className="bg-white p-8 sm:p-10 flex flex-col items-start text-left flex-grow">
                <Quote className="w-12 h-12 text-[#475569] mb-6 rotate-180 fill-current opacity-20" />
                <p className="text-[#475569] text-base leading-relaxed">
                  {t.text}
                </p>
              </div>

              {/* Seção Inferior Laranja */}
              <div className="bg-[#1e293b] p-6 flex items-center gap-4 text-left">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
                  <img
                    src={t.avatar}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col text-white">
                  {t.name && (
                    <span className="font-bold text-sm leading-tight">
                      {t.name}
                    </span>
                  )}
                  <span className="text-[13px] font-medium opacity-90 leading-tight">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-[#1e293b] text-base sm:text-lg font-medium leading-relaxed">
            Junte-se a milhares de estudantes de tecnologia que já estão
            transformando suas carreiras com a ADN Developer. Veja por si mesmo
            por que somos a escolha número um para quem busca excelência em
            educação tecnológica.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
