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
  assert.equal(
    await page
      .locator("a, button")
      .filter({
        hasText:
          /^(Visit University Website|Üniversitenin Web Sitesini Ziyaret Et|Visiter le site de l’université|Tembelea Tovuti ya Chuo|Apply Through FranklyEdu|FranklyEdu ile Başvur|Postuler avec FranklyEdu|Omba Kupitia FranklyEdu)$/,
      })
      .count(),
    0,
    "Retired university navigation CTAs must not appear on any route, including closed modals.",
  );
  for (const section of await page.locator("[data-university-examples]").all()) {
    const slug = await section.getAttribute("data-university-examples");
    const apply = section.locator("a.btn-primary");
    assert.equal(await apply.getAttribute("href"), `/application?university=${slug}`);
    assert.match(await apply.innerText(), /^(Apply Now|Hemen Başvur|Postuler|Omba sasa)$/);
    const viewCourses = section.locator(`a[href="/courses?university=${slug}"]`);
    assert.match(
      await viewCourses.innerText(),
      /^(View Courses|Programları Gör|Voir les formations|Angalia programu)$/,
    );
    assert.equal(await viewCourses.getAttribute("target"), null);
  }
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
    "Uni-Logos/florida-international-university-logo.png",
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

async function assertEmuFees(dialog, locale) {
  const table = dialog.getByRole("table");
  assert.equal(
    await table.locator("thead th").nth(1).innerText(),
    {
      en: "Annual advance-payment fee (75% scholarship)",
      tr: "Yıllık peşin ücret (%75 burs)",
      fr: "Frais annuels payables à l’avance (bourse de 75 %)",
      sw: "Ada ya mwaka ya kulipwa mapema (ufadhili wa 75%)",
    }[locale],
  );
  assert.match(await table.locator("caption").innerText(), /2026\/2027.*75.*USD/);
  assert.deepEqual(await table.locator("tbody td").allTextContents(), [
    ...Array(5).fill("$4,450"),
    "$4,700",
    "$5,485",
    "$10,000",
    "$14,510",
    "$3,409",
  ]);
  const expected = {
    en: {
      names: [
        "Business and Economics",
        "Arts and Sciences",
        "Communication",
        "Computer and Information Sciences",
        "Architecture",
        "Engineering",
        "Pharmacy",
        "Dentistry",
        "Medicine",
        "Associate degree programmes",
      ],
      fees: [
        /annual advance-payment fees in USD/,
        /eligible new international students/,
        /not instalment prices or registration deposit amounts/,
        /current registration deposit and instalment arrangements must be confirmed with EMU/,
      ],
      scholarship: [
        /not a guaranteed award/,
        /country-specific 75% tier for Turkmenistan/,
        /Confirm eligibility/,
      ],
    },
    tr: {
      names: [
        "İşletme ve Ekonomi",
        "Fen ve Edebiyat",
        "İletişim",
        "Bilgisayar ve Bilgi Bilimleri",
        "Mimarlık",
        "Mühendislik",
        "Eczacılık",
        "Diş Hekimliği",
        "Tıp",
        "Ön lisans programları",
      ],
      fees: [
        /yıllık peşin ücretleri USD/,
        /uygun yeni uluslararası öğrenciler/,
        /taksit tutarları veya kayıt depozitosu tutarları değildir/,
        /Güncel kayıt depozitosu ve taksit düzenlemeleri EMU ile teyit edilmelidir/,
      ],
      scholarship: [/garanti edilen bir burs değildir/, /Türkmenistan'a özgü %75/, /uygunluğunuzu/],
    },
    fr: {
      names: [
        "Commerce et économie",
        "Arts et sciences",
        "Communication",
        "Informatique et sciences de l’information",
        "Architecture",
        "Ingénierie",
        "Pharmacie",
        "Dentisterie",
        "Médecine",
        "Formations de diplôme de cycle court",
      ],
      fees: [
        /payables à l’avance en USD/,
        /nouveaux étudiants internationaux éligibles/,
        /ni des montants d’échéances ni des dépôts d’inscription/,
        /dépôt d’inscription actuel et les modalités de paiement échelonné doivent être confirmés auprès de l’EMU/,
      ],
      scholarship: [/sans garantie/, /75 % propre au Turkménistan/, /Confirmez votre éligibilité/],
    },
    sw: {
      names: [
        "Biashara na Uchumi",
        "Sanaa na Sayansi",
        "Mawasiliano",
        "Sayansi za Kompyuta na Habari",
        "Usanifu Majengo",
        "Uhandisi",
        "Famasia",
        "Udaktari wa Meno",
        "Udaktari",
        "Programu za shahada ya ngazi ya associate",
      ],
      fees: [
        /kulipwa mapema kwa USD/,
        /wanafunzi wapya wa kimataifa wanaostahiki/,
        /Si bei za malipo ya awamu wala kiasi cha amana ya usajili/,
        /Amana ya sasa ya usajili na mipango ya malipo ya awamu lazima ithibitishwe na EMU/,
      ],
      scholarship: [
        /si tuzo iliyohakikishwa/,
        /75% maalumu kwa Turkmenistan/,
        /Thibitisha ustahiki/,
      ],
    },
  }[locale];
  assert.deepEqual(await table.locator("tbody th").allTextContents(), expected.names);
  const fees = await dialog.locator("section").nth(1).innerText();
  const scholarship = await dialog.locator("section").last().innerText();
  for (const pattern of expected.fees) assert.match(fees, pattern);
  for (const pattern of expected.scholarship) assert.match(scholarship, pattern);
  assert.match(scholarship, /75\s*%|%75/);
  assert.doesNotMatch(fees, /\$6,400|\$5,750|\$5,100|\$250/);
}

async function assertGauFees(dialog, locale) {
  const table = dialog.getByRole("table");
  assert.match(await table.locator("caption").innerText(), /2025\/2026.*EUR/);
  assert.doesNotMatch(await table.innerText(), /2026\/2027|€500/);
  assert.deepEqual(await table.locator("tbody td").allTextContents(), [
    "€7,700",
    "€8,000",
    "€11,000",
    "€13,000",
    "€6,500",
    "€10,000",
    "€6,500",
    "€8,000",
    "€12,500",
  ]);
  const expected = {
    en: {
      heading: "Annual tuition (2025/2026)",
      names: [
        "Business",
        "Architecture and several other faculties",
        "Pharmacy",
        "Medicine",
        "Civil Aviation Management",
        "Pilotage",
        "Associate degree programmes",
        "Master’s programmes",
        "PhD programmes",
      ],
      notes: [
        /for 2025\/2026 only/,
        /not confirmed 2026\/2027 rates/,
        /registration and activity fee of €500 yearly for the listed degree programmes/,
        /not included in the tuition figures/,
        /not been independently verified for every category/,
        /confirm current tuition and applicable charges with GAU/,
      ],
    },
    tr: {
      heading: "Yıllık öğrenim ücreti (2025/2026)",
      names: [
        "İşletme",
        "Mimarlık ve diğer bazı fakülteler",
        "Eczacılık",
        "Tıp",
        "Sivil Havacılık İşletmeciliği",
        "Pilotaj",
        "Ön lisans programları",
        "Yüksek lisans programları",
        "Doktora programları",
      ],
      notes: [
        /yalnızca 2025\/2026/,
        /teyit edilmiş 2026\/2027 ücretleri değildir/,
        /listelenen derece programları için yıllık €500 ek kayıt ve etkinlik ücreti/,
        /öğrenim ücreti tutarlarına dahil değildir/,
        /her kategori için geçerliliği bağımsız olarak doğrulanmamıştır/,
        /GAU ile teyit/,
      ],
    },
    fr: {
      heading: "Frais de scolarité annuels (2025/2026)",
      names: [
        "Commerce",
        "Architecture et plusieurs autres facultés",
        "Pharmacie",
        "Médecine",
        "Gestion de l’aviation civile",
        "Pilotage",
        "Formations de diplôme de cycle court",
        "Formations de master",
        "Formations doctorales",
      ],
      notes: [
        /uniquement 2025\/2026/,
        /pas des tarifs confirmés pour 2026\/2027/,
        /inscription et d’activités de €500 par an pour les formations diplômantes mentionnées/,
        /ne sont pas inclus dans les montants de scolarité/,
        /chaque catégorie n’a pas été vérifiée de manière indépendante/,
        /confirmer les frais de scolarité actuels/,
      ],
    },
    sw: {
      heading: "Ada ya masomo ya mwaka (2025/2026)",
      names: [
        "Biashara",
        "Usanifu Majengo na vitivo vingine kadhaa",
        "Famasia",
        "Udaktari",
        "Usimamizi wa Usafiri wa Anga wa Kiraia",
        "Uendeshaji wa Ndege",
        "Programu za shahada ya ngazi ya associate",
        "Programu za uzamili",
        "Programu za uzamivu",
      ],
      notes: [
        /2025\/2026 pekee/,
        /si viwango vilivyothibitishwa vya 2026\/2027/,
        /usajili na shughuli ya €500 kwa mwaka kwa programu za shahada zilizoorodheshwa/,
        /haijajumuishwa katika kiasi cha ada ya masomo/,
        /kila kundi hayajathibitishwa kwa kujitegemea/,
        /kuthibitisha ada ya sasa/,
      ],
    },
  }[locale];
  assert.equal(await table.locator("thead th").nth(1).innerText(), expected.heading);
  assert.deepEqual(await table.locator("tbody th").allTextContents(), expected.names);
  const note = await dialog.locator("section").nth(1).locator("p").innerText();
  for (const pattern of expected.notes) assert.match(note, pattern);
  assert.equal(await dialog.locator("section").nth(1).locator("a").count(), 0);
  assert.doesNotMatch(await dialog.locator("section").last().innerText(), /\d|%/);
}

async function assertKyreniaFees(dialog, locale) {
  const expected = {
    en: {
      areas: ["Aviation", "Business", "Engineering", "Health Sciences", "Postgraduate studies"],
      fee: [
        /2026\/2027/,
        /regular Master’s tuition for international students/,
        /25% scholarship/,
        /€1,272 per semester/,
        /programme fee covers four academic semesters/,
        /subject to the university’s stated conditions/,
        /No total programme fee is stated/,
        /Undergraduate tuition and initial payments must be confirmed for the selected programme/,
      ],
      scholarship: /25% scholarship.*conditions apply.*confirm applicability/s,
    },
    tr: {
      areas: ["Havacılık", "İşletme", "Mühendislik", "Sağlık Bilimleri", "Lisansüstü eğitim"],
      fee: [
        /2026\/2027/,
        /uluslararası öğrencilere/,
        /%25 burslu/,
        /dönem başına €1,272/,
        /program ücreti.*dört akademik dönemi kapsar/,
        /üniversitenin belirttiği koşullara tabi/,
        /toplam program ücreti belirtilmemektedir/,
        /Lisans öğrenim ücreti ve ilk ödemeler, seçilen program.*teyit edilmelidir/,
      ],
      scholarship: /%25 burslu.*koşullar geçerlidir.*teyit edin/s,
    },
    fr: {
      areas: [
        "Aviation",
        "Commerce",
        "Ingénierie",
        "Sciences de la santé",
        "Études de deuxième et troisième cycles",
      ],
      fee: [
        /2026\/2027/,
        /master standard pour les étudiants internationaux/,
        /bourse de 25 %/,
        /€1,272 par semestre/,
        /couvrent quatre semestres universitaires/,
        /sous réserve des conditions/,
        /Aucun montant total du programme/,
        /premier cycle et les paiements initiaux doivent être confirmés pour la formation choisie/,
      ],
      scholarship: /bourse de 25 %.*conditions.*confirmez leur applicabilité/s,
    },
    sw: {
      areas: [
        "Usafiri wa Anga",
        "Biashara",
        "Uhandisi",
        "Sayansi za Afya",
        "Masomo ya uzamili na uzamivu",
      ],
      fee: [
        /2026\/2027/,
        /uzamili kwa wanafunzi wa kimataifa/,
        /ufadhili wa 25%/,
        /€1,272 kwa muhula/,
        /inahusisha mihula minne ya kitaaluma/,
        /kwa kuzingatia masharti/,
        /Hakuna jumla ya ada ya programu/,
        /shahada ya kwanza na malipo ya awali lazima zithibitishwe kwa programu iliyochaguliwa/,
      ],
      scholarship: /ufadhili wa 25%.*Masharti.*thibitisha matumizi yake/s,
    },
  }[locale];
  assert.deepEqual(await dialog.locator("li").allTextContents(), expected.areas);
  const fee = await dialog.locator("section").nth(1).innerText();
  for (const pattern of expected.fee) assert.match(fee, pattern);
  assert.deepEqual(fee.match(/€[\d,]+/g), ["€1,272"]);
  assert.match(await dialog.locator("section").last().innerText(), expected.scholarship);
  assert.equal(await dialog.locator("section a, table").count(), 0);
}

async function assertCiuModal(dialog, locale) {
  const notes = {
    en: [
      /Tuition varies by programme, scholarship and academic year/,
      /tuition calculator/,
      /student’s official offer letter/,
      /North Nicosia, Northern Cyprus/,
    ],
    tr: [
      /programa, bursa ve akademik yıla göre değişir/,
      /hesaplayıcısını/,
      /resmî kabul teklif mektubundan/,
      /Kuzey Lefkoşa, Kuzey Kıbrıs/,
    ],
    fr: [
      /formation, la bourse et l’année universitaire/,
      /calculateur de frais/,
      /lettre officielle d’offre d’admission/,
      /Nicosie-Nord, Chypre du Nord/,
    ],
    sw: [
      /programu, ufadhili na mwaka wa masomo/,
      /kikokotoo cha ada/,
      /barua rasmi ya ofa ya udahili/,
      /Nicosia Kaskazini, Saiprasi ya Kaskazini/,
    ],
  }[locale];
  const text = await dialog.innerText();
  for (const pattern of notes) assert.match(text, pattern);
  assert.match(text, /50\s*%|%50/);
  assert.equal(await dialog.locator("li").count(), 10);
  assert.doesNotMatch(text, /[€£$]\s*\d|IELTS|TOEFL/);
}

async function checkCiuCatalogue(page, baseUrl, locale) {
  const section = page.locator('[data-university-examples="cyprus-international-university"]');
  const expected = {
    en: {
      heading: /Catalogue examples — availability unconfirmed/,
      sample: "Accounting and Finance",
      master: "MBA",
      phd: "English Language Teaching",
      caveat: /not confirmed current programme-level records/,
      exam: /not confirmed programme-specific thresholds/,
      docs: [
        /secondary certificate.*WAEC\/NECO/,
        /bachelor’s certificate, transcripts/,
        /research proposal/,
      ],
      payment: /student’s official offer letter/,
    },
    tr: {
      heading: /Katalog örnekleri/,
      sample: "Muhasebe ve Finans",
      master: "İşletme Yüksek Lisansı (MBA)",
      phd: "İngilizce Öğretmenliği",
      caveat: /teyit edilmiş güncel program kayıtları değildir/,
      exam: /teyit edilmiş programa özgü eşikler değildir/,
      docs: [
        /ortaöğretim diploması.*WAEC\/NECO/,
        /lisans diploması, transkriptler/,
        /araştırma önerisi/,
      ],
      payment: /resmî kabul teklif mektubundan/,
    },
    fr: {
      heading: /Exemples du catalogue/,
      sample: "Comptabilité et finance",
      master: "Master en administration des affaires (MBA)",
      phd: "Enseignement de l’anglais",
      caveat: /non des fiches de formations actuelles confirmées/,
      exam: /seuils ne sont pas confirmés pour chaque formation/,
      docs: [
        /diplôme du secondaire.*WAEC\/NECO/,
        /diplôme de licence, relevés de notes/,
        /projet de recherche/,
      ],
      payment: /lettre officielle d’offre d’admission/,
    },
    sw: {
      heading: /Mifano ya katalogi/,
      sample: "Uhasibu na Fedha",
      master: "Uzamili wa Usimamizi wa Biashara (MBA)",
      phd: "Ufundishaji wa Kiingereza",
      caveat: /si rekodi za sasa za programu zilizothibitishwa/,
      exam: /si viwango vilivyothibitishwa kwa kila programu/,
      docs: [
        /cheti cha sekondari.*WAEC\/NECO/,
        /cheti cha shahada ya kwanza, nakala za matokeo/,
        /pendekezo la utafiti/,
      ],
      payment: /barua rasmi ya ofa ya udahili/,
    },
  }[locale];
  assert.match(await section.getByRole("heading", { level: 2 }).innerText(), expected.heading);
  assert.equal(await section.locator("li").count(), 38);
  for (const [level, count] of [
    ["Bachelor's", 24],
    ["Master's", 8],
    ["PhD", 6],
  ]) {
    assert.equal(await section.locator(`[data-example-level="${level}"] li`).count(), count);
  }
  assert.ok((await section.locator("li").allTextContents()).includes(expected.sample));
  const text = await section.innerText();
  for (const pattern of [expected.caveat, expected.exam, expected.payment, ...expected.docs])
    assert.match(text, pattern);
  assert.match(text, /IELTS 5.5.*TOEFL iBT 65/);
  assert.match(text, /50\s*%|%50/);
  assert.doesNotMatch(text, /[€£$]\s*\d/);
  assert.equal(await section.locator('a[href*="course="]').count(), 0);
  assert.match(
    await page.locator('meta[name="description"]').getAttribute("content"),
    /catalogue|katalog|catalogues|katalogi/,
  );
  if (locale === "en") {
    const names = await section.locator("li").allTextContents();
    assert.deepEqual(
      [...new Set(names)].sort(),
      [
        "Business Administration",
        "International Business",
        "Accounting and Finance",
        "Marketing",
        "Human Resource Management",
        "Economics",
        "Computer Engineering",
        "Software Engineering",
        "Civil Engineering",
        "Electrical and Electronic Engineering",
        "Mechanical Engineering",
        "Information Technology",
        "Nursing",
        "Pharmacy",
        "Physiotherapy and Rehabilitation",
        "Nutrition and Dietetics",
        "Psychology",
        "International Relations",
        "Law",
        "English Language Teaching",
        "Architecture",
        "Interior Architecture",
        "Tourism and Hotel Management",
        "Graphic Design",
        "MBA",
        "Engineering",
        "Finance",
        "Education",
      ].sort(),
    );
  }
  const filters = page.locator("main select");
  await filters.nth(1).selectOption("Master's");
  assert.equal(await section.locator("li").count(), 8);
  assert.ok((await section.locator("li").allTextContents()).includes(expected.master));
  await filters.nth(0).selectOption("Computer Science & IT");
  assert.equal(await section.locator("li").count(), 1);
  assert.equal(
    new URL(page.url()).searchParams.get("university"),
    "cyprus-international-university",
  );
  assert.equal(new URL(page.url()).searchParams.get("level"), "Master's");
  assert.equal(new URL(page.url()).searchParams.get("subject"), "Computer Science & IT");
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(await section.locator("li").count(), 1);
  await filters.nth(0).selectOption("");
  await filters.nth(1).selectOption("PhD");
  assert.equal(await section.locator("li").count(), 6);
  assert.ok((await section.locator("li").allTextContents()).includes(expected.phd));
  await filters.nth(1).selectOption("Foundation");
  assert.equal(await section.locator("li").count(), 0);
  await filters.nth(1).selectOption("Bachelor's");
  await filters.nth(0).selectOption("Health Sciences & Nursing");
  assert.equal(await section.locator("li").count(), 4);
  await filters.nth(2).selectOption("oth-regensburg");
  assert.equal(await section.count(), 0);
  await filters.nth(1).selectOption("Master's");
  assert.equal(await page.locator("main article.card-light").count(), 1);

  await gotoReady(page, `${baseUrl}/courses`);
  assert.equal(await page.locator("main article.card-light").count(), 3);
  assert.equal(await section.locator("li").count(), 38);
  await page.setViewportSize({ width: 320, height: 844 });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  for (const level of ["Bachelor's", "Master's", "PhD"]) {
    await section.locator(`[data-example-level="${level}"]`).scrollIntoViewIfNeeded();
    assert.ok(await section.locator(`[data-example-level="${level}"]`).isVisible());
  }
  await section
    .locator('a[href="/application?university=cyprus-international-university"]')
    .click();
  await page.waitForURL("**/application?university=cyprus-international-university");
  const form = page.locator("form");
  await form.locator('input[autocomplete="name"]').fill("CIU Catalogue Test");
  await form.locator('input[type="email"]').fill("catalogue@example.test");
  await form.locator('button[type="submit"]').click();
  assert.equal(await form.locator("select").nth(0).inputValue(), "cyprus");
  assert.equal(await form.locator("select").nth(1).inputValue(), "cyprus-international-university");
  assert.equal(await form.locator("select").nth(2).inputValue(), "");
  assert.equal(
    await form.locator("select").nth(2).locator('option[value]:not([value=""])').count(),
    0,
  );
  await form.locator("select").nth(3).selectOption("January 2027");
  await form.locator('button[type="submit"]').click();
  await form.locator('button[type="submit"]').click();
  assert.match(await form.innerText(), /Cyprus International University/);
  await page.route("https://wa.me/**", (route) =>
    route.fulfill({ contentType: "text/html", body: "handoff intercepted" }),
  );
  await form.locator('button[type="submit"]').click();
  await page.waitForURL("https://wa.me/**");
  assert.match(new URL(page.url()).searchParams.get("text"), /Cyprus International University/);
  await page.unroute("https://wa.me/**");
}

async function assertNeuModal(dialog, locale) {
  assert.equal(await dialog.getByRole("table").count(), 0);
  assert.equal(await dialog.locator("[data-selected-fees]").count(), 0);
  assert.equal(
    await dialog.locator('a[href="/courses?university=near-east-university"]').count(),
    1,
  );
  const text = await dialog.innerText();
  assert.match(text, /2026\/2027/);
  assert.match(text, /50\s*%|%50/);
  const patterns = {
    en: [
      /Unlisted scholarship figures are not zero/,
      /Pharmacy has a special scholarship listed without a tuition figure/,
      /availability and language of instruction vary/,
      /deposit and payment schedule remain unconfirmed/,
      /excluding Medicine and Dentistry/,
    ],
    tr: [
      /Listelenmeyen burslu tutarlar sıfır değildir/,
      /Eczacılık.*özel burs/,
      /eğitim dili değişir/,
      /depozito ve ödeme takvimi teyit edilmemiştir/,
      /Tıp ve Diş Hekimliği hariç/,
    ],
    fr: [
      /montants avec bourse non indiqués ne sont pas nuls/,
      /bourse spéciale.*pharmacie/,
      /langue d’enseignement varient/,
      /dépôt initial et l’échéancier restent non confirmés/,
      /hors médecine et dentisterie/,
    ],
    sw: [
      /Kiasi cha ufadhili kisichoorodheshwa si sifuri/,
      /Famasia ina ufadhili maalumu/,
      /lugha ya kufundishia hutofautiana/,
      /Amana ya awali na ratiba ya malipo bado hazijathibitishwa/,
      /isipokuwa Udaktari na Udaktari wa Meno/,
    ],
  }[locale];
  for (const pattern of patterns) assert.match(text, pattern);
}

async function assertNeuCatalogue(section, locale) {
  assert.equal(await section.locator("li").count(), 31);
  assert.equal(await section.locator('[data-example-level="unassigned"]').count(), 1);
  const feeCards = section.locator("[data-fee-programme]");
  assert.equal(await feeCards.count(), 9);
  const localized = {
    en: {
      names: [
        "Business Administration",
        "International Business",
        "Computer Engineering",
        "Software Engineering",
        "Nursing",
        "Architecture",
        "Medicine",
        "Dentistry (English)",
        "Pharmacy",
      ],
      labels: [
        "Annual tuition before scholarship",
        "Listed 50% scholarship figure / special scholarship",
        "Total including VAT/administrative fee",
      ],
      missing: "No scholarship figure listed",
      special: "Special scholarship listed; figure not supplied",
      sample: "Artificial Intelligence Engineering",
      level: /No named Associate degree, Master’s or PhD offerings are confirmed/,
      caveat: /availability and language of instruction vary/,
    },
    tr: {
      names: [
        "İşletme",
        "Uluslararası İşletme",
        "Bilgisayar Mühendisliği",
        "Yazılım Mühendisliği",
        "Hemşirelik",
        "Mimarlık",
        "Tıp",
        "Diş Hekimliği (İngilizce)",
        "Eczacılık",
      ],
      labels: [
        "Burs öncesi yıllık öğrenim ücreti",
        "Listelenen %50 burslu tutar / özel burs",
        "KDV/idari ücret dahil toplam",
      ],
      missing: "Burslu tutar listelenmemiş",
      special: "Özel burs listelenmiş; tutar sağlanmamış",
      sample: "Yapay Zekâ Mühendisliği",
      level: /isimli ön lisans, yüksek lisans veya doktora programı teyit edilmemektedir/,
      caveat: /Programların açık olması ve eğitim dili değişir/,
    },
    fr: {
      names: [
        "Administration des entreprises",
        "Commerce international",
        "Génie informatique",
        "Génie logiciel",
        "Soins infirmiers",
        "Architecture",
        "Médecine",
        "Dentisterie (en anglais)",
        "Pharmacie",
      ],
      labels: [
        "Frais de scolarité annuels avant bourse",
        "Montant indiqué avec bourse de 50 % / bourse spéciale",
        "Total incluant TVA/frais administratifs",
      ],
      missing: "Aucun montant avec bourse indiqué",
      special: "Bourse spéciale indiquée ; montant non communiqué",
      sample: "Génie de l’intelligence artificielle",
      level: /Aucune formation nommée de cycle court, master ou doctorat n’est confirmée/,
      caveat: /disponibilité et la langue d’enseignement varient/,
    },
    sw: {
      names: [
        "Usimamizi wa Biashara",
        "Biashara ya Kimataifa",
        "Uhandisi wa Kompyuta",
        "Uhandisi wa Programu",
        "Uuguzi",
        "Usanifu Majengo",
        "Udaktari",
        "Udaktari wa Meno (Kiingereza)",
        "Famasia",
      ],
      labels: [
        "Ada ya masomo ya mwaka kabla ya ufadhili",
        "Kiasi kilichoorodheshwa kwa ufadhili wa 50% / ufadhili maalumu",
        "Jumla ikijumuisha VAT/ada ya utawala",
      ],
      missing: "Hakuna kiasi cha ufadhili kilichoorodheshwa",
      special: "Ufadhili maalumu umeorodheshwa; kiasi hakijatolewa",
      sample: "Uhandisi wa Akili Bandia",
      level: /Hakuna programu zenye majina za associate, uzamili au uzamivu zilizothibitishwa/,
      caveat: /Upatikanaji wa programu na lugha ya kufundishia hutofautiana/,
    },
  }[locale];
  assert.deepEqual(await feeCards.locator("h4").allTextContents(), localized.names);
  const amounts = [
    ...Array.from({ length: 6 }, () => ["€5,600", "€2,800", "€3,225"]),
    ["€12,600", localized.missing, "€13,515"],
    ["€11,600", localized.missing, "€12,465"],
    ["€8,600", localized.special, "€4,800"],
  ];
  for (let index = 0; index < 9; index++) {
    assert.deepEqual(await feeCards.nth(index).locator("dt").allTextContents(), localized.labels);
    assert.deepEqual(await feeCards.nth(index).locator("dd").allTextContents(), amounts[index]);
  }
  assert.match(await section.locator("[data-selected-fees] h3").innerText(), /2026\/2027.*EUR/);
  assert.ok((await section.locator("li").allTextContents()).includes(localized.sample));
  assert.match(await section.innerText(), localized.level);
  assert.match(await section.innerText(), localized.caveat);
  assert.equal(await section.locator('a[href*="course="]').count(), 0);
  if (locale === "en") {
    assert.deepEqual(
      (await section.locator("li").allTextContents()).sort(),
      [
        "Business Administration",
        "International Business",
        "International Relations",
        "Economics",
        "Banking and Finance",
        "Human Resource Management",
        "Marketing",
        "Computer Engineering",
        "Software Engineering",
        "Artificial Intelligence Engineering",
        "Cyber Security Engineering",
        "Information Systems Engineering",
        "Management Information Systems",
        "Data Analysis Engineering",
        "Civil Engineering",
        "Electrical and Electronic Engineering",
        "Mechanical Engineering",
        "Biomedical Engineering",
        "Industrial Engineering",
        "Medicine",
        "Dentistry",
        "Pharmacy",
        "Nursing",
        "Physiotherapy and Rehabilitation",
        "Nutrition and Dietetics",
        "Architecture",
        "Interior Architecture",
        "Law",
        "Tourism and Hotel Management",
        "English Language Teaching",
        "Veterinary Medicine",
      ].sort(),
    );
  }
}

async function checkNeuCatalogue(page, baseUrl, locale) {
  const slug = "near-east-university";
  await gotoReady(page, `${baseUrl}/courses?university=${slug}`);
  const section = page.locator(`[data-university-examples="${slug}"]`);
  await assertNeuCatalogue(section, locale);
  assert.equal(await page.locator("main article.card-light").count(), 0);
  const filters = page.locator("main select");
  await filters.nth(0).selectOption("Computer Science & IT");
  assert.equal(await section.locator("li").count(), 7);
  assert.equal(new URL(page.url()).searchParams.get("university"), slug);
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(await section.locator("li").count(), 7);
  for (const level of ["Associate degree", "Bachelor's", "Master's", "PhD"]) {
    await filters.nth(1).selectOption(level);
    assert.equal(await section.locator("li").count(), 0);
    assert.equal(await section.locator("[data-fee-programme]").count(), 9);
  }
  await filters.nth(0).selectOption("");
  await filters.nth(1).selectOption("");
  await assertNeuCatalogue(section, locale);
  await page.setViewportSize({ width: 320, height: 844 });
  for (const card of await section.locator("[data-fee-programme]").all()) {
    await card.scrollIntoViewIfNeeded();
    assert.ok(await card.isVisible());
  }
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await section.locator(`a[href="/application?university=${slug}"]`).click();
  await page.waitForURL(`**/application?university=${slug}`);
  const form = page.locator("form");
  await form.locator('input[autocomplete="name"]').fill("NEU Catalogue Test");
  await form.locator('input[type="email"]').fill("neu@example.test");
  await form.locator('button[type="submit"]').click();
  assert.equal(await form.locator("select").nth(1).inputValue(), slug);
  assert.equal(
    await form.locator("select").nth(2).locator('option[value]:not([value=""])').count(),
    0,
  );
  await form.locator("select").nth(3).selectOption("January 2027");
  await form.locator('button[type="submit"]').click();
  await form.locator('button[type="submit"]').click();
  await page.route("https://wa.me/**", (route) =>
    route.fulfill({ contentType: "text/html", body: "handoff intercepted" }),
  );
  await form.locator('button[type="submit"]').click();
  await page.waitForURL("https://wa.me/**");
  assert.match(new URL(page.url()).searchParams.get("text"), /Near East University/);
  await page.unroute("https://wa.me/**");
  await gotoReady(page, `${baseUrl}/courses`);
  assert.equal(await section.locator("li").count(), 31);
  assert.equal(
    await page.locator('[data-university-examples="cyprus-international-university"] li').count(),
    38,
  );
  assert.equal(await page.locator("main article.card-light").count(), 3);
  await filters.nth(2).selectOption("oth-regensburg");
  assert.equal(await section.count(), 0);
  assert.equal(await page.locator("main article.card-light").count(), 1);
}

async function assertFloridaModal(dialog, locale) {
  assert.match(await dialog.innerText(), /2026\/2027.*F-1\/J-1/s);
  const caveats = {
    en: [
      /not guaranteed final costs/,
      /non-Florida-resident rates/,
      /additional charges may apply/,
      /deposits, deadlines and financial-documentation/,
      /no fixed initial payment/,
    ],
    tr: [
      /garanti edilmiş nihai maliyetler değildir/,
      /Florida dışı ikamet tarifelerini/,
      /ek ücretler uygulanabilir/,
      /Depozitoları, son tarihleri ve mali belge/,
      /sabit ilk ödeme belirtilmemiştir/,
    ],
    fr: [
      /non des coûts finaux garantis/,
      /non-résidents de Floride/,
      /frais supplémentaires peuvent s’appliquer/,
      /dépôts, échéances et justificatifs financiers/,
      /aucun paiement initial fixe/,
    ],
    sw: [
      /si gharama za mwisho zilizohakikishwa/,
      /wasio wakazi wa Florida/,
      /ada za ziada zinaweza kutumika/,
      /amana, tarehe za mwisho na mahitaji ya hati za fedha/,
      /hakuna malipo ya awali ya kudumu/,
    ],
  }[locale];
  for (const pattern of caveats) assert.match(await dialog.innerText(), pattern);
  assert.equal(await dialog.locator("li").count(), 4);
  const img = dialog.locator("img");
  await img.evaluate((image) => image.decode());
  assert.match(await img.getAttribute("src"), /florida-international-university-logo.png/);
  assert.equal(await img.evaluate((image) => getComputedStyle(image).objectFit), "contain");
}

async function checkFloridaCatalogue(page, baseUrl, locale) {
  const slug = "florida-international-university";
  await gotoReady(page, `${baseUrl}/courses?university=${slug}`);
  const section = page.locator(`[data-university-examples="${slug}"]`);
  assert.equal(await section.locator("li").count(), 23);
  assert.equal(await section.locator('[data-example-level="Bachelor\'s"] li').count(), 14);
  assert.equal(await section.locator('[data-example-level="unassigned"] li').count(), 9);
  if (locale === "en") {
    assert.deepEqual(
      await section.locator('[data-example-level="Bachelor\'s"] li').allTextContents(),
      [
        "Accounting",
        "Finance",
        "Business Administration",
        "International Business",
        "Marketing",
        "Computer Science",
        "IT",
        "Engineering",
        "Nursing",
        "Biological Sciences",
        "Public Health",
        "Psychology",
        "Communication",
        "International Relations",
      ],
    );
    assert.deepEqual(
      await section.locator('[data-example-level="unassigned"] li').allTextContents(),
      [
        "Business Administration",
        "Finance",
        "Accounting",
        "Computer Science",
        "Engineering",
        "Public Health",
        "International Relations",
        "Psychology",
        "Education",
      ],
    );
  }
  const costs = section.locator("[data-cost-row]");
  assert.equal(await costs.count(), 8);
  assert.deepEqual(await costs.locator("dd").allTextContents(), [
    "$11,376",
    "$10,317",
    "$104",
    "$199",
    "$675",
    "$500",
    "$5,025",
    "$5,025",
    "$2,595",
    "$2,595",
    "$1,515",
    "$1,515",
    "$1,784",
    "$1,784",
    "$46,198",
    "$44,006",
  ]);
  const expected = {
    en: {
      sample: "Biological Sciences",
      term: /per semester/,
      annual: /Estimated annual total — fall and spring/,
      notes: [
        /not confirmed current degree records/,
        /loan-origination allowances omitted/,
        /not every budget allowance is a charge/,
        /not scholarship prices or guaranteed invoices/,
        /Requirements vary by admission pathway and programme/,
        /Master’s and PhD document guidance/,
      ],
    },
    tr: {
      sample: "Biyolojik Bilimler",
      term: /dönem başına/,
      annual: /Tahmini yıllık toplam — güz ve bahar/,
      notes: [
        /teyit edilmiş güncel derece kayıtları değildir/,
        /kredi kullandırım payları/,
        /her bütçe kalemi her öğrencinin ödeyeceği bir ücret değildir/,
        /burslu fiyatlar veya garanti edilmiş faturalar değildir/,
        /Koşullar başvuru yoluna ve programa göre değişir/,
        /Yüksek lisans ve doktora belgesi rehberi/,
      ],
    },
    fr: {
      sample: "Sciences biologiques",
      term: /par semestre/,
      annual: /Total annuel estimé — automne et printemps/,
      notes: [
        /non des fiches de diplômes actuels confirmés/,
        /prêt omis des lignes/,
        /chaque provision n’est pas une somme due par chaque étudiant/,
        /ni des tarifs avec bourse ni des factures garanties/,
        /conditions varient selon le parcours et la formation/,
        /Documents indicatifs pour le master et le doctorat/,
      ],
    },
    sw: {
      sample: "Sayansi za Biolojia",
      term: /kwa muhula/,
      annual: /Jumla ya mwaka iliyokadiriwa — vuli na masika/,
      notes: [
        /si rekodi za sasa za shahada zilizothibitishwa/,
        /kuanzisha mkopo yaliyoachwa/,
        /si kila kipengele cha bajeti ni ada/,
        /si bei za ufadhili au ankara zilizohakikishwa/,
        /Mahitaji hutofautiana kwa njia ya udahili na programu/,
        /Mwongozo wa hati za uzamili na uzamivu/,
      ],
    },
  }[locale];
  assert.ok((await section.locator("li").allTextContents()).includes(expected.sample));
  for (let i = 0; i < 7; i++)
    assert.match(await costs.nth(i).locator("h4").innerText(), expected.term);
  assert.match(await costs.last().locator("h4").innerText(), expected.annual);
  const text = await section.innerText();
  for (const pattern of expected.notes) assert.match(text, pattern);
  assert.match(text, /2026\/2027.*USD/s);
  assert.equal(
    await section.locator('a[href="https://www.fiu.edu/academics/degrees-and-programs/"]').count(),
    1,
  );
  assert.equal(
    await section
      .locator('a[href="https://onestop.fiu.edu/finances/estimate-your-costs/"]')
      .count(),
    1,
  );
  const filters = page.locator("main select");
  await filters.nth(1).selectOption("Bachelor's");
  assert.equal(await section.locator("li").count(), 14);
  await filters.nth(0).selectOption("Business & Management");
  assert.equal(await section.locator("li").count(), 5);
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(await section.locator("li").count(), 5);
  assert.equal(new URL(page.url()).searchParams.get("university"), slug);
  for (const level of ["Master's", "PhD"]) {
    await filters.nth(1).selectOption(level);
    assert.equal(await section.locator("li").count(), 0);
  }
  await filters.nth(0).selectOption("");
  await filters.nth(1).selectOption("");
  await page.setViewportSize({ width: 320, height: 844 });
  for (const cost of await costs.all()) await cost.scrollIntoViewIfNeeded();
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await section.locator(`a[href="/application?university=${slug}"]`).click();
  await page.waitForURL(`**/application?university=${slug}`);
  const form = page.locator("form");
  await form.locator('input[autocomplete="name"]').fill("Florida Catalogue Test");
  await form.locator('input[type="email"]').fill("florida@example.test");
  await form.locator('button[type="submit"]').click();
  assert.equal(await form.locator("select").nth(0).inputValue(), "united-states");
  assert.equal(await form.locator("select").nth(1).inputValue(), slug);
  assert.equal(
    await form.locator("select").nth(2).locator('option[value]:not([value=""])').count(),
    0,
  );
  await form.locator("select").nth(3).selectOption("January 2027");
  await form.locator('button[type="submit"]').click();
  await form.locator('button[type="submit"]').click();
  await page.route("https://wa.me/**", (route) =>
    route.fulfill({ contentType: "text/html", body: "intercepted" }),
  );
  await form.locator('button[type="submit"]').click();
  await page.waitForURL("https://wa.me/**");
  assert.match(new URL(page.url()).searchParams.get("text"), /Florida International University/);
  await page.unroute("https://wa.me/**");
  await gotoReady(page, `${baseUrl}/courses`);
  assert.equal(await section.locator("li").count(), 23);
  assert.equal(await page.locator("main article.card-light").count(), 3);
  await filters.nth(2).selectOption("final-international-university");
  assert.equal(await section.count(), 0);
}

async function checkUniversityRefinement(page, baseUrl, university) {
  const { slug, name, officialUrl, assertFees } = university;
  const source =
    "https://www.emu.edu.tr/media/assets/files/tuition-fees/2026-2027-newly-registered-international-tuition-fees.pdf?ver=1";
  for (const [locale, language] of [
    ["en", "English"],
    ["tr", "Türkçe"],
    ["fr", "Français"],
    ["sw", "Kiswahili"],
  ]) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await gotoReady(page, `${baseUrl}/universities`);
    await selectLanguage(page, language, locale);
    const card = page.locator("article").filter({
      has: page.getByRole("heading", { name, exact: true }),
    });
    const trigger = card.getByRole("button");
    if (slug === "florida-international-university") {
      await page.locator("main select").selectOption("united-states");
      assert.equal(await page.locator("main article.card-light").count(), 3);
      assert.equal(
        await page
          .getByRole("heading", { name: "Final International University (FIU)", exact: true })
          .count(),
        0,
      );
      await page.locator("main select").selectOption("");
      await card.locator("img").evaluate((image) => image.decode());
      assert.equal(
        await card.locator("img").getAttribute("src"),
        "/Uni-Logos/florida-international-university-logo.png",
      );
      assert.ok(
        await card
          .locator("img")
          .evaluate(
            (image) =>
              Math.abs(image.naturalWidth / image.naturalHeight - 800 / 373) < 0.01 &&
              getComputedStyle(image).objectFit === "contain",
          ),
      );
      assert.equal(
        await page
          .getByRole("heading", { name: "Final International University (FIU)", exact: true })
          .count(),
        1,
      );
    }
    await trigger.scrollIntoViewIfNeeded();
    const original = await scrollState(page);
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await assertFees(dialog, locale);
    assert.equal(
      await dialog.locator(`a[href="${source}"]`).count(),
      slug === "eastern-mediterranean-university" ? 2 : 0,
    );
    assert.equal(await page.locator("body").evaluate((body) => body.style.position), "fixed");
    await dialog.locator("section").nth(1).click();
    assert.ok(await dialog.isVisible());
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden" });
    assert.deepEqual(await scrollState(page), original);

    await page.setViewportSize({ width: 320, height: 844 });
    await trigger.click();
    await assertFees(dialog, locale);
    assert.ok(
      await dialog.evaluate(
        (element) =>
          element.scrollWidth <= element.clientWidth && element.scrollHeight > element.clientHeight,
      ),
    );
    for (const row of await dialog.locator("tbody tr").all()) await row.scrollIntoViewIfNeeded();
    const applyLabel = { en: "Apply Now", tr: "Hemen Başvur", fr: "Postuler", sw: "Omba sasa" }[
      locale
    ];
    const coursesLabel = {
      en: "View Courses",
      tr: "Programları Gör",
      fr: "Voir les formations",
      sw: "Angalia programu",
    }[locale];
    for (const container of [card, dialog]) {
      const apply = container.getByRole("link", { name: applyLabel, exact: true });
      assert.equal(await apply.getAttribute("href"), `/application?university=${slug}`);
      assert.match(await apply.getAttribute("class"), /\bbtn-primary\b/);
      const viewCourses = container.getByRole("link", { name: coursesLabel, exact: true });
      assert.equal(await viewCourses.getAttribute("href"), `/courses?university=${slug}`);
      assert.equal(await viewCourses.getAttribute("target"), null);
      assert.equal(await container.locator(`a[href="${officialUrl}"]`).count(), 0);
    }
    assert.equal(await dialog.locator('a[href*="wa.me"]').count(), 1);
    await page.mouse.click(2, 2);
    await dialog.waitFor({ state: "hidden" });
    assert.notEqual(await page.locator("body").evaluate((body) => body.style.position), "fixed");
    await trigger.click();
    await dialog.getByRole("button").click();
    await dialog.waitFor({ state: "hidden" });
    await card.getByRole("link", { name: coursesLabel, exact: true }).click();
    await page.waitForURL(`**/courses?university=${slug}`);
    assert.equal(await page.locator("main select").nth(2).inputValue(), slug);
    await gotoReady(page, `${baseUrl}/universities`);
    await trigger.click();
    await dialog.getByRole("link", { name: coursesLabel, exact: true }).click();
    await page.waitForURL(`**/courses?university=${slug}`);
    assert.notEqual(await page.locator("body").evaluate((body) => body.style.position), "fixed");
    await gotoReady(page, `${baseUrl}/universities`);
    await trigger.click();
    await dialog.locator(`a[href="/application?university=${slug}"]`).click();
    await page.waitForURL(`**/application?university=${slug}`);
    assert.notEqual(await page.locator("body").evaluate((body) => body.style.position), "fixed");
    const form = page.locator("form");
    await form.locator('input[autocomplete="name"]').fill("University Prefill Test");
    await form.locator('input[type="email"]').fill("prefill@example.test");
    await form.locator('button[type="submit"]').click();
    assert.equal(
      await form.locator("select").nth(0).inputValue(),
      slug === "florida-international-university" ? "united-states" : "cyprus",
    );
    assert.equal(await form.locator("select").nth(1).inputValue(), slug);
    await gotoReady(page, `${baseUrl}/courses?university=${slug}`);
    assert.equal(await page.locator("main article.card-light").count(), 0);
    if (slug === "cyprus-international-university") await checkCiuCatalogue(page, baseUrl, locale);
    if (slug === "near-east-university") await checkNeuCatalogue(page, baseUrl, locale);
    if (slug === "florida-international-university")
      await checkFloridaCatalogue(page, baseUrl, locale);
    console.log(
      `✓ ${name} supplied fees, caveats, mobile modal, internal CTAs and prefill (${locale})`,
    );
  }
}

