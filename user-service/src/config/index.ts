import * as z from "zod"
import name from "../../package.json"
export const config = z.object({
  SERVICE_NAME: name.name || "user-service",
  PORT: z.number() || 4001,
  NODE_ENV: z.string() || "DEV",
  LOG_LEVEL: z.string() || "info",
  DATABASE_URL : z.string(),
  REDIS_URL: z.string(),
  OTP_TTL:z.number(),
  OTP_MAX_VERIFY_ATTEMPTS:z.number(),
  OTP_RATE_MAX_PER_HOUR: z.number(),
  OTP_HMAC_SECRET:z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  ACCESS_TOKEN_EXP:z.number(),
  REFRESH_TOKEN_EXP:z.number(),
  ACCESS_TOKEN_EXP_SEC:z.number(),
  REFRESH_TOKEN_EXP_SEC:z.number(),
  REDIS_USER_TTL: z.number(),
})

export const envConfig = config.parse(process.env)

export type EnvConfig = z.infer<typeof config>;
