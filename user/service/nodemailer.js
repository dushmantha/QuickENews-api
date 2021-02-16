import path from "path";
import nodemailer from "nodemailer";
import Email from "email-templates";
import i18next from "i18next";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bucksheedeveloper@gmail.com",
    pass: "ymsihlamuomezgnk",
  },
});

const mail = new Email({
  views: {
    root: path.join(__dirname, "../../view/template"),
    locals: {
      i18n: i18next,
    },
    options: { extension: "ejs" },
  },
  preview: false,
  send: true,
  transport: transporter,
});

export { mail, transporter };
