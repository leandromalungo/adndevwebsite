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

export const CourseSection = () => {
  return (
    <div className="w-full bg-[#ffffff] py-16 px-4 border-y border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x md:divide-dashed md:divide-blue-200">
        {/* Universities Column */}
        <div className="flex flex-col">
          <SectionTitle>Quem promove os cursos?</SectionTitle>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <CourseItem
              logo="H"
              name="Harvard University"
              color="bg-red-800 text-white"
            />
            <CourseItem
              logo="Y"
              name="Yale University"
              color="bg-blue-900 text-white"
            />
            <CourseItem
              logo="IIT"
              name="IIT Kharagpur"
              color="bg-indigo-100"
            />
            <CourseItem logo="MIT" name="MIT" color="bg-gray-900 text-white" />
            <CourseItem
              logo="R"
              name="Rice University"
              color="bg-blue-800 text-white"
            />
            <CourseItem logo="M" name="IIT Madras" color="bg-orange-100" />
            <CourseItem
              logo="C"
              name="Columbia University"
              color="bg-blue-50"
            />
            <CourseItem
              logo="CU"
              name="Cornell University"
              color="bg-red-50"
            />
            <CourseItem
              logo="E"
              name="U. of Edinburgh"
              color="bg-blue-900 text-white"
            />
            <CourseItem
              logo="P"
              name="Purdue University"
              color="bg-yellow-100"
            />
            <CourseItem
              logo="UP"
              name="U. of Pennsylvania"
              color="bg-red-100"
            />
            <CourseItem
              logo="D"
              name="Duke University"
              color="bg-blue-950 text-white"
            />
            <CourseItem
              logo="M"
              name="U. of Michigan"
              color="bg-blue-900 text-white"
            />
            <CourseItem
              logo="O"
              name="The Open University"
              color="bg-blue-600 text-white"
            />
          </div>
        </div>

        {/* Providers Column */}
        <div className="flex flex-col md:pl-8">
          <SectionTitle>Plataformas</SectionTitle>
          <div className="flex flex-col gap-1">
            <CourseItem
              logo="C"
              name="Coursera"
              color="bg-blue-600 text-white"
            />
            <CourseItem
              logo="U"
              name="Udacity"
              color="bg-blue-700 text-white"
            />
            <CourseItem
              logo="in"
              name="LinkedIn Learning"
              color="bg-blue-500 text-white"
            />
            <CourseItem
              logo="N"
              name="Noble Desktop"
              color="bg-black text-white"
            />
            <CourseItem
              logo="fcc"
              name="freeCodeCamp"
              color="bg-gray-950 text-white"
            />
            <CourseItem logo="CS" name="CodeSignal" color="bg-blue-100" />
            <CourseItem logo="B" name="Boot.dev" color="bg-amber-100" />
          </div>
        </div>

        {/* Institutions Column */}
        <div className="flex flex-col md:pl-8">
          <SectionTitle>Big tech</SectionTitle>
          <div className="flex flex-col gap-1">
            <CourseItem logo="G" name="Google" color="bg-white" />
            <CourseItem logo="a" name="Amazon" color="bg-black text-white" />
            <CourseItem logo="MS" name="Microsoft" color="bg-white" />
            <CourseItem logo="IBM" name="IBM" color="bg-blue-50" />
            <CourseItem
              logo="S"
              name="Smithsonian"
              color="bg-blue-400 text-white"
            />
            <CourseItem logo="UN" name="United Nations" color="bg-sky-100" />
            <CourseItem logo="N" name="NPTEL" color="bg-orange-50" />
            
          </div>

           <div className="flex flex-col gap-1">
            <CourseItem logo="G" name="Google" color="bg-white" />
            <CourseItem logo="a" name="Amazon" color="bg-black text-white" />
            <CourseItem logo="MS" name="Microsoft" color="bg-white" />
            <CourseItem logo="IBM" name="IBM" color="bg-blue-50" />
            <CourseItem
              logo="S"
              name="Smithsonian"
              color="bg-blue-400 text-white"
            />
            <CourseItem logo="UN" name="United Nations" color="bg-sky-100" />
            <CourseItem logo="N" name="NPTEL" color="bg-orange-50" />
            
          </div>
          
        </div>
      </div>
    </div>
  );
};
