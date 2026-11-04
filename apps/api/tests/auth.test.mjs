import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer } from "node:http";
import test from "node:test";
import { createApiApp } from "../dist/src/app.js";
import { createAccessTokenVerifier } from "../dist/src/auth.js";

test("Supabase rejection returns 401; Auth outages return safe 503, not invalid credentials", async () => {
  let providerStatus = 403;
  const verifiedActor = "1d1ebd10-3f1e-4ab1-929f-44432f6600e1";
  const provider = createServer((_req, res) => {
    res.writeHead(providerStatus, { "content-type": "application/json" });
    res.end(
      JSON.stringify(
        providerStatus === 200
          ? { id: verifiedActor, aud: "authenticated", role: "authenticated" }
          : { message: "private provider error", code: "bad_jwt" },
      ),
    );
  });
  provider.listen(0, "127.0.0.1");
  await once(provider, "listening");
  const providerAddress = provider.address();
  assert.ok(providerAddress && typeof providerAddress !== "string");
  const app = createServer(
    createApiApp({
      allowedOrigins: new Set(),
      checkDatabase: async () => true,
      verifyAccessToken: createAccessTokenVerifier(
        `http://127.0.0.1:${providerAddress.port}`,
        "test-only-anon-placeholder",
      ),
    }),
  );
  app.listen(0, "127.0.0.1");
  await once(app, "listening");
  const appAddress = app.address();
  assert.ok(appAddress && typeof appAddress !== "string");
  try {
    for (const status of [400, 401, 403, 429, 503]) {
      providerStatus = status;
      const response = await fetch(
        `http://127.0.0.1:${appAddress.port}/auth/session`,
        {
          headers: { authorization: "Bearer test-only-invalid-token" },
        },
      );
      const unavailable = status === 429 || status >= 500;
      assert.equal(response.status, unavailable ? 503 : 401);
      assert.deepEqual(await response.json(), {
        error: unavailable
          ? "Authentication is temporarily unavailable."
          : "Authentication required.",
      });
    }
    providerStatus = 200;
    const verified = await fetch(
      `http://127.0.0.1:${appAddress.port}/auth/session`,
      {
        headers: {
          authorization: "Bearer test-only-provider-verified-token",
          "x-user-id": "untrusted-client-actor",
        },
      },
    );
    assert.equal(verified.status, 200);
    assert.deepEqual(await verified.json(), { userId: verifiedActor });
  } finally {
    app.close();
    await once(app, "close");
    provider.close();
    await once(provider, "close");
  }
});
