import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer } from "node:http";
import test from "node:test";
import {
  createParticipantBootstrap,
  createParticipantReferralCode,
  createParticipantOverview,
  createParticipantReferrals,
  createParticipantRewards,
  createParticipantReferralSubmissionPolicy,
  createParticipantReferralSubmission,
  ParticipantReferralSubmissionError,
  parseParticipantReferralSubmission,
} from "../dist/src/participant.js";

const validSubmission = {
  studentName: "  Synthetic   Student ",
  studentEmail: " Student@Example.test ",
  studentPhone: " +1 555 0100 ",
  locale: "en",
  policyVersion: "fixture-only",
  consentAccepted: true,
  idempotencyKey: "00000000-0000-4000-8000-000000000304",
};

test("referral submission validation normalizes fields and rejects client-controlled identity", () => {
  assert.deepEqual(parseParticipantReferralSubmission(validSubmission), {
    studentName: "Synthetic Student",
    studentEmail: "Student@Example.test",
    studentPhone: "+1 555 0100",
    locale: "en",
    policyVersion: "fixture-only",
    consentAccepted: true,
    idempotencyKey: validSubmission.idempotencyKey,
  });
  assert.equal(
    parseParticipantReferralSubmission({
      ...validSubmission,
      participantId: "attacker-controlled",
    }),
    null,
  );
  assert.equal(
    parseParticipantReferralSubmission({
      ...validSubmission,
      consentAccepted: false,
    }),
    null,
  );
  assert.equal(
    parseParticipantReferralSubmission({
      ...validSubmission,
      studentEmail: "not-an-email",
    }),
    null,
  );
});

test("submission policy uses the verified user JWT and returns only localized policy copy", async () => {
  const requests = [];
  const provider = createServer((req, res) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      requests.push({
        method: req.method,
        url: req.url,
        authorization: req.headers.authorization,
        apikey: req.headers.apikey,
        body: JSON.parse(body),
      });
      res.setHeader("content-type", "application/json");
      res.end(
        JSON.stringify([
          {
            policy_version: "fixture-only",
            notice_text: "Synthetic test-only notice.",
            consent_text: "Synthetic test-only consent.",
          },
        ]),
      );
    });
  });
  provider.listen(0, "127.0.0.1");
  await once(provider, "listening");
  const address = provider.address();
  assert.ok(address && typeof address !== "string");
  try {
    const policy = await createParticipantReferralSubmissionPolicy(
      `http://127.0.0.1:${address.port}`,
      "public-anon-placeholder",
    )("provider-verified-token", "en");
    assert.deepEqual(policy, {
      policyVersion: "fixture-only",
      noticeText: "Synthetic test-only notice.",
      consentText: "Synthetic test-only consent.",
    });
    assert.equal(requests.length, 1);
    assert.equal(requests[0].method, "POST");
    assert.equal(
      requests[0].url,
      "/rest/v1/rpc/get_active_referral_submission_policy",
    );
    assert.equal(requests[0].authorization, "Bearer provider-verified-token");
    assert.equal(requests[0].apikey, "public-anon-placeholder");
    assert.deepEqual(requests[0].body, { p_locale: "en" });
  } finally {
    provider.close();
    await once(provider, "close");
  }
});

test("referral submission RPC forwards only normalized allowlisted fields and validates result", async () => {
  const requests = [];
  const provider = createServer((req, res) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      requests.push({
        method: req.method,
        url: req.url,
        authorization: req.headers.authorization,
        apikey: req.headers.apikey,
        body: JSON.parse(body),
      });
      res.setHeader("content-type", "application/json");
      res.end(
        JSON.stringify({
          reference: "FE-0123456789ABCDEF01234567",
          status: "submitted",
          createdAt: "2026-11-15T10:30:00.000Z",
          reviewRequired: true,
        }),
      );
    });
  });
  provider.listen(0, "127.0.0.1");
  await once(provider, "listening");
  const address = provider.address();
  assert.ok(address && typeof address !== "string");
  try {
    const submission = parseParticipantReferralSubmission(validSubmission);
    assert.ok(submission);
    const result = await createParticipantReferralSubmission(
      `http://127.0.0.1:${address.port}`,
      "public-anon-placeholder",
    )("provider-verified-token", submission);
    assert.deepEqual(result, {
      reference: "FE-0123456789ABCDEF01234567",
      status: "submitted",
      createdAt: "2026-11-15T10:30:00.000Z",
      reviewRequired: true,
    });
    assert.equal(requests[0].method, "POST");
    assert.equal(requests[0].url, "/rest/v1/rpc/submit_participant_referral");
    assert.equal(requests[0].authorization, "Bearer provider-verified-token");
    assert.equal(requests[0].apikey, "public-anon-placeholder");
    assert.deepEqual(requests[0].body, {
      p_student_name: "Synthetic Student",
      p_student_email: "Student@Example.test",
      p_student_phone: "+1 555 0100",
      p_locale: "en",
      p_policy_version: "fixture-only",
      p_consent_accepted: true,
      p_idempotency_key: validSubmission.idempotencyKey,
    });
  } finally {
    provider.close();
    await once(provider, "close");
  }
});

