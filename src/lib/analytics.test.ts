import test from "node:test";
import assert from "node:assert/strict";

import { analyticsEventNames, analyticsEvents, trackEvent } from "./analytics.ts";

test("analytics event registry contains the planned conversion events", () => {
  assert.deepEqual(analyticsEvents, [
    "page_view",
    "hero_cta_click",
    "spread_started",
    "spread_card_selected",
    "spread_completed",
    "lead_form_start",
    "lead_submit_attempt",
    "lead_submit_error",
    "generate_lead",
  ]);
});

test("generate_lead is the macro conversion event name", () => {
  assert.equal(analyticsEventNames.generateLead, "generate_lead");
});

test("trackEvent is safe before an analytics provider is configured", () => {
  assert.doesNotThrow(() => {
    trackEvent("lead_submit_attempt", {
      locale: "en",
      page_path: "/en",
      form_id: "lead-form",
      lead_channel: "telegram",
    });
  });
});
