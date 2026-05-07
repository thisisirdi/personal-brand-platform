export type AnalyticsEvent =
  | "contact_submitted"
  | "contact_failed"
  | "project_viewed"
  | "project_card_clicked";

type AnalyticsProperties = Record<string, string | number | boolean | null>;

export async function trackAnalyticsEvent(
  event: AnalyticsEvent,
  properties: AnalyticsProperties = {},
) {
  void event;
  void properties;
}
