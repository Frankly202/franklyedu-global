import { createClient } from "@supabase/supabase-js";

export function createParticipantBootstrap(
  supabaseUrl: string,
  anonKey: string,
) {
  return async (accessToken: string, verifiedUserId: string): Promise<void> => {
    const client = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    });
    const { error: bootstrapError } = await client.rpc(
      "bootstrap_referral_participant",
    );
    if (bootstrapError) throw new Error("Participant bootstrap failed.");

    const { data, error } = await client
      .from("referral_participants")
      .select("user_id")
      .eq("user_id", verifiedUserId)
      .maybeSingle();
    if (error || !data)
      throw new Error("Participant ownership verification failed.");
  };
}
