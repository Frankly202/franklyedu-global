import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";
import { parseEnv } from "node:util";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer as createViteServer } from "vite";
import { chromium } from "playwright";

let web, browser, accountId, config;
const mailIds = [];
const originalFetch = globalThis.fetch;
let recoverRequests = 0;
let requestFailure = false;
let verificationFailure;
try {
  const result = spawnSync("supabase", ["status", "--output", "env"], {
    cwd: resolve("../api"),
    encoding: "utf8",
  });
  assert.equal(result.status, 0, "Approved local Supabase must be running.");
  config = parseEnv(result.stdout);
  for (const key of ["API_URL", "MAILPIT_URL"]) {
    const url = new URL(config[key]);
    assert.ok(
      url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname),
      "Tests require loopback services.",
    );
  }
  const toml = await readFile("../api/supabase/config.toml", "utf8");
  assert.ok(toml.includes('"http://localhost:5173/referrals/recovery/callback"'));
  globalThis.fetch = (input, options) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    if (!["localhost", "127.0.0.1"].includes(url.hostname))
      throw new Error("Recovery tests cannot contact hosted services.");
    if (url.pathname === "/auth/v1/recover") {
      recoverRequests++;
      if (requestFailure)
        return Promise.resolve(Response.json({ message: "Test outage" }, { status: 503 }));
    }
    if (url.pathname === "/auth/v1/verify" && verificationFailure) {
      return Promise.resolve(
        Response.json(
          {
            message: "Test verification failure",
            code: verificationFailure === 403 ? "otp_expired" : "unexpected_failure",
          },
          { status: verificationFailure },
        ),
      );
    }
    return originalFetch(input, options);
  };
  process.env["SUPABASE_URL"] = config["API_URL"];
  process.env["SUPABASE_ANON_KEY"] = config["ANON_KEY"];
  process.env["NODE_ENV"] = "development";
  const email = `recovery-${randomUUID()}@example.invalid`;
  const password = randomUUID();
  const newPassword = randomUUID();
  const adminHeaders = {
    apikey: config["SERVICE_ROLE_KEY"],
    authorization: `Bearer ${config["SERVICE_ROLE_KEY"]}`,
    "content-type": "application/json",
  };
  const created = await fetch(`${config["API_URL"]}/auth/v1/admin/users`, {
    method: "POST",
    headers: adminHeaders,
    body: JSON.stringify({ email, password, email_confirm: true }),
  });
  assert.ok(created.ok, "Temporary local recovery account creation must succeed.");
  accountId = (await created.json()).id;
  web = await createViteServer({ server: { host: "127.0.0.1", port: 5173, strictPort: true } });
  await web.listen();
  // An existing IPv6-only dev server is left untouched; this test owns only the IPv4 listener.
  browser = await chromium.launch({
    headless: true,
    args: ["--host-resolver-rules=MAP localhost 127.0.0.1"],
  });
  const context = await browser.newContext();
  await context.route("**/*", async (route) => {
    if (!["localhost", "127.0.0.1"].includes(new URL(route.request().url()).hostname))
      return route.abort();
    return route.continue();
  });
  const page = await context.newPage();
  const origin = "http://localhost:5173";
  await page.goto(`${origin}/referrals/recovery`, { waitUntil: "networkidle" });
  assert.equal(await page.locator("main input:enabled").count(), 1);
  const requestPromise = page.waitForRequest(
    (r) => r.method() === "POST" && r.url().startsWith(origin),
  );
  await page.locator("#recovery-email").fill(email);
  await page.locator("main button[type=submit]").click();
  const request = await requestPromise;
  await page.getByRole("status").waitFor();
  const generic = await page.getByRole("status").innerText();
  const headers = await request.allHeaders();
  for (const key of ["host", "content-length", "cookie", "sec-fetch-site"]) delete headers[key];
  headers.origin = "https://untrusted.invalid";
  const beforeCsrf = recoverRequests;
  assert.equal(
    (await page.request.post(request.url(), { headers, data: request.postData() })).status(),
    403,
  );
  assert.equal(recoverRequests, beforeCsrf);

  let message;
  for (let attempt = 0; attempt < 30; attempt++) {
    const search = await fetch(
      `${config["MAILPIT_URL"]}/api/v1/search?query=${encodeURIComponent(`to:${email}`)}`,
    );
    const found = await search.json();
    if (found.messages?.length) {
      const id = found.messages[0].ID;
      mailIds.push(id);
      message = await (await fetch(`${config["MAILPIT_URL"]}/api/v1/message/${id}`)).json();
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  assert.ok(message, "Approved local recovery email must arrive.");
  const link = message.HTML.match(/href="([^"]+)"/)?.[1]?.replaceAll("&amp;", "&");
  assert.ok(link, "Local recovery email must contain a callback.");
  const callback = new URL(link);
  assert.ok(
    callback.origin === origin && callback.pathname === "/referrals/recovery/callback",
    "Only the approved local callback is permitted.",
  );
  assert.ok(!callback.hash && callback.searchParams.get("type") === "recovery");
  for (const [unknown, outage] of [
    [true, false],
    [false, true],
  ]) {
    await page.goto(`${origin}/referrals/recovery`, { waitUntil: "networkidle" });
    requestFailure = outage;
    await page
      .locator("#recovery-email")
      .fill(unknown ? `absent-${randomUUID()}@example.invalid` : email);
    await page.locator("main button[type=submit]").click();
    await page.getByRole("status").waitFor();
    assert.equal(await page.getByRole("status").innerText(), generic);
    requestFailure = false;
  }
  console.log(
    "PASS: local recovery email, generic absent-account/outage responses, and request CSRF.",
  );

  await page.goto(link, { waitUntil: "networkidle" });
  assert.equal(page.url(), `${origin}/referrals/recovery/reset`);
  const cookie = (await context.cookies()).find((c) => c.name === "franklyedu-recovery");
  assert.ok(cookie?.httpOnly && cookie.sameSite === "Lax" && cookie.path === "/");
  assert.ok(
    !(await page.content()).includes(callback.searchParams.get("token_hash")),
    "Recovery tokens must not be rendered.",
  );
  assert.equal(await page.evaluate(() => document.cookie.includes("franklyedu-recovery")), false);
  for (const status of [503, 403]) {
    verificationFailure = status;
    try {
      const state = await page.evaluate(async (value) => {
        const { updateRecoveryPassword } = await import("/src/lib/referral-recovery.functions.ts");
        return updateRecoveryPassword({ data: { password: value, confirmPassword: value } });
      }, newPassword);
      assert.equal(state, status === 503 ? "unavailable" : "invalid");
      assert.equal(
        (await context.cookies()).some((c) => c.name === "franklyedu-recovery"),
        status === 503,
      );
    } finally {
      verificationFailure = undefined;
    }
  }
  await page.goto(link, { waitUntil: "networkidle" });
  // Exercise clearing all existing auth-cookie chunks without trusting their content.
  await context.addCookies([
    {
      name: "franklyedu-referral-auth.0",
      value: "test-stale-session",
      url: origin,
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);
  await page.locator("#recovery-password").fill(newPassword);
  await page.locator("#recovery-confirmPassword").fill("mismatch");
  await page.locator("main button[type=submit]").click();
  await page.getByRole("alert").waitFor();
  await page.locator("#recovery-confirmPassword").fill(newPassword);
  const resetRequestPromise = page.waitForRequest(
    (r) => r.method() === "POST" && r.url().startsWith(origin),
  );
  await page.locator("main button[type=submit]").click();
  const resetRequest = await resetRequestPromise;
  await page.getByRole("status").waitFor();
  assert.equal(
    await page.getByRole("status").innerText(),
    "Your password has been updated. Log in with your new password.",
  );
  assert.equal(
    (await context.cookies()).some(
      (c) => c.name.includes("recovery") || c.name.includes("referral-auth"),
    ),
    false,
  );
  const resetHeaders = await resetRequest.allHeaders();
  for (const key of ["host", "content-length", "cookie", "sec-fetch-site"])
    delete resetHeaders[key];
  resetHeaders.origin = "https://untrusted.invalid";
  assert.equal(
    (
      await page.request.post(resetRequest.url(), {
        headers: resetHeaders,
        data: resetRequest.postData(),
      })
    ).status(),
    403,
  );
  for (const [candidate, expected] of [
    [password, 400],
    [newPassword, 200],
  ]) {
    const login = await fetch(`${config["API_URL"]}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { apikey: config["ANON_KEY"], "content-type": "application/json" },
      body: JSON.stringify({ email, password: candidate }),
    });
    assert.equal(login.status, expected);
  }
  console.log(
    "PASS: token-free reset URL, HttpOnly recovery cookie, password validation/update, cleanup and reset CSRF.",
  );
  await page.goto(link, { waitUntil: "networkidle" });
  await page.locator("#recovery-password").fill(newPassword);
  await page.locator("#recovery-confirmPassword").fill(newPassword);
  await page.locator("main button[type=submit]").click();
  await page.getByRole("status").waitFor();
  assert.equal(
    await page.getByRole("status").innerText(),
    "This recovery link is invalid or expired. Request a new link.",
  );
  assert.equal(
    (await context.cookies()).some((c) => c.name === "franklyedu-recovery"),
    false,
  );
  await page.goto(`${origin}/referrals/recovery/callback?token_hash=invalid&type=recovery`, {
    waitUntil: "networkidle",
  });
  assert.ok(page.url().endsWith("/reset?status=invalid"));
  console.log("PASS: consumed and malformed links fail safely without a password update.");
  requestFailure = true;
  let throttled = false;
  for (let attempt = 0; attempt < 21; attempt++) {
    const before = recoverRequests;
    const state = await page.evaluate(async (index) => {
      const { requestReferralAccountRecovery } =
        await import("/src/lib/referral-auth.functions.ts");
      return requestReferralAccountRecovery({
        data: { email: `limited-${index}@example.invalid` },
      });
    }, attempt);
    assert.equal(state, "sent");
    if (recoverRequests === before) throttled = true;
    if (throttled) assert.equal(recoverRequests, before);
  }
  requestFailure = false;
  assert.ok(throttled, "Recovery request attempts must be bounded before provider calls.");
  console.log(
    "PASS: expired-link/outage handling, auth-cookie chunk cleanup and bounded recovery requests.",
  );
} catch (error) {
  console.error(
    JSON.stringify({
      event: "local_recovery_test_failed",
      errorType: error instanceof Error ? error.name : "UnknownError",
      location:
        error instanceof Error ? error.stack?.match(/recovery-test\.mjs:\d+:\d+/)?.[0] : undefined,
    }),
  );
  process.exitCode = 1;
} finally {
  await browser?.close();
  await web?.close();
  if (accountId) {
    const removed = await fetch(`${config["API_URL"]}/auth/v1/admin/users/${accountId}`, {
      method: "DELETE",
      headers: {
        apikey: config["SERVICE_ROLE_KEY"],
        authorization: `Bearer ${config["SERVICE_ROLE_KEY"]}`,
      },
    });
    if (!removed.ok) {
      console.error("Temporary recovery account cleanup failed.");
      process.exitCode = 1;
    } else console.log("PASS: temporary local recovery account removed.");
  }
  if (mailIds.length) {
    const removed = await fetch(`${config["MAILPIT_URL"]}/api/v1/messages`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ IDs: mailIds }),
    });
    if (!removed.ok) {
      console.error("Temporary recovery email cleanup failed.");
      process.exitCode = 1;
    }
  }
  globalThis.fetch = originalFetch;
}
