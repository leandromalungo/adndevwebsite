"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* =======================
   TYPES / INTERFACES
======================= */

interface CareerTip {
  id: string;
  date: string;
  title: string;
  image: string;
  imageAlt: string;
}

interface CareerTipsSectionProps {
  title?: string;
  description?: string;
  tips: CareerTip[];
  blogUrl?: string;
}

/* =======================
   DADOS DOS CARDS (IMAGENS)
======================= */

const careerTipsData: CareerTip[] = [
  {
    id: "1",
    date: "Mar 12, 2025",
    title: "Carreira em Cybersecurity: o que você precisa saber",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    imageAlt: "Frontend development",
  },
  {
    id: "2",
    date: "Mar 15, 2025",
    title: "Como é trabalhar com tecnoologia no seculo XXI",
    image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
    imageAlt: "Backend vs Frontend",
  },
  {
    id: "3",
    date: "Mar 20, 2025",
    title: "Veja como iniciar sua carreira em Data Science",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    imageAlt: "Data Science",
  },
  {
    id: "4",
    date: "Mar 25, 2025",
    title: "Quaal curso escolher na área de tecnologia?",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    imageAlt: "DevOps",
  },
  {
    id: "5",
    date: "Mar 28, 2025",
    title: "Como funciona a área de inteligência artificial e machine learning",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    imageAlt: "AI & ML",
  },
];

/* =======================
   COMPONENTE ÚNICO
======================= */

export default function CareerQuiz() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-zinc-900">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('../../fundo.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative flex items-center px-8 py-20 md:px-12 md:py-24">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
              Não sabes qual área ou função combina com suas habilidades?
            </h2>
            <p className="mt-4 max-w-2xl text-gray-100 mb-3">
              Faça nosso quiz apartir do seu whatsapp, rápido para descobrir a carreira ideal para você,
              baseado em suas habilidades, interesses e dê o primeiro passo rumo
              ao sucesso profissional!
            </p>

            <button
              onClick={handleClick}
              disabled={loading}
              className={`
                inline-flex items-center gap-2 px-6 py-3 font-semibold
                transition-all duration-200
                active:scale-95
                ${
                  loading
                    ? "bg-orange-300 cursor-not-allowed text-zinc-800"
                    : "bg-orange-400 hover:bg-orange-500 text-gray-100"
                }
              `}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  Faça o teste e descubra!
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* TIPS SECTION */}
      <section className="w-full bg-background py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              Leia dicas de quem já está trabalhando no mercado para impulsionar a tua forma de aprender.
              <span className="font-bold">sua carreira</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Dicas valiosas e insights para impulsionar sua jornada
              profissional no mundo da tecnologia, desenvolvimento e muito mais
              diretamente da nossa plataforma. ADN Developer, onde
              compartilhamos conhecimento para ajudar você a alcançar o sucesso
              na sua carreira. Seja você um iniciante ou um profissional
              experiente.
            </p>
          </div>

          {/* Tips Grid expandida */}
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {careerTipsData.map((tip) => (
              <div
                key={tip.id}
                className="group relative overflow-hidden rounded-2xl transition-transform hover:scale-105"
                style={{
                  backgroundImage: `url(${tip.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  aspectRatio: "3 / 4",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70" />

                <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 p-6">
                  <time className="text-xs font-medium text-gray-300 uppercase tracking-wide">
                    {tip.date}
                  </time>
                  <h3 className="line-clamp-3 text-lg font-semibold leading-tight text-white">
                    {tip.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={handleClick}
              disabled={loading}
              className={`inline-flex items-center gap-2 px-6 p-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors disabled:cursor-not-allowed disabled:bg-gray-400`} >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processando...
                </>
              ) : (
                <>
                  Explore nosso blog completo
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
