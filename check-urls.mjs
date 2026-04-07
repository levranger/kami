/**
 * Kami Aesthetics — URL Status Checker
 * Usage: node check-urls.mjs
 * Outputs a table to terminal + saves kami-url-audit.csv
 */

import http from "http";
import fs from "fs";

const BASE = "http://localhost:3000";

const URLS = [
  // ── 200 pages (must stay 200) ──────────────────────────────────────────
  { url: `${BASE}/`, expected: 200 },
  { url: `${BASE}/services/laser-hair-removal`, expected: 200 },
  { url: `${BASE}/services/ipl-photofacial`, expected: 200 },
  { url: `${BASE}/services/resurfx`, expected: 200 },
  { url: `${BASE}/services/botox`, expected: 200 },
  { url: `${BASE}/services/dermal-fillers`, expected: 200 },
  { url: `${BASE}/services/prp-therapy`, expected: 200 },
  { url: `${BASE}/blog`, expected: 200 },

  // ── 301 redirects (service area pages) ────────────────────────────────
  { url: `${BASE}/services/`, expected: 301 },
  { url: `${BASE}/how-it-works/`, expected: 301 },
  { url: `${BASE}/home-page/`, expected: 301 },
  { url: `${BASE}/types-of-hair-removal/`, expected: 301 },
  { url: `${BASE}/services_lazer/stomach/`, expected: 301 },
  { url: `${BASE}/services_lazer/nail-fungus/`, expected: 301 },
  { url: `${BASE}/services_lazer/legs/`, expected: 301 },
  { url: `${BASE}/services_lazer/underarms/`, expected: 301 },
  { url: `${BASE}/services_lazer/full-face/`, expected: 301 },
  { url: `${BASE}/services_lazer/bikini/`, expected: 301 },
  { url: `${BASE}/services_lazer/chest/`, expected: 301 },
  { url: `${BASE}/services_lazer/buttocks/`, expected: 301 },
  { url: `${BASE}/services_lazer/back/`, expected: 301 },
  { url: `${BASE}/services_lazer/arms/`, expected: 301 },

  // ── 301 redirects (Russian) ────────────────────────────────────────────
  { url: `${BASE}/ru/types-of-hair-removal-ru/`, expected: 301 },
  { url: `${BASE}/ru/how-it-works-ru/`, expected: 301 },
  { url: `${BASE}/ru/home-page-ru/`, expected: 301 },
  { url: `${BASE}/ru/services-ru/`, expected: 301 },
  { url: `${BASE}/ru/services_lazer/%D1%81%D0%BF%D0%B8%D0%BD%D0%B0/`, expected: 301 },
  { url: `${BASE}/ru/services_lazer/%D1%8F%D0%B3%D0%BE%D0%B4%D0%B8%D1%86%D1%8B/`, expected: 301 },
  { url: `${BASE}/ru/services_lazer/%D1%80%D1%83%D0%BA%D0%B8/`, expected: 301 },
  { url: `${BASE}/ru/services_lazer/%D0%BF%D0%BE%D0%B4%D0%BC%D1%8B%D1%88%D0%BA%D0%B8/`, expected: 301 },
  { url: `${BASE}/ru/services_lazer/%D0%BD%D0%BE%D0%B3%D0%B8/`, expected: 301 },
  { url: `${BASE}/ru/services_lazer/%D0%B6%D0%B8%D0%B2%D0%BE%D1%82/`, expected: 301 },
  { url: `${BASE}/ru/services_lazer/%D0%B3%D1%80%D1%83%D0%B4%D1%8C/`, expected: 301 },
  { url: `${BASE}/ru/services_lazer/%D0%B3%D1%80%D0%B8%D0%B1%D0%BE%D0%BA-%D0%BD%D0%BE%D0%B3%D1%82%D0%B5%D0%B9/`, expected: 301 },
  { url: `${BASE}/ru/services_lazer/%D0%B2%D1%81%D0%B5-%D0%BB%D0%B8%D1%86%D0%BE/`, expected: 301 },
  { url: `${BASE}/ru/services_lazer/%D0%B1%D0%B8%D0%BA%D0%B8%D0%BD%D0%B8/`, expected: 301 },

  // ── 301 redirects (Spanish) ────────────────────────────────────────────
  { url: `${BASE}/es/types-of-hair-removal-esp/`, expected: 301 },
  { url: `${BASE}/es/home-page-esp/`, expected: 301 },
  { url: `${BASE}/es/services-esp/`, expected: 301 },
  { url: `${BASE}/es/services_lazer/rostro-completo/`, expected: 301 },
  { url: `${BASE}/es/services_lazer/piernas/`, expected: 301 },
  { url: `${BASE}/es/services_lazer/pecho/`, expected: 301 },
  { url: `${BASE}/es/services_lazer/nalgas/`, expected: 301 },
  { url: `${BASE}/es/services_lazer/hongos-en-las-unas/`, expected: 301 },
  { url: `${BASE}/es/services_lazer/estomago/`, expected: 301 },
  { url: `${BASE}/es/services_lazer/espalda/`, expected: 301 },
  { url: `${BASE}/es/services_lazer/brazos/`, expected: 301 },
  { url: `${BASE}/es/services_lazer/bikini-esp/`, expected: 301 },
  { url: `${BASE}/es/services_lazer/axilas/`, expected: 301 },

  // ── 410 Gone (English dead pages) ─────────────────────────────────────
  { url: `${BASE}/faq/`, expected: 410 },
  { url: `${BASE}/about-kami-laser/`, expected: 410 },
  { url: `${BASE}/candidate-quiz/`, expected: 410 },
  { url: `${BASE}/laser_hair_removal/laser-hair-removal-tailored-for-bodybuilders/`, expected: 410 },
  { url: `${BASE}/laser_hair_removal/laser-hair-removal-for-hidradenitis-suppurativa/`, expected: 410 },
  { url: `${BASE}/laser_hair_removal/laser-hair-removal-for-pilonidal-cysts/`, expected: 410 },
  { url: `${BASE}/laser_hair_removal/laser-hair-removal-for-transgender-clients/`, expected: 410 },
  { url: `${BASE}/laser_hair_removal/laser-hair-removal-for-folliculitis/`, expected: 410 },
  { url: `${BASE}/laser_hair_removal/laser-hair-removal-for-brown-skin/`, expected: 410 },
  { url: `${BASE}/laser_hair_removal/laser-hair-removal-for-active-lifestyle/`, expected: 410 },
  { url: `${BASE}/laser_hair_removal/laser-hair-removal-for-amputees/`, expected: 410 },
  { url: `${BASE}/laser_hair_removal/at-home-laser-hair-removal-weighing-the-pros-and-cons/`, expected: 410 },

  // ── 410 Gone (Russian dead pages) ─────────────────────────────────────
  { url: `${BASE}/ru/homepage-redesign-ru/`, expected: 410 },
  { url: `${BASE}/ru/faq-ru/`, expected: 410 },
  { url: `${BASE}/ru/about-kami-laser-ru/`, expected: 410 },
  { url: `${BASE}/ru/candidate-quiz-ru/`, expected: 410 },
  { url: `${BASE}/ru/laser_hair_removal/laser-hair-removal-tailored-for-bodybuilders-ru/`, expected: 410 },
  { url: `${BASE}/ru/laser_hair_removal/laser-hair-removal-for-hidradenitis-suppurativa-ru/`, expected: 410 },
  { url: `${BASE}/ru/laser_hair_removal/laser-hair-removal-for-pilonidal-cysts-ru/`, expected: 410 },
  { url: `${BASE}/ru/laser_hair_removal/laser-hair-removal-for-transgender-clients-ru/`, expected: 410 },
  { url: `${BASE}/ru/laser_hair_removal/laser-hair-removal-for-folliculitis-ru/`, expected: 410 },
  { url: `${BASE}/ru/laser_hair_removal/laser-hair-removal-for-brown-skin-ru/`, expected: 410 },
  { url: `${BASE}/ru/laser_hair_removal/laser-hair-removal-for-amputees-ru/`, expected: 410 },
  { url: `${BASE}/ru/laser_hair_removal/laser-hair-removal-for-active-lifestyle-ru/`, expected: 410 },
  { url: `${BASE}/ru/laser_hair_removal/at-home-laser-hair-removal-weighing-the-pros-and-cons-ru/`, expected: 410 },

  // ── 410 Gone (Spanish dead pages) ─────────────────────────────────────
  { url: `${BASE}/es/homepage-redesign-esp/`, expected: 410 },
  { url: `${BASE}/es/faq-esp/`, expected: 410 },
  { url: `${BASE}/es/about-kami-laser-esp/`, expected: 410 },
  { url: `${BASE}/es/candidate-quiz-esp/`, expected: 410 },
  { url: `${BASE}/es/laser_hair_removal/laser-hair-removal-tailored-for-bodybuilders-esp/`, expected: 410 },
  { url: `${BASE}/es/laser_hair_removal/laser-hair-removal-for-transgender-clients-esp/`, expected: 410 },
  { url: `${BASE}/es/laser_hair_removal/laser-hair-removal-for-hidradenitis-suppurativa-esp/`, expected: 410 },
  { url: `${BASE}/es/laser_hair_removal/laser-hair-removal-for-pilonidal-cysts-esp/`, expected: 410 },
  { url: `${BASE}/es/laser_hair_removal/laser-hair-removal-for-folliculitis-esp/`, expected: 410 },
  { url: `${BASE}/es/laser_hair_removal/laser-hair-removal-for-brown-skin-esp/`, expected: 410 },
  { url: `${BASE}/es/laser_hair_removal/laser-hair-removal-for-amputees-esp/`, expected: 410 },
  { url: `${BASE}/es/laser_hair_removal/laser-hair-removal-for-active-lifestyle-esp/`, expected: 410 },
  { url: `${BASE}/es/laser_hair_removal/at-home-laser-hair-removal-weighing-the-pros-and-cons-esp/`, expected: 410 },
];

