"use client";

import React from "react";
import Link from "next/link";
import { useGoogleSignup } from "@/hooks/useGoogleSignup";
import { Loader2 } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import type { FilterTab } from "@/components/CountryFilter";

interface CategoryCardProps {
  image: string;
  title: string;
  description: string;
  href: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  image,
  title,
  description,
  href,
}) => {
  return (
    <div className="flex flex-col h-full rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-grow p-6 bg-[#2e405c]">
        <h3 className="text-xl font-extrabold text-white mb-3 leading-tight">
          {title}
        </h3>

        <p className="text-white text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        <span className="text-[10px] text-gray-100 mb-4">
          Fonte: Esta bolsa tem as suas fontes devidamente mencionadas nesta postagem sem nenhuma alteração.
        </span>
        <div>
          <Link
            href={href}
            className="inline-block border-2 border-white text-white font-bold py-2 px-6 rounded hover:bg-[#0d9488] hover:text-white transition duration-200 text-sm"
          >
            Ver mais
          </Link>
        </div>
      </div>
    </div>
  );
};

interface RecentSectionProps {
  selectedCountry?: FilterTab;
}

export const RecentSection: React.FC<RecentSectionProps> = ({
  selectedCountry,
}) => {
  const { triggerGoogleSignup, loading } = useGoogleSignup();

  const categories = [
    {
      image: "/images-bolsas-europeu.webp",
      title: " Programa de Bolsas Sakharov 2026 do Parlamento Europeu",
      description:
        "Programa de Bolsas Sakharov 2026 - 7 a 20 de junho de 2026 - edital de inscrições. O Programa de Bolsas Sakharov do Parlamento Europeu oferece a até 14 defensores dos direitos humanos, selecionados de países não pertencentes à UE, a oportunidade de participar de um treinamento intensivo de duas semanas em Bruxelas e em outro local em um Estado-membro da UE.",
      href: "https://www.europarl.europa.eu/sakharovprize/pt/fellowship/supporting-defenders",
    },
    {
      image: "/images-bolsas-qatar.webp",
      title: "LICENCIATURA, MESTRADO E DOUTORADO EM QATAR",
      description:
        "Na Universidade Hamad Bin Khalifa as candidaturas estão abertas até 01 de Março de 2026, uma oportunidade para quem deseja uma admissão numa das melhores universidades em Qatar com possibilidade de obter auxílio financeiro. Mais informações desse programa serão enviados daqui a nada.",
      href: "https://www.abdn.ac.uk/qatar/undergraduate/business-management/",
    },
    {
      image: "/images-bolsas-uppsala.webp",
      title: "BOLSAS DE ESTUDO DA UNIVERSIDADE DE UPPSALA NA SUÉCIA",
      description:
        "A Universidade de Uppsala oferece bolsas de estudo para 2026 em diversos programas de bacharelado e mestrado. A duração do bacharelado é de 4 anos e a do mestrado, de 1 ano. Todo o processo de candidatura a esta bolsa de estudos é online. Durante a candidatura, leia atentamente todos os termos e condições e faça o upload de todos os documentos necessários antes do prazo final.",
      href: "https://www.uu.se/en/study/masters-studies/scholarships/application-guide",
    },
    {
      image: "/images-bolsas-studyro.webp",
      title: "Bolsas de estudo do governo da Romênia",
      description:
        "Programa de bolsas oferecido pelo governo romeno, gerido pelo Ministério das Relações Exteriores (MAE) e pelo Ministério da Educação e Pesquisa. O objetivo é permitir que estudantes internacionais (fora da União Europeia) procurem Licenciatura, mestrado ou doutorado em universidades romenas. ",
      href: "https://scholarships.studyinromania.gov.ro/",
    },
    {
      image: "/images-bolsas-usa.webp",
      title: "Programas Fulbright para o ano académico 2027-2028",
      description:
        "Fulbright Foreign Student Program, Fulbright African Research Scholar Program (ARSP), Estes programas de prestígio proporcionam oportunidades únicas de investigação e estudo nos Estados Unidos, impulsionando carreiras académicas e alargando redes profissionais a nível global.",
      href: "https://ow.ly/60a250Y3CAG",
    },
    {
      image: "/images-bolsas-turquia.webp",
      title: "Programa de bolsas de estudos para Turquia",
      description:
        "Turquia oferece ensino de qualidade e todos anos recebem estudantes oriundos de vários países do mundo, incluindo Angola, Moçambique, Brasil, Guine Bissau, Timor Leste, Portugal, cabo Verde e etc. Os níveis oferecidos no programa abrangem: Licenciatura, Mestrado e Doutorado. O programa cobre absolutamente tudo desde passagens aéreas, subsídio mensal, acomodação, curso de língua e etc.",
      href: "https://www.turkiyeburslari.gov.tr/",
    },
    {
      image: "/images-bolsas-turismo.webp",
      title:
        " Candidaturas para estudantes internacionais às Escolas do Turismo de Portugal",
      description:
        "Regime especial exclusivo a candidatos que não tenham a nacionalidade portuguesa, não sejam nacionais de um estado-membro da União Europeia, ou não residam em Portugal há mais de dois anos, ininterruptamente. Período de candidaturas: 26 de janeiro a 27 de fevereiro de 2026, Entrevistas: 2 a 13 de março de 2026, Admissão: 23 de março de 2026, Matrícula: 23 a 27 de março de 2026 ",
      href: "https://escolas.turismodeportugal.pt/en/",
    },
    {
      image: "/images-bolsas-ipg.webp",
      title:
        "Bolsas de Estudo Prioritárias Internacionais IPS 2026 na Indonésia🇵🇱 (Totalmente Financiadas)",
      description:
        "Existe um procedimento de inscrição online para se candidatar às Bolsas de Estudo Prioritárias Internacionais (IPS) 2026 na Indonésia. PAÍS: Indonésia, NÍVEL: Bachelarado, Mestrado e Doutorado, UNIVERSIDADE: Universidade Muhammadiyah Surakarta (UMS), PRAZO: 15 de maio de 2026, Vantagens da bolsa: Curso integral gratuito, do início ao fim. Os candidatos receberão uma  ajuda de custo  de 1.750.000 IDR por mês.Os candidatos podem visitar o site oficial do edital.",
      href: " https://isp.ums.ac.id/ums-scholarship",
    },
    {
      image: "/images-bolsas-balassi.webp",
      title: "Inscreva-se agora na Universidade de Verano Balassi",
      description:
        "nscreva-se agora na Universidade de Verano Balassi. Durante as 4 semanas que duram a universidade de verão, oferecemos: curso intensivo de língua e cultura, alojamento gratuito em dormitório, três comidas ao dia, abono de transporte para Budapeste, e vários eventos. CONDIÇÕES DE APLICAÇÃO: uma pessoa que tenha atingido a idade de 18 anos no início da formação  , seja de origem húngara  e possua a cidadania de um Estado-membro da União Europeia  não abrangido pela Lei LXII de 2001 sobre húngaros residentes em Estados vizinhos (Lei de Preferências)  [1] e  uma pessoa de origem não húngara, que tenha atingido a idade de 18 anos e seja cidadã estrangeira no início da formação  . DATA LIMITE: 3 de Março de 2026, 12h00 (CET), Estudos em línguas combinadas húngaro/inglês.",
      href: "https://balassieducation.hu/.../call-for-applications.../",
    },
    {
      image: "/images-bolsas-canada.webp",
      title: "Boldas de estudo da universidade de Montreal 2026-2027 no canada",
      description:
        "O programa de Bolsas de Estudo da Universidade de Montreal para 2026, no Canadá, oferece bolsas de estudo com financiamento parcial para estudantes internacionais. Existe um  processo de inscrição online para concorrer às bolsas de estudo da Universidade de Montreal em 2026, no Canadá. Os candidatos devem ser admitidos em qualquer curso de graduação da universidade. Após a admissão, serão automaticamente considerados para a bolsa. ",
      href: "https://admission.umontreal.ca/en/scholarship-for-international-students/",
    },
    {
      image: "/images-bolsas-rudn.webp",
      title: "RUDN UNIVERSITY- Moscow",
      description:
        "Bolsa de estudos integral na Universidade RUDN, de acordo com a cota do Governo Russo. Oportunidade de participar do concurso de bolsas de estudo RUDN BRILLIANT STUDENTS. Premiados: Possibilidade de bolsa de estudos integral na Universidade RUDN, de acordo com a cota do Governo Russo, caso haja disponibilidade após a matrícula dos vencedores da Olimpíada. Oportunidade de obter um desconto significativo nas mensalidades da universidade.",
      href: "https://olymp.rudn.ru/eng/main",
    },
    {
      image: "/images-bolsas-pt1.webp",
      title:
        "Concurso Especial para Estudantes Internacionais do IPB-Instituto Politécnico de Bragança em Portugal para o ano letivo 2026/2027.",
      description:
        "Período de candidaturas: 15 de janeiro a 15 de março, as candidaturas destinam-se a estudantes de nacionalidade não portuguesa e são realizadas exclusivamente online. Se pretendes estudar em Portugal, descobre o IPB e as oportunidades que temos para ti: ciclo de estudos de CTeSP, Licenciatura, Mestrado e Doutoramento. IPB. A escolha natural.",
      href: "https://candidaturas.ipb.pt",
    },
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h2 className="text-4xl md:text-5xl text-[#040a17] mb-4 uppercase">
            Bolsas de estudo{" "}
            <span className="font-light opacity-40">mais recorrentes</span>
          </h2>

          <p className="text-[#4b5563] text-lg md:text-xl font-medium mb-8">
            {selectedCountry && (
              <span>
                Bolsas disponíveis em <strong>{selectedCountry}</strong>
              </span>
            )}
            {!selectedCountry &&
              "Explore as bolsas de estudo mais recentes e populares disponíveis para você, independentemente do país Assine a plataforma e receba alertas durante o mês."}
          </p>

          <button
            onClick={triggerGoogleSignup}
            disabled={loading}
            className="flex items-center gap-2 bg-[#620fe7] hover:bg-[#5815c4] text-white py-3 px-8 rounded transition-all duration-200 shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Processando..." : "Assinar agora"}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <FadeIn key={index} delay={index * 0.15} direction="up" className="h-full">
              <CategoryCard {...cat} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
