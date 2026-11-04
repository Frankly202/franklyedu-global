import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer } from "node:http";
import test from "node:test";

import { createApiApp } from "../dist/src/app.js";

const origin = "https://franklyedu.com";
const verifiedUserId = "1d1ebd10-3f1e-4ab1-929f-44432f6600e1";

async function withServer(options, run) {
  const server = createServer(
    createApiApp({
      allowedOrigins: new Set([origin]),
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

test("live health is public and emits no credential or data headers", async () => {
  await withServer({}, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/health/live`, {
      headers: { origin },
    });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
    assert.equal(response.headers.get("access-control-allow-origin"), origin);
    assert.equal(
      response.headers.get("access-control-allow-credentials"),
      "true",
    );
    assert.ok(response.headers.get("x-request-id"));
    assert.equal(response.headers.get("x-powered-by"), null);
  });
});

test("readiness reports database failure without leaking its cause", async () => {
  await withServer(
    {
      checkDatabase: async () => {
        throw new Error("sensitive database detail");
      },
    },
    async (baseUrl) => {
      const response = await fetch(`${baseUrl}/health/ready`);
      assert.equal(response.status, 503);
      assert.deepEqual(await response.json(), { status: "unavailable" });
    },
  );
});

test("CORS rejects unapproved origins and handles approved preflight", async () => {
  await withServer({}, async (baseUrl) => {
    const denied = await fetch(`${baseUrl}/health/live`, {
      headers: { origin: "https://unapproved.example" },
    });
    assert.equal(denied.status, 403);
    assert.equal(denied.headers.get("access-control-allow-origin"), null);

    const preflight = await fetch(`${baseUrl}/health/ready`, {
      method: "OPTIONS",
      headers: {
        origin,
        "access-control-request-method": "POST",
      },
    });
    assert.equal(preflight.status, 204);
    assert.equal(preflight.headers.get("access-control-allow-origin"), origin);
    assert.equal(
      preflight.headers.get("access-control-allow-credentials"),
      "true",
    );
  });
});

test("request logs omit URLs, origins, and request data", async () => {
  const entries = [];
  await withServer({ log: (entry) => entries.push(entry) }, async (baseUrl) => {
    await fetch(`${baseUrl}/health/live?student=private`, {
      headers: {
        origin,
        authorization: "Bearer do-not-log",
        "content-type": "application/json",
      },
    });
    await new Promise((resolve) => setTimeout(resolve, 10));
    assert.equal(entries.length, 1);
    const serialized = JSON.stringify(entries[0]);
    assert.equal(serialized.includes("private"), false);
    assert.equal(serialized.includes(origin), false);
    assert.equal(serialized.includes("do-not-log"), false);
  });
});

test("unknown routes return a generic not-found response", async () => {
  await withServer({}, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/unknown`);
    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: "Not found." });
  });
});

test("malformed and oversized JSON receive safe client errors", async () => {
  await withServer({}, async (baseUrl) => {
    const malformed = await fetch(`${baseUrl}/unknown`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{",
    });
    assert.equal(malformed.status, 400);
    assert.deepEqual(await malformed.json(), { error: "Invalid request." });

    const oversized = await fetch(`${baseUrl}/unknown`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ value: "x".repeat(17_000) }),
    });
    assert.equal(oversized.status, 413);
    assert.deepEqual(await oversized.json(), {
      error: "Request body is too large.",
    });
  });
});

test("session endpoint requires a verified bearer token and ignores client actor headers", async () => {
  await withServer({}, async (baseUrl) => {
    const missing = await fetch(`${baseUrl}/auth/session`);
    assert.equal(missing.status, 401);
    assert.deepEqual(await missing.json(), {
      error: "Authentication required.",
    });

    const invalid = await fetch(`${baseUrl}/auth/session`, {
      headers: { authorization: "Bearer invalid-token" },
    });
    assert.equal(invalid.status, 401);

    const verified = await fetch(`${baseUrl}/auth/session`, {
      headers: {
        authorization: "Bearer verified-token",
        "x-user-id": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
      },
    });
    assert.equal(verified.status, 200);
    assert.deepEqual(await verified.json(), { userId: verifiedUserId });
    assert.equal(verified.headers.get("cache-control"), "no-store");
  });
});

test("participant bootstrap requires a verified token and derives identity server-side", async () => {
  const calls = [];
  await withServer(
    {
      bootstrapParticipant: async (token, actorId) => {
        calls.push({ token, actorId });
      },
    },
    async (baseUrl) => {
      const missing = await fetch(`${baseUrl}/participant/bootstrap`, {
        method: "POST",
      });
      assert.equal(missing.status, 401);
      const denied = await fetch(`${baseUrl}/participant/bootstrap`, {
        method: "POST",
        headers: { authorization: "Bearer invalid" },
        body: JSON.stringify({ participantId: "attacker-controlled" }),
      });
      assert.equal(denied.status, 401);
      assert.equal(calls.length, 0);
      const response = await fetch(`${baseUrl}/participant/bootstrap`, {
        method: "POST",
        headers: {
          authorization: "Bearer verified-token",
          "content-type": "application/json",
          "x-participant-id": "attacker-controlled",
        },
        body: JSON.stringify({
          participantId: "attacker-controlled",
          role: "admin",
        }),
      });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.deepEqual(await response.json(), { status: "ready" });
      assert.deepEqual(calls, [
        { token: "verified-token", actorId: verifiedUserId },
      ]);
    },
  );
});

test("participant bootstrap failures return a generic server error", async () => {
  await withServer(
    {
      bootstrapParticipant: async () => {
        throw new Error("private database detail");
      },
    },
    async (baseUrl) => {
      const response = await fetch(`${baseUrl}/participant/bootstrap`, {
        method: "POST",
        headers: { authorization: "Bearer verified-token" },
      });
      assert.equal(response.status, 503);
      assert.deepEqual(await response.json(), {
        error: "Participant service is unavailable.",
      });
    },
  );
});

test("session endpoint throttles repeated verification requests", async () => {
  await withServer(
    { authSessionRateLimit: { limit: 2, windowMs: 60_000 } },
    async (baseUrl) => {
      for (let request = 0; request < 2; request += 1) {
        const response = await fetch(`${baseUrl}/auth/session`, {
          headers: { authorization: "Bearer verified-token" },
        });
        assert.equal(response.status, 200);
      }

      const limited = await fetch(`${baseUrl}/auth/session`, {
        headers: { authorization: "Bearer verified-token" },
      });
      assert.equal(limited.status, 429);
      assert.deepEqual(await limited.json(), {
        error: "Too many session checks. Try again later.",
      });
    },
  );
});
