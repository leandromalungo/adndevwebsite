"use client";

import Link from "next/link";
import { Tag } from "./Tag";

export const Hero = () => {
  const tags = ["E-books", "Newsletters", "Bolsas de Estudo", "E muito mais"];

  return (
    <section className="relative z-10 pt-10 px-6 max-w-7xl mx-auto flex flex-col justify-center min-h-[85vh]">
      <div className="max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.1] mb-6 tracking-tight text-gray-50">
          Ecossistema de conteúdo, impulsionado por Tecnologia.
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
          O que precisas para entrar na área de tecnologia, desde cursos,
          bootcamps e muito mais. Um espaço feito para ti crescer na tua
          carreira tech, com a nossa ajuda.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-10">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-row gap-3 items-center w-full sm:w-auto">
            <button
              className="
                border border-violet-600 bg-violet-550 hover:bg-violet-600
                text-white
                px-4 sm:px-10
                py-2 sm:py-4
                rounded-xl sm:rounded-xl
                text-xs sm:text-lg
                font-bold
                transition-all transform
                shadow-xl shadow-violet-500/20
                active:scale-95
              "
            >
              Assinar agora
            </button>

            <Link href="/quiz">
              <button
                className="
                  border bg-violet-600 hover:border-violet-600
                  text-white
                  px-4 sm:px-10
                  py-2 sm:py-4
                  rounded-xl sm:rounded-xl
                  text-xs sm:text-lg
                  font-bold
                  transition-all transform
                  shadow-xl shadow-violet-500/20
                  active:scale-95
                "
              >
                Qual área é para mim?
              </button>
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-7 font-medium max-w-lg">
            Não perca tempo! Junte-se a nós e esteja com profissionais de
            tecnologia que já estão a transformar suas carreiras com nossos
            recursos exclusivos. Estamos a nos tornar o maior repositório de
            conteúdo tecnológico da lusofonia!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
