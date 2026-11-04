import { createClient } from "@supabase/supabase-js";
import { parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";
import { createReferralLoginLimit } from "./referral-login-limit";
import { isRejectedReferralSession } from "./referral-auth-errors";
import {
  isLocalRecoveryApproved,
  localRecoveryCallback,
  recoveryCookieName,
  validRecoveryHash,
} from "./referral-recovery-validation";

const allowRequest = createReferralLoginLimit();
const allowReset = createReferralLoginLimit();
const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 600,
};

function available() {
  return (
    isLocalRecoveryApproved(
      getRequest().url,
      process.env["SUPABASE_URL"] ?? "",
      process.env["NODE_ENV"] === "production",
    ) && Boolean(process.env["SUPABASE_ANON_KEY"])
  );
}

function privateResponse() {
  setResponseHeader("Cache-Control", "private, no-store");
  setResponseHeader("Referrer-Policy", "no-referrer");
}

function client() {
  return createClient(process.env["SUPABASE_URL"] ?? "", process.env["SUPABASE_ANON_KEY"] ?? "", {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

function clearRecovery(clearAuth = false) {
  const expired = [serializeCookieHeader(recoveryCookieName, "", { ...cookieOptions, maxAge: 0 })];
  if (clearAuth) {
    for (const cookie of parseCookieHeader(getRequest().headers.get("cookie") ?? "")) {
      if (/^franklyedu-referral-auth(?:\.\d+)?$/.test(cookie.name)) {
        expired.push(
          serializeCookieHeader(cookie.name, "", {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: 0,
          }),
        );
      }
    }
  }
  setResponseHeader("Set-Cookie", expired);
}

function report(stage: string, error: unknown) {
  console.error(
    JSON.stringify({
      event: "referral_recovery_failure",
      stage,
      errorType: error instanceof Error ? error.name : "UnknownError",
    }),
  );
}

export function recoveryAvailability() {
  privateResponse();
  return available();
}

export async function requestRecovery(email: string) {
  privateResponse();
  if (!available()) return "unavailable" as const;
  if (!allowRequest()) return "sent" as const;
  try {
    const { error } = await client().auth.resetPasswordForEmail(email, {
      redirectTo: localRecoveryCallback,
    });
    if (error) report("request", error);
  } catch (error) {
    report("request", error);
  }
  // Provider rejection, account absence and throttling have the same public response.
  return "sent" as const;
}

export function receiveRecoveryCallback(request: Request): Response {
  const url = new URL(request.url);
  const enabled =
    isLocalRecoveryApproved(
      request.url,
      process.env["SUPABASE_URL"] ?? "",
      process.env["NODE_ENV"] === "production",
    ) && Boolean(process.env["SUPABASE_ANON_KEY"]);
  const token = url.searchParams.get("token_hash");
  const accepted =
    enabled && validRecoveryHash(token) && url.searchParams.get("type") === "recovery";
  return new Response(null, {
    status: 303,
    headers: {
      Location: `/referrals/recovery/reset${accepted ? "" : "?status=invalid"}`,
      "Cache-Control": "private, no-store",
      "Referrer-Policy": "no-referrer",
      "Set-Cookie": serializeCookieHeader(recoveryCookieName, accepted ? token : "", {
        ...cookieOptions,
        maxAge: accepted ? 600 : 0,
      }),
    },
  });
}

export async function resetRecoveryPassword(password: string) {
  privateResponse();
  if (!available()) return "unavailable" as const;
  if (!allowReset()) return "unavailable" as const;
  const token =
    parseCookieHeader(getRequest().headers.get("cookie") ?? "").find(
      (cookie) => cookie.name === recoveryCookieName,
    )?.value ?? null;
  if (!validRecoveryHash(token)) {
    clearRecovery();
    return "invalid" as const;
  }
  const supabase = client();
  try {
    const { data, error } = await supabase.auth.verifyOtp({ token_hash: token, type: "recovery" });
    if (error || !data.session) {
      if (error && !isRejectedReferralSession(error)) {
        report("verify", error);
        return "unavailable" as const;
      }
      clearRecovery();
      return "invalid" as const;
    }
    // Consume the link even on update failure; never install a login session in browser cookies.
    clearRecovery(true);
    let updated = false;
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        report("update", updateError);
        return "unavailable" as const;
      }
      updated = true;
    } finally {
      const { error: signOutError } = await supabase.auth.signOut({ scope: "global" });
      if (signOutError) {
        report("cleanup", signOutError);
        updated = false;
      }
    }
    return updated ? ("success" as const) : ("unavailable" as const);
  } catch (error) {
    report("reset", error);
    return "unavailable" as const;
  }
}
