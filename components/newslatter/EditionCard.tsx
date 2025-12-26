
import React from 'react';
import Image from 'next/image';
import { MessageCircle, Bookmark, MoreHorizontal } from 'lucide-react';
import { Edition } from '../../data/types';

interface EditionCardProps {
  edition: Edition;
}

const EditionCard: React.FC<EditionCardProps> = ({ edition }) => {
  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-8">
      {/* Feed Header Inside Card */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex gap-4">
          <button className="text-base font-bold text-gray-900 border-b-2 border-blue-300 pb-1">Discover</button>
          <button className="text-base font-medium text-gray-400 hover:text-gray-600 transition-colors pb-1">Following</button>
        </div>
        <button className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[2/1] bg-gray-50 overflow-hidden group">
        <Image 
          src={edition.imageUrl} 
          alt={edition.title} 
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {edition.category && (
          <div className="absolute top-3 right-3">
             <span className="bg-[#4e80a6] text-[10px] font-black px-2.5 py-1 rounded-md text-gray-900 uppercase tracking-wider shadow-sm">
              {edition.category}
            </span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-5 md:p-6">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <Image 
            src={edition.authorImage} 
            alt={edition.author} 
            width={40}
            height={40}
            className="rounded-full border border-gray-100 object-cover" 
          />
          <div>
            <p className="text-sm font-bold text-gray-900 leading-none">{edition.author}</p>
            <p className="text-xs text-gray-400 mt-1">{edition.relativeTime}</p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight tracking-tight hover:text-yellow-600 cursor-pointer transition-colors">
          {edition.title}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {edition.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[11px] font-bold bg-gray-50 text-gray-500 rounded-full hover:bg-yellow-50 hover:text-yellow-700 transition-colors cursor-pointer uppercase tracking-wider"
            >
              #{tag.toLowerCase()}
            </span>
          ))}
        </div>

        {/* Engagement Bar */}
        <div className="flex items-center justify-between py-4 border-t border-gray-100">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
              <div className="flex items-center -space-x-1.5">
                <span className="w-6 h-6 flex items-center justify-center bg-white border border-gray-100 rounded-full text-xs shadow-sm">❤️</span>
                <span className="w-6 h-6 flex items-center justify-center bg-white border border-gray-100 rounded-full text-xs shadow-sm">🔥</span>
                <span className="w-6 h-6 flex items-center justify-center bg-white border border-gray-100 rounded-full text-xs shadow-sm">🦄</span>
              </div>
              <span className="font-bold ml-1">{edition.reactions} <span className="hidden sm:inline">Reações</span></span>
            </button>

            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="font-bold">{edition.commentsCount} <span className="hidden sm:inline">Comentários</span></span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{edition.readTime} min ler</span>
            <button className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
              <Bookmark className="w-5 h-5 text-gray-400 hover:text-yellow-500" />
            </button>
          </div>
        </div>

        {/* Top Comments Preview */}
        {edition.topComments && edition.topComments.length > 0 && (
          <div className="mt-4 space-y-4">
            {edition.topComments.map((comment, index) => (
              <div key={index} className="flex gap-3 p-4 bg-gray-50/50 rounded-xl border border-gray-100/50"> 
                <Image
                  src={comment.authorImage}
                  alt={comment.author}
                  width={32}
                  height={32}
                  className="rounded-full flex-shrink-0 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900">{comment.author}</span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold">{comment.timeAgo}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{comment.text}</p>
                </div>
              </div>
            ))}

            <button className="w-full text-center text-sm font-bold text-yellow-600 hover:text-yellow-700 pt-2 transition-colors">
              Ver todos os {edition.commentsCount} comentários
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default EditionCard;