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

const categoryTypeDef = gql`
  extend type Query {
    categories: Response
  }

  extend type Response {
    categories: [Category]
  }

  extend type Category {
    _id: ID!
    title: String!
    slug: String
    type: String
    icon: String
  }
`;

export default categoryTypeDef;
