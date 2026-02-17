"use client";

import React from "react";

interface CourseItemProps {
  logo: string | React.ReactNode;
  name: string;
  color?: string;
}

const CourseItem: React.FC<CourseItemProps> = ({
  logo,
  name,
  color = "bg-gray-100",
}) => (
  <div className="flex items-center gap-3 py-2 px-1 hover:bg-gray-50 rounded transition-colors cursor-default group">
    <div
      className={`w-10 h-10 flex-shrink-0 rounded flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm ${color}`}
    >
      {typeof logo === "string" ? (
        <span className="text-xs font-bold text-gray-600">{logo}</span>
      ) : (
        logo
      )}
    </div>
    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-800 transition-colors truncate">
      {name}
    </span>
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h2 className="text-xl font-extrabold text-[#2d2d2d] mb-8 px-2 tracking-tight">
    {children}
  </h2>
);

import { FilterTab } from "@/components/CountryFilter";
import { COUNTRY_DATA } from "@/components/wtm/constants";

interface ProgramsProps {
  selectedCountry: FilterTab;
}

export const Programs: React.FC<ProgramsProps> = ({ selectedCountry }) => {
  const data = COUNTRY_DATA[selectedCountry]?.programs || COUNTRY_DATA["Angola"].programs;

  return (
    <div className="w-full bg-[#ffffff] py-16 px-4 border-y border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x md:divide-dashed md:divide-blue-200">
        {/* Universities Column */}
        <div className="flex flex-col">
          <SectionTitle>Quem promove os cursos?</SectionTitle>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {data.universities.map((item, idx) => (
              <CourseItem
                key={idx}
                logo={item.logo}
                name={item.name}
                color={item.color}
              />
            ))}
          </div>
        </div>

        {/* Providers Column */}
        <div className="flex flex-col md:pl-8">
          <SectionTitle>Plataformas</SectionTitle>
          <div className="flex flex-col gap-1">
            {data.platforms.map((item, idx) => (
              <CourseItem
                key={idx}
                logo={item.logo}
                name={item.name}
                color={item.color}
              />
            ))}
          </div>
        </div>

        {/* Institutions Column */}
        <div className="flex flex-col md:pl-8">
          <SectionTitle>Big tech</SectionTitle>

          <div className="flex flex-row gap-8">
            <div className="flex flex-col gap-1">
              {data.bigTech.slice(0, Math.ceil(data.bigTech.length / 2)).map((item, idx) => (
                <CourseItem key={idx} logo={item.logo} name={item.name} color={item.color} />
              ))}
            </div>
            <div className="flex flex-col gap-1">
              {data.bigTech.slice(Math.ceil(data.bigTech.length / 2)).map((item, idx) => (
                <CourseItem key={idx} logo={item.logo} name={item.name} color={item.color} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

