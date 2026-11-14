import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:http";
import { resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { parseEnv } from "node:util";
import { chromium } from "playwright";
import { createServer as createViteServer } from "vite";
import { createApiApp } from "../../api/dist/src/app.js";
import { createAccessTokenVerifier } from "../../api/dist/src/auth.js";
import {
  createParticipantBootstrap,
  createParticipantReferralCode,
  createParticipantOverview,
  createParticipantReferrals,
  createParticipantRewards,
  createParticipantReferralSubmissionPolicy,
  createParticipantReferralSubmission,
} from "../../api/dist/src/participant.js";

function queryLocalDatabase(sql) {
  const result = spawnSync("supabase", ["db", "query", "--local", "--output-format", "json", sql], {
    cwd: resolve("../api"),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.status !== 0) {
    throw new Error("Local database audit verification failed.");
  }
  try {
    return JSON.parse(result.stdout);
  } catch {
    throw new Error("Local database returned an unexpected audit result.");
  }
}

function localSupabaseConfig() {
  const status = spawnSync("supabase", ["status", "--output", "env"], {
    cwd: resolve("../api"),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (status.status !== 0) {
    throw new Error("Local Supabase is not available. Start the approved local environment first.");
  }
  const values = parseEnv(status.stdout);
  const url = new URL(values["API_URL"]);
  if (
    url.protocol !== "http:" ||
    !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) ||
    !values["ANON_KEY"]
  ) {
    throw new Error("Local auth tests require a loopback Supabase URL and local anon key.");
  }
  return { url: url.origin, anonKey: values["ANON_KEY"], serviceKey: values["SERVICE_ROLE_KEY"] };
}

function queryLocalDatabaseRows(sql) {
  const result = queryLocalDatabase(sql);
  return Array.isArray(result) ? result : (result.rows ?? result.result ?? []);
}

function prepareLocalSubmissionPolicyFixtures() {
  const copy = {
    en: {
      notice: "Synthetic local-test notice only; not approved for real data collection.",
      consent: "Synthetic local-test consent only; not approved for real data collection.",
    },
    tr: {
      notice: "Yalnızca sentetik yerel test bildirimi; gerçek veri toplama için onaylı değildir.",
      consent: "Yalnızca sentetik yerel test onayı; gerçek veri toplama için onaylı değildir.",
    },
    fr: {
      notice:
        "Notice synthétique de test local uniquement ; non approuvée pour la collecte réelle.",
      consent:
        "Consentement synthétique de test local uniquement ; non approuvé pour la collecte réelle.",
    },
    sw: {
      notice:
        "Notisi ya majaribio ya ndani pekee; haijaidhinishwa kwa ukusanyaji halisi wa taarifa.",
      consent:
        "Ridhaa ya majaribio ya ndani pekee; haijaidhinishwa kwa ukusanyaji halisi wa taarifa.",
    },
  };
  const activePolicies = queryLocalDatabaseRows(
    "select locale, policy_version from public.referral_submission_policies where is_active;",
  );
  const locales = Object.keys(copy);
  const testLocales = [];

  for (const locale of locales) {
    const active = activePolicies.find((policy) => policy.locale === locale);
    if (active && active.policy_version !== "local-test-fixture-only") continue;
    if (active) {
      testLocales.push(locale);
      continue;
    }

    const localized = copy[locale];
    queryLocalDatabase(
      `insert into public.referral_submission_policies
         (locale, policy_version, notice_text, consent_text, is_active)
       values (
         '${locale}',
         'local-test-fixture-only',
         '${localized.notice.replaceAll("'", "''")}',
         '${localized.consent.replaceAll("'", "''")}',
         true
       )
       on conflict (locale, policy_version) do update
         set notice_text = excluded.notice_text,
             consent_text = excluded.consent_text,
           is_active = true
       returning locale;`,
    );
    testLocales.push(locale);
  }
  return testLocales;
}

async function selectLanguage(page, language, locale) {
  const trigger = page.getByRole("button", {
    name: /Select language|Dil seçin|Choisir la langue|Chagua lugha/,
  });
  await trigger.click();
  const options = page.getByRole("group", { name: /Languages|Diller|Langues|Lugha/ });
  await options.getByRole("button", { name: language, exact: true }).click();
  await page.waitForFunction((expectedLocale) => {
    return document.documentElement.lang === expectedLocale;
  }, locale);
}

let browser;
let web;
let api;
let testAccount;
let participantReferralFixture;
let participantRewardFixture;
let localSubmissionPolicyLocales = [];
const bootstrappedActors = [];
let config;
const originalFetch = globalThis.fetch;
let supabaseRequests = 0;
let refreshFailure;
let rejectNextUserCheck = false;
try {
  config = localSupabaseConfig();
  globalThis.fetch = (input, options) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    if (!["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) {
      throw new Error("Local auth tests cannot contact hosted services.");
    }
    if (url.origin === config.url) supabaseRequests += 1;
    if (url.origin === config.url && rejectNextUserCheck && url.pathname === "/auth/v1/user") {
      rejectNextUserCheck = false;
      return Promise.resolve(
        Response.json({ message: "Test access token rejection", code: "bad_jwt" }, { status: 401 }),
      );
    }
    if (url.origin === config.url && refreshFailure && url.pathname === "/auth/v1/token") {
      if (refreshFailure === "transport") {
        return Promise.reject(new TypeError("Test provider connection failure"));
      }
      return Promise.resolve(
        Response.json(
          { message: "Test refresh failure", code: "test_refresh_failure" },
          { status: refreshFailure },
        ),
      );
    }
    if (url.origin === config.url && refreshFailure && url.pathname === "/auth/v1/logout") {
      return Promise.resolve(new Response(null, { status: 204 }));
    }
    return originalFetch(input, options);
  };
  const authHealth = await fetch(`${config.url}/auth/v1/health`, {
    headers: { apikey: config.anonKey },
    signal: AbortSignal.timeout(10_000),
  });
  assert.equal(authHealth.status, 200, "Local Supabase Auth must be responsive.");
  console.log("PASS: local Supabase Auth is responsive; only loopback services will be used.");

  api = createServer(
    createApiApp({
      allowedOrigins: new Set(),
      checkDatabase: async () => {
        throw new Error("Database readiness is outside this test's scope.");
      },
      authSessionRateLimit: { limit: 200, windowMs: 60_000 },
      verifyAccessToken: createAccessTokenVerifier(config.url, config.anonKey),
      bootstrapParticipant: async (token, verifiedUserId) => {
        await createParticipantBootstrap(config.url, config.anonKey)(token, verifiedUserId);
        bootstrappedActors.push(verifiedUserId);
      },
      getParticipantOverview: createParticipantOverview(config.url, config.anonKey),
      getParticipantReferralCode: createParticipantReferralCode(config.url, config.anonKey),
      getParticipantReferrals: async (token, verifiedUserId) => {
        if (participantReferralFixture) {
          assert.equal(verifiedUserId, testAccount);
          return participantReferralFixture;
        }
        return createParticipantReferrals(config.url, config.anonKey)(token, verifiedUserId);
      },
      getParticipantRewards: async (token, verifiedUserId) => {
        if (participantRewardFixture) {
          assert.equal(verifiedUserId, testAccount);
          return participantRewardFixture;
        }
        return createParticipantRewards(config.url, config.anonKey)(token, verifiedUserId);
      },
      getParticipantReferralSubmissionPolicy: createParticipantReferralSubmissionPolicy(
        config.url,
        config.anonKey,
      ),
      submitParticipantReferral: createParticipantReferralSubmission(config.url, config.anonKey),
    }),
  );
  api.listen(0, "127.0.0.1");
  await once(api, "listening");
  const address = api.address();
  assert.ok(address && typeof address !== "string");
  const apiOrigin = `http://127.0.0.1:${address.port}`;

  process.env["SUPABASE_URL"] = config.url;
  process.env["SUPABASE_ANON_KEY"] = config.anonKey;
  process.env["VITE_API_ORIGIN"] = apiOrigin;
  process.env["NODE_ENV"] = "development";
  web = await createViteServer({
    server: { host: "127.0.0.1", port: 0 },
  });
  await web.listen();
  const webAddress = web.httpServer.address();
  assert.ok(webAddress && typeof webAddress !== "string");
  const webOrigin = `http://127.0.0.1:${webAddress.port}`;

  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  // Prevent browser navigation/requests to hosted services even if a configuration regresses.
  await context.route("**/*", async (route) => {
    const hostname = new URL(route.request().url()).hostname;
    if (!["localhost", "127.0.0.1", "[::1]"].includes(hostname)) {
      await route.abort();
      return;
    }
    await route.continue();
  });
  const page = await context.newPage();
  await page.goto(`${webOrigin}/login`, { waitUntil: "networkidle" });
  assert.equal(await page.locator("main form").count(), 1);
  assert.equal(await page.locator("main [role=alert]").count(), 0);
  console.log(
    "PASS: anonymous login page validates configured local Auth without claiming an outage.",
  );
  await page.goto(`${webOrigin}/participant`, { waitUntil: "networkidle" });
  assert.equal(new URL(page.url()).pathname, "/login");
  assert.equal(bootstrappedActors.length, 0);
  console.log("PASS: anonymous participant route redirects to login without bootstrapping.");

  for (const authorization of [undefined, "Basic invalid", "Bearer invalid-token"]) {
    const response = await fetch(`${apiOrigin}/auth/session`, {
      headers: authorization ? { authorization, "x-user-id": "untrusted" } : {},
    });
    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { error: "Authentication required." });
  }
  console.log("PASS: Express rejects missing, malformed, and unverified tokens via local Auth.");

  const requestPromise = page.waitForRequest(
    (request) => request.method() === "POST" && request.url().startsWith(webOrigin),
  );
  await page.locator('input[name="email"]').fill("no-account@auth-test.invalid");
  await page.locator('input[name="password"]').fill("deliberately-invalid-password");
  await page.locator('button[type="submit"]').click();
  const loginRequest = await requestPromise;
  await page.getByRole("alert").waitFor();
  assert.equal(
    await page.getByRole("alert").innerText(),
    "Unable to log in. Check your details or try again later.",
  );
  assert.equal(
    (await context.cookies()).some((cookie) => cookie.name.includes("referral-auth")),
    false,
  );
  console.log("PASS: real local invalid-credential rejection is generic and creates no session.");

  const headers = await loginRequest.allHeaders();
  delete headers["host"];
  delete headers["content-length"];
  delete headers["cookie"];
  delete headers["sec-fetch-site"];
  headers["origin"] = "https://untrusted.invalid";
  const csrfResponse = await page.request.post(loginRequest.url(), {
    headers,
    data: loginRequest.postData(),
  });
  assert.equal(csrfResponse.status(), 403);
  console.log("PASS: cross-origin login is rejected before contacting Auth.");

  if (process.argv.includes("--with-account")) {
    assert.ok(config.serviceKey, "Local account testing requires the local service key.");
    const existingAccounts = queryLocalDatabaseRows(
      `select u.id::text as id, u.email
       from auth.users u
       join public.referral_participants p on p.user_id = u.id
       where u.email like 'referral-test-%@example.invalid'
         and not exists (
           select 1
           from public.referrals referral
           where referral.referrer_id = p.user_id
         )
       order by u.created_at asc
       limit 1;`,
    );
    const existingAccount = existingAccounts[0];
    const email = existingAccount?.email ?? `referral-test-${randomUUID()}@example.invalid`;
    const password = randomUUID();
    const created = await fetch(
      existingAccount
        ? `${config.url}/auth/v1/admin/users/${existingAccount.id}`
        : `${config.url}/auth/v1/admin/users`,
      {
        method: existingAccount ? "PUT" : "POST",
        headers: {
          apikey: config.serviceKey,
          authorization: `Bearer ${config.serviceKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(
          existingAccount ? { password } : { email, password, email_confirm: true },
        ),
      },
    );
    if (!created.ok) {
      const error = await created.json();
      console.error(
        JSON.stringify({
          event: "local_test_account_create_failed",
          status: created.status,
          code: error.code,
        }),
      );
    }
    assert.ok(created.ok, "Dedicated local Auth account creation must succeed.");
    const account = await created.json();
    testAccount = existingAccount?.id ?? account.id;
    assert.equal(typeof testAccount, "string");
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill("wrong-test-account-password");
    await page.locator('button[type="submit"]').click();
    await page.getByRole("alert").waitFor();
    assert.equal(
      await page.getByRole("alert").innerText(),
      "Unable to log in. Check your details or try again later.",
    );
    assert.equal(
      (await context.cookies()).some((cookie) => cookie.name.includes("referral-auth")),
      false,
    );
    console.log("PASS: incorrect password for an existing local account is rejected generically.");
    await page.locator('input[name="password"]').fill(password);
    await page.locator('button[type="submit"]').click();
    await page.getByRole("button", { name: "Log out" }).waitFor();
    const readSession = async () => {
      const cookies = (await context.cookies())
        .filter((cookie) => cookie.name.startsWith("franklyedu-referral-auth"))
        .sort((a, b) => a.name.localeCompare(b.name));
      assert.ok(cookies.length > 0);
      for (const cookie of cookies) {
        assert.equal(cookie.httpOnly, true);
        assert.equal(cookie.sameSite, "Lax");
      }
      const encoded = cookies.map((cookie) => cookie.value).join("");
      assert.ok(encoded.startsWith("base64-"));
      return JSON.parse(Buffer.from(encoded.slice(7), "base64url").toString());
    };
    const initialSession = await readSession();
    const verified = await fetch(`${apiOrigin}/auth/session`, {
      headers: {
        authorization: `Bearer ${initialSession.access_token}`,
        "x-user-id": "untrusted",
      },
    });
    assert.equal(verified.status, 200);
    assert.deepEqual(await verified.json(), { userId: testAccount });
    await page.reload({ waitUntil: "networkidle" });
    assert.ok(await page.getByRole("button", { name: "Log out" }).isVisible());
    console.log(
      "PASS: real local login, HttpOnly cookies, reload persistence, and verified API actor.",
    );
    await page.goto(`${webOrigin}/participant`, { waitUntil: "networkidle" });
    assert.equal(new URL(page.url()).pathname, "/participant");
    assert.equal(await page.getByRole("status").first().innerText(), "Account access: Verified");
    assert.equal(await page.locator("[data-referral-panel] article").count(), 2);
    const referralLinkPanel = page.locator("[data-participant-referral-link]");
    const referralCode = await referralLinkPanel.locator("code").innerText();
    assert.match(referralCode, /^[A-F0-9]{32}$/);
    assert.equal(
      await referralLinkPanel.locator("a").getAttribute("href"),
      `https://franklyedu.com/referrals?ref=${referralCode}`,
    );
    assert.match(
      await referralLinkPanel.innerText(),
      /Check this protected area for current submission availability\./,
    );
    const referralsPanel = page.locator("[data-participant-referrals]");
    assert.equal(await referralsPanel.locator("li").count(), 0);
    assert.match(
      await referralsPanel.innerText(),
      /There are no referrals recorded for your account\./,
    );
    assert.equal(
      await page
        .locator("[data-referral-panel]")
        .innerText()
        .then((text) => text.includes("No referrals are recorded for this account yet.")),
      true,
    );
    for (const [
      locale,
      language,
      title,
      accessStatus,
      empty,
      linkNotice,
      referralsTitle,
      referralsEmpty,
      rewardsTitle,
      rewardsEmpty,
    ] of [
      [
        "en",
        "English",
        "Participant dashboard",
        "Account access: Verified",
        "No referrals are recorded for this account yet.",
        "Check this protected area for current submission availability.",
        "My referrals",
        "There are no referrals recorded for your account.",
        "My rewards",
        "There are no reward qualification records for your account.",
      ],
      [
        "tr",
        "Türkçe",
        "Katılımcı paneli",
        "Hesap erişimi: Doğrulandı",
        "Bu hesap için henüz tavsiye kaydı yok.",
        "Gönderim durumunu bu korumalı alandan kontrol edin.",
        "Tavsiyelerim",
        "Hesabınız için kayıtlı tavsiye bulunmuyor.",
        "Ödüllerim",
        "Hesabınız için ödül yeterlilik kaydı bulunmuyor.",
      ],
      [
        "fr",
        "Français",
        "Tableau de bord participant",
        "Accès au compte: Vérifié",
        "Aucune recommandation n’est encore enregistrée pour ce compte.",
        "Consultez cet espace sécurisé pour vérifier si les envois sont disponibles.",
        "Mes recommandations",
        "Aucune recommandation n’est enregistrée pour votre compte.",
        "Mes récompenses",
        "Aucune décision d’admissibilité à une récompense n’est enregistrée pour votre compte.",
      ],
      [
        "sw",
        "Kiswahili",
        "Dashibodi ya mshiriki",
        "Ufikiaji wa akaunti: Imethibitishwa",
        "Hakuna rufaa zilizorekodiwa kwa akaunti hii bado.",
        "Angalia eneo hili lililolindwa ili kujua kama uwasilishaji unapatikana.",
        "Rufaa zangu",
        "Hakuna rufaa zilizorekodiwa kwa akaunti yako.",
        "Zawadi zangu",
        "Hakuna rekodi za ustahiki wa zawadi kwenye akaunti yako.",
      ],
    ]) {
      await selectLanguage(page, language, locale);
      await page.goto(`${webOrigin}/participant`, { waitUntil: "networkidle" });
      for (const width of [375, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        assert.equal(await page.locator("main h1").innerText(), title);
        assert.equal(await page.getByRole("status").first().innerText(), accessStatus);
        const panelText = await page.locator("[data-referral-panel]").innerText();
        assert.ok(panelText.includes(empty));
        assert.ok(panelText.includes(linkNotice));
        const referralsText = await page.locator("[data-participant-referrals]").innerText();
        assert.ok(referralsText.includes(referralsTitle));
        assert.ok(referralsText.includes(referralsEmpty));
        assert.equal(await page.locator("[data-participant-referrals] li").count(), 0);
        const rewardsText = await page.locator("[data-participant-rewards]").innerText();
        assert.ok(rewardsText.includes(rewardsTitle));
        assert.ok(rewardsText.includes(rewardsEmpty));
        assert.equal(await page.locator("[data-participant-rewards] li").count(), 0);
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
          ),
        );
        for (const card of await page.locator("[data-referral-panel] article").all()) {
          const rect = await card.boundingBox();
          assert.ok(rect && rect.x >= 0 && rect.x + rect.width <= width);
        }
        const linkRect = await page.locator("[data-participant-referral-link]").boundingBox();
        assert.ok(linkRect && linkRect.x >= 0 && linkRect.x + linkRect.width <= width);
      }
    }
    participantReferralFixture = [
      {
        reference: "FE-0123456789ABCDEF01234567",
        status: "application_in_progress",
        createdAt: "2026-11-12T10:30:00.000Z",
      },
    ];
    for (const [language, locale, localizedStatus] of [
      ["English", "en", "Application in progress"],
      ["Türkçe", "tr", "Başvuru devam ediyor"],
      ["Français", "fr", "Candidature en cours"],
      ["Kiswahili", "sw", "Maombi yanaendelea"],
    ]) {
      await selectLanguage(page, language, locale);
      await page.goto(`${webOrigin}/participant`, { waitUntil: "networkidle" });
      const referralsPanel = page.locator("[data-participant-referrals]");
      assert.equal(await referralsPanel.locator("li").count(), 1);
      assert.ok((await referralsPanel.innerText()).includes("FE-0123456789ABCDEF01234567"));
      assert.ok((await referralsPanel.innerText()).includes(localizedStatus));
      assert.equal(
        await referralsPanel.locator("time").getAttribute("datetime"),
        "2026-11-12T10:30:00.000Z",
      );
      const referralsText = await referralsPanel.innerText();
      assert.equal(referralsText.includes("Student Example"), false);
      assert.equal(referralsText.includes("student@example.test"), false);
    }
    participantReferralFixture = undefined;
    participantRewardFixture = [
      {
        reference: "FE-1123456789ABCDEF01234567",
        decision: "qualified",
        amount: 170,
        currency: "EUR",
        createdAt: "2026-11-11T09:00:00.000Z",
        reviewedAt: "2026-11-12T09:00:00.000Z",
        payment: {
          amount: 170,
          currency: "EUR",
          paidAt: "2026-11-13T09:00:00.000Z",
        },
      },
      {
        reference: "FE-0123456789ABCDEF01234567",
        decision: "pending",
        amount: 170,
        currency: "EUR",
        createdAt: "2026-11-10T09:00:00.000Z",
        reviewedAt: null,
        payment: null,
      },
    ];
    for (const [language, locale, qualifiedLabel, pendingLabel] of [
      ["English", "en", "Qualified", "Pending review"],
      ["Türkçe", "tr", "Uygun bulundu", "İnceleme bekliyor"],
      ["Français", "fr", "Admissible", "En attente d’examen"],
      ["Kiswahili", "sw", "Imestahili", "Inasubiri kukaguliwa"],
    ]) {
      await selectLanguage(page, language, locale);
      await page.goto(`${webOrigin}/participant`, { waitUntil: "networkidle" });
      const rewardsPanel = page.locator("[data-participant-rewards]");
      const cards = rewardsPanel.locator("li");
      const formattedQualifiedAmount = new Intl.NumberFormat(
        { en: "en-GB", tr: "tr-TR", fr: "fr-FR", sw: "sw-KE" }[locale],
        { style: "currency", currency: "EUR" },
      ).format(170);
      assert.equal(await cards.count(), 2);
      assert.ok((await cards.nth(0).innerText()).includes("FE-1123456789ABCDEF01234567"));
      assert.ok((await cards.nth(0).innerText()).includes(qualifiedLabel));
      assert.ok((await cards.nth(0).innerText()).includes(formattedQualifiedAmount));
      assert.ok((await cards.nth(1).innerText()).includes("FE-0123456789ABCDEF01234567"));
      assert.ok((await cards.nth(1).innerText()).includes(pendingLabel));
      assert.equal((await cards.nth(1).innerText()).includes(formattedQualifiedAmount), false);
      assert.equal(
        await cards.nth(0).locator("time").last().getAttribute("datetime"),
        "2026-11-13T09:00:00.000Z",
      );
      const rewardsText = await rewardsPanel.innerText();
      assert.equal(rewardsText.includes("internal_reference"), false);
      assert.equal(rewardsText.includes("recorded_by"), false);
      assert.equal(await rewardsPanel.getByRole("button").count(), 0);
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
        ),
      );
    }
    participantRewardFixture = undefined;

    localSubmissionPolicyLocales = prepareLocalSubmissionPolicyFixtures();
    const submissionLocales = [
      ["English", "en", "Student's full name", "Submit referral"],
      ["Türkçe", "tr", "Öğrencinin tam adı", "Tavsiyeyi gönder"],
      ["Français", "fr", "Nom complet de l’étudiant", "Envoyer la recommandation"],
      ["Kiswahili", "sw", "Jina kamili la mwanafunzi", "Wasilisha rufaa"],
    ];
    const testStudentEmail = `integration-student-${testAccount.slice(0, 8)}@example.test`;
    const testStudentName = "Synthetic Integration Student";
    await page.addInitScript(() => {
      Object.defineProperty(globalThis.crypto, "randomUUID", {
        configurable: true,
        value: () =>
          sessionStorage.getItem("referral-test-idempotency-key") ??
          "00000000-0000-4000-8000-000000000311",
      });
    });
    await page.evaluate(() => {
      sessionStorage.setItem(
        "referral-test-idempotency-key",
        "00000000-0000-4000-8000-000000000311",
      );
    });

    let firstReferralReference;
    for (const [language, locale, nameLabel, submitLabel] of submissionLocales) {
      await selectLanguage(page, language, locale);
      await page.setViewportSize({ width: 375, height: 900 });
      const submissionPageResponse = await page.goto(`${webOrigin}/participant/refer`, {
        waitUntil: "networkidle",
      });
      const submissionPageRoot = page.locator("[data-referral-submission]");
      if ((await submissionPageRoot.count()) !== 1) {
        console.error(
          JSON.stringify({
            event: "local_referral_submission_page_missing",
            status: submissionPageResponse?.status() ?? null,
            path: new URL(page.url()).pathname,
            loginFormVisible: (await page.locator("main form").count()) === 1,
          }),
        );
      }
      const form = page.locator("[data-referral-submission] form");
      await page.waitForFunction(() => {
        const root = document.querySelector("[data-referral-submission]");
        return Boolean(
          root?.querySelector("form, [data-referral-submission-closed], [role=alert]"),
        );
      });
      if ((await form.count()) !== 1) {
        const policyState = (await page.locator("[data-referral-submission-closed]").count())
          ? "closed"
          : (await page.locator("[data-referral-submission] [role=alert]").count())
            ? "unavailable"
            : "unexpected";
        console.error(
          JSON.stringify({
            event: "local_referral_submission_policy_unavailable",
            policyState,
          }),
        );
        assert.equal(await form.count(), 1);
      }
      for (const width of [375, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        assert.equal(await form.locator('input[name="studentName"]').count(), 1);
        assert.equal(await form.locator('input[name="studentEmail"]').count(), 1);
        assert.equal(await form.locator('input[name="studentPhone"]').count(), 1);
        assert.equal(await form.getByLabel(nameLabel).count(), 1);
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
          ),
        );
      }

      if (locale === "en") {
        await page.setViewportSize({ width: 375, height: 900 });
        await form.locator('input[name="studentName"]').fill(testStudentName);
        await form.locator('input[name="studentEmail"]').fill(testStudentEmail);
        await form.getByRole("checkbox").check();
        await form.getByRole("button", { name: submitLabel }).click();
        const success = page.locator("[data-referral-submission-success]");
        await success.waitFor();
        firstReferralReference = await success.locator("dd").first().innerText();
        assert.match(firstReferralReference, /^FE-[A-F0-9]{24}$/);
        assert.equal((await success.innerText()).includes(testStudentEmail), false);

        await page.evaluate(() => {
          sessionStorage.setItem(
            "referral-test-idempotency-key",
            "00000000-0000-4000-8000-000000000311",
          );
        });
        await page.goto(`${webOrigin}/participant/refer`, { waitUntil: "networkidle" });
        const retryForm = page.locator("[data-referral-submission] form");
        await retryForm.waitFor();
        await retryForm.locator('input[name="studentName"]').fill(testStudentName);
        await retryForm.locator('input[name="studentEmail"]').fill(testStudentEmail);
        await retryForm.getByRole("checkbox").check();
        await retryForm.getByRole("button", { name: submitLabel }).click();
        await page.locator("[data-referral-submission-success]").waitFor();
        const retryCounts = queryLocalDatabaseRows(
          `select
               (select count(*)::integer from public.referrals
                where referrer_id = '${testAccount}'
                  and referred_student_email_normalized = lower('${testStudentEmail}')) as referral_count,
               (select count(*)::integer from public.referral_duplicate_review_flags flag
                join public.referrals referral on referral.id = flag.referral_id
                where referral.referrer_id = '${testAccount}'
                  and referral.referred_student_email_normalized = lower('${testStudentEmail}')
                  and flag.flag_source = 'automated_check') as duplicate_flag_count;`,
        )[0];
        assert.equal(retryCounts?.referral_count, 1);
        assert.equal(retryCounts?.duplicate_flag_count, 0);
        assert.equal(
          await page.locator("[data-referral-submission-success] dd").first().innerText(),
          firstReferralReference,
        );

        await page.evaluate(() => {
          sessionStorage.setItem(
            "referral-test-idempotency-key",
            "00000000-0000-4000-8000-000000000312",
          );
        });
        await page.goto(`${webOrigin}/participant/refer`, { waitUntil: "networkidle" });
        const duplicateForm = page.locator("[data-referral-submission] form");
        await duplicateForm.waitFor();
        await duplicateForm.locator('input[name="studentName"]').fill(testStudentName);
        await duplicateForm.locator('input[name="studentEmail"]').fill(testStudentEmail);
        await duplicateForm.getByRole("checkbox").check();
        await duplicateForm.getByRole("button", { name: submitLabel }).click();
        await page
          .getByRole("heading", {
            name: /flagged for additional review|ek inceleme için işaretlendi|signalée pour un examen complémentaire|ukaguzi wa ziada/,
          })
          .waitFor();
        const duplicateReference = await page
          .locator("[data-referral-submission-success] dd")
          .first()
          .innerText();
        assert.match(duplicateReference, /^FE-[A-F0-9]{24}$/);
        assert.notEqual(duplicateReference, firstReferralReference);
        const duplicateCounts = queryLocalDatabaseRows(
          `select
              (select count(*)::integer from public.referrals
               where referrer_id = '${testAccount}'
                 and referred_student_email_normalized = lower('${testStudentEmail}')) as referral_count,
              (select count(*)::integer from public.referral_duplicate_review_flags flag
               join public.referrals referral on referral.id = flag.referral_id
               where referral.referrer_id = '${testAccount}'
                 and referral.referred_student_email_normalized = lower('${testStudentEmail}')
                 and flag.flag_source = 'automated_check') as duplicate_flag_count;`,
        )[0];
        assert.equal(duplicateCounts?.referral_count, 2);
        assert.equal(duplicateCounts?.duplicate_flag_count, 1);
      }
    }

    const submissionAuditRows = queryLocalDatabaseRows(
      `select
         (select count(*)::integer
          from public.referrals
          where referrer_id = '${testAccount}'
            and referred_student_email_normalized = lower('${testStudentEmail}')) as referral_count,
         (select count(*)::integer
          from public.referral_consents consent
          join public.referrals referral on referral.id = consent.referral_id
          where referral.referrer_id = '${testAccount}'
            and referral.referred_student_email_normalized = lower('${testStudentEmail}')
            and consent.consented_by = '${testAccount}') as consent_count,
         (select count(*)::integer
          from public.referral_submission_idempotency idempotency
          join public.referrals referral on referral.id = idempotency.referral_id
          where idempotency.participant_id = '${testAccount}'
            and referral.referred_student_email_normalized = lower('${testStudentEmail}')) as idempotency_count,
         (select count(*)::integer
          from public.referral_duplicate_review_flags flag
          join public.referrals referral on referral.id = flag.referral_id
          where referral.referrer_id = '${testAccount}'
            and referral.referred_student_email_normalized = lower('${testStudentEmail}')
            and flag.flag_source = 'automated_check') as duplicate_flag_count,
         (select count(*)::integer
          from public.referral_audit_events event
          join public.referrals referral on referral.id::text = event.entity_id
          where referral.referrer_id = '${testAccount}'
            and referral.referred_student_email_normalized = lower('${testStudentEmail}')
            and event.actor_user_id = '${testAccount}'
            and event.event_type in ('referral.created', 'referral.consent_recorded')) as audit_count;`,
    )[0];
    assert.equal(submissionAuditRows?.referral_count, 2);
    assert.equal(submissionAuditRows?.consent_count, 2);
    assert.equal(submissionAuditRows?.idempotency_count, 2);
    assert.equal(submissionAuditRows?.duplicate_flag_count, 1);
    assert.equal(submissionAuditRows?.audit_count, 4);
    console.log(
      "PASS: browser → BFF → API → local Supabase submission, idempotency, duplicate review, and audit.",
    );

    assert.ok(bootstrappedActors.length > 0);
    assert.ok(bootstrappedActors.every((actor) => actor === testAccount));
    assert.match(testAccount, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    const auditResult = queryLocalDatabase(
      `select count(*)::integer as event_count
       from public.referral_audit_events
       where actor_user_id = '${testAccount}'
         and entity_id = '${testAccount}'
         and event_type = 'participant.account_bootstrapped';`,
    );
    const auditRows = Array.isArray(auditResult)
      ? auditResult
      : (auditResult.rows ?? auditResult.result ?? []);
    assert.equal(auditRows[0]?.event_count, 1);
    console.log(
      "PASS: localized, responsive browser → BFF → API → local Supabase dashboard and bootstrap audit event.",
    );
    await selectLanguage(page, "English", "en");
    await page.goto(`${webOrigin}/login`, { waitUntil: "networkidle" });

    // Force stored expiry, not token claims, to exercise real provider refresh without waiting an hour.
    await context.clearCookies();
    await context.addCookies([
      {
        name: "franklyedu-referral-auth",
        value: `base64-${Buffer.from(
          JSON.stringify({
            ...initialSession,
            expires_at: Math.floor(Date.now() / 1000) - 60,
          }),
        ).toString("base64url")}`,
        url: webOrigin,
        httpOnly: true,
        sameSite: "Lax",
      },
    ]);
    await page.reload({ waitUntil: "networkidle" });
    assert.ok(await page.getByRole("button", { name: "Log out" }).isVisible());
    const refreshedSession = await readSession();
    assert.ok(
      refreshedSession.refresh_token !== initialSession.refresh_token,
      "The local provider must rotate the refresh token.",
    );
    assert.ok(refreshedSession.expires_at > Math.floor(Date.now() / 1000));
    const refreshedVerification = await fetch(`${apiOrigin}/auth/session`, {
      headers: { authorization: `Bearer ${refreshedSession.access_token}` },
    });
    assert.equal(refreshedVerification.status, 200);
    assert.deepEqual(await refreshedVerification.json(), { userId: testAccount });
    const validCookies = await context.cookies();
    for (const status of [429, 503, "transport", 400, 401, 403]) {
      await context.clearCookies();
      await context.addCookies(validCookies);
      refreshFailure = status;
      rejectNextUserCheck = true;
      try {
        const state = await page.evaluate(async () => {
          const { getReferralAuthState } = await import("/src/lib/referral-auth.functions.ts");
          return getReferralAuthState();
        });
        const rejected = [400, 401, 403].includes(status);
        assert.equal(state, rejected ? "signed-out" : "unavailable");
        const remaining = (await context.cookies()).filter((cookie) =>
          cookie.name.includes("referral-auth"),
        );
        assert.equal(remaining.length > 0, !rejected);
        if (!rejected) {
          assert.ok(
            JSON.stringify(remaining) ===
              JSON.stringify(
                validCookies.filter((cookie) => cookie.name.includes("referral-auth")),
              ),
            "Provider failures must preserve existing session cookies.",
          );
        }
      } finally {
        refreshFailure = undefined;
        rejectNextUserCheck = false;
      }
    }
    await context.clearCookies();
    await context.addCookies(validCookies);
    await page.reload({ waitUntil: "networkidle" });
    assert.ok(await page.getByRole("button", { name: "Log out" }).isVisible());
    console.log(
      "PASS: refresh 400/401/403 clears sessions; 429/503/network failures preserve cookies and recover.",
    );
    await page.getByRole("button", { name: "Log out" }).click();
    await page.locator('input[name="email"]').waitFor();
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.getByRole("button", { name: "Log out" }).count(), 0);
    assert.equal(
      (await context.cookies()).some((cookie) => cookie.name.includes("referral-auth")),
      false,
    );
    console.log(
      "PASS: real refresh-token rotation, refreshed API verification, and persistent logout.",
    );
  }

  for (const expired of [false, true]) {
    const value = `base64-${Buffer.from(
      JSON.stringify({
        access_token: "invalid-token",
        refresh_token: "invalid-refresh-token",
        expires_at: Math.floor(Date.now() / 1000) + (expired ? -3600 : 3600),
        expires_in: 3600,
        token_type: "bearer",
        user: { id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa" },
      }),
    ).toString("base64url")}`;
    // Exercise both plain and chunked SSR cookies without creating an Auth user.
    const pieces = expired ? [value.slice(0, 100), value.slice(100)] : [value];
    await context.addCookies(
      pieces.map((piece, index) => ({
        name: `franklyedu-referral-auth${expired ? `.${index}` : ""}`,
        value: piece,
        url: webOrigin,
        httpOnly: true,
        sameSite: "Lax",
      })),
    );
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.locator("main form").count(), 1);
    assert.equal(await page.locator("main [role=alert]").count(), 0);
    assert.equal(await page.getByRole("button", { name: "Log out" }).count(), 0);
    assert.equal(
      (await context.cookies()).some((cookie) => cookie.name.includes("referral-auth")),
      false,
    );
  }
  console.log(
    "PASS: forged and expired/chunked sessions are rejected and removed, not reported as outages.",
  );

  const logoutRequestPromise = page.waitForRequest(
    (request) => request.method() === "POST" && request.url().startsWith(webOrigin),
  );
  const logoutState = await page.evaluate(async () => {
    const { logOutReferral } = await import("/src/lib/referral-auth.functions.ts");
    return logOutReferral();
  });
  const logoutRequest = await logoutRequestPromise;
  assert.equal(logoutState, "signed-out");
  const logoutHeaders = await logoutRequest.allHeaders();
  delete logoutHeaders["host"];
  delete logoutHeaders["content-length"];
  delete logoutHeaders["cookie"];
  delete logoutHeaders["sec-fetch-site"];
  logoutHeaders["origin"] = "https://untrusted.invalid";
  const logoutCsrf = await page.request.post(logoutRequest.url(), { headers: logoutHeaders });
  assert.equal(logoutCsrf.status(), 403);
  console.log("PASS: anonymous logout is idempotent and cross-origin logout is rejected.");

  const requestsBeforeDeferredActions = supabaseRequests;
  for (const action of ["registerReferralAccount"]) {
    const actionRequestPromise = page.waitForRequest(
      (request) => request.method() === "POST" && request.url().startsWith(webOrigin),
    );
    const state = await page.evaluate(async (actionName) => {
      const functions = await import("/src/lib/referral-auth.functions.ts");
      return functions[actionName](
        actionName === "registerReferralAccount"
          ? {
              data: {
                email: "disabled-registration@example.invalid",
                password: "test-password",
                confirmPassword: "test-password",
              },
            }
          : undefined,
      );
    }, action);
    const request = await actionRequestPromise;
    assert.equal(state, "unavailable");
    const actionHeaders = await request.allHeaders();
    delete actionHeaders["host"];
    delete actionHeaders["content-length"];
    delete actionHeaders["cookie"];
    delete actionHeaders["sec-fetch-site"];
    actionHeaders["origin"] = "https://untrusted.invalid";
    const denied = await page.request.post(request.url(), { headers: actionHeaders });
    assert.equal(denied.status(), 403);
  }
  assert.equal(supabaseRequests, requestsBeforeDeferredActions);
  console.log("PASS: public registration remains closed and CSRF-protected.");
  const requestsBeforeUnapprovedRecovery = supabaseRequests;
  await page.goto(`${webOrigin}/referrals/recovery`, { waitUntil: "networkidle" });
  assert.equal(
    await page.locator("main input:enabled, main button[type=submit]:enabled").count(),
    0,
  );
  assert.equal(supabaseRequests, requestsBeforeUnapprovedRecovery);
  console.log("PASS: recovery dispatch remains disabled on an unapproved frontend origin.");

  let observedThrottle = false;
  for (let attempt = 0; attempt < 21; attempt++) {
    const before = supabaseRequests;
    const state = await page.evaluate(async (index) => {
      const { logInReferral } = await import("/src/lib/referral-auth.functions.ts");
      return logInReferral({
        data: { email: `limited-${index}@example.invalid`, password: "invalid-password" },
      });
    }, attempt);
    assert.equal(state, "signed-out");
    if (supabaseRequests === before) observedThrottle = true;
    if (observedThrottle) assert.equal(supabaseRequests, before);
  }
  assert.ok(observedThrottle, "Failed credentials must exhaust the BFF login limit.");
  console.log("PASS: failed logins across account names are bounded before any Auth request.");

  await page.goto(`${webOrigin}/signup`, { waitUntil: "networkidle" });
  assert.equal(
    await page.locator("main input:enabled, main button[type=submit]:enabled").count(),
    0,
  );
  console.log("PASS: registration and student-data collection remain unavailable.");
  if (!testAccount)
    console.log(
      "BLOCKED: successful login, authenticated persistence/refresh/logout, and valid-token verification require an authorized existing local test account.",
    );
} catch (error) {
  console.error(
    JSON.stringify({
      event: "local_auth_test_failed",
      errorType: error instanceof Error ? error.name : "UnknownError",
      location:
        error instanceof Error ? error.stack?.match(/auth-test\.mjs:\d+:\d+/)?.[0] : undefined,
    }),
  );
  process.exitCode = 1;
} finally {
  await browser?.close();
  await web?.close();
  if (api?.listening) {
    api.close();
    await once(api, "close");
  }
  if (testAccount && bootstrappedActors.includes(testAccount)) {
    console.info(
      "Local participant test account retained because append-only audit history references its actor.",
    );
  } else if (testAccount) {
    const removed = await fetch(`${config.url}/auth/v1/admin/users/${testAccount}`, {
      method: "DELETE",
      headers: { apikey: config.serviceKey, authorization: `Bearer ${config.serviceKey}` },
    });
    if (!removed.ok) {
      console.error("Dedicated local test account cleanup failed.");
      process.exitCode = 1;
    } else console.log("PASS: only the temporary dedicated local Auth account was removed.");
  }
  if (config && localSubmissionPolicyLocales.length > 0) {
    try {
      const locales = localSubmissionPolicyLocales.map((locale) => `'${locale}'`).join(", ");
      queryLocalDatabase(
        `update public.referral_submission_policies
         set is_active = false
         where policy_version = 'local-test-fixture-only'
           and locale in (${locales})
         returning locale;`,
      );
      console.log("PASS: local synthetic submission policies were deactivated.");
    } catch {
      console.error("Local synthetic referral policy cleanup failed.");
      process.exitCode = 1;
    }
  }
  globalThis.fetch = originalFetch;
}
