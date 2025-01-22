import { gql } from '@apollo/client';

export const mutationCreateProducts = gql`
  mutation createProducts($input: CreateProductsInput!) {
    createProducts(input: $input) {
      _id
      name
      sku
      account {
        _id
        email
      }
    }
  }
`;
