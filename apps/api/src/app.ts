import { randomUUID } from "node:crypto";
import express, {
  type ErrorRequestHandler,
  type RequestHandler,
} from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import {
  ParticipantReferralSubmissionError,
  parseParticipantReferralSubmission,
} from "./participant.js";
import type {
  ParticipantReferral,
  ParticipantReward,
  ParticipantOverview,
  ParticipantReferralCode,
  ParticipantReferralLocale,
  ParticipantReferralSubmissionInput,
  ParticipantReferralSubmissionPolicy,
  ParticipantReferralSubmissionResult,
} from "./participant.js";

export interface ApiAppOptions {
  allowedOrigins: ReadonlySet<string>;
  checkDatabase: () => Promise<boolean>;
  verifyAccessToken: (accessToken: string) => Promise<string | null>;
  bootstrapParticipant?: (
    accessToken: string,
    verifiedUserId: string,
  ) => Promise<void>;
  getParticipantOverview?: (
    accessToken: string,
    verifiedUserId: string,
  ) => Promise<ParticipantOverview>;
  getParticipantReferralCode?: (
    accessToken: string,
    verifiedUserId: string,
  ) => Promise<ParticipantReferralCode>;
  getParticipantReferrals?: (
    accessToken: string,
    verifiedUserId: string,
  ) => Promise<ParticipantReferral[]>;
  getParticipantRewards?: (
    accessToken: string,
    verifiedUserId: string,
  ) => Promise<ParticipantReward[]>;
  getParticipantReferralSubmissionPolicy?: (
    accessToken: string,
    locale: ParticipantReferralLocale,
  ) => Promise<ParticipantReferralSubmissionPolicy | null>;
  submitParticipantReferral?: (
    accessToken: string,
    input: ParticipantReferralSubmissionInput,
  ) => Promise<ParticipantReferralSubmissionResult>;
  authSessionRateLimit?: { limit: number; windowMs: number };
  referralSubmissionRateLimit?: { limit: number; windowMs: number };
  log?: (entry: Record<string, string | number>) => void;
}

