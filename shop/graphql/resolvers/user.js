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

import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../../models/user";

const user = {
  Query: {
    login: async (_, { email = {}, password = {} }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        const error = new Error("User not found.");
        error.code = 401;
        throw error;
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        const error = new Error("Password is incorrect.");
        error.code = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          userId: user._id.toString(),
          email: user.email,
        },
        "somesupersecretsecret",
        { expiresIn: "1h" }
      );
      return { token: token, userId: user._id.toString() };
    },
  },
  Mutation: {
    createUser: async (_, { email, password, name }) => {
      const errors = [];
      if (!validator.isEmail(email)) {
        errors.push({ message: "E-Mail is invalid." });
      }
      if (
        validator.isEmpty(password) ||
        !validator.isLength(password, { min: 5 })
      ) {
        errors.push({ message: "Password too short!" });
      }
      if (errors.length > 0) {
        const error = new Error("Invalid input.");
        error.data = errors;
        error.code = 422;
        throw error;
      }
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        const error = new Error("User exists already!");
        throw error;
      }
      const hashedPw = await bcrypt.hash(password, 12);
      const user = new User({
        email: email,
        name: name,
        password: hashedPw,
      });
      const createdUser = await user.save();
      return { ...createdUser._doc, _id: createdUser._id.toString() };
    },

    updateUserDetails: async (_, { email, address, contact, card }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        const error = new Error("User not found.");
        error.code = 401;
        throw error;
      }

      user.email = email;
      user.address = address;
      user.contact = contact;
      user.card = card;

      const updateUser = await user.save();
      return { ...updateUser._doc, _id: updateUser._id.toString() };
    },
  },
};

export default user;
