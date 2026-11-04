export interface ReferralLoginCredentials {
  email: string;
  password: string;
}

export function validateReferralRegistration(value: unknown): ReferralLoginCredentials {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("Invalid registration request.");
  }
  if (
    !("email" in value) ||
    !("password" in value) ||
    !("confirmPassword" in value) ||
    Object.keys(value).some((key) => !["email", "password", "confirmPassword"].includes(key))
  ) {
    throw new Error("Invalid registration request.");
  }
  const credentials = validateReferralLoginCredentials({
    email: value.email,
    password: value.password,
  });
  // Supabase Auth's configured local minimum is six characters; provider policy stays authoritative.
  if (
    credentials.password.length < 6 ||
    new TextEncoder().encode(credentials.password).length > 72 ||
    value.confirmPassword !== credentials.password
  ) {
    throw new Error("Invalid registration request.");
  }
  return credentials;
}

export function validateReferralLoginCredentials(value: unknown): ReferralLoginCredentials {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("Invalid login request.");
  }

  const credentials = value as Record<string, unknown>;
  const email = typeof credentials["email"] === "string" ? credentials["email"].trim() : "";
  if (
    Object.keys(credentials).some((key) => key !== "email" && key !== "password") ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof credentials["password"] !== "string" ||
    email.length > 254 ||
    credentials["password"].length === 0 ||
    credentials["password"].length > 256
  ) {
    throw new Error("Invalid login request.");
  }

  return { email, password: credentials["password"] };
}
