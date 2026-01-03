"use client";

import React from 'react';
import { CommunityCard } from '@/components/community/CommunityCard';
import { mockCommunities } from '@/data/dataCommunity';

export const CommunityGrid: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockCommunities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
};
