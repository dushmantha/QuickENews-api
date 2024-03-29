import winston from "winston";
const {
  format: { combine, timestamp, json },
} = winston;

winston.configure({
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
  transports: [new winston.transports.File({ filename: "api-logs.log" })],
});
