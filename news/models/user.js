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

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  locale: {
    type: String,
    required: false,
  },

  subscribeAccount: {
    type: Boolean,
    required: false,
  },
  account: {
    type: {
      verification: {
        verified: {
          type: Boolean,
          default: false,
        },
        token: {
          type: String,
          required: false,
        },
        expiresIn: {
          type: String,
          required: false,
        },
        type: Object,
        require: false,
      },
      resetPassword: {
        type: {
          token: {
            type: String,
            required: false,
          },
          expiresIn: {
            type: String,
            required: false,
          },
        },
        require: false,
      },
    },
    require: false,
  },
});

export const User = mongoose.model("User", userSchema);
