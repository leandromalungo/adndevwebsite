"use client"

import type React from "react"

import { useState } from "react"
import {
  Code2Icon,
  BookOpenIcon,
  AwardIcon,
  PlayIcon,
  VideoIcon,
  Users2Icon,
  MessageSquareIcon,
  PhoneIcon,
  HelpCircleIcon,
} from "lucide-react"

interface ResourceCard {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  link: string
  linkText: string
}

interface TabOption {
  id: string
  label: string
}

interface TabContent {
  id: string
  cards: ResourceCard[]
}

interface OutrosRecursosProps {
  tabs?: TabOption[]
  tabContents?: TabContent[]
  documentationImages?: Record<string, string>
  documentationLink?: string
}

const defaultTabs: TabOption[] = [
  { id: "learn", label: "Onde aprender" },
  { id: "connect", label: "Onde se conectar" },
  { id: "support", label: "Onde obter suporte" },
]

const defaultTabContents: TabContent[] = [
  {
    id: "learn",
    cards: [
      {
        id: "samples",
        icon: <Code2Icon className="w-8 h-8 text-cyan-400" />,
        title: "Amostras de código",
        description: "Explore as amostras da Microsoft e descubra o que você pode criar.",
        link: "#",
        linkText: "Obter código",
      },
      {
        id: "training",
        icon: <BookOpenIcon className="w-8 h-8 text-cyan-400" />,
        title: "Treinamento",
        description: "Domine os principais conceitos em seu ritmo e de acordo com a sua agenda.",
        link: "#",
        linkText: "Aprenda",
      },
      {
        id: "credentials",
        icon: <AwardIcon className="w-8 h-8 text-cyan-400" />,
        title: "Credenciais",
        description:
          "Assuma o controle da sua carreira com certificações baseadas em funções e credenciais verificadas da Microsoft.",
        link: "#",
        linkText: "Obtenha a certificação",
      },
      {
        id: "programs",
        icon: <PlayIcon className="w-8 h-8 text-cyan-400" />,
        title: "Programas",
        description:
          "Descubra milhares de horas de programação original divertida, autêntica e informativa de especialistas técnicos da Microsoft.",
        link: "#",
        linkText: "Assistir",
      },
      {
        id: "youtube",
        icon: <VideoIcon className="w-8 h-8 text-cyan-400" />,
        title: "YouTube",
        description:
          "Eventos ao vivo, dicas e tutoriais, notícias sobre produtos e muito mais para ajudar você a explorar, descobrir e criar soluções.",
        link: "#",
        linkText: "Assistir",
      },
    ],
  },
  {
    id: "connect",
    cards: [
      {
        id: "community",
        icon: <Users2Icon className="w-8 h-8 text-cyan-400" />,
        title: "Comunidade Técnica",
        description:
          "Conecte-se com desenvolvedores ao redor do mundo, compartilhe conhecimento e colabore em projetos.",
        link: "#",
        linkText: "Participar",
      },
      {
        id: "events",
        icon: <PlayIcon className="w-8 h-8 text-cyan-400" />,
        title: "Eventos e Webinars",
        description:
          "Participe de eventos ao vivo, workshops e conferências para aprender com especialistas da Microsoft.",
        link: "#",
        linkText: "Ver eventos",
      },
      {
        id: "forums",
        icon: <MessageSquareIcon className="w-8 h-8 text-cyan-400" />,
        title: "Fóruns de Discussão",
        description: "Faça perguntas, compartilhe soluções e aprenda com a comunidade de desenvolvedores.",
        link: "#",
        linkText: "Acessar",
      },
      {
        id: "social",
        icon: <Users2Icon className="w-8 h-8 text-cyan-400" />,
        title: "Redes Sociais",
        description: "Siga a Microsoft Developer no Twitter, LinkedIn e outras plataformas para as últimas notícias.",
        link: "#",
        linkText: "Seguir",
      },
      {
        id: "partnership",
        icon: <AwardIcon className="w-8 h-8 text-cyan-400" />,
        title: "Programa de Parceiros",
        description: "Junte-se ao programa de parceiros Microsoft e cresça junto com a comunidade global.",
        link: "#",
        linkText: "Saiba mais",
      },
    ],
  },
  {
    id: "support",
    cards: [
      {
        id: "help-center",
        icon: <HelpCircleIcon className="w-8 h-8 text-cyan-400" />,
        title: "Central de Ajuda",
        description: "Acesse artigos de ajuda, guias de solução de problemas e respostas às perguntas frequentes.",
        link: "#",
        linkText: "Ver ajuda",
      },
      {
        id: "support-ticket",
        icon: <MessageSquareIcon className="w-8 h-8 text-cyan-400" />,
        title: "Abrir Chamado",
        description: "Crie um ticket de suporte e receba ajuda personalizada de nossa equipe de especialistas.",
        link: "#",
        linkText: "Abrir chamado",
      },
      {
        id: "phone-support",
        icon: <PhoneIcon className="w-8 h-8 text-cyan-400" />,
        title: "Suporte Telefônico",
        description: "Fale com um representante de suporte via telefone para resolver seus problemas rapidamente.",
        link: "#",
        linkText: "Ligar",
      },
      {
        id: "documentation",
        icon: <BookOpenIcon className="w-8 h-8 text-cyan-400" />,
        title: "Documentação Técnica",
        description: "Consulte a documentação completa e referências técnicas para todas as plataformas Microsoft.",
        link: "#",
        linkText: "Acessar docs",
      },
      {
        id: "status",
        icon: <VideoIcon className="w-8 h-8 text-cyan-400" />,
        title: "Status dos Serviços",
        description: "Verifique o status em tempo real dos serviços Microsoft e receba alertas de incidentes.",
        link: "#",
        linkText: "Ver status",
      },
    ],
  },
]

export default function OutrosRecursos({
  tabs = defaultTabs,
  tabContents = defaultTabContents,
  documentationImages = {
    learn: "/images/1756913513983.jpg",
    connect: "/images/1768288528665.jpg",
    support: "/images/1768288533539.jpg",
  },
  documentationLink = "#",
}: OutrosRecursosProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "learn")

  const activeContent = tabContents.find((content) => content.id === activeTab)
  const cardsToDisplay = activeContent?.cards || []

  const currentDocumentationImage = documentationImages[activeTab] || "/images/1756913513983.jpg"

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-12">Outros recursos</h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Documentation Card - Large */}
          <div className="lg:col-span-1 lg:row-span-2">
            <a
              href={documentationLink}
              className="group block h-full bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-blue-400 relative"
            >
              <div
                className="absolute inset-0 bg-cover bg-center rounded-2xl transition-all duration-500"
                style={{
                  backgroundImage: `url('${currentDocumentationImage || "/placeholder.svg"}')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/20"></div>
              </div>

              <div className="relative h-full p-6 flex flex-col justify-between">
                <h3 className="text-2xl font-bold text-white mb-4">Documentação</h3>
                <div>
                  <p className="text-white mb-8 text-sm leading-relaxed">
                    Encontre artigos detalhados sobre as ferramentas e tecnologias para desenvolvedores da Microsoft.
                  </p>
                  <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200">
                    Obter conteúdo
                  </button>
                </div>
              </div>
            </a>
          </div>

          {/* Resource Cards - Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardsToDisplay.map((card) => (
              <a
                key={card.id}
                href={card.link}
                className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-400 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4 p-3 bg-gray-100 rounded-xl w-fit group-hover:bg-gray-200 transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{card.description}</p>
                </div>
                <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 underline">
                  {card.linkText}
                </button>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
