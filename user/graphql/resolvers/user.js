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
import crypto from "crypto-random-string";
import moment from "moment";

import {
  verify,
  resetPassword,
  verifyRequest,
} from "../../service/mail/userMail";
import { userService } from "../../service/userService";
import { User } from "../../models/user";

const user = {
  Query: {
    signIn: async (_, { email = {}, password = {} }) => {
      try {
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
        const accessToken = jwt.sign(
          {
            userId: user._id.toString(),
            email: user.email,
          },
          "somesupersecretsecret",
          { expiresIn: "30 days" }
        );
        return { accessToken: accessToken, succeed: true };
      } catch (error) {
        return new Error("Password is incorrect.", error);
      }
    },
  },
  Mutation: {
    createUser: async (_, { email, password, name }) => {
      try {
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
        const user = await new User({
          email: email,
          name: name,
          password: hashedPw,
        }).save();

        const token = await userService.verifyRequest(user);

        verifyRequest(user, token);
        const accessToken = jwt.sign(
          {
            userId: user._id.toString(),
            email: user.email,
          },
          "somesupersecretsecret",
          { expiresIn: "30 days" }
        );
        return { accessToken: accessToken, succeed: true };
      } catch (error) {
        return new Error("User create account was not successful.", error);
      }
    },

    resetPassword: async (_, { email }) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          const error = new Error("User not found.");
          error.code = 401;
          throw error;
        }
        const token = crypto({ length: 48, type: "url-safe" });
        const expiresIn = moment().add(7, "days");

        user.set({
          account: {
            resetPassword: {
              token,
              expiresIn,
            },
          },
        });

        await user.save();
        resetPassword(user, token);
        return { succeed: true };
      } catch (error) {
        return new Error("Password is incorrect.", error);
      }
    },

    newPassword: async (_, { token, newPassword }) => {
      try {
        const user = await User.findOne({
          "account.resetPassword.token": token,
        });
        if (!user) {
          const error = new Error("User not found.");
          error.code = 401;
          throw error;
        }
        const hash = bcrypt.hashSync(newPassword, 10);

        user.set({
          password: hash,
          account: {
            resetPassword: {
              token: null,
              expiresIn: null,
            },
          },
        });

        await user.save();

        const accessToken = jwt.sign(
          { userId: user._id },
          "somesupersecretsecret",
          {
            expiresIn: "30 days",
          }
        );
        return { accessToken: accessToken, message: "success" };
      } catch (error) {
        return new Error("Password is incorrect.", error);
      }
    },

    verifyUserRequest: async (_, { email }) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          const error = new Error("User not found.");
          error.code = 401;
          throw error;
        }
        const token = await userService.verifyRequest(user);

        verifyRequest(user, token);

        return { succeed: true };
      } catch (error) {
        return new Error("Verification request is incorrect.", error);
      }
    },

    verify: async (_, { token }) => {
      try {
        const user = await UserModel.findOne({
          "account.verification.token": token,
        });
        if (!user) {
          const error = new Error("User not found.");
          error.code = 401;
          throw error;
        }

        user.set({
          account: {
            verification: {
              verified: true,
              token: null,
              expiresIn: null,
            },
          },
        });

        await user.save();

        const accessToken = jwt.sign(
          { userId: user._id },
          "somesupersecretsecret",
          {
            expiresIn: "30 days",
          }
        );

        verify(user);

        return { accessToken: accessToken, message: "success" };
      } catch (error) {
        return new Error("verify is incorrect.", error);
      }
    },

    changePassword: async (_, { currentPassword, newPassword, email }) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          const error = new Error("User not found.");
          error.code = 401;
          throw error;
        }
        const isEqual = await bcrypt.compare(currentPassword, user.password);
        if (!isEqual) {
          const error = new Error("Password is incorrect.");
          error.code = 401;
          throw error;
        }

        const hash = bcrypt.hashSync(newPassword, 10);

        user.set({ password: hash });

        await user.save();
        return { succeed: true };
      } catch (error) {
        return new Error("verify is incorrect.", error);
      }
    },

    switchLocale: async (_, { locale, email }) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          const error = new Error("User not found.");
          error.code = 401;
          throw error;
        }
        user.set({ locale: locale });
        await user.save();

        return { succeed: true };
      } catch (error) {
        return new Error("SwitchLocale fail", error);
      }
    },

    // logOut: async (_, { user, accessToken }) => {
    //   try {
    //     // await redis.set(`expiredToken:${accessToken}`, user._id, "EX", 86400);

    //     return { succeed: true };
    //   } catch (error) {
    //     return new Error("SignOut fail", error);
    //   }
    // },
  },
};

export default user;
