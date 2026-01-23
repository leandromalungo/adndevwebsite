
import React from 'react';
import { Post } from '@/data/types';

interface DarkHeroProps {
  mainPost: Post;
  sidePosts: Post[];
}

const DarkHero: React.FC<DarkHeroProps> = ({ mainPost, sidePosts }) => {
  return (
    <section className="bg-white text-[#0e2a47] py-12 border-b border-gray-50">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Featured (Left) */}
          <div className="lg:col-span-8 relative rounded-xl overflow-hidden group h-[500px] md:h-[650px] shadow-lg">
            <img 
              src={mainPost.imageUrl} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt={mainPost.title} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
              <span className="bg-[#e91e63] text-white text-[10px] font-bold px-3 py-1 rounded uppercase mb-4 inline-block">
                {mainPost.category}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 group-hover:text-[#00cba9] transition-colors">
                {mainPost.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-200">
                <span className="uppercase font-bold">By {mainPost.author}</span>
                <span className="flex items-center font-bold"><i className="fa-regular fa-calendar mr-2"></i> {mainPost.date}</span>
                <span className="flex items-center font-bold"><i className="fa-regular fa-comment mr-2"></i> {mainPost.commentsCount} COMMENT</span>
              </div>
            </div>
          </div>

          {/* Side List (Right) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            {sidePosts.map((post) => (
              <div key={post.id} className="flex space-x-4 group cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100">
                  <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={post.title} />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[#00cba9] text-[9px] font-black uppercase tracking-widest mb-1">{post.category}</span>
                  <h4 className="text-sm font-bold leading-snug text-[#0e2a47] group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <span className="text-[10px] text-gray-400 mt-2 flex items-center font-bold">
                    <i className="fa-regular fa-calendar mr-1"></i> {post.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Split Section from image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12 border-t border-gray-100 pt-12">
            {/* Trip To Iqaluit block */}
            <div className="group cursor-pointer">
                <div className="aspect-video rounded-xl overflow-hidden mb-4 shadow-sm">
                    <img src="https://images.unsplash.com/photo-1517511620798-cec17d428bc0?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="trip" />
                </div>
                <span className="bg-[#00bcd4] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">Travel</span>
                <h3 className="text-xl font-bold mt-3 text-[#0e2a47] group-hover:text-[#00bcd4] transition-colors">Trip To Iqaluit In Nunavut A Canadian Arctic Nice City..</h3>
                <div className="mt-2 flex items-center space-x-4 text-[10px] text-gray-400 font-bold uppercase">
                    <span>By David</span>
                    <span>July 07, 2022</span>
                    <span>0 Comments</span>
                </div>
            </div>
            {/* Smarter Food Choices block */}
            <div className="group cursor-pointer">
                <div className="aspect-video rounded-xl overflow-hidden mb-4 shadow-sm">
                    <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="food" />
                </div>
                <span className="bg-[#ff9800] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">Food</span>
                <h3 className="text-xl font-bold mt-3 text-[#0e2a47] group-hover:text-[#ff9800] transition-colors">Smarter Food Choices 101 Tips For The Busy Women</h3>
                <div className="mt-2 flex items-center space-x-4 text-[10px] text-gray-400 font-bold uppercase">
                    <span>By David</span>
                    <span>July 07, 2022</span>
                    <span>0 Comments</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default DarkHero;
