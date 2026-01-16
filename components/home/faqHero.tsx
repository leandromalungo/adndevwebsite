"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "O que é a ADN Developers",
    answer:
      "Sim, o Unity Engine é totalmente gratuito para uso pessoal e comercial, com certas limitações para empresas maiores.",
  },
  {
    id: "faq-2",
    question: "O que fazem?",
    answer: "Sim, todo o conteúdo que você cria com o Unity é de sua propriedade intelectual exclusiva.",
  },
  {
    id: "faq-3",
    question: 'Como faço para entrar na área?',
    answer:
      "Você pode adquirir licenças compartilhadas através do nosso portal de vendas corporativas. Entre em contato com nosso time de vendas para obter mais informações.",
  },
  {
    id: "faq-4",
    question:
      "Como aprender programação com vocês?",
    answer: "Sim, o Unity oferece suporte para múltiplas plataformas, incluindo consoles e dispositivos móveis.",
  },
  {
    id: "faq-5",
    question: "Vocês oferecem certificados?",
    answer: "Você pode baixar uma versão de avaliação gratuita do Unity Pro diretamente do nosso site de downloads.",
  },
  {
    id: "faq-6",
    question: "Onde estão localizados?",
    answer:
      "Unity Ads é usado por milhares de jogos em todo o mundo. Visite nossa página de casos de uso para ver exemplos.",
  },
]

export function FAQSection() {
  return (
    <section className="w-full py-12 md:py-4 bg-black">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white  text-center">Perguntas frequentes</h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-b border-gray-800 py-2">
              <AccordionTrigger className="text-base md:text-lg text-white hover:text-gray-300 font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pt-4">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FAQSection;