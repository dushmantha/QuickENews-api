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

export const newsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: false,
  },

  author: {
    name: {
      type: String,
      required: false,
    },
    profileImageUrl: {
      type: String,
      required: false,
    },
    emails: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
    ranking: {
      type: String,
      required: false,
    },
    required: true,
  },

  paid: {
    type: Boolean,
    required: true,
  },

  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },

  video: {
    type: Object,
    required: false,
  },

  category: {
    type: String,
    required: false,
  },
});

export const News = mongoose.model("News", newsSchema);
