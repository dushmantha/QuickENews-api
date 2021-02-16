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
    products: async (_) => {
      const categories = await Category.find({});
      if (!categories) {
        return { message: "categories not found" };
      }
      return { category: categories };
    },
  },
};

export default category;
