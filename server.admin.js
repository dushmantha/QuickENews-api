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
import _ from "lodash";
import mongoose from "mongoose";
import { product } from "./admin/product/graphql/resolvers";
import { productTypeDefs } from "./admin/product/graphql/typeDefs";
// import auth from "./shop/user/middleware/auth";

const startServer = async () => {
  const app = express();
  // app.use(auth);
  const server = new ApolloServer({
    resolvers: _.merge({}, product),
    typeDefs: [productTypeDefs],
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
      app.listen({ port: 4005 }, () =>
        console.log(
          `🚀 Server ready at http://localhost:4005${server.graphqlPath}`
        )
      );
    });
};

startServer();
