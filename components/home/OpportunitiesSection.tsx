"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

const opportunities = [
    {
        id: "colaborador",
        title: "Tornar-se um colaborador",
        description: "Seja um colaborador de um dos conteúdos da ADN Developer. Partilhe o seu conhecimento, escreva artigos, crie vídeos ou organize eventos para ajudar a comunidade a crescer e aprender.",
        icon: Briefcase,
        href: "#",
    },
    {
        id: "estagio",
        title: "Crie um currículo online",
        description: "Destaque suas habilidades e experiências com um currículo online profissional, fácil de compartilhar e acessível a recrutadores e empresas de tecnologia.",
        icon: GraduationCap,
        href: "#",
    },
    {
        id: "consultoria",
        title: "Crie um portfólio",
        description: "Organize seus projectos e realizações em um portfólio online atraente, mostrando suas habilidades e experiência para potenciais empregadores e clientes.",
        icon: Briefcase,
        href: "/app/",
    },
];

/**
 * Secção de Oportunidades - Apresenta formas de colaboração e crescimento na plataforma.
 * Inclui uma área de vídeo demonstrativo (lazy-loaded) e uma lista de cartões com animações de scroll.
 */
export default function OpportunitiesSection() {

    return (
        <div className="w-full py-20 px-4 md:px-10 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                {/* Lado Visual - Exibe uma imagem profissional com sobreposição de gradiente e animação de entrada */}
                <motion.div
                    className="w-full lg:w-1/2 rounded overflow-hidden relative aspect-square md:aspect-[4/3] lg:aspect-square"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.1, margin: "100px 0px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <img
                        src="/professional resume.webp"
                        alt="Professional Resume"
                        className="absolute inset-0 w-full h-full object-contain"
                    />
                
                </motion.div>

                {/* Lado Informativo - Contém o título, introdução e a grelha de oportunidades interativas */}
                <div className="w-full lg:w-1/2 flex flex-col space-y-8">
                    <div>
                        <motion.h2
                            className="text-2xl md:text-5xl tracking-tight text-foreground uppercase"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1, margin: "100px 0px" }}
                            transition={{ duration: 0.5 }}
                        >
                            Cresça connosco
                        </motion.h2>
                        <motion.p
                            className="mt-2 text-muted-foreground leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1, margin: "100px 0px" }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Existem várias formas de interagir com a ADN Developer. Quer procure desenvolvimento profissional, integrar a nossa equipe, ou suporte para as suas ideias, temos caminhos abertos para si.
                        </motion.p>
                    </div>

                    <div className="grid gap-6">
                        {opportunities.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1, margin: "100px 0px" }}
                                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                            >
                                <Link
                                    href={item.href}
                                    className="relative overflow-hidden group flex flex-col md:flex-row items-start md:items-center gap-5 p-5 md:p-6 rounded-2xl border border-violet-200/30 bg-gradient-to-br from-violet-50 to-indigo-50 hover:from-violet-100 hover:to-indigo-100 dark:from-violet-950/20 dark:to-indigo-950/20 transition-all duration-300 hover:shadow-md hover:border-violet-300/60 dark:hover:border-violet-700/40"
                                >
                                    {/* Conteúdo do Cartão - Composto por ícone, título e descrição com efeitos de hover
                                        Nota: imagem de fundo externa removida — era pedida 3x a servidor externo lento */}

                                    {/* Ícone do cartão */}
                                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                                        <item.icon className="w-6 h-6" />
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="text-xl font-semibold text-foreground group-hover:text-violet-600 transition-colors duration-300 flex items-center gap-2">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="hidden md:flex flex-shrink-0 w-10 h-10 items-center justify-center rounded-full bg-background border border-border group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-colors duration-300 shadow-sm">
                                        <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-transform duration-300" />
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
