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

import { Product } from "../../models/product";

const product = {
  Query: {
    product: async (_, { productId }) => {
      const product = await Product.findOne({ productId: productId });
      if (!product) {
        const error = new Error("User not found.");
        error.code = 401;
        throw error;
      }
      return { product: product };
    },

    products: async (_) => {
      const products = await Product.find({});
      if (!products) {
        return { message: "Products not found" };
      }
      return { products: products };
    },
  },
};

export default product;
