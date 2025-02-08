import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    allProducts {
      id
      name
      category
      price_in_cents
      description
      image_url
      created_at
      sales
    }
  }
`;