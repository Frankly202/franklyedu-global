import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";
import type { ReferralLoginCredentials } from "./referral-auth-validation";
import { getReferralCookieOptions } from "./referral-auth-cookies";
import { createReferralLoginLimit } from "./referral-login-limit";
import {
  type ReferralSubmissionInput,
  type ReferralSubmissionLocale,
} from "./referral-submission-validation";
import {
  classifyReferralAuthFailure,
  isInvalidReferralCredentials,
  isRejectedReferralSession,
  ReferralAuthConfigurationError,
  type ReferralAuthFailureSource,
} from "./referral-auth-errors";

type ReferralAuthState = "signed-in" | "signed-out" | "unavailable";
export interface ParticipantOverview {
  accountStatus: "verified";
  totalReferrals: number;
  enrolledReferrals: number;
}
export interface ParticipantDashboard extends ParticipantOverview {
  referralCode: string;
  referrals: ParticipantDashboardReferral[];
  rewards: ParticipantDashboardReward[];
}
export interface ParticipantReferralSubmissionPolicy {
  policyVersion: string;
  noticeText: string;
  consentText: string;
}
export type ParticipantReferralSubmissionPolicyState =
  | { status: "available"; policy: ParticipantReferralSubmissionPolicy }
  | { status: "closed" }
  | "signed-out"
  | "unavailable";
export interface ParticipantReferralSubmissionResult {
  reference: string;
  status: ParticipantDashboardReferralStatus;
  createdAt: string;
  reviewRequired: boolean;
}
export type ParticipantReferralSubmissionActionResult =
  | { status: "success"; result: ParticipantReferralSubmissionResult }
  | {
      status:
        | "signed-out"
        | "invalid"
        | "submission-unavailable"
        | "policy-changed"
        | "idempotency-conflict"
        | "rate-limited"
        | "unavailable";
    };
export type ParticipantDashboardReferralStatus =
  "submitted" | "contacted" | "application_in_progress" | "enrolled" | "not_eligible" | "withdrawn";
export interface ParticipantDashboardReferral {
  reference: string;
  status: ParticipantDashboardReferralStatus;
  createdAt: string;
}
export type ParticipantDashboardRewardDecision = "pending" | "qualified" | "ineligible";
export interface ParticipantDashboardReward {
  reference: string;
  decision: ParticipantDashboardRewardDecision;
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
const participantRewardDecisions = new Set<string>(["pending", "qualified", "ineligible"]);

function isParticipantDashboardRewardDecision(
  decision: string,
): decision is ParticipantDashboardRewardDecision {
  return participantRewardDecisions.has(decision);
}
const allowLoginAttempt = createReferralLoginLimit();

class ReferralAuthServiceError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ReferralAuthServiceError";
  }
}

function reportAuthFailure(stage: string, error: unknown, source: ReferralAuthFailureSource) {
  console.error(
    JSON.stringify({
      event: "referral_auth_failure",
      stage,
      category: classifyReferralAuthFailure(error, source),
      errorType: error instanceof Error ? error.name : "UnknownError",
      status:
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        typeof error.status === "number"
          ? error.status
          : undefined,
    }),
  );
}

function requiredServerValue(key: "SUPABASE_URL" | "SUPABASE_ANON_KEY"): string {
  const value = process.env[key]?.trim();
  if (!value) {
    throw new ReferralAuthConfigurationError(
      "missing_configuration",
      `Missing server configuration: ${key}`,
    );
  }
  return value;
}

function validateOrigin(value: string, key: "SUPABASE_URL" | "VITE_API_ORIGIN"): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new ReferralAuthConfigurationError(
      "invalid_configuration",
      `Invalid server configuration: ${key}`,
    );
  }

  const localHttp =
    url.protocol === "http:" &&
    (url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "[::1]");
  if (
    (url.protocol !== "https:" && !localHttp) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new ReferralAuthConfigurationError(
      "invalid_configuration",
      `Invalid server configuration: ${key}`,
    );
  }

  return url.origin;
}

function markPrivateResponse() {
  setResponseHeader("Cache-Control", "private, no-store, max-age=0");
  setResponseHeader("Pragma", "no-cache");
}

