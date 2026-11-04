import assert from "node:assert/strict";
import { test } from "node:test";
import {
  isLocalRecoveryApproved,
  localRecoveryCallback,
  validateRecoveryEmail,
  validateRecoveryPassword,
  validRecoveryHash,
} from "./referral-recovery-validation";

test("recovery activation is restricted to the approved local callback origin and provider", () => {
  assert.equal(localRecoveryCallback, "http://localhost:5173/referrals/recovery/callback");
  assert.equal(
    isLocalRecoveryApproved(localRecoveryCallback, "http://127.0.0.1:55431", false),
    true,
  );
  for (const [origin, provider, production] of [
    [localRecoveryCallback, "http://127.0.0.1:55431", true],
    ["http://127.0.0.1:5173", "http://127.0.0.1:55431", false],
    ["http://localhost:5174", "http://127.0.0.1:55431", false],
    [localRecoveryCallback, "https://project.supabase.co", false],
    [localRecoveryCallback, "http://localhost:55431/path", false],
    [localRecoveryCallback, "http://localhost:55431?key=invalid", false],
  ] as const)
    assert.equal(isLocalRecoveryApproved(origin, provider, production), false);
});
test("recovery validators reject extra identities and unsafe password input", () => {
  assert.deepEqual(validateRecoveryEmail({ email: " test@example.invalid " }), {
    email: "test@example.invalid",
  });
  for (const value of [
    null,
    {},
    { email: "invalid" },
    { email: "test@example.invalid", role: "admin" },
  ])
    assert.throws(() => validateRecoveryEmail(value));
  assert.deepEqual(validateRecoveryPassword({ password: "abcdef", confirmPassword: "abcdef" }), {
    password: "abcdef",
  });
  for (const value of [
    null,
    { password: "short", confirmPassword: "short" },
    { password: "abcdef", confirmPassword: "different" },
    { password: "abcdef", confirmPassword: "abcdef", userId: "untrusted" },
    { password: "x".repeat(73), confirmPassword: "x".repeat(73) },
    { password: "🔐".repeat(19), confirmPassword: "🔐".repeat(19) },
  ])
    assert.throws(() => validateRecoveryPassword(value));
  assert.equal(validRecoveryHash("a".repeat(56)), true);
  for (const hash of [null, "", "invalid", "a".repeat(57)])
    assert.equal(validRecoveryHash(hash), false);
});
