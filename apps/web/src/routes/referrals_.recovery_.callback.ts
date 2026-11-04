import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/referrals_/recovery_/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { receiveRecoveryCallback } = await import("@/lib/referral-recovery.server");
        return receiveRecoveryCallback(request);
      },
    },
  },
});
