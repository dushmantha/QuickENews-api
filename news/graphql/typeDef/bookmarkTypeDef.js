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
    bookmark(userId: ID!): Response
  }

  extend type Mutation {
    AddBookmarkInput(userId: ID!, newsId: String): BookmarkResponseSuccess
  }

  type BookmarkResponseSuccess {
    succeed: Boolean
    isAdded: Boolean
  }

  extend type Response {
    bookmarkNews: [News]
  }
`;

export default bookmarkTypeDef;
