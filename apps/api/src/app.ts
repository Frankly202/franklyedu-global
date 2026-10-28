import { randomUUID } from "node:crypto";
import express, { type ErrorRequestHandler, type RequestHandler } from "express";
import helmet from "helmet";

export interface ApiAppOptions {
  allowedOrigins: ReadonlySet<string>;
  checkDatabase: () => Promise<boolean>;
  log?: (entry: Record<string, string | number>) => void;
}

export function createApiApp({ allowedOrigins, checkDatabase, log }: ApiAppOptions) {
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet());

  const requestLogger: RequestHandler = (req, res, next) => {
    const requestId = randomUUID();
    const startedAt = performance.now();
    res.setHeader("x-request-id", requestId);
    res.on("finish", () => {
      log?.({
        event: "http_request",
        requestId,
        method: req.method,
        status: res.statusCode,
        durationMs: Math.round(performance.now() - startedAt),
      });
    });
    next();
  };
  app.use(requestLogger);

  app.use((req, res, next) => {
    const origin = req.get("origin");
    if (!origin) {
      if (req.method === "OPTIONS") return res.sendStatus(204);
      return next();
    }

    res.vary("Origin");
    if (!allowedOrigins.has(origin)) {
      return res.status(403).json({ error: "Origin is not allowed." });
    }

    res.setHeader("access-control-allow-origin", origin);
    res.setHeader("access-control-allow-credentials", "true");
    if (req.method === "OPTIONS") {
      res.setHeader("access-control-allow-methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
      res.setHeader("access-control-allow-headers", "Content-Type, Authorization, X-CSRF-Token");
      return res.sendStatus(204);
    }
    next();
  });

  app.use(express.json({ limit: "16kb", strict: true }));

  app.get("/health/live", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.get("/health/ready", async (_req, res) => {
    try {
      if (!(await checkDatabase())) throw new Error("Readiness check failed.");
      res.status(200).json({ status: "ready" });
    } catch {
      res.status(503).json({ status: "unavailable" });
    }
  });

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found." });
  });

  const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, _next) => {
    void _next;
    const requestId = res.getHeader("x-request-id");
    log?.({
      event: "http_error",
      requestId: typeof requestId === "string" ? requestId : "unknown",
      errorType: error instanceof Error ? error.name : "UnknownError",
    });
    if (res.headersSent) return;
    const status =
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      (error.status === 400 || error.status === 413)
        ? error.status
        : 500;
    const message =
      status === 413
        ? "Request body is too large."
        : status === 400
          ? "Invalid request."
          : "Internal server error.";
    res.status(status).json({ error: message });
  };
  app.use(errorHandler);

  return app;
}