export function createApiApp({
  allowedOrigins,
  checkDatabase,
  verifyAccessToken,
  bootstrapParticipant,
  getParticipantOverview,
  getParticipantReferralCode,
  getParticipantReferrals,
  getParticipantRewards,
  getParticipantReferralSubmissionPolicy,
  submitParticipantReferral,
  authSessionRateLimit = { limit: 30, windowMs: 60_000 },
  referralSubmissionRateLimit = { limit: 5, windowMs: 15 * 60_000 },
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
  const referralSubmissionRateLimitMiddleware = rateLimit({
    windowMs: referralSubmissionRateLimit.windowMs,
    limit: referralSubmissionRateLimit.limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: (_req, res) => {
      res.setHeader("cache-control", "no-store");
      res.status(429).json({ error: "Too many submissions. Try again later." });
    },
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

  app.get("/participant/overview", sessionRateLimit, async (req, res) => {
    res.setHeader("cache-control", "no-store");
    const bearer = req.get("authorization")?.match(/^Bearer\s+([^\s]+)$/i)?.[1];
    if (!bearer)
      return res.status(401).json({ error: "Authentication required." });
    if (!getParticipantOverview)
      return res
        .status(503)
        .json({ error: "Participant service is unavailable." });
    try {
      const verifiedUserId = await verifyAccessToken(bearer);
      if (!verifiedUserId)
        return res.status(401).json({ error: "Authentication required." });
      const overview = await getParticipantOverview(bearer, verifiedUserId);
      return res.status(200).json(overview);
    } catch (error) {
      const requestId = res.getHeader("x-request-id");
      log?.({
        event: "participant_overview_error",
        requestId: typeof requestId === "string" ? requestId : "unknown",
        errorType: error instanceof Error ? error.name : "UnknownError",
      });
      return res
        .status(503)
        .json({ error: "Participant service is unavailable." });
    }
  });

  app.get("/participant/referral-link", sessionRateLimit, async (req, res) => {
    res.setHeader("cache-control", "no-store");
    const bearer = req.get("authorization")?.match(/^Bearer\s+([^\s]+)$/i)?.[1];
    if (!bearer)
      return res.status(401).json({ error: "Authentication required." });
    if (!getParticipantReferralCode)
      return res
        .status(503)
        .json({ error: "Participant service is unavailable." });
    try {
      const verifiedUserId = await verifyAccessToken(bearer);
      if (!verifiedUserId)
        return res.status(401).json({ error: "Authentication required." });
      const referralCode = await getParticipantReferralCode(
        bearer,
        verifiedUserId,
      );
      return res.status(200).json(referralCode);
    } catch (error) {
      const requestId = res.getHeader("x-request-id");
      log?.({
        event: "participant_referral_link_error",
        requestId: typeof requestId === "string" ? requestId : "unknown",
        errorType: error instanceof Error ? error.name : "UnknownError",
      });
      return res
        .status(503)
        .json({ error: "Participant service is unavailable." });
    }
  });

  app.get("/participant/referrals", sessionRateLimit, async (req, res) => {
    res.setHeader("cache-control", "no-store");
    const bearer = req.get("authorization")?.match(/^Bearer\s+([^\s]+)$/i)?.[1];
    if (!bearer)
      return res.status(401).json({ error: "Authentication required." });
    if (!getParticipantReferrals)
      return res
        .status(503)
        .json({ error: "Participant service is unavailable." });
    try {
      const verifiedUserId = await verifyAccessToken(bearer);
      if (!verifiedUserId)
        return res.status(401).json({ error: "Authentication required." });
      const referrals = await getParticipantReferrals(bearer, verifiedUserId);
      return res.status(200).json({ referrals });
    } catch (error) {
      const requestId = res.getHeader("x-request-id");
      log?.({
        event: "participant_referrals_error",
        requestId: typeof requestId === "string" ? requestId : "unknown",
        errorType: error instanceof Error ? error.name : "UnknownError",
      });
      return res
        .status(503)
        .json({ error: "Participant service is unavailable." });
    }
  });

  app.get(
    "/participant/referral-submission-policy",
    sessionRateLimit,
    async (req, res) => {
      res.setHeader("cache-control", "no-store");
      const bearer = req
        .get("authorization")
        ?.match(/^Bearer\s+([^\s]+)$/i)?.[1];
      if (!bearer)
        return res.status(401).json({ error: "Authentication required." });
      if (!getParticipantReferralSubmissionPolicy)
        return res
          .status(503)
          .json({ error: "Participant service is unavailable." });

      const locale = req.query["locale"];
      if (
        locale !== "en" &&
        locale !== "tr" &&
        locale !== "fr" &&
        locale !== "sw"
      )
        return res.status(400).json({ error: "Invalid request." });

      try {
        const verifiedUserId = await verifyAccessToken(bearer);
        if (!verifiedUserId)
          return res.status(401).json({ error: "Authentication required." });
        if (
          locale !== "en" &&
          locale !== "tr" &&
          locale !== "fr" &&
          locale !== "sw"
        )
          return res.status(400).json({ error: "Invalid request." });
        const policy = await getParticipantReferralSubmissionPolicy(
          bearer,
          locale,
        );
        if (!policy) return res.status(200).json({ available: false });
        return res.status(200).json({ available: true, ...policy });
      } catch (error) {
        const requestId = res.getHeader("x-request-id");
        log?.({
          event: "participant_referral_policy_error",
          requestId: typeof requestId === "string" ? requestId : "unknown",
          errorType: error instanceof Error ? error.name : "UnknownError",
        });
        return res
          .status(503)
          .json({ error: "Participant service is unavailable." });
      }
    },
  );

  app.post(
    "/participant/referrals",
    referralSubmissionRateLimitMiddleware,
    async (req, res) => {
      res.setHeader("cache-control", "no-store");
      const bearer = req
        .get("authorization")
        ?.match(/^Bearer\s+([^\s]+)$/i)?.[1];
      if (!bearer)
        return res.status(401).json({ error: "Authentication required." });
      if (!submitParticipantReferral)
        return res
          .status(503)
          .json({ error: "Participant service is unavailable." });

      const input = parseParticipantReferralSubmission(req.body);
      if (!input)
        return res.status(400).json({ error: "Invalid referral submission." });

      try {
        const verifiedUserId = await verifyAccessToken(bearer);
        if (!verifiedUserId)
          return res.status(401).json({ error: "Authentication required." });
        const result = await submitParticipantReferral(bearer, input);
        return res.status(201).json(result);
      } catch (error) {
        if (error instanceof ParticipantReferralSubmissionError) {
          if (error.code === "P1101")
            return res.status(409).json({ error: "submission_unavailable" });
          if (error.code === "P1102")
            return res.status(409).json({ error: "idempotency_conflict" });
          if (error.code === "P1103")
            return res.status(409).json({ error: "policy_changed" });
          if (error.code === "P1104")
            return res.status(429).json({ error: "rate_limited" });
        }

        const requestId = res.getHeader("x-request-id");
        log?.({
          event: "participant_referral_submission_error",
          requestId: typeof requestId === "string" ? requestId : "unknown",
          errorType: error instanceof Error ? error.name : "UnknownError",
        });
        return res
          .status(503)
          .json({ error: "Participant referral submission is unavailable." });
      }
    },
  );

  app.get("/participant/rewards", sessionRateLimit, async (req, res) => {
    res.setHeader("cache-control", "no-store");
    const bearer = req.get("authorization")?.match(/^Bearer\s+([^\s]+)$/i)?.[1];
    if (!bearer)
      return res.status(401).json({ error: "Authentication required." });
    if (!getParticipantRewards)
      return res
        .status(503)
        .json({ error: "Participant service is unavailable." });
    try {
      const verifiedUserId = await verifyAccessToken(bearer);
      if (!verifiedUserId)
        return res.status(401).json({ error: "Authentication required." });
      const rewards = await getParticipantRewards(bearer, verifiedUserId);
      return res.status(200).json({ rewards });
    } catch (error) {
      const requestId = res.getHeader("x-request-id");
      log?.({
        event: "participant_rewards_error",
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
