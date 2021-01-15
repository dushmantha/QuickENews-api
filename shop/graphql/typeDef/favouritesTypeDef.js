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

const favouritesTypeDef = gql`
  extend type Query {
    favourites(userId: ID!): [Response]
  }

  extend type Mutation {
    AddFavoritesInput(userId: ID!, products: [Product]): String
  }

  extend type Response {
    favourites: [Favourite]
  }

  type Favourite {
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

  extend input Product {
    _empty: String
  }
`;

export default favouritesTypeDef;
