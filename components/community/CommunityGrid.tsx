"use client";

import React, { useMemo } from 'react';
import { CommunityCard } from '@/components/community/CommunityCard';
import { mockCommunities } from '@/data/dataCommunity';
import type { FilterTab } from '@/components/CountryFilter';
import type { Community } from '@/data/types';

interface CommunityGridProps {
  selectedCountry: FilterTab;
  searchQuery?: string;
  extraCommunities?: Community[];
}

export const CommunityGrid: React.FC<CommunityGridProps> = ({
  selectedCountry,
  searchQuery = "",
  extraCommunities = [],
}) => {
  const filteredCommunities = useMemo(() => {
    const allCommunities = [...extraCommunities, ...mockCommunities];
    return allCommunities.filter(community => {
      if (selectedCountry !== "Todos") {
        const matchesCountry = community.country === selectedCountry;
        if (!matchesCountry) return false;
      }

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      const matchesName = community.name?.toLowerCase().includes(query) || false;
      const matchesCategory = community.category?.toLowerCase().includes(query) || false;
      const matchesTags = community.tags?.some(tag => tag.toLowerCase().includes(query)) || false;
      const matchesDescription = community.description?.toLowerCase().includes(query) || false;

      return matchesName || matchesCategory || matchesTags || matchesDescription;
    });
  }, [selectedCountry, searchQuery, extraCommunities]);

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
