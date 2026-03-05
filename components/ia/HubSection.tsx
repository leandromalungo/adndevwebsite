import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HubSection() {
    return (
        <section className="bg-white py-20 px-4 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                {/* Left Side: Image Grid */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                    {/* A 3x2 grid of squares */}
                    <div className="grid grid-cols-3 grid-rows-2 w-full max-w-2xl aspect-[3/2] bg-white">

                        {/* Row 1 */}
                        <div className="bg-white"></div>
                        <div className="relative bg-slate-900 w-full h-full">
                            <Image
                                src="/images-login.jpg"
                                alt="Person in light"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white"></div>

                        {/* Row 2 */}
                        <div className="relative bg-blue-900 w-full h-full">
                            <Image
                                src="/images-card1.jpg"
                                alt="Chip"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white flex items-end justify-start p-4">
                            <span className="text-3xl font-light text-slate-800 tracking-wider">IA</span>
                        </div>
                        <div className="relative bg-black w-full h-full">
                            <Image
                                src="/images-card2.webp"
                                alt="Woman with glasses"
                                fill
                                className="object-cover"
                            />
                        </div>

                    </div>
                </div>

                {/* Right Side: Content */}
                <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 leading-tight mb-8">
                        O hub dedicado à inteligência artificial na lusofonia
                    </h2>

                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10 max-w-md">
                        Dedicado a impulsionar o ecossistema de IA, conectando startups, empresas e talentos para cocriar 
                        o futuro da inteligência artificial, com estratégias centralizadas para desenvolver o uso de IA generativa.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="#"
                            className="bg-[#4353ff] hover:bg-blue-700 transition-colors text-white py-3 px-5 rounded-lg flex items-center justify-between gap-6 w-36 h-16 group"
                        >
                            <div className="flex flex-col text-sm font-medium leading-tight text-left">
                                <span>Para</span>
                                <span>Startups</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                        </Link>

                        <Link
                            href="#"
                            className="bg-[#ff6b00] hover:bg-orange-600 transition-colors text-white py-3 px-5 rounded-lg flex items-center justify-between gap-6 w-36 h-16 group"
                        >
                            <div className="flex flex-col text-sm font-medium leading-tight text-left">
                                <span>Para</span>
                                <span>Corporates</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
