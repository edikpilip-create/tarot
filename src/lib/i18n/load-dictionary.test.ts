import test from "node:test";
import assert from "node:assert/strict";

import { loadDictionary } from "./load-dictionary.ts";

test("loadDictionary returns localized metadata and spread content", async () => {
  const en = await loadDictionary("en");
  const ru = await loadDictionary("ru");

  assert.equal(en.locale.code, "en");
  assert.equal(ru.locale.code, "ru");
  assert.notEqual(en.meta.title, ru.meta.title);
  assert.equal(en.spread.cards.length, 21);
  assert.equal(ru.spread.cards.length, 21);
  assert.equal(en.feedback.api.validation.length > 0, true);
});
