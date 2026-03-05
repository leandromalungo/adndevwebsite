"use client";


import { Camera } from "lucide-react";

// Mock data based on the provided image
const ACADEMY_COURSES = [
    {
        id: "imag",
        instructor: "Renan Benedito",
        titleTop: "IA PARA",
        titleBottom: "Imagens",
        companyText: "Fotógrafo",
        companyIcon: Camera,
        modules: "", // Not visible in screenshot, but might have
        badge: "Em breve",
        image: "/images-login.jpg", // Replace with actual image later
    },
    {
        id: "mkt",
        instructor: "Thaís Cardoso",
        titleTop: "IA PARA",
        titleBottom: "MARKETING",
        companyText: "LUMINA AI",
        companyColor: "text-green-500",
        modules: "6 MÓDULOS - 33 AULAS",
        image: "/images-community.jpg",
    },
    {
        id: "prac",
        instructor: "Jotagá Crema",
        titleTop: "IA NA",
        titleBottom: "prática",
        titleFont: "font-serif italic", // To simulate cursive
        companyText: "NETFLIX",
        companyColor: "text-red-600 font-bold",
        modules: "6 MÓDULOS - 22 AULAS",
        image: "/images-card1.jpg",
    },
    {
        id: "auto",
        instructor: "Kauana Yrina",
        titleTop: "Autodesenvolvimento",
        titleBottom: "com ia",
        titleFont: "font-serif italic lowercase",
        companyText: "SEBRAE",
        companyColor: "text-blue-500 font-bold tracking-wider",
        modules: "5 MÓDULOS - 12 AULAS",
        image: "/images-card2.webp",
    },
    {
        id: "prog",
        instructor: "Evandro Franco & Rodrigo Faria",
        titleTop: "IA para",
        titleBottom: "Programadores",
        companyText: "aws",
        companyColor: "text-orange-400 font-bold text-xl",
        modules: "5 MÓDULOS - 16 AULAS",
        image: "/images-card3.webp",
    }
];

export default function Slide() {
    // Triplicamos os cursos para o efeito de loop infinito suave
    const duplicatedCourses = [...ACADEMY_COURSES, ...ACADEMY_COURSES, ...ACADEMY_COURSES];

    return (
        <section className="bg-[#0a0a0a] py-6 w-full overflow-hidden text-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4 uppercase mt-3">
                    <span className="text-violet-600">As melhores ferramentas de</span> inteligência artificial
                    <p className="text-blue-100/70 text-sm md:text-base mx-auto mt-2">
                        Elas estão disponíveis no nosso site para você aprender e se desenvolver com os maiores especialistas em IA e com certificado 
                    </p></h2>

            </div>

            <div className="relative w-full mx-auto group overflow-hidden">
                {/* Estilos para o carrossel infinito */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes infinite-scroll {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(calc(-33.333333% - 0.33333333rem)); } /* Compensando o gap de 1rem (16px / 3) » aproximação para não pular */
                        }
                        .animate-infinite-scroll {
                            animation: infinite-scroll 40s linear infinite;
                            width: max-content;
                        4}
                        .animate-infinite-scroll:hover {
                            animation-play-state: paused;
                        }
                    `
                }} />

                {/* Container do Slider Animado */}
                <div className="flex gap-4 animate-infinite-scroll px-4 md:px-12 pb-8 pt-4">
                    {duplicatedCourses.map((course, index) => (
                        <div
                            key={`${course.id}-${index}`}
                            className="relative min-w-[280px] w-[280px] sm:min-w-[300px] sm:w-[300px] h-[380px] rounded-3xl overflow-hidden shrink-0 bg-gray-900 border border-white/10 group/card cursor-pointer"
                        >
                            {/* Background Video */}
                            <video
                                src="/video.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                            />

                            {/* Gradient Overlay bottom to top */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />

                            {/* Badge */}
                            {course.badge && (
                                <div className="absolute top-4 right-4 z-20">
                                    <span className="bg-indigo-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                                        {course.badge}
                                    </span>
                                </div>
                            )}

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col items-center text-center">
                                {/* Title */}
                                <div className="mb-6 flex flex-col items-center justify-center">
                                    <span className="text-gray-300 text-sm font-medium tracking-wide mb-1 uppercase">
                                        {course.titleTop}
                                    </span>
                                    <span className={`text-3xl md:text-4xl font-bold leading-none ${course.titleFont || ''}`}>
                                        {course.titleBottom}
                                    </span>
                                </div>

                                {/* Instructor */}
                                <span className="font-semibold text-sm md:text-base text-white mb-2">
                                    {course.instructor}
                                </span>

                                {/* Company/Role */}
                                {course.companyIcon ? (
                                    <div className="flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs text-gray-300">
                                        <course.companyIcon className="w-3.5 h-3.5" />
                                        <span>{course.companyText}</span>
                                    </div>
                                ) : (
                                    <div className={`text-sm mb-3 ${course.companyColor || 'text-gray-300'}`}>
                                        {course.companyText}
                                    </div>
                                )}

                                {/* Modules Info */}
                                {course.modules && (
                                    <div className="text-[10px] text-gray-400 font-medium tracking-wider uppercase mt-2">
                                        {course.modules}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
