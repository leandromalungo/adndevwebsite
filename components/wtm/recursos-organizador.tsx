"use client"; // ⚠️ Deve ser a primeira linha do arquivo

import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ResourceCard {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  href: string;
}

interface RecursosOrganizadorProps {
  title?: string;
  description?: string;
  cards?: ResourceCard[];
}

export default function RecursosOrganizador({
  title = "Recursos do organizador",
  description = "Você é ativo na comunidade de desenvolvedores e gosta de compartilhar o que sabe, de tecnologia da Microsoft a códigos abertos e jogos? Tem paixão por reunir pessoas para se divertir? A Microsoft tem recursos para ajudar você.",
  cards,
}: RecursosOrganizadorProps) {
  const defaultCards: ResourceCard[] = [
    {
      id: "blog",
      badge: "Blog",
      title: "Como iniciar um grupo de usuários",
      description: "Dicas e ferramentas para iniciar e executar um grupo de usuários bem-sucedido.",
      image: "/images/1768748569372.jpg",
      buttonText: "Saiba mais",
      href: "#",
    },
    {
      id: "documentation",
      badge: "Documentação",
      title: "Conteúdo em uma caixa",
      description: "Demonstrações, vídeos, slides, código de exemplo e muito mais para uma palestra bem-sucedida.",
      image: "/images/1768748569372.jpg",
      buttonText: "Saiba mais",
      href: "#",
    },
    {
      id: "events",
      badge: "Eventos",
      title: "Organize um evento",
      description: "Guias completos para organizar conferências, meetups e workshops para sua comunidade.",
      image: "/images/1768748569372.jpg",
      buttonText: "Saiba mais",
      href: "#",
    },
    {
      id: "programs",
      badge: "Programas",
      title: "Programas de parceria",
      description: "Explore programas de parceria e oportunidades de colaboração com a Microsoft.",
      image: "/images/1768748569372.jpg",
      buttonText: "Saiba mais",
      href: "#",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">{title}</h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">{description}</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCards.map((card) => (
            <div
              key={card.id}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
            >
              {/* Background Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={card.image || "/placeholder.svg"}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={true} // opcional, deixa a imagem carregar rápido
                />
                
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Badge */}
                <div className="inline-block mb-4 px-3 py-1 bg-gray-100 rounded-full">
                  <span className="text-sm font-medium text-gray-700">{card.badge}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{card.title}</h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">{card.description}</p>

                {/* Button */}
                <a
                  href={card.href}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200 group/btn"
                >
                  <span>{card.buttonText}</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