function createReferralSupabaseClient() {
  const isProduction = process.env["NODE_ENV"] === "production";
  const cookieOptions = getReferralCookieOptions(isProduction);
  const request = getRequest();

  return createServerClient(
    validateOrigin(requiredServerValue("SUPABASE_URL"), "SUPABASE_URL"),
    requiredServerValue("SUPABASE_ANON_KEY"),
    {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        flowType: "pkce",
        persistSession: true,
      },
      cookieOptions,
      cookies: {
        getAll: () => parseCookieHeader(request.headers.get("cookie") ?? ""),
        setAll: (cookiesToSet) => {
          setResponseHeader("Cache-Control", "private, no-store, max-age=0");
          setResponseHeader("Expires", "0");
          setResponseHeader("Pragma", "no-cache");
          if (cookiesToSet.length > 0) {
            setResponseHeader(
              "Set-Cookie",
              cookiesToSet.map(({ name, value, options }) =>
                serializeCookieHeader(name, value, {
                  ...options,
                  httpOnly: true,
                  secure: isProduction,
                  sameSite: "lax",
                  path: "/",
                }),
              ),
            );
          }
        },
      },
    },
  );
}

async function verifyAccessTokenWithApi(accessToken: string): Promise<string | null> {
  const apiOriginValue = import.meta.env["VITE_API_ORIGIN"];
  if (!apiOriginValue) {
    throw new ReferralAuthConfigurationError(
      "missing_configuration",
      "Missing server configuration: VITE_API_ORIGIN",
    );
  }
  const apiOrigin = validateOrigin(apiOriginValue, "VITE_API_ORIGIN");
  const response = await fetch(`${apiOrigin}/auth/session`, {
    method: "GET",
    headers: { Accept: "application/json", Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(10_000),
  });

  if (response.status === 401) return null;
  if (!response.ok) {
    throw new ReferralAuthServiceError("API session verification failed.", response.status);
  }

  const payload: unknown = await response.json();
  if (
    typeof payload !== "object" ||
    payload === null ||
    !("userId" in payload) ||
    typeof payload.userId !== "string"
  ) {
    throw new ReferralAuthServiceError(
      "API session verification returned an invalid response.",
      response.status,
    );
  }

  return payload.userId;
}

export async function logInReferralUser(
  credentials: ReferralLoginCredentials,
): Promise<ReferralAuthState> {
  markPrivateResponse();
  if (!allowLoginAttempt()) {
    console.info(JSON.stringify({ event: "referral_login_throttled", scope: "process" }));
    return "signed-out";
  }
  const supabase = createReferralSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) {
    if (isInvalidReferralCredentials(error)) return "signed-out";
    reportAuthFailure("password_sign_in", error, "supabase");
    return "unavailable";
  }
  if (!data.session || !data.user) return "signed-out";

  try {
    const verifiedUserId = await verifyAccessTokenWithApi(data.session.access_token);
    if (verifiedUserId !== data.user.id) {
      const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
      if (signOutError) reportAuthFailure("clear_unverified_login", signOutError, "supabase");
      return "unavailable";
    }
    return "signed-in";
  } catch (verificationError) {
    reportAuthFailure("api_session_verification", verificationError, "api");
    const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
    if (signOutError) reportAuthFailure("clear_unverified_login", signOutError, "supabase");
    return "unavailable";
  }
}

export async function loadReferralAuthState(
  onVerifiedSession?: (accessToken: string) => Promise<ReferralAuthState>,
): Promise<ReferralAuthState> {
  markPrivateResponse();
  const supabase = createReferralSupabaseClient();
  const { data: localSession, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    if (isRejectedReferralSession(sessionError)) {
      const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
      if (signOutError) reportAuthFailure("clear_rejected_session", signOutError, "supabase");
      return "signed-out";
    }
    reportAuthFailure("read_supabase_session", sessionError, "supabase");
    return "unavailable";
  }
  if (!localSession.session) return "signed-out";

  let session = localSession.session;
  let { data, error } = await supabase.auth.getUser(session.access_token);
  if (error?.status === 403) {
    const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
    if (signOutError) reportAuthFailure("clear_rejected_session", signOutError, "supabase");
    return "signed-out";
  }
  if (error?.status === 401) {
    const refreshed = await supabase.auth.refreshSession();
    if (refreshed.error || !refreshed.data.session) {
      if (refreshed.error && !isRejectedReferralSession(refreshed.error)) {
        reportAuthFailure("refresh_session", refreshed.error, "supabase");
        return "unavailable";
      }
      const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
      if (signOutError) reportAuthFailure("clear_expired_session", signOutError, "supabase");
      return "signed-out";
    }
    session = refreshed.data.session;
    const verified = await supabase.auth.getUser(session.access_token);
    data = verified.data;
    error = verified.error;
  }
  if (error) {
    if (isRejectedReferralSession(error)) {
      const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
      if (signOutError) reportAuthFailure("clear_rejected_session", signOutError, "supabase");
      return "signed-out";
    }
    reportAuthFailure("validate_supabase_session", error, "supabase");
    return "unavailable";
  }
  if (!data.user) {
    const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
    if (signOutError) reportAuthFailure("clear_mismatched_session", signOutError, "supabase");
    return "signed-out";
  }

  try {
    const verifiedUserId = await verifyAccessTokenWithApi(session.access_token);
    if (verifiedUserId === data.user.id)
      return onVerifiedSession ? await onVerifiedSession(session.access_token) : "signed-in";
    if (verifiedUserId === null) {
      const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
      if (signOutError) reportAuthFailure("clear_invalid_api_session", signOutError, "supabase");
      return "signed-out";
    }
    const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
    if (signOutError) reportAuthFailure("clear_mismatched_api_session", signOutError, "supabase");
    return "unavailable";
  } catch (verificationError) {
    reportAuthFailure("api_session_verification", verificationError, "api");
    return "unavailable";
  }
}

