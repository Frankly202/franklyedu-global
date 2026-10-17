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
  "/real-estate/sarcon-87-renovated-villa-north-cyprus",
];

const retiredRoutes = ["/student", "/login", "/signup"];
const pageHeroBackgrounds = {
  "/universities": { name: "campus", asset: "/background/campus-background.png" },
  "/courses": { name: "campus", asset: "/background/campus-background.png" },
  "/scholarships": { name: "campus", asset: "/background/campus-background.png" },
  "/contact": { name: "contact", asset: "/background/contact-background.png" },
  "/about": { name: "contact", asset: "/background/contact-background.png" },
  "/services": { name: "contact", asset: "/background/contact-background.png" },
  "/marketplace": { name: "marketplace", asset: "/background/marketplace-background.png" },
  "/countries": { name: "marketplace", asset: "/background/marketplace-background.png" },
};
const checkedHeroAssets = new Set();
const siteUrl = "https://franklyedu.com";
const indexableRoutes = routes;
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

async function scrollState(page) {
  return page.evaluate(() => ({
    x: window.scrollX,
    y: window.scrollY,
    body: ["position", "top", "left", "width", "overflow", "padding-right"].map((property) => [
      property,
      document.body.style.getPropertyValue(property),
      document.body.style.getPropertyPriority(property),
    ]),
    rootOverflow: document.documentElement.style.getPropertyValue("overflow"),
    rootOverflowPriority: document.documentElement.style.getPropertyPriority("overflow"),
  }));
}

