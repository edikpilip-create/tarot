export const analyticsEvents = [
  "hero_cta_click",
  "spread_draw",
  "contact_form_submit",
  "telegram_lead_success",
  "telegram_lead_error",
  "language_changed",
] as const;

export type AnalyticsEventName = (typeof analyticsEvents)[number];

export type AnalyticsEventProperties = Readonly<
  Record<string, string | number | boolean | null | undefined>
>;

export function trackEvent(
  eventName: AnalyticsEventName,
  properties: AnalyticsEventProperties = {},
): void {
  void eventName;
  void properties;
}
