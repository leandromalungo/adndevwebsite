"use client";

import { motion } from "framer-motion";

export default function App() {
    return (
        <div className="hidden md:block w-full font-sans text-[#1f2428] overflow-hidden">
            {/* Main Container */}
            <main className="relative w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center py-12 md:py-16 min-h-[400px] lg:min-h-[550px]">

                {/* Left Side Composite Image (Desktop) */}
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[30%] h-[80%] pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1, margin: "100px 0px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        {/* 
              Note: The images below are the compositions you sent.
              The left one contains the group conversing and the group dancing with decorative lines.
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
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1, margin: "100px 0px" }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-4xl tracking-tight mb-6 leading-[1.1] text-[#212121] uppercase"
                    >
                      transforme sua carreira!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1, margin: "100px 0px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed font-medium"
                    >
                        Não perca tempo! Junte-se a nós e esteja com profissionais de tecnologia que já estão a
                        transformar suas carreiras com nossos recursos exclusivos. Fornecemos informações sobre o
                        sector tecnologia e muito mais na lusofonia. Para qualquer esclarecimento, entre em contacto connosco.
                    </motion.p>

                </div>

                {/* Right Side Composite Image (Desktop) */}
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[30%] h-[80%] pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1, margin: "100px 0px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        {/* 
              Note: The right one contains the selfie group and the dinner group with decorative lines.
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