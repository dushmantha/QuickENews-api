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

import mongoose from "mongoose";
import { productSchema } from "./product";

const Schema = mongoose.Schema;

const favouritesSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },

  products: [productSchema],
});

export const Favourites = mongoose.model("favourites", favouritesSchema);
