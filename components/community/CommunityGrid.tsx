"use client";

import React, { useMemo } from 'react';
import { CommunityCard } from '@/components/community/CommunityCard';
import { mockCommunities } from '@/data/dataCommunity';
import type { FilterTab } from '@/components/CountryFilter';

interface CommunityGridProps {
  selectedCountry: FilterTab;
}

export const CommunityGrid: React.FC<CommunityGridProps> = ({ selectedCountry }) => {
  const filteredCommunities = useMemo(() => {
    return mockCommunities.filter(community => community.country === selectedCountry);
  }, [selectedCountry]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {filteredCommunities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Nenhuma comunidade encontrada em {selectedCountry}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCommunities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      )}
    </div>
  );
};
