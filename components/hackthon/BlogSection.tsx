
import React from 'react';

interface BlogPost {
  id: number;
  date: string;
  title: string;
  imageUrl: string;
}

interface BlogSectionProps {
  titlePrefix: string;
  titleHighlight: string;
  posts: BlogPost[];
  buttonText: string;
  buttonHref: string;
}

/**
 * BlogSection Component
 * 
 * Displays a curated list of blog posts in a responsive grid.
 * Features a specific card design with a grid-patterned image background
 * and a styled call-to-action button.
 */
export const BlogSection: React.FC<BlogSectionProps> = ({
  titlePrefix,
  titleHighlight,
  posts,
  buttonText,
  buttonHref,
}) => {
  return (
    <section className="w-full py-16 flex flex-col items-center">
      {/* Header */}
      <div className="w-full text-left mb-10">
        <h2 className="text-3xl md:text-5xl font-medium text-[#1a1a1a] tracking-tight">
          {titlePrefix} <span className="font-extrabold">{titleHighlight}</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {posts.map((post) => (
          <article key={post.id} className="group cursor-pointer flex flex-col">
            {/* Image Container with Grid Pattern */}
            <div 
              className="relative aspect-[1.4/1] w-full rounded-2xl overflow-hidden mb-4 bg-[#121212]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px'
              }}
            >
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-contain p-8 transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <time className="text-xs md:text-sm text-gray-500 font-medium">
                {post.date}
              </time>
              <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] leading-tight group-hover:text-gray-700 transition-colors">
                {post.title}
              </h3>
            </div>
          </article>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-16">
        <a
          href={buttonHref}
          className="flex items-center gap-2 px-8 py-4 bg-[#2b2b2b] text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          {buttonText}
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
};
