"use client";

import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";

// Local dummy data for the Hackathons exactly as in the image
const hackathons = [
    {
        id: 1,
        image: "/images-login.jpg", // Using an existing dummy image for now
        titleOnImage: "AI GENESIS\nTHE LARGEST AI HACKATHON IN THE MIDDLE EAST",
        tag: "HACKATHON",
        dateBadge: "26 de outubro - 2 de novembro",
        participants: 13,
        title: "GÊNESIS DA IA",
        description: "AI Genesis é um hackathon híbrido global que reúne desenvolvedores de IA do mundo todo — começand...",
        link: "#",
    },
    {
        id: 2,
        image: "/images-community.jpg",
        titleOnImage: "THE RISE OF AI AGENTS\nHACKATHON",
        tag: "HACKATHON",
        dateBadge: "6 a 10 de abril",
        participants: 84,
        title: "Hackathon: A Ascensão dos...",
        description: "⏱️ Projete, construa e lance um Agente de IA no mundo real. 🗓️ 6 a 11 de abril de 2026 • 6 a 11 de...",
        link: "#",
    },
    {
        id: 3,
        image: "/images-login.jpg",
        titleOnImage: "AI TRADING AGENTS\nWITH ERC-8004",
        tag: "HACKATHON",
        dateBadge: "9 a 22 de março",
        participants: 1000,
        title: "Agentes de negociação de I...",
        description: "⏱️ Você tem 13 dias para projetar, construir e implantar agentes financeiros de IA sem confiança ...",
        link: "#",
    },
    {
        id: 4,
        image: "/images-login.jpg",
        titleOnImage: "AI TRADING AGENTS\nWITH ERC-8004",
        tag: "HACKATHON",
        dateBadge: "9 a 22 de março",
        participants: 1000,
        title: "Agentes de negociação de I...",
        description: "⏱️ Você tem 13 dias para projetar, construir e implantar agentes financeiros de IA sem confiança ...",
        link: "#",
    },
    {
        id: 5,
        image: "/images-login.jpg",
        titleOnImage: "AI TRADING AGENTS\nWITH ERC-8004",
        tag: "HACKATHON",
        dateBadge: "9 a 22 de março",
        participants: 1000,
        title: "Agentes de negociação de I...",
        description: "⏱️ Você tem 13 dias para projetar, construir e implantar agentes financeiros de IA sem confiança ...",
        link: "#",
    },
    {
        id: 6,
        image: "/images-login.jpg",
        titleOnImage: "AI TRADING AGENTS\nWITH ERC-8004",
        tag: "HACKATHON",
        dateBadge: "9 a 22 de março",
        participants: 1000,
        title: "Agentes de negociação de I...",
        description: "⏱️ Você tem 13 dias para projetar, construir e implantar agentes financeiros de IA sem confiança ...",
        link: "#",
    }
];

export default function HackathonsSection() {
    return (
        <section className="py-20 px-4 bg-white w-full">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl text-slate-900 mb-6 tracking-tight uppercase">
                        Próximos Hackathons de IA
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Seja você um profissional da indústria de IA/tecnologia ou apenas um apaixonado por tecnologias revolucionárias de inteligência artificial, você é bem-vindo(a) aos nossos hackathons. No lablab, nosso objetivo é construir uma comunidade de criadores e inovadores que moldam o futuro da IA nativa.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hackathons.map((hack) => (
                        <div key={hack.id} className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 relative group border border-gray-100">

                            {/* Cadastre-se Ribbon */}
                            <div className="absolute top-0 left-0 z-20 overflow-hidden w-24 h-24">
                                <div className="absolute top-4 -left-8 w-36 bg-[#009fb7] text-white text-[10px] font-bold py-1.5 text-center transform -rotate-45 shadow-sm tracking-wider uppercase">
                                    Cadastre-se
                                </div>
                            </div>

                            {/* Image Header */}
                            <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
                                {/* Use an image if you have one, or just a colored background with text */}
                                <div className="absolute inset-0 opacity-60 mix-blend-overlay">
                                    <Image
                                        src={hack.image}
                                        alt={hack.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Top right badge */}
                                <div className="absolute top-4 right-4 z-10">
                                    <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                        {hack.tag}
                                    </span>
                                </div>

                                {/* Text on Image */}
                                <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                                    <h3 className="text-xl md:text-2xl font-bold leading-tight whitespace-pre-line text-shadow-sm">
                                        {hack.titleOnImage}
                                    </h3>
                                </div>

                                {/* Bottom bar matching image */}
                                <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/80 backdrop-blur-sm flex items-center justify-between px-6 text-[10px] text-gray-300 border-t border-white/10 uppercase tracking-wider font-semibold">
                                    <span>Online Phase</span>
                                    <span>Date coming</span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-semibold text-gray-600 px-3 py-1 border border-gray-200 rounded-full">
                                        {hack.dateBadge}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-gray-500 text-sm font-semibold">
                                        <Users className="w-4 h-4" />
                                        <span>{hack.participants}</span>
                                    </div>
                                </div>

                                <h4 className="text-xl font-bold text-slate-900 mb-3 line-clamp-1">
                                    {hack.title}
                                </h4>

                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                                    {hack.description}
                                </p>
                            </div>

                            {/* Invisible Link covering the whole card optionally */}
                            <Link href={hack.link} className="absolute inset-0 z-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <span className="sr-only">Ver detalhes do {hack.title}</span>
                            </Link>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
