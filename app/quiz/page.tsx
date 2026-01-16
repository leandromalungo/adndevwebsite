"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

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

/* =======================
   DADOS DOS CARDS
======================= */

const careerTipsData: CareerTip[] = [
  {
    id: "1",
    date: "Mar 12, 2025",
    title: "Carreira em Cybersecurity: o que você precisa saber",
    image: "/images/img3.jpg",
    imageAlt: "Cybersecurity",
  },
  {
    id: "2",
    date: "Mar 15, 2025",
    title: "O que UI/UX Design?",
    image: "/images/img2.jpg",
    imageAlt: "Tecnologia",
  },
  {
    id: "3",
    date: "Mar 20, 2025",
    title: "Como entrar ser um GameDev?",
    image: "/images/f3061d32abe90a964a881339068c5c9f.jpg",
    imageAlt: "Data Science",
  },
  {
    id: "4",
    date: "Mar 25, 2025",
    title: "Como construir um portfolio?",
    image: "/images/10e269341acdb04f9e95d5b09e18e71e.jpg",
    imageAlt: "Cursos",
  },
  {
    id: "5",
    date: "Mar 28, 2025",
    title: "Qual melhor linguagem?",
    image: "/images/img5.jpg",
    imageAlt: "IA e ML",
  },
];

/* =======================
   COMPONENTE PRINCIPAL
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
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/fundo.jpg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        <div className="relative flex items-center px-8 py-20 md:px-12 md:py-24">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
              Não sabes qual área combina com suas habilidades?
            </h2>

            <p className="mt-4 max-w-2xl text-gray-100 mb-3">
              Faça nosso quiz via WhatsApp e descubra a carreira ideal com base nas suas habilidades e interesses!
            </p>

            <button
              onClick={handleClick}
              disabled={loading}
              className={`inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-200 active:scale-95 rounded-lg ${
                loading
                  ? "bg-green-300 cursor-not-allowed text-zinc-800"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
                  Faça o teste e descubra!
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* TIPS SECTION */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Leia dicas de quem já está no mercado e impulsione sua carreira
            </h2>
            <p className="mt-4 text-gray-600">
              Insights valiosos para quem quer entrar ou crescer no mundo da tecnologia.
            </p>
          </div>

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
                  <h3 className="line-clamp-3 text-lg font-semibold text-white">
                    {tip.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleClick}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
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

      <Footer />
    </>
  );
}
