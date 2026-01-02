
import React from 'react';

interface FeatureSectionProps {
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

/**
 * FeatureSection Component
 * 
 * A clean, responsive feature block featuring a title, description,
 * bulleted list, and a high-fidelity image or screenshot.
 */
export const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  description,
  features,
  imageSrc,
  imageAlt,
  reverse = false,
}) => {
  return (
    <section className={`flex flex-col md:flex-row items-center gap-10 lg:gap-20 py-16 ${reverse ? 'md:flex-row-reverse' : ''}`}>
      {/* Text Content */}
      <div className="flex-1 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
          {title}
        </h2>
        
        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
          {description}
        </p>
        
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-gray-600 text-lg">
              <span className="mr-3 mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Image Content */}
      <div className="flex-1 w-full">
        <div className="relative rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-500">
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="w-full h-auto object-cover block"
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
        </div>
      </div>
    </section>
  );
};
