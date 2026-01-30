import React from 'react';

// Versão mínima do card para impedir erro de importação
export const RoadMapCard = ({ item }: { item: any }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{item.title ?? 'Roadmap'}</h3>
      {item.description && <p className="text-sm text-slate-500">{item.description}</p>}
    </div>
  );
};
