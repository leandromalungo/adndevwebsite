
import React from 'react';
import { Post } from '@/data/types';
import ArticleCard from './ArticleCard';

interface ArticleGridProps {
  posts: Post[];
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ posts }) => {
  return (
    <section className="container mx-auto px-4 md:px-12 py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-black text-[#0e2a47] mb-4">
            Explore Our Latest <span className="relative">Articles
              <span className="absolute bottom-1 left-0 w-full h-2 bg-[#26a69a]/30 -z-10"></span>
            </span>
          </h2>
        </div>
        <p className="text-gray-500 text-sm md:text-base max-w-md md:text-right">
          Lorem ipsum dolor sit amet, consecte turin ole adip iscing vipu dalit elit taras tellus neul sarat tame lat macorper del materio mattis luco.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>

      {/* Bottom Action */}
      <div className="mt-16 flex justify-center">
        <button className="bg-[#1f2937] text-white px-8 py-3 rounded-md font-bold text-sm tracking-wider hover:bg-black transition-all shadow-lg active:scale-95">
          View all articles
        </button>
      </div>
    </section>
  );
};

export default ArticleGrid;
