"use client";

export const LogoCloud = () => {
  const logos = [
    { name: 'JavaScript', url: '/images/logos/js.png' },
    { name: 'Linux', url: '/images/logos/linux.png' },
    { name: 'Docker', url: '/images/logos/docker.png' },
    { name: 'C#', url: '/images/logos/csharp.png' },
    { name: 'Java', url: '/images/logos/java.png' },
    { name: 'GitHub', url: '/images/logos/github.png' },
    { name: 'Php', url: '/images/logos/php.png' },
    { name: 'html5', url: '/images/logos/hcj.png' },
    { name: 'python', url: '/images/logos/python.png' },
    { name: 'aws', url: '/images/logos/aws.png' },
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
                className="h-full w-auto opacity-60 hover:opacity-100 transition-opacity" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerText = logo.name;
                    parent.className = "text-gray-400 text-sm font-bold uppercase opacity-60 hover:opacity-100 transition-opacity cursor-default";
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
