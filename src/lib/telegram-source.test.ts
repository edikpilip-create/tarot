import test from "node:test";
import assert from "node:assert/strict";

import { getRequestSource } from "./telegram-source.ts";

test("getRequestSource builds a locale-aware payload from pathname and hash", () => {
  const source = getRequestSource({
    lang: "uk",
    pathname: "/uk",
    hash: "#spread",
    formId: "lead-form",
    buttonId: "submit-lead-form",
    now: new Date("2026-01-01T12:00:00.000Z"),
  });

  assert.deepEqual(source, {
    languageCode: "uk",
    languageName: "Українська",
    sourceUrl: "/uk#spread",
    sourceScreen: "spread",
    sourceForm: "lead-form",
    sourceButton: "submit-lead-form",
    timestamp: "2026-01-01T12:00:00.000Z",
  });
});
