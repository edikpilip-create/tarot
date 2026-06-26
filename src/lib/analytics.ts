export const analyticsEventNames = {
  pageView: "page_view",
  heroCtaClick: "hero_cta_click",
  spreadStarted: "spread_started",
  spreadCardSelected: "spread_card_selected",
  spreadCompleted: "spread_completed",
  leadFormStart: "lead_form_start",
  leadSubmitAttempt: "lead_submit_attempt",
  leadSubmitError: "lead_submit_error",
  generateLead: "generate_lead",
} as const;

export const analyticsEvents = Object.values(analyticsEventNames);

export type AnalyticsEventName = (typeof analyticsEvents)[number];

export type AnalyticsEventProperties = Readonly<{
  locale?: string;
  page_path?: string;
  cta_location?: string;
  spread_cards_count?: number;
  form_id?: string;
  lead_channel?: "telegram";
  telegram_delivery_status?: "success" | "failed";
  error_type?: string;
  deployment_env?: string;
}>;

export function trackEvent(
  eventName: AnalyticsEventName,
  properties: AnalyticsEventProperties = {},
): void {
  void eventName;
  void properties;
}
