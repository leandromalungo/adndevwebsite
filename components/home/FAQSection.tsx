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
    question: "O que é a ADN Developers?",
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
      "Podes entrar em contato connosco através do nosso email geral.adndeveloper@gmail.com ou pelas redes sociais.",
  },
  {
    id: "faq-4",
    question: "Como aprender com vocês?",
    answer: "Explore nossos tutoriais, cursos e artigos disponíveis na plataforma. Inscreva-se nos cursos online e presenciais dos nossos parceiros para obter uma experiência de aprendizado estruturada e prática.",
  },
  {
    id: "faq-5",
    question: "Vocês oferecem certificados?",
    answer: "Nós não oferecemos certificados diretamente, porém os cursos disponíveis na plataforma oferecem certificados de conclusão, que podem ser adicionados ao seu currículo ou perfil profissional.",
  },
  {
    id: "faq-6",
    question: "Como me tornar parceiro da plataforma?",
    answer:
      "Podes entrar em contato connosco através do nosso email geral.adndeveloper@gmail.com",
  },
  {
    id: "faq-7",
    question: "Onde estão localizados?",
    answer:
      "Nossa equipa está distribuída globalmente, com membros trabalhando remotamente de diferentes partes do mundo, permitindo-nos colaborar e compartilhar conhecimento de forma eficaz.",
  },
]

export function FAQSection() {
  return (
    <section className="w-full py-12 md:py-16 text-white">
      {/* Reduzi a largura máxima para o conteúdo ficar mais compacto e legível */}
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Título com tamanho equilibrado */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-8 tracking-tight">
          Perguntas frequentes
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqItems.map((item) => (
            <AccordionItem 
              key={item.id} 
              value={item.id} 
              className="border-b border-gray-800/60 py-1"
            >
              {/* Pergunta ajustada de tamanhos gigantes para tamanhos ideais */}
              <AccordionTrigger className="text-sm sm:text-base text-gray-200 hover:text-white font-medium hover:no-underline transition-colors py-3.5 text-left">
                {item.question}
              </AccordionTrigger>
              
              {/* Resposta sutil e confortável para leitura */}
              <AccordionContent className="text-xs sm:text-sm text-gray-400 leading-relaxed pb-4 pt-1">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FAQSection;