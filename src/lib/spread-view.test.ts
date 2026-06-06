import test from "node:test";
import assert from "node:assert/strict";

import { getInitialSpreadState, getSpreadResultsScrollTop } from "./spread-view.ts";

test("getInitialSpreadState starts screen 10 with no visible cards", () => {
  assert.deepEqual(getInitialSpreadState(), []);
});

test("getSpreadResultsScrollTop centers the results block in the viewport", () => {
  const scrollTop = getSpreadResultsScrollTop({
    elementTop: 1200,
    elementHeight: 540,
    viewportHeight: 900,
    offset: 24,
  });

  assert.equal(scrollTop, 996);
});

test("getSpreadResultsScrollTop never returns a negative scroll position", () => {
  const scrollTop = getSpreadResultsScrollTop({
    elementTop: 120,
    elementHeight: 280,
    viewportHeight: 900,
    offset: 24,
  });

  assert.equal(scrollTop, 0);
});
