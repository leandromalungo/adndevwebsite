
import React from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface ServicesSectionProps {
  services: Service[];
}

/**
 * ServicesSection Component
 * 
 * A clean grid of service cards designed to match the provided image.
 * Features rounded corners, subtle shadows, and thematic images.
 */
export const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    <section className="w-full py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 group"
          >
            {/* Image Container */}
            <div className="aspect-[16/9] overflow-hidden">
              <img 
                src={service.imageUrl} 
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content Area */}
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              
              <a 
                href={service.link}
                className="text-blue-500 text-xs font-bold tracking-widest uppercase flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                Read More
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
