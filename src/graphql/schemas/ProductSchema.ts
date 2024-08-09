import { gql } from 'apollo-server-express';

export const ProductSchema = gql`
  type ProductDetails {
    productName: String
    productBrand: String
    productSizeAvailable: String
    productDiscountPrice: String
    productRetailPrice: String
    productLink: String
    productImage: String
    productGender: String
  }

  type Product {
    id: ID!
    uniqueId: String
    productSource: String
    productSourceUrl: String
    productDetails: ProductDetails
  }

  type BrandCount {
    productBrand: String
    count: Int
  }

  type SourceCount {
    productSource: String
    count: Int
  }

  type ProductResponse {
    products: [Product]
    totalCount: Int
    brandCounts: [BrandCount]
    sourceCounts: [SourceCount]
  }

  type Query {
    getProducts(gender: String, brand: String, searchTerm: String, limit: Int, offset: Int): ProductResponse
    getProductById(id: String!): Product
    searchProducts(searchTerm: String!, gender: String, limit: Int, offset: Int): ProductResponse
  }
`;

