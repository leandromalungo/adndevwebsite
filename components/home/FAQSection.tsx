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
      "Nós somos um repositório online dedicado a fornecer recursos educacionais gratuitos na área de tecnologia. Nosso objetivo é capacitar indivíduos com conhecimento e habilidades necessárias para prosperar na indústria tecnológica.",
  },
  {
    id: "faq-2",
    question: "O que fazem?",
    answer: "Partilhamos conteúdos educativos, tutoriais, cursos, palestras, eventos, workshops, hackathons, bolsas de estudo e muito mais. Tudo isso de forma gratuita, para que qualquer pessoa interessada em tecnologia possa aprender e crescer connosco.",
  },
  {
    id: "faq-3",
    question: 'Como faço para falar com vocês?',
    answer:
      "Podes entrar em contato connosco através do nosso  email geral@adndeveloper.com ou pelas redes sociais.",
  },
  {
    id: "faq-4",
    question:
      "Como aprender com vocês?",
    answer: "Explore nossos tutoriais, cursos e artigos disponíveis na plataforma. Inscreva-se em nos cursos on-lines e presenciais dos nossos parceiros para obter uma experiência de aprendizado estruturada e prática.",
  },
  {
    id: "faq-5",
    question: "Vocês oferecem certificados?",
    answer: "Nós não oferecemos certificados, porém os cursos disponiveis na plataforma oferecem certificados de conclusão, que podem ser adicionados ao seu currículo ou perfil profissional.",
  },
  {
    id: "faq-6",
    question: "Como me tornar parceiro da plataforma?",
    answer:
      "Podes entrar em contato connosco através do nosso  email geral@adndeveloper.com",
  },
  {
    id: "faq-7",
    question: "Onde estão localizados?",
    answer:
      "Nossa equipe está distribuída globalmente, com membros trabalhando remotamente de diferentes partes do mundo, permitindo-nos colaborar e compartilhar conhecimento de forma eficaz.",
  },
]

export function FAQSection() {
  return (
    <section className="w-full py-12 md:py-4 bg-black">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mt-6">Perguntas frequentes</h2>

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