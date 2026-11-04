import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:http";
import { resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { parseEnv } from "node:util";
import { chromium } from "playwright";
import { createServer as createViteServer } from "vite";
import { createApiApp } from "../../api/dist/src/app.js";
import { createAccessTokenVerifier } from "../../api/dist/src/auth.js";
import { createParticipantBootstrap } from "../../api/dist/src/participant.js";

function queryLocalDatabase(sql) {
  const result = spawnSync("supabase", ["db", "query", "--local", "--output-format", "json", sql], {
    cwd: resolve("../api"),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.status !== 0) {
    throw new Error("Local database audit verification failed.");
  }
  try {
    return JSON.parse(result.stdout);
  } catch {
    throw new Error("Local database returned an unexpected audit result.");
  }
}

function localSupabaseConfig() {
  const status = spawnSync("supabase", ["status", "--output", "env"], {
    cwd: resolve("../api"),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (status.status !== 0) {
    throw new Error("Local Supabase is not available. Start the approved local environment first.");
  }
  const values = parseEnv(status.stdout);
  const url = new URL(values["API_URL"]);
  if (
    url.protocol !== "http:" ||
    !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) ||
    !values["ANON_KEY"]
  ) {
    throw new Error("Local auth tests require a loopback Supabase URL and local anon key.");
  }
  return { url: url.origin, anonKey: values["ANON_KEY"], serviceKey: values["SERVICE_ROLE_KEY"] };
}

function queryLocalDatabaseRows(sql) {
  const result = queryLocalDatabase(sql);
  return Array.isArray(result) ? result : (result.rows ?? result.result ?? []);
}

async function selectLanguage(page, language, locale) {
  const trigger = page.getByRole("button", {
    name: /Select language|Dil seçin|Choisir la langue|Chagua lugha/,
  });
  await trigger.click();
  const options = page.getByRole("group", { name: /Languages|Diller|Langues|Lugha/ });
  await options.getByRole("button", { name: language, exact: true }).click();
  await page.waitForFunction((expectedLocale) => {
    return document.documentElement.lang === expectedLocale;
  }, locale);
}

let browser;
let web;
let api;
let testAccount;
const bootstrappedActors = [];
let config;
const originalFetch = globalThis.fetch;
let supabaseRequests = 0;
let refreshFailure;
let rejectNextUserCheck = false;
try {
  config = localSupabaseConfig();
  globalThis.fetch = (input, options) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    if (!["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) {
      throw new Error("Local auth tests cannot contact hosted services.");
    }
    if (url.origin === config.url) supabaseRequests += 1;
    if (url.origin === config.url && rejectNextUserCheck && url.pathname === "/auth/v1/user") {
      rejectNextUserCheck = false;
      return Promise.resolve(
        Response.json({ message: "Test access token rejection", code: "bad_jwt" }, { status: 401 }),
      );
    }
    if (url.origin === config.url && refreshFailure && url.pathname === "/auth/v1/token") {
      if (refreshFailure === "transport") {
        return Promise.reject(new TypeError("Test provider connection failure"));
      }
      return Promise.resolve(
        Response.json(
          { message: "Test refresh failure", code: "test_refresh_failure" },
          { status: refreshFailure },
        ),
      );
    }
    if (url.origin === config.url && refreshFailure && url.pathname === "/auth/v1/logout") {
      return Promise.resolve(new Response(null, { status: 204 }));
    }
    return originalFetch(input, options);
  };
  const authHealth = await fetch(`${config.url}/auth/v1/health`, {
    headers: { apikey: config.anonKey },
    signal: AbortSignal.timeout(10_000),
  });
  assert.equal(authHealth.status, 200, "Local Supabase Auth must be responsive.");
  console.log("PASS: local Supabase Auth is responsive; only loopback services will be used.");

  api = createServer(
    createApiApp({
      allowedOrigins: new Set(),
      checkDatabase: async () => {
        throw new Error("Database readiness is outside this test's scope.");
      },
      authSessionRateLimit: { limit: 200, windowMs: 60_000 },
      verifyAccessToken: createAccessTokenVerifier(config.url, config.anonKey),
      bootstrapParticipant: async (token, verifiedUserId) => {
        await createParticipantBootstrap(config.url, config.anonKey)(token, verifiedUserId);
        bootstrappedActors.push(verifiedUserId);
      },
    }),
  );
  api.listen(0, "127.0.0.1");
  await once(api, "listening");
  const address = api.address();
  assert.ok(address && typeof address !== "string");
  const apiOrigin = `http://127.0.0.1:${address.port}`;

  process.env["SUPABASE_URL"] = config.url;
  process.env["SUPABASE_ANON_KEY"] = config.anonKey;
  process.env["VITE_API_ORIGIN"] = apiOrigin;
  process.env["NODE_ENV"] = "development";
  web = await createViteServer({
    server: { host: "127.0.0.1", port: 0 },
  });
  await web.listen();
  const webAddress = web.httpServer.address();
  assert.ok(webAddress && typeof webAddress !== "string");
  const webOrigin = `http://127.0.0.1:${webAddress.port}`;

  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  // Prevent browser navigation/requests to hosted services even if a configuration regresses.
  await context.route("**/*", async (route) => {
    const hostname = new URL(route.request().url()).hostname;
    if (!["localhost", "127.0.0.1", "[::1]"].includes(hostname)) {
      await route.abort();
      return;
    }
    await route.continue();
  });
  const page = await context.newPage();
  await page.goto(`${webOrigin}/login`, { waitUntil: "networkidle" });
  assert.equal(await page.locator("main form").count(), 1);
  assert.equal(await page.locator("main [role=alert]").count(), 0);
  console.log(
    "PASS: anonymous login page validates configured local Auth without claiming an outage.",
  );
  await page.goto(`${webOrigin}/participant`, { waitUntil: "networkidle" });
  assert.equal(new URL(page.url()).pathname, "/login");
  assert.equal(bootstrappedActors.length, 0);
  console.log("PASS: anonymous participant route redirects to login without bootstrapping.");

  for (const authorization of [undefined, "Basic invalid", "Bearer invalid-token"]) {
    const response = await fetch(`${apiOrigin}/auth/session`, {
      headers: authorization ? { authorization, "x-user-id": "untrusted" } : {},
    });
    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { error: "Authentication required." });
  }
  console.log("PASS: Express rejects missing, malformed, and unverified tokens via local Auth.");

  const requestPromise = page.waitForRequest(
    (request) => request.method() === "POST" && request.url().startsWith(webOrigin),
  );
  await page.locator('input[name="email"]').fill("no-account@auth-test.invalid");
  await page.locator('input[name="password"]').fill("deliberately-invalid-password");
  await page.locator('button[type="submit"]').click();
  const loginRequest = await requestPromise;
  await page.getByRole("alert").waitFor();
  assert.equal(
    await page.getByRole("alert").innerText(),
    "Unable to log in. Check your details or try again later.",
  );
  assert.equal(
    (await context.cookies()).some((cookie) => cookie.name.includes("referral-auth")),
    false,
  );
  console.log("PASS: real local invalid-credential rejection is generic and creates no session.");

  const headers = await loginRequest.allHeaders();
  delete headers["host"];
  delete headers["content-length"];
  delete headers["cookie"];
  delete headers["sec-fetch-site"];
  headers["origin"] = "https://untrusted.invalid";
  const csrfResponse = await page.request.post(loginRequest.url(), {
    headers,
    data: loginRequest.postData(),
  });
  assert.equal(csrfResponse.status(), 403);
  console.log("PASS: cross-origin login is rejected before contacting Auth.");

  if (process.argv.includes("--with-account")) {
    assert.ok(config.serviceKey, "Local account testing requires the local service key.");
    const existingAccounts = queryLocalDatabaseRows(
      `select u.id::text as id, u.email
       from auth.users u
       join public.referral_participants p on p.user_id = u.id
       where u.email like 'referral-test-%@example.invalid'
       order by u.created_at asc
       limit 1;`,
    );
    const existingAccount = existingAccounts[0];
    const email = existingAccount?.email ?? `referral-test-${randomUUID()}@example.invalid`;
    const password = randomUUID();
    const created = await fetch(
      existingAccount
        ? `${config.url}/auth/v1/admin/users/${existingAccount.id}`
        : `${config.url}/auth/v1/admin/users`,
      {
        method: existingAccount ? "PUT" : "POST",
        headers: {
          apikey: config.serviceKey,
          authorization: `Bearer ${config.serviceKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(
          existingAccount ? { password } : { email, password, email_confirm: true },
        ),
      },
    );
    if (!created.ok) {
      const error = await created.json();
      console.error(
        JSON.stringify({
          event: "local_test_account_create_failed",
          status: created.status,
          code: error.code,
        }),
      );
    }
    assert.ok(created.ok, "Dedicated local Auth account creation must succeed.");
    const account = await created.json();
    testAccount = existingAccount?.id ?? account.id;
    assert.equal(typeof testAccount, "string");
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill("wrong-test-account-password");
    await page.locator('button[type="submit"]').click();
    await page.getByRole("alert").waitFor();
    assert.equal(
      await page.getByRole("alert").innerText(),
      "Unable to log in. Check your details or try again later.",
    );
    assert.equal(
      (await context.cookies()).some((cookie) => cookie.name.includes("referral-auth")),
      false,
    );
    console.log("PASS: incorrect password for an existing local account is rejected generically.");
    await page.locator('input[name="password"]').fill(password);
    await page.locator('button[type="submit"]').click();
    await page.getByRole("button", { name: "Log out" }).waitFor();
    const readSession = async () => {
      const cookies = (await context.cookies())
        .filter((cookie) => cookie.name.startsWith("franklyedu-referral-auth"))
        .sort((a, b) => a.name.localeCompare(b.name));
      assert.ok(cookies.length > 0);
      for (const cookie of cookies) {
        assert.equal(cookie.httpOnly, true);
        assert.equal(cookie.sameSite, "Lax");
      }
      const encoded = cookies.map((cookie) => cookie.value).join("");
      assert.ok(encoded.startsWith("base64-"));
      return JSON.parse(Buffer.from(encoded.slice(7), "base64url").toString());
    };
    const initialSession = await readSession();
    const verified = await fetch(`${apiOrigin}/auth/session`, {
      headers: {
        authorization: `Bearer ${initialSession.access_token}`,
        "x-user-id": "untrusted",
      },
    });
    assert.equal(verified.status, 200);
    assert.deepEqual(await verified.json(), { userId: testAccount });
    await page.reload({ waitUntil: "networkidle" });
    assert.ok(await page.getByRole("button", { name: "Log out" }).isVisible());
    console.log(
      "PASS: real local login, HttpOnly cookies, reload persistence, and verified API actor.",
    );
    await page.goto(`${webOrigin}/participant`, { waitUntil: "networkidle" });
    assert.equal(new URL(page.url()).pathname, "/participant");
    assert.equal(await page.getByRole("status").innerText(), "Your participant account is ready.");
    assert.equal(
      await page.locator("[data-referral-panel] article, [data-referral-panel] form").count(),
      0,
    );
    for (const [locale, language, title, ready] of [
      ["en", "English", "Participant account", "Your participant account is ready."],
      ["tr", "Türkçe", "Katılımcı hesabı", "Katılımcı hesabınız hazır."],
      ["fr", "Français", "Compte participant", "Votre compte participant est prêt."],
      ["sw", "Kiswahili", "Akaunti ya mshiriki", "Akaunti yako ya mshiriki iko tayari."],
    ]) {
      await selectLanguage(page, language, locale);
      for (const width of [375, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`${webOrigin}/participant`, { waitUntil: "networkidle" });
        assert.equal(await page.locator("main h1").innerText(), title);
        assert.equal(await page.getByRole("status").innerText(), ready);
        assert.equal(
          await page.locator("[data-referral-panel] article, [data-referral-panel] form").count(),
          0,
        );
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
          ),
        );
      }
    }
    assert.ok(bootstrappedActors.length > 0);
    assert.ok(bootstrappedActors.every((actor) => actor === testAccount));
    assert.match(testAccount, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    const auditResult = queryLocalDatabase(
      `select count(*)::integer as event_count
       from public.referral_audit_events
       where actor_user_id = '${testAccount}'
         and entity_id = '${testAccount}'
         and event_type = 'participant.account_bootstrapped';`,
    );
    const auditRows = Array.isArray(auditResult)
      ? auditResult
      : (auditResult.rows ?? auditResult.result ?? []);
    assert.equal(auditRows[0]?.event_count, 1);
    console.log(
      "PASS: localized browser → BFF → API → local Supabase participant bootstrap and audit event.",
    );
    await selectLanguage(page, "English", "en");
    await page.goto(`${webOrigin}/login`, { waitUntil: "networkidle" });

    // Force stored expiry, not token claims, to exercise real provider refresh without waiting an hour.
    await context.clearCookies();
    await context.addCookies([
      {
        name: "franklyedu-referral-auth",
        value: `base64-${Buffer.from(
          JSON.stringify({
            ...initialSession,
            expires_at: Math.floor(Date.now() / 1000) - 60,
          }),
        ).toString("base64url")}`,
        url: webOrigin,
        httpOnly: true,
        sameSite: "Lax",
      },
    ]);
    await page.reload({ waitUntil: "networkidle" });
    assert.ok(await page.getByRole("button", { name: "Log out" }).isVisible());
    const refreshedSession = await readSession();
    assert.ok(
      refreshedSession.refresh_token !== initialSession.refresh_token,
      "The local provider must rotate the refresh token.",
    );
    assert.ok(refreshedSession.expires_at > Math.floor(Date.now() / 1000));
    const refreshedVerification = await fetch(`${apiOrigin}/auth/session`, {
      headers: { authorization: `Bearer ${refreshedSession.access_token}` },
    });
    assert.equal(refreshedVerification.status, 200);
    assert.deepEqual(await refreshedVerification.json(), { userId: testAccount });
    const validCookies = await context.cookies();
    for (const status of [429, 503, "transport", 400, 401, 403]) {
      await context.clearCookies();
      await context.addCookies(validCookies);
      refreshFailure = status;
      rejectNextUserCheck = true;
      try {
        const state = await page.evaluate(async () => {
          const { getReferralAuthState } = await import("/src/lib/referral-auth.functions.ts");
          return getReferralAuthState();
        });
        const rejected = [400, 401, 403].includes(status);
        assert.equal(state, rejected ? "signed-out" : "unavailable");
        const remaining = (await context.cookies()).filter((cookie) =>
          cookie.name.includes("referral-auth"),
        );
        assert.equal(remaining.length > 0, !rejected);
        if (!rejected) {
          assert.ok(
            JSON.stringify(remaining) ===
              JSON.stringify(
                validCookies.filter((cookie) => cookie.name.includes("referral-auth")),
              ),
            "Provider failures must preserve existing session cookies.",
          );
        }
      } finally {
        refreshFailure = undefined;
        rejectNextUserCheck = false;
      }
    }
    await context.clearCookies();
    await context.addCookies(validCookies);
    await page.reload({ waitUntil: "networkidle" });
    assert.ok(await page.getByRole("button", { name: "Log out" }).isVisible());
    console.log(
      "PASS: refresh 400/401/403 clears sessions; 429/503/network failures preserve cookies and recover.",
    );
    await page.getByRole("button", { name: "Log out" }).click();
    await page.locator('input[name="email"]').waitFor();
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.getByRole("button", { name: "Log out" }).count(), 0);
    assert.equal(
      (await context.cookies()).some((cookie) => cookie.name.includes("referral-auth")),
      false,
    );
    console.log(
      "PASS: real refresh-token rotation, refreshed API verification, and persistent logout.",
    );
  }

  for (const expired of [false, true]) {
    const value = `base64-${Buffer.from(
      JSON.stringify({
        access_token: "invalid-token",
        refresh_token: "invalid-refresh-token",
        expires_at: Math.floor(Date.now() / 1000) + (expired ? -3600 : 3600),
        expires_in: 3600,
        token_type: "bearer",
        user: { id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa" },
      }),
    ).toString("base64url")}`;
    // Exercise both plain and chunked SSR cookies without creating an Auth user.
    const pieces = expired ? [value.slice(0, 100), value.slice(100)] : [value];
    await context.addCookies(
      pieces.map((piece, index) => ({
        name: `franklyedu-referral-auth${expired ? `.${index}` : ""}`,
        value: piece,
        url: webOrigin,
        httpOnly: true,
        sameSite: "Lax",
      })),
    );
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.locator("main form").count(), 1);
    assert.equal(await page.locator("main [role=alert]").count(), 0);
    assert.equal(await page.getByRole("button", { name: "Log out" }).count(), 0);
    assert.equal(
      (await context.cookies()).some((cookie) => cookie.name.includes("referral-auth")),
      false,
    );
  }
  console.log(
    "PASS: forged and expired/chunked sessions are rejected and removed, not reported as outages.",
  );

  const logoutRequestPromise = page.waitForRequest(
    (request) => request.method() === "POST" && request.url().startsWith(webOrigin),
  );
  const logoutState = await page.evaluate(async () => {
    const { logOutReferral } = await import("/src/lib/referral-auth.functions.ts");
    return logOutReferral();
  });
  const logoutRequest = await logoutRequestPromise;
  assert.equal(logoutState, "signed-out");
  const logoutHeaders = await logoutRequest.allHeaders();
  delete logoutHeaders["host"];
  delete logoutHeaders["content-length"];
  delete logoutHeaders["cookie"];
  delete logoutHeaders["sec-fetch-site"];
  logoutHeaders["origin"] = "https://untrusted.invalid";
  const logoutCsrf = await page.request.post(logoutRequest.url(), { headers: logoutHeaders });
  assert.equal(logoutCsrf.status(), 403);
  console.log("PASS: anonymous logout is idempotent and cross-origin logout is rejected.");

  const requestsBeforeDeferredActions = supabaseRequests;
  for (const action of ["registerReferralAccount"]) {
    const actionRequestPromise = page.waitForRequest(
      (request) => request.method() === "POST" && request.url().startsWith(webOrigin),
    );
    const state = await page.evaluate(async (actionName) => {
      const functions = await import("/src/lib/referral-auth.functions.ts");
      return functions[actionName](
        actionName === "registerReferralAccount"
          ? {
              data: {
                email: "disabled-registration@example.invalid",
                password: "test-password",
                confirmPassword: "test-password",
              },
            }
          : undefined,
      );
    }, action);
    const request = await actionRequestPromise;
    assert.equal(state, "unavailable");
    const actionHeaders = await request.allHeaders();
    delete actionHeaders["host"];
    delete actionHeaders["content-length"];
    delete actionHeaders["cookie"];
    delete actionHeaders["sec-fetch-site"];
    actionHeaders["origin"] = "https://untrusted.invalid";
    const denied = await page.request.post(request.url(), { headers: actionHeaders });
    assert.equal(denied.status(), 403);
  }
  assert.equal(supabaseRequests, requestsBeforeDeferredActions);
  console.log("PASS: public registration remains closed and CSRF-protected.");
  const requestsBeforeUnapprovedRecovery = supabaseRequests;
  await page.goto(`${webOrigin}/referrals/recovery`, { waitUntil: "networkidle" });
  assert.equal(
    await page.locator("main input:enabled, main button[type=submit]:enabled").count(),
    0,
  );
  assert.equal(supabaseRequests, requestsBeforeUnapprovedRecovery);
  console.log("PASS: recovery dispatch remains disabled on an unapproved frontend origin.");

  let observedThrottle = false;
  for (let attempt = 0; attempt < 21; attempt++) {
    const before = supabaseRequests;
    const state = await page.evaluate(async (index) => {
      const { logInReferral } = await import("/src/lib/referral-auth.functions.ts");
      return logInReferral({
        data: { email: `limited-${index}@example.invalid`, password: "invalid-password" },
      });
    }, attempt);
    assert.equal(state, "signed-out");
    if (supabaseRequests === before) observedThrottle = true;
    if (observedThrottle) assert.equal(supabaseRequests, before);
  }
  assert.ok(observedThrottle, "Failed credentials must exhaust the BFF login limit.");
  console.log("PASS: failed logins across account names are bounded before any Auth request.");

  await page.goto(`${webOrigin}/signup`, { waitUntil: "networkidle" });
  assert.equal(
    await page.locator("main input:enabled, main button[type=submit]:enabled").count(),
    0,
  );
  console.log("PASS: registration and student-data collection remain unavailable.");
  if (!testAccount)
    console.log(
      "BLOCKED: successful login, authenticated persistence/refresh/logout, and valid-token verification require an authorized existing local test account.",
    );
} catch (error) {
  console.error(
    JSON.stringify({
      event: "local_auth_test_failed",
      errorType: error instanceof Error ? error.name : "UnknownError",
      location:
        error instanceof Error ? error.stack?.match(/auth-test\.mjs:\d+:\d+/)?.[0] : undefined,
    }),
  );
  process.exitCode = 1;
} finally {
  await browser?.close();
  await web?.close();
  if (api?.listening) {
    api.close();
    await once(api, "close");
  }
  if (testAccount && bootstrappedActors.includes(testAccount)) {
    console.info(
      "Local participant test account retained because append-only audit history references its actor.",
    );
  } else if (testAccount) {
    const removed = await fetch(`${config.url}/auth/v1/admin/users/${testAccount}`, {
      method: "DELETE",
      headers: { apikey: config.serviceKey, authorization: `Bearer ${config.serviceKey}` },
    });
    if (!removed.ok) {
      console.error("Dedicated local test account cleanup failed.");
      process.exitCode = 1;
    } else console.log("PASS: only the temporary dedicated local Auth account was removed.");
  }
  globalThis.fetch = originalFetch;
}
