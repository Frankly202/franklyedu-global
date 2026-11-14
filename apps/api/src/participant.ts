import { createClient } from "@supabase/supabase-js";

export interface ParticipantOverview {
  accountStatus: "verified";
  totalReferrals: number;
  enrolledReferrals: number;
}

export interface ParticipantReferralCode {
  referralCode: string;
}

export type ParticipantReferralLocale = "en" | "tr" | "fr" | "sw";

export interface ParticipantReferralSubmissionPolicy {
  policyVersion: string;
  noticeText: string;
  consentText: string;
}

export interface ParticipantReferralSubmissionInput {
  studentName: string;
  studentEmail: string;
  studentPhone: string | null;
  locale: ParticipantReferralLocale;
  policyVersion: string;
  consentAccepted: true;
  idempotencyKey: string;
}

export interface ParticipantReferralSubmissionResult {
  reference: string;
  status: ParticipantReferralStatus;
  createdAt: string;
  reviewRequired: boolean;
}

export class ParticipantReferralSubmissionError extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = "ParticipantReferralSubmissionError";
  }
}

export type ParticipantReferralStatus =
  | "submitted"
  | "contacted"
  | "application_in_progress"
  | "enrolled"
  | "not_eligible"
  | "withdrawn";

export interface ParticipantReferral {
  reference: string;
  status: ParticipantReferralStatus;
  createdAt: string;
}

export type ParticipantRewardDecision = "pending" | "qualified" | "ineligible";

export interface ParticipantReward {
  reference: string;
  decision: ParticipantRewardDecision;
  amount: number;
  currency: string;
  createdAt: string;
  reviewedAt: string | null;
  payment: {
    amount: number;
    currency: string;
    paidAt: string;
  } | null;
}

const participantReferralStatuses = new Set<string>([
  "submitted",
  "contacted",
  "application_in_progress",
  "enrolled",
  "not_eligible",
  "withdrawn",
]);

function isParticipantReferralStatus(
  status: unknown,
): status is ParticipantReferralStatus {
  return typeof status === "string" && participantReferralStatuses.has(status);
}

const participantRewardDecisions = new Set<string>([
  "pending",
  "qualified",
  "ineligible",
]);

function isParticipantRewardDecision(
  decision: string,
): decision is ParticipantRewardDecision {
  return participantRewardDecisions.has(decision);
}

