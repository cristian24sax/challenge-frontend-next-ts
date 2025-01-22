import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { useProducts } from '@/api/graphql/hooks/useProducts';
import { useCreateProducts } from '@/api/graphql/hooks/useCreateProduct';
import { toast } from 'sonner';
import { IProduct } from '@/interfaces/product';

const useProductManager = () => {
  const router = useRouter();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<IProduct[]>([]);

  // Hook para obtener productos y crear productos
  const { data, loading, refetch } = useProducts(currentPage, 10, {
    accountIds: [accountId],
  });
  const [createProducts] = useCreateProducts();

  // Obtener el accountId desde cookies y localStorage
  useEffect(() => {
    const storedAccountId = localStorage.getItem('accountId');
    const cookieAccountId = Cookies.get('accountId');
    if (storedAccountId && cookieAccountId) {
      setAccountId(storedAccountId);
    } else {
      toast.error(
        'No se encontró el ID de la cuenta. Por favor, inicia sesión nuevamente.'
      );
      router.push('/'); 
    }
  }, [router]);

  // Actualizar productos cuando cambian los datos
  useEffect(() => {
    if (data && !loading) {
      setProducts(data.products);
    }
  }, [data, loading]);

  const addProduct = async (product: { name: string; sku: string }) => {
    if (accountId) {
      try {
        await createProducts({
          variables: {
            input: {
              products: [
                {
                  ...product,
                  accountId: accountId, 
                },
              ],
            },
          },
        });
        refetch();
        toast.success('Producto agregado con éxito.');
      } catch (error) {
        toast.error(`Error al agregar producto. ${error}`);
      }
    } else {
      toast.warning('El ID de la cuenta no está disponible.');
    }
  };

  return {
    accountId,
    products,
    loading,
    currentPage,
    setCurrentPage,
    addProduct,
  };
};

export default useProductManager;
