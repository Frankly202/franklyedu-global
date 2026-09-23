import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

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
];

async function runSmokeTests() {
  console.log(`Starting headless Playwright smoke tests against ${BASE_URL}...`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const uncaughtErrors = [];
  page.on("pageerror", (err) => {
    console.error("Page error:", err.message);
    uncaughtErrors.push(err.message);
  });

  try {
    // 1. Critical routes test
    console.log("Checking critical routes...");
    for (const route of routes) {
      const res = await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded" });
      if (!res || res.status() >= 400) {
        throw new Error(`Route ${route} failed with status ${res ? res.status() : "no response"}`);
      }
      console.log(`  ✓ ${route} (status: ${res.status()})`);
    }

    // 2. Homepage core content verification
    console.log("Checking homepage core content...");
    await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });

    await page.waitForSelector("h1:has-text('Find your university.')");
    await page.waitForSelector("text=/your global study pathway/i");
    await page.waitForSelector("text=/Your education can take you further/i");
    await page.waitForSelector("text=/Support for every/i");
    await page.waitForSelector("text=/Not sure where to start/i");
    console.log("  ✓ Core homepage content rendered successfully.");

    // 3. Primary navigation links resolve
    console.log("Checking primary navigation links...");
    const navItems = ["Universities", "Courses", "Countries", "Services", "About", "Contact"];
    for (const nav of navItems) {
      await page.click(`header nav >> text='${nav}'`);
      await page.waitForLoadState("domcontentloaded");
      console.log(`  ✓ Navigated via navbar to ${page.url()}`);
    }

    // 4. Key CTA navigation works
    console.log("Checking key CTA navigation...");
    await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });

    // "Start Your Application" CTA
    await page.click("text='Start Your Application'");
    await page.waitForLoadState("domcontentloaded");
    if (!page.url().includes("/application")) {
      throw new Error(`Expected /application but got ${page.url()}`);
    }
    console.log("  ✓ 'Start Your Application' CTA navigates correctly.");

    // Return to home and test "Find Universities" form submission
    await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
    await page.click("button:has-text('Find Universities')");
    await page.waitForLoadState("domcontentloaded");
    if (!page.url().includes("/universities")) {
      throw new Error(`Expected /universities after search submit but got ${page.url()}`);
    }
    console.log("  ✓ 'Find Universities' form search navigates to /universities.");

    // Header Login and Signup buttons
    await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
    await page.click("header >> text='Login'");
    await page.waitForLoadState("domcontentloaded");
    if (!page.url().includes("/login")) {
      throw new Error(`Expected /login but got ${page.url()}`);
    }
    console.log("  ✓ Header 'Login' button navigates correctly.");

    await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
    await page.click("header >> text='Sign Up'");
    await page.waitForLoadState("domcontentloaded");
    if (!page.url().includes("/signup")) {
      throw new Error(`Expected /signup but got ${page.url()}`);
    }
    console.log("  ✓ Header 'Sign Up' button navigates correctly.");

    // 5. Uncaught page errors check
    if (uncaughtErrors.length > 0) {
      throw new Error(
        `Detected ${uncaughtErrors.length} uncaught page error(s): ${uncaughtErrors.join(", ")}`,
      );
    }

    console.log("\nAll Playwright smoke tests PASSED headlessly with zero errors!");
  } finally {
    await browser.close();
  }
}

runSmokeTests().catch((err) => {
  console.error("Smoke test FAILED:", err);
  process.exit(1);
});
