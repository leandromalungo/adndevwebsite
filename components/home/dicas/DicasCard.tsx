"use client";

import Link from 'next/link';

interface DicasCardProps {
  title: string;
  link: string;
  readTime?: string;
  image?: string;
}

const DicasCard: React.FC<DicasCardProps> = ({ title, link, readTime }) => {
  return (
    <Link 
      href={link}
      className="flex items-center gap-4 p-4 border border-gray-100 rounded shadow-sm hover:shadow-md transition-shadow group bg-white h-full"
    >

      {/* Text Content */}
      <div className="flex flex-col justify-center overflow-hidden flex-1">
        <h3 className="text-[#1a202c] font-semibold text-sm md:text-base text-center leading-snug group-hover:text-[#440bd6] transition-colors line-clamp-2 mb-1">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-[11px] md:text-xs text-gray-500 whitespace-nowrap">
          {readTime && <span>{readTime}</span>}
        </div>
      </div>
    </Link>
  );
};

export default DicasCard;