function parseDatabaseDate(value: string | null): string | null {
  if (value === null) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

const participantReferralLocales = new Set(["en", "tr", "fr", "sw"]);
const referralReferencePattern = /^FE-[A-F0-9]{24}$/;
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function parseParticipantReferralSubmission(
  value: unknown,
): ParticipantReferralSubmissionInput | null {
  if (typeof value !== "object" || value === null || Array.isArray(value))
    return null;
  const input = value as Record<string, unknown>;
  const keys = [
    "studentName",
    "studentEmail",
    "studentPhone",
    "locale",
    "policyVersion",
    "consentAccepted",
    "idempotencyKey",
  ];
  if (Object.keys(input).some((key) => !keys.includes(key))) return null;

  const rawName =
    typeof input["studentName"] === "string" ? input["studentName"] : "";
  const rawEmail =
    typeof input["studentEmail"] === "string" ? input["studentEmail"] : "";
  const rawPhone =
    input["studentPhone"] === null || input["studentPhone"] === undefined
      ? ""
      : typeof input["studentPhone"] === "string"
        ? input["studentPhone"]
        : "\u0000";
  const studentName = rawName.normalize("NFC").trim().replace(/\s+/gu, " ");
  const studentEmail = rawEmail.normalize("NFC").trim();
  const studentPhone = rawPhone.normalize("NFC").trim().replace(/\s+/gu, " ");
  const locale = input["locale"];
  const policyVersion =
    typeof input["policyVersion"] === "string"
      ? input["policyVersion"].trim()
      : "";
  const idempotencyKey =
    typeof input["idempotencyKey"] === "string" ? input["idempotencyKey"] : "";

  if (
    Object.keys(input).length !== keys.length ||
    !studentName ||
    Array.from(studentName).length > 200 ||
    /[\u0000-\u001f\u007f]/u.test(rawName) ||
    studentEmail.length < 3 ||
    studentEmail.length > 320 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(studentEmail) ||
    /[\u0000-\u001f\u007f]/u.test(rawEmail) ||
    (studentPhone !== "" &&
      (Array.from(studentPhone).length < 3 ||
        Array.from(studentPhone).length > 40 ||
        /[\u0000-\u001f\u007f]/u.test(rawPhone))) ||
    (locale !== "en" &&
      locale !== "tr" &&
      locale !== "fr" &&
      locale !== "sw") ||
    !participantReferralLocales.has(locale) ||
    !policyVersion ||
    policyVersion.length > 80 ||
    input["consentAccepted"] !== true ||
    !uuidPattern.test(idempotencyKey)
  ) {
    return null;
  }

  return {
    studentName,
    studentEmail,
    studentPhone: studentPhone || null,
    locale,
    policyVersion,
    consentAccepted: true,
    idempotencyKey,
  };
}

function createParticipantClient(
  supabaseUrl: string,
  anonKey: string,
  accessToken: string,
) {
  return createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

export function createParticipantReferralSubmissionPolicy(
  supabaseUrl: string,
  anonKey: string,
) {
  return async (
    accessToken: string,
    locale: ParticipantReferralLocale,
  ): Promise<ParticipantReferralSubmissionPolicy | null> => {
    const client = createParticipantClient(supabaseUrl, anonKey, accessToken);
    const { data, error } = await client.rpc(
      "get_active_referral_submission_policy",
      {
        p_locale: locale,
      },
    );
    if (error) throw new Error("Participant referral policy query failed.");
    if (!Array.isArray(data))
      throw new Error("Participant referral policy is invalid.");
    if (data.length === 0) return null;
    if (data.length !== 1)
      throw new Error("Participant referral policy is ambiguous.");

    const policy = data[0];
    if (
      typeof policy !== "object" ||
      policy === null ||
      !("policy_version" in policy) ||
      typeof policy.policy_version !== "string" ||
      !("notice_text" in policy) ||
      typeof policy.notice_text !== "string" ||
      !("consent_text" in policy) ||
      typeof policy.consent_text !== "string" ||
      !policy.policy_version.trim() ||
      !policy.notice_text.trim() ||
      !policy.consent_text.trim()
    ) {
      throw new Error("Participant referral policy is invalid.");
    }

    return {
      policyVersion: policy.policy_version,
      noticeText: policy.notice_text,
      consentText: policy.consent_text,
    };
  };
}

export function createParticipantReferralSubmission(
  supabaseUrl: string,
  anonKey: string,
) {
  return async (
    accessToken: string,
    input: ParticipantReferralSubmissionInput,
  ): Promise<ParticipantReferralSubmissionResult> => {
    const client = createParticipantClient(supabaseUrl, anonKey, accessToken);
    const { data, error } = await client.rpc("submit_participant_referral", {
      p_student_name: input.studentName,
      p_student_email: input.studentEmail,
      p_student_phone: input.studentPhone,
      p_locale: input.locale,
      p_policy_version: input.policyVersion,
      p_consent_accepted: input.consentAccepted,
      p_idempotency_key: input.idempotencyKey,
    });
    if (error)
      throw new ParticipantReferralSubmissionError(
        "Submission failed.",
        error.code,
      );

    const result = data as unknown;
    if (
      typeof result !== "object" ||
      result === null ||
      !("reference" in result) ||
      typeof result.reference !== "string" ||
      !referralReferencePattern.test(result.reference) ||
      !("status" in result) ||
      !isParticipantReferralStatus(result.status) ||
      !("createdAt" in result) ||
      typeof result.createdAt !== "string" ||
      !("reviewRequired" in result) ||
      typeof result.reviewRequired !== "boolean"
    ) {
      throw new Error("Participant referral submission response is invalid.");
    }

    const createdAt = parseDatabaseDate(result.createdAt);
    if (!createdAt)
      throw new Error("Participant referral submission date is invalid.");
    return {
      reference: result.reference,
      status: result.status,
      createdAt,
      reviewRequired: result.reviewRequired,
    };
  };
}

export function createParticipantRewards(supabaseUrl: string, anonKey: string) {
  return async (
    accessToken: string,
    verifiedUserId: string,
  ): Promise<ParticipantReward[]> => {
    const client = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: ["Bearer", accessToken].join(" ") } },
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    });
    const { data: participant, error: participantError } = await client
      .from("referral_participants")
      .select("user_id")
      .eq("user_id", verifiedUserId)
      .maybeSingle();
    if (participantError || !participant)
      throw new Error("Participant ownership verification failed.");

    const { data: referrals, error: referralsError } = await client
      .from("referrals")
      .select("id, reference")
      .eq("referrer_id", verifiedUserId);
    if (referralsError || !referrals)
      throw new Error("Participant reward ownership verification failed.");
    if (referrals.length === 0) return [];

    const { data: qualifications, error: qualificationsError } = await client
      .from("referral_reward_qualifications")
      .select(
        "id, referral_id, decision, reward_amount, currency, created_at, reviewed_at",
      )
      .in(
        "referral_id",
        referrals.map((referral) => referral.id),
      )
      .order("created_at", { ascending: false });
    if (qualificationsError || !qualifications)
      throw new Error("Participant rewards query failed.");
    if (qualifications.length === 0) return [];

    const qualificationIds = qualifications.map(
      (qualification) => qualification.id,
    );
    const paymentsResult = await client
      .from("referral_reward_payments")
      .select("qualification_id, amount, currency, paid_at")
      .in("qualification_id", qualificationIds);
    if (paymentsResult.error || !paymentsResult.data)
      throw new Error("Participant reward payment query failed.");

    const referralsById = new Map(
      referrals.map((referral) => [referral.id, referral.reference]),
    );
    const paymentsByQualification = new Map(
      paymentsResult.data.map((payment) => [payment.qualification_id, payment]),
    );
    if (
      qualifications.some(
        (qualification) => !referralsById.has(qualification.referral_id),
      ) ||
      paymentsByQualification.size !== paymentsResult.data.length
    ) {
      throw new Error("Participant reward records are inconsistent.");
    }

    return qualifications.map((qualification) => {
      const reference = referralsById.get(qualification.referral_id);
      const createdAt = parseDatabaseDate(qualification.created_at);
      const reviewedAt = parseDatabaseDate(qualification.reviewed_at);
      const payment = paymentsByQualification.get(qualification.id);
      const paidAt = payment ? parseDatabaseDate(payment.paid_at) : null;
      if (
        !reference ||
        !/^FE-[A-F0-9]{24}$/.test(reference) ||
        !isParticipantRewardDecision(qualification.decision) ||
        typeof qualification.reward_amount !== "number" ||
        !Number.isFinite(qualification.reward_amount) ||
        typeof qualification.currency !== "string" ||
        !/^[A-Z]{3}$/.test(qualification.currency) ||
        !createdAt ||
        (qualification.decision === "pending" &&
          qualification.reviewed_at !== null) ||
        (qualification.decision !== "pending" && !reviewedAt) ||
        (payment &&
          (typeof payment.amount !== "number" ||
            !Number.isFinite(payment.amount) ||
            typeof payment.currency !== "string" ||
            !/^[A-Z]{3}$/.test(payment.currency) ||
            !paidAt))
      ) {
        throw new Error("Participant reward record is invalid.");
      }

      return {
        reference,
        decision: qualification.decision,
        amount: qualification.reward_amount,
        currency: qualification.currency,
        createdAt,
        reviewedAt,
        payment:
          payment && paidAt
            ? {
                amount: payment.amount,
                currency: payment.currency,
                paidAt,
              }
            : null,
      };
    });
  };
}

