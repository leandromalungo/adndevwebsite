
import React from 'react';
import { Project } from '@/data/types';

interface ProjectGridCardProps {
  project: Project;
}

export const ProjectGridCard: React.FC<ProjectGridCardProps> = ({ project }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between h-full hover:shadow-md transition-shadow cursor-pointer group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            {project.difficulty}
          </span>
          <span className="text-slate-400 text-[11px] font-medium px-2 py-0.5 bg-slate-50 border border-slate-100 rounded">
            {project.tag}
          </span>
        </div>
        
        <h3 className="text-slate-900 font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      <div className="flex items-center gap-1.5 text-slate-400 text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <span>{project.startedCount}</span>
      </div>
    </div>
  );
};
