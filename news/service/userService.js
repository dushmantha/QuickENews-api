import crypto from "crypto-random-string";
import moment from "moment";

const userService = {
  verifyRequest: async (user) => {
    const token = crypto({ length: 6, type: "alphanumeric" });
    const expiresIn = moment().add(7, "days");

    user.set({
      account: {
        verification: {
          token,
          expiresIn,
        },
      },
    });

    await user.save();

    return token;
  },

  resetPassword: async (user) => {
    const token = crypto({ length: 6, type: "alphanumeric" });
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

    return token;
  },
};

export { userService };
