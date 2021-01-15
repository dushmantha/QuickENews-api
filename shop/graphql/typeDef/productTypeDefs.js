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
  extend type Query {
    products: Response
    product(productId: ID): Response
  }

  extend type Response {
    product: [Aa]
  }

  type Aa {
    _id: ID!
    title: String!
    slug: String
    unit: String!
    price: Int!
    discountInPercent: Int
    description: String
    dealType: String!
    image: String!
    rating: String
  }
`;

export default productTypeDefs;
