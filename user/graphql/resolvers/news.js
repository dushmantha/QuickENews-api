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
      const news = await News.findOne({ newsId: newsId });
      if (!news) {
        const error = new Error("News not found");
        error.code = 401;
        throw error;
      }
      return { news: news };
    },

    newsList: async (_) => {
      const newsList = await Product.News({});
      if (!newsList) {
        return { message: "News list not found" };
      }
      return { all: newsList };
    },
  },
};

export default news;
