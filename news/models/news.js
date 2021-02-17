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

  authorName: {
    type: String,
    required: false,
  },
  authorProfileImageUrl: {
    type: String,
    required: false,
  },
  authorEmails: {
    type: String,
    required: false,
  },
  authorTwitter: {
    type: String,
    required: false,
  },
  authorRanking: {
    type: String,
    required: false,
  },
  paid: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  urlToImage: {
    type: String,
    required: false,
  },
  video: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  publishedAt: {
    type: String,
    required: true,
  },
});

export const News = mongoose.model("News", newsSchema);
