import { useQuery } from '@apollo/client';
import { queryPrueba } from '../queries/prueba';

export const usePrueba = () => {
  return useQuery(queryPrueba, {
    context: { clientName: 'api' },
    variables: {},
  });
};