test("referral submission RPC accepts an idempotent result after status progression", async () => {
  const provider = createServer((_req, res) => {
    res.setHeader("content-type", "application/json");
    res.end(
      JSON.stringify({
        reference: "FE-0123456789ABCDEF01234567",
        status: "contacted",
        createdAt: "2026-11-15T10:30:00.000Z",
        reviewRequired: false,
      }),
    );
  });
  provider.listen(0, "127.0.0.1");
  await once(provider, "listening");
  const address = provider.address();
  assert.ok(address && typeof address !== "string");
  try {
    const submission = parseParticipantReferralSubmission(validSubmission);
    assert.ok(submission);
    const result = await createParticipantReferralSubmission(
      `http://127.0.0.1:${address.port}`,
      "public-anon-placeholder",
    )("provider-verified-token", submission);
    assert.equal(result.status, "contacted");
  } finally {
    provider.close();
    await once(provider, "close");
  }
});

test("submission database conflicts retain only safe structured error codes", async () => {
  const provider = createServer((_req, res) => {
    res.statusCode = 409;
    res.setHeader("content-type", "application/json");
    res.end(
      JSON.stringify({
        code: "P1102",
        message: "private student submission detail",
      }),
    );
  });
  provider.listen(0, "127.0.0.1");
  await once(provider, "listening");
  const address = provider.address();
  assert.ok(address && typeof address !== "string");
  try {
    const submission = parseParticipantReferralSubmission(validSubmission);
    assert.ok(submission);
    await assert.rejects(
      createParticipantReferralSubmission(
        `http://127.0.0.1:${address.port}`,
        "public-anon-placeholder",
      )("provider-verified-token", submission),
      (error) => {
        assert.ok(error instanceof ParticipantReferralSubmissionError);
        assert.equal(error.code, "P1102");
        assert.equal(error.message.includes("private student"), false);
        return true;
      },
    );
  } finally {
    provider.close();
    await once(provider, "close");
  }
});

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

test("participant overview uses owner filters and returns persisted counts only", async () => {
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
    if (req.url?.startsWith("/rest/v1/referral_participants?")) {
      res.end(JSON.stringify([{ user_id: expectedUserId }]));
      return;
    }
    res.setHeader(
      "content-range",
      req.url?.includes("admission_status=eq.enrolled") ? "*/1" : "*/4",
    );
    res.end();
  });
  provider.listen(0, "127.0.0.1");
  await once(provider, "listening");
  const address = provider.address();
  assert.ok(address && typeof address !== "string");
  try {
    const overview = await createParticipantOverview(
      `http://127.0.0.1:${address.port}`,
      "public-anon-placeholder",
    )("provider-verified-token", expectedUserId);
    assert.deepEqual(overview, {
      accountStatus: "verified",
      totalReferrals: 4,
      enrolledReferrals: 1,
    });
    assert.equal(requests.length, 3);
    for (const request of requests) {
      assert.equal(
        request.authorization,
        ["Bearer", "provider-verified-token"].join(" "),
      );
      assert.equal(request.apikey, "public-anon-placeholder");
    }
    assert.match(
      requests[0].url ?? "",
      new RegExp(`user_id=eq\\.${expectedUserId}`),
    );
    assert.equal(requests[1].method, "HEAD");
    assert.match(
      requests[1].url ?? "",
      new RegExp(`referrer_id=eq\\.${expectedUserId}`),
    );
    assert.equal(requests[2].method, "HEAD");
    assert.match(requests[2].url ?? "", /admission_status=eq\.enrolled/);
    assert.match(
      requests[2].url ?? "",
      new RegExp(`referrer_id=eq\\.${expectedUserId}`),
    );
  } finally {
    provider.close();
    await once(provider, "close");
  }
});

