
import React, { useState } from 'react';
import { Project, Difficulty } from '@/data/types';
import { ProjectGridCard } from '@/components/roadmaps/ProjectGridCard';
import { MOCK_PROJECTS } from '@/components/roadmaps/constants';

interface RoadmapDetailViewProps {
  title: string;
  onBack: () => void;
}

export const RoadmapDetailView: React.FC<RoadmapDetailViewProps> = ({ title, onBack }) => {
  const [activeLevel, setActiveLevel] = useState<Difficulty>('Junior');
  const [activeTab, setActiveTab] = useState<'Roadmap' | 'Projectos' | 'Apostila'>('Projectos');

  // Find exact match or use default
  const projects = MOCK_PROJECTS[title] || MOCK_PROJECTS['default'];
  
  // Filtering logic
  const filteredProjects = projects.filter(p => p.difficulty === activeLevel);

  const getTopicDescription = (topic: string) => {
    if (topic.includes('DevOps')) return 'Project ideas to take you from Junior to Senior in infrastructure and automation.';
    if (topic.includes('Frontend')) return 'Master the art of building beautiful and responsive user interfaces.';
    if (topic.includes('Backend')) return 'Deep dive into server-side logic, databases, and scalable architectures.';
    if (topic.includes('AI')) return 'Learn to build intelligent applications using machine learning and LLMs.';
    return `Step-by-step project ideas to master ${topic} from the ground up.`;
  };

  return (
    <div className="min-h-screen bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Voltar
          </button>

          <div className="flex items-center gap-2"> 
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-semibold text-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Agendar consultoria
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#FACC15] hover:bg-[#EAB308] text-slate-900 rounded-md font-bold text-sm transition-colors shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Comprar guia prático
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#FACC15] hover:bg-[#EAB308] text-slate-900 rounded-md font-bold text-sm transition-colors shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              Partilhar
            </button>
          </div>
        </div>

        {/* Title Section */}
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {title} {activeTab === 'Projectos' ? 'Projects' : 'Guide'}
          </h1>
          <p className="text-slate-500 text-lg max-w-3xl">
            {getTopicDescription(title)}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-slate-200 mb-8">

          <div className="flex gap-8">
            {(['Roadmap', 'Projectos', 'Apostila'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex items-center gap-2 pb-4 text-sm font-semibold transition-all relative ${ activeTab === tab ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-600' }`} >
                {tab === 'Roadmap' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="9" y1="6" x2="15" y2="6"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="15" y2="14"/></svg>}
                {tab === 'Projectos' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10h10V2z"/><path d="M22 2h-10v10h10V2z"/><path d="M12 12H2v10h10V12z"/><path d="M22 12h-10v10h10V12z"/></svg>}
                {tab === 'Apostila' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>}
                {tab}
              </button>
            ))}
          </div>

        </div>

        {activeTab === 'Projectos' ? (
          <>
            {/* Level Filters */}
            <div className="flex gap-2 mb-8">
              {(['Junior', 'Pleno', 'Senior'] as Difficulty[]).map((level) => (
                <button key={level} onClick={() => setActiveLevel(level)} className={`px-5 py-2 rounded-md text-sm font-semibold border transition-all ${ activeLevel === level 
                      ? 'bg-white border-slate-900 text-slate-900 shadow-sm' 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700' }`} >
                  {level}
                </button>
              ))}
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectGridCard key={project.id} project={project} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-xl">
                  <p className="text-slate-400 font-medium">No projects available for this level yet.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="py-20 text-center bg-slate-50 rounded-xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-2">{activeTab} coming soon!</h2>
            <p className="text-slate-500">We are currently preparing high-quality content for the {activeTab} section of {title}.</p>
          </div>
        )}
      </div>
    </div>
  );
};
