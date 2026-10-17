import type{ NextFunction, Request, RequestHandler, Response } from "express";
import { randomUUID } from "crypto";
import { logger } from "../config/logger";

export const requestLogger:
  RequestHandler =
  (req: Request, res: Response, next: NextFunction) => {
    const requestId = randomUUID()
    const startTime = process.hrtime.bigint();
    res.setHeader("X-Request-ID", requestId);
    res.on("finish", () => {
      const durationMs =Number(process.hrtime.bigint() - startTime) / 1_000_000;

      logger.info("HTTP request completed", {
        requestId,
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        durationMs: Number(durationMs.toFixed(2)),
      });
    });
}
