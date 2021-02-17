import { transporter } from "../nodemailer";
import ejs from "ejs";

const verifyRequest = async (user, token) => {
  ejs.renderFile(
    __dirname + "/template/verify-request/html.ejs",
    {
      locale: user.locale,
      token,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var mainOptions = {
          from: '"Verification request" <no-replay@example.com>',
          to: user.email,
          subject: "Verify request",
          html: data,
        };
        console.log("html data ======================>", mainOptions.html);
        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log("Message sent: " + info.response);
          }
        });
      }
    }
  );
};

const verify = (user) => {
  ejs.renderFile(
    __dirname + "/template/verify/html.ejs",
    {
      locale: user.locale,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var mainOptions = {
          from: '"Verification request" <no-replay@example.com>',
          to: user.email,
          subject: "Account verified",
          html: data,
        };
        console.log("html data ======================>", mainOptions.html);
        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log("Message sent: " + info.response);
          }
        });
      }
    }
  );
};

const resetPassword = (user, token) => {
  ejs.renderFile(
    __dirname + "/template/reset-password/html.ejs",
    {
      locale: user.locale,
      token,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var mainOptions = {
          from: '"Verification request" <no-replay@example.com>',
          to: user.email,
          subject: "Reset password",
          html: data,
        };
        console.log("html data ======================>", mainOptions.html);
        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log("Message sent: " + info.response);
          }
        });
      }
    }
  );
};

export { verify, resetPassword, verifyRequest };
