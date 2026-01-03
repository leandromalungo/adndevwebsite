"use client"; // <- adicione isto no topo do arquivo

import React, { useState } from "react";
import { ROLE_ROADMAPS, SKILL_ROADMAPS, PROJECT_IDEAS, BEST_PRACTICES } from "@/components/roadmaps/constants";
import { RoadmapCard } from "@/components/roadmaps/RoadmapCard";
import { RoadmapDetailView } from "@/components/roadmaps/RoadmapDetailView";
import Navbar from "@/components/Navbar";
import { RoadmapItem } from "@/data/types";

// ... resto do código

const Page = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<RoadmapItem | null>(
    null
  );

  if (selectedRoadmap) {
    return (
      <RoadmapDetailView
        title={selectedRoadmap.title}
        onBack={() => setSelectedRoadmap(null)}
      />
    );
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-slate-50 text-slate-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Role-based Section */}
        <section>
          <div className="flex flex-col items-center mb-12">
            <div className="inline-flex items-center px-4 py-1 rounded-full border border-slate-200 bg-white shadow-sm mb-6">
              <span className="text-sm font-semibold text-slate-500">
                Role-based Roadmaps
              </span>
            </div>
            <div className="text-center space-y-3 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Career Paths
              </h1>
              <p className="text-slate-500 text-lg">
                Step-by-step guides for different engineering roles in the
                industry.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROLE_ROADMAPS.map((item) => (
              <div key={item.id} onClick={() => setSelectedRoadmap(item)}>
                <RoadmapCard item={item} />
              </div>
            ))}
          </div>
        </section>

        {/* Skill-based Section */}
        <section>
          <div className="flex flex-col items-center mb-12">
            <div className="inline-flex items-center px-4 py-1 rounded-full border border-slate-200 bg-white shadow-sm mb-6">
              <span className="text-sm font-semibold text-slate-500">
                Skill-based Roadmaps
              </span>
            </div>
            <div className="text-center space-y-3 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Technology Skills
              </h2>
              <p className="text-slate-500 text-lg">
                Deep-dive guides for specific tools, languages, and
                technologies.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILL_ROADMAPS.map((item) => (
              <div key={item.id} onClick={() => setSelectedRoadmap(item)}>
                <RoadmapCard item={item} />
              </div>
            ))}

            <div className="lg:col-span-1">
            </div>
          </div>
        </section>

        {/* Project Ideas Section */}
        <section>
          <div className="flex flex-col items-center mb-12">
            <div className="inline-flex items-center px-4 py-1 rounded-full border border-slate-200 bg-white shadow-sm mb-6">
              <span className="text-sm font-semibold text-slate-500">
                Project Ideas
              </span>
            </div>
            <div className="text-center space-y-3 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Project Paths
              </h2>
              <p className="text-slate-500 text-lg">
                Comprehensive project ideas to help you build and showcase your
                portfolio.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECT_IDEAS.map((item) => (
              <div key={item.id} onClick={() => setSelectedRoadmap(item)}>
                <RoadmapCard item={item} />
              </div>
            ))}
          </div>
        </section>

        {/* Best Practices Section */}
        <section>
          <div className="flex flex-col items-center mb-12">
            <div className="inline-flex items-center px-4 py-1 rounded-full border border-slate-200 bg-white shadow-sm mb-6">
              <span className="text-sm font-semibold text-slate-500">
                Best Practices
              </span>
            </div>
            <div className="text-center space-y-3 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Engineering Standards
              </h2>
              <p className="text-slate-500 text-lg">
                Industry-standard practices for high-performance and secure
                software.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BEST_PRACTICES.map((item) => (
              <div key={item.id} onClick={() => setSelectedRoadmap(item)}>
                <RoadmapCard item={item} />
              </div>
            ))}
          </div>
        </section>

        {/* Footer info */}
        <footer className="pt-8 border-t border-slate-200 text-center pb-12">
          <p className="text-slate-400 text-sm">
            Roadmaps updated weekly based on industry trends and community
            feedback.
          </p>
        </footer>
      </div>
    </div>
    </>
  );
};

export default Page;
