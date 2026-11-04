import { randomUUID } from "node:crypto";
import express, {
  type ErrorRequestHandler,
  type RequestHandler,
} from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";

export interface ApiAppOptions {
  allowedOrigins: ReadonlySet<string>;
  checkDatabase: () => Promise<boolean>;
  verifyAccessToken: (accessToken: string) => Promise<string | null>;
  bootstrapParticipant?: (
    accessToken: string,
    verifiedUserId: string,
  ) => Promise<void>;
  authSessionRateLimit?: { limit: number; windowMs: number };
  log?: (entry: Record<string, string | number>) => void;
}

export function createApiApp({
  allowedOrigins,
  checkDatabase,
  verifyAccessToken,
  bootstrapParticipant,
  authSessionRateLimit = { limit: 30, windowMs: 60_000 },
  log,
}: ApiAppOptions) {
  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", 1);
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
      res.setHeader(
        "access-control-allow-methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      );
      res.setHeader(
        "access-control-allow-headers",
        "Content-Type, Authorization, X-CSRF-Token",
      );
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

  const sessionRateLimit = rateLimit({
    windowMs: authSessionRateLimit.windowMs,
    limit: authSessionRateLimit.limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Too many session checks. Try again later." },
  });

  app.get("/auth/session", sessionRateLimit, async (req, res) => {
    res.setHeader("cache-control", "no-store");
    const authorization = req.get("authorization");
    const bearer = authorization?.match(/^Bearer ([^\s,]{1,8192})$/i)?.[1];
    if (!bearer)
      return res.status(401).json({ error: "Authentication required." });

    try {
      const userId = await verifyAccessToken(bearer);
      if (!userId)
        return res.status(401).json({ error: "Authentication required." });
      return res.status(200).json({ userId });
    } catch (error) {
      const requestId = res.getHeader("x-request-id");
      log?.({
        event: "auth_verification_error",
        requestId: typeof requestId === "string" ? requestId : "unknown",
        errorType: error instanceof Error ? error.name : "UnknownError",
      });

      return res
        .status(503)
        .json({ error: "Authentication is temporarily unavailable." });
    }
  });

  app.post("/participant/bootstrap", sessionRateLimit, async (req, res) => {
    res.setHeader("cache-control", "no-store");
    const bearer = req.get("authorization")?.match(/^Bearer\s+([^\s]+)$/i)?.[1];
    if (!bearer)
      return res.status(401).json({ error: "Authentication required." });
    if (!bootstrapParticipant)
      return res
        .status(503)
        .json({ error: "Participant service is unavailable." });
    try {
      const verifiedUserId = await verifyAccessToken(bearer);
      if (!verifiedUserId)
        return res.status(401).json({ error: "Authentication required." });
      await bootstrapParticipant(bearer, verifiedUserId);
      return res.status(200).json({ status: "ready" });
    } catch (error) {
      const requestId = res.getHeader("x-request-id");
      log?.({
        event: "participant_bootstrap_error",
        requestId: typeof requestId === "string" ? requestId : "unknown",
        errorType: error instanceof Error ? error.name : "UnknownError",
      });
      return res
        .status(503)
        .json({ error: "Participant service is unavailable." });
    }
  });

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found." });
  });

  const errorHandler: ErrorRequestHandler = (
    error: unknown,
    _req,
    res,
    _next,
  ) => {
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
