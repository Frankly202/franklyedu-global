import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  validateReferralSubmission,
  validateReferralSubmissionLocale,
} from "./referral-submission-validation";

const submission = {
  studentName: "  Synthetic   Student ",
  studentEmail: " Student@Example.test ",
  studentPhone: " +1 555 0100 ",
  locale: "en",
  policyVersion: "fixture-only",
  consentAccepted: true,
  idempotencyKey: "00000000-0000-4000-8000-000000000304",
};

describe("referral submission validation", () => {
  it("normalizes names and phone values without changing the consent version", () => {
    assert.deepEqual(validateReferralSubmission(submission), {
      studentName: "Synthetic Student",
      studentEmail: "Student@Example.test",
      studentPhone: "+1 555 0100",
      locale: "en",
      policyVersion: "fixture-only",
      consentAccepted: true,
      idempotencyKey: submission.idempotencyKey,
    });
  });

  it("requires explicit consent and rejects identity or attribution fields", () => {
    assert.throws(
      () => validateReferralSubmission({ ...submission, consentAccepted: false }),
      /Invalid referral submission/,
    );
    assert.throws(
      () => validateReferralSubmission({ ...submission, participantId: "forged" }),
      /Invalid referral submission/,
    );
    assert.throws(() => validateReferralSubmissionLocale("de"), /Invalid referral locale/);
  });

  it("rejects malformed or oversized student details", () => {
    assert.throws(
      () => validateReferralSubmission({ ...submission, studentEmail: "invalid" }),
      /Invalid referral submission/,
    );
    assert.throws(
      () => validateReferralSubmission({ ...submission, studentName: "Student\u0001Name" }),
      /Invalid referral submission/,
    );
    assert.throws(
      () =>
        validateReferralSubmission({ ...submission, studentEmail: "student\u0001@example.test" }),
      /Invalid referral submission/,
    );
    assert.throws(
      () => validateReferralSubmission({ ...submission, studentPhone: "+1\u00015550100" }),
      /Invalid referral submission/,
    );
    assert.throws(
      () =>
        validateReferralSubmission({
          ...submission,
          studentName: "x".repeat(201),
        }),
      /Invalid referral submission/,
    );
    assert.throws(
      () =>
        validateReferralSubmission({
          ...submission,
          studentPhone: "x".repeat(41),
        }),
      /Invalid referral submission/,
    );
  });
});
