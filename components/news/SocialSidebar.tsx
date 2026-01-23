
import React from 'react';

const SocialSidebar = () => {
  const stats = [
    { icon: 'fa-facebook-f', color: '#3b5998', label: 'Like', count: '30 k+' },
    { icon: 'fa-youtube', color: '#ff0000', label: 'Subscrib', count: '25 k+' },
    { icon: 'fa-twitter', color: '#1da1f2', label: 'Followers', count: '25 k+' },
    { icon: 'fa-pinterest-p', color: '#bd081c', label: 'Followers', count: '25 k+' },
    { icon: 'fa-instagram', color: '#e4405f', label: 'Followers', count: '25 k+' },
    { icon: 'fa-linkedin-in', color: '#0077b5', label: 'Followers', count: '17 k+' },
    { icon: 'fa-behance', color: '#1769ff', label: 'Followers', count: '30 k+' },
    { icon: 'fa-dribbble', color: '#ea4c89', label: 'Followers', count: '30 k+' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#0e2a47] font-black uppercase text-xs tracking-widest">Trending Stories</h3>
          <div className="bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded flex items-center space-x-1 cursor-pointer">
              <span className="font-bold">FOOD</span> <i className="fa-solid fa-chevron-down text-[7px]"></i>
          </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center py-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer border border-transparent hover:border-gray-200">
            <i className={`fa-brands ${stat.icon} mb-2`} style={{ color: stat.color }}></i>
            <span className="text-[10px] font-black text-[#0e2a47]">{stat.count}</span>
            <span className="text-[7px] text-gray-500 uppercase font-bold">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialSidebar;
