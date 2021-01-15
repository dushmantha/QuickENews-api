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
    login(email: String!, password: String!): AuthData
  }

  extend type Mutation {
    createUser(name: String!, email: String!, password: String!): Response

    updateUserDetails(
      email: String!
      contact: [Contact]
      address: [Address]
      card: [Card]
    ): Response
  }

  extend type Response {
    _id: ID!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
  }

  input Address {
    type: String!
    name: String!
    info: String!
  }

  input Contact {
    type: String!
    number: String!
  }

  input Card {
    type: String!
    name: String!
    cardType: String!
    lastFourDigit: Int!
  }

  type AuthData {
    token: String!
    userId: String!
  }
`;

export default userTypeDef;
