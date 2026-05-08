const DEFAULT_POSTHOG_HOST = "https://eu.i.posthog.com";
const POSTHOG_CAPTURE_TIMEOUT_MS = 1500;

export type AnalyticsPropertyValue =
  | string
  | number
  | boolean
  | null
  | undefined;

export type AnalyticsEventProperties = {
  page_viewed: {
    path: string;
    url: string;
    search?: string;
    referrer?: string;
  };
  hero_cta_clicked: {
    cta_label: string;
    destination: string;
    source_page: string;
    variant?: string;
  };
  project_card_clicked: {
    project_slug: string;
    project_title: string;
    position: number;
    source_page: string;
  };
  project_viewed: {
    project_slug: string;
    project_title: string;
    category?: string | null;
  };
  contact_form_started: {
    source_page?: string;
  };
  contact_submitted: {
    contact_id: string;
    source_page?: string;
  };
  contact_failed: {
    reason: "validation" | "missing_database_url" | "database" | "unknown";
    source_page?: string;
    status_code?: number;
    field_count?: number;
  };
  external_link_clicked: {
    href: string;
    label?: string;
    source_page?: string;
    destination_host?: string;
    project_slug?: string;
    project_title?: string;
    link_type?: "github" | "demo" | "social" | "other";
  };
};

export type AnalyticsEvent = keyof AnalyticsEventProperties;

type AnalyticsProperties = Record<
  string,
  Exclude<AnalyticsPropertyValue, undefined>
>;

type AnalyticsConfig = {
  apiKey: string;
  host: string;
};

function getAnalyticsConfig(): AnalyticsConfig | null {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  if (!apiKey) {
    return null;
  }

  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST?.replace(/\/$/, "") ??
    DEFAULT_POSTHOG_HOST;

  return {
    apiKey,
    host,
  };
}

function removeUndefinedProperties(
  properties: Record<string, AnalyticsPropertyValue>,
): AnalyticsProperties {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined),
  ) as AnalyticsProperties;
}

function getServerDistinctId<Event extends AnalyticsEvent>(
  event: Event,
  properties: AnalyticsEventProperties[Event],
) {
  if ("contact_id" in properties && properties.contact_id) {
    return `contact:${properties.contact_id}`;
  }

  if ("project_slug" in properties && properties.project_slug) {
    return `project:${properties.project_slug}`;
  }

  return `server:${event}`;
}

export async function trackAnalyticsEvent<Event extends AnalyticsEvent>(
  event: Event,
  properties: AnalyticsEventProperties[Event],
) {
  const config = getAnalyticsConfig();

  if (!config) {
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    POSTHOG_CAPTURE_TIMEOUT_MS,
  );

  try {
    await fetch(`${config.host}/i/v0/e/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: config.apiKey,
        event,
        distinct_id: getServerDistinctId(event, properties),
        properties: {
          ...removeUndefinedProperties(properties),
          $process_person_profile: false,
        },
      }),
      signal: controller.signal,
    });
  } catch (error) {
    console.warn("PostHog analytics capture failed", error);
  } finally {
    clearTimeout(timeoutId);
  }
}
