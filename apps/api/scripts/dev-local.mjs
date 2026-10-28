import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseEnv } from "node:util";
import { dirname, resolve } from "node:path";

const apiRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export function parseLocalSupabaseStatus(output) {
  let values;
  try {
    values = parseEnv(output);
  } catch {
    throw new Error("Local Supabase returned an unrecognized status format.");
  }

  const apiUrl = values["API_URL"];
  const serviceRoleKey = values["SERVICE_ROLE_KEY"];
  if (!apiUrl || !serviceRoleKey) {
    throw new Error("Local Supabase status is missing the local API URL or service key.");
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(apiUrl);
  } catch {
    throw new Error("Local Supabase returned an invalid API URL.");
  }

  const localHost = ["localhost", "127.0.0.1", "::1"].includes(parsedUrl.hostname);
  if (parsedUrl.protocol !== "http:" || !localHost) {
    throw new Error("Local development requires a loopback Supabase API URL.");
  }

  return {
    SUPABASE_URL: parsedUrl.origin,
    SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey,
  };
}

function runSupabase(args) {
  return spawnSync("supabase", args, {
    cwd: apiRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });
}

function getLocalSupabaseConfig() {
  let status = runSupabase(["status", "--output", "env"]);
  if (status.error?.code === "ENOENT") {
    throw new Error("Supabase CLI is required for local API development.");
  }

  if (status.status !== 0) {
    const start = runSupabase(["start"]);
    if (start.error?.code === "ENOENT") {
      throw new Error("Supabase CLI is required for local API development.");
    }
    if (start.status !== 0) {
      throw new Error("Could not start local Supabase; check the CLI and Docker status.");
    }

    status = runSupabase(["status", "--output", "env"]);
  }

  if (status.error?.code === "ENOENT") {
    throw new Error("Supabase CLI is required for local API development.");
  }
  if (status.status !== 0) {
    throw new Error("Could not read local Supabase status.");
  }

  return parseLocalSupabaseStatus(status.stdout);
}

function startApi() {
  const localConfig = getLocalSupabaseConfig();
  console.info("Starting the API with local Supabase.");

  const api = spawn(process.execPath, ["dist/src/server.js"], {
    cwd: apiRoot,
    env: {
      ...process.env,
      ...localConfig,
      NODE_ENV: "development",
      WEB_ORIGINS: "http://localhost:5173",
    },
    stdio: "inherit",
    windowsHide: true,
  });

  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () => api.kill(signal));
  }

  api.on("error", () => {
    console.error("Could not start the API process.");
    process.exitCode = 1;
  });
  api.on("exit", (code, signal) => {
    process.exitCode = signal ? 1 : (code ?? 1);
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.includes("--supabase-start")) {
      getLocalSupabaseConfig();
      console.info("Local Supabase is ready; generated credentials were not printed.");
    } else {
      startApi();
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Local API startup failed.");
    process.exitCode = 1;
  }
}
