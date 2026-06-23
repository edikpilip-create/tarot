import test from "node:test";
import assert from "node:assert/strict";

import { analyticsEvents, trackEvent } from "./analytics.ts";

test("analytics event registry contains the planned conversion events", () => {
  assert.deepEqual(analyticsEvents, [
    "hero_cta_click",
    "spread_draw",
    "contact_form_submit",
    "telegram_lead_success",
    "telegram_lead_error",
    "language_changed",
  ]);
});

test("trackEvent is safe before an analytics provider is configured", () => {
  assert.doesNotThrow(() => {
    trackEvent("spread_draw", { locale: "en" });
  });
});
