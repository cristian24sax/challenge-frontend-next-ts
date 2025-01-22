import React from 'react';

interface ProductFiltersProps {
  filterName: string;
  filterSku: string;
  setFilterName: (value: string) => void;
  setFilterSku: (value: string) => void;
  onFilterSubmit: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filterName,
  filterSku,
  setFilterName,
  setFilterSku,
  onFilterSubmit,
}) => {
  return (
    <div className="w-full max-w-md bg-white shadow-md rounded p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">Filtrar Productos</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Buscar por SKU"
          value={filterSku}
          onChange={(e) => setFilterSku(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <button
          onClick={onFilterSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all"
        >
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
