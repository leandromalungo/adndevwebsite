
import React from 'react';

/**
 * SystemRequirements Component
 * 
 * A clean, informative section that details software or hardware requirements.
 * Matches the visual style of the provided screenshot with a structured card layout.
 */
export const SystemRequirements: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-4">
      {/* External Title */}
      <h2 className="text-3xl font-bold text-[#444] mb-8">
        Melhores eventos sobre tecnologia do pais
      </h2>

      {/* Content Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-12">
        
        {/* Runs Anywhere */}
        <div className="max-w-4xl">
          <h3 className="text-2xl font-bold text-[#444] mb-4">Runs Anywhere</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            Blender is cross-platform, it runs on every major operating system. All efforts to make Blender work on specific configurations are welcome, but we can only officially support those used by active developers. For Windows there is an installer available if you wish to add an icon on the desktop, register .blend file extensions, etc.
          </p>
        </div>

        {/* Truly Portable */}
        <div className="max-w-4xl">
          <h3 className="text-2xl font-bold text-[#444] mb-4">Truly Portable</h3>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed text-lg">
              Whether it's on a USB stick, sitting on a folder on your desktop, or fully installed, Blender runs out of the box.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              <span className="font-bold text-gray-800">No installation needed, no Internet connection required.</span> Truly portable, take it with you wherever you go! Read more about portable installations in <a href="#" className="text-gray-500 underline hover:text-black transition-colors">the manual</a>.
            </p>
          </div>
        </div>

        {/* Compatible */}
        <div className="max-w-4xl">
          <h3 className="text-2xl font-bold text-[#444] mb-4">Compatible</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            Blender strives to keep compatibility with older and even future versions as much as possible. Sometimes new features require breaking changes, here is an <a href="#" className="text-gray-500 underline hover:text-black transition-colors">overview of all compatibility changes</a>.
          </p>
        </div>

      </div>
    </section>
  );
};
