import assert from "node:assert/strict";
import test from "node:test";

import { loadConfig } from "../dist/src/config.js";

const baseEnvironment = {
  NODE_ENV: "test",
  PORT: "3000",
  SUPABASE_URL: "https://example-project.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: "test-only-placeholder",
  WEB_ORIGINS: "https://franklyedu.com,http://localhost:5173",
};

test("configuration accepts explicit production and local origins", () => {
  const config = loadConfig(baseEnvironment);
  assert.equal(config.port, 3000);
  assert.equal(config.allowedOrigins.has("https://franklyedu.com"), true);
  assert.equal(config.allowedOrigins.has("http://localhost:5173"), true);
});

test("configuration rejects wildcard origins", () => {
  assert.throws(
    () => loadConfig({ ...baseEnvironment, WEB_ORIGINS: "*" }),
    /cannot include a wildcard/,
  );
});

test("configuration rejects non-HTTPS non-local origins", () => {
  assert.throws(
    () => loadConfig({ ...baseEnvironment, WEB_ORIGINS: "http://franklyedu.com" }),
    /must be HTTPS origins/,
  );
});

test("configuration rejects Supabase URLs containing credentials", () => {
  assert.throws(
    () =>
      loadConfig({
        ...baseEnvironment,
        SUPABASE_URL: "https://user:password@example-project.supabase.co",
      }),
    /must not contain embedded credentials/,
  );
});