async function checkScholarshipDirectory(page, baseUrl) {
  const localeOptions = [
    { code: "en", language: "English" },
    { code: "tr", language: "Türkçe" },
    { code: "fr", language: "Français" },
    { code: "sw", language: "Kiswahili" },
  ];
  const labels = {
    en: {
      awards: ["International Student Scholarship", "Academic Scholarship"],
      confirmed: "Confirmed current",
      official: "Official information; current availability unconfirmed",
      awaiting: "Awaiting verification",
      emptyHeading: "No scholarship information matches these filters",
      clear: "Clear filters",
      levels: "All study levels",
      allTypes: "All types",
      found: "scholarship listings",
      uokDeadline: "18 September 2026",
      fiuAmount: "$4,000–$24,000",
      bursaryType: "Bursary",
      sunderlandAmount: "£1,000",
      reviewedDate: "25 October 2026",
    },
    tr: {
      awards: ["Uluslararası Öğrenci Bursu", "Akademik Başarı Bursu"],
      confirmed: "Güncel olduğu teyit edildi",
      official: "Resmî bilgi; güncel uygunluk teyit edilmedi",
      awaiting: "Doğrulama bekliyor",
      emptyHeading: "Bu filtrelerle eşleşen burs bilgisi yok",
      clear: "Filtreleri temizle",
      levels: "Tüm eğitim seviyeleri",
      allTypes: "Tüm türler",
      found: "burs kaydı",
      uokDeadline: "18 Eylül 2026",
      fiuAmount: "4.000–24.000 ABD doları",
      bursaryType: "Karşılıksız eğitim desteği",
      sunderlandAmount: "1.000 £",
      reviewedDate: "25 Ekim 2026",
    },
    fr: {
      awards: ["Bourse pour étudiants internationaux", "Bourse au mérite académique"],
      confirmed: "Confirmée en vigueur",
      official: "Information officielle ; disponibilité actuelle non confirmée",
      awaiting: "En attente de vérification",
      emptyHeading: "Aucune information sur les bourses ne correspond à ces filtres",
      clear: "Effacer les filtres",
      levels: "Tous les niveaux d’études",
      allTypes: "Tous les types",
      found: "fiches de bourses",
      uokDeadline: "18 septembre 2026",
      fiuAmount: "4 000 à 24 000 $",
      bursaryType: "Aide financière non remboursable",
      sunderlandAmount: "1 000 £",
      reviewedDate: "25 octobre 2026",
    },
    sw: {
      awards: ["Ufadhili kwa Wanafunzi wa Kimataifa", "Ufadhili wa Mafanikio ya Kitaaluma"],
      confirmed: "Imethibitishwa kuwa ya sasa",
      official: "Taarifa rasmi; upatikanaji wa sasa haujathibitishwa",
      awaiting: "Inasubiri uthibitisho",
      emptyHeading: "Hakuna taarifa za ufadhili zinazolingana na vichujio hivi",
      clear: "Futa vichujio",
      levels: "Ngazi zote za masomo",
      allTypes: "Aina zote",
      found: "matangazo ya ufadhili",
      uokDeadline: "18 Septemba 2026",
      fiuAmount: "Dola 4,000–24,000",
      bursaryType: "Ruzuku ya elimu",
      sunderlandAmount: "£1,000",
      reviewedDate: "25 Oktoba 2026",
    },
  };

  for (const { code, language } of localeOptions) {
    const copy = labels[code];
    await gotoReady(page, `${baseUrl}/scholarships`);
    await selectLanguage(page, language, code);
    const cards = page.locator("main article[data-scholarship-status]");
    assert.equal(await cards.count(), 17, `${code} should render all scholarship records.`);
    assert.equal(
      await page.locator("main").getByText(copy.found, { exact: false }).count(),
      1,
      `${code} should show the scholarship record count.`,
    );
    assert.equal(
      await page.locator("main article[data-scholarship-status='confirmed-current']").count(),
      2,
    );
    assert.equal(
      await page
        .locator("main article[data-scholarship-status='official-info-unconfirmed']")
        .count(),
      14,
    );
    assert.equal(
      await page.locator("main article[data-scholarship-status='awaiting-verification']").count(),
      1,
    );
    for (const [index, slug] of [
      "ciu-international-undergraduate-tuition-scholarship",
      "ciu-undergraduate-academic-merit-scholarship",
    ].entries()) {
      const ciuCard = page.locator(`main article[data-scholarship-slug='${slug}']`);
      assert.equal(await ciuCard.getAttribute("data-scholarship-status"), "confirmed-current");
      assert.equal(await ciuCard.getAttribute("data-scholarship-source-reviewed-at"), "2026-10-25");
      assert.ok((await ciuCard.innerText()).includes(copy.awards[index]));
      assert.ok((await ciuCard.innerText()).includes(copy.reviewedDate));
      assert.match(await ciuCard.innerText(), new RegExp(copy.confirmed));
    }
    for (const card of await cards.all()) {
      const universitySlug = await card.getAttribute("data-scholarship-university");
      const apply = card.getByRole("link", {
        name: { en: "Apply Now", tr: "Hemen Başvur", fr: "Postuler", sw: "Omba sasa" }[code],
        exact: true,
      });
      assert.equal(await apply.getAttribute("href"), `/application?university=${universitySlug}`);
      assert.match(await apply.getAttribute("class"), /\bbtn-primary\b/);
      assert.equal(
        await card.locator('a[href^="https://"]:not([href^="https://wa.me/"])').count(),
        0,
        `${code} cards must keep users on FranklyEdu rather than link out to the university scholarship page.`,
      );
      const enquiry = card.locator('a[href^="https://wa.me/"]');
      assert.match(
        await enquiry.innerText(),
        /^(Enquire|Bilgi Al|Demander des renseignements|Uliza maelezo)$/,
      );
    }
    const neuCard = page.locator(
      "main article[data-scholarship-slug='neu-international-undergraduate-scholarship']",
    );
    assert.equal(await neuCard.getAttribute("data-scholarship-status"), "awaiting-verification");
    assert.match(await neuCard.innerText(), new RegExp(copy.awaiting));
    assert.match(await neuCard.innerText(), /50/);
    const kyreniaCard = page.locator(
      "main article[data-scholarship-slug='kyrenia-2026-27-international-graduate-scholarship']",
    );
    assert.equal(
      await kyreniaCard.getAttribute("data-scholarship-status"),
      "official-info-unconfirmed",
    );
    assert.ok((await kyreniaCard.innerText()).includes(copy.uokDeadline));
    assert.match(await kyreniaCard.innerText(), new RegExp(copy.official));
    const fiuCard = page.locator(
      "main article[data-scholarship-slug='fiu-gold-and-blue-scholarship']",
    );
    assert.ok((await fiuCard.innerText()).includes(copy.fiuAmount));
    assert.match(await fiuCard.innerText(), new RegExp(copy.official));
    const sunderlandCard = page.locator(
      "main article[data-scholarship-slug='sunderland-journey-award-2028-29']",
    );
    assert.equal(
      await sunderlandCard.getAttribute("data-scholarship-status"),
      "official-info-unconfirmed",
    );
    assert.ok((await sunderlandCard.innerText()).includes(copy.sunderlandAmount));
    assert.match(await sunderlandCard.innerText(), new RegExp(copy.bursaryType));
    assert.match(await sunderlandCard.innerText(), /www\.sunderland\.ac\.uk/);

    const filters = page.locator("main select");
    assert.equal(await filters.count(), 3);
    await filters.nth(0).selectOption("near-east-university");
    await filters.nth(1).selectOption("Bachelor's");
    await filters.nth(2).selectOption("scholarship");
    assert.equal(
      await cards.count(),
      1,
      `${code} filters should include awaiting-verification records.`,
    );
    assert.match(page.url(), /university=near-east-university/);
    assert.match(page.url(), /level=Bachelor(?:%27|')s/);
    assert.match(page.url(), /type=scholarship/);

    await filters.nth(0).selectOption("university-of-kyrenia");
    await filters.nth(1).selectOption("PhD");
    assert.equal(
      await cards.count(),
      1,
      `${code} multi-level awards should match each supported level.`,
    );
    assert.equal(
      await cards.first().getAttribute("data-scholarship-slug"),
      "kyrenia-2026-27-international-graduate-scholarship",
    );

    await filters.nth(0).selectOption("florida-international-university");
    await filters.nth(1).selectOption("Bachelor's");
    await filters.nth(2).selectOption("tuition-discount");
    assert.equal(await cards.count(), 0);
    await page.getByRole("heading", { name: copy.emptyHeading, exact: true }).waitFor();

    await page.getByRole("link", { name: copy.clear, exact: true }).click();
    await page.waitForURL("**/scholarships");
    await filters.nth(0).selectOption("university-of-sunderland");
    await filters.nth(1).selectOption("");
    await filters.nth(2).selectOption("bursary");
    assert.equal(
      await cards.count(),
      1,
      `${code} should filter the separately labelled bursary type.`,
    );

    await page.getByRole("link", { name: copy.clear, exact: true }).click();
    await page.waitForURL("**/scholarships");
    await page.setViewportSize({ width: 320, height: 844 });
    assert.equal(await cards.count(), 17);
    assert.ok(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      `${code} scholarship listing must not overflow at 320px.`,
    );
    await gotoReady(page, `${baseUrl}/application?university=cyprus-international-university`);
    await page.locator('input[autocomplete="name"]').fill("Scholarship Prefill Check");
    await page.locator('input[type="email"]').fill("scholarship@example.test");
    await page.locator('form button[type="submit"]').click();
    assert.equal(await page.locator("form select").nth(0).inputValue(), "cyprus");
    assert.equal(
      await page.locator("form select").nth(1).inputValue(),
      "cyprus-international-university",
    );
    await page.setViewportSize({ width: 1440, height: 1000 });
    console.log(
      `✓ Scholarship statuses, official details, filters, application prefill and localization (${code})`,
    );
  }
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

    if (process.argv.includes("--scholarships")) {
      await checkScholarshipDirectory(page, baseUrl);
      assert.deepEqual(
        browserErrors,
        [],
        "Focused scholarship checks must have zero browser errors.",
      );
      console.log("Focused scholarship smoke tests passed.");
      return;
    }

    if (
      ["--emu", "--gau", "--kyrenia", "--ciu", "--neu", "--florida"].some((flag) =>
        process.argv.includes(flag),
      )
    ) {
      const gau = process.argv.includes("--gau");
      await checkUniversityRefinement(
        page,
        baseUrl,
        process.argv.includes("--florida")
          ? {
              slug: "florida-international-university",
              name: "Florida International University (FIU)",
              officialUrl: "https://www.fiu.edu/",
              assertFees: assertFloridaModal,
            }
          : process.argv.includes("--neu")
            ? {
                slug: "near-east-university",
                name: "Near East University",
                officialUrl: "https://neu.edu.tr/?lang=en",
                assertFees: assertNeuModal,
              }
            : process.argv.includes("--ciu")
              ? {
                  slug: "cyprus-international-university",
                  name: "Cyprus International University",
                  officialUrl: "https://ciu.edu.tr/en",
                  assertFees: assertCiuModal,
                }
              : process.argv.includes("--kyrenia")
                ? {
                    slug: "university-of-kyrenia",
                    name: "University of Kyrenia (Girne Üniversitesi)",
                    officialUrl: "https://kyrenia.edu.tr/?lang=en",
                    assertFees: assertKyreniaFees,
                  }
                : gau
                  ? {
                      slug: "girne-american-university",
                      name: "Girne American University",
                      officialUrl: "https://www.gau.edu.tr/en/",
                      assertFees: assertGauFees,
                    }
                  : {
                      slug: "eastern-mediterranean-university",
                      name: "Eastern Mediterranean University",
                      officialUrl: "https://www.emu.edu.tr/en",
                      assertFees: assertEmuFees,
                    },
      );
      assert.deepEqual(
        browserErrors,
        [],
        "Focused university checks must have zero browser errors.",
      );
      console.log("Focused university smoke tests passed.");
      return;
    }

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
      const scholarshipCards = page.locator("main article[data-scholarship-status]");
      assert.equal(await scholarshipCards.count(), 17);
      assert.equal(
        await page.locator("main article[data-scholarship-status='confirmed-current']").count(),
        2,
      );
      assert.equal(
        await page
          .locator("main article[data-scholarship-status='official-info-unconfirmed']")
          .count(),
        14,
      );
      assert.equal(
        await page.locator("main article[data-scholarship-status='awaiting-verification']").count(),
        1,
      );
      assert.equal(
        await scholarshipCards.locator('a[href^="https://"]:not([href^="https://wa.me/"])').count(),
        0,
        `${locale} scholarship cards must not link out to external scholarship pages.`,
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
          officialUrl: "https://www.final.edu.tr/",
        },
        {
          slug: "cyprus-international-university",
          name: "Cyprus International University",
          logo: "/Uni-Logos/CIU-logo.png",
          location: "Nicosia",
          studyAreaCount: 10,
          officialUrl: "https://ciu.edu.tr/en",
        },
        {
          slug: "university-of-kyrenia",
          name: "University of Kyrenia (Girne Üniversitesi)",
          logo: "/Uni-Logos/girne-uni-logo.png",
          location: "Kyrenia (Girne)",
          officialUrl: "https://kyrenia.edu.tr/?lang=en",
          studyAreaCount: 5,
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
          slug: "florida-international-university",
          name: "Florida International University (FIU)",
          logo: "/Uni-Logos/florida-international-university-logo.png",
          logoSurface: "navy",
          logoAspectRatio: 800 / 373,
          location: "Miami, Florida",
          studyAreaCount: 4,
          officialUrl: "https://www.fiu.edu/",
        },
        {
          slug: "university-of-memphis",
          name: "University of Memphis",
          logo: "/Uni-Logos/memphis-logo.png",
          location: "Memphis, Tennessee",
          officialUrl: "https://www.memphis.edu/",
        },
        {
          slug: "pace-university",
          name: "Pace University",
          logo: "/Uni-Logos/pace-logo.png",
          location: "New York City and Westchester County",
          officialUrl: "https://www.pace.edu/",
        },
        {
          slug: "university-of-sunderland",
          name: "University of Sunderland",
          logo: "/Uni-Logos/university-sunderland-logo.png",
          location: "Sunderland, England",
          officialUrl: "https://www.sunderland.ac.uk/",
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
      const applyLabel = {
        en: "Apply Now",
        tr: "Hemen Başvur",
        fr: "Postuler",
        sw: "Omba sasa",
      }[locale];
      const coursesLabel = {
        en: "View Courses",
        tr: "Programları Gör",
        fr: "Voir les formations",
        sw: "Angalia programu",
      }[locale];
      const enquiryLabel = {
        en: "Enquire",
        tr: "Bilgi Al",
        fr: "Demander des renseignements",
        sw: "Uliza maelezo",
      }[locale];
      const guidanceNote = {
        en: "FranklyEdu provides application guidance and does not directly submit applications to universities.",
        tr: "FranklyEdu başvuru rehberliği sağlar ve üniversitelere doğrudan başvuru göndermez.",
        fr: "FranklyEdu accompagne votre candidature et ne la dépose pas directement auprès des universités.",
        sw: "FranklyEdu hutoa mwongozo wa maombi na haitumi maombi moja kwa moja kwa vyuo vikuu.",
      }[locale];
      async function assertUniversityActions(container, university) {
        const apply = container.getByRole("link", { name: applyLabel, exact: true });
        assert.equal(
          await apply.getAttribute("href"),
          `/application?university=${university.slug}`,
          `${locale} ${university.name} must carry its selection into the internal application.`,
        );
        assert.match(await apply.getAttribute("class"), /\bbtn-primary\b/);
        assert.equal(await apply.getAttribute("target"), null);
        assert.equal(await container.locator("a.btn-primary").count(), 1);
        const viewCourses = container.getByRole("link", { name: coursesLabel, exact: true });
        assert.equal(
          await viewCourses.getAttribute("href"),
          `/courses?university=${university.slug}`,
        );
        assert.equal(await viewCourses.getAttribute("target"), null);
        assert.match(await viewCourses.getAttribute("class"), /\bbtn-outline-dark\b/);
        assert.equal(
          await container.locator(`a.btn[href="${university.officialUrl}"]`).count(),
          0,
          `${locale} ${university.name} must not have an external university navigation CTA.`,
        );
        const enquiry = container.getByRole("link", { name: enquiryLabel, exact: true });
        assert.match(await enquiry.getAttribute("href"), /^https:\/\/wa\.me\//);
        assert.match(await enquiry.getAttribute("class"), /\bbtn-outline-dark\b/);
      }
      const summaryText = {
        en: "Ask us for current admissions information for this institution.",
        tr: "Bu kurumun güncel kabul bilgileri için bize danışın.",
        fr: "Contactez-nous pour obtenir les informations actuelles sur les admissions de cet établissement.",
        sw: "Wasiliana nasi kupata taarifa za sasa za udahili katika taasisi hii.",
      }[locale];
      const localizedLocation = (university) =>
        university.slug === "cyprus-international-university"
          ? {
              en: "North Nicosia",
              tr: "Kuzey Lefkoşa",
              fr: "Nicosie-Nord",
              sw: "Nicosia Kaskazini",
            }[locale]
          : locale === "tr" && university.location === "Kyrenia (Girne)"
            ? "Girne (Kyrenia)"
            : university.location;

      for (const name of [
        "Florida International University (FIU)",
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
      for (const university of expectedUniversities) {
        const homeCard = page.locator("main article").filter({
          has: page.getByRole("heading", { name: university.name, exact: true }),
        });
        if (await homeCard.count()) await assertUniversityActions(homeCard, university);
      }

      await gotoReady(page, `${baseUrl}/universities`);
      const universityCards = page.locator("main article.card-light");
      assert.equal(
        await universityCards.count(),
        16,
        `${locale} directory must show all sixteen universities.`,
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
        await assertUniversityActions(card, university);
        await card.getByRole("link", { name: coursesLabel, exact: true }).click();
        await page.waitForURL(`**/courses?university=${university.slug}`);
        assert.equal(await page.locator("main select").nth(2).inputValue(), university.slug);
        await gotoReady(page, `${baseUrl}/universities`);
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
        16,
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
        await assertUniversityActions(detailsDialog, university);
        assert.ok((await detailsDialog.innerText()).includes(guidanceNote));
        assert.equal(
          await detailsDialog.locator('a[href^="/courses?university="]').getAttribute("href"),
          `/courses?university=${university.slug}`,
          `${locale} View Courses must preserve the university filter.`,
        );
        assert.equal(
          await detailsDialog.locator("li").count(),
          university.studyAreaCount ?? 0,
          `${locale} modal must show only supplied or sourced study areas.`,
        );
        const modalText = await detailsDialog.innerText();
        assert.doesNotMatch(
          modalText,
          /\d+\s*(?:semesters?|years?)\b|Cross-Cultural Nursing Practice|Advanced Nursing Practice \(M|Community Health Nursing \(CHN\)/i,
          `${locale} ${university.name} modal must not contain invented durations or catalogue programmes.`,
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
          if (university.slug === "eastern-mediterranean-university") {
            await assertEmuFees(detailsDialog, locale);
          }
          if (locale === "en" && university.slug === "bahcesehir-cyprus-university") {
            assert.match(feeText, /\$2,100.*\$2,700/s);
            assert.match(feeText, /does not identify an academic year/);
            assert.match(feeText, /not confirmed acceptance or visa deposits/);
          }
        } else if (university.slug === "florida-international-university") {
          await assertFloridaModal(detailsDialog, locale);
        } else if (university.slug === "university-of-kyrenia") {
          await assertKyreniaFees(detailsDialog, locale);
        } else if (university.slug === "girne-american-university") {
          await assertGauFees(detailsDialog, locale);
        } else if (university.slug === "near-east-university") {
          await assertNeuModal(detailsDialog, locale);
        } else {
          assert.doesNotMatch(
            modalText,
            /[€£$]\s*\d/,
            `${locale} modal must not show unverified tuition amounts.`,
          );
        }
        if (university.slug === "eastern-mediterranean-university") {
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
          const scholarship = await detailsDialog.locator("section").last().innerText();
          assert.match(scholarship, /50\s*%|%50/);
          const ciuChecks = {
            en: {
              scholarship: [
                /international undergraduate tuition scholarship/,
                /additional academic scholarships may be available/,
                /Exact payable tuition depends on the programme and scholarship/,
                /Confirm eligibility and payable tuition with CIU through FranklyEdu/,
              ],
              payment: [
                /exact initial payment/,
                /student’s official offer letter/,
                /Contact FranklyEdu/,
              ],
            },
            tr: {
              scholarship: [
                /uluslararası lisans öğrencilerine/,
                /ek akademik burslar da mevcut olabilir/,
                /Ödenecek kesin öğrenim ücreti programa ve bursa bağlıdır/,
                /uygunluk koşullarını.*FranklyEdu aracılığıyla CIU ile teyit edin/,
              ],
              payment: [
                /Kesin ilk ödemeyi/,
                /resmî kabul teklif mektubundan/,
                /FranklyEdu ile iletişime geçin/,
              ],
            },
            fr: {
              scholarship: [
                /premier cycle pour les étudiants internationaux/,
                /bourses académiques supplémentaires peuvent être disponibles/,
                /frais de scolarité exacts à payer dépendent de la formation et de la bourse/,
                /Confirmez l’éligibilité.*CIU par l’intermédiaire de FranklyEdu/,
              ],
              payment: [
                /paiement initial exact/,
                /lettre officielle d’offre d’admission/,
                /Contactez FranklyEdu/,
              ],
            },
            sw: {
              scholarship: [
                /wanafunzi wa kimataifa wa shahada ya kwanza/,
                /ufadhili wa ziada wa kitaaluma unaweza kupatikana/,
                /Ada halisi ya masomo inayopaswa kulipwa inategemea programu na ufadhili/,
                /Thibitisha ustahiki.*CIU kupitia FranklyEdu/,
              ],
              payment: [
                /malipo halisi ya awali/,
                /barua rasmi ya ofa ya udahili/,
                /Wasiliana na FranklyEdu/,
              ],
            },
          }[locale];
          for (const pattern of ciuChecks.scholarship) assert.match(scholarship, pattern);
          const paymentSection = detailsDialog.locator("section").nth(1);
          const payment = await paymentSection.innerText();
          for (const pattern of ciuChecks.payment) assert.match(payment, pattern);
          assert.equal(await paymentSection.locator("a, table").count(), 0);
          assert.doesNotMatch(modalText, /[€£$]\s*\d/);
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
        await detailsButton.click();
        await detailsDialog.getByRole("link", { name: applyLabel, exact: true }).click();
        await page.waitForURL(`**/application?university=${university.slug}`);
        assert.notEqual(
          await page.locator("body").evaluate((body) => getComputedStyle(body).position),
          "fixed",
          "Applying through FranklyEdu must release the modal scroll lock.",
        );
        const form = page.locator("form");
        await form.locator('input[autocomplete="name"]').fill("Prefill Test");
        await form.locator('input[type="email"]').fill("prefill@example.test");
        await form.locator('button[type="submit"]').click();
        const studyPlan = form.locator("select");
        assert.equal(
          await studyPlan.nth(0).inputValue(),
          ["university-of-memphis", "pace-university", "florida-international-university"].includes(
            university.slug,
          )
            ? "united-states"
            : university.slug === "university-of-sunderland"
              ? "united-kingdom"
              : university.slug === "hof-university-of-applied-sciences" ||
                  university.slug === "oth-regensburg" ||
                  university.slug === "evangelische-hochschule-dresden"
                ? "germany"
                : "cyprus",
        );
        assert.equal(
          await studyPlan.nth(1).inputValue(),
          university.slug,
          `${locale} ${university.name} modal must prefill its university.`,
        );
        assert.equal(await studyPlan.nth(2).inputValue(), "");
        await studyPlan.nth(3).selectOption("January 2027");
        await form.locator('button[type="submit"]').click();
        await form.locator('button[type="submit"]').click();
        assert.ok((await form.innerText()).includes(university.name));
        assert.ok((await form.innerText()).includes(guidanceNote));
        await gotoReady(page, `${baseUrl}/universities`);
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
      const ciuPayment = detailsDialog.locator("section").nth(1);
      await ciuPayment.scrollIntoViewIfNeeded();
      assert.ok(await ciuPayment.isVisible());
      assert.ok(
        await detailsDialog.evaluate((dialog) => dialog.scrollHeight > dialog.clientHeight),
        `${locale} CIU notes must remain internally scrollable at 320px.`,
      );
      const applyLink = detailsDialog.locator('a[href^="/application?university="]');
      await applyLink.scrollIntoViewIfNeeded();
      assert.ok(
        await applyLink.isVisible(),
        `${locale} CIU application guidance must remain reachable.`,
      );
      assert.equal(
        await applyLink.getAttribute("href"),
        "/application?university=cyprus-international-university",
      );
      await assertUniversityActions(
        detailsDialog,
        expectedUniversities.find(({ slug }) => slug === "cyprus-international-university"),
      );
      assert.ok(
        await detailsDialog.evaluate((dialog) => dialog.scrollWidth <= dialog.clientWidth),
        `${locale} translated university actions must fit the mobile modal.`,
      );
      await detailsDialog.getByRole("button", { name: closeLabel }).click();
      await detailsDialog.waitFor({ state: "hidden" });
      const neuCard = universityCards.filter({
        has: page.getByRole("heading", { name: "Near East University", exact: true }),
      });
      await neuCard.getByRole("button", { name: detailLabel }).click();
      await assertNeuModal(detailsDialog, locale);
      assert.ok(
        await detailsDialog.evaluate(
          (dialog) =>
            dialog.scrollWidth <= dialog.clientWidth && dialog.scrollHeight > dialog.clientHeight,
        ),
        `${locale} NEU notes must fit and remain vertically scrollable at 320px.`,
      );
      const neu = expectedUniversities.find(({ slug }) => slug === "near-east-university");
      await assertUniversityActions(detailsDialog, neu);
      const neuApply = detailsDialog.getByRole("link", { name: applyLabel, exact: true });
      await neuApply.scrollIntoViewIfNeeded();
      assert.ok(await neuApply.isVisible());
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
          `${locale} View Courses must show only published programmes for that university.`,
        );
        if (["cyprus-international-university", "near-east-university"].includes(slug)) {
          assert.equal(
            await page.locator("[data-university-examples] li").count(),
            slug === "near-east-university" ? 31 : 38,
          );
        } else if (slug !== "oth-regensburg") {
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
      const hofUniversity = expectedUniversities.find(
        ({ slug }) => slug === "hof-university-of-applied-sciences",
      );
      const hofUniversityCard = universityCards.filter({
        has: page.getByRole("heading", { name: hofUniversity.name, exact: true }),
      });
      await assertUniversityActions(hofUniversityCard, hofUniversity);
      const filteredDirectoryUrl = page.url();
      await hofUniversityCard.getByRole("link", { name: coursesLabel, exact: true }).click();
      await page.waitForURL(`**/courses?university=${hofUniversity.slug}`);
      await page.goBack();
      await page.waitForURL(filteredDirectoryUrl);
      assert.equal(await page.locator("main select").inputValue(), "germany");
      await hofUniversityCard.getByRole("button", { name: detailLabel }).click();
      await assertUniversityActions(detailsDialog, hofUniversity);
      assert.equal(await universityCards.count(), 3);
      await detailsDialog.getByRole("button", { name: closeLabel }).click();
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
        ["university-of-memphis", "pace-university", "florida-international-university"].includes(
          slug,
        ),
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
          en: "Browse source-linked programme records and clearly labelled university catalogue examples. Confirm current availability, fees and requirements with the university.",
          tr: "Kaynak bağlantılı program kayıtlarını ve açıkça etiketlenmiş üniversite katalog örneklerini inceleyin. Güncel uygunluğu, ücretleri ve koşulları üniversiteyle teyit edin.",
          fr: "Consultez les fiches de formations avec leurs sources et les exemples des catalogues universitaires clairement identifiés. Confirmez la disponibilité, les frais et les conditions actuels auprès de l’université.",
          sw: "Angalia rekodi za programu zenye viungo vya vyanzo na mifano ya katalogi za vyuo vikuu iliyowekwa alama wazi. Thibitisha upatikanaji wa sasa, ada na mahitaji na chuo kikuu.",
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