export function createParticipantReferrals(
  supabaseUrl: string,
  anonKey: string,
) {
  return async (
    accessToken: string,
    verifiedUserId: string,
  ): Promise<ParticipantReferral[]> => {
    const client = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: ["Bearer", accessToken].join(" ") } },
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    });
    const { data: participant, error: participantError } = await client
      .from("referral_participants")
      .select("user_id")
      .eq("user_id", verifiedUserId)
      .maybeSingle();
    if (participantError || !participant)
      throw new Error("Participant ownership verification failed.");

    const { data: referrals, error: referralsError } = await client
      .from("referrals")
      .select("reference, admission_status, created_at")
      .eq("referrer_id", verifiedUserId)
      .order("created_at", { ascending: false });
    if (referralsError || !referrals)
      throw new Error("Participant referrals query failed.");

    return referrals.map((referral) => {
      const createdAt = new Date(referral.created_at);
      if (
        !/^FE-[A-F0-9]{24}$/.test(referral.reference) ||
        !isParticipantReferralStatus(referral.admission_status) ||
        Number.isNaN(createdAt.getTime())
      ) {
        throw new Error("Participant referral record is invalid.");
      }
      return {
        reference: referral.reference,
        status: referral.admission_status,
        createdAt: createdAt.toISOString(),
      };
    });
  };
}

