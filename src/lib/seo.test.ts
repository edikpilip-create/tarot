import test from "node:test";
import assert from "node:assert/strict";

import { loadDictionary } from "./i18n/load-dictionary.ts";
import { buildLocaleMetadata, buildSitemapEntries } from "./seo.ts";

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
