import type { SpreadCard } from "./spread-cards";

type SpreadResultsScrollTopArgs = {
  elementTop: number;
  elementHeight: number;
  viewportHeight: number;
  offset?: number;
};

export function getInitialSpreadState(): SpreadCard[] {
  return [];
}

export function getSpreadResultsScrollTop({
  elementTop,
  elementHeight,
  viewportHeight,
  offset = 0,
}: SpreadResultsScrollTopArgs): number {
  const centeredTop = elementTop - (viewportHeight - elementHeight) / 2 - offset;

  return Math.max(0, Math.round(centeredTop));
}
