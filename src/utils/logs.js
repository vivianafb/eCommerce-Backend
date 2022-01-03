import winston from "winston";

const { createLogger, format, transports } = winston;
const { combine, printf, timestamp, colorize } = format;

const logConfiguration = {
  level: "info",
  format: combine(
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    colorize(),
    printf((info) => `${info.level} |  ${[info.timestamp]} | ${info.message}`)
  ),
  transports: [
    new transports.Console(),
    new winston.transports.File({
      filename: "./logs/warn.log",
      level: "warn",
    }),
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
  ],
};

export const logger = createLogger(logConfiguration);
