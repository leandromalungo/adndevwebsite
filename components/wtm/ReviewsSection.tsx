"use client";

import ReviewCard from "@/components/wtm/ReviewCard";
import { FilterTab } from "@/components/CountryFilter";
import { dataBootcamp } from "@/data/dataBootcamp";
import { useGoogleSignup } from "@/hooks/useGoogleSignup";
import { Loader2 } from "lucide-react";


interface ReviewsSectionProps {
  selectedCountry: FilterTab;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ selectedCountry }) => {
  const { triggerGoogleSignup, loading } = useGoogleSignup();

  // Dynamic text based on country
  const title = `Bootcamps conhecidos em ${selectedCountry}`;
  const description = `Conheça alguns dos bootcamps mais renomados e reconhecidos. Estes programas oferecem formação intensiva, apoio de carreira e conexões com a indústria tecnológica. Encontre o bootcamp perfeito para impulsionar sua carreira em tecnologia.`;

  return (
    <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-4 mt-12">
      {/* Left Content */}
      <div className="lg:col-span-5 space-y-6">
        <h2 className="text-4xl md:text-3xl font-bold text-[#2d3748] leading-[1.1]">
          {title}
        </h2>
        <p className="text-[#4a5568] text-md leading-relaxed max-w-md">
          {description}
        </p>
        <button
          onClick={triggerGoogleSignup}
          disabled={loading}
          className="flex items-center gap-2 bg-rose-400 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {loading ? "Processando..." : "Inscrever-se no portal"}
        </button>

      </div>


      {/* Right Content - Bootcamp Cards Grid */}
      <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
        {dataBootcamp
          .filter((bootcamp) => bootcamp.country === selectedCountry)
          .map((bootcamp) => (
            <ReviewCard key={bootcamp.id} bootcamp={bootcamp} />
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
