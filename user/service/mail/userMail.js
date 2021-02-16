import winston from "winston";
import { mail, transporter } from "../nodemailer";
import ejs from "ejs";

const verifyRequest = async (user, token) => {
  // const mailOptions = {
  //   from: '"Verification request" <no-replay@example.com>',
  //   to: user.email,
  //   subject: "Invoices due",
  //   text: token,
  // };
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });

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
          subject: "Hello, world",
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

  // mail
  //   .send({
  //     template: "template/verify-request",
  //     message: {
  //       from: '"Verification request" <no-replay@example.com>',
  //       to: user.email,
  //       subject: "Verification request",
  //     },
  //     locals: {
  //       locale: user.locale,
  //       token,
  //     },
  //   })
  //   .catch((error) => winston.error(error));
};

const verify = (user) => {
  mail
    .send({
      template: "template/verify",
      message: {
        from: '"Verification" <no-replay@example.com>',
        to: user.email,
        subject: "Verification",
      },
      locals: { locale: user.locale },
    })
    .catch((error) => winston.error(error));
};

const resetPassword = (user, token) => {
  mail
    .send({
      template: "template/reset-password",
      message: {
        from: '"Reset Password" <no-replay@example.com>',
        to: user.email,
        subject: "Reset Password",
      },
      locals: {
        locale: user.locale,
        token,
      },
    })
    .catch((error) => winston.error(error));
};

export { verify, resetPassword, verifyRequest };
