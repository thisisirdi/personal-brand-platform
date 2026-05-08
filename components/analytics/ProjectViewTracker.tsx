"use client";

import { useEffect } from "react";
import type { AnalyticsEventProperties } from "@/lib/analytics";
import { useAnalytics } from "@/lib/useAnalytics";

type ProjectViewTrackerProps = AnalyticsEventProperties["project_viewed"];

export function ProjectViewTracker({
  project_slug,
  project_title,
  category,
}: ProjectViewTrackerProps) {
  const { capture } = useAnalytics();

  useEffect(() => {
    capture("project_viewed", {
      project_slug,
      project_title,
      category,
    });
  }, [capture, category, project_slug, project_title]);

  return null;
}
