import React from 'react'

type TechBarProps = {
  tech: string
  count: number
  max: number
}

export default function TechBar({ tech, count, max }: TechBarProps) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0
  return (
    <div className="flex items-center gap-3">
      <div className="w-32 text-sm text-gray-700">{tech}</div>
      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
        <div className="h-3 bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <div className="w-10 text-right text-sm text-gray-600">{count}</div>
    </div>
  )
}
