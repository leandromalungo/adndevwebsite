import Image from "next/image";

const CUBO_FEATURES = [
    {
        id: "comunidade",
        title: "Comunidade",
        description: "Trocas e aprendizado com + 700 empreendedores e startups da nossa rede, no físico e no digital.",
        image: "/images-login.jpg", // placeholder
        cornerColor: "bg-blue-600",
    },
    {
        id: "negocios",
        title: "Geração de negócios",
        description: "A conexão no ecossistema gera escalabilidade para startups e eficiência operacional para corporates.",
        image: "/images-card1.jpg", // placeholder
        cornerColor: "bg-pink-500",
    },
    {
        id: "fundraising",
        title: "Fundraising",
        description: "Preparo para rodadas de investimento e conexão com fundos, investors e benefícios de partners.",
        image: "/images-card2.webp", // placeholder
        cornerColor: "bg-blue-600",
    },
    {
        id: "conteudos",
        title: "Conteúdos exclusivos",
        description: "Networking com quem é referência no mercado em eventos, workshops, mentorias e treinamentos.",
        image: "/images-community.jpg", // placeholder
        cornerColor: "bg-pink-500",
    }
];

export default function CuboAISection() {
    return (
        <section className="bg-white py-20 px-4 w-full">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-slate-900 leading-tight font-light">
                        Cubo AI: o ponto de partida para <strong className="text-violet-600">
                            geração de cases e parcerias</strong> entre os players do mercado
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CUBO_FEATURES.map((feature, index) => (
                        <div key={feature.id} className="relative h-[480px] w-full group overflow-hidden bg-slate-100 flex flex-col justify-end">
                            {/* Background Image */}
                            <Image
                                src={feature.image}
                                alt={feature.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Pixel decoration overlay at top right / left depending on design (approximate) */}
                            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10 flex flex-wrap opacity-80 mix-blend-overlay">
                                {/* Simulating the pixelated corners seen in the image - abstract representation */}
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className={`w-4 h-4 ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`} />
                                ))}
                            </div>

                            {/* Internal White Content Box */}
                            <div className="relative z-20 bg-white m-4 p-6 shadow-sm flex-shrink-0 min-h-[160px]">
                                <h3 className="text-xl text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Bottom Right Colored Square */}
                            <div className={`absolute bottom-0 right-0 w-6 h-6 z-30 ${feature.cornerColor}`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
