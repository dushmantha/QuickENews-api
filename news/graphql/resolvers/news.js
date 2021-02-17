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

import { News } from "../../models/news";

const news = {
  Query: {
    news: async (_, { newsId }) => {
      try {
        const news = await News.findOne({ _id: newsId });
        if (!news) {
          const error = new Error("News not found");
          error.code = 401;
          throw error;
        }
        return { news: news };
      } catch (error) {
        return new Error("News not found", error);
      }
    },
    newsList: async (_, { category }) => {
      try {
        let list;
        if (category == "all") {
          list = await News.find({});
        } else {
          list = await News.find({ category: category });
        }
        if (!list) {
          return { message: "News list not found" };
        }
        return { list: list, succeed: true };
      } catch (error) {
        return new Error("News not found", error);
      }
    },
  },
};

export default news;
