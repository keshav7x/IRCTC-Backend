
import winston from "winston";
import { envConfig } from "./index";

const { combine, timestamp, errors, json, colorize, printf, splat } =winston.format;

const isProduction = envConfig.NODE_ENV === "production";

const developmentFormat = combine(
  colorize(),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  splat(),
  printf(({ timestamp, level, message, stack, ...metadata }) => {
    const extra = Object.keys(metadata).length
      ? ` ${JSON.stringify(metadata)}`
      : "";

    return `${timestamp} [${level}]: ${stack ?? message}${extra}`;
  }),
);

export const logger = winston.createLogger({
  level: envConfig.LOG_LEVEL,

  defaultMeta: {
    service: envConfig.SERVICE_NAME,
  },

  format: combine(
    timestamp(),
    errors({ stack: true }),
    splat(),
    json(),
  ),

  transports: [
    new winston.transports.Console({
      format: isProduction ? combine(timestamp(), errors({ stack: true }), json()) : developmentFormat,
    }),
  ],

  exitOnError: false,
});
