'use client';

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useProducts } from '@/api/graphql/hooks/useProducts';
import useProductManager from '@/hooks/useProductManager';
import useProductForm from '@/hooks/useProductForm';
import ProductForm from './components/ProductForm';
import ProductFilters from './components/ProductFilters';
import ProductTable from './components/ProductTable';
import Pagination from './components/Pagination';
import Modal from '@/components/modal/Modal';

const ProductsPage = () => {
  const [filterName, setFilterName] = useState('');
  const [filterSku, setFilterSku] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accountId = Cookies.get('accountId');

  const { loading, currentPage, setCurrentPage, addProduct } =
    useProductManager();

  const { data, refetch } = useProducts(currentPage, 10, {
    accountIds: accountId ? [accountId] : [],
    names: filterName ? [filterName] : undefined,
    skus: filterSku ? [filterSku] : undefined,
  });

  const formik = useProductForm(addProduct);

  useEffect(() => {
    refetch();
  }, [filterName, filterSku, currentPage, refetch]);

  const handleFilterSubmit = () => {
    setCurrentPage(1);
    refetch();
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Gestión de Productos</h1>
      <ProductFilters
        filterName={filterName}
        filterSku={filterSku}
        setFilterName={setFilterName}
        setFilterSku={setFilterSku}
        onFilterSubmit={handleFilterSubmit}
      />

      <ProductTable
        products={data?.products || []}
        loading={loading}
        noProducts={!data?.products.length}
        onAddProduct={handleOpenModal}
      />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        hasNextPage={data?.products.length > 0}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ProductForm formik={formik} onClose={handleCloseModal} />
      </Modal>
    </main>
  );
};

export default ProductsPage;
