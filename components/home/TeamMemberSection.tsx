"use client";

import React from "react";
import { Facebook, Linkedin, Instagram } from "lucide-react";

interface TeamMemberProps {
  name: string;
  location: string;
  imageUrl: string;
}

/* =======================
   Ícones Sociais
======================= */
const SocialIcons = () => (
  <div className="flex gap-1 mt-1 justify-center md:justify-start">
    <a href="#" className="text-gray-400 hover:text-[#E4405F] transition-colors" aria-label="Instagram">
      <Instagram className="w-3 h-3" />
    </a>
    <a href="#" className="text-gray-400 hover:text-[#1877F2] transition-colors" aria-label="Facebook">
      <Facebook className="w-3 h-3" />
    </a>
    <a href="#" className="text-gray-400 hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn">
      <Linkedin className="w-3 h-3" />
    </a>
  </div>
);

/* =======================
   Card do Membro
======================= */
const TeamMember: React.FC<TeamMemberProps> = ({ name, location, imageUrl }) => (
  <div className="flex flex-col items-center gap-1 text-center min-w-[90px] md:min-w-0">
    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
      <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
    </div>
    <span className="font-bold text-[#334155] text-xs leading-tight">{name}</span>
    <span className="text-gray-400 text-[10px]">{location}</span>
    <SocialIcons />
  </div>
);

/* =======================
   Secção da Equipe
======================= */
const TeamMemberSection = () => {
  const team: TeamMemberProps[] = [
    { name: "Leandro Malungo", location: "África / Angola", imageUrl: "/images-lm.webp" },
    { name: "Neuza Nascimento", location: "Europa / Portugal", imageUrl: "/images-nn.webp" },
    { name: "Filipe Mafuila", location: "África / Angola", imageUrl: "/fl.jpg" },
  ];

  return (
    <section className="w-full px-2 md:px-8 py-8">
      <div className="max-w-7xl mx-auto bg-gray-50 rounded shadow-sm border border-gray-100 p-6 md:p-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-[#334155] mb-4 uppercase">Quem Somos?</h3>
          <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
            Somos os criadores da plataforma ADN Developer, uma iniciativa dedicada a conectar e fortalecer as comunidades de tecnologia na lusofonia. Com uma paixão por inovação e colaboração, nossa missão é criar um espaço onde entusiastas, desenvolvedores e criativos possam compartilhar conhecimento, colaborar em projetos e impulsionar a inovação. Junte-se a nós e faça parte desta jornada emocionante!
          </p>
        </div>

        {/* Layout responsivo: todos na mesma linha em mobile */}
        <div className="flex justify-between md:grid md:grid-cols-3 gap-4">
          {team.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMemberSection;