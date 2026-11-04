// Shared across this BFF process only; no client identity or forwarded header is trusted.
export function createReferralLoginLimit() {
  let windowStart = 0;
  let attempts = 0;
  return (now = Date.now()): boolean => {
    if (now >= windowStart + 60_000 || now < windowStart) {
      windowStart = now;
      attempts = 0;
    }
    if (attempts >= 20) return false;
    attempts += 1;
    return true;
  };
}
