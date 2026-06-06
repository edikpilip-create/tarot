import test from "node:test";
import assert from "node:assert/strict";

import { getLocalizedAssets } from "./assets.ts";

test("getLocalizedAssets returns shared fallback images and localized video embeds", () => {
  const assets = getLocalizedAssets("en");

  assert.equal(assets.hero.maskSrc, "/media/warrior-mask.png");
  assert.equal(assets.carouselCards.length, 6);
  assert.equal(assets.spreadCardImages.mag, "/media/spread-card-01.webp");
  assert.match(assets.featuredVideos.primary.embedUrl, /1196251431/);
  assert.match(assets.featuredVideos.secondary.embedUrl, /1196251432/);
});
