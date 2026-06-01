"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, ArrowRight, Award } from "lucide-react";
import Link from "next/link";

const opportunities = [
  {
    id: "Mentoria",
    title: "Mentoria e Desenvolvimento",
    description: "Programas personalizados para desenvolver habilidades técnicas e de carreira, conectando-se com engenheiros experientes do mercado.",
    href: "#",
  },
  {
    id: "hackathon",
    title: "Participar em Hackathons",
    description: "Colabore com outros desenvolvedores em eventos intensivos organizados pela ADN, crie soluções inovadoras e dispute prêmios.",
    href: "#",
  },
  {
    id: "consultoria",
    title: "Construa seu Portfólio",
    description: "Organize seus projetos e realizações práticas numa plataforma visível, atraindo a atenção de recrutadores e potenciais parceiros.",
    href: "/app/",
  },
];

export default function OpportunitiesSection() {
  return (
    <div className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-white text-gray-800 dark:bg-[#111111] dark:text-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Lado Visual - Moldura geométrica premium */}
        <motion.div
          className="w-full lg:w-1/2 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src="/professional resume.webp"
            alt="Desenvolvimento Profissional na ADN Developers"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          {/* Gradiente sutil decorativo sobre a imagem */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Lado Informativo */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-6 md:space-y-8">
          <div className="space-y-3">
            <motion.span 
              className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Crescimento mútuo
            </motion.span>
            
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-950 dark:text-white"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Cresça connosco
            </motion.h2>
            
            <motion.p
              className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Existem várias formas de interagir com a ADN Developer. Quer procure evolução na sua carreira, integrar a nossa equipa ou obter suporte para tirar as suas ideias do papel, temos os caminhos certos abertos para si.
            </motion.p>
          </div>

          {/* Lista de Cartões de Oportunidade */}
          <div className="grid gap-3.5 w-full max-w-xl lg:max-w-none">
            {opportunities.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-violet-600/20 hover:shadow-lg hover:shadow-violet-900/5 dark:border-gray-800/50 dark:bg-gray-900/30 dark:hover:bg-gray-900/60 dark:hover:border-violet-500/30 transition-all duration-300"
                >

                  {/* Texto */}
                  <div className="flex-grow min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-normal line-clamp-2 md:line-clamp-none">
                      {item.description}
                    </p>
                  </div>

                  {/* Seta indicativa compacta */}
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-gray-400 bg-white dark:bg-gray-900 group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-all duration-300 shadow-sm">
                    <ArrowRight className="w-4 h-4 -translate-x-0.5 group-hover:translate-x-0 transition-transform duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}