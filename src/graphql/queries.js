import { gql } from '@apollo/client';

// Guitar Brands Query - matches GuitarList.js usage
export const GET_GUITAR_BRANDS = gql`
  query GetGuitarBrands {
    findAllBrands {
      id
      name
      image
    }
  }
`;

// Brand Models Query - matches GuitarModels.js usage
export const GET_BRAND_MODELS = gql`
  query GetBrandModels($brandId: String!, $name: String!) {
    searchModels(brandId: $brandId, name: $name) {
      id
      name
      type
      price
      image
      description
    }
  }
`;

// Model Details Query - matches GuitarModelDetails.js usage
export const GET_MODEL_DETAILS = gql`
  query GetModelDetails($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      description
      type
      price
      image
      specs {
        bodyWood
        neckWood
        pickups
        scaleLength
      }
      musicians {
        name
      }
    }
  }
`;

// Search Models Query with optional type filter
export const SEARCH_MODELS = gql`
  query SearchModels($brandId: String!, $name: String!, $type: String) {
    searchModels(brandId: $brandId, name: $name, type: $type) {
      id
      name
      type
      price
      image
      description
    }
  }
`;

// Alternative query for brand listing (fallback)
export const GET_BRANDS = gql`
  query GetBrands {
    brands {
      id
      name
      description
      logo
      image
    }
  }
`;

// Named export object for convenience
const queries = {
  GET_GUITAR_BRANDS,
  GET_BRAND_MODELS,
  GET_MODEL_DETAILS,
  SEARCH_MODELS,
  GET_BRANDS,
};

export default queries;