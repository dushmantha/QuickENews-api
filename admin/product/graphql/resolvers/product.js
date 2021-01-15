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

export const productResolvers = {
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
  },

  Mutation: {
    AddProductInput: async (
      _,
      {
        title,
        slug,
        unit,
        price,
        discountInPercent,
        description,
        dealType,
        image,
        rating,
        gallery,
        categories,
      }
    ) => {
      const existingProduct = await Product.findOne({ slug: slug });

      if (existingProduct) {
        const error = new Error("Product exists already!");
        throw error;
      }

      const product = new Product({
        title: title,
        slug: slug,
        unit: unit,
        price: price,
        discountInPercent: discountInPercent,
        description: description,
        dealType: dealType,
        image: image,
        rating: rating,
        gallery: gallery,
        categories: categories,
      });
      const addProduct = await product.save();
      return { ...addProduct._doc };
    },
  },
};
