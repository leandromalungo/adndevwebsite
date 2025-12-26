import React, { FC } from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ current, total }) => {
  const safeTotal = total > 0 ? total : 1; // evita divisão por zero
  const percentage = Math.min(Math.max((current / safeTotal) * 100, 0), 100); // garante entre 0 e 100

  return (
    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
