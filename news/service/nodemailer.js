import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bucksheedeveloper@gmail.com",
    pass: "ymsihlamuomezgnk",
  },
});

export { transporter };
