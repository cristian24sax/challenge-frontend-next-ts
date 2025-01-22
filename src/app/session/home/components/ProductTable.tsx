import { IProduct } from '@/interfaces/product';
import React from 'react';

interface ProductTableProps {
  products: IProduct[];
  loading: boolean;
  noProducts: boolean;
  onAddProduct: () => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  loading,
  noProducts,
  onAddProduct,
}) => {
  return (
    <div className="w-full max-w-4xl bg-white shadow-md rounded p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold mb-4">Lista de Productos</h2>
        <button
          onClick={onAddProduct}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all"
        >
          {' '}
          + Agregar producto
        </button>
      </div>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                SKU
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Nombre
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {product._id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.sku}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.name}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  {`No hay productos ${noProducts ? '' : 'que coincidan con los filtros.'}`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
