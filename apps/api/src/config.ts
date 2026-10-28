export interface ApiConfig {
  nodeEnv: string;
  port: number;
  supabaseUrl: URL;
  supabaseServiceRoleKey: string;
  allowedOrigins: Set<string>;
}

function requiredValue(env: NodeJS.ProcessEnv, key: string): string {
  const value = env[key]?.trim();
  if (!value) throw new Error(`Missing required configuration: ${key}`);
  return value;
}

function parseOriginList(value: string): Set<string> {
  const origins = value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (origins.length === 0 || origins.includes("*")) {
    throw new Error("WEB_ORIGINS must contain explicit origins and cannot include a wildcard.");
  }

  return new Set(
    origins.map((origin) => {
      let parsed: URL;
      try {
        parsed = new URL(origin);
      } catch {
        throw new Error("WEB_ORIGINS contains an invalid origin.");
      }

      const localHttp =
        parsed.protocol === "http:" &&
        (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1");
      if ((!localHttp && parsed.protocol !== "https:") || parsed.origin !== origin) {
        throw new Error("WEB_ORIGINS entries must be HTTPS origins (except local development).");
      }
      return parsed.origin;
    }),
  );
}

function parseSupabaseUrl(value: string): URL {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("SUPABASE_URL must be a valid URL.");
  }

  const localHttp =
    url.protocol === "http:" && (url.hostname === "localhost" || url.hostname === "127.0.0.1");
  if ((!localHttp && url.protocol !== "https:") || url.username || url.password) {
    throw new Error("SUPABASE_URL must use HTTPS and must not contain embedded credentials.");
  }
  return url;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): ApiConfig {
  const port = Number(env["PORT"] ?? "3000");
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer from 1 to 65535.");
  }

  return {
    nodeEnv: env["NODE_ENV"] ?? "development",
    port,
    supabaseUrl: parseSupabaseUrl(requiredValue(env, "SUPABASE_URL")),
    supabaseServiceRoleKey: requiredValue(env, "SUPABASE_SERVICE_ROLE_KEY"),
    allowedOrigins: parseOriginList(requiredValue(env, "WEB_ORIGINS")),
  };
}
