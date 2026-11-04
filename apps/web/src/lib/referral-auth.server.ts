import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";
import type { ReferralLoginCredentials } from "./referral-auth-validation";
import { getReferralCookieOptions } from "./referral-auth-cookies";
import { createReferralLoginLimit } from "./referral-login-limit";
import {
  classifyReferralAuthFailure,
  isInvalidReferralCredentials,
  isRejectedReferralSession,
  ReferralAuthConfigurationError,
  type ReferralAuthFailureSource,
} from "./referral-auth-errors";

type ReferralAuthState = "signed-in" | "signed-out" | "unavailable";
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
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
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
      const { error: signOutError } = await supabase.auth.signOut({
        scope: "local",
      });
      if (signOutError) reportAuthFailure("clear_unverified_login", signOutError, "supabase");
      return "unavailable";
    }
    return "signed-in";
  } catch (verificationError) {
    reportAuthFailure("api_session_verification", verificationError, "api");
    const { error: signOutError } = await supabase.auth.signOut({
      scope: "local",
    });
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
      const { error: signOutError } = await supabase.auth.signOut({
        scope: "local",
      });
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
    const { error: signOutError } = await supabase.auth.signOut({
      scope: "local",
    });
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
      const { error: signOutError } = await supabase.auth.signOut({
        scope: "local",
      });
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
      const { error: signOutError } = await supabase.auth.signOut({
        scope: "local",
      });
      if (signOutError) reportAuthFailure("clear_rejected_session", signOutError, "supabase");
      return "signed-out";
    }
    reportAuthFailure("validate_supabase_session", error, "supabase");
    return "unavailable";
  }
  if (!data.user) {
    const { error: signOutError } = await supabase.auth.signOut({
      scope: "local",
    });
    if (signOutError) reportAuthFailure("clear_mismatched_session", signOutError, "supabase");
    return "signed-out";
  }

  try {
    const verifiedUserId = await verifyAccessTokenWithApi(session.access_token);
    if (verifiedUserId === data.user.id)
      return onVerifiedSession ? await onVerifiedSession(session.access_token) : "signed-in";
    if (verifiedUserId === null) {
      const { error: signOutError } = await supabase.auth.signOut({
        scope: "local",
      });
      if (signOutError) reportAuthFailure("clear_invalid_api_session", signOutError, "supabase");
      return "signed-out";
    }
    const { error: signOutError } = await supabase.auth.signOut({
      scope: "local",
    });
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
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
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