test("participant overview fails closed when RLS hides the owner row", async () => {
  const provider = createServer((_req, res) => {
    res.setHeader("content-type", "application/json");
    res.end("[]");
  });
  provider.listen(0, "127.0.0.1");
  await once(provider, "listening");
  const address = provider.address();
  assert.ok(address && typeof address !== "string");
  try {
    await assert.rejects(
      createParticipantOverview(
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

test("participant referral code reads only the RLS-owned code with the verified JWT", async () => {
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
    res.end(
      JSON.stringify([{ referral_code: "0123456789ABCDEF0123456789ABCDEF" }]),
    );
  });
  provider.listen(0, "127.0.0.1");
  await once(provider, "listening");
  const address = provider.address();
  assert.ok(address && typeof address !== "string");
  try {
    const result = await createParticipantReferralCode(
      `http://127.0.0.1:${address.port}`,
      "public-anon-placeholder",
    )("provider-verified-token", expectedUserId);
    assert.deepEqual(result, {
      referralCode: "0123456789ABCDEF0123456789ABCDEF",
    });
    assert.equal(requests.length, 1);
    assert.equal(requests[0].method, "GET");
    assert.equal(requests[0].authorization, "Bearer provider-verified-token");
    assert.equal(requests[0].apikey, "public-anon-placeholder");
    assert.match(
      requests[0].url ?? "",
      new RegExp(`user_id=eq\\.${expectedUserId}`),
    );
    assert.match(requests[0].url ?? "", /select=referral_code/);
  } finally {
    provider.close();
    await once(provider, "close");
  }
});

test("participant referral code fails closed when ownership or code validation fails", async () => {
  const invalidCases = [
    { body: "[]", expectedError: /ownership verification failed/ },
    {
      body: JSON.stringify([{ referral_code: "not-a-generated-code" }]),
      expectedError: /referral code is invalid/,
    },
  ];
  for (const { body, expectedError } of invalidCases) {
    const provider = createServer((_req, res) => {
      res.setHeader("content-type", "application/json");
      res.end(body);
    });
    provider.listen(0, "127.0.0.1");
    await once(provider, "listening");
    const address = provider.address();
    assert.ok(address && typeof address !== "string");
    try {
      await assert.rejects(
        createParticipantReferralCode(
          `http://127.0.0.1:${address.port}`,
          "public-anon-placeholder",
        )("provider-verified-token", "1d1ebd10-3f1e-4ab1-929f-44432f6600e1"),
        expectedError,
      );
    } finally {
      provider.close();
      await once(provider, "close");
    }
  }
});

test("participant referrals select only reference, status, and date for the verified owner", async () => {
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
    if (req.url?.startsWith("/rest/v1/referral_participants?")) {
      res.end(JSON.stringify([{ user_id: expectedUserId }]));
      return;
    }
    res.end(
      JSON.stringify([
        {
          reference: "FE-0123456789ABCDEF01234567",
          admission_status: "application_in_progress",
          created_at: "2026-11-12T10:30:00.000Z",
          referred_student_name: "Must not leave the database adapter",
          referred_student_email: "private@example.test",
        },
      ]),
    );
  });
  provider.listen(0, "127.0.0.1");
  await once(provider, "listening");
  const address = provider.address();
  assert.ok(address && typeof address !== "string");
  try {
    const result = await createParticipantReferrals(
      `http://127.0.0.1:${address.port}`,
      "public-anon-placeholder",
    )("provider-verified-token", expectedUserId);
    assert.deepEqual(result, [
      {
        reference: "FE-0123456789ABCDEF01234567",
        status: "application_in_progress",
        createdAt: "2026-11-12T10:30:00.000Z",
      },
    ]);
    assert.equal(requests.length, 2);
    for (const request of requests) {
      assert.equal(request.method, "GET");
      assert.equal(request.authorization, "Bearer provider-verified-token");
      assert.equal(request.apikey, "public-anon-placeholder");
    }
    assert.match(
      requests[0].url ?? "",
      new RegExp(`user_id=eq\\.${expectedUserId}`),
    );
    assert.match(
      requests[1].url ?? "",
      /select=reference%2Cadmission_status%2Ccreated_at/,
    );
    assert.match(
      requests[1].url ?? "",
      new RegExp(`referrer_id=eq\\.${expectedUserId}`),
    );
    assert.match(requests[1].url ?? "", /order=created_at\.desc/);
  } finally {
    provider.close();
    await once(provider, "close");
  }
});

test("participant referrals fail closed for missing owners and invalid record values", async () => {
  const cases = [
    {
      participant: "[]",
      referrals: "[]",
      error: /ownership verification failed/,
    },
    {
      participant: JSON.stringify([
        { user_id: "1d1ebd10-3f1e-4ab1-929f-44432f6600e1" },
      ]),
      referrals: JSON.stringify([
        {
          reference: "FE-0123456789ABCDEF01234567",
          admission_status: "unknown",
          created_at: "2026-11-12T10:30:00.000Z",
        },
      ]),
      error: /record is invalid/,
    },
  ];
  for (const testCase of cases) {
    const provider = createServer((req, res) => {
      res.setHeader("content-type", "application/json");
      res.end(
        req.url?.startsWith("/rest/v1/referral_participants?")
          ? testCase.participant
          : testCase.referrals,
      );
    });
    provider.listen(0, "127.0.0.1");
    await once(provider, "listening");
    const address = provider.address();
    assert.ok(address && typeof address !== "string");
    try {
      await assert.rejects(
        createParticipantReferrals(
          `http://127.0.0.1:${address.port}`,
          "public-anon-placeholder",
        )("provider-verified-token", "1d1ebd10-3f1e-4ab1-929f-44432f6600e1"),
        testCase.error,
      );
    } finally {
      provider.close();
      await once(provider, "close");
    }
  }
});

test("participant rewards return only persisted owner-qualified data with the user JWT", async () => {
  const expectedUserId = "1d1ebd10-3f1e-4ab1-929f-44432f6600e1";
  const pendingQualification = "00000000-0000-4000-8000-000000000101";
  const paidQualification = "00000000-0000-4000-8000-000000000102";
  const pendingReferral = "00000000-0000-4000-8000-000000000201";
  const paidReferral = "00000000-0000-4000-8000-000000000202";
  const requests = [];
  const provider = createServer((req, res) => {
    requests.push({
      method: req.method,
      url: req.url,
      authorization: req.headers.authorization,
      apikey: req.headers.apikey,
    });
    res.setHeader("content-type", "application/json");
    if (req.url?.startsWith("/rest/v1/referral_participants?")) {
      res.end(JSON.stringify([{ user_id: expectedUserId }]));
      return;
    }
    if (req.url?.startsWith("/rest/v1/referrals?")) {
      res.end(
        JSON.stringify([
          {
            id: pendingReferral,
            reference: "FE-0123456789ABCDEF01234567",
            referred_student_email: "must-not-be-selected@example.test",
          },
          {
            id: paidReferral,
            reference: "FE-1123456789ABCDEF01234567",
            referred_student_name: "Must not leave the database adapter",
          },
        ]),
      );
      return;
    }
    if (req.url?.startsWith("/rest/v1/referral_reward_qualifications?")) {
      res.end(
        JSON.stringify([
          {
            id: pendingQualification,
            referral_id: pendingReferral,
            decision: "pending",
            reward_amount: 170,
            currency: "EUR",
            created_at: "2026-11-10T09:00:00.000Z",
            reviewed_at: null,
            reviewed_by: "must-not-be-returned",
          },
          {
            id: paidQualification,
            referral_id: paidReferral,
            decision: "qualified",
            reward_amount: 170,
            currency: "EUR",
            created_at: "2026-11-11T09:00:00.000Z",
            reviewed_at: "2026-11-12T09:00:00.000Z",
          },
        ]),
      );
      return;
    }
    res.end(
      JSON.stringify([
        {
          qualification_id: paidQualification,
          amount: 170,
          currency: "EUR",
          paid_at: "2026-11-13T09:00:00.000Z",
          recorded_by: "must-not-be-returned",
          internal_reference: "must-not-be-returned",
        },
      ]),
    );
  });
  provider.listen(0, "127.0.0.1");
  await once(provider, "listening");
  const address = provider.address();
  assert.ok(address && typeof address !== "string");
  try {
    const rewards = await createParticipantRewards(
      `http://127.0.0.1:${address.port}`,
      "public-anon-placeholder",
    )("provider-verified-token", expectedUserId);
    assert.deepEqual(rewards, [
      {
        reference: "FE-0123456789ABCDEF01234567",
        decision: "pending",
        amount: 170,
        currency: "EUR",
        createdAt: "2026-11-10T09:00:00.000Z",
        reviewedAt: null,
        payment: null,
      },
      {
        reference: "FE-1123456789ABCDEF01234567",
        decision: "qualified",
        amount: 170,
        currency: "EUR",
        createdAt: "2026-11-11T09:00:00.000Z",
        reviewedAt: "2026-11-12T09:00:00.000Z",
        payment: {
          amount: 170,
          currency: "EUR",
          paidAt: "2026-11-13T09:00:00.000Z",
        },
      },
    ]);
    assert.equal(requests.length, 4);
    for (const request of requests) {
      assert.equal(request.method, "GET");
      assert.equal(request.authorization, "Bearer provider-verified-token");
      assert.equal(request.apikey, "public-anon-placeholder");
    }
    assert.match(
      requests[0].url ?? "",
      new RegExp(`user_id=eq\\.${expectedUserId}`),
    );
    assert.match(
      requests[1].url ?? "",
      new RegExp(`referrer_id=eq\\.${expectedUserId}`),
    );
    assert.match(requests[1].url ?? "", /select=id%2Creference/);
    assert.match(
      requests[2].url ?? "",
      /select=id%2Creferral_id%2Cdecision%2Creward_amount%2Ccurrency%2Ccreated_at%2Creviewed_at/,
    );
    assert.match(requests[2].url ?? "", /referral_id=in\./);
    assert.match(
      requests[3].url ?? "",
      /select=qualification_id%2Camount%2Ccurrency%2Cpaid_at/,
    );
    assert.match(requests[3].url ?? "", /qualification_id=in\./);
  } finally {
    provider.close();
    await once(provider, "close");
  }
});

test("participant rewards fail closed for missing owners and inconsistent rows", async () => {
  const cases = [
    {
      participant: "[]",
      referrals: "[]",
      qualifications: "[]",
      payments: "[]",
      error: /ownership verification failed/,
    },
    {
      participant: JSON.stringify([
        { user_id: "1d1ebd10-3f1e-4ab1-929f-44432f6600e1" },
      ]),
      referrals: JSON.stringify([
        {
          id: "00000000-0000-4000-8000-000000000201",
          reference: "FE-0123456789ABCDEF01234567",
        },
      ]),
      qualifications: JSON.stringify([
        {
          id: "00000000-0000-4000-8000-000000000101",
          referral_id: "00000000-0000-4000-8000-000000000999",
          decision: "qualified",
          reward_amount: 170,
          currency: "EUR",
          created_at: "2026-11-11T09:00:00.000Z",
          reviewed_at: "2026-11-12T09:00:00.000Z",
        },
      ]),
      payments: "[]",
      error: /records are inconsistent/,
    },
  ];
  for (const testCase of cases) {
    const provider = createServer((req, res) => {
      res.setHeader("content-type", "application/json");
      if (req.url?.startsWith("/rest/v1/referral_participants?")) {
        res.end(testCase.participant);
      } else if (req.url?.startsWith("/rest/v1/referrals?")) {
        res.end(testCase.referrals);
      } else if (
        req.url?.startsWith("/rest/v1/referral_reward_qualifications?")
      ) {
        res.end(testCase.qualifications);
      } else {
        res.end(testCase.payments);
      }
    });
    provider.listen(0, "127.0.0.1");
    await once(provider, "listening");
    const address = provider.address();
    assert.ok(address && typeof address !== "string");
    try {
      await assert.rejects(
        createParticipantRewards(
          `http://127.0.0.1:${address.port}`,
          "public-anon-placeholder",
        )("provider-verified-token", "1d1ebd10-3f1e-4ab1-929f-44432f6600e1"),
        testCase.error,
      );
    } finally {
      provider.close();
      await once(provider, "close");
    }
  }
});
