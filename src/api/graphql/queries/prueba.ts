import { gql } from '@apollo/client';

export const queryPrueba = gql`
  query prueba {
    prueba
  }
`;
export const queryAccounts = gql`
  query accounts($filter: Filter) {
    accounts(filter: $filter) {
      _id
      name
      email
    }
  }
`;

export const queryProducts = gql`
  query products($page: Int, $limit: Int, $filter: Filter) {
    products(page: $page, limit: $limit, filter: $filter) {
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
