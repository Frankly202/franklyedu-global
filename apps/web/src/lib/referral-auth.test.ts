import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { serializeCookieHeader } from "@supabase/ssr";
import { getReferralCookieOptions } from "./referral-auth-cookies";
import {
  classifyReferralAuthFailure,
  isInvalidReferralCredentials,
  isRejectedReferralSession,
  ReferralAuthConfigurationError,
} from "./referral-auth-errors";
import {
  validateReferralLoginCredentials,
  validateReferralRegistration,
} from "./referral-auth-validation";
import { createReferralLoginLimit } from "./referral-login-limit";

test("login attempts are bounded independently of credentials and reset after one minute", () => {
  const allow = createReferralLoginLimit();
  const now = 1_000_000;
  for (let attempt = 0; attempt < 20; attempt++) assert.equal(allow(now), true);
  for (let attempt = 0; attempt < 100; attempt++) assert.equal(allow(now + 59_999), false);
  assert.equal(allow(now + 60_000), true);
  for (let attempt = 1; attempt < 20; attempt++) assert.equal(allow(now + 60_000), true);
  assert.equal(allow(now + 60_000), false);
});

test("refresh rejection excludes provider outages, throttling, and transport failures", () => {
  for (const status of [400, 401, 403]) assert.equal(isRejectedReferralSession({ status }), true);
  for (const status of [429, 500, 503, undefined])
    assert.equal(isRejectedReferralSession({ status }), false);
});

describe("referral authentication cookie options", () => {
  test("uses a host-only secure HttpOnly cookie in production", () => {
    const options = getReferralCookieOptions(true);
    const header = serializeCookieHeader(options.name, "session", options);

    assert.ok(options.name.startsWith("__Host-"));
    assert.match(header, /HttpOnly/);
    assert.match(header, /Secure/);
    assert.match(header, /SameSite=Lax/);
    assert.match(header, /Path=\//);
    assert.doesNotMatch(header.toLowerCase(), /domain=/);
  });

  test("supports local HTTP without weakening cookie attributes beyond Secure", () => {
    const options = getReferralCookieOptions(false);
    const header = serializeCookieHeader(options.name, "session", options);

    assert.equal(options.name.startsWith("__Host-"), false);
    assert.match(header, /HttpOnly/);
    assert.doesNotMatch(header, /Secure/);
    assert.match(header, /SameSite=Lax/);
    assert.match(header, /Path=\//);
  });
});

describe("referral login validation", () => {
  test("registration validates credentials and confirmation, stripping no client privileges", () => {
    const valid = {
      email: " preview@example.invalid ",
      password: "abcdef",
      confirmPassword: "abcdef",
    };
    assert.deepEqual(validateReferralRegistration(valid), {
      email: "preview@example.invalid",
      password: "abcdef",
    });
    for (const data of [
      null,
      {},
      { ...valid, password: "short", confirmPassword: "short" },
      { ...valid, confirmPassword: "different" },
      { ...valid, role: "admin" },
      { ...valid, userId: "untrusted" },
      { ...valid, password: "x".repeat(73), confirmPassword: "x".repeat(73) },
      { ...valid, password: "🔐".repeat(19), confirmPassword: "🔐".repeat(19) },
      { ...valid, email: "invalid" },
    ])
      assert.throws(() => validateReferralRegistration(data));
  });
  test("trims email while preserving the password", () => {
    assert.deepEqual(
      validateReferralLoginCredentials({ email: " user@example.com ", password: "pass" }),
      { email: "user@example.com", password: "pass" },
    );
  });

  test("rejects malformed, empty, and oversized credentials", () => {
    for (const input of [
      null,
      [],
      { email: "", password: "pass" },
      { email: "not-an-email", password: "pass" },
      { email: "user@example.com", password: "" },
      { email: "x".repeat(255), password: "pass" },
      { email: "user@example.com", password: "x".repeat(257) },
      { email: "user@example.com", password: "pass", userId: "untrusted" },
    ]) {
      assert.throws(() => validateReferralLoginCredentials(input), {
        message: "Invalid login request.",
      });
    }
  });
});

describe("referral authentication diagnostics", () => {
  test("distinguishes missing and invalid local configuration without exposing values", () => {
    const missing = new ReferralAuthConfigurationError(
      "missing_configuration",
      "Missing server configuration: SUPABASE_URL",
    );
    const invalid = new ReferralAuthConfigurationError(
      "invalid_configuration",
      "Invalid server configuration: SUPABASE_URL",
    );

    assert.equal(classifyReferralAuthFailure(missing, "unknown"), "missing_configuration");
    assert.equal(classifyReferralAuthFailure(invalid, "unknown"), "invalid_configuration");
    assert.equal(isInvalidReferralCredentials({ status: 401 }), true);
    assert.equal(isInvalidReferralCredentials({ status: 500 }), false);
  });

  test("distinguishes Supabase/API outages from ordinary authentication failures", () => {
    assert.equal(
      classifyReferralAuthFailure({ status: 503 }, "supabase"),
      "supabase_auth_unavailable",
    );
    assert.equal(
      classifyReferralAuthFailure(new TypeError("fetch failed"), "api"),
      "api_session_unavailable",
    );
    assert.equal(classifyReferralAuthFailure({ status: 400 }, "supabase"), "authentication_error");
  });
});
