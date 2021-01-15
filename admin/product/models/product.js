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
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: false,
  },

  unit: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  discountInPercent: {
    type: Number,
    required: false,
  },

  description: {
    type: String,
    required: false,
  },

  dealType: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  rating: {
    type: String,
    required: false,
  },

  gallery: {
    type: Object,
    required: false,
  },

  categories: {
    type: Object,
    required: false,
  },
});

export const Product = mongoose.model("Product", productSchema);
