"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, LineChart, ArrowRight } from "lucide-react";
import Link from "next/link";

const opportunities = [
    {
        id: "colaborador",
        title: "Tornar-se Colaborador",
        description: "Junte-se à nossa equipe e contribua para projetos inovadores que impactam a comunidade tech.",
        icon: Briefcase,
        href: "#",
    },
    {
        id: "estagio",
        title: "Solicitar Estágio",
        description: "Dê o primeiro passo na sua carreira com mentoria prática num ambiente de aprendizado contínuo.",
        icon: GraduationCap,
        href: "#",
    },
    {
        id: "consultoria",
        title: "Solicitar Consultoria",
        description: "Eleve o seu projeto de TI com a expertise de nossos profissionais qualificados e soluções sob medida.",
        icon: LineChart,
        href: "#",
    },
];

export default function OpportunitiesSection() {
    return (
        <div className="w-full py-20 px-4 md:px-10 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                {/* Lado da Imagem */}
                <motion.div
                    className="w-full lg:w-1/2 rounded overflow-hidden relative aspect-square md:aspect-[4/3] lg:aspect-square"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <video
                        src="/video.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    {/* Overlay gradiente suave */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 right-6 text-white text-lg font-medium">
                    </div>
                </motion.div>

                {/* Lado da Informação */}
                <div className="w-full lg:w-1/2 flex flex-col space-y-8">
                    <div>
                        <motion.h2
                            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Cresça connosco
                        </motion.h2>
                        <motion.p
                            className="mt-4 text-lg text-muted-foreground leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
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
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                            >
                                <Link
                                    href={item.href}
                                    className="group flex flex-col md:flex-row items-start md:items-center gap-5 p-5 md:p-6 rounded-2xl border border-border/60 bg-card hover:bg-accent/30 transition-all duration-300 hover:shadow-md hover:border-black/10 dark:hover:border-white/10"
                                >
                                    <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
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
