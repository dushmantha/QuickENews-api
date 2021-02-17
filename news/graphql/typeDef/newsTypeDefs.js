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
    news(newsId: ID): selectedNews
    newsList(category: String): Response
  }

  extend type Response {
    list: [News]
  }

  type selectedNews {
    news: News
  }
`;
export default newsTypeDefs;
