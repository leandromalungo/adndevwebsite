"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#111827] py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group transition-colors"
      >
        <span className="text-[#111827] font-semibold text-lg md:text-xl leading-snug pr-4">
          {question}
        </span>
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-[#111827]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#111827]" />
          )}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-[#374151] text-base md:text-lg leading-relaxed pb-2">
          {answer}
        </p>
      </div>
    </div>
  );
};

export const FAQSection: React.FC = () => {
  const faqData = [
    {
      question: "What is Scholarships.com?",
      answer: "Scholarships.com is a free college scholarship search and financial aid information resource. We help students find the money they need to pay for college by matching them with relevant scholarship opportunities."
    },
    {
      question: "How does Scholarships.com stand out from other scholarship platforms?",
      answer: "We have one of the largest and most up-to-date databases of scholarship opportunities. Our matching algorithm is highly refined to ensure you only see scholarships you're actually eligible for, saving you time and effort."
    },
    {
      question: "Do I need to create an account to view scholarships on Scholarships.com?",
      answer: "While you can browse some categories publicly, creating a free account allows us to match you with thousands of specific scholarships based on your profile, grades, interests, and background."
    },
    {
      question: "Is Scholarships.com completely free?",
      answer: "Yes, our service is 100% free for students and parents. We believe that access to education should be available to everyone, regardless of their financial situation."
    },
    {
      question: "Are the scholarships on Scholarships.com legitimate?",
      answer: "Absolutely. Our team manually vets and verifies every scholarship listing in our database to protect our users from scams and ensure the opportunities are current and valid."
    },
    {
      question: "How can I get help with a scholarship question?",
      answer: "You can reach out to our support team through our contact page, or browse our extensive resources and advice section where we cover common questions about applications, essays, and more."
    }
  ];

  // Split data into two columns for desktop
  const leftColumn = faqData.filter((_, i) => i % 2 === 0);
  const rightColumn = faqData.filter((_, i) => i % 2 !== 0);

  return (
    <section className="bg-[#e0f7f6] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-[#111827] mb-12">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-0 items-start">
          {/* Left Column */}
          <div className="flex flex-col">
            {leftColumn.map((item, idx) => (
              <FAQItem key={idx} question={item.question} answer={item.answer} />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            {rightColumn.map((item, idx) => (
              <FAQItem key={idx} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
