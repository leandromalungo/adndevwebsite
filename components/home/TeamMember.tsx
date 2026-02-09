
import { useState, useMemo } from 'react';
import { ALUMNI_ROLES } from '@/data/mockRoles';
import RoleCard from '@/components/home/RoleCard';

const TeamMember = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(2);

  const filteredRoles = useMemo(() => {
    if (!searchTerm.trim()) return ALUMNI_ROLES;
    const lowerSearch = searchTerm.toLowerCase();
    return ALUMNI_ROLES.filter(role => 
      role.name.toLowerCase().includes(lowerSearch) ||
      role.newRole.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm]);

  const visibleRoles = filteredRoles.slice(0, visibleCount);

  return (
    <div className="min-h-screen py-16 px-6 lg:px-20 max-w-[1400px] mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-start justify-between mb-16 gap-8">
        <div className="max-w-4xl">
          <h1 className="text-2xl md:text-[3rem] text-[#1a1a1a] leading-[1.1] tracking-tight">
            Yes, you can do it: 80% of our alumni had <span className="font-extrabold underline decoration-[#1a1a1a]/10 underline-offset-8">zero tech background.</span>
          </h1>
        </div>
        
        <div className="md:pt-4">
          <button className="bg-[#1a1a1a] text-white px-8 py-5 rounded-2xl font-bold text-sm flex items-center gap-3 hover:bg-black transition-all shadow-lg active:scale-95 whitespace-nowrap">
            Apoir o projecto
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {visibleRoles.map((role, index) => (
          <RoleCard key={role.id} role={role} isFirst={index === 0} />
        ))}
      </div>

    </div>
  );
};

export default TeamMember;
