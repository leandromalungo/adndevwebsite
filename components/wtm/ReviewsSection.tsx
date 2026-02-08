"use client";

import ReviewCard from "@/components/wtm/ReviewCard";

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Joseph Myers",
      school: "BrainStation",
      text: "Having now worked as a data scientist in industry for a few months, I can really appreciate how well the course content was aligned with the skills required ...",
      initials: "JM",
    },
    {
      name: "Aleyna Acar",
      school: "Le Wagon",
      text: "My experience at Le Wagon was incredible and enriching. I really appreciated the mutual support among students, the kindness and patience of the entire teach...",
      initials: "AA",
      iconColor: "bg-[#71d9d9]",
    },
    {
      name: "Michael Garber",
      school: "Springboard",
      text: "I signed up for Springboard's Data Science program and it was definitely the best career-related decision I've made in many years. I've had an interest in Da...",
      initials: "MG",
      iconColor: "bg-[#91e2b5]",
    },
    {
      name: "Brenda Salas",
      school: "Nucamp",
      text: "I decided to learn HTML and CSS to initiate my software development skills. I had a hard time finding a course I actually felt that I was advancing in, and I...",
      initials: "BS",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-4">
      {/* Left Content */}
      <div className="lg:col-span-5 space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2d3748] leading-[1.1]">
          60,000 bootcamp and course reviews
        </h2>
        <p className="text-[#4a5568] text-lg leading-relaxed max-w-md">
          We have bootcamps, short courses, and certification prep. Whether
          you’re changing careers or up-skilling in your current role, Course
          Report gives you the tools to compare programs and find the best
          fit—backed by thousands of verified student reviews.
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
