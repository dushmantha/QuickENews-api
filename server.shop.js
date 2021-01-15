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

import { ApolloServer } from "apollo-server-express";
import express from "express";
import { merge } from "lodash";
import mongoose from "mongoose";

import {
  rootTypeDef,
  userTypeDef,
  favouritesTypeDef,
  productTypeDefs,
} from "./shop/graphql/typeDef";
import { user, favourites, product } from "./shop/graphql/resolvers";

// import {
//   userResolvers,
//   userTypeDefs,
//   // productResolvers,
//   // productTypeDefs,
//   favouritesResolvers,
//   favouritesTypeDefs,
// } from "./shop/graphql";

import auth from "./shop/middleware/auth";

const startServer = async () => {
  const app = express();
  app.use(auth);
  const server = new ApolloServer({
    resolvers: merge({}, user, favourites, product),
    typeDefs: [rootTypeDef, userTypeDef, favouritesTypeDef, productTypeDefs],
    introspection: true,
    playground: true,
    tracing: true,
  });

  server.applyMiddleware({ app });

  mongoose
    .connect("mongodb://localhost:27017/shop", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.listen({ port: 4004 }, () =>
        console.log(
          `🚀 Server ready at http://localhost:4004${server.graphqlPath}`
        )
      );
    });
};

startServer();
