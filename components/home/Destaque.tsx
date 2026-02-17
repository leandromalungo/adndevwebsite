import React from "react";
import Image from "next/image";

interface SidebarItemProps {
  category?: string;
  isPartner?: boolean;
  title: string;
  description?: string;
  imageSrc: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ category, isPartner, title, description, imageSrc }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pb-5 border-b border-zinc-200 last:border-b-0 group cursor-pointer relative">
      <div className="w-full sm:w-28 h-20 flex-shrink-0 overflow-hidden bg-gray-100 rounded-sm relative">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-start mb-2">
          {isPartner ? (
            <span className="bg-zinc-800 text-white text-[9px] font-bold px-2 py-1 w-fit uppercase tracking-wider truncate">
              Conteúdo de parceiros
            </span>
          ) : (
            <span className="text-violet-700 text-[10px] font-bold uppercase tracking-widest truncate">
              {category}
            </span>
          )}
        </div>
        
        <h3 className="text-zinc-900 text-sm font-bold leading-snug group-hover:text-violet-700 transition-colors line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="text-zinc-500 text-xs mt-2 leading-tight line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export const Destaque = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Cabeçalho */}
        <div className="border-b-2 border-zinc-900 mb-8 pb-3 flex justify-between items-end">
          <h2 className="text-2xl md:text-3xl font-thin text-zinc-900 tracking-tighter uppercase">
            Tecnologia
          </h2>
        </div>

        {/* Layout de grelha */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          
          {/* Coluna principal (esquerda) */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Artigo principal em destaque */}
            <div className="flex flex-col group cursor-pointer">
              <div className="relative overflow-hidden rounded-sm">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200&h=675"
                    alt="Featured Technology News"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              </div>
              <div className="mt-5 md:mt-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-violet-700 font-bold text-xs uppercase tracking-widest">Destaque</span>
                </div>
                <h1 className="text-2xl md:text-3xl text-zinc-900 leading-tight group-hover:text-violet-700 transition-colors mb-3">
                  O Futuro da Inteligência Artificial: O que esperar para a próxima década na computação quântica.
                </h1>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed text-justify">
                  Exploramos como a convergência entre IA e hardware quântico está prestes a redefinir a segurança digital e a descoberta de novos materiais em tempo recorde.
                </p>
              </div>
            </div>
          </div>

          {/* Barra lateral: últimas notícias */}
          <div className="flex flex-col">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 border-b border-zinc-300 pb-3">Últimas Notícias</h4>
            
            <div className="flex flex-col space-y-0">
              <SidebarItem 
                category="Saúde & Tech"
                title="Os dispositivos de monitoramento do sono realmente ajudam? Especialistas opinam."
                imageSrc="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400&h=225"
              />
              
              <SidebarItem 
                isPartner
                title="Dubai se torna uma plataforma de lançamento para a expansão tecnológica europeia."
                description="Conteúdo de parceiros apresentado pela Câmara de Comércio de Dubai."
                imageSrc="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400&h=225"
              />
              
              <SidebarItem 
                category="Inteligência Artificial"
                title="Quem usa IA na Europa - e onde ainda é um tabu para os profissionais?"
                imageSrc="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400&h=225"
              />

              <SidebarItem 
                category="Gadgets"
                title="Novo smartphone dobrável promete bateria que dura três dias inteiros."
                imageSrc="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400&h=225"
              />
            
              <SidebarItem 
                category="Gadgets"
                title="Novo smartphone dobrável promete bateria que dura três dias inteiros."
                imageSrc="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400&h=225"
              />

              <SidebarItem 
                category="Gadgets"
                title="Novo smartphone dobrável promete bateria que dura três dias inteiros."
                imageSrc="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400&h=225"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
