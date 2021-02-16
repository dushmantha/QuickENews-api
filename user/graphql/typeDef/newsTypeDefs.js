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

const newsTypeDefs = gql`
  extend type Query {
    newsList: Response
    news(newsId: ID): News
  }

  extend type Response {
    all: [News]
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

  type Author {
    _id: ID!
    name: String
    emails: String
    twitter: String
    ranking: String
    profileImageUrl: String
  }
`;

export default newsTypeDefs;