export async function loadParticipantFoundation(): Promise<ReferralAuthState> {
  return loadReferralAuthState(async (accessToken) => {
    const apiOriginValue = import.meta.env["VITE_API_ORIGIN"];
    if (!apiOriginValue) {
      throw new ReferralAuthConfigurationError(
        "missing_configuration",
        "Missing server configuration: VITE_API_ORIGIN",
      );
    }
    const apiOrigin = validateOrigin(apiOriginValue, "VITE_API_ORIGIN");
    const response = await fetch(`${apiOrigin}/participant/bootstrap`, {
      method: "POST",
      headers: { Accept: "application/json", Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });
    if (response.status === 401) return "signed-out";
    if (!response.ok)
      throw new ReferralAuthServiceError("Participant bootstrap failed.", response.status);
    const result: unknown = await response.json();
    if (
      typeof result !== "object" ||
      result === null ||
      !("status" in result) ||
      result.status !== "ready"
    )
      throw new ReferralAuthServiceError("Participant response was invalid.", response.status);
    return "signed-in";
  });
}

function parseParticipantOverview(value: unknown): ParticipantOverview | null {
  if (
    typeof value !== "object" ||
    value === null ||
    !("accountStatus" in value) ||
    value.accountStatus !== "verified" ||
    !("totalReferrals" in value) ||
    typeof value.totalReferrals !== "number" ||
    !Number.isSafeInteger(value.totalReferrals) ||
    value.totalReferrals < 0 ||
    !("enrolledReferrals" in value) ||
    typeof value.enrolledReferrals !== "number" ||
    !Number.isSafeInteger(value.enrolledReferrals) ||
    value.enrolledReferrals < 0 ||
    value.enrolledReferrals > value.totalReferrals
  ) {
    return null;
  }
  return {
    accountStatus: value.accountStatus,
    totalReferrals: value.totalReferrals,
    enrolledReferrals: value.enrolledReferrals,
  };
}

function parseParticipantReferralCode(value: unknown): string | null {
  if (
    typeof value !== "object" ||
    value === null ||
    !("referralCode" in value) ||
    typeof value.referralCode !== "string" ||
    !/^[A-F0-9]{32}$/.test(value.referralCode)
  ) {
    return null;
  }
  return value.referralCode;
}

const participantReferralStatuses = new Set<string>([
  "submitted",
  "contacted",
  "application_in_progress",
  "enrolled",
  "not_eligible",
  "withdrawn",
]);

function isParticipantDashboardReferralStatus(
  status: unknown,
): status is ParticipantDashboardReferralStatus {
  return typeof status === "string" && participantReferralStatuses.has(status);
}

function parseParticipantReferrals(value: unknown): ParticipantDashboardReferral[] | null {
  if (
    typeof value !== "object" ||
    value === null ||
    !("referrals" in value) ||
    !Array.isArray(value.referrals)
  ) {
    return null;
  }
  const referrals: ParticipantDashboardReferral[] = [];
  for (const referral of value.referrals) {
    if (
      typeof referral !== "object" ||
      referral === null ||
      !("reference" in referral) ||
      typeof referral.reference !== "string" ||
      !/^FE-[A-F0-9]{24}$/.test(referral.reference) ||
      !("status" in referral) ||
      typeof referral.status !== "string" ||
      !isParticipantDashboardReferralStatus(referral.status) ||
      !("createdAt" in referral) ||
      typeof referral.createdAt !== "string" ||
      Number.isNaN(Date.parse(referral.createdAt))
    ) {
      return null;
    }
    referrals.push({
      reference: referral.reference,
      status: referral.status,
      createdAt: new Date(referral.createdAt).toISOString(),
    });
  }
  return referrals;
}

function parseParticipantRewards(value: unknown): ParticipantDashboardReward[] | null {
  if (
    typeof value !== "object" ||
    value === null ||
    !("rewards" in value) ||
    !Array.isArray(value.rewards)
  ) {
    return null;
  }
  const rewards: ParticipantDashboardReward[] = [];
  for (const reward of value.rewards) {
    if (
      typeof reward !== "object" ||
      reward === null ||
      !("reference" in reward) ||
      typeof reward.reference !== "string" ||
      !/^FE-[A-F0-9]{24}$/.test(reward.reference) ||
      !("decision" in reward) ||
      typeof reward.decision !== "string" ||
      !isParticipantDashboardRewardDecision(reward.decision) ||
      !("amount" in reward) ||
      typeof reward.amount !== "number" ||
      !Number.isFinite(reward.amount) ||
      !("currency" in reward) ||
      typeof reward.currency !== "string" ||
      !/^[A-Z]{3}$/.test(reward.currency) ||
      !("createdAt" in reward) ||
      typeof reward.createdAt !== "string" ||
      Number.isNaN(Date.parse(reward.createdAt)) ||
      !("reviewedAt" in reward) ||
      (reward.reviewedAt !== null &&
        (typeof reward.reviewedAt !== "string" || Number.isNaN(Date.parse(reward.reviewedAt)))) ||
      !("payment" in reward)
    ) {
      return null;
    }
    if (
      (reward.decision === "pending" && reward.reviewedAt !== null) ||
      (reward.decision !== "pending" && reward.reviewedAt === null) ||
      (reward.payment !== null && reward.decision !== "qualified")
    ) {
      return null;
    }

    let payment: ParticipantDashboardReward["payment"] = null;
    if (reward.payment !== null) {
      if (
        typeof reward.payment !== "object" ||
        !("amount" in reward.payment) ||
        typeof reward.payment.amount !== "number" ||
        !Number.isFinite(reward.payment.amount) ||
        !("currency" in reward.payment) ||
        typeof reward.payment.currency !== "string" ||
        !/^[A-Z]{3}$/.test(reward.payment.currency) ||
        !("paidAt" in reward.payment) ||
        typeof reward.payment.paidAt !== "string" ||
        Number.isNaN(Date.parse(reward.payment.paidAt))
      ) {
        return null;
      }
      payment = {
        amount: reward.payment.amount,
        currency: reward.payment.currency,
        paidAt: new Date(reward.payment.paidAt).toISOString(),
      };
    }
    rewards.push({
      reference: reward.reference,
      decision: reward.decision,
      amount: reward.amount,
      currency: reward.currency,
      createdAt: new Date(reward.createdAt).toISOString(),
      reviewedAt: reward.reviewedAt === null ? null : new Date(reward.reviewedAt).toISOString(),
      payment,
    });
  }
  return rewards;
}

export async function loadParticipantDashboard(): Promise<
  ReferralAuthState | ParticipantDashboard
> {
  let dashboard: ParticipantDashboard | undefined;
  const authState = await loadReferralAuthState(async (accessToken) => {
    const apiOriginValue = import.meta.env["VITE_API_ORIGIN"];
    if (!apiOriginValue) {
      throw new ReferralAuthConfigurationError(
        "missing_configuration",
        "Missing server configuration: VITE_API_ORIGIN",
      );
    }
    const apiOrigin = validateOrigin(apiOriginValue, "VITE_API_ORIGIN");
    const headers = {
      Accept: "application/json",
      Authorization: ["Bearer", accessToken].join(" "),
    };
    const bootstrapResponse = await fetch(`${apiOrigin}/participant/bootstrap`, {
      method: "POST",
      headers,
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });
    if (bootstrapResponse.status === 401) return "signed-out";
    if (!bootstrapResponse.ok)
      throw new ReferralAuthServiceError("Participant bootstrap failed.", bootstrapResponse.status);
    const bootstrapResult: unknown = await bootstrapResponse.json();
    if (
      typeof bootstrapResult !== "object" ||
      bootstrapResult === null ||
      !("status" in bootstrapResult) ||
      bootstrapResult.status !== "ready"
    )
      throw new ReferralAuthServiceError("Participant bootstrap response was invalid.", 502);

    const overviewResponse = await fetch(`${apiOrigin}/participant/overview`, {
      method: "GET",
      headers,
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });
    if (overviewResponse.status === 401) return "signed-out";
    if (!overviewResponse.ok)
      throw new ReferralAuthServiceError("Participant overview failed.", overviewResponse.status);
    const overview = parseParticipantOverview(await overviewResponse.json());
    if (!overview)
      throw new ReferralAuthServiceError("Participant overview response was invalid.", 502);
    const referralLinkResponse = await fetch(`${apiOrigin}/participant/referral-link`, {
      method: "GET",
      headers,
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });
    if (referralLinkResponse.status === 401) return "signed-out";
    if (!referralLinkResponse.ok)
      throw new ReferralAuthServiceError(
        "Participant referral link failed.",
        referralLinkResponse.status,
      );
    const referralCode = parseParticipantReferralCode(await referralLinkResponse.json());
    if (!referralCode)
      throw new ReferralAuthServiceError("Participant referral link response was invalid.", 502);
    const referralsResponse = await fetch(`${apiOrigin}/participant/referrals`, {
      method: "GET",
      headers,
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });
    if (referralsResponse.status === 401) return "signed-out";
    if (!referralsResponse.ok)
      throw new ReferralAuthServiceError("Participant referrals failed.", referralsResponse.status);
    const referrals = parseParticipantReferrals(await referralsResponse.json());
    if (!referrals)
      throw new ReferralAuthServiceError("Participant referrals response was invalid.", 502);
    const rewardsResponse = await fetch(`${apiOrigin}/participant/rewards`, {
      method: "GET",
      headers,
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });
    if (rewardsResponse.status === 401) return "signed-out";
    if (!rewardsResponse.ok)
      throw new ReferralAuthServiceError("Participant rewards failed.", rewardsResponse.status);
    const rewards = parseParticipantRewards(await rewardsResponse.json());
    if (!rewards)
      throw new ReferralAuthServiceError("Participant rewards response was invalid.", 502);
    dashboard = { ...overview, referralCode, referrals, rewards };
    return "signed-in";
  });
  if (authState !== "signed-in") return authState;
  return dashboard ?? "unavailable";
}

export async function loadParticipantReferralSubmissionPolicy(
  locale: ReferralSubmissionLocale,
): Promise<ParticipantReferralSubmissionPolicyState> {
  let state: ParticipantReferralSubmissionPolicyState = "unavailable";
  const authState = await loadReferralAuthState(async (accessToken) => {
    const apiOriginValue = import.meta.env["VITE_API_ORIGIN"];
    if (!apiOriginValue) {
      throw new ReferralAuthConfigurationError(
        "missing_configuration",
        "Missing server configuration: VITE_API_ORIGIN",
      );
    }
    const apiOrigin = validateOrigin(apiOriginValue, "VITE_API_ORIGIN");
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const bootstrapResponse = await fetch(`${apiOrigin}/participant/bootstrap`, {
      method: "POST",
      headers,
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });
    if (bootstrapResponse.status === 401) return "signed-out";
    if (!bootstrapResponse.ok)
      throw new ReferralAuthServiceError("Participant bootstrap failed.", bootstrapResponse.status);
    const bootstrapPayload: unknown = await bootstrapResponse.json();
    if (
      typeof bootstrapPayload !== "object" ||
      bootstrapPayload === null ||
      !("status" in bootstrapPayload) ||
      bootstrapPayload.status !== "ready"
    ) {
      throw new ReferralAuthServiceError("Participant bootstrap response was invalid.", 502);
    }

    const response = await fetch(
      `${apiOrigin}/participant/referral-submission-policy?locale=${encodeURIComponent(locale)}`,
      {
        method: "GET",
        headers,
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(10_000),
      },
    );
    if (response.status === 401) return "signed-out";
    if (!response.ok)
      throw new ReferralAuthServiceError("Participant referral policy failed.", response.status);

    const payload: unknown = await response.json();
    if (
      typeof payload !== "object" ||
      payload === null ||
      !("available" in payload) ||
      typeof payload.available !== "boolean"
    ) {
      throw new ReferralAuthServiceError("Participant referral policy response was invalid.", 502);
    }
    if (!payload.available) {
      state = { status: "closed" };
      return "signed-in";
    }
    if (
      !("policyVersion" in payload) ||
      typeof payload.policyVersion !== "string" ||
      !("noticeText" in payload) ||
      typeof payload.noticeText !== "string" ||
      !("consentText" in payload) ||
      typeof payload.consentText !== "string" ||
      !payload.policyVersion.trim() ||
      !payload.noticeText.trim() ||
      !payload.consentText.trim()
    ) {
      throw new ReferralAuthServiceError("Participant referral policy response was invalid.", 502);
    }
    state = {
      status: "available",
      policy: {
        policyVersion: payload.policyVersion,
        noticeText: payload.noticeText,
        consentText: payload.consentText,
      },
    };
    return "signed-in";
  });
  if (authState !== "signed-in") return authState;
  return state;
}

export async function submitParticipantReferral(
  input: ReferralSubmissionInput,
): Promise<ParticipantReferralSubmissionActionResult> {
  let result: ParticipantReferralSubmissionActionResult = { status: "unavailable" };
  try {
    const authState = await loadReferralAuthState(async (accessToken) => {
      const apiOriginValue = import.meta.env["VITE_API_ORIGIN"];
      if (!apiOriginValue) {
        throw new ReferralAuthConfigurationError(
          "missing_configuration",
          "Missing server configuration: VITE_API_ORIGIN",
        );
      }
      const apiOrigin = validateOrigin(apiOriginValue, "VITE_API_ORIGIN");
      const response = await fetch(`${apiOrigin}/participant/referrals`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(10_000),
      });

      if (response.status === 401) {
        result = { status: "signed-out" };
        return "signed-out";
      }
      if (response.status === 400) {
        result = { status: "invalid" };
        return "signed-in";
      }
      if (response.status === 409) {
        const payload: unknown = await response.json();
        const error =
          typeof payload === "object" && payload !== null && "error" in payload
            ? payload.error
            : null;
        result = {
          status:
            error === "submission_unavailable"
              ? "submission-unavailable"
              : error === "policy_changed"
                ? "policy-changed"
                : error === "idempotency_conflict"
                  ? "idempotency-conflict"
                  : "unavailable",
        };
        return "signed-in";
      }
      if (response.status === 429) {
        result = { status: "rate-limited" };
        return "signed-in";
      }
      if (!response.ok)
        throw new ReferralAuthServiceError(
          "Participant referral submission failed.",
          response.status,
        );

      const payload: unknown = await response.json();
      if (
        typeof payload !== "object" ||
        payload === null ||
        !("reference" in payload) ||
        typeof payload.reference !== "string" ||
        !/^FE-[A-F0-9]{24}$/.test(payload.reference) ||
        !("status" in payload) ||
        !isParticipantDashboardReferralStatus(payload.status) ||
        !("createdAt" in payload) ||
        typeof payload.createdAt !== "string" ||
        Number.isNaN(Date.parse(payload.createdAt)) ||
        !("reviewRequired" in payload) ||
        typeof payload.reviewRequired !== "boolean"
      ) {
        throw new ReferralAuthServiceError(
          "Participant referral submission response was invalid.",
          502,
        );
      }
      result = {
        status: "success",
        result: {
          reference: payload.reference,
          status: payload.status,
          createdAt: new Date(payload.createdAt).toISOString(),
          reviewRequired: payload.reviewRequired,
        },
      };
      return "signed-in";
    });
    if (authState === "signed-out") return { status: "signed-out" };
    if (authState === "unavailable") return { status: "unavailable" };
    return result;
  } catch (error) {
    reportAuthFailure("participant_referral_submission", error, "api");
    return { status: "unavailable" };
  }
}

export async function logOutReferralUser(): Promise<ReferralAuthState> {
  markPrivateResponse();
  const supabase = createReferralSupabaseClient();
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (error) {
    reportAuthFailure("sign_out", error, "supabase");
    return "unavailable";
  }
  return "signed-out";
}

export function rejectDeferredReferralAccountAction(
  action: "registration" | "recovery",
): "unavailable" {
  markPrivateResponse();
  console.info(
    JSON.stringify({
      event: "referral_account_action_disabled",
      action,
      reason: "approval_pending",
    }),
  );
  return "unavailable";
}
