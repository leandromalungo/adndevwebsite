"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PROJECT_CATEGORIES } from '@/data/mockProjects';

export default function ProjectsLandingPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#09090b] text-white selection:bg-blue-500/30">
        
        {/* Header Hero */}
        <div className="relative py-24 px-6 overflow-hidden">
             
           {/* Background Decorations */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
              <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px]" />
              <div className="absolute bottom-20 right-10 w-72 h-72 bg-violet-600/20 rounded-full blur-[100px]" />
           </div>

         <div className="relative z-10 max-w-7xl mx-auto">
          <Link href="/cursos/plano-de-estudos" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Link>
            </div>
         
             <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-6 tracking-tight">
              Projectos Práticos
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A melhor forma de aprender é construindo. Escolha sua área e encontre desafios reais para todos os níveis de senioridade.
            </p>
          </div>
        </div>

        {/* Categories List */}
        <div className="max-w-7xl mx-auto px-6 pb-32 space-y-20 mt-5">
          {PROJECT_CATEGORIES.map((category) => {
            const CatIcon = category.icon;
            
            return (
              <div key={category.title} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-blue-500/5 flex items-center justify-center text-blue-400">
                    <CatIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl text-white mb-1">
                      {category.title}
                    </h2>
                    <p className="text-gray-400">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.areas.map((area) => (
                    <Link 
                      href={`/projectos/${area.slug}`} 
                      key={area.slug}
                      className="group p-6 rounded bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 hover:bg-zinc-800/50 transition-all duration-200"
                    >
                      <h3 className="text-lg text-white mb-2 flex items-center justify-between">
                        {area.title}
                        <ArrowLeft className="w-4 h-4 text-zinc-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all rotate-180" />
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {area.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
      <Footer />
    </>
  );
}
