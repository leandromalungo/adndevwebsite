// Exemplo: components/games/hero.tsx
"use client"; // adicione esta linha no topo
import React from "react";
// resto do código...

import { useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const faqItems = [
  {
    question: "O Unity Engine é gratuito?",
    answer:
      "Sim, o Unity oferece uma versão gratuita chamada Unity Personal para desenvolvedores individuais e pequenos estúdios com receita anual inferior a $100,000.",
  },
  {
    question: "O conteúdo que crio com o Unity Pro é de minha propriedade?",
    answer:
      "Sim, você mantém todos os direitos sobre o conteúdo que cria com o Unity Pro. O Unity não reivindica propriedade sobre seus projetos ou criações.",
  },
  {
    question: 'Como faço para conseguir licenças compartilhadas ou "flutuantes" para o Unity?',
    answer:
      "Licenças flutuantes estão disponíveis para equipes Enterprise. Entre em contato com o departamento de vendas do Unity para mais informações.",
  },
  {
    question:
      "Eu consigo desenvolver e implantar em plataformas fechadas (como Sony PlayStation® ou Xbox®) com o Unity?",
    answer:
      "Sim, o Unity suporta desenvolvimento para consoles. Você precisará de licenças de desenvolvedor das respectivas plataformas e uma assinatura Unity Pro ou Enterprise.",
  },
  {
    question: "Onde posso obter uma avaliação gratuita do Unity Pro?",
    answer:
      "Você pode iniciar uma avaliação gratuita de 30 dias do Unity Pro diretamente no site oficial do Unity na seção de planos e preços.",
  },
  {
    question: "Quais jogos usam o Unity Ads atualmente?",
    answer:
      "Milhares de jogos usam Unity Ads, incluindo títulos populares como Pokémon GO, Beat Saber, e muitos outros jogos mobile de sucesso.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16">
      <h2 className="mb-12 text-center text-4xl font-bold text-white">Perguntas frequentes</h2>

      <div className="mx-auto max-w-4xl space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border-b border-white/10">
            <button
              onClick={() => toggleItem(index)}
              className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-white/80"
            >
              <span className="pr-8 text-lg font-medium text-white">{item.question}</span>
              <Plus
                className={cn(
                  "h-5 w-5 flex-shrink-0 text-white transition-transform duration-200",
                  openIndex === index && "rotate-45",
                )}
              />
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                openIndex === index ? "mb-6 max-h-96" : "max-h-0",
              )}
            >
              <p className="text-white/70 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
