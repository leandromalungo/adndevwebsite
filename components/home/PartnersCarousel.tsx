"use client";

import { motion } from "framer-motion";
import {
    Cpu,
    Globe,
    Code,
    Layers,
    Zap,
    Brain,
    Aperture,
    Figma,
    Terminal,
    Database,
    Hexagon
} from "lucide-react";

const partners = [
    { id: 1, name: "TechNova", icon: Cpu },
    { id: 2, name: "GlobalWeb", icon: Globe },
    { id: 3, name: "CodeX", icon: Code },
    { id: 4, name: "LayerStack", icon: Layers },
    { id: 5, name: "ZapSolutions", icon: Zap },
    { id: 6, name: "BrainAI", icon: Brain },
    { id: 7, name: "NexusCorp", icon: Aperture },
    { id: 8, name: "DesignPro", icon: Figma },
    { id: 9, name: "DevLogic", icon: Terminal },
    { id: 10, name: "DataCore", icon: Database },
    { id: 11, name: "HexaBase", icon: Hexagon },
];

export default function PartnersCarousel() {
    return (
        <div className="w-full py-16 overflow-hidden dark:bg-black/40 border-y border-border/50">
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <h3 className="text-center text-2xl font-semibold tracking-wider text-muted-foreground uppercase">
                    Nossos Parceiros
                </h3>
                <p className="text-center text-muted-foreground text-sm mt-2">
                    Projectos e organizações que confiam na ADN Developer para impulsionar a inovação e o crescimento.
                </p>
            </div>

            {/* Container do Marquee */}
            <div className="relative flex overflow-hidden group">
                {/* Gradientes nas bordas para suavizar a entrada/saída */}
                <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r from-[#f7f8f9] dark:from-black to-transparent pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l from-[#f7f8f9] dark:from-black to-transparent pointer-events-none" />

                <motion.div
                    className="flex whitespace-nowrap gap-16 md:gap-24 items-center pl-16 md:pl-24"
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 35, // Duração ajustada para rolagem agradável
                    }}
                >
                    {/* Dobramos a lista para garantir o infinite scroll contínuo sem solavancos */}
                    {[...partners, ...partners].map((partner, index) => {
                        const Icon = partner.icon;
                        return (
                            <div
                                key={`${partner.id}-${index}`}
                                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 min-w-max"
                            >
                                <Icon className="w-8 h-8 md:w-10 md:h-10 opacity-70" />
                                <span className="text-lg md:text-xl font-bold tracking-tight opacity-70">
                                    {partner.name}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
