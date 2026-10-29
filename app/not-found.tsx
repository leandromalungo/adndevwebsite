import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <h1 className="text-[150px] font-bold text-gray-900 dark:text-white">
        404
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
        Página não encontrada
      </p>
      <a
        href="/"
        className="px-6 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition shadow-lg"
      >
        Voltar 
      </a>
    </div>
  );
}
