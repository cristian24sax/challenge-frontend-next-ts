import React from 'react';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  hasNextPage: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  hasNextPage,
}) => {
  return (
    <div className="mt-6 flex justify-center gap-4">
      <button
        className={`text-white py-2 px-4 rounded transition-all ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'}`}
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span className="text-lg">{currentPage}</span>
      <button
        className={`text-white py-2 px-4 rounded transition-all ${!hasNextPage ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'}`}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={!hasNextPage}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