export function createParticipantReferralCode(
  supabaseUrl: string,
  anonKey: string,
) {
  return async (
    accessToken: string,
    verifiedUserId: string,
  ): Promise<ParticipantReferralCode> => {
    const client = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: ["Bearer", accessToken].join(" ") } },
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    });
    const { data: participant, error } = await client
      .from("referral_participants")
      .select("referral_code")
      .eq("user_id", verifiedUserId)
      .maybeSingle();
    if (error || !participant)
      throw new Error("Participant ownership verification failed.");
    if (!/^[A-F0-9]{32}$/.test(participant.referral_code))
      throw new Error("Participant referral code is invalid.");

    return { referralCode: participant.referral_code };
  };
}

export function createParticipantOverview(
  supabaseUrl: string,
  anonKey: string,
) {
  return async (
    accessToken: string,
    verifiedUserId: string,
  ): Promise<ParticipantOverview> => {
    const client = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: ["Bearer", accessToken].join(" ") } },
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    });
    const { data: participant, error: participantError } = await client
      .from("referral_participants")
      .select("user_id")
      .eq("user_id", verifiedUserId)
      .maybeSingle();
    if (participantError || !participant)
      throw new Error("Participant ownership verification failed.");

    const referrals = await client
      .from("referrals")
      .select("id", { count: "exact", head: true })
      .eq("referrer_id", verifiedUserId);
    if (referrals.error || referrals.count === null)
      throw new Error("Participant referral overview failed.");

    const enrolledReferrals = await client
      .from("referrals")
      .select("id", { count: "exact", head: true })
      .eq("referrer_id", verifiedUserId)
      .eq("admission_status", "enrolled");
    if (enrolledReferrals.error || enrolledReferrals.count === null)
      throw new Error("Participant referral overview failed.");

    return {
      accountStatus: "verified",
      totalReferrals: referrals.count,
      enrolledReferrals: enrolledReferrals.count,
    };
  };
}

export function createParticipantBootstrap(
  supabaseUrl: string,
  anonKey: string,
) {
  return async (accessToken: string, verifiedUserId: string): Promise<void> => {
    const client = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    });
    const { error: bootstrapError } = await client.rpc(
      "bootstrap_referral_participant",
    );
    if (bootstrapError) throw new Error("Participant bootstrap failed.");

    const { data, error } = await client
      .from("referral_participants")
      .select("user_id")
      .eq("user_id", verifiedUserId)
      .maybeSingle();
    if (error || !data)
      throw new Error("Participant ownership verification failed.");
  };
}
