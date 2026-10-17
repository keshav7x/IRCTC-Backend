import "dotenv/config"

import * as z from "zod"
import name from "../../package.json"
export const config = z.object({
  SERVICE_NAME: z.string() || "user-service",
  PORT: z.coerce.number() || 4001,
  NODE_ENV: z.string() || "DEV",
  LOG_LEVEL: z.string() || "info",
  DATABASE_URL : z.string(),
  REDIS_URL: z.string(),
  OTP_TTL:z.coerce.number(),
  OTP_MAX_VERIFY_ATTEMPTS:z.coerce.number(),
  OTP_RATE_MAX_PER_HOUR: z.coerce.number(),
  OTP_HMAC_SECRET:z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  ACCESS_TOKEN_EXP:z.coerce.number(),
  REFRESH_TOKEN_EXP:z.coerce.number(),
  ACCESS_TOKEN_EXP_SEC:z.coerce.number(),
  REFRESH_TOKEN_EXP_SEC:z.coerce.number(),
  REDIS_USER_TTL: z.coerce.number(),
})

export const envConfig = config.parse(process.env)

export type EnvConfig = z.infer<typeof config>;
