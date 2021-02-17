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

import { Bookmark } from "../../models/bookmark";
import { News } from "../../models/news";

const bookmark = {
  Query: {
    bookmark: async (_, { userId }) => {
      try {
        const bookmarkList = await Bookmark.find({ userId: userId });
        if (!bookmarkList) {
          const error = new Error("User not found.");
          error.code = 401;
          throw error;
        }
        const newsIdList = bookmarkList.map(({ newsId }) => newsId);
        const bookmarkNews = await News.find({ _id: newsIdList });
        return { bookmarkNews: bookmarkNews, succeed: true };
      } catch (error) {
        return new Error("Bookmark request is incorrect.", error);
      }
    },
  },

  Mutation: {
    AddBookmarkInput: async (_, { userId, newsId }) => {
      try {
        const existingBookmark = await Bookmark.findOne({
          newsId: newsId,
          userId: userId,
        });
        if (existingBookmark) {
          await existingBookmark.remove();
        } else {
          await new Bookmark({
            newsId: newsId,
            userId: userId,
          }).save();
        }

        return { succeed: true, isAdded: existingBookmark ? false : true };
      } catch (error) {
        return new Error("Bookmark request is incorrect.", error);
      }
    },
  },
};

export default bookmark;
