import test from "node:test";
import assert from "node:assert/strict";

import {
  buildLocalizedPath,
  detectPreferredLocale,
  getLocaleName,
  getSupportedLocales,
  resolveLocale,
} from "./config.ts";

test("resolveLocale normalizes supported locale values and falls back to english", () => {
  assert.equal(resolveLocale("ru"), "ru");
  assert.equal(resolveLocale("uk-UA"), "uk");
  assert.equal(resolveLocale("EN_us"), "en");
  assert.equal(resolveLocale("fr"), "en");
  assert.equal(resolveLocale(undefined), "en");
});

test("detectPreferredLocale respects accept-language priority order", () => {
  assert.equal(detectPreferredLocale("uk-UA,uk;q=0.9,en-US;q=0.8"), "uk");
  assert.equal(detectPreferredLocale("fr-CA,ru;q=0.7,en;q=0.5"), "ru");
  assert.equal(detectPreferredLocale(undefined), "en");
});

test("getSupportedLocales and locale names stay in sync", () => {
  assert.deepEqual(getSupportedLocales(), ["en", "uk", "ru"]);
  assert.equal(getLocaleName("en"), "English");
  assert.equal(getLocaleName("uk"), "Українська");
  assert.equal(getLocaleName("ru"), "Русский");
});

test("buildLocalizedPath swaps locale segments and preserves hash fragments", () => {
  assert.equal(buildLocalizedPath("/uk", "en", "#spread"), "/en#spread");
  assert.equal(buildLocalizedPath("/ru", "uk"), "/uk");
  assert.equal(buildLocalizedPath("/en/contact", "ru", "#contact"), "/ru/contact#contact");
});
