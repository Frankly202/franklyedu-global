import { createClient } from "@supabase/supabase-js";

import { createApiApp } from "./app.js";
import { loadConfig } from "./config.js";

try {
  const config = loadConfig();
  const supabaseOptions = {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  };
  const databaseClient = createClient(
    config.supabaseUrl.href.replace(/\/$/, ""),
    config.supabaseServiceRoleKey,
    supabaseOptions,
  );

  const app = createApiApp({
    allowedOrigins: config.allowedOrigins,
    checkDatabase: async () => {
      const { data, error } = await databaseClient.rpc("referral_api_health_check");
      if (error) return false;
      return data === true;
    },
    log: (entry) => {
      const serialized = JSON.stringify(entry);
      if (entry["event"] === "http_error") console.error(serialized);
      else console.info(serialized);
    },
  });

  app.listen(config.port, "0.0.0.0", () => {
    console.info(JSON.stringify({ event: "api_started", port: config.port }));
  });
} catch (error) {
  const errorType = error instanceof Error ? error.name : "UnknownError";
  console.error(JSON.stringify({ event: "api_startup_failed", errorType }));
  process.exitCode = 1;
}
