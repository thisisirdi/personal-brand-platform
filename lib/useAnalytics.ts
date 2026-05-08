"use client";

import { useCallback } from "react";
import { usePostHog } from "posthog-js/react";
import type {
  AnalyticsEvent,
  AnalyticsEventProperties,
  AnalyticsPropertyValue,
} from "@/lib/analytics";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

function removeUndefinedProperties(
  properties: Record<string, AnalyticsPropertyValue>,
) {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined),
  );
}

export function useAnalytics() {
  const posthog = usePostHog();

  const capture = useCallback(
    <Event extends AnalyticsEvent>(
      event: Event,
      properties: AnalyticsEventProperties[Event],
    ) => {
      if (!posthogKey || !posthog) {
        return;
      }

      posthog.capture(event, removeUndefinedProperties(properties));
    },
    [posthog],
  );

  return {
    capture,
    isEnabled: Boolean(posthogKey && posthog),
  };
}
