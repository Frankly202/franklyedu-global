import type { CookieOptions } from "@supabase/ssr";

export function getReferralCookieOptions(isProduction: boolean): CookieOptions & { name: string } {
  return {
    name: isProduction ? "__Host-franklyedu-referral-auth" : "franklyedu-referral-auth",
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
  };
}
