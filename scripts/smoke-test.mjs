import assert from "node:assert/strict";
import { createServer } from "node:net";
import { readFile, readdir } from "node:fs/promises";
import { chromium } from "playwright";
import { createServer as createViteServer } from "vite";

const routes = [
  "/",
  "/about",
  "/courses",
  "/universities",
  "/countries",
  "/scholarships",
  "/services",
  "/marketplace",
  "/accommodation",
  "/real-estate",
  "/contact",
  "/application",
  "/student",
  "/login",
  "/signup",
  "/real-estate/sarcon-87-renovated-villa-north-cyprus",
];

const siteUrl = "https://franklyedu.com";
const noindexRoutes = new Set(["/student", "/login", "/signup"]);
const indexableRoutes = routes.filter((route) => !noindexRoutes.has(route));
const canonicalUrl = (route) => (route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`);

async function getAvailablePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Could not allocate a local port for the smoke-test server.");
  }
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
  return address.port;
}

async function gotoReady(page, url) {
  const response = await page.goto(url, { waitUntil: "networkidle" });
  await page.locator("main h1").waitFor();
  return response;
}

async function selectLanguage(page, languageName, expectedLocale) {
  const trigger = page.getByRole("button", {
    name: /Select language|Dil seçin|Choisir la langue|Chagua lugha/,
  });
  await trigger.click();
  const options = page.getByRole("group", { name: /Languages|Diller|Langues|Lugha/ });
  for (const name of ["English", "Türkçe", "Français", "Kiswahili"]) {
    await options.getByRole("button", { name, exact: true }).waitFor();
  }
  await options.getByRole("button", { name: languageName, exact: true }).click();
  await page.waitForFunction((locale) => document.documentElement.lang === locale, expectedLocale);
  assert.equal(await page.evaluate(() => localStorage.getItem("frankedu_locale")), expectedLocale);
  assert.equal(await trigger.getAttribute("aria-expanded"), "false");
}

async function startDevServer() {
  const port = await getAvailablePort();
  const server = await createViteServer({
    configFile: "./vite.config.ts",
    server: { host: "127.0.0.1", port, strictPort: true },
  });
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    await server.listen();
    const response = await fetch(baseUrl);
    assert.ok(response.ok, `Development server returned ${response.status}.`);
    return { server, baseUrl };
  } catch (error) {
    await server.close();
    throw error;
  }
}

async function verifyProductionArtifacts() {
  const nitro = JSON.parse(await readFile(".output/nitro.json", "utf8"));
  const wrangler = JSON.parse(await readFile(".output/server/wrangler.json", "utf8"));
  const headers = await readFile(".output/public/_headers", "utf8");
  const robots = await readFile(".output/public/robots.txt", "utf8");
  const sitemap = await readFile(".output/public/sitemap.xml", "utf8");

  assert.equal(nitro.preset, "cloudflare-module", "Nitro must target Cloudflare Workers.");
  assert.equal(wrangler.assets?.binding, "ASSETS", "Cloudflare static asset binding is missing.");
  assert.equal(
    wrangler.assets?.directory,
    "../public",
    "Cloudflare public asset directory changed.",
  );
  assert.match(
    headers,
    /\/assets\/\*\s+cache-control:\s*public,\s*max-age=31536000,\s*immutable/i,
    "Hashed assets must retain immutable one-year caching headers.",
  );
  assert.match(robots, /User-agent:\s*\*/i, "robots.txt must include a general crawler policy.");
  assert.match(robots, /Allow:\s*\/\s*$/im, "robots.txt must allow public pages.");
  assert.match(
    robots,
    /^Sitemap:\s*https:\/\/franklyedu\.com\/sitemap\.xml\s*$/m,
    "robots.txt must reference the production sitemap.",
  );
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(
    [...sitemapUrls].sort(),
    indexableRoutes.map(canonicalUrl).sort(),
    "sitemap.xml must list exactly the indexable routes on the canonical host.",
  );
  for (const header of [
    /x-content-type-options:\s*nosniff/i,
    /x-frame-options:\s*DENY/i,
    /referrer-policy:\s*strict-origin-when-cross-origin/i,
    /permissions-policy:\s*camera=\(\)/i,
    /content-security-policy:\s*frame-ancestors 'none'/i,
  ]) {
    assert.match(headers, header, `Security header ${header} is missing from _headers.`);
  }
  await readFile(".output/public/favicon.ico");
  await readFile(".output/public/logo-full-transparent.png");
  await readFile(".output/public/icon-88.png");
  await readFile(".output/public/logo-watermark-white.webp");
  const assets = await readdir(".output/public/assets");
  assert.ok(
    assets.filter((asset) => asset.startsWith("background-photo-") && asset.endsWith(".webp"))
      .length >= 2,
    "Responsive variants of the optimized hero photograph must be in the production bundle.",
  );
  assert.equal(
    assets.filter(
      (asset) =>
        asset.startsWith("sarcon-") &&
        !asset.includes("-preview-") &&
        !asset.includes("-thumb-") &&
        asset.endsWith(".webp"),
    ).length,
    5,
    "All full-resolution property gallery images must use the optimized WebP variants.",
  );
  assert.equal(
    assets.filter((asset) => asset.startsWith("sarcon-") && asset.includes("-preview-")).length,
    5,
    "All property gallery images must have responsive preview variants.",
  );
  assert.equal(
    assets.filter((asset) => asset.startsWith("sarcon-") && asset.includes("-thumb-")).length,
    5,
    "All property gallery thumbnails must use the reduced-size variants.",
  );
  console.log(
    "✓ Cloudflare output, public assets, robots.txt, sitemap.xml, security and asset cache headers",
  );
}

async function runSmokeTests() {
  await verifyProductionArtifacts();

  let server;
  let baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    ({ server, baseUrl } = await startDevServer());
  }

  console.log(`Running headless Playwright tests against ${baseUrl}...`);
  let browser;

  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const browserErrors = [];
    const remoteFontRequests = [];
    page.on("pageerror", (error) => browserErrors.push(error.message));
    page.on("request", (request) => {
      const hostname = new URL(request.url()).hostname;
      if (hostname === "fonts.googleapis.com" || hostname === "fonts.gstatic.com") {
        remoteFontRequests.push(request.url());
      }
    });
    page.on("console", (message) => {
      if (message.type() === "error") browserErrors.push(message.text());
    });

    console.log("Checking all public routes and route metadata...");
    for (const route of routes) {
      const response = await gotoReady(page, `${baseUrl}${route}`);
      assert.ok(response, `Route ${route} returned no response.`);
      assert.ok(response.status() < 400, `Route ${route} returned ${response.status()}.`);
      assert.equal(await page.locator("main h1").count(), 1, `Route ${route} must render one h1.`);
      assert.ok(await page.title(), `Route ${route} must have a page title.`);
      assert.ok(
        await page.locator('meta[name="description"]').getAttribute("content"),
        `Route ${route} must have a description.`,
      );
      assert.ok(
        await page.locator('meta[property="og:title"]').getAttribute("content"),
        `Route ${route} must have an Open Graph title.`,
      );
      assert.ok(
        await page.locator('meta[property="og:description"]').getAttribute("content"),
        `Route ${route} must have an Open Graph description.`,
      );
      assert.ok(
        await page.locator('meta[property="og:image"]').getAttribute("content"),
        `Route ${route} must have an Open Graph image.`,
      );
      assert.ok(
        await page.locator('meta[name="twitter:title"]').getAttribute("content"),
        `Route ${route} must have a Twitter title.`,
      );
      assert.ok(
        await page.locator('meta[name="twitter:description"]').getAttribute("content"),
        `Route ${route} must have a Twitter description.`,
      );
      assert.ok(
        await page.locator('meta[name="twitter:image"]').getAttribute("content"),
        `Route ${route} must have a Twitter image.`,
      );
      assert.ok(
        (await page.locator('meta[property="og:image"]').getAttribute("content"))?.startsWith(
          `${siteUrl}/`,
        ),
        `Route ${route} must use an absolute production Open Graph image.`,
      );
      const canonicalLinks = page.locator('link[rel="canonical"]');
      const robotsLocator = page.locator('meta[name="robots"]');
      const robotsMeta = (await robotsLocator.count())
        ? await robotsLocator.getAttribute("content")
        : null;
      if (noindexRoutes.has(route)) {
        assert.equal(
          await canonicalLinks.count(),
          0,
          `Route ${route} must not declare a canonical.`,
        );
        assert.match(robotsMeta ?? "", /noindex/, `Route ${route} must be excluded from indexing.`);
      } else {
        assert.equal(await canonicalLinks.count(), 1, `Route ${route} needs one canonical link.`);
        assert.equal(await canonicalLinks.getAttribute("href"), canonicalUrl(route));
        assert.equal(
          await page.locator('meta[property="og:url"]').getAttribute("content"),
          canonicalUrl(route),
          `Route ${route} must declare its canonical Open Graph URL.`,
        );
        assert.equal(robotsMeta, null, `Route ${route} must remain indexable.`);
      }
    }
    console.log(`✓ ${routes.length} public routes render with SEO metadata`);

    console.log("Checking all routes in each supported locale...");
    const englishMetadata = new Map();
    for (const route of routes) {
      await gotoReady(page, `${baseUrl}${route}`);
      englishMetadata.set(route, {
        title: await page.title(),
        description: await page.locator('meta[name="description"]').getAttribute("content"),
      });
    }
    for (const [locale, languageName] of [
      ["tr", "Türkçe"],
      ["fr", "Français"],
      ["sw", "Kiswahili"],
    ]) {
      await gotoReady(page, `${baseUrl}/`);
      await selectLanguage(page, languageName, locale);
      for (const route of routes) {
        const response = await gotoReady(page, `${baseUrl}${route}`);
        assert.ok(response && response.status() < 400, `${locale} route ${route} failed.`);
        assert.equal(
          await page.locator("html").getAttribute("lang"),
          locale,
          `${route} must expose the selected document language.`,
        );
        assert.ok(await page.title(), `${locale} route ${route} must have a title.`);
        assert.ok(
          await page.locator('meta[name="description"]').getAttribute("content"),
          `${locale} route ${route} must have a description.`,
        );
        const localizedTitle = await page.title();
        const localizedDescription = await page
          .locator('meta[name="description"]')
          .getAttribute("content");
        const english = englishMetadata.get(route);
        assert.ok(
          localizedTitle !== english.title || localizedDescription !== english.description,
          `${locale} metadata for ${route} should be localized.`,
        );
      }
    }
    await gotoReady(page, `${baseUrl}/`);
    await selectLanguage(page, "English", "en");
    console.log(`✓ ${routes.length} routes expose localized metadata in EN/TR/FR/SW`);

    console.log("Checking language dropdown keyboard and outside-click behavior...");
    const languageTrigger = page.getByRole("button", {
      name: /Select language|Dil seçin|Choisir la langue|Chagua lugha/,
    });
    await languageTrigger.focus();
    await page.keyboard.press("ArrowDown");
    const languageOptions = page.getByRole("group", { name: "Languages" });
    const desktopOptionsBounds = await languageOptions.boundingBox();
    const desktopViewport = page.viewportSize();
    assert.ok(desktopOptionsBounds && desktopViewport);
    assert.ok(
      desktopOptionsBounds.x >= 0 &&
        desktopOptionsBounds.x + desktopOptionsBounds.width <= desktopViewport.width,
      "Language dropdown should remain within the desktop viewport.",
    );
    const englishOption = languageOptions.getByRole("button", { name: "English", exact: true });
    await englishOption.waitFor();
    await page.waitForFunction(() => document.activeElement?.textContent?.trim() === "English");
    assert.equal(
      await englishOption.evaluate((element) => element === document.activeElement),
      true,
      "ArrowDown from the language trigger should focus the first language.",
    );
    await page.keyboard.press("ArrowDown");
    const turkishOption = languageOptions.getByRole("button", { name: "Türkçe", exact: true });
    assert.equal(
      await turkishOption.evaluate((element) => element === document.activeElement),
      true,
      "ArrowDown should move focus to the next language.",
    );
    await page.keyboard.press("Home");
    assert.equal(
      await englishOption.evaluate((element) => element === document.activeElement),
      true,
      "Home should focus the first language.",
    );
    await page.keyboard.press("Escape");
    assert.equal(await languageTrigger.getAttribute("aria-expanded"), "false");
    assert.equal(
      await languageTrigger.evaluate((element) => element === document.activeElement),
      true,
      "Escape should return focus to the language trigger.",
    );
    await languageTrigger.click();
    await page.mouse.click(5, 800);
    assert.equal(
      await languageTrigger.getAttribute("aria-expanded"),
      "false",
      "An outside click should close the language dropdown.",
    );
    console.log("✓ Language dropdown is keyboard accessible and closes on Escape/outside click");

    console.log("Checking page heading hierarchy on listing pages...");
    for (const [route, heading] of [
      ["/universities", "Final International University (FIU)"],
      ["/accommodation", "On-campus student residence"],
      ["/real-estate", "Sarcon №87: Renovated Villa for Sale"],
    ]) {
      await gotoReady(page, `${baseUrl}${route}`);
      await page.getByRole("heading", { name: heading, level: 2 }).waitFor();
    }
    console.log("✓ Listing cards expose correctly nested section headings");

    console.log("Checking homepage content, desktop navigation, and search filters...");
    await gotoReady(page, `${baseUrl}/`);
    assert.match(await page.locator("main h1").innerText(), /Your Future\.\s*Our Global Network\./);

    const desktopNav = page.getByRole("navigation", { name: "Main navigation" });
    for (const [label, route] of [
      ["Universities", "/universities"],
      ["Courses", "/courses"],
      ["Countries", "/countries"],
      ["Scholarships", "/scholarships"],
      ["Services", "/services"],
      ["Marketplace", "/marketplace"],
      ["About", "/about"],
      ["Contact", "/contact"],
    ]) {
      await desktopNav.getByRole("link", { name: label }).click();
      await page.waitForFunction((pathname) => window.location.pathname === pathname, route);
      await page.locator("main h1").waitFor();
    }

    await gotoReady(page, `${baseUrl}/`);
    await desktopNav.getByRole("link", { name: "Universities" }).click();
    await page.waitForFunction(() => window.location.pathname === "/universities");
    await page.getByRole("heading", { name: "Find the right university." }).waitFor();

    await gotoReady(page, `${baseUrl}/`);
    await page.getByLabel("Study destination").selectOption("cyprus");
    await page.getByRole("button", { name: "Find Universities" }).click();
    await page.waitForFunction(
      () =>
        window.location.pathname === "/universities" &&
        new URLSearchParams(window.location.search).get("country") === "cyprus",
    );
    assert.ok(await page.getByText("Final International University").count());

    await gotoReady(page, `${baseUrl}/universities`);
    await page.getByLabel("Destination").selectOption("cyprus");
    await page.waitForFunction(
      () =>
        window.location.pathname === "/universities" &&
        new URLSearchParams(window.location.search).get("country") === "cyprus",
    );
    assert.ok(await page.getByText("Final International University").count());

    await gotoReady(page, `${baseUrl}/courses`);
    await page.getByLabel("University").selectOption("final-international-university");
    await page.waitForFunction(
      () =>
        window.location.pathname === "/courses" &&
        new URLSearchParams(window.location.search).get("university") ===
          "final-international-university",
    );
    assert.ok(await page.getByRole("link", { name: "Clear" }).count());
    console.log("✓ Primary desktop navigation, homepage search, and directory filters");

    console.log("Checking mobile navigation, localization, and application handoff...");
    await page.setViewportSize({ width: 320, height: 844 });
    await gotoReady(page, `${baseUrl}/`);
    const mobileLanguageTrigger = page.getByRole("button", {
      name: /Select language|Dil seçin|Choisir la langue|Chagua lugha/,
    });
    await mobileLanguageTrigger.click();
    const mobileLanguageOptions = page.getByRole("group", { name: "Languages" });
    const mobileOptionsBounds = await mobileLanguageOptions.boundingBox();
    const menuButtonBounds = await page.getByRole("button", { name: "Open menu" }).boundingBox();
    assert.ok(mobileOptionsBounds && menuButtonBounds);
    const fitsSmallViewport =
      mobileOptionsBounds.x >= 0 &&
      mobileOptionsBounds.x + mobileOptionsBounds.width <= 320 &&
      mobileOptionsBounds.y >= 0 &&
      mobileOptionsBounds.y + mobileOptionsBounds.height <= 844;
    const overlapsHamburger =
      mobileOptionsBounds.x < menuButtonBounds.x + menuButtonBounds.width &&
      mobileOptionsBounds.x + mobileOptionsBounds.width > menuButtonBounds.x &&
      mobileOptionsBounds.y < menuButtonBounds.y + menuButtonBounds.height &&
      mobileOptionsBounds.y + mobileOptionsBounds.height > menuButtonBounds.y;
    assert.ok(fitsSmallViewport, "Language dropdown should remain within a 320px viewport.");
    assert.equal(overlapsHamburger, false, "Language dropdown should not cover the menu button.");
    await page.mouse.click(5, 800);
    await page.setViewportSize({ width: 390, height: 844 });
    const menuButton = page.getByRole("button", { name: "Open menu" });
    await menuButton.click();
    const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
    await mobileNav.waitFor({ state: "visible" });
    await page.keyboard.press("Escape");
    await mobileNav.waitFor({ state: "detached" });
    assert.equal(await menuButton.getAttribute("aria-expanded"), "false");
    assert.equal(await menuButton.evaluate((element) => element === document.activeElement), true);

    await selectLanguage(page, "Türkçe", "tr");
    await selectLanguage(page, "Français", "fr");
    await selectLanguage(page, "Kiswahili", "sw");
    await selectLanguage(page, "English", "en");
    await page.getByRole("heading", { name: /Your Future\./ }).waitFor();
    assert.equal(await page.locator("html").getAttribute("lang"), "en");

    for (const [locale, languageName] of [
      ["en", "English"],
      ["tr", "Türkçe"],
      ["fr", "Français"],
      ["sw", "Kiswahili"],
    ]) {
      await gotoReady(page, `${baseUrl}/`);
      await selectLanguage(page, languageName, locale);
      await gotoReady(page, `${baseUrl}/application`);
      const applicationForm = page.locator("form");
      await applicationForm.locator("input").nth(0).fill("Smoke Test Applicant");
      await applicationForm.locator('input[type="email"]').fill("smoke@example.com");
      const submitButton = applicationForm.locator('button[type="submit"]');
      await submitButton.click();
      await applicationForm.locator("select").nth(0).selectOption("cyprus");
      await applicationForm.locator("select").nth(1).selectOption("final-international-university");
      await applicationForm.locator("select").nth(3).selectOption("January 2027");
      await submitButton.click();
      assert.equal(await page.locator('input[type="file"]').count(), 0);
      const documentsHeading = await applicationForm.locator("h2").innerText();
      await submitButton.click();
      await page.waitForFunction(
        (previousHeading) => document.querySelector("form h2")?.innerText !== previousHeading,
        documentsHeading,
      );

      let whatsappUrl;
      await page.route("https://wa.me/**", async (route) => {
        whatsappUrl = route.request().url();
        await route.fulfill({ status: 200, contentType: "text/html", body: "handoff intercepted" });
      });
      await submitButton.click();
      await page.waitForURL("https://wa.me/**");
      const whatsappMessage = new URL(whatsappUrl).searchParams.get("text");
      assert.match(whatsappMessage, /Smoke Test Applicant/);
      assert.match(whatsappMessage, /Final International University/);
      const localizedJanuary = {
        en: "January 2027",
        tr: "Ocak 2027",
        fr: "Janvier 2027",
        sw: "Januari 2027",
      }[locale];
      assert.ok(whatsappMessage.includes(localizedJanuary));
      await page.unroute("https://wa.me/**");

      await gotoReady(page, `${baseUrl}/contact`);
      const contactForm = page.locator("form").last();
      assert.equal(await contactForm.evaluate((form) => form.checkValidity()), false);
      await contactForm.locator('[name="fullName"]').fill("Smoke Test");
      await contactForm.locator('[name="email"]').fill("smoke@example.com");
      await contactForm.locator('[name="message"]').fill("Smoke test inquiry");
      assert.equal(await contactForm.evaluate((form) => form.checkValidity()), true);
      assert.ok(await page.locator('a[href^="mailto:"]').count());
    }
    console.log("✓ Mobile drawer keyboard behavior and application/contact flows in EN/TR/FR/SW");

    await gotoReady(page, `${baseUrl}/`);
    await selectLanguage(page, "English", "en");

    console.log("Checking contextual listing CTAs and contact form validation...");
    await gotoReady(page, `${baseUrl}/accommodation`);
    const reserveLink = page.getByRole("link", { name: "Reserve" }).first();
    assert.match(await reserveLink.getAttribute("href"), /^https:\/\/wa\.me\/.*campus/i);

    console.log("✓ Listing-specific WhatsApp enquiry and contact email fallback");

    assert.deepEqual(
      browserErrors,
      [],
      "No browser console errors or uncaught page errors should occur.",
    );
    assert.deepEqual(remoteFontRequests, [], "Fonts must load from the production bundle.");
    console.log("All production-readiness smoke tests passed with zero browser errors.");
  } finally {
    if (browser) await browser.close();
    if (server) await server.close();
  }
}

runSmokeTests().catch((error) => {
  console.error("Production-readiness test suite failed:", error);
  process.exitCode = 1;
});
