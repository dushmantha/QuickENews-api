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

const rootTypeDef = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }

  type Response {
    message: String
  }

  input Product {
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
    gallery: [Gallery]
    categories: [Category]!
  }

  input Gallery {
    _id: ID!
    url: String!
  }

  input Category {
    _id: ID!
    title: String!
    slug: String
  }
`;

export default rootTypeDef;
