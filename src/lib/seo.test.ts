import test from "node:test";
import assert from "node:assert/strict";

import { loadDictionary } from "./i18n/load-dictionary.ts";
import {
  buildLocaleMetadata,
  buildRobotsPolicy,
  buildSitemapEntries,
  getSiteUrl,
  isIndexingEnabled,
} from "./seo.ts";

test("buildLocaleMetadata returns localized canonical and alternate language links", async () => {
  const dictionary = await loadDictionary("en");
  const metadata = buildLocaleMetadata("en", dictionary, "https://artofseeing.example");

  assert.equal(metadata.alternates?.canonical, "/en");
  assert.equal(metadata.alternates?.languages?.ru, "/ru");
  assert.equal(metadata.openGraph?.locale, "en_US");
});

test("buildSitemapEntries emits one entry per supported locale", () => {
  const entries = buildSitemapEntries("https://artofseeing.example");

  assert.deepEqual(
    entries.map((entry) => entry.url),
    [
      "https://artofseeing.example/en",
      "https://artofseeing.example/uk",
      "https://artofseeing.example/ru",
    ],
  );
});

test("getSiteUrl rejects a missing production URL", () => {
  assert.throws(
    () => getSiteUrl({ NODE_ENV: "production" }),
    /NEXT_PUBLIC_SITE_URL/,
  );
});

test("getSiteUrl normalizes a configured URL", () => {
  assert.equal(
    getSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://artofseeing.test/" }),
    "https://artofseeing.test",
  );
});

test("only an explicit production deployment enables indexing", () => {
  assert.equal(isIndexingEnabled({ DEPLOYMENT_ENV: "production" }), true);
  assert.equal(isIndexingEnabled({ DEPLOYMENT_ENV: "preview" }), false);
  assert.equal(isIndexingEnabled({}), false);
});

test("preview metadata and robots policy prevent indexing", async () => {
  const dictionary = await loadDictionary("en");
  const metadata = buildLocaleMetadata(
    "en",
    dictionary,
    "https://preview.artofseeing.test",
    false,
  );
  const robots = buildRobotsPolicy(
    { DEPLOYMENT_ENV: "preview" },
    "https://preview.artofseeing.test",
  );

  assert.deepEqual(metadata.robots, {
    index: false,
    follow: false,
  });
  assert.deepEqual(robots.rules, {
    userAgent: "*",
    disallow: "/",
  });
  assert.equal(robots.sitemap, undefined);
});

test("production metadata and robots policy allow indexing", async () => {
  const dictionary = await loadDictionary("en");
  const metadata = buildLocaleMetadata(
    "en",
    dictionary,
    "https://artofseeing.test",
    true,
  );
  const robots = buildRobotsPolicy(
    { DEPLOYMENT_ENV: "production" },
    "https://artofseeing.test",
  );

  assert.deepEqual(metadata.robots, {
    index: true,
    follow: true,
  });
  assert.deepEqual(robots.rules, {
    userAgent: "*",
    allow: "/",
  });
  assert.equal(robots.sitemap, "https://artofseeing.test/sitemap.xml");
});
