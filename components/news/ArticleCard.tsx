
import React from 'react';
import { Post } from '../types';

interface ArticleCardProps {
  post: Post;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  return (
    <div className="group cursor-pointer bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={post.imageUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#0e2a47] leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <div className="flex items-center text-gray-400 text-sm mb-4">
          <i className="fa-regular fa-calendar mr-2"></i>
          <span>{post.date}</span>
        </div>
        
        <div className="flex items-center text-[#0e2a47] font-bold text-sm group/link">
          <span className="mr-2">Read More</span>
          <i className="fa-solid fa-arrow-right transition-transform group-hover/link:translate-x-1"></i>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
