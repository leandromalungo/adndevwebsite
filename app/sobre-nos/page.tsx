import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, Globe, Users, Zap } from "lucide-react";
import { accountCreationRateLimit } from './../../lib/rate-limit';

export default function SobreNosPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-50 selection:bg-violet-500/30 font-sans">
            {/* 
        HERO SECTION (Blender/Unity Vibe)
        Dark background, dramatic typography, very clean.
      */}
            <section className="relative w-full h-[85vh] md:h-[90vh] flex flex-col justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1"
                        alt="ADN Developer DNA"
                        fill
                        className="object-cover opacity-30 mix-blend-luminosity"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-20">
                    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tighter uppercase mb-6 leading-[0.9]">
                            Impulsionando <br />
                            <span className="text-transparent animate-gradient bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-600">
                                A Lusofonia
                            </span>
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-400 max-w-2xl font-medium leading-relaxed">
                            O ADN Developer não é apenas uma plataforma. É o código-fonte que
                            coneta criadores, visionários e desenvolvedores em todos os países de língua portuguesa.
                        </p>
                    </div>
                </div>
            </section>

            {/* VALUES & MISSION (Large Typography, Clean Grid) */}
            <section className="py-24 md:py-32 relative z-10 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-6 sm:mb-8 tracking-tight">
                                Democratizar o acesso ao conhecimento tecnológico.
                            </h2>
                            <div className="h-1 w-16 sm:w-20 bg-violet-600 mb-6 sm:mb-8" />
                            <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed mb-4 sm:mb-6">
                                Acreditamos que o talento está distribuído de forma igual pelo mundo,
                                mas as oportunidades não. A nossa missão é construir a ponte que falta,
                                fornecendo recursos consolidados, partilha de eventos reais e networking
                                absoluto.
                            </p>
                            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
                                Nascemos para ajudar pessoas e comunidades a construírem o próximo
                                grande salto tecnológico, capacitando indivíduos a transformarem ideias
                                em realidade, tudo na sua língua nativa.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 hover:border-violet-500/30 transition-colors">
                                <Globe className="w-10 h-10 text-violet-500 mb-6" />
                                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">Comunidade Global</h3>
                                <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">Mais de 7 países conectados num só lugar.</p>
                            </div>
                            <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 hover:border-fuchsia-500/30 transition-colors sm:translate-y-8">
                                <Zap className="w-10 h-10 text-fuchsia-500 mb-6" />
                                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">Inovação Direta</h3>
                                <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">Acesso a workshops, hackathons e conteúdo de ponta.</p>
                            </div>
                            <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors">
                                <Code2 className="w-10 h-10 text-blue-500 mb-6" />
                                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">Mentalidade Dev</h3>
                                <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">Focado 100% no ecossistema de desenvolvimento de software.</p>
                            </div>
                            <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 hover:border-rose-500/30 transition-colors sm:translate-y-8">
                                <Users className="w-10 h-10 text-rose-500 mb-6" />
                                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">Para Todos</h3>
                                <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">Iniciativas especiais como WTM para inclusão tecnológica.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BIG STATS SECTION (Industrial/High-Tech) */}
            <section className="py-24 border-y border-white/10 bg-[#050505]">
                <div className="max-w-7xl mx-auto px-6">Nossas metas até 2027
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
                        <div className="flex flex-col items-center justify-center text-center p-4">
                            <span className="text-5xl md:text-7xl  text-transparent animate-gradient bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-2">
                                10.000+
                            </span>
                            <span className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-widest">
                                Comunidades
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-4">
                            <span className="text-5xl md:text-7xl  text-transparent animate-gradient bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-2">
                                5000+
                            </span>
                            <span className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-widest">
                                Eventos Mapeados
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-4">
                            <span className="text-5xl md:text-7xl  text-transparent animate-gradient bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-2">
                                7
                            </span>
                            <span className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-widest">
                                Países CPLP
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-4">
                            <span className="text-5xl md:text-7xl  text-transparent animate-gradient bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-2">
                                24/24
                            </span>
                            <span className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-widest">
                                Acesso Gratuito
                            </span>
                        </div>
                    </div>
                </div>
            </section>

    

            {/* CONTACT SECTION */}
            <section className="py-24 border-t border-white/5 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight mb-3 sm:mb-4 uppercase">
                            Fale Connosco
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                            Tens uma dúvida, queres ser parceiro ou apenas deixar um alô? <br />
                            Estamos à distância de um clique.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-[#111111] rounded overflow-hidden border border-white/5">
                        {/* Contact Info (Left Side) */}
                        <div className="p-10 md:p-14 flex flex-col justify-between bg-gradient-to-br from-violet-900/40 to-[#111111] relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-6 text-white">
                                    Informações de Contacto
                                </h3>
                                <p className="text-gray-400 mb-12 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                                    A nossa equipa procurará responder o mais breve possível. O seu feedback é
                                    o motor que move a nossa comunidade.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                                        </div>
                                        <div>
                                            <span className="block text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Email Geral / Parcerias</span>
                                            <a href="mailto:geral.adndeveloper@gmail.com" className="text-white font-bold text-lg hover:text-violet-400 transition-colors">geral.adndeveloper@gmail.com</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                        </div>
                                        <div>
                                            <span className="block text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Suporte Telefônico</span>
                                            <a href="tel:+244900000000" className="text-white font-bold text-lg hover:text-fuchsia-400 transition-colors">(+244) --- --- ---</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative shapes behind text */}
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-violet-600/30 rounded-full blur-3xl" />
                            <div className="absolute top-12 -left-12 w-32 h-32 bg-fuchsia-600/20 rounded-full blur-2xl" />
                        </div>

                        {/* Image Side (Right) */}
                        <div className="relative w-full min-h-[400px] lg:min-h-full">
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
                                alt="ADN Developer Parceiros"
                                fill
                                className="object-cover"
                            />
                            {/* Overlay de gradiente para combinar com o tema escuro na esquerda */}
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#111111]/30 to-[#111111] pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA (Massive block, similar to Blender/Unity 'Get Started' sections) */}
            <section className="py-32 relative overflow-hidden bg-violet-900 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-transparent z-0" />
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-8 tracking-tighter mix-blend-overlay">
                        PRONTO PARA CODAR O FUTURO?
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-violet-200 mb-8 sm:mb-12 max-w-2xl mx-auto font-medium">
                        Junte-se a milhares de outros profissionais e comece a descobrir
                        conteúdos, bolsas e eventos de alto valor.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link
                            href="/"
                            className="px-10 py-5 bg-white text-violet-950 hover:bg-gray-100 rounded text-lg font-bold transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                            Explorar a Plataforma
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
