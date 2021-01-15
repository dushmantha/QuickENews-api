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

import { Favourites } from "../../models/favourites";
import { Product } from "../../models/product";

const favourites = {
  Query: {
    favourites: async (_, { userId }) => {
      const favouritesList = await Favourites.find({ userId: userId });
      if (!favouritesList) {
        const error = new Error("User not found.");
        error.code = 401;
        throw error;
      }
      return { favourites: favouritesList };
    },
  },

  Mutation: {
    AddFavoritesInput: async (_, { userId, products }) => {
      let addFavourites;
      for (const product of products) {
        const existingProduct = await Favourites.findOne({
          slug: slug,
          userId: userId,
        });
        if (existingProduct) {
          await existingProduct.remove();
        } else {
          addFavourites = await new Favourites({
            product: await new Product(product).save(),
            userId: userId,
          }).save();
        }
      }
      return { ...addFavourites._doc };
    },
  },
};

export default favourites;
