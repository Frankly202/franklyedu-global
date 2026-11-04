import { createServerFn } from "@tanstack/react-start";
import {
  classifyReferralAuthFailure,
  type ReferralAuthFailureSource,
} from "./referral-auth-errors";
import {
  validateReferralLoginCredentials,
  validateReferralRegistration,
} from "./referral-auth-validation";
import { validateRecoveryEmail } from "./referral-recovery-validation";

function reportAuthFailure(
  stage: string,
  error: unknown,
  source: ReferralAuthFailureSource = "unknown",
) {
  console.error(
    JSON.stringify({
      event: "referral_auth_failure",
      stage,
      category: classifyReferralAuthFailure(error, source),
      errorType: error instanceof Error ? error.name : "UnknownError",
    }),
  );
}

export const getReferralAuthState = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { loadReferralAuthState } = await import("./referral-auth.server");
    return await loadReferralAuthState();
  } catch (error) {
    reportAuthFailure("load_auth_state", error);
    return "unavailable" as const;
  }
});

export const getParticipantFoundation = createServerFn({
  method: "POST",
}).handler(async () => {
  try {
    const { loadParticipantFoundation } = await import("./referral-auth.server");
    return await loadParticipantFoundation();
  } catch (error) {
    reportAuthFailure("participant_foundation", error, "api");
    return "unavailable" as const;
  }
});

export const logInReferral = createServerFn({ method: "POST" })
  .validator(validateReferralLoginCredentials)
  .handler(async ({ data }) => {
    try {
      const { logInReferralUser } = await import("./referral-auth.server");
      return await logInReferralUser(data);
    } catch (error) {
      reportAuthFailure("login_handler", error);
      return "unavailable" as const;
    }
  });

export const logOutReferral = createServerFn({ method: "POST" }).handler(async () => {
  try {
    const { logOutReferralUser } = await import("./referral-auth.server");
    return await logOutReferralUser();
  } catch (error) {
    reportAuthFailure("logout_handler", error);
    return "unavailable" as const;
  }
});

// The preview cannot submit; direct requests are validated but never create an account.
export const registerReferralAccount = createServerFn({ method: "POST" })
  .validator(validateReferralRegistration)
  .handler(async () => {
    const { rejectDeferredReferralAccountAction } = await import("./referral-auth.server");
    return rejectDeferredReferralAccountAction("registration");
  });

export const requestReferralAccountRecovery = createServerFn({ method: "POST" })
  .validator(validateRecoveryEmail)
  .handler(async ({ data }) => {
    const { requestRecovery } = await import("./referral-recovery.server");
    return requestRecovery(data.email);
  });
