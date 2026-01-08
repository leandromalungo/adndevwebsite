"use client";

export const LogoCloud = () => {
  const logos = [
    { name: 'JavaScript', url: '../../public/images/1.png' },
    { name: 'Linux', url: '../../public/images/' },
    { name: 'Docker', url: '../../public/images/' },
    { name: 'C#', url: '../../public/images/' },
    { name: 'Java', url: '../../public/images/' },
    { name: 'GitHub', url: '../../public/images/' },
    { name: 'Php', url: '../../public/images/' },
    { name: 'html5', url: '../../public/images/' },
    { name: 'Css3', url: '../../public/images/' },
  ];

  return (
    <div className="relative z-20 w-full px-6 pb-10 max-w-[1400px] mx-auto">
      {/* Container justified to center */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
        {/* Label */}
        <div className="flex-shrink-0">
          <p className="text-[#8e9aaf] text-[14px] font-medium whitespace-nowrap">
            Stacks do momento:
          </p>
        </div>

        {/* Logos Container justified to center */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-10">
          {logos.map((logo) => (
            <div 
              key={logo.name} 
              className="h-5 md:h-6 flex items-center transition-opacity duration-300"
            >
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="h-full w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
