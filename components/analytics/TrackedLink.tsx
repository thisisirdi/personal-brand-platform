"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import type { AnalyticsEvent, AnalyticsEventProperties } from "@/lib/analytics";
import { useAnalytics } from "@/lib/useAnalytics";

type NextLinkProps = ComponentProps<typeof Link>;

type TrackedLinkProps<Event extends AnalyticsEvent> = Omit<
  NextLinkProps,
  "onClick"
> & {
  analyticsEvent: Event;
  analyticsProperties: AnalyticsEventProperties[Event];
  onClick?: NextLinkProps["onClick"];
};

export function TrackedLink<Event extends AnalyticsEvent>({
  analyticsEvent,
  analyticsProperties,
  onClick,
  ...linkProps
}: TrackedLinkProps<Event>) {
  const { capture } = useAnalytics();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    capture(analyticsEvent, analyticsProperties);
    onClick?.(event);
  }

  return <Link {...linkProps} onClick={handleClick} />;
}