// ── HTTP check (no follow redirects) ──────────────────────────────────────
function checkUrl(url) {
  return new Promise((resolve) => {
    const req = http.request(url, { method: "HEAD" }, (res) => {
      resolve(res.statusCode);
    });
    req.on("error", () => resolve("ERR"));
    req.setTimeout(8000, () => { req.destroy(); resolve("TIMEOUT"); });
    req.end();
  });
}

// ── Pass/fail logic ────────────────────────────────────────────────────────
function evaluate(expected, actual) {
  if (expected === 301) return (actual === 301 || actual === 308) ? "PASS" : "FAIL";
  return actual === expected ? "PASS" : "FAIL";
}

// ── Terminal colors ────────────────────────────────────────────────────────
const G = "\x1b[32m", R = "\x1b[31m", Y = "\x1b[33m", DIM = "\x1b[2m", RESET = "\x1b[0m", BOLD = "\x1b[1m";

// ── Run with concurrency ───────────────────────────────────────────────────
async function run() {
  console.log(`\n${BOLD}Kami Aesthetics — URL Status Checker${RESET}`);
  console.log(`Checking ${URLS.length} URLs...\n`);

  const results = new Array(URLS.length).fill(null);
  const CONCURRENCY = 8;
  let idx = 0;

  async function worker() {
    while (idx < URLS.length) {
      const i = idx++;
      const { url, expected } = URLS[i];
      const actual = await checkUrl(url);
      const result = evaluate(expected, actual);
      results[i] = { url, expected, actual, result };
      const icon = result === "PASS" ? `${G}✓${RESET}` : `${R}✗${RESET}`;
      const path = url.replace(BASE, "") || "/";
      process.stdout.write(`  ${icon} ${DIM}${path}${RESET} → ${actual}\n`);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  // ── Summary table ──────────────────────────────────────────────────────
  const pass = results.filter(r => r.result === "PASS").length;
  const fail = results.filter(r => r.result === "FAIL").length;

  console.log(`\n${"─".repeat(80)}`);
  console.log(`${BOLD}${"URL".padEnd(58)} ${"EXP".padEnd(6)} ${"ACTUAL".padEnd(8)} RESULT${RESET}`);
  console.log("─".repeat(80));

  for (const r of results) {
    const path = r.url.replace(BASE, "") || "/";
    const truncated = path.length > 56 ? path.slice(0, 53) + "..." : path;
    const color = r.result === "PASS" ? G : R;
    console.log(
      `${truncated.padEnd(58)} ${String(r.expected).padEnd(6)} ${String(r.actual).padEnd(8)} ${color}${r.result}${RESET}`
    );
  }

  console.log("─".repeat(80));
  console.log(`\n${BOLD}Results: ${G}${pass} passed${RESET} · ${R}${fail} failed${RESET} · ${URLS.length} total\n`);

  // ── CSV export ─────────────────────────────────────────────────────────
  const csvRows = [["URL", "Expected", "Actual", "Result"]];
  for (const r of results) {
    csvRows.push([r.url, r.expected, r.actual, r.result]);
  }
  const csv = csvRows.map(row => row.map(c => `"${c}"`).join(",")).join("\n");
  fs.writeFileSync("kami-url-audit.csv", csv);
  console.log(`CSV saved → ${BOLD}kami-url-audit.csv${RESET}\n`);
}

run();
