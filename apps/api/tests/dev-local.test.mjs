import assert from "node:assert/strict";
import test from "node:test";

import { parseLocalSupabaseStatus } from "../scripts/dev-local.mjs";

test("local Supabase status supplies API config without reading an env file", () => {
  assert.deepEqual(
    parseLocalSupabaseStatus(
      'API_URL="http://127.0.0.1:55431"\nANON_KEY="local-anon-key"\nSERVICE_ROLE_KEY="local-test-key"',
    ),
    {
      SUPABASE_URL: "http://127.0.0.1:55431",
      SUPABASE_ANON_KEY: "local-anon-key",
      SUPABASE_SERVICE_ROLE_KEY: "local-test-key",
    },
  );
});

test("local Supabase status rejects missing required keys", () => {
  assert.throws(
    () =>
      parseLocalSupabaseStatus(
        'API_URL="http://127.0.0.1:55431"\nSERVICE_ROLE_KEY="test"',
      ),
    /missing the local API URL or required keys/,
  );
});

test("local Supabase status rejects hosted URLs", () => {
  assert.throws(
    () =>
      parseLocalSupabaseStatus(
        'API_URL="https://project.supabase.co"\nANON_KEY="local-anon-key"\nSERVICE_ROLE_KEY="local-test-key"',
      ),
    /requires a loopback Supabase API URL/,
  );
});
