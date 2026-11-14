import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer } from "node:http";
import test from "node:test";

import { createApiApp } from "../dist/src/app.js";
import { ParticipantReferralSubmissionError } from "../dist/src/participant.js";

const verifiedUserId = "1d1ebd10-3f1e-4ab1-929f-44432f6600e1";
const submission = {
  studentName: "  Synthetic   Student ",
  studentEmail: " Student@Example.test ",
  studentPhone: null,
  locale: "en",
  policyVersion: "fixture-only",
  consentAccepted: true,
  idempotencyKey: "00000000-0000-4000-8000-000000000304",
};

async function withServer(options, run) {
  const server = createServer(
    createApiApp({
      allowedOrigins: new Set(),
      checkDatabase: async () => true,
      verifyAccessToken: async (token) =>
        token === "verified-token" ? verifiedUserId : null,
      ...options,
    }),
  );
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    server.close();
    await once(server, "close");
  }
}

test("referral submission policy is authenticated, localized, and no-store", async () => {
  const calls = [];
  await withServer(
    {
      getParticipantReferralSubmissionPolicy: async (token, locale) => {
        calls.push({ token, locale });
        return locale === "en"
          ? {
              policyVersion: "fixture-only",
              noticeText: "Synthetic test-only notice.",
              consentText: "Synthetic test-only consent.",
            }
          : null;
      },
    },
    async (baseUrl) => {
      const missing = await fetch(
        `${baseUrl}/participant/referral-submission-policy?locale=en`,
      );
      assert.equal(missing.status, 401);

      const invalid = await fetch(
        `${baseUrl}/participant/referral-submission-policy?locale=en`,
        { headers: { authorization: "Bearer invalid-token" } },
      );
      assert.equal(invalid.status, 401);
      assert.equal(calls.length, 0);

      const invalidLocale = await fetch(
        `${baseUrl}/participant/referral-submission-policy?locale=de`,
        { headers: { authorization: "Bearer verified-token" } },
      );
      assert.equal(invalidLocale.status, 400);
      assert.equal(calls.length, 0);

      const available = await fetch(
        `${baseUrl}/participant/referral-submission-policy?locale=en`,
        {
          headers: {
            authorization: "Bearer verified-token",
            "x-user-id": "attacker-controlled",
          },
        },
      );
      assert.equal(available.status, 200);
      assert.equal(available.headers.get("cache-control"), "no-store");
      assert.deepEqual(await available.json(), {
        available: true,
        policyVersion: "fixture-only",
        noticeText: "Synthetic test-only notice.",
        consentText: "Synthetic test-only consent.",
      });

      const unavailable = await fetch(
        `${baseUrl}/participant/referral-submission-policy?locale=tr`,
        { headers: { authorization: "Bearer verified-token" } },
      );
      assert.equal(unavailable.status, 200);
      assert.deepEqual(await unavailable.json(), { available: false });
      assert.deepEqual(calls, [
        { token: "verified-token", locale: "en" },
        { token: "verified-token", locale: "tr" },
      ]);
    },
  );
});

test("referral submission validates consent, ignores spoofed identity, and excludes PII from responses", async () => {
  const calls = [];
  await withServer(
    {
      submitParticipantReferral: async (token, input) => {
        calls.push({ token, input });
        return {
          reference: "FE-0123456789ABCDEF01234567",
          status: "submitted",
          createdAt: "2026-11-15T10:30:00.000Z",
          reviewRequired: true,
        };
      },
    },
    async (baseUrl) => {
      const missing = await fetch(`${baseUrl}/participant/referrals`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(submission),
      });
      assert.equal(missing.status, 401);

      const invalid = await fetch(`${baseUrl}/participant/referrals`, {
        method: "POST",
        headers: {
          authorization: "Bearer verified-token",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...submission,
          participantId: "attacker-controlled",
        }),
      });
      assert.equal(invalid.status, 400);
      assert.equal(calls.length, 0);

      const response = await fetch(`${baseUrl}/participant/referrals`, {
        method: "POST",
        headers: {
          authorization: "Bearer verified-token",
          "content-type": "application/json",
          "x-user-id": "attacker-controlled",
        },
        body: JSON.stringify(submission),
      });
      assert.equal(response.status, 201);
      assert.equal(response.headers.get("cache-control"), "no-store");
      const result = await response.json();
      assert.deepEqual(result, {
        reference: "FE-0123456789ABCDEF01234567",
        status: "submitted",
        createdAt: "2026-11-15T10:30:00.000Z",
        reviewRequired: true,
      });
      assert.equal(JSON.stringify(result).includes("Synthetic Student"), false);
      assert.equal(JSON.stringify(result).includes("Example.test"), false);
      assert.deepEqual(calls, [
        {
          token: "verified-token",
          input: {
            studentName: "Synthetic Student",
            studentEmail: "Student@Example.test",
            studentPhone: null,
            locale: "en",
            policyVersion: "fixture-only",
            consentAccepted: true,
            idempotencyKey: submission.idempotencyKey,
          },
        },
      ]);
    },
  );
});

test("idempotency conflicts are mapped without provider details", async () => {
  await withServer(
    {
      submitParticipantReferral: async () => {
        throw new ParticipantReferralSubmissionError(
          "private submission detail",
          "P1102",
        );
      },
    },
    async (baseUrl) => {
      const response = await fetch(`${baseUrl}/participant/referrals`, {
        method: "POST",
        headers: {
          authorization: "Bearer verified-token",
          "content-type": "application/json",
        },
        body: JSON.stringify(submission),
      });
      assert.equal(response.status, 409);
      assert.deepEqual(await response.json(), {
        error: "idempotency_conflict",
      });
      assert.equal(response.headers.get("cache-control"), "no-store");
    },
  );
});

test("database participant rate limits are mapped to a no-store 429 response", async () => {
  await withServer(
    {
      submitParticipantReferral: async () => {
        throw new ParticipantReferralSubmissionError(
          "private rate limit detail",
          "P1104",
        );
      },
    },
    async (baseUrl) => {
      const response = await fetch(`${baseUrl}/participant/referrals`, {
        method: "POST",
        headers: {
          authorization: "Bearer verified-token",
          "content-type": "application/json",
        },
        body: JSON.stringify(submission),
      });
      assert.equal(response.status, 429);
      assert.deepEqual(await response.json(), { error: "rate_limited" });
      assert.equal(response.headers.get("cache-control"), "no-store");
    },
  );
});

test("submission throttling returns a no-store response", async () => {
  await withServer(
    {
      referralSubmissionRateLimit: { limit: 1, windowMs: 60_000 },
      submitParticipantReferral: async () => ({
        reference: "FE-0123456789ABCDEF01234567",
        status: "submitted",
        createdAt: "2026-11-15T10:30:00.000Z",
        reviewRequired: false,
      }),
    },
    async (baseUrl) => {
      const request = () =>
        fetch(`${baseUrl}/participant/referrals`, {
          method: "POST",
          headers: {
            authorization: "Bearer verified-token",
            "content-type": "application/json",
          },
          body: JSON.stringify(submission),
        });
      assert.equal((await request()).status, 201);
      const limited = await request();
      assert.equal(limited.status, 429);
      assert.equal(limited.headers.get("cache-control"), "no-store");
      assert.deepEqual(await limited.json(), {
        error: "Too many submissions. Try again later.",
      });
    },
  );
});
