"use client";

import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

interface TeamMemberProps {
  name: string;
  location: string;
  imageUrl: string;
}

/* =======================
   Ícones Sociais
======================= */
const SocialIcons = () => (
  <div className="flex gap-2.5 mt-2">
    {/* Instagram */}
    <a
      href="#"
      className="text-gray-400 hover:text-[#E4405F] transition-colors"
      aria-label="Instagram"
    >
      <Instagram className="w-4 h-4" />
    </a>

    {/* Facebook */}
    <a
      href="#"
      className="text-gray-400 hover:text-[#1877F2] transition-colors"
      aria-label="Facebook"
    >
      <Facebook className="w-4 h-4" />
    </a>

    {/* LinkedIn */}
    <a
      href="#"
      className="text-gray-400 hover:text-[#0A66C2] transition-colors"
      aria-label="LinkedIn"
    >
      <Linkedin className="w-4 h-4" />
    </a>
  </div>
);

/* =======================
   Card do Membro
======================= */
const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  location,
  imageUrl,
}) => (
  <div className="flex items-center gap-4">
    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="flex flex-col text-sm">
      <span className="font-bold text-[#334155] leading-tight">
        {name}
      </span>
      <span className="text-gray-400 text-xs mt-0.5">
        {location}
      </span>
      <SocialIcons />
    </div>
  </div>
);

/* =======================
   Secção da Equipe
======================= */
const TeamMemberSection = () => {
  const team: TeamMemberProps[] = [
    {
      name: "Leandro Malungo",
      location: "Africa / Angola",
      imageUrl: "/api/images/lm",
    },
    {
      name: "Neuza Nascimento",
      location: "Europa / Portugal",
      imageUrl: "/api/images/nn",
    },
    {
      name: "Filipe Mafuila",
      location: "Africa / Angola",
      imageUrl: "/api/images/fl?v=1",
    },
  ];

  return (
    <section className="w-full px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto bg-gray-50 rounded shadow-sm border border-gray-100 p-8 md:p-10">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-[#334155] mb-8 uppercase">
            Quem Somos?
          </h3>

          <p className="text-gray-600 text-lg leading-relaxed mb-12">
            Somos os criadores da plataforma ADN Developer, uma iniciativa dedicada a conectar e fortalecer as comunidades de tecnologia na lusofonia. Com uma paixão por inovação e colaboração, nossa missão é criar um espaço onde entusiastas, desenvolvedores e criativos possam compartilhar conhecimento, colaborar em projetos e impulsionar a inovação. Junte-se a nós e faça parte desta jornada emocionante!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center">
          {team.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMemberSection;
