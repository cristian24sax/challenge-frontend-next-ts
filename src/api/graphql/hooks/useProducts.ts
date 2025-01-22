import { useQuery } from '@apollo/client';
import { queryProducts } from '../queries/prueba';

export const useProducts = (page: number, limit: number, filter: any) => {
  return useQuery(queryProducts, {
    variables: { page, limit, filter },
    context: { clientName: 'api' },
  });
};
