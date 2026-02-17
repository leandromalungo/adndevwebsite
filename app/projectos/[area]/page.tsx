"use client";

import React, { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Github, ExternalLink, Code2, Layers, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MOCK_PROJECTS, getAllAreas, Difficulty } from '@/data/mockProjects';

export default function AreaProjectsPage() {
  const params = useParams();
  const router = useRouter();
  const areaSlug = params.area as string;
  const [activeTab, setActiveTab] = useState<Difficulty>('Junior');

  const areaInfo = useMemo(() => {
    return getAllAreas().find(a => a.slug === areaSlug);
  }, [areaSlug]);

  const projects = useMemo(() => {
    if (!areaInfo) return [];
    return MOCK_PROJECTS.filter(p => 
      p.area === areaInfo.slug && p.difficulty === activeTab
    );
  }, [areaInfo, activeTab]);

  if (!areaInfo) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-white">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Área não encontrada</h1>
                <button onClick={() => router.back()} className="text-blue-400 hover:text-blue-300">Voltar</button>
            </div>
        </div>
    );
  }

  const tabs: { id: Difficulty; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'Junior', label: 'Júnior', icon: <Code2 className="w-4 h-4" />, color: 'text-violet-500' },
    { id: 'Pleno', label: 'Pleno', icon: <Layers className="w-4 h-4" />, color: 'text-violet-500' },
    { id: 'Senior', label: 'Sênior', icon: <Zap className="w-4 h-4" />, color: 'text-violet-500' },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#09090b] text-white">
        
        {/* Header */}
        <div className="bg-zinc-900/50 border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <button 
              onClick={() => router.back()}
              className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para projectos
            </button>
            
            <h1 className="text-4xl font-medium text-white mb-4">
              Projectos de <span className="text-blue-400">{areaInfo.title}</span>
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Domine {areaInfo.title} construindo projectos práticos. Comece pelo básico e avance até arquitecturas complexas.
            </p>
          </div>
        </div>

        {/* Tabs & Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
            
          {/* Custom Tabs */}
          <div className="flex justify-center md:justify-start mb-12 border-b border-zinc-800">
             {tabs.map((tab) => (
                 <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                        flex items-center gap-2 px-6 py-4 border-b-2 transition-all font-medium text-sm md:text-base
                        ${activeTab === tab.id 
                            ? `border-blue-500 text-white` 
                            : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-zinc-700'
                        }
                    `}
                 >
                    <span className={activeTab === tab.id ? tab.color : ''}>{tab.icon}</span>
                    {tab.label}
                 </button>
             ))}
          </div>

          {/* Projects Grid */}
          {projects.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {projects.map((project) => (
                 <div 
                    key={project.id}
                    className="group bg-zinc-900 border border-zinc-800 rounded overflow-hidden hover:border-violet-600 transition-all flex flex-col"
                 >
                    <div className="aspect-video relative overflow-hidden bg-zinc-800">
                        <img 
                            src={project.imageUrl} 
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-white mb-3">
                            {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                            {project.description}
                        </p>
                        
                        <div className="mt-auto">
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="px-2 py-1 bg-zinc-800 text-gray-300 text-xs rounded border border-zinc-700">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="flex gap-3">
                                {project.repoUrl && (
                                    <a 
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noreferrer" 
                                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm transition-colors"
                                    >
                                        <Github className="w-4 h-4" />
                                        Code
                                    </a>
                                )}
                                {project.demoUrl ? (
                                    <a 
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Demo
                                    </a>
                                ) : (
                                     <button className="flex-1 py-2 rounded-lg bg-zinc-800 text-zinc-500 cursor-not-allowed text-sm font-medium">
                                        Demo Indisponível
                                     </button>
                                )}
                            </div>
                        </div>
                    </div>
                 </div>
               ))}
             </div>
          ) : (
            <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-800">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code2 className="w-8 h-8 text-zinc-500" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Sem projectos ainda</h3>
                <p className="text-gray-400">
                    Ainda não adicionamos projectos nível <span className="text-blue-400 font-bold">{activeTab}</span> para {areaInfo.title}.
                    <br />
                    Tente outro nível de dificuldade.
                </p>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}
