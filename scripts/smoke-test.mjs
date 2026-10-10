import assert from "node:assert/strict";
import { createServer } from "node:net";
import { readFile } from "node:fs/promises";
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
  await readFile(".output/public/favicon.ico");
  await readFile(".output/public/logo-full-transparent.png");
  console.log("✓ Cloudflare output, public assets, robots.txt, and asset cache headers");
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
    page.on("pageerror", (error) => browserErrors.push(error.message));
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
    }
    console.log(`✓ ${routes.length} public routes render with SEO metadata`);

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
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoReady(page, `${baseUrl}/`);
    const menuButton = page.getByRole("button", { name: "Open menu" });
    await menuButton.click();
    const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
    await mobileNav.waitFor({ state: "visible" });
    await page.keyboard.press("Escape");
    await mobileNav.waitFor({ state: "detached" });
    assert.equal(await menuButton.getAttribute("aria-expanded"), "false");
    assert.equal(await menuButton.evaluate((element) => element === document.activeElement), true);

    await page.getByRole("button", { name: "Türkçe diline geç" }).click();
    await page.getByRole("heading", { name: /Geleceğiniz\./ }).waitFor();
    assert.equal(await page.locator("html").getAttribute("lang"), "tr");
    await page.getByRole("button", { name: "Switch to English" }).click();
    await page.getByRole("heading", { name: /Your Future\./ }).waitFor();
    assert.equal(await page.locator("html").getAttribute("lang"), "en");

    await gotoReady(page, `${baseUrl}/application`);
    await page.getByPlaceholder("Full name").fill("Smoke Test Applicant");
    await page.getByPlaceholder("Email address").fill("smoke@example.com");
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByLabel("Study destination").selectOption("cyprus");
    await page.getByLabel("University (optional)").selectOption("final-international-university");
    await page.getByLabel("Preferred intake").selectOption("January 2027");
    await page.getByRole("button", { name: "Continue" }).click();
    assert.equal(await page.locator('input[type="file"]').count(), 0);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByText(/Documents are not uploaded or sent/).waitFor();

    let whatsappUrl;
    await page.route("https://wa.me/**", async (route) => {
      whatsappUrl = route.request().url();
      await route.fulfill({ status: 200, contentType: "text/html", body: "handoff intercepted" });
    });
    await page.getByRole("button", { name: "Continue to WhatsApp" }).click();
    await page.waitForURL("https://wa.me/**");
    const whatsappMessage = new URL(whatsappUrl).searchParams.get("text");
    assert.match(whatsappMessage, /Smoke Test Applicant/);
    assert.match(whatsappMessage, /Final International University/);
    assert.match(whatsappMessage, /January 2027/);
    console.log(
      "✓ Mobile drawer keyboard behavior, EN/TR switching, and structured application handoff",
    );

    console.log("Checking contextual listing CTAs and contact form validation...");
    await gotoReady(page, `${baseUrl}/accommodation`);
    const reserveLink = page.getByRole("link", { name: "Reserve" }).first();
    assert.match(await reserveLink.getAttribute("href"), /^https:\/\/wa\.me\/.*campus/i);

    await gotoReady(page, `${baseUrl}/contact`);
    const contactForm = page.locator("form").last();
    assert.equal(
      await contactForm.evaluate((form) => form.checkValidity()),
      false,
      "Contact form should require the visitor's name, email, and message.",
    );
    await contactForm.locator('[name="fullName"]').fill("Smoke Test");
    await contactForm.locator('[name="email"]').fill("smoke@example.com");
    await contactForm.locator('[name="message"]').fill("Smoke test inquiry");
    assert.equal(await contactForm.evaluate((form) => form.checkValidity()), true);
    assert.ok(await page.locator('a[href^="mailto:"]').count());
    console.log("✓ Listing-specific WhatsApp enquiry and contact email fallback");

    assert.deepEqual(
      browserErrors,
      [],
      "No browser console errors or uncaught page errors should occur.",
    );
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
