import { validateReferralRegistration } from "./referral-auth-validation";

export const localRecoveryCallback = "http://localhost:5173/referrals/recovery/callback";
export const recoveryCookieName = "franklyedu-recovery";

export function isLocalRecoveryApproved(
  requestUrl: string,
  supabaseUrl: string,
  production: boolean,
) {
  if (production) return false;
  try {
    const provider = new URL(supabaseUrl);
    return (
      new URL(requestUrl).origin === new URL(localRecoveryCallback).origin &&
      provider.protocol === "http:" &&
      ["localhost", "127.0.0.1"].includes(provider.hostname) &&
      provider.port === "55431" &&
      provider.pathname === "/" &&
      !provider.username &&
      !provider.password &&
      !provider.search &&
      !provider.hash
    );
  } catch {
    return false;
  }
}

export function validateRecoveryEmail(value: unknown): { email: string } {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    !("email" in value) ||
    typeof value.email !== "string" ||
    Object.keys(value).some((key) => key !== "email") ||
    value.email.trim().length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email.trim())
  )
    throw new Error("Invalid recovery request.");
  return { email: value.email.trim() };
}

export function validateRecoveryPassword(value: unknown): { password: string } {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    !("password" in value) ||
    !("confirmPassword" in value) ||
    Object.keys(value).some((key) => !["password", "confirmPassword"].includes(key))
  )
    throw new Error("Invalid password request.");
  return {
    password: validateReferralRegistration({
      email: "validation@example.invalid",
      password: value.password,
      confirmPassword: value.confirmPassword,
    }).password,
  };
}

export function validRecoveryHash(value: string | null): value is string {
  return value !== null && /^[a-f0-9]{56}$/.test(value);
}