async function checkPageHeroBackground(page, route, locale) {
  const expected = pageHeroBackgrounds[route];
  if (!expected) return;

  const viewportWidth = page.viewportSize().width;
  const mobile = viewportWidth < 640;
  const hero = page.locator(`main section[data-hero-background="${expected.name}"]`);
  assert.equal(await hero.count(), 1, `${locale} ${route} must render its assigned hero image.`);

  const image = hero.locator("[data-hero-image]");
  const imageStyles = await image.evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      image: styles.backgroundImage,
      size: styles.backgroundSize,
      position: styles.backgroundPosition,
      repeat: styles.backgroundRepeat,
      zIndex: styles.zIndex,
      filter: styles.filter,
    };
  });
  assert.ok(
    imageStyles.image.includes(expected.asset),
    `${locale} ${route} must use ${expected.asset}.`,
  );
  assert.equal(
    imageStyles.size,
    "cover",
    `${locale} ${route} background must cover without distortion.`,
  );
  assert.equal(imageStyles.repeat, "no-repeat", `${locale} ${route} background must not tile.`);
  assert.equal(
    imageStyles.position,
    mobile
      ? {
          campus: "52% 52%",
          contact: "38% 50%",
          marketplace: "16% 50%",
        }[expected.name]
      : "50% 50%",
    `${locale} ${route} must use the responsive image focal position.`,
  );
  assert.equal(imageStyles.zIndex, "0", `${locale} ${route} image must stay behind hero content.`);
  assert.equal(
    imageStyles.filter,
    "none",
    `${locale} ${route} image must not be blurred or filtered.`,
  );

  const overlay = hero.locator("[data-hero-overlay]");
  const overlayStyles = await overlay.evaluate((element) => {
    const styles = getComputedStyle(element);
    return { background: styles.backgroundImage, zIndex: styles.zIndex, filter: styles.filter };
  });
  const overlayPattern =
    viewportWidth >= 1024
      ? /linear-gradient\(90deg, rgba\(10,\s*37,\s*64,\s*0\.76\).*rgba\(10,\s*37,\s*64,\s*0\.72\).*rgba\(10,\s*37,\s*64,\s*0\.14\)/
      : /linear-gradient\(rgba\(10,\s*37,\s*64,\s*0\.72\).*rgba\(10,\s*37,\s*64,\s*0\.78\)/;
  assert.ok(
    overlayPattern.test(overlayStyles.background),
    `${locale} ${route} must use a lighter responsive navy overlay; got ${overlayStyles.background}`,
  );
  assert.equal(overlayStyles.zIndex, "10", `${locale} ${route} overlay must sit above its image.`);
  assert.equal(overlayStyles.filter, "none", `${locale} ${route} overlay must not blur its image.`);
  assert.ok(
    await hero.locator("h1").isVisible(),
    `${locale} ${route} hero heading and existing content must remain visible.`,
  );

  if (!checkedHeroAssets.has(expected.asset)) {
    const assetResponse = await page.request.get(`${new URL(page.url()).origin}${expected.asset}`);
    assert.equal(assetResponse.status(), 200, `${expected.asset} must be served.`);
    assert.match(
      assetResponse.headers()["content-type"] ?? "",
      /image\/png/,
      `${expected.asset} must retain its PNG content type.`,
    );
    checkedHeroAssets.add(expected.asset);
  }
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
  for (const asset of [
    "favicon.ico",
    "favicon-32x32.png",
    "apple-touch-icon.png",
    "frankedu-mark.png",
    "frankedu-mark.webp",
    "og-image.png",
    "logo-watermark-white.webp",
    "Uni-Logos/CIU-logo.png",
    "Uni-Logos/FIU-logo.png",
    "Uni-Logos/girne-uni-logo.png",
    "Uni-Logos/memphis-logo.png",
    "Uni-Logos/pace-logo.png",
    "Uni-Logos/university-sunderland-logo.png",
    "Uni-Logos/hof-logo.gif",
    "Uni-Logos/oth-regensburg-logo.svg",
    "Uni-Logos/ehs-dresden-logo.png",
    "Uni-Logos/Near_East_University-logo.svg",
    "Uni-Logos/emu-logo-horizontalwhite-en.svg",
    "Uni-Logos/girne-american-university-logo.png",
    "Uni-Logos/european-university-of-lefke-logo.png",
    "Uni-Logos/kstu-logo.webp",
    "Uni-Logos/bau-cyprus-logo.webp",
    "background/campus-background.png",
    "background/contact-background.png",
    "background/marketplace-background.png",
  ]) {
    await readFile(`.output/public/${asset}`);
  }
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
      assert.equal(await canonicalLinks.count(), 1, `Route ${route} needs one canonical link.`);
      assert.equal(await canonicalLinks.getAttribute("href"), canonicalUrl(route));
      assert.equal(
        await page.locator('meta[property="og:url"]').getAttribute("content"),
        canonicalUrl(route),
        `Route ${route} must declare its canonical Open Graph URL.`,
      );
      assert.equal(robotsMeta, null, `Route ${route} must remain indexable.`);
    }
    console.log(`✓ ${routes.length} public routes render with SEO metadata`);

    console.log("Checking retired account and preview routes...");
    for (const route of retiredRoutes) {
      const serverResponse = await fetch(`${baseUrl}${route}`, { redirect: "manual" });
      assert.ok(
        serverResponse.status >= 300 && serverResponse.status < 400,
        `${route} must return a server-side redirect response.`,
      );
      assert.equal(
        new URL(serverResponse.headers.get("location"), baseUrl).pathname,
        "/application",
        `${route} must redirect directly to the application without a server-side redirect loop.`,
      );
      await gotoReady(page, `${baseUrl}${route}`);
      assert.equal(
        new URL(page.url()).pathname,
        "/application",
        `${route} must redirect to the public application flow.`,
      );
      assert.match(
        await page.locator("main h1").innerText(),
        /Start your application|Başvurunuzu başlatın|Commencez votre candidature|Anza maombi yako/i,
        `${route} must not render an account form or preview dashboard.`,
      );
    }
    await gotoReady(page, `${baseUrl}/application`);
    for (const route of retiredRoutes) {
      const redirected = await page.evaluate(
        (path) =>
          new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(false), 3000);
            window.history.pushState({}, "", path);
            window.dispatchEvent(new PopStateEvent("popstate"));
            const checkLocation = () => {
              if (window.location.pathname === "/application") {
                clearTimeout(timeout);
                resolve(true);
              } else {
                requestAnimationFrame(checkLocation);
              }
            };
            requestAnimationFrame(checkLocation);
          }),
        route,
      );
      assert.equal(
        redirected,
        true,
        `${route} must redirect to the application during client-side navigation.`,
      );
      assert.match(
        await page.locator("main h1").innerText(),
        /Start your application|Başvurunuzu başlatın|Commencez votre candidature|Anza maombi yako/i,
        `${route} client navigation must leave the public application rendered.`,
      );
    }
    await gotoReady(page, `${baseUrl}/`);
    assert.equal(
      await page.locator('a[href="/student"], a[href="/login"], a[href="/signup"]').count(),
      0,
      "Public navigation and footer must not link to retired student or account routes.",
    );
    const footerCopy = await page.locator("footer").innerText();
    assert.ok(
      footerCopy.includes("Lefkoşa, North Cyprus"),
      "The desktop footer must display the shortened contact address.",
    );
    assert.doesNotMatch(
      footerCopy,
      /Regal Residence|Küçük Kaymaklı/,
      "The desktop footer must not display the removed address details.",
    );
    await page.setViewportSize({ width: 390, height: 844 });
    const mobileMenuButton = page.getByRole("button", { name: "Open menu" });
    await mobileMenuButton.click();
    const mobileNavigation = page.locator("#mobile-navigation");
    assert.equal(
      await mobileNavigation
        .locator('a[href="/student"], a[href="/login"], a[href="/signup"]')
        .count(),
      0,
      "The mobile menu must not link to retired student or account routes.",
    );
    assert.ok(
      (await mobileNavigation.innerText()).includes("Lefkoşa, North Cyprus"),
      "The mobile menu must display the shortened contact address.",
    );
    assert.doesNotMatch(
      await mobileNavigation.innerText(),
      /Regal Residence|Küçük Kaymaklı/,
      "The mobile menu must not display the removed address details.",
    );
    await page.keyboard.press("Escape");
    await page.setViewportSize({ width: 1440, height: 1000 });

    async function checkApprovedCompanyCopy(locale) {
      await gotoReady(page, `${baseUrl}/about`);
      const aboutCopy = await page.locator("main").innerText();
      const aboutContactLabel = {
        en: "Contact us",
        tr: "Bize ulaşın",
        fr: "Contactez-nous",
        sw: "Wasiliana nasi",
      }[locale];
      const trustBadgeLabel = {
        en: "Study and property information",
        tr: "Eğitim ve gayrimenkul bilgileri",
        fr: "Informations sur les études et l’immobilier",
        sw: "Taarifa za masomo na mali",
      }[locale];
      assert.ok(
        (await page.getByRole("link", { name: aboutContactLabel, exact: true }).count()) > 0,
        `${locale} About page must use neutral Contact us wording.`,
      );
      assert.ok(
        aboutCopy.toLocaleLowerCase(locale).includes(trustBadgeLabel.toLocaleLowerCase(locale)),
        `${locale} About page must describe guidance without an unsupported verification claim.`,
      );
      assert.doesNotMatch(
        aboutCopy,
        /registered office|headquarters|tax clearance|registration number|reported revenue|assessable profit|verified advisory|doğrulanmış danışmanlık/i,
        `${locale} About page must not expose unapproved legal or tax claims.`,
      );
      const aboutDescription = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      assert.doesNotMatch(
        aboutDescription ?? "",
        /registered office|headquarters|tax clearance|registration number|reported revenue|assessable profit/i,
        `${locale} About SEO description must not expose unapproved legal or tax claims.`,
      );
      assert.doesNotMatch(
        await page.locator("footer").innerText(),
        /registered office|headquarters|tax clearance|registration number|reported revenue|assessable profit/i,
        `${locale} footer must not expose unapproved legal or tax claims.`,
      );
      assert.ok(
        aboutCopy.includes("Lefkoşa, North Cyprus"),
        `${locale} About page must show the shortened address.`,
      );
      assert.doesNotMatch(
        aboutCopy,
        /Regal Residence|Küçük Kaymaklı/,
        `${locale} About page must omit the removed address details.`,
      );
      assert.doesNotMatch(
        aboutCopy,
        /September 2023|Eylül 2023|Septembre 2023|Septemba 2023/i,
        `${locale} About page must not state an unsubstantiated founding date.`,
      );
      assert.doesNotMatch(
        aboutCopy,
        /headquarters|head office|HQ:|genel merkez|makao makuu|siège/i,
        `${locale} About page must not imply headquarters status.`,
      );

      await gotoReady(page, `${baseUrl}/universities`);
      const universityCopy = await page.locator("main").innerText();
      assert.match(
        universityCopy,
        /Final International University \(FIU\)/,
        `${locale} university page must retain the confirmed FIU relationship.`,
      );
      assert.doesNotMatch(
        universityCopy,
        /partners?|partenaires?|washirika|network|réseau|mtandao|official representation|resmi temsil/i,
        `${locale} university page must not imply broader partnerships.`,
      );

      await gotoReady(page, `${baseUrl}/contact`);
      const contactCopy = await page.locator("main").innerText();
      assert.ok(
        contactCopy.includes("Lefkoşa, North Cyprus"),
        `${locale} Contact page must show the shortened address.`,
      );
      assert.doesNotMatch(
        contactCopy,
        /Regal Residence|Küçük Kaymaklı/,
        `${locale} Contact page must omit the removed address details.`,
      );
      assert.doesNotMatch(
        contactCopy,
        /registered office|headquarters|tax clearance|registration number|reported revenue|assessable profit/i,
        `${locale} Contact page must not expose unapproved legal or tax claims.`,
      );
      const contactDescription = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      assert.doesNotMatch(
        contactDescription ?? "",
        /registered office|headquarters|tax clearance|registration number|reported revenue|assessable profit/i,
        `${locale} Contact SEO description must not expose unapproved legal or tax claims.`,
      );
      await page.setViewportSize({ width: 390, height: 844 });
      await gotoReady(page, `${baseUrl}/contact`);
      const mobileContactCopy = await page.locator("main").innerText();
      assert.ok(
        mobileContactCopy.includes("Lefkoşa, North Cyprus"),
        `${locale} mobile Contact page must show the shortened address.`,
      );
      assert.doesNotMatch(
        mobileContactCopy,
        /Regal Residence|Küçük Kaymaklı/,
        `${locale} mobile Contact page must omit the removed address details.`,
      );
      await page.setViewportSize({ width: 1440, height: 1000 });

      await gotoReady(page, `${baseUrl}/services`);
      const servicesCopy = await page.locator("main").innerText();
      assert.match(
        servicesCopy,
        /Final International University|Final Uluslararası Üniversitesi|FIU/,
        `${locale} service copy must scope scholarship information to FIU.`,
      );
      assert.doesNotMatch(
        servicesCopy,
        /selected institutions|établissements sélectionnés|taasisi zilizochaguliwa|9\+ supported destinations|plus de 9 destinations|destinations zaidi ya 9/i,
        `${locale} service copy must not imply unconfirmed institutional coverage.`,
      );

      await gotoReady(page, `${baseUrl}/scholarships`);
      const scholarshipCopy = await page.locator("main").innerText();
      const scholarshipEmptyHeading = {
        en: "No current scholarship listings",
        tr: "Güncel burs ilanı yok",
        fr: "Aucune annonce de bourse actuelle",
        sw: "Hakuna matangazo ya sasa ya ufadhili",
      }[locale];
      const scholarshipNotPublished = {
        en: "No current scholarship details are published.",
        tr: "Güncel burs ayrıntıları yayımlanmamıştır.",
        fr: "Aucun détail actuel sur les bourses n’est publié.",
        sw: "Hakuna maelezo ya sasa ya ufadhili yaliyochapishwa.",
      }[locale];
      assert.ok(
        scholarshipCopy.includes(scholarshipEmptyHeading),
        `${locale} scholarship page must identify the empty catalogue.`,
      );
      assert.ok(
        scholarshipCopy.includes(scholarshipNotPublished),
        `${locale} scholarship page must state that current details are unpublished.`,
      );
    }

    console.log("Checking all routes in each supported locale...");
    const englishMetadata = new Map();
    for (const route of routes) {
      await gotoReady(page, `${baseUrl}${route}`);
      await checkPageHeroBackground(page, route, "en");
      englishMetadata.set(route, {
        title: await page.title(),
        description: await page.locator('meta[name="description"]').getAttribute("content"),
      });
      if (pageHeroBackgrounds[route]) {
        await page.setViewportSize({ width: 390, height: 844 });
        await gotoReady(page, `${baseUrl}${route}`);
        await checkPageHeroBackground(page, route, "en");
        await page.setViewportSize({ width: 1440, height: 1000 });
      }
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
        await checkPageHeroBackground(page, route, locale);
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
        if (pageHeroBackgrounds[route]) {
          await page.setViewportSize({ width: 390, height: 844 });
          await gotoReady(page, `${baseUrl}${route}`);
          await checkPageHeroBackground(page, route, locale);
          await page.setViewportSize({ width: 1440, height: 1000 });
        }
      }
      await checkApprovedCompanyCopy(locale);
    }
    await gotoReady(page, `${baseUrl}/`);
    await selectLanguage(page, "English", "en");
    await checkApprovedCompanyCopy("en");
    console.log(`✓ ${routes.length} routes expose localized metadata in EN/TR/FR/SW`);
    console.log(
      "✓ Assigned page hero backgrounds, overlays, and responsive crops render in EN/TR/FR/SW",
    );

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

    console.log("Checking header height, brand lockup, and responsive overflow...");
    for (const [locale, languageName] of [
      ["en", "English"],
      ["tr", "Türkçe"],
      ["fr", "Français"],
      ["sw", "Kiswahili"],
    ]) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await gotoReady(page, `${baseUrl}/`);
      await selectLanguage(page, languageName, locale);
      for (const width of [320, 390, 768, 1024, 1280, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        const layout = await page.evaluate(() => {
          const rect = (element) => element.getBoundingClientRect();
          const row = rect(document.querySelector("header > div"));
          const lockup = document.querySelector("header [data-brand-lockup]");
          const lockupRect = rect(lockup);
          const tagline = lockup.querySelector("[data-brand-tagline]");
          const taglineRect = rect(tagline);
          const symbol = rect(lockup.querySelector("[data-brand-symbol]"));
          const wordmarkColumn = lockup.querySelector("[data-brand-wordmark]");
          const wordmark = rect(wordmarkColumn.firstElementChild);
          const lockupOverlapsControls = [
            ...document.querySelectorAll("header button, header nav a"),
          ]
            .filter((element) => element.offsetParent)
            .map(rect)
            .some(
              (r) =>
                r.left < lockupRect.right &&
                r.right > lockupRect.left &&
                r.top < lockupRect.bottom &&
                r.bottom > lockupRect.top,
            );
          return {
            rowHeight: row.height,
            lockupInside: lockupRect.top >= row.top - 0.5 && lockupRect.bottom <= row.bottom + 0.5,
            taglineVisible: Boolean(tagline?.offsetParent) && taglineRect.width > 0,
            symbolBesideWordmark:
              symbol.right <= wordmark.left &&
              symbol.top < wordmark.bottom &&
              symbol.bottom > wordmark.top,
            taglineBelowWordmark:
              wordmarkColumn.contains(tagline) && taglineRect.top >= wordmark.bottom - 0.5,
            taglineAligned: Math.abs(taglineRect.left - wordmark.left) <= 1,
            verticalOffset: lockupRect.top - row.top - (row.bottom - lockupRect.bottom),
            lockupOverlapsControls,
            horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
          };
        });
        const where = `${locale} at ${width}px`;
        const expectedHeight = width >= 768 ? 72 : 64;
        assert.ok(
          Math.abs(layout.rowHeight - expectedHeight) <= 1,
          `Header should be ${expectedHeight}px tall (${where}).`,
        );
        assert.ok(layout.lockupInside, `Brand lockup should not clip the header (${where}).`);
        assert.ok(layout.taglineVisible, `Services tagline should be visible (${where}).`);
        assert.ok(layout.symbolBesideWordmark, `Symbol should sit beside the wordmark (${where}).`);
        assert.ok(layout.taglineBelowWordmark, `Tagline should sit below the wordmark (${where}).`);
        assert.ok(layout.taglineAligned, `Tagline should align with the wordmark (${where}).`);
        assert.ok(
          Math.abs(layout.verticalOffset) <= 2,
          `Brand lockup should be vertically centred (${where}).`,
        );
        assert.equal(layout.lockupOverlapsControls, false, `Brand lockup overlaps (${where}).`);
        assert.equal(layout.horizontalOverflow, false, `Page overflows horizontally (${where}).`);
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator("header button[aria-expanded]:not([aria-controls])").click();
      await page.waitForFunction(() =>
        document
          .getElementById("mobile-navigation")
          ?.getAnimations()
          .every((animation) => animation.playState === "finished"),
      );
      const drawer = await page.evaluate(() => {
        const header = document.querySelector("header > div").getBoundingClientRect();
        const nav = document.getElementById("mobile-navigation").getBoundingClientRect();
        return { top: nav.top, headerBottom: header.bottom, bottom: nav.bottom };
      });
      assert.ok(
        Math.abs(drawer.top - drawer.headerBottom) <= 1.5,
        `Mobile drawer should open directly below the header (${locale}).`,
      );
      assert.ok(drawer.bottom <= 844 + 0.5, `Mobile drawer should fit the viewport (${locale}).`);
      await page.keyboard.press("Escape");
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await gotoReady(page, `${baseUrl}/`);
    await selectLanguage(page, "English", "en");
    console.log(
      "✓ 64px mobile / 72px tablet-desktop header, compact brand lockup, and drawer placement in EN/TR/FR/SW",
    );

    console.log("Checking page heading hierarchy on listing pages...");
    for (const [route, heading] of [
      ["/universities", "Final International University (FIU)"],
      ["/accommodation", "No marketplace listings"],
      ["/real-estate", "Sarcon №87 Property Listing"],
    ]) {
      await gotoReady(page, `${baseUrl}${route}`);
      await page.getByRole("heading", { name: heading, level: 2 }).waitFor();
    }
    console.log("✓ Listing cards expose correctly nested section headings");

    console.log("Checking homepage content, desktop navigation, and search filters...");
    await gotoReady(page, `${baseUrl}/`);
    assert.match(
      await page.locator("main h1").innerText(),
      /Clear information for\s*your next decision\./,
    );

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
    await page.getByRole("heading", { name: "University directory" }).waitFor();

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
    await page.getByRole("heading", { name: /Clear information for/ }).waitFor();
    assert.equal(await page.locator("html").getAttribute("lang"), "en");

    for (const [locale, languageName] of [
      ["en", "English"],
      ["tr", "Türkçe"],
      ["fr", "Français"],
      ["sw", "Kiswahili"],
    ]) {
      await gotoReady(page, `${baseUrl}/`);
      await selectLanguage(page, languageName, locale);

      const expectedUniversities = [
        {
          slug: "final-international-university",
          name: "Final International University (FIU)",
          logo: "/Uni-Logos/FIU-logo.png",
          location: "Kyrenia (Girne)",
        },
        {
          slug: "cyprus-international-university",
          name: "Cyprus International University",
          logo: "/Uni-Logos/CIU-logo.png",
          location: "Nicosia",
          studyAreaCount: 10,
        },
        {
          slug: "university-of-kyrenia",
          name: "University of Kyrenia (Girne Üniversitesi)",
          logo: "/Uni-Logos/girne-uni-logo.png",
          location: "Kyrenia (Girne)",
        },
        {
          slug: "near-east-university",
          name: "Near East University",
          logo: "/Uni-Logos/Near_East_University-logo.svg",
          logoAspectRatio: 1,
          location: "Nicosia",
          officialUrl: "https://neu.edu.tr/?lang=en",
        },
        {
          slug: "eastern-mediterranean-university",
          name: "Eastern Mediterranean University",
          logo: "/Uni-Logos/emu-logo-horizontalwhite-en.svg",
          logoSurface: "navy",
          location: "Famagusta",
          officialUrl: "https://www.emu.edu.tr/en",
          studyAreaCount: 10,
          feeSourceUrl:
            "https://www.emu.edu.tr/media/assets/files/tuition-fees/2026-2027-newly-registered-international-tuition-fees.pdf?ver=1",
        },
        {
          slug: "girne-american-university",
          name: "Girne American University",
          logo: "/Uni-Logos/girne-american-university-logo.png",
          location: "Kyrenia",
          officialUrl: "https://www.gau.edu.tr/en/",
        },
        {
          slug: "european-university-of-lefke",
          name: "European University of Lefke",
          logo: "/Uni-Logos/european-university-of-lefke-logo.png",
          location: "Lefke",
          officialUrl: "https://www.eul.edu.tr/en/",
        },
        {
          slug: "cyprus-health-and-social-sciences-university",
          name: "Cyprus Health and Social Sciences University (KSTU)",
          logo: "/Uni-Logos/kstu-logo.webp",
          logoSurface: "navy",
          location: "Güzelyurt",
          officialUrl: "https://www.kstu.edu.tr/",
        },
        {
          slug: "bahcesehir-cyprus-university",
          name: "Bahçeşehir Cyprus University",
          logo: "/Uni-Logos/bau-cyprus-logo.webp",
          location: "Nicosia",
          officialUrl: "https://baucyprus.edu.tr/",
          feeSourceUrl: "https://www.baucyprus.edu.tr/tuition-fees",
        },
        {
          slug: "university-of-memphis",
          name: "University of Memphis",
          logo: "/Uni-Logos/memphis-logo.png",
          location: "Memphis, Tennessee",
        },
        {
          slug: "pace-university",
          name: "Pace University",
          logo: "/Uni-Logos/pace-logo.png",
          location: "New York City and Westchester County",
        },
        {
          slug: "university-of-sunderland",
          name: "University of Sunderland",
          logo: "/Uni-Logos/university-sunderland-logo.png",
          location: "Sunderland, England",
        },
        {
          slug: "hof-university-of-applied-sciences",
          name: "Hof University of Applied Sciences",
          logo: "/Uni-Logos/hof-logo.gif",
          location: "Hof",
          officialUrl:
            "https://www.hof-university.com/studying-at-hof-university/application-and-admission.html",
          summary: {
            en: "Refer to the institution's official site for current programmes and admissions information.",
            tr: "Güncel program ve kabul bilgileri için kurumun resmî sitesine başvurun.",
            fr: "Consultez le site officiel de l’établissement pour connaître les formations et admissions actuelles.",
            sw: "Tazama tovuti rasmi ya taasisi kwa taarifa za sasa za programu na udahili.",
          },
          studyAreaCount: 1,
        },
        {
          slug: "oth-regensburg",
          name: "OTH Regensburg",
          logo: "/Uni-Logos/oth-regensburg-logo.svg",
          location: "Regensburg",
          officialUrl:
            "https://www.oth-regensburg.de/studiengang/advanced-nursing-practice-studieren-master-1",
          summary: {
            en: "Refer to the institution's official site for current programmes and admissions information.",
            tr: "Güncel program ve kabul bilgileri için kurumun resmî sitesine başvurun.",
            fr: "Consultez le site officiel de l’établissement pour connaître les formations et admissions actuelles.",
            sw: "Tazama tovuti rasmi ya taasisi kwa taarifa za sasa za programu na udahili.",
          },
          studyAreaCount: 1,
        },
        {
          slug: "evangelische-hochschule-dresden",
          name: "Evangelische Hochschule Dresden",
          logo: "/Uni-Logos/ehs-dresden-logo.png",
          location: "Dresden",
          officialUrl:
            "https://ehs-dresden.de/studium/studiengaenge/pflege-und-gesundheit/pflege-schwerpunkt-community-health-nursing-chnadvanced-nursing-practice-anp-master-berufsbegleitend/eckdaten-des-studiengangs/",
          summary: {
            en: "Refer to the institution's official site for current programmes and admissions information.",
            tr: "Güncel program ve kabul bilgileri için kurumun resmî sitesine başvurun.",
            fr: "Consultez le site officiel de l’établissement pour connaître les formations et admissions actuelles.",
            sw: "Tazama tovuti rasmi ya taasisi kwa taarifa za sasa za programu na udahili.",
          },
          studyAreaCount: 1,
        },
      ];
      const detailLabel = {
        en: "View Details",
        tr: "Detayları Gör",
        fr: "Voir les détails",
        sw: "Tazama maelezo",
      }[locale];
      const closeLabel = { en: "Close", tr: "Kapat", fr: "Fermer", sw: "Funga" }[locale];
      const summaryText = {
        en: "Ask us for current admissions information for this institution.",
        tr: "Bu kurumun güncel kabul bilgileri için bize danışın.",
        fr: "Contactez-nous pour obtenir les informations actuelles sur les admissions de cet établissement.",
        sw: "Wasiliana nasi kupata taarifa za sasa za udahili katika taasisi hii.",
      }[locale];
      const localizedLocation = (university) =>
        locale === "tr" && university.location === "Kyrenia (Girne)"
          ? "Girne (Kyrenia)"
          : university.location;

      for (const name of [
        "Near East University",
        "Eastern Mediterranean University",
        "Girne American University",
        "European University of Lefke",
        "Cyprus Health and Social Sciences University (KSTU)",
        "Bahçeşehir Cyprus University",
      ]) {
        assert.equal(
          await page.getByRole("heading", { name, exact: true }).count(),
          1,
          `${locale} homepage must include ${name}.`,
        );
      }
      for (const name of [
        "Hof University of Applied Sciences",
        "OTH Regensburg",
        "Evangelische Hochschule Dresden",
      ]) {
        assert.equal(
          await page.getByRole("heading", { name, exact: true }).count(),
          0,
          `${locale} homepage must keep ${name} excluded.`,
        );
      }

      await gotoReady(page, `${baseUrl}/universities`);
      const universityCards = page.locator("main article.card-light");
      assert.equal(
        await universityCards.count(),
        15,
        `${locale} directory must show all fifteen universities.`,
      );
      for (const university of expectedUniversities) {
        const card = universityCards.filter({
          has: page.getByRole("heading", { name: university.name, exact: true }),
        });
        assert.equal(await card.count(), 1, `${locale} must render ${university.name}.`);
        if (university.logo) {
          await card.scrollIntoViewIfNeeded();
          await card.locator("img").evaluate((image) => image.decode());
          assert.equal(
            await card.locator("img").getAttribute("src"),
            university.logo,
            `${university.name} must use its matching logo asset.`,
          );
          assert.equal(
            await card.locator("img").evaluate((image) => getComputedStyle(image).objectFit),
            "contain",
            `${university.name} logo must fit without cropping.`,
          );
          assert.ok(
            await card.locator("img").evaluate((image) => image.complete && image.naturalWidth > 0),
            `${university.name} logo must load successfully.`,
          );
          if (university.logoAspectRatio) {
            assert.ok(
              await card
                .locator("img")
                .evaluate(
                  (image, aspectRatio) =>
                    Math.abs(image.naturalWidth / image.naturalHeight - aspectRatio) < 0.01,
                  university.logoAspectRatio,
                ),
              `${university.name} logo must preserve its intrinsic aspect ratio.`,
            );
          }
          if (university.logoSurface === "navy") {
            assert.match(
              await card.locator("div").first().getAttribute("class"),
              /bg-navy/,
              `${university.name} white logo must have its official dark surface.`,
            );
          }
        } else {
          assert.equal(
            await card.locator("img").count(),
            0,
            `${university.name} must not use an unprovided logo asset.`,
          );
          assert.equal(await card.getByText(university.logoMark, { exact: true }).count(), 1);
        }
        await card
          .locator("p")
          .filter({ hasText: localizedLocation(university) })
          .first()
          .waitFor();
        if (university.officialUrl) {
          assert.equal(
            await card.locator('a[target="_blank"]').first().getAttribute("href"),
            university.officialUrl,
            `${university.name} must link to its official information.`,
          );
          assert.equal(
            await card.locator('a[href^="/application?university="]').count(),
            0,
            `${university.name} must not imply that Frankedu can submit its application.`,
          );
          assert.match(
            await card.locator('a[href^="https://wa.me/"]').getAttribute("href"),
            /wa\.me/,
            `${university.name} must offer an enquiry-only WhatsApp action.`,
          );
        } else {
          assert.equal(
            await card.locator('a[href^="/application?university="]').getAttribute("href"),
            `/application?university=${university.slug}`,
            `${university.name} must retain its existing application-prefill path.`,
          );
        }
      }
      await gotoReady(page, `${baseUrl}/countries`);
      assert.equal(
        await page.locator("#united-states a[href='/scholarships']").count(),
        0,
        `${locale} US destination must not imply availability of FIU-specific scholarships.`,
      );
      await gotoReady(page, `${baseUrl}/universities`);

      assert.equal(
        await universityCards.getByRole("button", { name: detailLabel }).count(),
        15,
        `${locale} must localize View Details on every card.`,
      );
      const detailsDialog = page.getByRole("dialog");
      for (const university of expectedUniversities) {
        const detailsButton = universityCards
          .filter({ has: page.getByRole("heading", { name: university.name, exact: true }) })
          .getByRole("button", { name: detailLabel });
        await detailsButton.scrollIntoViewIfNeeded();
        const originalScroll = await scrollState(page);
        await detailsButton.click();
        await detailsDialog.waitFor({ state: "visible" });
        if (university.logo) {
          const modalLogo = detailsDialog.locator("img");
          assert.equal(
            await modalLogo.getAttribute("src"),
            university.logo,
            `${university.name} modal must use its matching logo asset.`,
          );
          await modalLogo.evaluate((image) => image.decode());
          assert.equal(
            await modalLogo.evaluate((image) => getComputedStyle(image).objectFit),
            "contain",
            `${university.name} modal logo must fit without cropping.`,
          );
        }
        assert.equal(
          await page.locator("body").evaluate((body) => getComputedStyle(body).position),
          "fixed",
          `${locale} ${university.name} must lock background scrolling.`,
        );
        await detailsDialog.getByRole("heading", { name: university.name }).click();
        assert.ok(await detailsDialog.isVisible(), "Clicking inside must not dismiss the modal.");
        const lockedScroll = await scrollState(page);
        await page.mouse.move(2, 2);
        await page.mouse.wheel(0, 400);
        await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(resolve)));
        assert.deepEqual(
          await scrollState(page),
          lockedScroll,
          "Backdrop wheel must not scroll the page.",
        );
        await detailsDialog.getByRole("heading", { name: university.name }).waitFor();
        assert.ok(
          await detailsDialog.getByText(localizedLocation(university), { exact: false }).count(),
        );
        assert.ok(
          await detailsDialog
            .getByText(university.summary?.[locale] ?? summaryText, { exact: true })
            .count(),
        );
        if (university.officialUrl) {
          assert.equal(
            await detailsDialog.locator('a[href^="/application?university="]').count(),
            0,
            `${university.name} details must not expose an application-prefill CTA.`,
          );
        }
        assert.equal(
          await detailsDialog.locator('a[href^="/courses?university="]').getAttribute("href"),
          `/courses?university=${university.slug}`,
          `${locale} Explore Courses must preserve the university filter.`,
        );
        assert.equal(
          await detailsDialog.locator("li").count(),
          university.studyAreaCount ?? 0,
          `${locale} modal must show only supplied or sourced study areas.`,
        );
        const modalText = await detailsDialog.innerText();
        assert.doesNotMatch(
          modalText,
          /\d+\s*(?:semesters?|years?)|Cross-Cultural Nursing Practice|Advanced Nursing Practice \(M|Community Health Nursing \(CHN\)/i,
          `${locale} modals must not contain invented durations or catalogue programmes.`,
        );
        if (university.feeSourceUrl) {
          const feeSourceLinks = detailsDialog.locator(`a[href="${university.feeSourceUrl}"]`);
          assert.equal(
            await feeSourceLinks.count(),
            university.slug === "eastern-mediterranean-university" ? 2 : 1,
            `${locale} ${university.name} fee details must link to their official source.`,
          );
          const feeText = await feeSourceLinks.first().evaluate((link) => {
            return link.closest("section")?.innerText ?? "";
          });
          assert.ok(feeText.length > 0);
          if (locale === "en" && university.slug === "eastern-mediterranean-university") {
            assert.match(feeText, /\$6,400.*\$5,100/s);
            assert.match(feeText, /annual advance-payment tuition in USD/);
            assert.match(feeText, /most faculties/);
            assert.match(feeText, /\$250 per semester/);
          }
          if (locale === "en" && university.slug === "bahcesehir-cyprus-university") {
            assert.match(feeText, /\$2,100.*\$2,700/s);
            assert.match(feeText, /does not identify an academic year/);
            assert.match(feeText, /not confirmed acceptance or visa deposits/);
          }
        } else {
          assert.doesNotMatch(
            modalText,
            /[€£$]\s*\d/,
            `${locale} modal must not show unverified tuition amounts.`,
          );
        }
        if (university.slug === "eastern-mediterranean-university") {
          const scholarship = await detailsDialog.locator("section").last().innerText();
          for (const tier of ["60", "65", "70", "30", "45", "75"]) {
            assert.ok(
              scholarship.includes(tier),
              `${locale} EMU scholarship information must preserve the ${tier}% tier.`,
            );
          }
          if (locale === "en") {
            assert.deepEqual(await detailsDialog.locator("li").allTextContents(), [
              "Arts & Sciences",
              "Business and Economics",
              "Communication",
              "Computer and Information Sciences",
              "Tourism",
              "Engineering",
              "Architecture",
              "Education",
              "Law",
              "Health Sciences",
            ]);
          }
        }
        if (university.slug === "cyprus-international-university") {
          assert.equal(
            await detailsDialog
              .locator(
                'a[href="https://ciu.edu.tr/en/become-student/international/fees-and-scholarships"]',
              )
              .count(),
            1,
          );
          const scholarship = await detailsDialog.locator("section").nth(1).innerText();
          assert.match(scholarship, /50\s*%|%50/);
          assert.match(
            scholarship,
            {
              en: /Eligibility and payable tuition require confirmation/,
              tr: /uygunluk ve ödenecek öğrenim ücreti.*teyit edilmelidir/,
              fr: /L’éligibilité et les frais de scolarité à payer doivent être confirmés/,
              sw: /Ustahiki na ada ya masomo inayopaswa kulipwa lazima vithibitishwe/,
            }[locale],
          );
          if (locale === "en") {
            assert.deepEqual(await detailsDialog.locator("li").allTextContents(), [
              "Business Administration",
              "International Relations",
              "Computer and Information Technologies",
              "Engineering",
              "Nursing and Health Sciences",
              "Education",
              "Pharmacy",
              "Architecture",
              "Tourism and Hospitality",
              "Master’s and PhD programmes",
            ]);
          }
        }
        await page.keyboard.press("Escape");
        await detailsDialog.waitFor({ state: "hidden" });
        assert.deepEqual(
          await scrollState(page),
          originalScroll,
          "Escape must restore scroll styles and position.",
        );
        assert.equal(
          await detailsButton.evaluate((button) => button === document.activeElement),
          true,
          `${locale} modal must return focus to its trigger after closing.`,
        );
        for (const dismissal of ["backdrop", "close"]) {
          await detailsButton.click();
          await detailsDialog.waitFor({ state: "visible" });
          if (dismissal === "backdrop") {
            await page.mouse.click(2, 2);
          } else {
            await detailsDialog.getByRole("button", { name: closeLabel }).click();
          }
          await detailsDialog.waitFor({ state: "hidden" });
          assert.deepEqual(
            await scrollState(page),
            originalScroll,
            `${locale} ${university.name}: ${dismissal} dismissal must restore scroll styles and position.`,
          );
        }
      }

      await page.setViewportSize({ width: 320, height: 844 });
      const detailsButton = universityCards
        .filter({
          has: page.getByRole("heading", { name: "Cyprus International University", exact: true }),
        })
        .getByRole("button", { name: detailLabel });
      await detailsButton.click();
      const dialogBounds = await detailsDialog.boundingBox();
      assert.ok(dialogBounds);
      assert.ok(
        dialogBounds.x >= 0 &&
          dialogBounds.x + dialogBounds.width <= 320 &&
          dialogBounds.y >= 0 &&
          dialogBounds.y + dialogBounds.height <= 844,
        `${locale} university details modal must fit a 320px viewport.`,
      );
      assert.ok(
        await detailsDialog.evaluate((dialog) => dialog.scrollWidth <= dialog.clientWidth),
        `${locale} CIU modal must not overflow horizontally at 320px.`,
      );
      const applyLink = detailsDialog.locator('a[href^="/application?university="]');
      await applyLink.scrollIntoViewIfNeeded();
      assert.ok(await applyLink.isVisible(), `${locale} CIU Apply Now must remain reachable.`);
      assert.equal(
        await applyLink.getAttribute("href"),
        "/application?university=cyprus-international-university",
      );
      await detailsDialog.getByRole("button", { name: closeLabel }).click();
      await detailsDialog.waitFor({ state: "hidden" });
      const emuDetailsButton = universityCards
        .filter({
          has: page.getByRole("heading", { name: "Eastern Mediterranean University", exact: true }),
        })
        .getByRole("button", { name: detailLabel });
      await emuDetailsButton.click();
      assert.ok(
        await detailsDialog.evaluate((dialog) => dialog.scrollHeight > dialog.clientHeight),
        `${locale} EMU fee details must remain internally scrollable on mobile.`,
      );
      const emuFeeLink = detailsDialog.locator(
        'a[href="https://www.emu.edu.tr/media/assets/files/tuition-fees/2026-2027-newly-registered-international-tuition-fees.pdf?ver=1"]',
      );
      await emuFeeLink.first().scrollIntoViewIfNeeded();
      assert.ok(await emuFeeLink.first().isVisible());
      await detailsDialog.getByRole("button", { name: closeLabel }).click();
      await detailsDialog.waitFor({ state: "hidden" });
      await page.setViewportSize({ width: 1440, height: 1000 });

      for (const slug of [
        "cyprus-international-university",
        "oth-regensburg",
        "near-east-university",
        "eastern-mediterranean-university",
        "girne-american-university",
        "european-university-of-lefke",
        "cyprus-health-and-social-sciences-university",
        "bahcesehir-cyprus-university",
      ]) {
        const university = expectedUniversities.find((candidate) => candidate.slug === slug);
        assert.ok(university, `${locale} course filter test must reference ${slug}.`);
        await universityCards
          .filter({
            has: page.getByRole("heading", { name: university.name, exact: true }),
          })
          .getByRole("button", { name: detailLabel })
          .click();
        await detailsDialog.locator('a[href^="/courses?university="]').click();
        await page.waitForURL(`**/courses?university=${slug}`);
        assert.equal(await page.locator("main select").nth(2).inputValue(), slug);
        assert.equal(
          await page.locator("main article.card-light").count(),
          slug === "oth-regensburg" ? 1 : 0,
          `${locale} Explore Courses must show only published programmes for that university.`,
        );
        if (slug !== "oth-regensburg") {
          assert.ok(
            (await page.locator("main").innerText()).includes(
              {
                en: "No verified programme listings yet for this university",
                tr: "Bu üniversite için henüz doğrulanmış program ilanı yok",
                fr: "Aucune formation vérifiée n’est encore publiée pour cette université",
                sw: "Bado hakuna programu zilizothibitishwa zilizoorodheshwa kwa chuo hiki",
              }[locale],
            ),
          );
        }
        await gotoReady(page, `${baseUrl}/universities`);
      }

      async function openApplicationStudyPlan(url) {
        await gotoReady(page, url);
        const form = page.locator("form");
        await form.locator('input[autocomplete="name"]').fill("Prefill Test");
        await form.locator('input[type="email"]').fill("prefill@example.test");
        await form.locator('button[type="submit"]').click();
        return form.locator("select");
      }

      await gotoReady(page, `${baseUrl}/universities`);
      await page
        .getByLabel(
          {
            en: "Destination",
            tr: "Eğitim Ülkesi",
            fr: "Destination",
            sw: "Nchi",
          }[locale],
        )
        .selectOption("germany");
      assert.equal(
        await page.locator("main article.card-light").count(),
        3,
        `${locale} Germany directory filter must show the three institutions.`,
      );
      await gotoReady(page, `${baseUrl}/universities`);
      const universityApplicationHref = await page
        .locator('a[href^="/application?university="]')
        .first()
        .getAttribute("href");
      assert.ok(universityApplicationHref, `${locale} university card must link to application.`);
      let applicationSelects = await openApplicationStudyPlan(
        new URL(universityApplicationHref, baseUrl).href,
      );
      assert.equal(await applicationSelects.nth(0).inputValue(), "cyprus");
      assert.equal(
        await applicationSelects.nth(1).inputValue(),
        "final-international-university",
        `${locale} application route must prefill the university from its query.`,
      );

      for (const unitedStatesUniversity of expectedUniversities.filter(({ slug }) =>
        ["university-of-memphis", "pace-university"].includes(slug),
      )) {
        applicationSelects = await openApplicationStudyPlan(
          `${baseUrl}/application?university=${unitedStatesUniversity.slug}`,
        );
        assert.equal(
          await applicationSelects.nth(0).inputValue(),
          "united-states",
          `${locale} ${unitedStatesUniversity.name} must prefill a supported US destination.`,
        );
        assert.equal(
          await applicationSelects.nth(1).inputValue(),
          unitedStatesUniversity.slug,
          `${locale} ${unitedStatesUniversity.name} must prefill in the application form.`,
        );
      }

      applicationSelects = await openApplicationStudyPlan(
        `${baseUrl}/application?university=final-international-university&course=unpublished-course`,
      );
      assert.equal(await applicationSelects.nth(1).inputValue(), "final-international-university");
      assert.equal(
        await applicationSelects.nth(2).inputValue(),
        "",
        `${locale} unknown course query must not prefill an unavailable course.`,
      );

      await gotoReady(page, `${baseUrl}/courses`);
      const expectedCourseTitles = [
        "Cross-Cultural Nursing Practice (M.Sc.)",
        "Advanced Nursing Practice (M.Sc.)",
        "Pflege – Schwerpunkt Community Health Nursing (CHN)/Advanced Nursing Practice (ANP) (M.Sc.)",
      ];
      const courseCards = page.locator("main article.card-light");
      assert.equal(
        await courseCards.count(),
        3,
        `${locale} must show the three programme records.`,
      );
      for (const title of expectedCourseTitles) {
        const card = courseCards.filter({ has: page.getByRole("heading", { name: title }) });
        assert.equal(await card.count(), 1, `${locale} must render ${title}.`);
        assert.equal(
          await card.locator('a[href^="https://wa.me/"]').count(),
          1,
          `${locale} ${title} must have a programme-specific WhatsApp enquiry.`,
        );
        assert.equal(
          await card.locator('a[href^="/application?course="]').count(),
          0,
          `${locale} ${title} must not imply that Frankedu submits university applications.`,
        );
        assert.ok(
          await card
            .getByRole("link", {
              name: {
                en: "Programme source",
                tr: "Program kaynağı",
                fr: "Source de la formation",
                sw: "Chanzo cha programu",
              }[locale],
            })
            .count(),
          `${locale} ${title} must link to its official source.`,
        );
      }
      const hofCourseCard = courseCards.filter({
        has: page.getByRole("heading", { name: expectedCourseTitles[0] }),
      });
      assert.ok(
        (await hofCourseCard.innerText()).includes(
          {
            en: "15 November 2026",
            tr: "15 Kasım 2026",
            fr: "15 novembre 2026",
            sw: "15 Novemba 2026",
          }[locale],
        ),
        `${locale} Hof card must distinguish Frankedu's document-sharing date.`,
      );
      assert.equal(
        await courseCards.locator('a[href^="/application?course="]').count(),
        0,
        `${locale} course directory must not label enquiry as university application submission.`,
      );
      const programmeFacts = {
        en: [
          "3 theoretical study semesters; full-time",
          "German; DSH 3 or equivalent is required by the start of study.",
          "5 January annually; confirm the 2027 deadline with EHS.",
        ],
        tr: [
          "3 teorik dönem; tam zamanlı",
          "Almanca; eğitimin başlangıcına kadar DSH 3 veya eşdeğeri gerekir.",
          "Her yıl 5 Ocak; 2027 son tarihini EHS'den teyit edin.",
        ],
        fr: [
          "3 semestres théoriques ; à temps plein",
          "Allemand ; un niveau DSH 3 ou équivalent est requis avant le début des études.",
          "Le 5 janvier chaque année ; confirmez la date limite 2027 auprès de l’EHS.",
        ],
        sw: [
          "Muhula 3 wa masomo ya nadharia; muda wote",
          "Kijerumani; DSH 3 au kiwango kinacholingana kinahitajika kabla ya masomo kuanza.",
          "Tarehe 5 Januari kila mwaka; thibitisha tarehe ya mwisho ya 2027 na EHS.",
        ],
      }[locale];
      const renderedProgrammeFacts = (await courseCards.allInnerTexts()).join("\n");
      if (locale !== "en") {
        const requirementItems = await courseCards.locator("li").allTextContents();
        assert.equal(requirementItems.length, 7);
        for (const requirement of requirementItems) {
          assert.doesNotMatch(
            requirement,
            /^(?:Current programme-specific|Hof's general admissions|A nursing-science|Permission to use|A first higher-education|Relevant professional work|A motivation letter)/,
            `${locale} entry requirements must not fall back to English.`,
          );
        }
      }
      for (const fact of programmeFacts) {
        assert.ok(
          renderedProgrammeFacts.includes(fact),
          `${locale} programme cards must show localized official facts.`,
        );
      }
      await page
        .getByRole("heading", {
          name: {
            en: "Before you apply",
            tr: "Başvurmadan önce",
            fr: "Avant de postuler",
            sw: "Kabla ya kutuma maombi",
          }[locale],
        })
        .waitFor();
      const courseMetaDescription = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      assert.equal(
        courseMetaDescription,
        {
          en: "Browse published programmes with university source links. The current named listings are German nursing Master's programmes; confirm programme availability, fees, and admission requirements with each institution.",
          tr: "Üniversite kaynak bağlantılarıyla yayımlanan programları inceleyin. Şu anda listelenen isimli programlar Almanya'daki hemşirelik yüksek lisans programlarıdır; program uygunluğunu, ücretleri ve kabul koşullarını her kurumdan teyit edin.",
          fr: "Consultez les formations publiées et leurs sources universitaires. Les formations nommées actuellement répertoriées sont des masters en sciences infirmières en Allemagne ; confirmez auprès de chaque établissement la disponibilité, les frais et les conditions d’admission.",
          sw: "Angalia programu zilizochapishwa pamoja na viungo vya vyanzo vya vyuo vikuu. Programu zenye majina zilizoorodheshwa sasa ni programu za uzamili za uuguzi nchini Ujerumani; thibitisha upatikanaji, ada na masharti ya udahili na kila taasisi.",
        }[locale],
        `${locale} course metadata must use its approved localized description.`,
      );
      await page
        .getByLabel(
          {
            en: "University",
            tr: "Üniversite",
            fr: "Université",
            sw: "Chuo kikuu",
          }[locale],
        )
        .selectOption("hof-university-of-applied-sciences");
      assert.equal(
        await courseCards.count(),
        1,
        `${locale} university filter must show the matching Hof programme only.`,
      );
      await page.setViewportSize({ width: 320, height: 844 });
      const courseLayout = await page.evaluate(() => ({
        fits: document.documentElement.scrollWidth <= window.innerWidth,
        overflow: [...document.querySelectorAll("body *")]
          .map((element) => ({
            tag: element.tagName,
            className: element.getAttribute("class"),
            right: element.getBoundingClientRect().right,
            text: element.textContent?.trim().slice(0, 80),
          }))
          .filter((element) => element.right > window.innerWidth + 1)
          .slice(0, 5),
      }));
      assert.ok(
        courseLayout.fits,
        `${locale} course content must fit a 320px viewport: ${JSON.stringify(courseLayout.overflow)}`,
      );
      await page.setViewportSize({ width: 1440, height: 1000 });
      const courseApplicationLink = page.locator('a[href^="/application?course="]').first();
      if ((await courseApplicationLink.count()) > 0) {
        const courseApplicationHref = await courseApplicationLink.getAttribute("href");
        assert.ok(courseApplicationHref, `${locale} course card must link to application.`);
        applicationSelects = await openApplicationStudyPlan(
          new URL(courseApplicationHref, baseUrl).href,
        );
        assert.equal(
          await page.locator("form select").nth(2).inputValue(),
          new URL(courseApplicationHref, baseUrl).searchParams.get("course"),
          `${locale} application route must prefill a course from its card CTA.`,
        );
      }

      await gotoReady(page, `${baseUrl}/application`);
      const applicationForm = page.locator("form");
      const submitButton = applicationForm.locator('button[type="submit"]');
      const initialStep = await applicationForm.locator("h2").innerText();
      assert.equal(
        await applicationForm.evaluate((form) => form.checkValidity()),
        false,
        `${locale} application must require name, email, destination, and intake.`,
      );
      await submitButton.click();
      assert.equal(await applicationForm.locator("h2").innerText(), initialStep);

      await applicationForm.locator("input").nth(0).fill("Zoë Test & Applicant");
      await applicationForm.locator('input[type="email"]').fill("smoke.applicant@example.test");
      await applicationForm.locator('input[type="tel"]').fill("+90 555 010 2030");
      await applicationForm.locator("input").nth(3).fill("Test nationality");
      await submitButton.click();

      applicationSelects = applicationForm.locator("select");
      assert.deepEqual(
        await applicationSelects
          .nth(3)
          .locator("option")
          .evaluateAll((options) => options.map((option) => option.value)),
        ["", "January 2027", "February 2027"],
        `${locale} application must not offer expired intake dates.`,
      );
      assert.equal(
        await applicationForm.evaluate((form) => form.checkValidity()),
        false,
        `${locale} destination and intake must be required.`,
      );
      const studyPlanStep = await applicationForm.locator("h2").innerText();
      await submitButton.click();
      assert.equal(await applicationForm.locator("h2").innerText(), studyPlanStep);

      await applicationSelects.nth(0).selectOption("cyprus");
      await applicationSelects.nth(1).selectOption("final-international-university");
      await applicationSelects.nth(3).selectOption("January 2027");
      assert.equal(
        await applicationForm.evaluate((form) => form.checkValidity()),
        true,
        `${locale} application should be valid once required fields are filled.`,
      );
      await submitButton.click();
      await applicationForm
        .getByText(
          locale === "en"
            ? "Passport copy"
            : locale === "tr"
              ? "Pasaport Fotokopisi"
              : locale === "fr"
                ? "Copie du passeport"
                : "Nakala ya pasipoti",
        )
        .waitFor();
      assert.equal(await page.locator('input[type="file"]').count(), 0);
      assert.match(
        await applicationForm.innerText(),
        /No documents are uploaded|belge yüklenmez|Aucun document n’est téléversé|Hakuna nyaraka zinazopakiwa/i,
        `${locale} application must explain that documents are not uploaded or sent.`,
      );

      const documentsStep = await applicationForm.locator("h2").innerText();
      await applicationForm.getByRole("button", { name: /Back|Geri|Retour|Rudi/ }).click();
      assert.equal(await applicationForm.locator("h2").innerText(), studyPlanStep);
      assert.equal(await applicationSelects.nth(0).inputValue(), "cyprus");
      assert.equal(await applicationSelects.nth(1).inputValue(), "final-international-university");
      assert.equal(await applicationSelects.nth(3).inputValue(), "January 2027");
      await submitButton.click();
      assert.equal(await applicationForm.locator("h2").innerText(), documentsStep);
      await submitButton.click();
      assert.notEqual(await applicationForm.locator("h2").innerText(), documentsStep);
      const reviewRows = await applicationForm.locator("dl > div").evaluateAll((rows) =>
        rows.map((row) => ({
          label: row.querySelector("dt")?.textContent?.trim(),
          value: row.querySelector("dd")?.textContent?.trim(),
        })),
      );
      const messageRows = reviewRows.filter((row) => row.value && row.value !== "—");
      assert.equal(
        messageRows.length,
        7,
        `${locale} WhatsApp review should include all seven available applicant and study details; found labels: ${messageRows.map((row) => row.label).join(", ")}.`,
      );
      assert.ok(messageRows.some((row) => row.value === "Zoë Test & Applicant"));
      assert.ok(messageRows.some((row) => row.value === "smoke.applicant@example.test"));
      assert.ok(messageRows.some((row) => row.value === "+90 555 010 2030"));
      assert.ok(messageRows.some((row) => row.value === "Test nationality"));
      assert.ok(messageRows.some((row) => row.value === "Final International University (FIU)"));
      const localizedJanuary = {
        en: "January 2027",
        tr: "Ocak 2027",
        fr: "Janvier 2027",
        sw: "Januari 2027",
      }[locale];
      assert.ok(messageRows.some((row) => row.value === localizedJanuary));

      const localizedIntro = {
        en: "Hello Frankedu Global, I'd like guidance with my study application.",
        tr: "Merhaba Frankedu Global, eğitim başvurum için rehberlik almak istiyorum.",
        fr: "Bonjour Frankedu Global, je souhaite être accompagné dans ma candidature aux études.",
        sw: "Habari Frankedu Global, ningependa kupata mwongozo kuhusu maombi yangu ya masomo.",
      }[locale];
      const expectedMessage = `${localizedIntro}\n\n${messageRows
        .map(({ label, value }) => `${label}: ${value}`)
        .join("\n")}`;

      let whatsappUrl;
      await page.route("https://wa.me/**", async (route) => {
        whatsappUrl = route.request().url();
        await route.fulfill({ status: 200, contentType: "text/html", body: "handoff intercepted" });
      });
      await submitButton.click();
      await page.waitForURL("https://wa.me/**");
      const handoffUrl = new URL(whatsappUrl);
      assert.equal(handoffUrl.searchParams.get("text"), expectedMessage);
      assert.match(
        handoffUrl.search,
        /%0A/i,
        `${locale} WhatsApp handoff must encode message line breaks.`,
      );
      assert.match(
        handoffUrl.search,
        /%26/i,
        `${locale} WhatsApp handoff must encode reserved message characters.`,
      );
      assert.match(
        handoffUrl.search,
        /%C3%AB/i,
        `${locale} WhatsApp handoff must encode non-ASCII applicant text.`,
      );
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

    console.log("Checking university modal touch scrolling and unmount cleanup...");
    const touchContext = await browser.newContext({
      viewport: { width: 390, height: 664 },
      isMobile: true,
      hasTouch: true,
    });
    try {
      const touchPage = await touchContext.newPage();
      touchPage.on("pageerror", (error) => browserErrors.push(error.message));
      await gotoReady(touchPage, `${baseUrl}/universities`);
      const ciuButton = touchPage
        .locator("main article")
        .filter({
          has: touchPage.getByRole("heading", {
            name: "Cyprus International University",
            exact: true,
          }),
        })
        .getByRole("button", { name: "View Details" });
      const touchDialog = touchPage.getByRole("dialog");
      await touchPage.evaluate(() => {
        document.body.style.setProperty("overflow", "auto", "important");
        document.body.style.setProperty("padding-right", "7px", "important");
        document.documentElement.style.setProperty("overflow", "auto", "important");
        window.scrollTo({ top: 200, behavior: "instant" });
      });
      const originalScroll = await scrollState(touchPage);
      await ciuButton.evaluate((button) => button.click());
      await touchDialog.waitFor({ state: "visible" });
      assert.ok(
        await touchDialog.evaluate((dialog) => dialog.scrollHeight > dialog.clientHeight),
        "CIU content must overflow in the mobile test viewport.",
      );
      const bounds = await touchDialog.boundingBox();
      assert.ok(bounds);
      await touchPage.touchscreen.tap(bounds.x + 8, bounds.y + 8);
      assert.ok(
        await touchDialog.isVisible(),
        "Dialog padding clicks must not be treated as backdrop clicks.",
      );
      const touchSession = await touchContext.newCDPSession(touchPage);
      const swipeUp = async (x, startY, endY) => {
        await touchSession.send("Input.dispatchTouchEvent", {
          type: "touchStart",
          touchPoints: [{ x, y: startY }],
        });
        for (let step = 1; step <= 10; step++) {
          await touchSession.send("Input.dispatchTouchEvent", {
            type: "touchMove",
            touchPoints: [{ x, y: startY + ((endY - startY) * step) / 10 }],
          });
          await new Promise((resolve) => setTimeout(resolve, 20));
        }
        await touchSession.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
      };
      const lockedScroll = await scrollState(touchPage);
      await swipeUp(2, 500, 150);
      assert.deepEqual(
        await scrollState(touchPage),
        lockedScroll,
        "Backdrop touch gestures must not move the page.",
      );
      await swipeUp(bounds.x + bounds.width / 2, bounds.y + bounds.height - 60, bounds.y + 80);
      await touchPage.waitForFunction(() => document.querySelector("dialog[open]")?.scrollTop > 0);
      assert.deepEqual(
        await scrollState(touchPage),
        lockedScroll,
        "Modal touch scrolling must leave the background fixed.",
      );
      await touchDialog.evaluate((dialog) => {
        dialog.scrollTop = dialog.scrollHeight;
      });
      await swipeUp(bounds.x + bounds.width / 2, bounds.y + bounds.height - 60, bounds.y + 80);
      assert.deepEqual(
        await scrollState(touchPage),
        lockedScroll,
        "Touch scrolling at the modal boundary must not chain to the page.",
      );
      await touchPage.touchscreen.tap(2, 2);
      await touchDialog.waitFor({ state: "hidden" });
      assert.deepEqual(
        await scrollState(touchPage),
        originalScroll,
        "Touch backdrop dismissal must restore prior styles and position.",
      );

      await ciuButton.evaluate((button) => button.click());
      await touchDialog.waitFor({ state: "visible" });
      assert.equal(
        await touchDialog.evaluate((dialog) => dialog.scrollTop),
        0,
        "Reopening must start at the top.",
      );
      // Removing the open card through the existing filter exercises unmount without a close event.
      await touchPage.locator("main select").evaluate((select) => {
        select.value = "united-states";
        select.dispatchEvent(new Event("change", { bubbles: true }));
      });
      await touchPage.waitForURL("**/universities?country=united-states");
      await touchPage.waitForFunction(() => document.body.style.position !== "fixed");
      assert.equal(await touchPage.locator("dialog[open]").count(), 0);
      assert.deepEqual(
        await scrollState(touchPage),
        originalScroll,
        "Unmount must restore prior styles, priorities, and position.",
      );
      await touchSession.detach();
    } finally {
      await touchContext.close();
    }
    console.log(
      "✓ University modal mobile touch isolation, internal scrolling, backdrop dismissal, and unmount cleanup",
    );

    console.log("Checking contextual listing CTAs and contact form validation...");
    await gotoReady(page, `${baseUrl}/accommodation`);
    await page.getByRole("heading", { name: "No marketplace listings", level: 2 }).waitFor();
    assert.equal(
      await page.getByRole("link", { name: "Ask about availability" }).count(),
      0,
      "The accommodation page must not offer a reservation for an unpublished listing.",
    );
    assert.equal(
      await page.getByRole("link", { name: "Contact us", exact: true }).getAttribute("href"),
      "/contact",
    );

    await gotoReady(page, `${baseUrl}/real-estate`);
    const propertyEnquiry = page.getByRole("link", { name: "Ask about this listing" });
    const propertyEnquiryUrl = new URL(await propertyEnquiry.getAttribute("href"));
    assert.match(propertyEnquiryUrl.hostname, /^wa\.me$/);
    assert.match(
      propertyEnquiryUrl.searchParams.get("text") ?? "",
      /Sarcon №87 Property Listing/,
      "The published property enquiry must retain its contextual WhatsApp message.",
    );

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
