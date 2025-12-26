
"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { MOCK_EDITIONS } from '@/components/newslatter/Constants';
import { Category } from '../data/types';
import Navbar from '../components/Navbar';
import Hero from '@/components/newslatter/Hero';
import EditionCard from '../components/newslatter/EditionCard';
import SearchAndFilter from '../components/newslatter/SearchAndFilter';
import Pagination from '../components/newslatter/Pagination';
import Newsletter from '../components/newslatter/Newsletter';
import Footer from '../components/Footer';

const ITEMS_PER_PAGE = 4;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const gridStartRef = useRef<HTMLDivElement>(null);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  const filteredEditions = useMemo(() => {

    return MOCK_EDITIONS.filter((edition) => {
      const matchesSearch = edition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           edition.displayDate.includes(searchTerm);
      const matchesCategory = activeCategory ? edition.category === activeCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const totalPages = Math.ceil(filteredEditions.length / ITEMS_PER_PAGE);

  const paginatedEditions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEditions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEditions, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Usar a ref para rolar a visualização é a abordagem idiomática do React,
    // evitando a manipulação direta do DOM com getElementById.
    gridStartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white selection:bg-yellow-200">
      <Navbar />
      
      <Hero />
 
      <div ref={gridStartRef} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 border-t border-gray-100 mt-2 scroll-mt-20">
        
        {/* Header section with Search and Filter */}
        <header className="mb-12">
          <h2 className="text-3xl text-gray-800 mb-6 uppercase tracking-tight">
            Feed de notícias
          </h2>
          <SearchAndFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        </header>

        {/* Main Feed */}
        <main>
          {paginatedEditions.length > 0 ? (
            <div className="space-y-4">
              {paginatedEditions.map((edition) => (
                <EditionCard key={edition.id} edition={edition} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 text-lg">Nenhuma edição encontrada para sua busca.</p>
              <button 
                onClick={() => {setSearchTerm(''); setActiveCategory(null);}}
                className="mt-4 text-yellow-600 font-bold hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </main>

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>

      {/* Newsletter Signup at the bottom */}
      <Newsletter />

      {/* Comprehensive Footer */}
      <Footer />
    </div>
  );
};

export default App;
