import Image from "next/image";
import Link from "next/link";

export default function PromoSection() {
    return (
        <section className="w-full bg-[#0052cc] py-16 px-4 md:px-8 lg:px-16 text-white font-sans overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

                {/* Text Content Area */}
                <div className="w-full md:w-[55%] flex flex-col items-start gap-4 z-10">

                    {/* Logo/Brand Header */}
                    <div className="flex items-center gap-2 mb-2">
                        {/* Placeholder for Coursera logo text using basic typography if no logo provided */}
                        <span className="font-thin text-2xl tracking-tighter uppercase">Analise dados</span>
                    </div>

                    {/* Main Headline */}
                    <h2 className="text-3xl md:text-5xl lg:text-[44px] leading-tight mb-2">
                        Economize 40% no Coursera Plus por tempo limitado
                    </h2>

                    {/* Subheadline / Description */}
                    <p className="text-white/90 text-[15px] leading-relaxed max-w-[90%] mb-4">
                        Obtenha três meses de acesso total a milhares de cursos de instrutores especializados do Google, Meta e muito mais. Comece hoje mesmo a desenvolver habilidades prontas para o trabalho, a explorar novas carreiras e a obter várias credenciais.
                    </p>

                    {/* Pricing Info */}
                    <p className="text-white font-semibold text-sm mb-6">
                        <span className="line-through opacity-70 mr-2">US$ 24</span>
                        US$ 14,40/mês. Pode ser cancelado a qualquer momento
                    </p>

                    {/* Call to Action Container */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full mb-6">
                        <Link
                            href="#"
                            className="bg-white text-[#0052cc] hover:bg-gray-100 transition-colors font-bold px-8 py-3.5 rounded w-full sm:w-auto text-center shadow-sm"
                        >
                            Economize agora
                        </Link>
                        <span className="text-white font-medium text-sm">
                            ou US$ 160/ano pelo Coursera Plus anual
                        </span>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-white/70 text-xs">
                        A oferta termina em 16 de março de 2026 (consulte <Link href="#" className="underline hover:text-white transition-colors">Termos da oferta</Link>)
                    </p>
                </div>

                {/* Image Area - 40% OFF */}
                <div className="w-full md:w-[45%] relative min-h-[300px] md:min-h-[400px] flex justify-center md:justify-end items-center">
                    <div className="relative w-full max-w-[500px] aspect-square">
                        <Image
                            src="/off.png"
                            alt="40% OFF with brand logos bubbles"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
