"use client";

import ReviewCard from "@/components/wtm/ReviewCard";
import { FilterTab } from "@/components/CountryFilter";
import { COUNTRY_DATA } from "@/components/wtm/constants";


interface ReviewsSectionProps {
  selectedCountry: FilterTab;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ selectedCountry }) => {
  const reviews = COUNTRY_DATA[selectedCountry]?.reviews || COUNTRY_DATA["Angola"].reviews;
  
  // Dynamic text based on country
  const title = selectedCountry === "Angola" ? "60,000 bootcamp and course reviews" : `Avaliações de cursos no ${selectedCountry}`;
  const description = selectedCountry === "Angola" 
    ? "We have bootcamps, short courses, and certification prep. Whether you’re changing careers or up-skilling in your current role, Course Report gives you the tools to compare programs and find the best fit—backed by thousands of verified student reviews."
    : `Temos bootcamps, cursos de curta duração e preparação para certificações. Quer esteja a mudar de carreira ou a aperfeiçoar-se na sua função atual, o Course Report em ${selectedCountry} dá-lhe as ferramentas para comparar programas e encontrar o que melhor se adapta a si.`;

  return (
    <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-4 mt-12">
      {/* Left Content */}
      <div className="lg:col-span-5 space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2d3748] leading-[1.1]">
          {title}
        </h2>
        <p className="text-[#4a5568] text-lg leading-relaxed max-w-md">
          {description}
        </p>
        <button className="bg-[#1a73e8] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded transition-colors shadow-sm">
          ASSINAR AGORA
        </button>

      </div>


      {/* Right Content - Review Cards Grid */}
      <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
