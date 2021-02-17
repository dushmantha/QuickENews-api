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
    succeed: String
  }

  type News {
    _id: ID!
    title: String!
    paid: Boolean
    description: String!
    urlToImage: String
    video: String
    url: String
    publishedAt: String!
    category: String!
    authorName: String
    authorEmails: String
    authorTwitter: String
    authorRanking: String
    authorProfileImageUrl: String
  }

  type Category {
    _empty: String
  }
`;

export default rootTypeDef;
