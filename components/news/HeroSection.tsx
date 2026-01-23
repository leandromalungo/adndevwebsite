
import React from 'react';
import { Post } from '../types';

interface HeroSectionProps {
  featuredPost: Post;
  sidebarPosts: Post[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ featuredPost, sidebarPosts }) => {
  return (
    <div className="container mx-auto px-4 md:px-12 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Featured Post with Video Background */}
        <div className="lg:col-span-2 relative h-[500px] md:h-[600px] rounded-xl overflow-hidden group cursor-pointer shadow-xl">
          {/* Video Background */}
          {featuredPost.videoUrl && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105"
            >
              <source src={featuredPost.videoUrl} type="video/mp4" />
            </video>
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20 w-full lg:w-3/4">
            <span 
              className="inline-block px-3 py-1 rounded text-[11px] font-bold text-white uppercase tracking-wider mb-4"
              style={{ backgroundColor: featuredPost.categoryColor }}
            >
              {featuredPost.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 group-hover:text-blue-200 transition-colors">
              {featuredPost.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-300 text-xs font-medium">
              <span className="flex items-center">
                BY <span className="text-white ml-1 uppercase">{featuredPost.author}</span>
              </span>
              <span className="flex items-center">
                <i className="fa-regular fa-calendar mr-1"></i> {featuredPost.date}
              </span>
              <span className="flex items-center">
                <i className="fa-regular fa-comment mr-1"></i> {featuredPost.commentsCount} COMMENTS
              </span>
            </div>
          </div>

          {/* Floating Controls Placeholder */}
          <div className="absolute top-6 right-6 z-20 flex flex-col space-y-2">
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-full text-white hover:bg-white hover:text-blue-600 transition-all">
                <i className="fa-solid fa-play text-sm"></i>
            </div>
          </div>
        </div>

        {/* Sidebar Posts (Grid of 3) */}
        <div className="flex flex-col space-y-4">
          {sidebarPosts.map((post) => (
            <div key={post.id} className="flex space-x-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="relative w-32 h-24 md:w-40 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col justify-center flex-1">
                <span 
                  className="text-[10px] font-bold uppercase tracking-wider mb-2 block"
                  style={{ color: post.categoryColor }}
                >
                  {post.category}
                </span>
                <h3 className="text-sm md:text-base font-bold text-[#0e2a47] leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="mt-2 flex items-center space-x-3 text-[10px] text-gray-400 font-medium">
                  <span className="uppercase">BY {post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
