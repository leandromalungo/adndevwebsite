"use client";

import { motion } from "motion/react";

export default function App() {
  return (
    <div className="w-full flex items-center justify-center py-6 md:py-8">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-8"
          >
            <div className="relative aspect-video overflow-hidden rounded shadow-2xl shadow-black/10 bg-black">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/video.mp4" type="video/mp4" />
                Seu navegador não suporta vídeo.
              </video>
            </div>
          </motion.div>

          {/* Text Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-4 space-y-6 pt-2"
          >
            <h1 className="text-2xl md:text-3xl tracking-tight text-[#1A1A1A] font-sans uppercase">
              Documentario Tech Journey 
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-[#4A4A4A]">
              Proccuramos mostrar a jornada de profissionais de tecnologia, desde o início até o sucesso, inspirando a 
              próxima geração de talentos. Se você tem uma história única para contar, queremos ouvir de você! Seja um 
              protagonista da nossa série e compartilhe sua trajetória, desafios e conquistas no mundo da tecnologia. Junte-se a nós nessa jornada inspiradora e ajude a moldar o futuro da indústria tech.
            </p>

            {/* Button */}
            <button
              className="inline-block px-6 py-3 bg-black text-white font-semibold uppercase tracking-wide rounded shadow-lg hover:bg-violet-600 hover:shadow-violet-300 transition-colors duration-300"
            >
              conte a sua história
            </button>

          </motion.div>

        </div>
      </div>
    </div>
  );
}