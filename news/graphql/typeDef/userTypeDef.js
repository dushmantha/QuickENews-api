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

const userTypeDef = gql`
  extend type Query {
    signIn(email: String!, password: String!): Response
  }

  extend type Mutation {
    createUser(name: String!, email: String!, password: String!): Response
    newPassword(token: String!, newPassword: String): Response
    verify(token: String!): Response
    verifyUserRequest(email: String!): ResponseSuccess
    resetPassword(email: String!): ResponseSuccess
    switchLocale(locale: String!, email: String!): ResponseSuccess
    changePassword(
      currentPassword: String!
      newPassword: String!
      email: String!
    ): ResponseSuccess
  }

  type ResponseSuccess {
    succeed: Boolean
  }

  extend type Response {
    accessToken: String
  }
`;

export default userTypeDef;
