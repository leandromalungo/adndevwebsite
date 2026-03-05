"use client";

import { motion } from "motion/react";

export default function App() {
    return (
        <div className="hidden lg:block w-full font-sans text-[#1f2428] overflow-hidden">
            {/* Main Container */}
            <main className="relative w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center py-12 md:py-16 min-h-[400px] lg:min-h-[550px]">

                {/* Left Side Composite Image (Desktop) */}
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[30%] h-[80%] pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        {/* 
              Nota: As imagens abaixo são as composições que você enviou.
              A da esquerda contém o grupo conversando e o grupo dançando com as linhas decorativas.
            */}
                        <img
                            src="/hero-right-2.png"
                            alt="Comunidade esquerda"
                            className="max-w-full max-h-full object-contain drop-shadow-2xl"
                            referrerPolicy="no-referrer"
                        />
                    </motion.div>
                </div>

                {/* Center Content */}
                <div className="z-10 text-center max-w-2xl px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl tracking-tight mb-6 leading-[1.1] text-[#212121]"
                    >
                        Plataforma para pessoas <br /> onde a tecnologia encontra talentos.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-medium"
                    >
                        Não perca tempo! Junte-se a nós e esteja com profissionais de tecnologia que já estão a
                        transformar suas carreiras com nossos recursos exclusivos. Fornecemos informações sobre o
                        sector tecnologia e muito mais na lusofonia. Para qualquer esclarecimento, entre em contacto connosco.
                    </motion.p>

                </div>

                {/* Right Side Composite Image (Desktop) */}
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[30%] h-[80%] pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        {/* 
              Nota: A da direita contém o grupo do selfie e o grupo do jantar com as linhas decorativas.
            */}
                        <img
                            src="/hero-left-2.png"
                            alt="Comunidade direita"
                            className="max-w-full max-h-full object-contain drop-shadow-2xl"
                            referrerPolicy="no-referrer"
                        />
                    </motion.div>
                </div>

            </main>
        </div>
    );
}