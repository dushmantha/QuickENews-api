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
import cron from "node-cron";

import {
  rootTypeDef,
  userTypeDef,
  bookmarkTypeDef,
  newsTypeDefs,
} from "./news/graphql/typeDef";
import { user, bookmark, news } from "./news/graphql/resolvers";
import { getNews } from "./Data/news-api-manager";
import auth from "./news/middleware/auth";

const startServer = async () => {
  const app = express();
  app.use(auth);
  const server = new ApolloServer({
    resolvers: merge({}, user, news, bookmark),
    typeDefs: [rootTypeDef, userTypeDef, newsTypeDefs, bookmarkTypeDef],
    introspection: true,
    playground: true,
    tracing: true,
  });

  server.applyMiddleware({ app });

  mongoose
    // .connect("mongodb://localhost:27017/quickenews", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // })
    .connect(
      "mongodb+srv://admin:0p3nIos123@#@cluster0.1rdcb.mongodb.net/quickenews?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      // cron.schedule("0 */6 * * *", () => {
      //   getNews();
      // });
      app.listen({ port: 4004 }, () =>
        console.log(
          `🚀 Server ready at http://localhost:4004${server.graphqlPath}`
        )
      );
    });
};

startServer();
