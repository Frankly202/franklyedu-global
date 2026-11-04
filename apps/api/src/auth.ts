import { createClient } from "@supabase/supabase-js";

export function createAccessTokenVerifier(
  supabaseUrl: string,
  supabaseKey: string,
) {
  const client = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  return async (accessToken: string): Promise<string | null> => {
    const { data, error } = await client.auth.getUser(accessToken);
    if (error) {
      if (error.status === 400 || error.status === 401 || error.status === 403)
        return null;
      throw new Error("Authentication verification is unavailable.");
    }
    return data.user?.id ?? null;
  };
}
