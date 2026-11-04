import { createServerFn } from "@tanstack/react-start";
import { validateRecoveryPassword } from "./referral-recovery-validation";

export const getRecoveryAvailability = createServerFn({ method: "GET" }).handler(async () => {
  const { recoveryAvailability } = await import("./referral-recovery.server");
  return recoveryAvailability();
});
export const updateRecoveryPassword = createServerFn({ method: "POST" })
  .validator(validateRecoveryPassword)
  .handler(async ({ data }) => {
    const { resetRecoveryPassword } = await import("./referral-recovery.server");
    return resetRecoveryPassword(data.password);
  });
