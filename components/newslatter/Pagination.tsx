
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Helper to render page number buttons
  const renderPageButtons = () => {
    const buttons = [];
    // For simplicity, we show all pages if small, or could implement a window logic.
    // Given the screenshot, it shows a sequence of numbers.
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg border transition-all ${
            i === currentPage
              ? 'bg-[#1d405b] border-[#1d405b] text-gray-900 shadow-sm'
              : 'bg-white border-[#1d405b] text-gray-700 hover:bg-yellow-50'
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-12 pb-16">
      {/* Primeiro Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all ${
          currentPage === 1 
            ? 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50' 
            : 'text-gray-700 border-[#1d405b] bg-white hover:bg-yellow-50'
        }`}
      >
        Primeiro
      </button>
      
      {/* Voltar Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border rounded-lg transition-all ${
          currentPage === 1 
            ? 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50' 
            : 'text-gray-100 border-[#1d405b] bg-white hover:bg-yellow-50'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        Voltar
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {renderPageButtons()}
      </div>

      {/* Próximo Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border rounded-lg transition-all ${
          currentPage === totalPages 
            ? 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50' 
            : 'text-gray-700 border-[#1d405b] bg-white hover:bg-yellow-50'
        }`}
      >
        Próximo
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Último Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
        className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all ${
          currentPage === totalPages 
            ? 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50' 
            : 'text-gray-700 border-[#1d405b] bg-white hover:bg-gray-100'
        }`}
      >
        Último
      </button>
    </div>
  );
};

export default Pagination;
