
import React from 'react';
import { VideoHeroProps } from '../types';

const VideoHero: React.FC<VideoHeroProps> = ({ 
  videoUrl, 
  fallbackImage = 'https://picsum.photos/1200/400?grayscale',
  overlayOpacity = 0.2,
  title,
  subtitle
}) => {
  return (
    <section className="relative w-full rounded-2xl overflow-hidden aspect-[21/9] md:aspect-[3/1] bg-gray-200">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={fallbackImage}
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black pointer-events-none" 
        style={{ opacity: overlayOpacity }}
      />

      {/* Content Overlay (Optional) */}
      {(title || subtitle) && (
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 z-10 text-center">
          {title && <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">{title}</h1>}
          {subtitle && <p className="text-lg md:text-xl font-light drop-shadow-md">{subtitle}</p>}
        </div>
      )}
    </section>
  );
};

export default VideoHero;
