
import React from 'react';

/**
 * SystemRequirements Component
 * 
 * A clean, informative section that details software or hardware requirements.
 * Matches the visual style of the provided screenshot with a structured card layout.
 */
export const MoreCom = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-4">
      {/* External Title */}
      <h2 className="text-3xl font-bold text-[#444] mb-8 uppercase">
        Outras competicoes para teres acesso
      </h2>

      {/* Content Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-12">
        
        {/* Runs Anywhere */}
        <div className="max-w-4xl">
          <h3 className="text-2xl font-bold text-[#444] mb-4">Lorem ipsum dolor</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
          </p>
        </div>

        {/* Truly Portable */}
        <div className="max-w-4xl">
          <h3 className="text-2xl font-bold text-[#444] mb-4">lorem ipsum dolor</h3>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, iusto? Sit ullam est eveniet nulla reiciendis impedit? Tempora recusandae quia, eius autem, mollitia omnis, asperiores nihil pariatur fugit excepturi voluptatibus.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              <span className="font-bold text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat non earum consectetur incidunt nihil corporis exercitationem magni quidem reiciendis eaque. <a href="#" className="text-gray-500 underline hover:text-black transition-colors">the manual</a>.
            </p>
          </div>
        </div>

        {/* Compatible */}
        <div className="max-w-4xl">
          <h3 className="text-2xl font-bold text-[#444] mb-4">Lorem ipsum dolor</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni eum ipsum ut labore, eos mollitia. Quis, assumenda? Numquam ducimus sunt voluptate, nisi, vel mollitia dignissimos laudantium magnam obcaecati reiciendis aut. <a href="#" className="text-gray-500 underline hover:text-black transition-colors">overview of all compatibility changes</a>.
          </p>
        </div>

      </div>
    </section>
  );
};
