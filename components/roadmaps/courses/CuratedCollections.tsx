
import { CollectionCard } from '@/components/roadmaps/courses/CollectionCard';
import Link from 'next/link';
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
            <p className="inline-block bg-[#2D3748] text-white px-2 py-1 text-xl font-bold rounded-md ">CURSOS GRATUITOS</p>
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
        </CollectionCard>

        {/* Card 2: 2000+ Online Degrees India */}
        <CollectionCard className="bg-[#1DB954] flex flex-col p-6 text-white overflow-hidden">
          <div className="z-10">
            <h3 className="text-4xl font-extrabold leading-tight">2000+</h3>
            <p className="text-sm font-semibold opacity-90 mb-1 italic">todos aprovados</p>
            <p className="text-3xl font-extrabold leading-tight">Online</p>
            <p className="text-3xl font-extrabold leading-tight">e ao teu ritmo</p>
          </div>
          {/* India Map Graphic Simulation */}
          <div className="absolute top-0 right-0 h-full w-1/2 bg-[#0A5D00] clip-path-india opacity-50 z-0"></div>
          <div className="mt-auto z-10 flex flex-col">
            <p className="text-sm">AO <span className="font-bold text-xl block">REDOR DO MUNDO.</span></p>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `.clip-path-india { clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%); }` }} />
        </CollectionCard>

        {/* Card 3: Earn a Master's Degree Online */}
        <CollectionCard className="bg-[#0B1228] flex flex-col items-center justify-center text-center p-6 text-white">
          <div className="mb-2">
            <span className="text-[10px] tracking-[0.2em] font-medium opacity-80">Acesseos cursos</span>
            <h3 className="text-3xl font-extrabold text-[#D4AF37] leading-none my-1">Faculdade de tecnologia</h3>
            <h3 className="text-4xl font-extrabold leading-none mb-1">COM CERTIFICADO</h3>
            <span className="text-[10px] tracking-[0.2em] font-medium opacity-80">ONLINE</span>
          </div>
          {/* Partner logos */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 opacity-80 scale-90">
             <span className="text-[10px] font-bold">HARDVERD</span>
             <span className="text-sm font-black italic">M.I.T</span>
             <span className="text-xs font-bold border px-1">CABRIDG</span>
          </div>
        </CollectionCard>

      </div>

      <div className="flex justify-center">
        <button className="flex items-center gap-2 bg-[#B1DBDD] text-[#002D2D] font-bold py-3 px-10 rounded-xl hover:bg-[#9AD2D5] transition-colors shadow-sm group">
          <Link  href="/roadmaps"> Escolha uma e faça um curso gratuito </Link>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> 
        </button>
      </div>
    </section>
  );
};

export default CuratedCollections;