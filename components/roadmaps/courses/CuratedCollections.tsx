
import { CollectionCard } from '@/components/roadmaps/courses/CollectionCard';
import { ChevronRight } from 'lucide-react';

export const CuratedCollections = () => {
  return (
    <section className="max-w-7xl mx-auto relative">
      {/* Background Decorative Lines (SVG) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="w-full h-full opacity-10" viewBox="0 0 1200 600" fill="none">
          <path d="M-100 600L1300 -100" stroke="#007E7E" strokeWidth="2" strokeDasharray="8 8" />
          <path d="M200 700L1400 0" stroke="#007E7E" strokeWidth="2" strokeDasharray="8 8" />
        </svg>
      </div>

      <div className="relative z-10 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#002D2D]">
          Navegue pela diversidade de áreas dentro do sector <span className="text-[#007E7E]">tecnologico.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        
        {/* Card 1: 10,000+ Free Courses */}
        <CollectionCard className="bg-[#EDF2F7] flex flex-col p-6">
          <div className="z-10">
            <h3 className="text-4xl font-extrabold text-[#1a202c] leading-tight">10,000+</h3>
            <p className="inline-block bg-[#2D3748] text-white px-2 py-1 text-xl font-bold rounded-md tracking-wider">FREE COURSES</p>
          </div>
          {/* Logo cloud simulation */}
          <div className="absolute inset-0 flex items-center justify-end p-4 pointer-events-none">
            <div className="relative w-40 h-40">
              <div className="absolute top-0 right-2 bg-white p-2 shadow rounded-lg transform rotate-2"><img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" className="h-6" alt="Meta" /></div>
              <div className="absolute top-12 right-20 bg-white p-2 shadow rounded-lg transform -rotate-6"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" className="h-4" alt="IBM" /></div>
              <div className="absolute bottom-8 right-12 bg-white p-2 shadow rounded-lg transform rotate-6 border border-gray-100"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" className="h-5" alt="Google" /></div>
              <div className="absolute bottom-0 right-0 bg-white p-2 shadow rounded-lg transform -rotate-3"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="h-4" alt="Amazon" /></div>
              <div className="absolute bottom-4 left-0 bg-white p-2 shadow rounded-lg transform rotate-2"><img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" className="h-5" alt="Microsoft" /></div>
            </div>
          </div>
          <div className="mt-auto z-10">
             <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
               <span className="bg-blue-600 text-white p-0.5 rounded text-[10px]">cc</span> class central
             </span>
          </div>
        </CollectionCard>

        {/* Card 2: 2000+ Online Degrees India */}
        <CollectionCard className="bg-[#1DB954] flex flex-col p-6 text-white overflow-hidden">
          <div className="z-10">
            <h3 className="text-4xl font-extrabold leading-tight">2000+</h3>
            <p className="text-sm font-semibold opacity-90 mb-1 italic">UGC Approved</p>
            <p className="text-3xl font-extrabold leading-tight">Online</p>
            <p className="text-3xl font-extrabold leading-tight">Degrees</p>
          </div>
          {/* India Map Graphic Simulation */}
          <div className="absolute top-0 right-0 h-full w-1/2 bg-[#0A5D00] clip-path-india opacity-50 z-0"></div>
          <div className="mt-auto z-10 flex flex-col">
            <p className="text-sm">from <span className="font-bold text-xl block">India's Top Universities</span></p>
             <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1 mt-2">
               <span className="bg-white text-[#1DB954] p-0.5 rounded text-[10px]">cc</span> class central
             </span>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `.clip-path-india { clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%); }` }} />
        </CollectionCard>

        {/* Card 3: Earn a Master's Degree Online */}
        <CollectionCard className="bg-[#0B1228] flex flex-col items-center justify-center text-center p-6 text-white">
          <div className="mb-2">
            <span className="text-[10px] tracking-[0.2em] font-medium opacity-80">EARN A</span>
            <h3 className="text-3xl font-extrabold text-[#D4AF37] leading-none my-1">MASTER'S</h3>
            <h3 className="text-4xl font-extrabold leading-none mb-1">DEGREE</h3>
            <span className="text-[10px] tracking-[0.2em] font-medium opacity-80">ONLINE</span>
          </div>
          {/* Partner logos */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 opacity-80 scale-90">
             <span className="text-[10px] font-bold">Future Learn</span>
             <span className="text-sm font-black italic">coursera</span>
             <span className="text-xs font-bold border px-1">edX</span>
          </div>
          <div className="absolute bottom-6 right-6">
             <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1">
               <span className="bg-white text-[#0B1228] p-0.5 rounded text-[10px]">cc</span> class central
             </span>
          </div>
        </CollectionCard>

        {/* Card 4: Microcredentials */}
        <CollectionCard className="bg-white border flex flex-col items-center justify-center p-6 overflow-hidden">
          {/* Background pattern of tilted micro-blocks */}
          <div className="absolute inset-0 grid grid-cols-4 gap-4 p-4 opacity-10 transform -rotate-12 -translate-y-4 scale-150">
             {Array.from({length: 16}).map((_, i) => (
               <div key={i} className="border border-red-200 h-10 w-full rounded flex items-center justify-center text-[8px] font-bold text-red-500 uppercase">Specialization</div>
             ))}
          </div>
          <div className="z-10 text-center">
            <h3 className="text-3xl font-black text-[#1a202c] tracking-tight">MICROCREDENTIALS</h3>
            <p className="text-red-600 font-extrabold text-sm mt-1 tracking-widest uppercase italic">A Massive List</p>
          </div>
          <div className="mt-8 z-10 flex flex-wrap justify-center gap-3">
             <div className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold text-gray-600">XSERIES</div>
             <div className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold text-gray-600">MICROMASTERS</div>
             <div className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold text-gray-600">NANODEGREE</div>
          </div>
          <div className="absolute bottom-6 right-6 z-10">
             <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
               <span className="bg-[#BA110C] text-white p-0.5 rounded text-[10px]">cc</span> class central
             </span>
          </div>
        </CollectionCard>

        {/* Card 5: Ivy League Courses */}
        <CollectionCard className="bg-white flex overflow-hidden">
          <div className="w-1/2 bg-[#004225] p-6 flex flex-col justify-center text-white">
            <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-1">Free Online</p>
            <h3 className="text-3xl font-extrabold leading-tight">IVY LEAGUE</h3>
            <h3 className="text-3xl font-extrabold leading-tight">COURSES</h3>
          </div>
          <div className="w-1/2 p-6 flex flex-wrap items-center justify-center gap-3 bg-[#E9F3EE]">
             {/* Symbolic Ivy Shields */}
             <div className="w-8 h-10 bg-red-800 rounded-b-full"></div>
             <div className="w-8 h-10 bg-blue-900 rounded-b-full"></div>
             <div className="w-8 h-10 bg-orange-600 rounded-b-full"></div>
             <div className="w-8 h-10 bg-green-900 rounded-b-full"></div>
             <div className="w-8 h-10 bg-red-600 rounded-b-full"></div>
             <div className="w-8 h-10 bg-blue-600 rounded-b-full"></div>
          </div>
          <div className="absolute bottom-6 right-6">
             <span className="text-xs font-bold text-[#004225] uppercase tracking-widest flex items-center gap-1">
               <span className="bg-[#004225] text-white p-0.5 rounded text-[10px]">cc</span> class central
             </span>
          </div>
        </CollectionCard>

        {/* Card 6: Most Popular Online Courses */}
        <CollectionCard className="bg-[#FBBF24] flex flex-col items-center justify-center text-center p-6">
          <div className="absolute top-0 right-0 p-4 opacity-20">
             <div className="grid grid-cols-3 gap-1">
                {Array.from({length: 9}).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>
                ))}
             </div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-1">THE MOST</span>
            <h3 className="text-5xl font-black text-white drop-shadow-sm leading-none my-1">POPULAR</h3>
            <p className="text-lg font-bold text-white mt-1">ONLINE <span className="text-[#002D2D]">COURSES</span></p>
          </div>
          <div className="mt-4 bg-[#1E40AF] text-white px-4 py-1 font-black text-sm rounded-md tracking-widest transform -rotate-1 shadow-md">
            OF ALL TIME
          </div>
          <div className="absolute bottom-6 right-6">
             <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1">
               <span className="bg-[#002D2D] text-white p-0.5 rounded text-[10px]">cc</span> class central
             </span>
          </div>
        </CollectionCard>

      </div>

      <div className="flex justify-center">
        <button className="flex items-center gap-2 bg-[#B1DBDD] text-[#002D2D] font-bold py-3 px-10 rounded-lg hover:bg-[#9AD2D5] transition-colors shadow-sm group">
          Escolha uma e faça um curso gratuito
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default CuratedCollections;