"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Play } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
    return (
        <div className="w-full flex items-center justify-center py-6 md:py-8">
            <div className="max-w-7xl w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* Video Thumbnail Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="lg:col-span-8 relative group cursor-pointer"
                    >
                        <div className="relative aspect-video overflow-hidden rounded shadow-2xl shadow-black/10">
                            <img
                                src="https://picsum.photos/seed/anthropic-talk/1200/675"
                                alt="Construindo Antrópico"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute" />

                            {/* Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-xl transition-shadow duration-300 group-hover:shadow-white/20"
                                >
                                    <Play className="w-8 h-8 md:w-10 md:h-10 text-black fill-black ml-1" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="lg:col-span-4 space-y-4 pt-2"
                    >
                        <h1 className="text-2xl md:text-3xl tracking-tight text-[#1A1A1A] font-sans uppercase">
                            Construindo um caminho facilitador
                        </h1>
                        <p className="text-lg md:text-xl leading-relaxed text-[#4A4A4A]">
                            Viemos para facilitar o caminho de quem quer entrar no mercado de tecnologia, 
                            oferecendo cursos, workshops, palestras, bolsas de estudos, hackathons, desafios 
                            nacionais e testes de codificação. E dar acesso a quem nunca teve, a dizer 
                            "eu também posso".
                        </p>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
