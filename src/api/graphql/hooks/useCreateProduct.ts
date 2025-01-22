import { useMutation } from '@apollo/client';
import { mutationCreateProducts } from '../mutations/prueba';

export const useCreateProducts = () => {
  return useMutation(mutationCreateProducts, {
    context: { clientName: 'api' },
  });
};
