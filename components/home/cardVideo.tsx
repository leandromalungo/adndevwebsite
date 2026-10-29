"use client";

import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="w-full py-6 md:py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Container Principal: Define a proporção visual e o arredondamento */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full min-h-[450px] md:min-h-[500px] lg:h-[480px] rounded-2xl overflow-hidden bg-black flex items-center shadow-2xl"
        >
          
          {/* 1. VÍDEO EM SEGUNDO PLANO */}
          <div className="absolute inset-0 w-full h-full z-0">
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

          {/* 2. OVERLAY ESCURO (Garante o contraste para a leitura das letras) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-10" />

          {/* 3. CONTEÚDO COM AS LETRAS POR CIMA */}
          <div className="relative z-20 w-full max-w-2xl px-6 sm:px-10 md:px-16 py-12 flex flex-col space-y-4">
            
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs font-bold text-violet-400 uppercase tracking-widest"
            >
              Exclusivo
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase leading-tight"
            >
              Nosso Hub Online
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium"
            >
              Procuramos mostrar a jornada de profissionais de tecnologia, desde o início até o sucesso, inspirando a
              próxima geração de talentos. Se você tem uma história única para contar, queremos ouvir de você! Seja um
              protagonista da nossa série e compartilhe sua trajetória, desafios e conquistas no mundo da tecnologia. Junte-se a nós nessa jornada inspiradora e ajude a moldar o futuro da indústria tech.
            </motion.p>
            
          </div>

        </motion.div>
      </div>
    </div>
  );
}