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

import { Category } from "../../models/category";

const category = {
  Query: {
    category: async (_) => {
      try {
        const categories = await Category.find({});
        if (!categories) {
          return "categories not found";
        }
        return { categories: categories };
      } catch (error) {
        return new Error("categories not found", error);
      }
    },
  },
  Mutation: {
    AddCategoryInput: async (_, { title, icon }) => {
      try {
        const existingCategory = await Category.findOne({
          title: title,
        });
        if (existingCategory) {
          const error = new Error("User not found.");
          error.code = 401;
          throw error;
        } else {
          await new Category({
            title: title,
            icon: icon,
          }).save();
        }
        return { succeed: true };
      } catch (error) {
        return new Error("Add Category request is incorrect.", error);
      }
    },
  },
};

export default category;
