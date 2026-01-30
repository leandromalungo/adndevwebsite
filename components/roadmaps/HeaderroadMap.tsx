import React from 'react';

export const RoadmapDetailView = ({ title, onBack }: { title?: string; onBack: () => void }) => {
  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <button onClick={onBack} className="mb-4 underline">◀ Voltar</button>
      <h1 className="text-2xl font-bold mb-2">{title ?? 'Detalhes do Roadmap'}</h1>
      <p className="text-sm text-slate-600">Conteúdo do roadmap (stub).</p>
    </div>
  );
};
