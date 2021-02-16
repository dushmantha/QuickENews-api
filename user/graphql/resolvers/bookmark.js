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
        return { bookmark: bookmarkList };
      } catch (error) {
        return new Error("Bookmark request is incorrect.", error);
      }
    },
  },

  Mutation: {
    AddBookmarkInput: async (_, { userId, news }) => {
      try {
        const existingBookmark = await Bookmark.findOne({
          slug: slug,
          userId: userId,
        });
        if (existingBookmark) {
          await existingBookmark.remove();
        } else {
          addFavourites = await new Bookmark({
            news: await new News(news).save(),
            userId: userId,
          }).save();
        }

        return { message: "Added bookmark successfully", succeed: true };
      } catch (error) {
        return new Error("Bookmark request is incorrect.", error);
      }
    },
  },
};

export default bookmark;
