import Image from "next/image";
import Navbar from "@/components/auth/Navbar";
import FAQSection from "@/components/home/FAQSection";

export default function SobreNosPage() {
    const teamMembers = [
        {
            name: "Leandro Malungo",
            role: "Founder & Manager",
            country: "Angola",
            image: "/leandro.jpg",
            description:
                "Fundador e gestor do ADN Developer, com uma visão estratégica para conectar talentos, comunidades e oportunidades no ecossistema tecnológico lusófono.",
            instagram: "#",
            linkedin: "#",
            github: "#",
        },
        {
            name: "Neuza Nascimento",
            role: "Co-Founder",
            country: "Portugal",
            image: "/neuza.jpg",
            description:
                "Co-fundadora e estrategista de parcerias, dedicada a construir pontes entre comunidades, startups e oportunidades tecnológicas.",
            instagram: "https://www.instagram.com/neuza_nascimento02/",
            linkedin:
                "https://www.linkedin.com/in/neuza-nascimento-aa81bb324/",
            github: "#",
        },
        {
            name: "Whitney Velasco",
            role: "Content Creator",
            country: "Portugal",
            image: "/whitiney.jpg",
            description:
                "Estudante de engenharia informática, moçambicana.",
            instagram: "https://www.instagram.com/whitney_velascoo/",
            linkedin:
                "https://www.linkedin.com/in/whitney-velasco-furruma-5169092b9/?skipRedirect=true",
            github: "#",
        },
        {
            name: "Fernanda Sehn",
            role: "Designer",
            country: "Brasil",
            image: "/fernanda.jpg",
            description:
                "Estudante de história e Designer, brasileira.",
            instagram: "https://www.instagram.com/fe.sehn/",
            linkedin:
                "https://www.linkedin.com/in/fernanda-sehn-069b092b9/?skipRedirect=true",
            github: "#",
        },
        {
            name: "Filipe Mafuila",
            role: "Frontend Developer",
            country: "Angola",
            image: "/filipe.jpg",
            description:
                "Desenvolvedor frontend, focado em criar interfaces modernas, responsivas e centradas no utilizador.",
            instagram: "https://www.instagram.com/filipemafuila/",
            linkedin: "https://www.linkedin.com/in/filipe-mafuila/",
            github: "#",
        },
        {
            name: "Fanio Panga",
            role: "Frontend Developer",
            country: "Angola",
            image: "/filipe.jpg",
            description:
                "Desenvolvedor frontend, focado em criar interfaces modernas, responsivas e centradas no utilizador.",
            instagram: "https://www.instagram.com/filipemafuila/",
            linkedin: "https://www.linkedin.com/in/filipe-mafuila/",
            github: "#",
        },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
         <Navbar />
            {/* HERO + TEAM */}
            <section className="relative overfljow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0a0a0a]/90 to-[#050505]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-28">
                    {/* TEXTURA EM XADREZ INTERNA (Opcional - caso queiras reforçar o efeito dentro do card) */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.07] pointer-events-none" />

                    {/* Hero */}
                    <div className="text-center max-w-5xl mx-auto">
                        <h1 className="mt-1 text-2xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight leading-none uppercase">
                            Conectando Talentos, Impulsionando Inovação
                        </h1>

                        <p className="mt-8 text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                            Construindo a maior plataforma lusófona focada em
                            tecnologia, oportunidades e crescimento para
                            desenvolvedores, startups e comunidades.
                        </p>
                    </div>

                    {/* Goals */}
                    <div className="mt-24">
                        <div className="text-center mb-14">
                            <span className="uppercase tracking-[0.3em] text-violet-400 text-sm font-semibold">
                                Nossas Metas
                            </span>

                            <h2 className="mt-4 text-3xl md:text-5xl tracking-tight">
                                O ecossistema que queremos construir
                            </h2>

                            <p className="mt-6 text-gray-500 text-base md:text-lg max-w-3xl mx-auto">
                                O ADN Developer nasce com o objetivo de
                                centralizar oportunidades, comunidades e
                                conhecimento tecnológico num único lugar.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
                            {[
                                {
                                    number: "10K+",
                                    title: "Comunidades",
                                    color: "text-violet-400",
                                    border: "hover:border-violet-500/30",
                                    description:
                                        "Comunidades tech integradas e mapeadas dentro da plataforma.",
                                },
                                {
                                    number: "5K+",
                                    title: "Eventos",
                                    color: "text-fuchsia-400",
                                    border: "hover:border-fuchsia-500/30",
                                    description:
                                        "Hackathons, workshops e conferências tecnológicas.",
                                },
                                {
                                    number: "2K+",
                                    title: "Bolsas",
                                    color: "text-cyan-400",
                                    border: "hover:border-cyan-500/30",
                                    description:
                                        "Oportunidades de estudo e aceleração profissional.",
                                },
                                {
                                    number: "500+",
                                    title: "Startups",
                                    color: "text-emerald-400",
                                    border: "hover:border-emerald-500/30",
                                    description:
                                        "Programas de apoio, incubação e networking.",
                                },
                                {
                                    number: "300+",
                                    title: "Roadmaps",
                                    color: "text-orange-400",
                                    border: "hover:border-orange-500/30",
                                    description:
                                        "Trilhas completas para diferentes carreiras tech.",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={`rounded border border-white/5 bg-white/[0.03] backdrop-blur-xl p-8 text-center transition-all duration-500 ${item.border}`}
                                >
                                    <h3 className="text-4xl md:text-5xl font-black text-white">
                                        {item.number}
                                    </h3>

                                    <p
                                        className={`mt-4 uppercase tracking-[0.2em] text-xs ${item.color}`}
                                    >
                                        {item.title}
                                    </p>

                                    <span className="block mt-4 text-sm text-gray-500 leading-relaxed">
                                        {item.description}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-24" />

                    {/* Team Heading */}
                    <div className="text-center mb-16">
                        <span className="text-violet-400 uppercase tracking-[0.3em] text-sm font-semibold">
                            Nossa Equipa
                        </span>

                        <p className="mt-6 text-gray-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                            Uma equipa focada em criar impacto tecnológico,
                            conectar talentos e desenvolver oportunidades reais.
                        </p>
                    </div>

                    {/* Team Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-3 gap-2">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="
                                group relative
                                w-full
                                sm:w-[240px]
                                md:w-[220px]
                                lg:w-[205px]
                                xl:w-[210px]
                                overflow-hidden
                                rounded-2xl
                                border border-white/5
                                bg-[#111111]/80
                                backdrop-blur-xl
                                hover:border-violet-500/30
                                transition-all duration-500
                                "
                            >
                                {/* Image */}
                                <div className="relative h-[320px] overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="
                                        object-cover
                                        transition-transform duration-700 ease-out
                                        group-hover:scale-105
                                        "
                                    />

                                    {/* Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

                                    {/* Default Info */}
                                    <div
                                        className="
                                        absolute bottom-0 left-0 w-full p-5 z-20
                                        transition-all duration-500 ease-out
                                        group-hover:opacity-0
                                        group-hover:translate-y-4
                                        "
                                    >
                                        <h3 className="text-lg xl:text-xl font-bold text-white leading-tight">
                                            {member.name}
                                        </h3>

                                        <p className="text-[11px] xl:text-xs uppercase tracking-[0.2em] text-violet-400 mt-2">
                                            {member.role}
                                        </p>

                                        {/* COUNTRY */}
                                        <div className="mt-3 inline-flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-1">

                                            <span className="text-[11px] uppercase tracking-[0.15em] text-gray-300">
                                                {member.country}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div
                                        className="
                                        absolute inset-0 z-30
                                        flex flex-col justify-end
                                        p-5
                                        bg-black/75 backdrop-blur-sm
                                        opacity-0
                                        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                                        group-hover:opacity-100
                                        "
                                    >
                                        <div
                                            className="
                                            translate-y-6
                                            opacity-0
                                            transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                                            group-hover:translate-y-0
                                            group-hover:opacity-100
                                            "
                                        >

                                            <p className="text-sm text-gray-300 leading-relaxed mb-6">
                                                {member.description}
                                            </p>

                                            {/* Socials */}
                                            <div className="flex items-center gap-3">
                                                {/* Instagram */}
                                                <a
                                                    href={member.instagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-violet-500 transition-colors duration-300 flex items-center justify-center"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="18"
                                                        height="18"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        className="text-white"
                                                    >
                                                        <rect
                                                            x="2"
                                                            y="2"
                                                            width="20"
                                                            height="20"
                                                            rx="5"
                                                        />
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                        <line
                                                            x1="17.5"
                                                            y1="6.5"
                                                            x2="17.51"
                                                            y2="6.5"
                                                        />
                                                    </svg>
                                                </a>

                                                {/* LinkedIn */}
                                                <a
                                                    href={member.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-violet-500 transition-colors duration-300 flex items-center justify-center"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="18"
                                                        height="18"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                        className="text-white"
                                                    >
                                                        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-.9 1.8-2.2 3.9-2.2 4.2 0 5 2.7 5 6.3V24h-4v-7.3c0-1.8 0-4-2.5-4s-2.9 1.9-2.9 3.9V24h-4V8z" />
                                                    </svg>
                                                </a>

                                                {/* GitHub */}
                                                <a
                                                    href={member.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="18"
                                                        height="18"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                        className="text-white"
                                                    >
                                                        <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56v-2.16c-3.2.7-3.88-1.38-3.88-1.38-.52-1.3-1.27-1.64-1.27-1.64-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.17 1.75 1.17 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.52-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.3 1.17-3.11-.12-.3-.5-1.47.11-3.06 0 0 .96-.31 3.15 1.19a10.9 10.9 0 0 1 5.74 0c2.18-1.5 3.14-1.19 3.14-1.19.62 1.59.24 2.76.12 3.06.73.81 1.17 1.85 1.17 3.11 0 4.43-2.7 5.4-5.27 5.68.41.36.77 1.07.77 2.16v3.2c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <FAQSection />
                </div>
                
            </section>
        </div>
    );
}