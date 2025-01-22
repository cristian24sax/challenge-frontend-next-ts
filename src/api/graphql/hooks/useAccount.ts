import { useQuery } from '@apollo/client';
import { queryAccounts } from '../queries/prueba';

export const useAccounts = (email: string) => {
  return useQuery(queryAccounts, {
    variables: { filter: { emails: [email] } },
    context: { clientName: 'api' },
  });
};
