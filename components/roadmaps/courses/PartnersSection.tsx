
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PartnerItem {
  name: string;
  logoColor?: string;
  logoInitial?: string;
  logoUrl?: string;
}

interface PartnerColumnProps {
  title: string;
  items: PartnerItem[];
  buttonText: string;
  isTwoColumn?: boolean;
}

const PartnerItemRow: React.FC<{ item: PartnerItem }> = ({ item }) => (
  <div className="flex items-center gap-3 py-2 group cursor-pointer">
    <div className={`w-10 h-10 shrink-0 flex items-center justify-center rounded border border-gray-100 bg-white shadow-sm group-hover:shadow transition-shadow overflow-hidden`}>
      {item.logoUrl ? (
        <img src={item.logoUrl} alt={item.name} className="w-8 h-8 object-contain" />
      ) : (
        <span className={`text-xs font-bold ${item.logoColor || 'text-gray-400'}`}>
          {item.logoInitial || item.name.charAt(0)}
        </span>
      )}
    </div>
    <span className="text-sm font-medium text-[#002D2D] group-hover:text-blue-600 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
      {item.name}
    </span>
  </div>
);

const PartnerColumn: React.FC<PartnerColumnProps> = ({ title, items, buttonText, isTwoColumn }) => (
  <div className="flex flex-col h-full px-6">
    <h3 className="text-xl font-extrabold text-[#002D2D] mb-8">{title}</h3>
    <div className={`grow grid ${isTwoColumn ? 'grid-cols-2 gap-x-4' : 'grid-cols-1'} gap-y-2`}>
      {items.map((item, idx) => (
        <PartnerItemRow key={idx} item={item} />
      ))}
    </div>
    <div className="mt-10">
      <button className="inline-flex items-center gap-2 bg-[#E0E7FF] text-[#4338CA] font-bold py-2.5 px-6 rounded-lg hover:bg-indigo-200 transition-colors text-sm">
        {buttonText}
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export const PartnersSection = () => {
  const universities: PartnerItem[] = [
    { name: 'Harvard University', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield.svg' },
    { name: 'Yale University', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Yale_University_Shield.svg' },
    { name: 'IIT Kharagpur', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1c/IIT_Kharagpur_Logo.svg' },
    { name: 'MIT', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg' },
    { name: 'Rice University', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Rice_University_logo.svg' },
    { name: 'IIT Madras', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg' },
    { name: 'Columbia University', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/3/36/Columbia_University_shield.svg' },
    { name: 'Cornell University', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Cornell_University_seal.svg' },
    { name: 'U. of Edinburgh', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6c/University_of_Edinburgh_crest.svg' },
    { name: 'Purdue University', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Purdue_Boilermakers_logo.svg' },
    { name: 'U. of Pennsylvania', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/92/UPenn_shield_with_motto.svg' },
    { name: 'Duke University', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/0/04/Duke_University_seal.svg' },
    { name: 'U. of Michigan', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/University_of_Michigan_Logo.svg' },
    { name: 'The Open University', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Open_University_Logo.svg' },
  ];

  const providers: PartnerItem[] = [
    { name: 'Coursera', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-logo_small.svg' },
    { name: 'Udacity', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Udacity_logo.svg' },
    { name: 'AWS Skill Builder', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'LinkedIn Learning', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
    { name: 'Noble Desktop', logoUrl: 'https://www.nobledesktop.com/favicon.ico' },
    { name: 'freeCodeCamp', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/39/FreeCodeCamp_logo.png' },
    { name: 'Microsoft Learn', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  ];

  const institutions: PartnerItem[] = [
    { name: 'Google', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Amazon', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Microsoft', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'IBM', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
    { name: 'Smithsonian', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Smithsonian_Institution_Logo.svg' },
    { name: 'United Nations', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Logo_of_the_United_Nations.svg' },
    { name: 'NPTEL', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/db/NPTEL_Logo.png' },
  ];

  return (
    <section className="max-w-7xl mx-auto mt-20 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 divide-dashed">
        <PartnerColumn 
          title="1300+ Universities" 
          items={universities} 
          buttonText="Browse universities" 
          isTwoColumn 
        />
        <PartnerColumn 
          title="100 Providers" 
          items={providers} 
          buttonText="Browse providers" 
        />
        <PartnerColumn 
          title="1700+ Institutions" 
          items={institutions} 
          buttonText="Browse institutions" 
        />
      </div>
    </section>
  );
};
