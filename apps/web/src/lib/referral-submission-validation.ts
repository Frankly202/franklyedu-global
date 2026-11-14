export type ReferralSubmissionLocale = "en" | "tr" | "fr" | "sw";

export interface ReferralSubmissionInput {
  studentName: string;
  studentEmail: string;
  studentPhone: string | null;
  locale: ReferralSubmissionLocale;
  policyVersion: string;
  consentAccepted: true;
  idempotencyKey: string;
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function containsControlCharacters(value: string): boolean {
  return Array.from(value).some((character) => {
    const codePoint = character.codePointAt(0);
    return codePoint !== undefined && (codePoint <= 0x1f || codePoint === 0x7f);
  });
}

export function validateReferralSubmissionLocale(value: unknown): ReferralSubmissionLocale {
  if (value === "en" || value === "tr" || value === "fr" || value === "sw") return value;
  throw new Error("Invalid referral locale.");
}

export function validateReferralSubmission(value: unknown): ReferralSubmissionInput {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("Invalid referral submission.");
  }
  const input = value as Record<string, unknown>;
  const allowedKeys = [
    "studentName",
    "studentEmail",
    "studentPhone",
    "locale",
    "policyVersion",
    "consentAccepted",
    "idempotencyKey",
  ];
  if (
    Object.keys(input).length !== allowedKeys.length ||
    Object.keys(input).some((key) => !allowedKeys.includes(key))
  ) {
    throw new Error("Invalid referral submission.");
  }

  const rawName = typeof input["studentName"] === "string" ? input["studentName"] : "";
  const rawEmail = typeof input["studentEmail"] === "string" ? input["studentEmail"] : "";
  const rawPhone =
    input["studentPhone"] === null
      ? ""
      : typeof input["studentPhone"] === "string"
        ? input["studentPhone"]
        : "\u0000";
  const studentName = rawName.normalize("NFC").trim().replace(/\s+/gu, " ");
  const studentEmail = rawEmail.normalize("NFC").trim();
  const studentPhone = rawPhone.normalize("NFC").trim().replace(/\s+/gu, " ");
  const locale = validateReferralSubmissionLocale(input["locale"]);
  const policyVersion =
    typeof input["policyVersion"] === "string" ? input["policyVersion"].trim() : "";
  const idempotencyKey = typeof input["idempotencyKey"] === "string" ? input["idempotencyKey"] : "";

  if (
    !studentName ||
    Array.from(studentName).length > 200 ||
    containsControlCharacters(rawName) ||
    studentEmail.length < 3 ||
    studentEmail.length > 320 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(studentEmail) ||
    containsControlCharacters(rawEmail) ||
    (studentPhone !== "" &&
      (Array.from(studentPhone).length < 3 ||
        Array.from(studentPhone).length > 40 ||
        containsControlCharacters(rawPhone))) ||
    !policyVersion ||
    policyVersion.length > 80 ||
    input["consentAccepted"] !== true ||
    !uuidPattern.test(idempotencyKey)
  ) {
    throw new Error("Invalid referral submission.");
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
