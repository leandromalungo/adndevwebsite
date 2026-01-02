"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CommunityGrid } from '@/components/community/CommunityGrid';

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f9fafb]">
      <header className="bg-white border-b border-gray-200 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">Comunidades</h1>
          <p className="text-gray-500 text-sm mt-1">Descubra grupos e comunidades de tecnologia no Brasil.</p>
        </div>
        
      </header>
      
      <main>
        <CommunityGrid />
      </main>
      <Footer />
    </div>
        
    </>
  );
}
