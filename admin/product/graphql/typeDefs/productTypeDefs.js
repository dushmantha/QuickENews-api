/*
 *This file is part of Buckshee Enterprise.
 **
 * Copyright (C) 2020 onwards Buckshee LTD
 **
 * If you do not have an agreement with Buckshee
 * LTD, you may not access, use, modify, or distribute this software.
 * Please contact [buckshee@gmail.com] for more information.
 *
 */

import { gql } from "apollo-server-express";

const productTypeDefs = gql`
  type Query {
    product(productId: ID!): Success!
  }

  type Mutation {
    AddProductInput(
      title: String!
      slug: String
      unit: String!
      price: Int!
      discountInPercent: Int
      description: String
      dealType: String!
      image: String!
      rating: String
      gallery: [Gallery]
      categories: [Category]
    ): Success!
  }

  type Success {
    _id: ID!
    slug: String
  }

  input Gallery {
    url: String!
  }

  input Category {
    title: String!
    slug: String!
  }
`;

export default productTypeDefs;
