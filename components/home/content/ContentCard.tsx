
import React from 'react';

interface ContentCardProps {
  tag: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  backgroundImage: string;
  variant: 'large' | 'small';
  showPlayButton?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({
  tag,
  title,
  description,
  linkText,
  linkHref,
  backgroundImage,
  variant,
  showPlayButton,
}) => {
  return (
    <div 
      className={`group relative rounded overflow-hidden flex flex-col justify-end p-6 md:p-8 transition-all duration-500 hover:shadow-2xl h-full ${
        variant === 'large' ? 'min-h-[500px] md:min-h-[600px]' : 'min-h-[280px]'
      }`}
    >
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

      {/* Content */}
      <div className="relative z-10 space-y-4">
        {/* Tag */}
        <div className="inline-block bg-violet-600 px-4 py-1.5 rounded">
          <span className="text-white text-xs font-bold tracking-wider uppercase">
            {tag}
          </span>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h3 className={`font-extrabold text-white leading-tight uppercase ${variant === 'large' ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
            {title}
          </h3>
          <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-sm">
            {description}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex flex-col gap-4">
          {linkText && (
            <div className="flex items-center gap-3 group/link">
              {showPlayButton && (
                <div className="w-8 h-8 rounded-full bg-[#71f291] flex items-center justify-center transition-transform group-hover/link:scale-110">
                  <svg className="w-4 h-4 text-black fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
              <a 
                href={linkHref} 
                className="text-white text-sm md:text-base font-bold underline underline-offset-4 decoration-1 hover:decoration-2 transition-all"
              >
                {linkText}
              </a>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

const SocialIcon = ({ icon }: { icon: string }) => {
  // Simple icon placeholders for demonstration
  const icons: Record<string, React.ReactNode> = {
    youtube: (
      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5 stroke-white fill-none stroke-2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    tiktok: (
      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31 0 2.568.172 3.756.497.042.115.068.236.068.363v4.29a7.35 7.35 0 0 1-2.617-.48v12c0 3.72-3.013 6.732-6.733 6.732-3.72 0-6.732-3.012-6.732-6.732 0-3.72 3.012-6.732 6.732-6.732.188 0 .373.007.555.022v4.404a2.32 2.32 0 0 0-.555-.067c-1.282 0-2.32 1.039-2.32 2.321s1.038 2.32 2.32 2.32c1.283 0 2.321-1.039 2.321-2.321V0h3.205z"/>
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    )
  };
  return <a href="#" className="hover:opacity-70 transition-opacity">{icons[icon]}</a>;
};

export default ContentCard;
