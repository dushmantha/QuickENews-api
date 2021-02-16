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

const bookmarkTypeDef = gql`
  extend type Query {
    bookmark(userId: ID!): [News]
  }

  extend type Mutation {
    AddBookmarkInput(userId: ID!, news: News): Response
  }

  extend type Response {
    message: String
  }

  extend type News {
    _id: ID!
    title: String!
    slug: String
    paid: String
    description: String!
    image: String
    video: String
    category: String!
    author: Author
  }

  extend input News {
    _empty: String
  }
`;

export default bookmarkTypeDef;
