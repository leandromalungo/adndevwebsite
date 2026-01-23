import React from 'react';
import { VideoHeroProps } from '@/data/types';

const VideoHero: React.FC<VideoHeroProps> = ({
  videoUrl,
  fallbackImage = 'https://picsum.photos/1200/400?grayscale',
  overlayOpacity = 0.2,
  title,
  subtitle
}) => {
  return (
    <section
      className="
        relative w-full overflow-hidden rounded-2xl
        aspect-[16/9] md:aspect-[3/1]
        min-h-[280px] sm:min-h-[360px]
        bg-gray-200
      "
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={fallbackImage}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content Overlay */}
      {(title || subtitle) && (
        <div
          className="
            absolute inset-0 z-10
            flex flex-col items-center justify-center
            text-center text-white
            px-4
          "
        >
          {title && (
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl font-light drop-shadow-md">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default VideoHero;
