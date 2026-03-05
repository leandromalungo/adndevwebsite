"use client";

import Link from "next/link";

export default function HeroIA() {
    return (
        <section className="relative w-full h-[100vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* BACKGROUND VIDEO */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            >
                <source src="/video.mp4" type="video/mp4" />
                {/* Fallback image if video fails to load or for mobile */}
                Seu navegador não suporta vídeos.
            </video>

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/60 z-10" />

            {/* CONTENT */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto w-full mt-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 tracking-tight drop-shadow-md uppercase">
                    Impulsione sua carreira <br className="hidden md:block" /> com inteligência artificial
                </h1>

                <p className="text-gray-200 text-sm md:text-lg mb-8 max-w-2xl mx-auto drop-shadow">
                    Comunidade de criadores, construindo com <strong className="text-violet-400">Inteligência Artificial</strong> moderna <strong>e de ponta</strong>. Participe de um Hackathon hoje mesmo!
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                    <Link
                        href="/ia/hackathons"
                        className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors shadow-lg text-sm flex items-center justify-center gap-2"
                    >
                        <svg
                            viewBox="0 0 127.14 96.36"
                            className="w-5 h-5 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a67.73,67.73,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                        </svg> Discord Community
                    </Link>

                    <Link
                        href="https://discord.gg/seulink"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3 bg-transparent border border-gray-400 hover:border-white hover:bg-white/10 text-white font-semibold rounded-md transition-all text-sm"
                    >
                        Hackathons de I.A
                    </Link>

                    <Link
                        href="/ia/surto"
                        className="w-full sm:w-auto px-6 py-3 bg-black border border-gray-700 hover:border-gray-500 text-white font-semibold rounded-md transition-colors text-sm"
                    >
                        Análise de dados
                    </Link>
                </div>

                <p className="text-xs text-gray-400 italic mt-4 filter drop-shadow">
                    Pssh... todos os eventos são gratuitos.
                </p>
            </div>
        </section>
    );
}
