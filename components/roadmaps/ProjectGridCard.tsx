
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
          <span className="bg-blue-900 text-gray-100 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            {project.difficulty}
          </span>
        </div>
        
        <h3 className="text-slate-900 font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

    </div>
  );
};
