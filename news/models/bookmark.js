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
import { newsSchema } from "./news";

const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  newsId: {
    type: String,
    required: true,
  },
});

export const Bookmark = mongoose.model("bookmark", bookmarkSchema);
