import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer } from "node:http";
import test from "node:test";
import { createParticipantBootstrap } from "../dist/src/participant.js";

test("user-scoped bootstrap uses verified JWT context and verifies the RLS-owned row", async () => {
  const expectedUserId = "1d1ebd10-3f1e-4ab1-929f-44432f6600e1";
  const requests = [];
  const provider = createServer((req, res) => {
    requests.push({
      method: req.method,
      url: req.url,
      authorization: req.headers.authorization,
      apikey: req.headers.apikey,
    });
    res.setHeader("content-type", "application/json");
    if (req.url === "/rest/v1/rpc/bootstrap_referral_participant") {
      res.end("true");
      return;
    }
    res.end(JSON.stringify([{ user_id: expectedUserId }]));
  });
  provider.listen(0, "127.0.0.1");
  await once(provider, "listening");
  const address = provider.address();
  assert.ok(address && typeof address !== "string");
  try {
    await createParticipantBootstrap(
      `http://127.0.0.1:${address.port}`,
      "public-anon-placeholder",
    )("provider-verified-token", expectedUserId);
    assert.equal(requests.length, 2);
    for (const request of requests) {
      assert.equal(request.authorization, "Bearer provider-verified-token");
      assert.equal(request.apikey, "public-anon-placeholder");
    }
    assert.equal(requests[0].method, "POST");
    assert.equal(
      requests[0].url,
      "/rest/v1/rpc/bootstrap_referral_participant",
    );
    assert.match(
      requests[1].url ?? "",
      new RegExp(`user_id=eq\\.${expectedUserId}`),
    );
    assert.match(requests[1].url ?? "", /select=user_id/);
  } finally {
    provider.close();
    await once(provider, "close");
  }
});

test("user-scoped bootstrap fails closed when RLS does not return the verified participant", async () => {
  const provider = createServer((req, res) => {
    res.setHeader("content-type", "application/json");
    res.end(req.url?.includes("/rpc/") ? "false" : "[]");
  });
  provider.listen(0, "127.0.0.1");
  await once(provider, "listening");
  const address = provider.address();
  assert.ok(address && typeof address !== "string");
  try {
    await assert.rejects(
      createParticipantBootstrap(
        `http://127.0.0.1:${address.port}`,
        "public-anon-placeholder",
      )("provider-verified-token", "1d1ebd10-3f1e-4ab1-929f-44432f6600e1"),
      /Participant ownership verification failed/,
    );
  } finally {
    provider.close();
    await once(provider, "close");
  }
});
