"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { Suspense, useEffect, type ReactNode } from "react";
import PostHogPageView from "./PostHogPageView";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!posthogKey) {
      return;
    }

    posthog.init(posthogKey, {
      api_host: posthogHost,
      ui_host: "https://eu.posthog.com",
      capture_pageview: false,
      capture_pageleave: true,
    });
  }, []);

  if (!posthogKey) {
    return children;
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
