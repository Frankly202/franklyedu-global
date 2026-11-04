export type ReferralAuthFailureCategory =
  | "missing_configuration"
  | "invalid_configuration"
  | "supabase_auth_unavailable"
  | "api_session_unavailable"
  | "authentication_error";

export type ReferralAuthFailureSource = "supabase" | "api" | "unknown";

export class ReferralAuthConfigurationError extends Error {
  constructor(
    public readonly category: "missing_configuration" | "invalid_configuration",
    message: string,
  ) {
    super(message);
    this.name = "ReferralAuthConfigurationError";
  }
}

export function classifyReferralAuthFailure(
  error: unknown,
  source: ReferralAuthFailureSource,
): ReferralAuthFailureCategory {
  if (error instanceof ReferralAuthConfigurationError) return error.category;

  const status =
    typeof error === "object" && error !== null && "status" in error ? error.status : undefined;
  const isServiceFailure = typeof status === "number" && (status === 429 || status >= 500);
  const isTransportFailure =
    error instanceof TypeError ||
    (error instanceof Error && /fetch|network|timeout/i.test(error.name));

  if (source === "supabase" && (isServiceFailure || isTransportFailure)) {
    return "supabase_auth_unavailable";
  }
  if (source === "api" && (isServiceFailure || isTransportFailure)) {
    return "api_session_unavailable";
  }
  return "authentication_error";
}

export function isInvalidReferralCredentials(error: { status?: number | undefined }): boolean {
  return error.status === 400 || error.status === 401;
}

export function isRejectedReferralSession(error: { status?: number | undefined }): boolean {
  return error.status === 400 || error.status === 401 || error.status === 403;
}
